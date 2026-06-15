import { Zap, Sparkles } from 'lucide-react'
import Card from '../../../components/ui/Card'

// Full implementation in Phase E (AI Integration)
const AIAssistantPage = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">AI Assistant</h1>
        <p className="text-sm text-slate-500 mt-1">
          Let AI help you craft a compelling resume.
        </p>
      </div>

      <Card>
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
            <Zap className="h-7 w-7 text-brand-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">AI Assistant</h3>
          <p className="text-sm text-slate-500 mb-2">Full implementation coming in Phase E.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-4 w-4" />
            Summary generator · Skills suggester · Improvement tips
          </div>
        </div>
      </Card>
    </div>
  </div>
)

export default AIAssistantPage
