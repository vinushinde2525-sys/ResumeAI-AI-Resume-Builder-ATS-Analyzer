import mongoose from 'mongoose'

export const APPLICATION_STATUSES = [
  'saved', 'applied', 'screening', 'interview',
  'technical', 'final', 'offer', 'rejected',
]

const applicationSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true, index: true },
    jobId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Job',    required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', default: null },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: 'saved',
    },
    appliedAt:     { type: Date, default: null },
    interviewDate: { type: Date, default: null },
    followUpDate:  { type: Date, default: null },
    notes:         { type: String, default: '', maxlength: 5000 },
    // Cached match score so we don't recompute it on every board render
    matchScore: { type: Number, default: null },
  },
  { timestamps: true }
)

applicationSchema.index({ userId: 1, status: 1 })
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true }) // one app per job per user

const Application = mongoose.model('Application', applicationSchema)
export default Application
