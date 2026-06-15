import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FileText, LayoutDashboard, BarChart3, Zap, LogOut, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../app/authStore'
import { useLogout } from '../../features/auth/hooks/useAuth'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/resumes', label: 'Resumes', icon: FileText },
  { to: '/ats', label: 'ATS Analyzer', icon: BarChart3 },
  { to: '/ai', label: 'AI Assistant', icon: Zap },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const user = useAuthStore((s) => s.user)
  const { mutate: logout, isPending } = useLogout()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
            <FileText className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-slate-900">ResumeAI</span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + '/')
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
                  ${active ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-brand-50"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User avatar / name */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100">
              <User className="h-3.5 w-3.5 text-brand-700" />
            </div>
            <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
              {user?.name || 'Account'}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500
              hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex md:hidden border-t border-slate-100 px-2 pb-1 pt-1 gap-1 overflow-x-auto">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + '/')
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors
                ${active ? 'text-brand-700 bg-brand-50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
