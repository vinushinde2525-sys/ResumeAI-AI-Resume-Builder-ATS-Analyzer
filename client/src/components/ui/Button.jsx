import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Button — shared primitive used everywhere in the app.
 * Variants: primary, secondary, ghost, danger
 * Sizes: sm, md, lg
 */
const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm',
  ghost: 'text-slate-600 hover:bg-slate-100',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-md',
  md: 'px-4 py-2 text-sm font-medium rounded-lg',
  lg: 'px-6 py-3 text-base font-semibold rounded-xl',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon: Icon = null,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="h-4 w-4" />
      ) : null}
      {children}
    </motion.button>
  )
}

export default Button
