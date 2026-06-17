import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Big 404 */}
      <p className="text-[120px] font-black leading-none text-slate-100 select-none">404</p>

      {/* Icon */}
      <div className="mb-6 flex justify-center -mt-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
          <span className="text-2xl">🤔</span>
        </div>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mb-8 text-slate-500 max-w-xs mx-auto">
        This page doesn't exist or was moved. Head back and try again.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link to="/">
          <Button icon={Home} variant="primary">Back to home</Button>
        </Link>
        <button onClick={() => window.history.back()}>
          <Button icon={ArrowLeft} variant="secondary">Go back</Button>
        </button>
      </div>
    </motion.div>
  </div>
)

export default NotFoundPage
