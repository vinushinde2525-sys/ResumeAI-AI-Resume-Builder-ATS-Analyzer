import { Link } from 'react-router-dom'
import { Briefcase, MapPin, DollarSign, ExternalLink, Trash2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { formatDate } from '../../../lib/utils'

const JOB_TYPE_BADGE = {
  'full-time':  'brand',
  'part-time':  'default',
  'contract':   'warning',
  'internship': 'accent',
  'freelance':  'default',
}

const MatchPill = ({ score }) => {
  if (score == null) return null
  const color = score >= 70 ? 'text-teal-700 bg-teal-50 border-teal-200'
    : score >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200'
    : 'text-red-600 bg-red-50 border-red-200'
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${color}`}>
      {score}% match
    </span>
  )
}

const JobCard = ({ job, matchScore, onDelete, isDeleting }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <Briefcase className="h-4 w-4 text-brand-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">{job.title}</h3>
            <p className="text-xs text-slate-500 truncate">{job.company}</p>
          </div>
        </div>
        <MatchPill score={matchScore} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {job.location && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="h-3 w-3" />{job.location}
          </span>
        )}
        {job.salary && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <DollarSign className="h-3 w-3" />{job.salary}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3 w-3" />{formatDate(job.createdAt)}
        </span>
      </div>

      {/* Badges */}
      <div className="flex gap-1.5 flex-wrap">
        <Badge variant={JOB_TYPE_BADGE[job.jobType] || 'default'}>{job.jobType}</Badge>
        <Badge variant="default">{job.experienceLevel}</Badge>
      </div>

      {/* Skills */}
      {job.requiredSkills?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.requiredSkills.slice(0, 4).map(s => (
            <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{s}</span>
          ))}
          {job.requiredSkills.length > 4 && (
            <span className="text-xs text-slate-400">+{job.requiredSkills.length - 4}</span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex gap-2 pt-2">
        <Link to={`/jobs/${job._id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full justify-center">View Details</Button>
        </Link>
        {job.url && (
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" icon={ExternalLink} />
          </a>
        )}
        <Button variant="ghost" size="sm" icon={Trash2}
          loading={isDeleting}
          onClick={() => onDelete(job._id)}
          className="text-red-400 hover:text-red-600 hover:bg-red-50"
        />
      </div>
    </Card>
  </motion.div>
)

export default JobCard
