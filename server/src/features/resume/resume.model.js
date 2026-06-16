import mongoose from 'mongoose'

/**
 * Resume Model
 *
 * Stores the full resume data as a nested object — same shape
 * as the v1 initialResumeData — so the existing editor works
 * without any changes to form components.
 *
 * Design decisions:
 * - data field stores the entire resume as a flexible object
 * - userId ref enables fetching "all resumes for this user"
 * - title is stored separately for list display (no need to parse data)
 * - isPublic enables future shareable resume links
 */
const experienceSchema = new mongoose.Schema({
  id:          { type: String, required: true },
  company:     { type: String, default: '' },
  position:    { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  description: { type: String, default: '' },
}, { _id: false })

const educationSchema = new mongoose.Schema({
  id:          { type: String, required: true },
  institution: { type: String, default: '' },
  degree:      { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  description: { type: String, default: '' },
}, { _id: false })

const resumeDataSchema = new mongoose.Schema({
  personal: {
    name:     { type: String, default: '' },
    title:    { type: String, default: '' },
    email:    { type: String, default: '' },
    phone:    { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
  summary:    { type: String, default: '' },
  experience: { type: [experienceSchema], default: [] },
  education:  { type: [educationSchema], default: [] },
  skills:     { type: String, default: '' },
  hobbies:    { type: String, default: '' },
}, { _id: false })

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // fast lookup by user
    },
    title: {
      type: String,
      default: 'Untitled Resume',
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    data: {
      type: resumeDataSchema,
      default: () => ({}),
    },
    templateId: {
      type: String,
      default: 'classic',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    lastExported: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
)

// Compound index: efficiently list all resumes for a user sorted by update time
resumeSchema.index({ userId: 1, updatedAt: -1 })

const Resume = mongoose.model('Resume', resumeSchema)
export default Resume
