import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FileText, LayoutDashboard, BarChart3, Zap, LogOut, User, Menu, X, Briefcase, LayoutGrid } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuthStore } from '../../app/authStore'
import { useLogout } from '../../features/auth/hooks/useAuth'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/resumes',   label: 'Resumes',   icon: FileText },
  { to: '/jobs',       label: 'Jobs',      icon: Briefcase },
  { to: '/tracker',    label: 'Tracker',   icon: LayoutGrid },
  { to: '/ats',       label: 'ATS',        icon: BarChart3 },
  { to: '/ai',        label: 'AI',         icon: Zap },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const user = useAuthStore((s) => s.user)
  const { mutate: logout, isPending } = useLogout()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (to) => pathname === to || (to !== '/' && pathname.startsWith(to))

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0 group">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600"
          >
            <FileText className="h-3.5 w-3.5 text-white" />
          </motion.div>
          <span className="text-base font-bold text-slate-900">ResumeAI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150
                  ${active ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-brand-50 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User chip */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100">
              <User className="h-3 w-3 text-brand-700" />
            </div>
            <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">
              {user?.name?.split(' ')[0] || 'Account'}
            </span>
          </div>

          {/* Logout — desktop */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => logout()}
            disabled={isPending}
            className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500
              hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <nav className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                    ${isActive(to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => { logout(); setMobileOpen(false) }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
