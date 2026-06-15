import { Link } from 'react-router-dom'
import { FileText, Plus, BarChart3, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

const DashboardPage = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back! Here's your resume overview.</p>
        </div>
        <Link to="/resumes/new">
          <Button icon={Plus}>New Resume</Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {[
          { label: 'Total Resumes', value: '0', icon: FileText, color: 'text-brand-600 bg-brand-50' },
          { label: 'ATS Reports', value: '0', icon: BarChart3, color: 'text-teal-600 bg-teal-50' },
          { label: 'AI Generations', value: '0', icon: Zap, color: 'text-violet-600 bg-violet-50' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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

      {/* Empty state */}
      <Card>
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
            <FileText className="h-7 w-7 text-brand-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No resumes yet</h3>
          <p className="text-sm text-slate-500 mb-6">Create your first resume to get started.</p>
          <Link to="/resumes/new">
            <Button icon={Plus}>Create resume</Button>
          </Link>
        </div>
      </Card>
    </div>
  </div>
)

export default DashboardPage
