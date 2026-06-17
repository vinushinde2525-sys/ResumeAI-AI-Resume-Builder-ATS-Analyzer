import { useState } from 'react'
import { Cpu, Info } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ProviderBadge — informational display of the active AI provider.
 *
 * IMPORTANT DESIGN DECISION:
 * The provider is controlled server-side via AI_PROVIDER env var,
 * NOT by the client. This is intentional:
 * - API keys never touch the browser
 * - Switching providers is an ops/config decision, not a per-user toggle
 * - Prevents users from forcing expensive provider calls
 *
 * This component is informational — it shows which provider responded
 * (returned in every AI response) and explains how to switch.
 */
const PROVIDERS = [
  { id: 'openai', label: 'OpenAI', model: 'gpt-4o-mini',         color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'claude', label: 'Claude', model: 'claude-haiku-4-5',    color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'gemini', label: 'Gemini', model: 'gemini-1.5-flash',    color: 'bg-blue-50 text-blue-700 border-blue-200' },
]

const ProviderBadge = ({ activeProvider }) => {
  const [showInfo, setShowInfo] = useState(false)
  const current = PROVIDERS.find((p) => p.id === activeProvider) || PROVIDERS[0]

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
          <Cpu className="h-4 w-4 text-slate-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-400">Active AI Provider</p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${current.color}`}>
              {current.label}
            </span>
            <span className="text-xs text-slate-400">{current.model}</span>
          </div>
        </div>
        <button
          onClick={() => setShowInfo((v) => !v)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg z-10"
        >
          <p className="text-xs font-semibold text-slate-700 mb-2">How provider switching works</p>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            The active provider is set server-side via the <code className="bg-slate-100 px-1 rounded">AI_PROVIDER</code> environment
            variable. This keeps API keys secure and prevents client-side abuse.
          </p>
          <div className="space-y-1.5">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-600">{p.label}</span>
                <code className="text-slate-400">AI_PROVIDER={p.id}</code>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ProviderBadge
