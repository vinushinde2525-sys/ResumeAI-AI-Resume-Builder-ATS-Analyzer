import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-700 border border-brand-200',
  accent: 'bg-teal-50 text-teal-700 border border-teal-200',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
}

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}
  >
    {children}
  </span>
)

export default Badge
