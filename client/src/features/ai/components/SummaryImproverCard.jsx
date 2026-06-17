import { useState } from 'react'
import { PenLine, Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import AIResultPanel from './AIResultPanel'
import { useImproveSummary } from '../hooks/useAI'

/**
 * SummaryImproverCard — rewrites a professional summary.
 * Input → useImproveSummary mutation → AIResultPanel
 */
const SummaryImproverCard = () => {
  const [currentSummary, setCurrentSummary] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const { mutate, isPending, data, error, reset } = useImproveSummary()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentSummary.trim().length < 10) return
    mutate({ currentSummary, jobTitle })
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
          <PenLine className="h-4.5 w-4.5 text-brand-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Summary Improver</h3>
          <p className="text-xs text-slate-500">Make your professional summary more compelling</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Job title (optional)</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Full Stack Developer"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Current summary</label>
          <textarea
            value={currentSummary}
            onChange={(e) => setCurrentSummary(e.target.value)}
            rows={3}
            placeholder="Paste your current summary here…"
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
          <p className="mt-1 text-xs text-slate-400">{currentSummary.length}/1000 characters</p>
        </div>

        <Button
          type="submit"
          icon={Wand2}
          loading={isPending}
          disabled={currentSummary.trim().length < 10}
          className="w-full justify-center"
        >
          Improve Summary
        </Button>
      </form>

      <AIResultPanel
        result={data?.result}
        provider={data?.provider}
        isLoading={isPending}
        placeholder="Your improved summary will appear here…"
      />
    </Card>
  )
}

export default SummaryImproverCard
