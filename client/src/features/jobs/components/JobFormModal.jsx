import { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { useCreateJob } from '../hooks/useJobs'

const JobFormModal = ({ isOpen, onClose }) => {
  const { mutate: createJob, isPending } = useCreateJob()
  const [form, setForm] = useState({
    title: '', company: '', location: '', salary: '', description: '',
    requiredSkills: '', jobType: 'full-time', experienceLevel: 'mid', url: '',
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    createJob({
      ...form,
      requiredSkills: form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
    }, { onSuccess: onClose })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save a Job" size="lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Job Title" value={form.title} onChange={set('title')} placeholder="React Developer" required />
          <Input label="Company" value={form.company} onChange={set('company')} placeholder="Google" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Location" value={form.location} onChange={set('location')} placeholder="Remote / Mumbai" />
          <Input label="Salary" value={form.salary} onChange={set('salary')} placeholder="₹15-20 LPA" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Job Type</label>
            <select value={form.jobType} onChange={set('jobType')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              {['full-time','part-time','contract','internship','freelance'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Experience Level</label>
            <select value={form.experienceLevel} onChange={set('experienceLevel')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              {['entry','mid','senior','lead'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <Input label="Job URL" value={form.url} onChange={set('url')} placeholder="https://..." />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Required Skills (comma-separated)</label>
          <input value={form.requiredSkills} onChange={set('requiredSkills')} placeholder="React, Node.js, MongoDB"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Job Description</label>
          <textarea value={form.description} onChange={set('description')} rows={4}
            placeholder="Paste the job description here for accurate match scoring…"
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending} disabled={!form.title || !form.company}>Save Job</Button>
        </div>
      </form>
    </Modal>
  )
}

export default JobFormModal
