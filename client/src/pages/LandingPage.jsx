import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText, Zap, BarChart3, ArrowRight, Check,
  Sparkles, Shield, Download, ChevronRight
} from 'lucide-react'
import Button from '../components/ui/Button'

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay },
})

// ── Section: Navbar ───────────────────────────────────────────────────────────
const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <FileText className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900 tracking-tight">ResumeAI</span>
      </Link>

      <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="ghost" size="sm">Sign in</Button>
        </Link>
        <Link to="/register">
          <Button variant="primary" size="sm">
            Get started free
          </Button>
        </Link>
      </div>
    </div>
  </nav>
)

// ── Section: Hero ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative overflow-hidden bg-white pt-20 pb-28">
    {/* Subtle background grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />

    {/* Gradient orb */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-400 opacity-[0.08] blur-3xl pointer-events-none" />

    <div className="relative mx-auto max-w-4xl px-6 text-center">
      {/* Badge */}
      <motion.div {...fadeUp(0)}>
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Resume Builder
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.08)}
        className="mb-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.05]"
      >
        Resumes that get{' '}
        <span className="relative">
          <span className="relative z-10 text-brand-600">you hired</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="absolute bottom-1 left-0 right-0 h-3 bg-brand-100 -z-10 rounded"
          />
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        {...fadeUp(0.16)}
        className="mb-10 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed sm:text-xl"
      >
        Build a professional resume with our live editor, get AI-powered improvement suggestions,
        and check your ATS score before you apply — all in one place.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/register">
          <Button size="lg" className="gap-2 pl-6 pr-5 shadow-lg shadow-brand-200">
            Start building free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/login">
          <Button size="lg" variant="secondary">
            Sign in to dashboard
          </Button>
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.p {...fadeIn(0.5)} className="mt-8 text-sm text-slate-400">
        Free to use · No credit card required · Built by Vinu Shinde
      </motion.p>
    </div>
  </section>
)

// ── Section: Features ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: FileText,
    color: 'bg-brand-50 text-brand-600 ring-brand-100',
    title: 'Live Resume Editor',
    desc: 'Edit your resume and see changes reflected instantly in a pixel-perfect preview. Export to PDF in one click.',
    points: ['Real-time live preview', 'Editable title & sections', 'PDF export via print'],
  },
  {
    icon: Zap,
    color: 'bg-amber-50 text-amber-600 ring-amber-100',
    title: 'AI Assistant',
    desc: 'Let AI write your professional summary, suggest missing skills, and improve every bullet point.',
    points: ['AI summary generator', 'Skills suggester', 'Bullet point enhancer'],
  },
  {
    icon: BarChart3,
    color: 'bg-teal-50 text-teal-600 ring-teal-100',
    title: 'ATS Analyzer',
    desc: 'Upload any resume and instantly get an ATS compatibility score with detailed, actionable feedback.',
    points: ['Overall ATS score', 'Missing keywords', 'Formatting suggestions'],
  },
]

const Features = () => (
  <section id="features" className="bg-slate-50 py-24">
    <div className="mx-auto max-w-5xl px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">Features</p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
          Everything you need to land the job
        </h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          A complete resume toolkit — editor, AI assistant, and ATS analyzer — in one focused product.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-4 ${f.color}`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-base font-bold text-slate-900">{f.title}</h3>
            <p className="mb-5 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            <ul className="space-y-2">
              {f.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="h-3.5 w-3.5 shrink-0 text-teal-500" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ── Section: How it works ─────────────────────────────────────────────────────
const STEPS = [
  { n: '01', icon: FileText, title: 'Build your resume', desc: 'Fill in your details in our clean editor. The live preview updates instantly as you type.' },
  { n: '02', icon: Zap,      title: 'Improve with AI',  desc: 'Use the AI assistant to generate a professional summary and get smart suggestions for every section.' },
  { n: '03', icon: BarChart3, title: 'Check ATS score', desc: 'Upload your resume and get a detailed ATS score with specific, actionable improvement steps.' },
  { n: '04', icon: Download,  title: 'Export & apply',  desc: 'Download a clean PDF and apply with confidence. Your resume is ready for any ATS system.' },
]

const HowItWorks = () => (
  <section id="how-it-works" className="bg-white py-24">
    <div className="mx-auto max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">Process</p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
          From blank page to interview-ready
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.09 }}
            className="relative"
          >
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute top-5 left-full hidden lg:block w-full h-px bg-slate-200 -translate-x-4" />
            )}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-slate-100 leading-none select-none">{step.n}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
                  <step.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ── Section: CTA ──────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="bg-brand-600 py-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mx-auto max-w-2xl px-6 text-center"
    >
      <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl tracking-tight">
        Ready to build a better resume?
      </h2>
      <p className="mb-8 text-brand-200 leading-relaxed">
        Join and start building your resume in minutes. Free, forever.
      </p>
      <Link to="/register">
        <Button
          size="lg"
          className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-brand-800/30 gap-2"
        >
          Get started free
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  </section>
)

// ── Section: Footer ───────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-slate-100 bg-white py-10">
    <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
          <FileText className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-slate-900">ResumeAI</span>
      </div>
      <p className="text-xs text-slate-400">
        Built by{' '}
        <a
          href="https://github.com/vinushinde"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          Vinu Shinde
        </a>
        {' '}· MIT License · Portfolio Project
      </p>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Shield className="h-3.5 w-3.5" />
        Secure · Private · No tracking
      </div>
    </div>
  </footer>
)

// ── Page ──────────────────────────────────────────────────────────────────────
const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <CTA />
    <Footer />
  </div>
)

export default LandingPage
