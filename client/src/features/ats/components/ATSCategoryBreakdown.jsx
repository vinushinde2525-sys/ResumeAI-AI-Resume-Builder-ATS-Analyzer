import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'

const CATEGORIES = [
  { key: 'keywordScore',     label: 'Keywords' },
  { key: 'formattingScore',  label: 'Formatting' },
  { key: 'readabilityScore', label: 'Readability' },
  { key: 'completenessScore', label: 'Completeness' },
]

const barColor = (score) =>
  score >= 80 ? 'bg-teal-400' : score >= 60 ? 'bg-brand-400' : score >= 40 ? 'bg-amber-400' : 'bg-red-400'

const ATSCategoryBreakdown = ({ report }) => (
  <Card>
    <Card.Header>
      <Card.Title>Category Breakdown</Card.Title>
    </Card.Header>
    <div className="space-y-4">
      {CATEGORIES.map(({ key, label }, i) => {
        const score = report[key]
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm text-slate-600">{label}</span>
            <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                className={`h-full rounded-full ${barColor(score)}`}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-sm font-bold text-slate-900">{score}</span>
          </div>
        )
      })}
    </div>
  </Card>
)

export default ATSCategoryBreakdown
