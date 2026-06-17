import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'

/**
 * ATSScoreCard — big circular score display.
 * Uses SVG stroke-dasharray trick for the progress ring (no chart library needed).
 */
const ATSScoreCard = ({ score, jdMatch }) => {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const tier =
    score >= 80 ? { label: 'Excellent', color: 'text-teal-600', ring: '#14b8a6', badge: 'accent' } :
    score >= 60 ? { label: 'Good', color: 'text-brand-600', ring: '#6366f1', badge: 'brand' } :
    score >= 40 ? { label: 'Needs Work', color: 'text-amber-600', ring: '#f59e0b', badge: 'warning' } :
    { label: 'Poor', color: 'text-red-500', ring: '#ef4444', badge: 'danger' }

  return (
    <Card className="flex flex-col items-center justify-center gap-3 py-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Overall ATS Score</p>

      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={tier.ring} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-black ${tier.color}`}>{score}</span>
        </div>
      </div>

      <Badge variant={tier.badge}>{tier.label}</Badge>

      {jdMatch?.matchPercent != null && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs">
          <span className="text-slate-500">Job Match:</span>
          <span className="font-bold text-slate-900">{jdMatch.matchPercent}%</span>
        </div>
      )}
    </Card>
  )
}

export default ATSScoreCard
