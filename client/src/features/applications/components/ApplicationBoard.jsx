import { useState, useMemo } from 'react'
import ApplicationColumn from './ApplicationColumn'
import InterviewDetailsModal from './InterviewDetailsModal'
import { useApplicationList, useUpdateApplication, useDeleteApplication } from '../hooks/useApplications'
import Skeleton from '../../../components/ui/Skeleton'

const COLUMNS = [
  { status: 'saved',      label: 'Saved',           color: 'bg-slate-400' },
  { status: 'applied',    label: 'Applied',         color: 'bg-brand-400' },
  { status: 'screening',  label: 'Screening',       color: 'bg-amber-400' },
  { status: 'interview',  label: 'Interview',       color: 'bg-violet-400' },
  { status: 'technical',  label: 'Technical Round', color: 'bg-indigo-400' },
  { status: 'final',      label: 'Final Round',     color: 'bg-purple-400' },
  { status: 'offer',      label: 'Offer',           color: 'bg-teal-400' },
  { status: 'rejected',   label: 'Rejected',        color: 'bg-red-400' },
]

const ApplicationBoard = () => {
  const { data: applications, isLoading } = useApplicationList()
  const { mutate: updateApp } = useUpdateApplication()
  const { mutate: deleteApp } = useDeleteApplication()
  const [selectedApp, setSelectedApp] = useState(null)

  const grouped = useMemo(() => {
    const g = {}
    COLUMNS.forEach(c => { g[c.status] = [] })
    applications?.forEach(app => { g[app.status]?.push(app) })
    return g
  }, [applications])

  const handleDragStart = (e, applicationId) => {
    e.dataTransfer.setData('applicationId', applicationId)
  }

  const handleDrop = (applicationId, newStatus) => {
    updateApp({ id: applicationId, status: newStatus })
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this application?')) deleteApp(id)
  }

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map(c => <Skeleton key={c.status} className="h-96 w-56 shrink-0 rounded-xl" />)}
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <ApplicationColumn
            key={col.status}
            status={col.status}
            label={col.label}
            color={col.color}
            applications={grouped[col.status] || []}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDelete={handleDelete}
            onCardClick={setSelectedApp}
          />
        ))}
      </div>

      <InterviewDetailsModal application={selectedApp} onClose={() => setSelectedApp(null)} />
    </>
  )
}

export default ApplicationBoard
