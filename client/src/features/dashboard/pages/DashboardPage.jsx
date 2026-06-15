import { Link } from 'react-router-dom'
import { FileText, Plus, BarChart3, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../../app/authStore'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user)

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

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Resumes', value: '0', icon: FileText, color: 'text-brand-600 bg-brand-50' },
          { label: 'ATS Reports', value: '0', icon: BarChart3, color: 'text-teal-600 bg-teal-50' },
          { label: 'AI Generations', value: '0', icon: Zap, color: 'text-violet-600 bg-violet-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <Card>
              <div className="flex items-center gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <Link to="/resumes/new" className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                <FileText className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Build a Resume</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Create a new resume with our live editor
                </p>
              </div>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <Link to="/ats" className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                <BarChart3 className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Analyze Your Resume</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Upload a PDF and get your ATS score
                </p>
              </div>
            </Link>
          </Card>
        </motion.div>
      </div>

      {/* Empty state — recent resumes */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Resumes</Card.Title>
          <Link to="/resumes" className="text-xs text-brand-600 hover:underline font-medium">
            View all →
          </Link>
        </Card.Header>
        <div className="py-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <FileText className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-700">No resumes yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Create your first resume to see it here
          </p>
          <Link to="/resumes/new">
            <Button size="sm" icon={Plus}>Create resume</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage
