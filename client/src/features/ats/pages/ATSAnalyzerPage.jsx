import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, FileText, Sparkles } from 'lucide-react'
import { useResumeList } from '../../resume/hooks/useResumes'
import { useAnalyzeResume } from '../hooks/useATS'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import ATSScoreCard from '../components/ATSScoreCard'
import ATSCategoryBreakdown from '../components/ATSCategoryBreakdown'
import MissingKeywordsCard from '../components/MissingKeywordsCard'
import SuggestionsCard from '../components/SuggestionsCard'

/**
 * ATSAnalyzerPage — select a saved resume, optionally paste a job
 * description, and get a deterministic, rule-based ATS report.
 */
const ATSAnalyzerPage = () => {
  const { data: resumes, isLoading: loadingResumes } = useResumeList()
  const [selectedId, setSelectedId] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const { mutate, isPending, data: report, isError } = useAnalyzeResume()

  const handleSubmit = (e) => {
    e.preventDefault()
    const resume = resumes?.find((r) => r._id === selectedId)
    if (!resume) return
    mutate({ resumeData: resume.data, jobDescription: jobDescription || undefined })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
            <BarChart3 className="h-5 w-5 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ATS Analyzer</h1>
        </div>
        <p className="text-sm text-slate-500">
          Select a saved resume and get a deterministic, rule-based ATS compatibility report.
        </p>
      </motion.div>

      {/* Input form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-6"
      >
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Select resume to analyze</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                disabled={loadingResumes}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors disabled:opacity-50"
              >
                <option value="">
                  {loadingResumes ? 'Loading resumes…' : resumes?.length ? 'Select a resume…' : 'No saved resumes yet — create one first'}
                </option>
                {resumes?.map((r) => (
                  <option key={r._id} value={r._id}>{r.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Job description <span className="text-slate-400 font-normal">(optional — for keyword match scoring)</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                placeholder="Paste a job description here to see how well your resume matches it…"
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>

            <Button
              type="submit"
              icon={Sparkles}
              loading={isPending}
              disabled={!selectedId}
              className="w-full justify-center sm:w-auto"
            >
              Analyze Resume
            </Button>
          </form>
        </Card>
      </motion.div>

      {/* Empty state — no resumes at all */}
      {!loadingResumes && resumes?.length === 0 && (
        <Card>
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <FileText className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700 mb-1">No resumes to analyze yet</p>
            <p className="text-xs text-slate-400">Create a resume first, then come back here to check its ATS score.</p>
          </div>
        </Card>
      )}

      {/* Loading state */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-16 text-slate-500"
          >
            <Spinner size="md" />
            <span className="text-sm">Analyzing resume…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {isError && !isPending && (
        <Card className="border-red-100">
          <p className="text-sm text-red-500 text-center py-4">
            Something went wrong analyzing your resume. Please try again.
          </p>
        </Card>
      )}

      {/* Results */}
      <AnimatePresence>
        {report && !isPending && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ATSScoreCard score={report.overallScore} jdMatch={report.jdMatch} />
              <ATSCategoryBreakdown report={report} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <MissingKeywordsCard report={report} />
              <SuggestionsCard report={report} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ATSAnalyzerPage
