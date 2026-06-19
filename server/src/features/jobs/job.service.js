import Job from './job.model.js'

/**
 * Job Service — same ownership-scoped CRUD pattern as resume.service.js.
 * Every query filters on createdBy at the DB layer — a user can never
 * read, update, or delete another user's saved jobs.
 */

export const listJobs = async (userId) =>
  Job.find({ createdBy: userId }).sort({ createdAt: -1 }).lean()

export const getJobById = async (id, userId) => {
  const job = await Job.findOne({ _id: id, createdBy: userId }).lean()
  if (!job) {
    const err = new Error('Job not found')
    err.status = 404
    throw err
  }
  return job
}

export const createJob = async (userId, payload) => {
  const job = await Job.create({ ...payload, createdBy: userId })
  return job.toObject()
}

export const updateJob = async (id, userId, updates) => {
  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: updates },
    { new: true, runValidators: true }
  ).lean()
  if (!job) {
    const err = new Error('Job not found')
    err.status = 404
    throw err
  }
  return job
}

export const deleteJob = async (id, userId) => {
  const job = await Job.findOneAndDelete({ _id: id, createdBy: userId })
  if (!job) {
    const err = new Error('Job not found')
    err.status = 404
    throw err
  }
  return { deleted: true }
}
