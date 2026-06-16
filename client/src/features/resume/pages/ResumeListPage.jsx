import { Link } from 'react-router-dom'
import { Plus, FileText, Pencil, Trash2, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate } from '../../../lib/utils'
import { useResumeList, useDeleteResume } from '../hooks/useResumes'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Skeleton from '../../../components/ui/Skeleton'
import Badge from '../../../components/ui/Badge'

// Skeleton card shown while loading
const ResumeCardSkeleton = () => (
  <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-3 w-1/3 mb-4" />
    <Skeleton className="h-24 w-full mb-3" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
  </div>
)

// Single resume card
const ResumeCard = ({ resume, onDelete, isDeleting }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <FileText className="h-4 w-4 text-brand-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">{resume.title}</h3>
            {resume.data?.personal?.name && (
              <p className="text-xs text-slate-400 truncate">{resume.data.personal.name}</p>
            )}
          </div>
        </div>
        <Badge variant="default">{resume.templateId || 'classic'}</Badge>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="h-3.5 w-3.5" />
        <span>Updated {formatDate(resume.updatedAt)}</span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Link to={`/resumes/${resume._id}`} className="flex-1">
          <Button variant="primary" size="sm" icon={Pencil} className="w-full justify-center">
            Edit
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          icon={Trash2}
          loading={isDeleting}
          onClick={() => onDelete(resume._id)}
          className="text-red-400 hover:bg-red-50 hover:text-red-600"
        >
          Delete
        </Button>
      </div>
    </Card>
  </motion.div>
)

const ResumeListPage = () => {
  const { data: resumes, isLoading, isError } = useResumeList()
  const { mutate: deleteResume, isPending: isDeleting, variables: deletingId } = useDeleteResume()

  const handleDelete = (id) => {
    if (window.confirm('Delete this resume? This cannot be undone.')) {
      deleteResume(id)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
          <p className="mt-1 text-sm text-slate-500">
            {resumes ? `${resumes.length} resume${resumes.length !== 1 ? 's' : ''}` : 'Loading…'}
          </p>
        </div>
        <Link to="/resumes/new">
          <Button icon={Plus}>New Resume</Button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <ResumeCardSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="py-12 text-center">
          <p className="text-sm text-red-500 mb-4">Failed to load resumes</p>
          <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      )}

      {/* Empty state */}
      {!isLoading && !isError && resumes?.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <FileText className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">No resumes yet</h3>
              <p className="text-sm text-slate-500 mb-6">
                Create your first resume to get started.
              </p>
              <Link to="/resumes/new">
                <Button icon={Plus}>Create your first resume</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Resume grid */}
      {!isLoading && !isError && resumes?.length > 0 && (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onDelete={handleDelete}
                isDeleting={isDeleting && deletingId === resume._id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default ResumeListPage
