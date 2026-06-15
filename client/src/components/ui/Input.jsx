import { cn } from '../../lib/utils'

/**
 * Input — labeled input field with error state support.
 * Used inside React Hook Form via register() or as standalone.
 */
const Input = ({
  label,
  error,
  className = '',
  id,
  type = 'text',
  placeholder,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
          error
            ? 'border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400'
            : 'border-slate-200 bg-white hover:border-slate-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default Input
