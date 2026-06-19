import { listJobs, getJobById, createJob, updateJob, deleteJob } from './job.service.js'
import { matchResumeToJob } from './jobMatch.service.js'
import { getResumeById } from '../resume/resume.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'

export const list = async (req, res) => {
  try {
    const jobs = await listJobs(req.user._id)
    sendSuccess(res, { jobs }, 'Jobs fetched')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const get = async (req, res) => {
  try {
    const job = await getJobById(req.params.id, req.user._id)
    sendSuccess(res, { job }, 'Job fetched')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const create = async (req, res) => {
  try {
    const job = await createJob(req.user._id, req.body)
    sendSuccess(res, { job }, 'Job created', 201)
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const update = async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.user._id, req.body)
    sendSuccess(res, { job }, 'Job updated')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const remove = async (req, res) => {
  try {
    await deleteJob(req.params.id, req.user._id)
    sendSuccess(res, {}, 'Job deleted')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

// Match a resume against a job
export const match = async (req, res) => {
  try {
    const { resumeId } = req.query
    if (!resumeId) return sendError(res, 'resumeId query param required', 400)
    const [job, resume] = await Promise.all([
      getJobById(req.params.id, req.user._id),
      getResumeById(resumeId, req.user._id),
    ])
    const result = matchResumeToJob(resume.data, job)
    sendSuccess(res, { match: result }, 'Match calculated')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}
