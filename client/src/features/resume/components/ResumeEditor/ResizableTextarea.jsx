import { useRef, useEffect } from 'react'
import { cn } from '../../../../lib/utils'

/**
 * ResizableTextarea — auto-grows as user types.
 * Preserved from v1 exactly, extracted to own file.
 *
 * How it works:
 * - useEffect watches value changes
 * - Resets height to 'auto' first (shrink), then sets to scrollHeight (expand)
 * - This ensures it shrinks when text is deleted too
 */
const ResizableTextarea = ({ value, onChange, placeholder = '', className = '', ...props }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={1}
      className={cn(
        'w-full resize-none overflow-hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm',
        'text-slate-900 placeholder:text-slate-400',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
        'hover:border-slate-300',
        className
      )}
      {...props}
    />
  )
}

export default ResizableTextarea
