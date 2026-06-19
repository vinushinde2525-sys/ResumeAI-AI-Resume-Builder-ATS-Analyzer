import {
  listApplications, getApplicationById, createApplication,
  updateApplication, deleteApplication, getApplicationAnalytics,
} from './application.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'

export const list = async (req, res) => {
  try {
    const applications = await listApplications(req.user._id)
    sendSuccess(res, { applications }, 'Applications fetched')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const get = async (req, res) => {
  try {
    const application = await getApplicationById(req.params.id, req.user._id)
    sendSuccess(res, { application }, 'Application fetched')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const create = async (req, res) => {
  try {
    const application = await createApplication(req.user._id, req.body)
    sendSuccess(res, { application }, 'Application created', 201)
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const update = async (req, res) => {
  try {
    const application = await updateApplication(req.params.id, req.user._id, req.body)
    sendSuccess(res, { application }, 'Application updated')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const remove = async (req, res) => {
  try {
    await deleteApplication(req.params.id, req.user._id)
    sendSuccess(res, {}, 'Application deleted')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}

export const analytics = async (req, res) => {
  try {
    const stats = await getApplicationAnalytics(req.user._id)
    sendSuccess(res, { analytics: stats }, 'Analytics fetched')
  } catch (err) { sendError(res, err.message, err.status || 500) }
}
