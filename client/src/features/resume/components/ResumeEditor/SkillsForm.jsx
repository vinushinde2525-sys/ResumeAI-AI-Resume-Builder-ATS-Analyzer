import { Code } from 'lucide-react'
import ResizableTextarea from './ResizableTextarea'

const SkillsForm = ({ data, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
        <Code className="h-4 w-4 text-brand-600" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Skills</h3>
    </div>
    <label className="text-xs text-slate-500">Comma-separated</label>
    <ResizableTextarea
      value={data}
      onChange={(e) => onChange(e.target.value)}
      placeholder="React, Node.js, MongoDB, AWS, Figma..."
    />
  </div>
)

export default SkillsForm
