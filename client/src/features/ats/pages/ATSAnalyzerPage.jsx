import { motion } from 'framer-motion'
import { BarChart3, Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'

const PREVIEW_METRICS = [
  { label: 'Keywords Match', score: 72, color: 'text-amber-600 bg-amber-50', status: 'warning' },
  { label: 'Formatting',     score: 90, color: 'text-teal-600 bg-teal-50',   status: 'good' },
  { label: 'Completeness',   score: 85, color: 'text-brand-600 bg-brand-50', status: 'good' },
  { label: 'Readability',    score: 68, color: 'text-red-500 bg-red-50',     status: 'poor' },
]

const ATSAnalyzerPage = () => (
  <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
          <BarChart3 className="h-5 w-5 text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ATS Analyzer</h1>
        <Badge variant="warning">Coming in Phase F</Badge>
      </div>
      <p className="text-sm text-slate-500">
        Upload your resume and get a detailed ATS compatibility score with actionable feedback.
      </p>
    </motion.div>

    {/* Upload zone preview */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      className="mb-6"
    >
      <Card>
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Upload className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Drop your resume PDF here</p>
          <p className="text-xs text-slate-400 mb-4">PDF files up to 5MB</p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm text-slate-400 cursor-not-allowed">
            <FileText className="h-4 w-4" />
            Choose file — available in Phase F
          </div>
        </div>
      </Card>
    </motion.div>

    {/* Score preview (what it'll look like) */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.16 }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
        Preview — What your report will look like
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Overall score card */}
        <Card className="flex flex-col items-center justify-center py-8 gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Overall ATS Score</p>
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-teal-100">
            <span className="text-4xl font-black text-teal-600">78</span>
          </div>
          <Badge variant="accent">Good</Badge>
        </Card>

        {/* Category breakdown */}
        <Card className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Category Breakdown</p>
          {PREVIEW_METRICS.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-slate-600">{m.label}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.score}%` }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  className={`h-full rounded-full ${m.score >= 80 ? 'bg-teal-400' : m.score >= 65 ? 'bg-amber-400' : 'bg-red-400'}`}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-xs font-semibold text-slate-700">{m.score}</span>
            </div>
          ))}
        </Card>
      </div>
    </motion.div>
  </div>
)

export default ATSAnalyzerPage
