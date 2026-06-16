import {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
} from './resume.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'

export const listResumes = async (req, res) => {
  try {
    const resumes = await getAllResumes(req.user._id)
    sendSuccess(res, { resumes }, 'Resumes fetched')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const getResume = async (req, res) => {
  try {
    const resume = await getResumeById(req.params.id, req.user._id)
    sendSuccess(res, { resume }, 'Resume fetched')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const create = async (req, res) => {
  try {
    const resume = await createResume(req.user._id, req.body)
    sendSuccess(res, { resume }, 'Resume created', 201)
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const update = async (req, res) => {
  try {
    const resume = await updateResume(req.params.id, req.user._id, req.body)
    sendSuccess(res, { resume }, 'Resume updated')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const remove = async (req, res) => {
  try {
    await deleteResume(req.params.id, req.user._id)
    sendSuccess(res, {}, 'Resume deleted')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}
