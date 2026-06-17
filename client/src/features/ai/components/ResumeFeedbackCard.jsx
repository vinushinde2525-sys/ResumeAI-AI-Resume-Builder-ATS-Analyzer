import { useState } from 'react'
import { ClipboardCheck, Wand2, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import Badge from '../../../components/ui/Badge'
import { useResumeFeedback } from '../hooks/useAI'
import { useResumeList } from '../../resume/hooks/useResumes'

/**
 * ResumeFeedbackCard — lets user pick one of their saved resumes
 * and get structured AI feedback: score, strengths, improvements, missing elements.
 */
const ResumeFeedbackCard = () => {
  const { data: resumes, isLoading: loadingResumes } = useResumeList()
  const [selectedId, setSelectedId] = useState('')
  const { mutate, isPending, data } = useResumeFeedback()

  const handleSubmit = (e) => {
    e.preventDefault()
    const resume = resumes?.find((r) => r._id === selectedId)
    if (!resume) return
    mutate({ resumeData: resume.data })
  }

  const feedback = data?.result
  const scoreColor = (score) =>
    score >= 80 ? 'text-teal-600 bg-teal-50 border-teal-200'
    : score >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-red-500 bg-red-50 border-red-200'

  return (
    <Card className="flex flex-col gap-4 sm:col-span-2">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50">
          <ClipboardCheck className="h-4.5 w-4.5 text-rose-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Resume Feedback</h3>
          <p className="text-xs text-slate-500">Get structured AI feedback on one of your saved resumes</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          disabled={loadingResumes}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors disabled:opacity-50"
        >
          <option value="">
            {loadingResumes ? 'Loading resumes…' : resumes?.length ? 'Select a resume…' : 'No saved resumes yet'}
          </option>
          {resumes?.map((r) => (
            <option key={r._id} value={r._id}>{r.title}</option>
          ))}
        </select>
        <Button
          type="submit"
          icon={Wand2}
          loading={isPending}
          disabled={!selectedId}
          className="shrink-0"
        >
          Analyze Resume
        </Button>
      </form>

      {/* Result */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 min-h-[120px]">
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-6 text-sm text-slate-500"
            >
              <Spinner size="sm" />
              Analyzing your resume…
            </motion.div>
          ) : feedback ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 space-y-5"
            >
              {/* Score */}
              {feedback.overallScore != null && (
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 ${scoreColor(feedback.overallScore)}`}>
                    <span className="text-2xl font-black">{feedback.overallScore}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Overall Resume Score</p>
                    <p className="text-xs text-slate-500">{feedback.topRecommendation}</p>
                  </div>
                </div>
              )}

              {/* Strengths */}
              {feedback.strengths?.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Strengths
                  </p>
                  <ul className="space-y-1.5">
                    {feedback.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <span className="text-teal-500">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {feedback.improvements?.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-600">
                    <AlertTriangle className="h-3.5 w-3.5" /> Areas to Improve
                  </p>
                  <div className="space-y-2">
                    {feedback.improvements.map((imp, i) => (
                      <div key={i} className="rounded-lg bg-white border border-slate-200 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="warning">{imp.section}</Badge>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{imp.issue}</p>
                        <p className="text-xs text-slate-900 font-medium">→ {imp.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing elements */}
              {feedback.missingElements?.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-violet-600">
                    <Lightbulb className="h-3.5 w-3.5" /> Missing Elements
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {feedback.missingElements.map((m, i) => (
                      <span key={i} className="rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-medium text-violet-700">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-6 text-sm text-slate-400 italic"
            >
              Select a resume above and click "Analyze Resume" to get structured AI feedback…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

export default ResumeFeedbackCard
