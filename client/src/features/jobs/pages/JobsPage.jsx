import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Plus } from 'lucide-react'
import { useJobList, useDeleteJob } from '../hooks/useJobs'
import { useResumeList } from '../../resume/hooks/useResumes'
import JobCard from '../components/JobCard'
import JobFilters from '../components/JobFilters'
import JobSearchBar from '../components/JobSearchBar'
import JobFormModal from '../components/JobFormModal'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Skeleton from '../../../components/ui/Skeleton'

const JobsPage = () => {
  const { data: jobs, isLoading } = useJobList()
  const { data: resumes } = useResumeList()
  const { mutate: deleteJob, isPending: isDeleting, variables: deletingId } = useDeleteJob()

  const [search, setSearch] = useState('')
  const [jobType, setJobType] = useState('all')
  const [experienceLevel, setExperienceLevel] = useState('all')
  const [showForm, setShowForm] = useState(false)

  const filtered = useMemo(() => {
    if (!jobs) return []
    return jobs.filter(j => {
      const matchesSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
      const matchesType = jobType === 'all' || j.jobType === jobType
      const matchesLevel = experienceLevel === 'all' || j.experienceLevel === experienceLevel
      return matchesSearch && matchesType && matchesLevel
    })
  }, [jobs, search, jobType, experienceLevel])

  const handleDelete = (id) => {
    if (window.confirm('Remove this job?')) deleteJob(id)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900">Saved Jobs</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {jobs ? `${jobs.length} job${jobs.length !== 1 ? 's' : ''} saved` : 'Loading…'}
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowForm(true)}>Save Job</Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <JobSearchBar value={search} onChange={setSearch} />
        <JobFilters jobType={jobType} setJobType={setJobType} experienceLevel={experienceLevel} setExperienceLevel={setExperienceLevel} />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      )}

      {!isLoading && jobs?.length === 0 && (
        <Card>
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Briefcase className="h-7 w-7 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">No saved jobs yet</h3>
            <p className="text-sm text-slate-500 mb-6">Save jobs you're interested in to track matches and applications.</p>
            <Button icon={Plus} onClick={() => setShowForm(true)}>Save your first job</Button>
          </div>
        </Card>
      )}

      {!isLoading && jobs?.length > 0 && filtered.length === 0 && (
        <Card><div className="py-12 text-center text-sm text-slate-400">No jobs match your filters.</div></Card>
      )}

      {!isLoading && filtered.length > 0 && (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map(job => (
              <JobCard
                key={job._id}
                job={job}
                matchScore={null}
                onDelete={handleDelete}
                isDeleting={isDeleting && deletingId === job._id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <JobFormModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}

export default JobsPage
