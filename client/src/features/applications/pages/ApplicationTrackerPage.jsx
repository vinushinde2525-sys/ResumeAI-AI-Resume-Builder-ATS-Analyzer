import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutGrid, BarChart3 } from 'lucide-react'
import ApplicationBoard from '../components/ApplicationBoard'
import Button from '../../../components/ui/Button'

const ApplicationTrackerPage = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
          <LayoutGrid className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Application Tracker</h1>
          <p className="text-sm text-slate-500 mt-0.5">Drag cards between columns to update status</p>
        </div>
      </div>
      <Link to="/jobs/analytics">
        <Button variant="secondary" icon={BarChart3}>View Analytics</Button>
      </Link>
    </motion.div>

    <ApplicationBoard />
  </div>
)

export default ApplicationTrackerPage
