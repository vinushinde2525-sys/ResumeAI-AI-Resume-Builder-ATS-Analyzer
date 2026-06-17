import { useState } from 'react'
import { ListChecks, Wand2 } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import AIResultPanel from './AIResultPanel'
import { useRewriteBullet } from '../hooks/useAI'

const BulletRewriterCard = () => {
  const [bullet, setBullet] = useState('')
  const [role, setRole] = useState('')
  const { mutate, isPending, data } = useRewriteBullet()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bullet.trim().length < 5) return
    mutate({ bullet, role: role || undefined })
  }

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50">
          <ListChecks className="h-4.5 w-4.5 text-teal-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Bullet Point Rewriter</h3>
          <p className="text-xs text-slate-500">Turn weak bullets into achievement-driven statements</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Your role (optional)</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Backend Engineer"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Original bullet point</label>
          <textarea
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            rows={2}
            placeholder='e.g. "helped with the backend"'
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        <Button
          type="submit"
          icon={Wand2}
          loading={isPending}
          disabled={bullet.trim().length < 5}
          className="w-full justify-center"
        >
          Rewrite Bullet
        </Button>
      </form>

      <AIResultPanel
        result={data?.result}
        provider={data?.provider}
        isLoading={isPending}
        placeholder="Your stronger bullet point will appear here…"
      />
    </Card>
  )
}

export default BulletRewriterCard
