import { motion } from 'framer-motion'
import { TrendingUp, Award, XCircle, Target, Send, BarChart3 } from 'lucide-react'
import { useApplicationAnalytics, useApplicationList } from '../../applications/hooks/useApplications'
import Card from '../../../components/ui/Card'
import Skeleton from '../../../components/ui/Skeleton'

const StatCard = ({ label, value, suffix = '', icon: Icon, color, delay }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
    <Card>
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}{suffix}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </Card>
  </motion.div>
)

const STATUS_LABELS = {
  saved: 'Saved', applied: 'Applied', screening: 'Screening', interview: 'Interview',
  technical: 'Technical', final: 'Final Round', offer: 'Offer', rejected: 'Rejected',
}

const JobAnalyticsPage = () => {
  const { data: analytics, isLoading } = useApplicationAnalytics()
  const { data: applications } = useApplicationList()

  const topMatches = applications
    ?.filter(a => a.matchScore != null)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    )
  }

  if (!analytics || analytics.total === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <BarChart3 className="h-7 w-7 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">No application data yet</h3>
        <p className="text-sm text-slate-500">Add jobs to your tracker to see analytics here.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
            <BarChart3 className="h-5 w-5 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Job Search Analytics</h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">Track your job search performance over time</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Applications" value={analytics.total} icon={Send} color="text-brand-600 bg-brand-50" delay={0} />
        <StatCard label="Interview Rate" value={analytics.interviewRate} suffix="%" icon={TrendingUp} color="text-violet-600 bg-violet-50" delay={0.05} />
        <StatCard label="Offer Rate" value={analytics.offerRate} suffix="%" icon={Award} color="text-teal-600 bg-teal-50" delay={0.1} />
        <StatCard label="Rejection Rate" value={analytics.rejectionRate} suffix="%" icon={XCircle} color="text-red-500 bg-red-50" delay={0.15} />
        <StatCard label="Avg Match Score" value={analytics.avgMatchScore ?? '—'} suffix={analytics.avgMatchScore != null ? '%' : ''} icon={Target} color="text-amber-600 bg-amber-50" delay={0.2} />
      </div>

      {/* Status breakdown */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-6">
        <Card>
          <Card.Header><Card.Title>Pipeline Breakdown</Card.Title></Card.Header>
          <div className="space-y-3">
            {Object.entries(analytics.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm text-slate-600">{STATUS_LABELS[status]}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: analytics.total ? `${(count / analytics.total) * 100}%` : '0%' }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-brand-400"
                  />
                </div>
                <span className="w-8 text-right text-sm font-bold text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Top matching jobs */}
      {topMatches?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <Card.Header><Card.Title>Top Matching Jobs</Card.Title></Card.Header>
            <div className="space-y-2">
              {topMatches.map((app) => (
                <div key={app._id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{app.jobId?.title}</p>
                    <p className="text-xs text-slate-400">{app.jobId?.company}</p>
                  </div>
                  <span className={`text-sm font-bold ${app.matchScore >= 70 ? 'text-teal-600' : 'text-amber-600'}`}>
                    {app.matchScore}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default JobAnalyticsPage
