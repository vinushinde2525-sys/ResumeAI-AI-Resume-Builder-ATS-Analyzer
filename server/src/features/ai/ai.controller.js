import {
  improveSummary,
  rewriteBullet,
  suggestSkills,
  generateProjectDesc,
  getResumeFeedback,
} from './ai.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'

/**
 * AI Controller — thin HTTP layer.
 * All logic lives in ai.service.js.
 * Controller only: extract body, call service, handle errors, send response.
 */

export const handleImproveSummary = async (req, res) => {
  try {
    const data = await improveSummary(req.body)
    sendSuccess(res, data, 'Summary improved')
  } catch (err) {
    const status = err.status || 500
    const message = status === 429
      ? 'AI rate limit reached. Please wait a moment and try again.'
      : err.message || 'AI request failed'
    sendError(res, message, status)
  }
}

export const handleRewriteBullet = async (req, res) => {
  try {
    const data = await rewriteBullet(req.body)
    sendSuccess(res, data, 'Bullet point rewritten')
  } catch (err) {
    sendError(res, err.message || 'AI request failed', err.status || 500)
  }
}

export const handleSuggestSkills = async (req, res) => {
  try {
    const data = await suggestSkills(req.body)
    sendSuccess(res, data, 'Skills suggested')
  } catch (err) {
    sendError(res, err.message || 'AI request failed', err.status || 500)
  }
}

export const handleGenerateProjectDesc = async (req, res) => {
  try {
    const data = await generateProjectDesc(req.body)
    sendSuccess(res, data, 'Project description generated')
  } catch (err) {
    sendError(res, err.message || 'AI request failed', err.status || 500)
  }
}

export const handleResumeFeedback = async (req, res) => {
  try {
    const data = await getResumeFeedback(req.body)
    sendSuccess(res, data, 'Resume feedback generated')
  } catch (err) {
    sendError(res, err.message || 'AI request failed', err.status || 500)
  }
}
