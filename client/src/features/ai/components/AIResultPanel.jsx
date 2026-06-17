import { useState } from 'react'
import { Copy, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Spinner from '../../../components/ui/Spinner'

/**
 * AIResultPanel — displays AI-generated text with a copy button.
 * Used by every AI feature card.
 */
const AIResultPanel = ({ result, isLoading, placeholder = 'Result will appear here…', provider }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(
      typeof result === 'object' ? JSON.stringify(result, null, 2) : result
    )
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const displayText = result
    ? (typeof result === 'object' ? JSON.stringify(result, null, 2) : result)
    : null

  return (
    <div className="relative min-h-[100px] rounded-xl border border-slate-200 bg-slate-50">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            AI Result
            {provider && <span className="ml-1 text-slate-400 font-normal normal-case">via {provider}</span>}
          </span>
        </div>
        {displayText && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-500
              hover:bg-white hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
          >
            {copied
              ? <><Check className="h-3 w-3 text-teal-500" /> Copied</>
              : <><Copy className="h-3 w-3" /> Copy</>
            }
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-sm text-slate-500"
            >
              <Spinner size="sm" />
              <span>AI is thinking…</span>
            </motion.div>
          ) : displayText ? (
            <motion.pre
              key="result"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed"
            >
              {displayText}
            </motion.pre>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-slate-400 italic"
            >
              {placeholder}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AIResultPanel
