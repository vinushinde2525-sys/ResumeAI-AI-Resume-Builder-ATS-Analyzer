import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutTemplate, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { TEMPLATE_LIST } from '../templateRegistry'
import TemplateCard from '../components/TemplateCard'
import TemplatePreviewModal from '../components/TemplatePreviewModal'
import ExportPDFButton from '../../export/components/ExportPDFButton'
import Button from '../../../components/ui/Button'
import Skeleton from '../../../components/ui/Skeleton'
import { useResumeDetail, useUpdateResume } from '../../resume/hooks/useResumes'

/**
 * TemplateGalleryPage — browse, preview, and select a template for a resume.
 * Route: /resumes/:id/templates
 */
const TemplateGalleryPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: resume, isLoading } = useResumeDetail(id)
  const { mutate: updateResume, isPending: isSaving } = useUpdateResume(id)

  const [previewId, setPreviewId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const currentTemplateId = selectedId || resume?.templateId || 'modern'

  const handleSelect = (templateId) => {
    setSelectedId(templateId)
    updateResume(
      { templateId },
      { onSuccess: () => toast.success('Template saved!') }
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-72 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/resumes/${id}`)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-brand-600" />
              <h1 className="text-xl font-bold text-slate-900">Choose a Template</h1>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {resume?.title} · {isSaving ? 'Saving…' : 'Pick a design for your resume'}
            </p>
          </div>
        </div>

        <ExportPDFButton
          resumeId={id}
          templateId={currentTemplateId}
          filename={resume?.title}
          variant="primary"
        >
          Export with this template
        </ExportPDFButton>
      </motion.div>

      {/* Template grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {TEMPLATE_LIST.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <TemplateCard
              template={template}
              isSelected={currentTemplateId === template.id}
              onSelect={handleSelect}
              onPreview={setPreviewId}
            />
          </motion.div>
        ))}
      </div>

      {/* Preview modal */}
      <TemplatePreviewModal
        isOpen={!!previewId}
        onClose={() => setPreviewId(null)}
        templateId={previewId}
        resumeData={resume?.data}
        isSelected={previewId === currentTemplateId}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default TemplateGalleryPage
