import { AlignLeft } from 'lucide-react'
import ResizableTextarea from './ResizableTextarea'

const SummaryForm = ({ data, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50">
        <AlignLeft className="h-4 w-4 text-teal-600" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Summary</h3>
    </div>
    <ResizableTextarea
      value={data}
      onChange={(e) => onChange(e.target.value)}
      placeholder="A concise summary of your career highlights and goals..."
    />
  </div>
)

export default SummaryForm
