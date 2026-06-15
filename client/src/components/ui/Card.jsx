import { cn } from '../../lib/utils'

/**
 * Card — clean white surface with soft shadow.
 * Used for resume cards, ATS report cards, dashboard widgets.
 */
const Card = ({ children, className = '', padding = true, ...props }) => (
  <div
    className={cn(
      'bg-white rounded-xl border border-slate-100',
      'shadow-[0_1px_3px_0_rgb(0,0,0,0.06),0_1px_2px_-1px_rgb(0,0,0,0.06)]',
      padding && 'p-5',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

Card.Header = ({ children, className = '' }) => (
  <div className={cn('mb-4 flex items-center justify-between', className)}>
    {children}
  </div>
)

Card.Title = ({ children, className = '' }) => (
  <h3 className={cn('text-base font-semibold text-slate-900', className)}>
    {children}
  </h3>
)

Card.Body = ({ children, className = '' }) => (
  <div className={cn('text-sm text-slate-600', className)}>{children}</div>
)

export default Card
