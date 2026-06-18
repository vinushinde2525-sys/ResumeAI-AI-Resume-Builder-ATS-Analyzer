import { generateResumePdf } from './export.service.js'
import { generateResumeDocx } from './exportDocx.service.js'
import { getResumeById } from '../resume/resume.service.js'
import { sendError } from '../../shared/utils/response.utils.js'

/**
 * Export Controller — orchestrates: fetch resume (ownership-checked) →
 * generate file (PDF/DOCX/JSON) → stream binary response with download headers.
 *
 * Reuses resume.service.getResumeById, which already scopes the query
 * to req.user._id — a user can never export someone else's resume,
 * even by guessing a resume ID, because the DB query itself filters
 * on ownership before this controller ever sees the data.
 */
export const exportPdf = async (req, res) => {
  try {
    const { resumeId, templateId } = req.body

    const resume = await getResumeById(resumeId, req.user._id)
    const pdfBuffer = await generateResumePdf(resume.data, templateId)
    const filename = `${(resume.title || 'resume').replace(/[^a-z0-9]/gi, '_')}.pdf`

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length,
    })
    res.send(pdfBuffer)
  } catch (err) {
    sendError(res, err.message || 'PDF generation failed', err.status || 500)
  }
}

export const exportDocx = async (req, res) => {
  try {
    const { resumeId } = req.body

    const resume = await getResumeById(resumeId, req.user._id)
    const docxBuffer = await generateResumeDocx(resume.data)
    const filename = `${(resume.title || 'resume').replace(/[^a-z0-9]/gi, '_')}.docx`

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': docxBuffer.length,
    })
    res.send(docxBuffer)
  } catch (err) {
    sendError(res, err.message || 'DOCX generation failed', err.status || 500)
  }
}

export const exportJson = async (req, res) => {
  try {
    const { resumeId } = req.body

    const resume = await getResumeById(resumeId, req.user._id)

    // Backup format: includes metadata so it could be re-imported later,
    // not just the bare data blob.
    const backup = {
      exportedAt: new Date().toISOString(),
      title: resume.title,
      templateId: resume.templateId,
      data: resume.data,
      _backupVersion: 1,
    }

    const filename = `${(resume.title || 'resume').replace(/[^a-z0-9]/gi, '_')}_backup.json`
    const jsonString = JSON.stringify(backup, null, 2)

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': Buffer.byteLength(jsonString),
    })
    res.send(jsonString)
  } catch (err) {
    sendError(res, err.message || 'JSON export failed', err.status || 500)
  }
}
