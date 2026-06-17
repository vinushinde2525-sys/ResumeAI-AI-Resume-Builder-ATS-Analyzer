import { useState } from 'react'
import { Code2, Wand2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import { useSuggestSkills } from '../hooks/useAI'

/**
 * SkillsGeneratorCard — returns structured { technical: [], soft: [] }
 * Uses custom pill rendering instead of AIResultPanel since the
 * result shape is an object, not plain text.
 */
const SkillsGeneratorCard = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [existingSkills, setExistingSkills] = useState('')
  const { mutate, isPending, data } = useSuggestSkills()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (jobTitle.trim().length < 2) return
    mutate({ jobTitle, existingSkills: existingSkills || undefined })
  }

  const handleCopyAll = () => {
    if (!data?.result) return
    const all = [...(data.result.technical || []), ...(data.result.soft || [])].join(', ')
    navigator.clipboard.writeText(all)
    toast.success('All skills copied!')
  }

  const skills = data?.result

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
          <Code2 className="h-4.5 w-4.5 text-violet-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Skills Generator</h3>
          <p className="text-xs text-slate-500">Get relevant technical and soft skills for your role</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Job title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. React Developer"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Existing skills (optional)</label>
          <input
            type="text"
            value={existingSkills}
            onChange={(e) => setExistingSkills(e.target.value)}
            placeholder="e.g. React, CSS"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <Button
          type="submit"
          icon={Wand2}
          loading={isPending}
          disabled={jobTitle.trim().length < 2}
          className="w-full justify-center"
        >
          Suggest Skills
        </Button>
      </form>

      {/* Result — pill display */}
      <div className="relative min-h-[100px] rounded-xl border border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              AI Result
              {data?.provider && <span className="ml-1 text-slate-400 font-normal normal-case">via {data.provider}</span>}
            </span>
          </div>
          {skills && (
            <button
              onClick={handleCopyAll}
              className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-900 transition-colors"
            >
              Copy all
            </button>
          )}
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-sm text-slate-500">
                <Spinner size="sm" />
                AI is thinking…
              </motion.div>
            ) : skills ? (
              <motion.div key="result" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {skills.technical?.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">Technical Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.technical.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.soft?.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">Soft Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.soft.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-medium text-teal-700"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.p key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-slate-400 italic">
                Suggested skills will appear here…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  )
}

export default SkillsGeneratorCard
