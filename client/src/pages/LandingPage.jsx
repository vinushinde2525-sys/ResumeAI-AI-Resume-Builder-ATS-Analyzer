import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Zap, BarChart3, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'

const LandingPage = () => (
  <div className="min-h-screen bg-white">
    {/* Navbar */}
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">ResumeAI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">Get started free</Button>
          </Link>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          <Zap className="h-3.5 w-3.5" />
          AI-Powered Resume Builder
        </div>
        <h1 className="mb-6 text-5xl font-black text-slate-900 leading-tight tracking-tight">
          Build resumes that get<br />
          <span className="text-brand-600">you hired.</span>
        </h1>
        <p className="mb-8 text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          AI-powered suggestions, real-time ATS scoring, and beautiful templates.
          Go from blank page to interview in minutes.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/register">
            <Button size="lg" icon={ArrowRight}>Start building free</Button>
          </Link>
          <Link to="/resumes/new">
            <Button size="lg" variant="secondary">Try the editor</Button>
          </Link>
        </div>
      </motion.div>
    </section>

    {/* Feature grid */}
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            icon: FileText,
            title: 'Smart Editor',
            desc: 'Real-time preview as you type. Export to clean PDF in one click.',
            color: 'bg-brand-50 text-brand-600',
          },
          {
            icon: Zap,
            title: 'AI Assistant',
            desc: 'Generate summaries, suggest skills, and improve your bullet points with AI.',
            color: 'bg-teal-50 text-teal-600',
          },
          {
            icon: BarChart3,
            title: 'ATS Analyzer',
            desc: 'Upload any resume. Get a detailed score with actionable improvements.',
            color: 'bg-violet-50 text-violet-600',
          },
        ].map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.color}`}>
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
)

export default LandingPage
