import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import SummaryImproverCard from '../components/SummaryImproverCard'
import BulletRewriterCard from '../components/BulletRewriterCard'
import SkillsGeneratorCard from '../components/SkillsGeneratorCard'
import ProjectDescriptionCard from '../components/ProjectDescriptionCard'
import ResumeFeedbackCard from '../components/ResumeFeedbackCard'
import ProviderBadge from '../components/ProviderBadge'

/**
 * AIAssistantPage — hub for all 5 AI resume tools.
 *
 * Layout: responsive grid, ResumeFeedbackCard spans full width
 * (it's the most complex/valuable tool — gets visual priority).
 *
 * lastProvider tracks which provider answered the most recent call,
 * purely for the informational ProviderBadge display.
 */
const AIAssistantPage = () => (
  <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
            <Zap className="h-5 w-5 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">AI Assistant</h1>
        </div>
        <p className="text-sm text-slate-500 max-w-lg">
          AI-powered tools to help you write a more compelling, complete resume.
          Every tool works with any of the 3 supported providers.
        </p>
      </div>

      <div className="w-full sm:w-72 shrink-0">
        <ProviderBadge activeProvider="openai" />
      </div>
    </motion.div>

    {/* Tool grid */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
        <SummaryImproverCard />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <BulletRewriterCard />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
        <SkillsGeneratorCard />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <ProjectDescriptionCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="sm:col-span-2"
      >
        <ResumeFeedbackCard />
      </motion.div>
    </div>

    {/* Footer note */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.35 }}
      className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
      <p className="text-xs text-slate-500 leading-relaxed">
        All AI requests are rate-limited (30/hour) and require authentication.
        Results are generated fresh each time — nothing is cached or stored automatically.
      </p>
    </motion.div>
  </div>
)

export default AIAssistantPage
