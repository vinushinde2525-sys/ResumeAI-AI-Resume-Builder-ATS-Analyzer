import { useRef } from 'react'
import { Briefcase, GraduationCap, Download, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import useResumeEditor from '../hooks/useResumeEditor'
import PersonalInfoForm from '../components/ResumeEditor/PersonalInfoForm'
import SummaryForm from '../components/ResumeEditor/SummaryForm'
import SkillsForm from '../components/ResumeEditor/SkillsForm'
import HobbiesForm from '../components/ResumeEditor/HobbiesForm'
import DynamicArrayForm from '../components/ResumeEditor/DynamicArrayForm'
import ResumePreview from '../components/ResumePreview/ResumePreview'
import Button from '../../../components/ui/Button'

/**
 * ResumePage — the main editor page.
 * Wires the useResumeEditor hook into the form + preview layout.
 * Layout preserved from v1: left panel (form) + right panel (preview).
 */
const ResumePage = () => {
  const resumeRef = useRef(null)

  const {
    resumeData,
    handlePersonalChange,
    handleSummaryChange,
    handleSkillsChange,
    handleHobbiesChange,
    handleItemChange,
    handleAddExperience,
    handleRemoveExperience,
    handleAddEducation,
    handleRemoveEducation,
  } = useResumeEditor()

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top bar */}
      <div className="print-hidden sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Resume Editor</h1>
            <p className="text-xs text-slate-500">Changes auto-reflected in preview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={Save}>
              Save
            </Button>
            <Button variant="primary" size="sm" icon={Download} onClick={handlePrint}>
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main layout: form left, preview right */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 lg:grid-cols-3 lg:p-6">

        {/* Left: Editor panel */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="print-hidden lg:col-span-1"
        >
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">

            <div className="p-5">
              <PersonalInfoForm
                data={resumeData.personal}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="p-5">
              <SummaryForm
                data={resumeData.summary}
                onChange={handleSummaryChange}
              />
            </div>

            <div className="p-5">
              <DynamicArrayForm
                title="Experience"
                icon={Briefcase}
                items={resumeData.experience}
                onItemChange={(id, field, value) =>
                  handleItemChange('experience', id, field, value)
                }
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
                onItemChange={(id, field, value) =>
                  handleItemChange('education', id, field, value)
                }
                onItemAdd={handleAddEducation}
                onItemRemove={handleRemoveEducation}
                accentColor="violet"
              />
            </div>

            <div className="p-5">
              <SkillsForm
                data={resumeData.skills}
                onChange={handleSkillsChange}
              />
            </div>

            <div className="p-5">
              <HobbiesForm
                data={resumeData.hobbies}
                onChange={handleHobbiesChange}
              />
            </div>
          </div>
        </motion.aside>

        {/* Right: Preview panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="print-hidden mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Live Preview
            </h2>
          </div>
          <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <ResumePreview ref={resumeRef} data={resumeData} />
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default ResumePage
