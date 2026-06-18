import {
  getAllResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  listResumeVersions,
  getResumeVersion,
  restoreResumeVersion,
  compareResumeVersions,
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

// ── Version History ────────────────────────────────────────────────────────

export const listVersions = async (req, res) => {
  try {
    const versions = await listResumeVersions(req.params.id, req.user._id)
    sendSuccess(res, { versions }, 'Versions fetched')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const getVersion = async (req, res) => {
  try {
    const version = await getResumeVersion(req.params.id, req.params.versionId, req.user._id)
    sendSuccess(res, { version }, 'Version fetched')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const restoreVersion = async (req, res) => {
  try {
    const resume = await restoreResumeVersion(req.params.id, req.params.versionId, req.user._id)
    sendSuccess(res, { resume }, 'Version restored')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const compareVersions = async (req, res) => {
  try {
    const { versionAId, versionBId } = req.query
    if (!versionAId || !versionBId) {
      return sendError(res, 'versionAId and versionBId query params are required', 400)
    }
    const comparison = await compareResumeVersions(req.params.id, versionAId, versionBId, req.user._id)
    sendSuccess(res, comparison, 'Versions compared')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}
