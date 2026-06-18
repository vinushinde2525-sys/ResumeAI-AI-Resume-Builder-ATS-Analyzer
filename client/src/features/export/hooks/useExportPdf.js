import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { exportApi } from '../export.api'
import { getErrorMessage } from '../../../lib/utils'

/**
 * Shared download trigger — fetches a blob via axios (so the JWT
 * interceptor attaches correctly) then forces a browser save dialog.
 *
 * Why not a plain <a href="/api/export/pdf">: the endpoint is
 * JWT-protected. A plain link/window.open can't attach an
 * Authorization header, so we must fetch via axios and manually
 * create a download link from the received blob.
 */
const triggerDownload = (blobData, mimeType, filename) => {
  const blob = new Blob([blobData], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const useExportPdf = () =>
  useMutation({
    mutationFn: async ({ resumeId, templateId, filename }) => {
      const response = await exportApi.downloadPdf(resumeId, templateId)
      triggerDownload(response.data, 'application/pdf', `${filename || 'resume'}.pdf`)
      return true
    },
    onSuccess: () => toast.success('PDF downloaded!'),
    onError: (err) => toast.error(getErrorMessage(err) || 'Failed to generate PDF'),
  })

export const useExportDocx = () =>
  useMutation({
    mutationFn: async ({ resumeId, filename }) => {
      const response = await exportApi.downloadDocx(resumeId)
      triggerDownload(
        response.data,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        `${filename || 'resume'}.docx`
      )
      return true
    },
    onSuccess: () => toast.success('Word document downloaded!'),
    onError: (err) => toast.error(getErrorMessage(err) || 'Failed to generate DOCX'),
  })

export const useExportJson = () =>
  useMutation({
    mutationFn: async ({ resumeId, filename }) => {
      const response = await exportApi.downloadJson(resumeId)
      triggerDownload(response.data, 'application/json', `${filename || 'resume'}_backup.json`)
      return true
    },
    onSuccess: () => toast.success('Backup downloaded!'),
    onError: (err) => toast.error(getErrorMessage(err) || 'Failed to generate backup'),
  })
