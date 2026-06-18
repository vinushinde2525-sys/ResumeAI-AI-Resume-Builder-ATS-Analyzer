import mongoose from 'mongoose'

/**
 * ResumeVersion — stores a snapshot of resume.data every time it's updated.
 *
 * WHY A SEPARATE COLLECTION (not an array field on Resume):
 * - Resume documents stay lean and fast to fetch for everyday editing
 * - Versions can be queried, paginated, and pruned independently
 * - Avoids the 16MB MongoDB document size limit if a resume is edited
 *   hundreds of times — an unbounded embedded array risks hitting that
 *   ceiling on a single document; a separate collection never does
 */
const resumeVersionSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, default: 'Untitled Resume' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    templateId: { type: String, default: 'modern' },
    versionLabel: { type: String, default: '' }, // e.g. "Before AI edit", optional user note
  },
  { timestamps: true }
)

// Efficient lookup: all versions of one resume, newest first
resumeVersionSchema.index({ resumeId: 1, createdAt: -1 })

const ResumeVersion = mongoose.model('ResumeVersion', resumeVersionSchema)
export default ResumeVersion
