import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, Download, Save, ArrowLeft, Pencil, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useResumeEditor, { DEFAULT_RESUME_DATA } from '../hooks/useResumeEditor'
import { useResumeDetail, useCreateResume, useUpdateResume } from '../hooks/useResumes'
import PersonalInfoForm from '../components/ResumeEditor/PersonalInfoForm'
import SummaryForm from '../components/ResumeEditor/SummaryForm'
import SkillsForm from '../components/ResumeEditor/SkillsForm'
import HobbiesForm from '../components/ResumeEditor/HobbiesForm'
import DynamicArrayForm from '../components/ResumeEditor/DynamicArrayForm'
import ResumePreview from '../components/ResumePreview/ResumePreview'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import Skeleton from '../../../components/ui/Skeleton'

/**
 * ResumePage — handles both modes:
 *   /resumes/new  → create flow (no id)
 *   /resumes/:id  → edit flow (loads from DB)
 *
 * Flow:
 * 1. If editing: useResumeDetail fetches from API → loadResumeData fills editor
 * 2. User edits: useResumeEditor local state (fast, no latency)
 * 3. Save: useCreateResume or useUpdateResume → API → cache invalidated
 */
const ResumePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const resumeRef = useRef(null)
  const isNew = !id || id === 'new'

  // Title editing state
  const [title, setTitle] = useState('Untitled Resume')
  const [editingTitle, setEditingTitle] = useState(false)

  // Load existing resume from API (only in edit mode)
  const { data: existingResume, isLoading: loadingResume } = useResumeDetail(id)

  // Local editor state
  const {
    resumeData,
    loadResumeData,
    handlePersonalChange,
    handleSummaryChange,
    handleSkillsChange,
    handleHobbiesChange,
    handleItemChange,
    handleAddExperience,
    handleRemoveExperience,
    handleAddEducation,
    handleRemoveEducation,
  } = useResumeEditor(DEFAULT_RESUME_DATA)

  // Mutations
  const { mutate: createResume, isPending: isCreating } = useCreateResume()
  const { mutate: updateResume, isPending: isUpdating } = useUpdateResume(id)
  const isSaving = isCreating || isUpdating

  // Load existing data into editor when API returns
  useEffect(() => {
    if (existingResume) {
      loadResumeData(existingResume.data || DEFAULT_RESUME_DATA)
      setTitle(existingResume.title || 'Untitled Resume')
    }
  }, [existingResume, loadResumeData])

  // Save handler — create or update
  const handleSave = () => {
    if (isNew) {
      createResume({ title, data: resumeData })
    } else {
      updateResume({ title, data: resumeData })
    }
  }

  const handlePrint = () => {
    if (isNew) {
      toast.error('Save your resume first before exporting')
      return
    }
    window.print()
  }

  // Loading skeleton while fetching existing resume
  if (!isNew && loadingResume) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                <Skeleton className="h-4 w-1/3 mb-3" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-[900px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Top bar */}
      <div className="print-hidden border-b border-slate-100 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left: back + title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/resumes')}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Editable title */}
            {editingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
                  className="rounded-lg border border-brand-300 bg-brand-50 px-2 py-1 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
                  maxLength={100}
                />
                <button onClick={() => setEditingTitle(false)} className="text-brand-600">
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingTitle(true)}
                className="group flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">
                  {title}
                </span>
                <Pencil className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={isSaving ? undefined : Save}
              loading={isSaving}
              onClick={handleSave}
            >
              {isNew ? 'Save Resume' : 'Save Changes'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handlePrint}
              className="print-hidden"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Editor layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 lg:grid-cols-3 lg:p-6">
        {/* Left: form panel */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="print-hidden lg:col-span-1"
        >
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
            <div className="p-5">
              <PersonalInfoForm data={resumeData.personal} onChange={handlePersonalChange} />
            </div>
            <div className="p-5">
              <SummaryForm data={resumeData.summary} onChange={handleSummaryChange} />
            </div>
            <div className="p-5">
              <DynamicArrayForm
                title="Experience"
                icon={Briefcase}
                items={resumeData.experience}
                onItemChange={(id, field, value) => handleItemChange('experience', id, field, value)}
                onItemAdd={handleAddExperience}
                onItemRemove={handleRemoveExperience}
                accentColor="teal"
              />
            </div>
            <div className="p-5">
              <DynamicArrayForm
                title="Education"
                icon={GraduationCap}
                items={resumeData.education}
                onItemChange={(id, field, value) => handleItemChange('education', id, field, value)}
                onItemAdd={handleAddEducation}
                onItemRemove={handleRemoveEducation}
                accentColor="violet"
              />
            </div>
            <div className="p-5">
              <SkillsForm data={resumeData.skills} onChange={handleSkillsChange} />
            </div>
            <div className="p-5">
              <HobbiesForm data={resumeData.hobbies} onChange={handleHobbiesChange} />
            </div>
          </div>
        </motion.aside>

        {/* Right: preview panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2"
        >
          <p className="print-hidden mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Live Preview
          </p>
          <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <ResumePreview ref={resumeRef} data={resumeData} />
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default ResumePage
