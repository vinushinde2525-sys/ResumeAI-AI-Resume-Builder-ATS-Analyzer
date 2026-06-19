import Application, { APPLICATION_STATUSES } from './application.model.js'

export const listApplications = async (userId) =>
  Application.find({ userId }).populate('jobId').sort({ updatedAt: -1 }).lean()

export const getApplicationById = async (id, userId) => {
  const app = await Application.findOne({ _id: id, userId }).populate('jobId').lean()
  if (!app) { const e = new Error('Application not found'); e.status = 404; throw e }
  return app
}

export const createApplication = async (userId, payload) => {
  try {
    const app = await Application.create({ ...payload, userId })
    return (await app.populate('jobId')).toObject()
  } catch (err) {
    if (err.code === 11000) {
      const e = new Error('You already have an application for this job')
      e.status = 409
      throw e
    }
    throw err
  }
}

export const updateApplication = async (id, userId, updates) => {
  // Auto-set appliedAt timestamp when status moves to 'applied'
  if (updates.status === 'applied' && !updates.appliedAt) {
    updates.appliedAt = new Date().toISOString()
  }
  const app = await Application.findOneAndUpdate(
    { _id: id, userId },
    { $set: updates },
    { new: true, runValidators: true }
  ).populate('jobId').lean()
  if (!app) { const e = new Error('Application not found'); e.status = 404; throw e }
  return app
}

export const deleteApplication = async (id, userId) => {
  const app = await Application.findOneAndDelete({ _id: id, userId })
  if (!app) { const e = new Error('Application not found'); e.status = 404; throw e }
  return { deleted: true }
}

// ── Analytics ────────────────────────────────────────────────────────────────
export const getApplicationAnalytics = async (userId) => {
  const all = await Application.find({ userId }).lean()
  const total = all.length

  if (total === 0) {
    return {
      total: 0, byStatus: {}, interviewRate: 0,
      offerRate: 0, rejectionRate: 0, avgMatchScore: null,
    }
  }

  const byStatus = {}
  APPLICATION_STATUSES.forEach((s) => { byStatus[s] = 0 })
  all.forEach((a) => { byStatus[a.status] = (byStatus[a.status] || 0) + 1 })

  const applied    = all.filter(a => a.status !== 'saved').length
  const interviews = all.filter(a => ['interview','technical','final','offer'].includes(a.status)).length
  const offers     = byStatus.offer || 0
  const rejected   = byStatus.rejected || 0

  const withScores = all.filter(a => a.matchScore != null)
  const avgMatchScore = withScores.length
    ? Math.round(withScores.reduce((s, a) => s + a.matchScore, 0) / withScores.length)
    : null

  return {
    total,
    byStatus,
    applied,
    interviewRate: applied > 0 ? Math.round((interviews / applied) * 100) : 0,
    offerRate:     applied > 0 ? Math.round((offers     / applied) * 100) : 0,
    rejectionRate: applied > 0 ? Math.round((rejected   / applied) * 100) : 0,
    avgMatchScore,
  }
}
