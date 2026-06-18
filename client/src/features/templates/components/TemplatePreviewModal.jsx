import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import ResumeTemplateRenderer from './ResumeTemplateRenderer'
import { getTemplate } from '../templateRegistry'
import { Check } from 'lucide-react'

/**
 * TemplatePreviewModal — shows the FULL template rendered with the
 * user's actual resume data, not a placeholder. Same component used
 * for PDF export, so this preview is a faithful representation.
 */
const TemplatePreviewModal = ({ isOpen, onClose, templateId, resumeData, isSelected, onSelect }) => {
  if (!templateId) return null
  const template = getTemplate(templateId)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={template.name} size="xl">
      <div className="max-h-[65vh] overflow-y-auto rounded-xl border border-slate-200 shadow-sm mb-4">
        <ResumeTemplateRenderer templateId={templateId} data={resumeData} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button
          icon={isSelected ? Check : undefined}
          onClick={() => { onSelect(templateId); onClose() }}
        >
          {isSelected ? 'Selected' : 'Use This Template'}
        </Button>
      </div>
    </Modal>
  )
}

export default TemplatePreviewModal
