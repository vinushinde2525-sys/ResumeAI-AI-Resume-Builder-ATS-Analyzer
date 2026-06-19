import { Trash2, Calendar, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDate } from '../../../lib/utils'

/**
 * ApplicationCard — draggable card using native HTML5 drag-and-drop.
 * WHY NATIVE DRAG-AND-DROP (not a library like react-beautiful-dnd):
 * Zero extra dependencies, fully supported by all modern browsers,
 * and sufficient for a single-board Kanban with 8 columns. A library
 * would add ~30kb for functionality the browser already provides.
 */
const ApplicationCard = ({ application, onDragStart, onDelete, onClick }) => {
  const job = application.jobId // populated by backend

  return (
    <motion.div
      layout
      draggable
      onDragStart={(e) => onDragStart(e, application._id)}
      onClick={() => onClick(application)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="cursor-grab active:cursor-grabbing rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <Briefcase className="h-3.5 w-3.5 text-brand-500 shrink-0" />
          <p className="text-xs font-bold text-slate-900 truncate">{job?.title || 'Untitled'}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(application._id) }}
          className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-xs text-slate-500 truncate mb-2">{job?.company}</p>

      <div className="flex items-center justify-between">
        {application.matchScore != null && (
          <span className={`text-xs font-bold ${application.matchScore >= 70 ? 'text-teal-600' : application.matchScore >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
            {application.matchScore}% match
          </span>
        )}
        {application.interviewDate && (
          <span className="flex items-center gap-1 text-xs text-violet-500">
            <Calendar className="h-3 w-3" /> {formatDate(application.interviewDate)}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default ApplicationCard
