import { Trash2, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ResizableTextarea from './ResizableTextarea'
import Button from '../../../../components/ui/Button'

/**
 * DynamicArrayForm — generic add/remove list editor.
 * Preserved from v1 as it's the core editor pattern.
 *
 * Improvements over v1:
 * - AnimatePresence for smooth add/remove animations
 * - Better visual hierarchy
 * - Cleaner button styles
 * - Uses shared Button primitive
 */
const DynamicArrayForm = ({
  title,
  icon: Icon,
  items,
  onItemChange,
  onItemAdd,
  onItemRemove,
  accentColor = 'brand',
}) => {
  const accentMap = {
    brand: 'bg-brand-50 text-brand-600',
    teal: 'bg-teal-50 text-teal-600',
    violet: 'bg-violet-50 text-violet-600',
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${accentMap[accentColor]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{title}</h3>
      </div>

      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onItemRemove(item.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Object.keys(item)
                .filter((key) => key !== 'id')
                .map((key) => (
                  <div key={key} className={key === 'description' ? 'sm:col-span-2' : ''}>
                    <label className="mb-1 block text-xs font-medium text-slate-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {key === 'description' ? (
                      <ResizableTextarea
                        value={item[key]}
                        onChange={(e) => onItemChange(item.id, key, e.target.value)}
                        placeholder="Describe your role or achievements..."
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[key]}
                        onChange={(e) => onItemChange(item.id, key, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 hover:border-slate-300 transition-colors"
                      />
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="secondary"
        size="sm"
        onClick={onItemAdd}
        icon={Plus}
        className="w-full justify-center border-dashed"
      >
        Add {title.endsWith('s') ? title.slice(0, -1) : title}
      </Button>
    </div>
  )
}

export default DynamicArrayForm
