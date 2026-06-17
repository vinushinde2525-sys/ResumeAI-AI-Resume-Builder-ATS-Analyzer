import { analyzeResume } from './ats.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'

/**
 * ATS Controller — thin HTTP layer.
 * analyzeResume() is a pure, synchronous function — no async needed,
 * but we keep the handler async for consistency with other controllers
 * and to allow future persistence (saving reports to DB in Phase H).
 */
export const analyze = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body
    const report = analyzeResume(resumeData, jobDescription)
    sendSuccess(res, { report }, 'Resume analyzed')
  } catch (err) {
    sendError(res, err.message || 'Analysis failed', err.status || 500)
  }
}
