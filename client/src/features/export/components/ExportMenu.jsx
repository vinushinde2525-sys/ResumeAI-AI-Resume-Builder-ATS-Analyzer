import { useState, useRef, useEffect } from 'react'
import { Download, FileText, FileJson, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../../../components/ui/Button'
import { useExportPdf, useExportDocx, useExportJson } from '../hooks/useExportPdf'

/**
 * ExportMenu — single button that expands into PDF / DOCX / JSON backup options.
 * Replaces the single-format ExportPDFButton with multi-format support.
 */
const ExportMenu = ({ resumeId, templateId, filename }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const { mutate: exportPdf, isPending: pdfPending } = useExportPdf()
  const { mutate: exportDocx, isPending: docxPending } = useExportDocx()
  const { mutate: exportJson, isPending: jsonPending } = useExportJson()

  const isPending = pdfPending || docxPending || jsonPending

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handlePdf = () => { exportPdf({ resumeId, templateId, filename }); setOpen(false) }
  const handleDocx = () => { exportDocx({ resumeId, filename }); setOpen(false) }
  const handleJson = () => { exportJson({ resumeId, filename }); setOpen(false) }

  return (
    <div className="relative print-hidden" ref={menuRef}>
      <Button
        variant="secondary"
        size="sm"
        icon={isPending ? undefined : Download}
        loading={isPending}
        disabled={!resumeId}
        onClick={() => setOpen((v) => !v)}
        className="gap-1"
      >
        Export
        <ChevronDown className="h-3 w-3" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg z-20 overflow-hidden"
          >
            <button onClick={handlePdf} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">
              <FileText className="h-4 w-4 text-red-500" />
              <div>
                <p className="font-medium">PDF</p>
                <p className="text-xs text-slate-400">Ready for job applications</p>
              </div>
            </button>
            <button onClick={handleDocx} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left border-t border-slate-100">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Word (.docx)</p>
                <p className="text-xs text-slate-400">Editable in Microsoft Word</p>
              </div>
            </button>
            <button onClick={handleJson} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left border-t border-slate-100">
              <FileJson className="h-4 w-4 text-amber-500" />
              <div>
                <p className="font-medium">JSON Backup</p>
                <p className="text-xs text-slate-400">Raw data for safekeeping</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExportMenu
