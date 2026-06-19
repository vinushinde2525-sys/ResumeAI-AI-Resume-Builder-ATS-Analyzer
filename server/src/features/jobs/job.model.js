import mongoose from 'mongoose'

/**
 * Job — a saved job opportunity the user is tracking/applying to.
 * createdBy scopes every job to its owner, same ownership pattern
 * used by Resume in Phase C.
 */
const jobSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title:    { type: String, required: [true, 'Job title is required'], trim: true, maxlength: 150 },
    company:  { type: String, required: [true, 'Company is required'], trim: true, maxlength: 150 },
    location: { type: String, default: '', trim: true, maxlength: 150 },
    salary:   { type: String, default: '', trim: true, maxlength: 100 },
    description: { type: String, default: '', maxlength: 10000 },
    requiredSkills: { type: [String], default: [] },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
      default: 'full-time',
    },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
      default: 'mid',
    },
    source: { type: String, default: '', maxlength: 100 }, // e.g. "LinkedIn", "Company site"
    url:     { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }
)

jobSchema.index({ createdBy: 1, createdAt: -1 })

const Job = mongoose.model('Job', jobSchema)
export default Job
