import { cn } from '../../lib/utils'

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-3',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-brand-200 border-t-brand-600',
        sizes[size],
        className
      )}
    />
  )
}

export default Spinner
