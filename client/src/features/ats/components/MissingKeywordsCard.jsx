import { motion } from 'framer-motion'
import { X, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'

const PillGroup = ({ items, color, icon: Icon, emptyText }) => (
  <div>
    {items?.length > 0 ? (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${color}`}
          >
            <Icon className="h-3 w-3" />
            {item}
          </motion.span>
        ))}
      </div>
    ) : (
      <p className="text-xs text-slate-400 italic">{emptyText}</p>
    )}
  </div>
)

const MissingKeywordsCard = ({ report }) => (
  <Card className="space-y-5">
    <Card.Header>
      <Card.Title>Missing Keywords & Skills</Card.Title>
    </Card.Header>

    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Missing Keywords</p>
      <PillGroup
        items={report.missingKeywords}
        color="bg-red-50 border-red-200 text-red-600"
        icon={X}
        emptyText="No missing keywords detected — great coverage!"
      />
    </div>

    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Missing Sections</p>
      <PillGroup
        items={report.missingSkills}
        color="bg-amber-50 border-amber-200 text-amber-600"
        icon={AlertCircle}
        emptyText="All key sections are present!"
      />
    </div>

    {report.weakActionVerbs?.length > 0 && (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Weak Phrases Found</p>
        <PillGroup
          items={report.weakActionVerbs}
          color="bg-violet-50 border-violet-200 text-violet-600"
          icon={AlertCircle}
          emptyText=""
        />
      </div>
    )}

    {report.jdMatch?.missingKeywords?.length > 0 && (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Missing from Job Description
        </p>
        <PillGroup
          items={report.jdMatch.missingKeywords}
          color="bg-rose-50 border-rose-200 text-rose-600"
          icon={X}
          emptyText=""
        />
      </div>
    )}
  </Card>
)

export default MissingKeywordsCard
