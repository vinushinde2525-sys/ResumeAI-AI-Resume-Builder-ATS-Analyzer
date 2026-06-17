import { motion } from 'framer-motion'
import { Lightbulb, ArrowRight } from 'lucide-react'
import Card from '../../../components/ui/Card'

const SuggestionsCard = ({ report }) => (
  <Card className="sm:col-span-2">
    <Card.Header>
      <Card.Title>Improvement Suggestions</Card.Title>
    </Card.Header>

    {report.improvementSuggestions?.length > 0 ? (
      <div className="space-y-2">
        {report.improvementSuggestions.map((suggestion, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-50 mt-0.5">
              <Lightbulb className="h-3.5 w-3.5 text-brand-600" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{suggestion}</p>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="py-8 text-center">
        <p className="text-sm text-slate-500">No major improvements needed — solid resume!</p>
      </div>
    )}

    {report.jdMatch?.matchPercent != null && (
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 border border-brand-100 p-3 text-xs text-brand-700">
        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        Your resume matches <strong>{report.jdMatch.matchPercent}%</strong> of the keywords found in the job description you provided.
      </div>
    )}
  </Card>
)

export default SuggestionsCard
