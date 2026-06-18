import { motion } from 'framer-motion'
import { Check, Eye } from 'lucide-react'
import Button from '../../../components/ui/Button'

/**
 * TemplateCard — shows a mini preview swatch + name/description.
 * Mini preview is a simplified CSS mockup (not the full template)
 * for fast gallery rendering — full fidelity shown in the preview modal.
 */
const TemplateCard = ({ template, isSelected, onSelect, onPreview }) => (
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ duration: 0.15 }}
    className={`group relative rounded-2xl border-2 bg-white p-4 cursor-pointer transition-colors
      ${isSelected ? 'border-brand-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
    onClick={() => onSelect(template.id)}
  >
    {isSelected && (
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-md">
        <Check className="h-3.5 w-3.5" />
      </div>
    )}

    {/* Mini mockup swatch */}
    <div className="mb-3 aspect-[3/4] rounded-lg bg-slate-50 border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: template.accent }} />
      <div className="p-3 space-y-1.5">
        <div className="h-2 w-2/3 rounded" style={{ backgroundColor: template.accent, opacity: 0.8 }} />
        <div className="h-1.5 w-1/2 rounded bg-slate-200" />
        <div className="mt-3 space-y-1">
          <div className="h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-4/5 rounded bg-slate-100" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors opacity-0 group-hover:opacity-100">
        <Button
          size="sm"
          variant="secondary"
          icon={Eye}
          onClick={(e) => { e.stopPropagation(); onPreview(template.id) }}
        >
          Preview
        </Button>
      </div>
    </div>

    <h3 className="text-sm font-bold text-slate-900">{template.name}</h3>
    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{template.description}</p>
  </motion.div>
)

export default TemplateCard
