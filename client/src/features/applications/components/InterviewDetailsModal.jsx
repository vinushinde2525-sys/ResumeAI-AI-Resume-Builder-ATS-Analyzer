import { useState, useEffect } from 'react'
import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import { useUpdateApplication, useDeleteApplication } from '../hooks/useApplications'
import { Trash2 } from 'lucide-react'

const InterviewDetailsModal = ({ application, onClose }) => {
  const { mutate: update, isPending } = useUpdateApplication()
  const { mutate: remove } = useDeleteApplication()

  const [notes, setNotes] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')

  useEffect(() => {
    if (application) {
      setNotes(application.notes || '')
      setInterviewDate(application.interviewDate ? application.interviewDate.slice(0, 10) : '')
      setFollowUpDate(application.followUpDate ? application.followUpDate.slice(0, 10) : '')
    }
  }, [application])

  if (!application) return null
  const job = application.jobId

  const handleSave = () => {
    update({
      id: application._id,
      notes,
      interviewDate: interviewDate ? new Date(interviewDate).toISOString() : null,
      followUpDate: followUpDate ? new Date(followUpDate).toISOString() : null,
    }, { onSuccess: onClose })
  }

  const handleDelete = () => {
    if (window.confirm('Remove this application from your tracker?')) {
      remove(application._id)
      onClose()
    }
  }

  return (
    <Modal isOpen={!!application} onClose={onClose} title={job?.title || 'Application Details'} size="md">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">{job?.company}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Interview Date</label>
            <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Follow-up Reminder</label>
            <input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Notes & Preparation Checklist</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            placeholder="Interview prep notes, questions to ask, follow-up tasks…"
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" icon={Trash2} onClick={handleDelete} className="text-red-400 hover:text-red-600 hover:bg-red-50">
            Remove
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button loading={isPending} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InterviewDetailsModal
