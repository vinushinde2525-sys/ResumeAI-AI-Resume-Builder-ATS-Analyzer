import { useState } from 'react'
import { motion } from 'framer-motion'
import ApplicationCard from './ApplicationCard'

const ApplicationColumn = ({ status, label, color, applications, onDrop, onDragStart, onDelete, onCardClick }) => {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e) => { e.preventDefault(); setIsOver(true) }
  const handleDragLeave = () => setIsOver(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsOver(false)
    const applicationId = e.dataTransfer.getData('applicationId')
    if (applicationId) onDrop(applicationId, status)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col gap-2 rounded-xl border-2 p-3 min-w-[220px] transition-colors
        ${isOver ? 'border-brand-400 bg-brand-50/50' : 'border-transparent bg-slate-50'}`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${color}`} />
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</p>
        </div>
        <span className="text-xs text-slate-400 font-medium">{applications.length}</span>
      </div>

      <div className="flex flex-col gap-2 min-h-[60px]">
        {applications.map((app) => (
          <ApplicationCard
            key={app._id}
            application={app}
            onDragStart={onDragStart}
            onDelete={onDelete}
            onClick={onCardClick}
          />
        ))}
        {applications.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-xs text-slate-300">
            Drop here
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationColumn
