import { useState } from 'react'
import { FolderGit2, Wand2 } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import AIResultPanel from './AIResultPanel'
import { useGenerateProjectDesc } from '../hooks/useAI'

const ProjectDescriptionCard = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [description, setDescription] = useState('')
  const { mutate, isPending, data } = useGenerateProjectDesc()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (projectTitle.trim().length < 2 || technologies.trim().length < 2) return
    mutate({ projectTitle, technologies, description: description || undefined })
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
          <FolderGit2 className="h-4.5 w-4.5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Project Description Generator</h3>
          <p className="text-xs text-slate-500">Turn a project idea into professional bullet points</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Project title</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. AI Resume Builder"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Technologies used</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="e.g. React, Node.js, MongoDB, OpenAI"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Brief description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What does this project do?"
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <Button
          type="submit"
          icon={Wand2}
          loading={isPending}
          disabled={projectTitle.trim().length < 2 || technologies.trim().length < 2}
          className="w-full justify-center"
        >
          Generate Description
        </Button>
      </form>

      <AIResultPanel
        result={data?.result}
        provider={data?.provider}
        isLoading={isPending}
        placeholder="Your project bullet points will appear here…"
      />
    </Card>
  )
}

export default ProjectDescriptionCard
