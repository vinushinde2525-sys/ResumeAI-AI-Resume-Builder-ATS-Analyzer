import Resume from './resume.model.js'

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
