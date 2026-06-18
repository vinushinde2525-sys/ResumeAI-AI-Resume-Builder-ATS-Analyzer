import { Download } from 'lucide-react'
import Button from '../../../components/ui/Button'
import { useExportPdf } from '../hooks/useExportPdf'

/**
 * ExportPDFButton — drop-in button that triggers server-side PDF generation.
 * Used in ResumePage and TemplateGalleryPage.
 */
const ExportPDFButton = ({ resumeId, templateId, filename, variant = 'primary', size = 'sm', children }) => {
  const { mutate, isPending } = useExportPdf()

  const handleClick = () => {
    if (!resumeId) return
    mutate({ resumeId, templateId, filename })
  }

  return (
    <Button
      variant={variant}
      size={size}
      icon={Download}
      loading={isPending}
      disabled={!resumeId}
      onClick={handleClick}
    >
      {children || 'Export PDF'}
    </Button>
  )
}

export default ExportPDFButton
