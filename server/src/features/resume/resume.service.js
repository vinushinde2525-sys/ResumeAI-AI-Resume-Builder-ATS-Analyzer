import Resume from './resume.model.js'
import ResumeVersion from './resumeVersion.model.js'

// Cap on stored versions per resume — oldest beyond this are pruned
// so a heavily-edited resume doesn't accumulate unbounded history rows.
const MAX_VERSIONS_PER_RESUME = 20

/**
 * Resume Service — pure DB logic, no req/res
 *
 * All methods scope queries to userId — a user can NEVER
 * access another user's resumes (authorization at data layer).
 */

export const getAllResumes = async (userId) => {
  return Resume
    .find({ userId })
    .select('title templateId isPublic createdAt updatedAt data.personal.name')
    .sort({ updatedAt: -1 }) // newest first
    .lean() // plain JS objects, faster than Mongoose docs
}

export const getResumeById = async (id, userId) => {
  const resume = await Resume.findOne({ _id: id, userId }).lean()
  if (!resume) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }
  return resume
}

export const createResume = async (userId, { title, data }) => {
  const resume = await Resume.create({ userId, title, data: data || {} })
  return resume.toObject()
}

export const updateResume = async (id, userId, updates) => {
  // Snapshot the CURRENT state before overwriting it — this is what
  // "undo to a previous version" will restore later.
  const current = await Resume.findOne({ _id: id, userId }).lean()
  if (!current) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }

  await ResumeVersion.create({
    resumeId: id,
    userId,
    title: current.title,
    data: current.data,
    templateId: current.templateId,
  })

  // Prune oldest versions beyond the cap (fire-and-forget, doesn't block response)
  ResumeVersion.find({ resumeId: id }).sort({ createdAt: -1 }).skip(MAX_VERSIONS_PER_RESUME).select('_id')
    .then((excess) => {
      if (excess.length) {
        ResumeVersion.deleteMany({ _id: { $in: excess.map(v => v._id) } }).catch(() => {})
      }
    })
    .catch(() => {})

  const resume = await Resume.findOneAndUpdate(
    { _id: id, userId }, // scope to owner — prevents other users updating it
    { $set: updates },
    { new: true, runValidators: true } // return updated doc, run schema validators
  ).lean()

  if (!resume) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }
  return resume
}

export const deleteResume = async (id, userId) => {
  const resume = await Resume.findOneAndDelete({ _id: id, userId })
  if (!resume) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }
  return { deleted: true }
}

export const getResumeCount = async (userId) => {
  return Resume.countDocuments({ userId })
}

// ── Version History ────────────────────────────────────────────────────────

export const listResumeVersions = async (resumeId, userId) => {
  // Verify ownership first — prevents listing another user's version history
  const owns = await Resume.exists({ _id: resumeId, userId })
  if (!owns) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }

  return ResumeVersion
    .find({ resumeId, userId })
    .select('title templateId createdAt versionLabel')
    .sort({ createdAt: -1 })
    .lean()
}

export const getResumeVersion = async (resumeId, versionId, userId) => {
  const version = await ResumeVersion.findOne({ _id: versionId, resumeId, userId }).lean()
  if (!version) {
    const err = new Error('Version not found')
    err.status = 404
    throw err
  }
  return version
}

export const restoreResumeVersion = async (resumeId, versionId, userId) => {
  const version = await getResumeVersion(resumeId, versionId, userId)

  // Snapshot current state too, before restoring — so restoring is itself
  // undoable (it just becomes another version in history).
  const current = await Resume.findOne({ _id: resumeId, userId }).lean()
  if (current) {
    await ResumeVersion.create({
      resumeId, userId,
      title: current.title, data: current.data, templateId: current.templateId,
      versionLabel: 'Before restore',
    })
  }

  const restored = await Resume.findOneAndUpdate(
    { _id: resumeId, userId },
    { $set: { title: version.title, data: version.data, templateId: version.templateId } },
    { new: true, runValidators: true }
  ).lean()

  if (!restored) {
    const err = new Error('Resume not found')
    err.status = 404
    throw err
  }
  return restored
}

export const compareResumeVersions = async (resumeId, versionAId, versionBId, userId) => {
  const [versionA, versionB] = await Promise.all([
    getResumeVersion(resumeId, versionAId, userId),
    getResumeVersion(resumeId, versionBId, userId),
  ])

  // Shallow field-level diff across top-level resumeData keys.
  // Good enough for "what changed" summaries without a full deep-diff library.
  const diff = {}
  const keys = new Set([...Object.keys(versionA.data || {}), ...Object.keys(versionB.data || {})])

  for (const key of keys) {
    const a = JSON.stringify(versionA.data?.[key])
    const b = JSON.stringify(versionB.data?.[key])
    if (a !== b) {
      diff[key] = { before: versionA.data?.[key], after: versionB.data?.[key] }
    }
  }

  return {
    versionA: { id: versionA._id, createdAt: versionA.createdAt, title: versionA.title },
    versionB: { id: versionB._id, createdAt: versionB.createdAt, title: versionB.title },
    changedFields: Object.keys(diff),
    diff,
  }
}
