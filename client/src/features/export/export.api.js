import api from '../../lib/axios'

/**
 * exportApi — requests generated files as binary blobs.
 * responseType: 'blob' is required — without it, axios tries to parse
 * the binary/text data as JSON and corrupts it.
 */
export const exportApi = {
  downloadPdf: (resumeId, templateId) =>
    api.post('/export/pdf', { resumeId, templateId }, { responseType: 'blob' }),

  downloadDocx: (resumeId) =>
    api.post('/export/docx', { resumeId }, { responseType: 'blob' }),

  downloadJson: (resumeId) =>
    api.post('/export/json', { resumeId }, { responseType: 'blob' }),
}
