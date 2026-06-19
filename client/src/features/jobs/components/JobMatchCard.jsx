import { motion } from 'framer-motion'
import { Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Spinner from '../../../components/ui/Spinner'

const scoreTier = (score) =>
  score >= 70 ? { color: 'text-teal-600', ring: '#14b8a6', label: 'Strong Match' }
  : score >= 50 ? { color: 'text-amber-600', ring: '#f59e0b', label: 'Moderate Match' }
  : { color: 'text-red-500', ring: '#ef4444', label: 'Weak Match' }

const JobMatchCard = ({ match, isLoading, noResumeSelected }) => {
  if (noResumeSelected) {
    return (
      <Card>
        <div className="py-8 text-center text-sm text-slate-400">
          Select a resume above to see your match score against this job.
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center gap-3 py-8 text-slate-500">
          <Spinner size="md" /> <span className="text-sm">Calculating match…</span>
        </div>
      </Card>
    )
  }

  if (!match || match.matchScore == null) {
    return (
      <Card>
        <div className="py-8 text-center text-sm text-slate-400">
          {match?.recommendedImprovements?.[0] || 'Not enough job data to calculate a match score yet.'}
        </div>
      </Card>
    )
  }

  const tier = scoreTier(match.matchScore)
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (match.matchScore / 100) * circumference

  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-brand-600" />
        <h3 className="text-sm font-bold text-slate-900">Job Match Analysis</h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r={radius} fill="none" stroke={tier.ring} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-black ${tier.color}`}>{match.matchScore}</span>
          </div>
        </div>
        <div>
          <p className={`text-sm font-bold ${tier.color}`}>{tier.label}</p>
          <p className="text-xs text-slate-400 mt-0.5">Based on keyword & skill overlap</p>
        </div>
      </div>

      {match.matchingSkills?.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-teal-600 uppercase tracking-wide">
            <CheckCircle2 className="h-3.5 w-3.5" /> Matching Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {match.matchingSkills.map(s => (
              <span key={s} className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-medium text-teal-700">{s}</span>
            ))}
          </div>
        </div>
      )}

      {match.missingSkills?.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-wide">
            <XCircle className="h-3.5 w-3.5" /> Missing Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {match.missingSkills.map(s => (
              <span key={s} className="rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 text-xs font-medium text-red-600">{s}</span>
            ))}
          </div>
        </div>
      )}

      {match.recommendedImprovements?.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-600 uppercase tracking-wide">
            <Lightbulb className="h-3.5 w-3.5" /> Recommendations
          </p>
          <ul className="space-y-1.5">
            {match.recommendedImprovements.map((r, i) => (
              <li key={i} className="text-xs text-slate-600 leading-relaxed">• {r}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}

export default JobMatchCard
