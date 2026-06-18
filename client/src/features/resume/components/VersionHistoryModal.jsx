import { useState } from 'react'
import { History, RotateCcw, GitCompare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import { formatDate } from '../../../lib/utils'
import { useResumeVersions, useRestoreVersion, useCompareVersions } from '../hooks/useVersions'

const VersionHistoryModal = ({ isOpen, onClose, resumeId }) => {
  const { data: versions, isLoading } = useResumeVersions(resumeId)
  const { mutate: restore, isPending: isRestoring, variables: restoringId } = useRestoreVersion(resumeId)

  const [compareIds, setCompareIds] = useState([])
  const compareEnabled = compareIds.length === 2
  const { data: comparison } = useCompareVersions(
    resumeId,
    compareEnabled ? compareIds[0] : null,
    compareEnabled ? compareIds[1] : null
  )

  const toggleCompare = (versionId) => {
    setCompareIds((prev) => {
      if (prev.includes(versionId)) return prev.filter((id) => id !== versionId)
      if (prev.length >= 2) return [prev[1], versionId]
      return [...prev, versionId]
    })
  }

  const handleRestore = (versionId) => {
    if (window.confirm('Restore this version? Your current state will be saved as a new version first.')) {
      restore(versionId)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Version History" size="lg">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <History className="h-3.5 w-3.5" />
          A snapshot is saved automatically every time you save changes. Select two versions to compare.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Spinner size="md" />
          </div>
        )}

        {!isLoading && versions?.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-400">
            No version history yet — save a change to create your first snapshot.
          </div>
        )}

        {!isLoading && versions?.length > 0 && (
          <div className="max-h-80 overflow-y-auto space-y-2">
            {versions.map((v, i) => (
              <motion.div
                key={v._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-colors
                  ${compareIds.includes(v._id) ? 'border-brand-300 bg-brand-50' : 'border-slate-100 bg-slate-50/50'}`}
              >
                <input
                  type="checkbox"
                  checked={compareIds.includes(v._id)}
                  onChange={() => toggleCompare(v._id)}
                  className="h-4 w-4 rounded accent-brand-600"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{v.title}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" /> {formatDate(v.createdAt)}
                    {v.versionLabel && <span className="ml-1 text-slate-300">· {v.versionLabel}</span>}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={RotateCcw}
                  loading={isRestoring && restoringId === v._id}
                  onClick={() => handleRestore(v._id)}
                >
                  Restore
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Comparison result */}
        {compareEnabled && comparison && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-3">
              <GitCompare className="h-3.5 w-3.5" /> Comparison
            </p>
            {comparison.changedFields.length === 0 ? (
              <p className="text-xs text-slate-400">No differences between these two versions.</p>
            ) : (
              <div className="space-y-2">
                {comparison.changedFields.map((field) => (
                  <div key={field} className="text-xs">
                    <span className="font-semibold text-slate-700 capitalize">{field}</span>
                    <span className="text-slate-400"> changed</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default VersionHistoryModal
