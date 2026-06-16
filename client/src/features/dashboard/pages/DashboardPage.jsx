import { Link } from 'react-router-dom'
import { FileText, Plus, BarChart3, Zap, Pencil, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../../app/authStore'
import { useResumeList } from '../../resume/hooks/useResumes'
import { formatDate } from '../../../lib/utils'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Skeleton from '../../../components/ui/Skeleton'

// Animated stat card
const StatCard = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <Card>
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </Card>
  </motion.div>
)

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user)
  const { data: resumes, isLoading } = useResumeList()
  const recentResumes = resumes?.slice(0, 3) || []

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your resume activity.
          </p>
        </div>
        <Link to="/resumes/new">
          <Button icon={Plus}>New Resume</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Resumes"
          value={isLoading ? '—' : (resumes?.length ?? 0)}
          icon={FileText}
          color="text-brand-600 bg-brand-50"
          delay={0}
        />
        <StatCard label="ATS Reports" value="0" icon={BarChart3} color="text-teal-600 bg-teal-50" delay={0.07} />
        <StatCard label="AI Generations" value="0" icon={Zap} color="text-violet-600 bg-violet-50" delay={0.14} />
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { to: '/resumes/new', icon: FileText, color: 'bg-brand-50 text-brand-600', title: 'Build a Resume', desc: 'Create a new resume with our live editor' },
          { to: '/ats', icon: BarChart3, color: 'bg-teal-50 text-teal-600', title: 'Analyze Your Resume', desc: 'Upload a PDF and get your ATS score' },
        ].map(({ to, icon: Icon, color, title, desc }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
          >
            <Link to={to}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent resumes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <Card>
          <Card.Header>
            <Card.Title>Recent Resumes</Card.Title>
            {resumes?.length > 0 && (
              <Link to="/resumes" className="flex items-center gap-1 text-xs text-brand-600 hover:underline font-medium">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </Card.Header>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-3">
              {[1,2].map(i => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3.5 w-1/3 mb-1.5" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-7 w-12 rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && recentResumes.length === 0 && (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <FileText className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">No resumes yet</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Create your first resume to see it here</p>
              <Link to="/resumes/new">
                <Button size="sm" icon={Plus}>Create resume</Button>
              </Link>
            </div>
          )}

          {/* List */}
          {!isLoading && recentResumes.length > 0 && (
            <div className="space-y-2">
              {recentResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                    <FileText className="h-4 w-4 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{resume.title}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      {formatDate(resume.updatedAt)}
                    </p>
                  </div>
                  <Link to={`/resumes/${resume._id}`}>
                    <Button variant="ghost" size="sm" icon={Pencil}>Edit</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

export default DashboardPage
