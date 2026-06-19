import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, DollarSign, ExternalLink, Plus } from 'lucide-react'
import { useJobDetail, useJobMatch } from '../hooks/useJobs'
import { useResumeList } from '../../resume/hooks/useResumes'
import { useCreateApplication } from '../../applications/hooks/useApplications'
import JobMatchCard from '../components/JobMatchCard'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import Skeleton from '../../../components/ui/Skeleton'

const JobDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: job, isLoading } = useJobDetail(id)
  const { data: resumes } = useResumeList()
  const [selectedResumeId, setSelectedResumeId] = useState('')

  const { data: match, isLoading: matchLoading } = useJobMatch(id, selectedResumeId)
  const { mutate: addToTracker, isPending: isAdding } = useCreateApplication()

  const handleAddToTracker = () => {
    addToTracker({
      jobId: id,
      resumeId: selectedResumeId || undefined,
      status: 'saved',
      matchScore: match?.matchScore ?? undefined,
    })
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-48 w-full rounded-2xl mb-4" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <button onClick={() => navigate('/jobs')} className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
              <p className="text-sm text-slate-500">{job.company}</p>
            </div>
            {job.url && (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={ExternalLink}>View Posting</Button>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {job.location && <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" />{job.location}</span>}
            {job.salary && <span className="flex items-center gap-1 text-xs text-slate-500"><DollarSign className="h-3.5 w-3.5" />{job.salary}</span>}
            <Badge variant="brand">{job.jobType}</Badge>
            <Badge variant="default">{job.experienceLevel}</Badge>
          </div>

          {job.requiredSkills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.requiredSkills.map(s => (
                <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{s}</span>
              ))}
            </div>
          )}

          {job.description && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>}
        </Card>
      </motion.div>

      <Card className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Check match against resume</label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full sm:w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select a resume…</option>
              {resumes?.map(r => <option key={r._id} value={r._id}>{r.title}</option>)}
            </select>
          </div>
          <Button icon={Plus} loading={isAdding} onClick={handleAddToTracker}>
            Add to Tracker
          </Button>
        </div>
      </Card>

      <JobMatchCard match={match} isLoading={matchLoading} noResumeSelected={!selectedResumeId} />
    </div>
  )
}

export default JobDetailsPage
