import { z } from 'zod'

// Single experience entry
const experienceSchema = z.object({
  id:          z.string(),
  company:     z.string().max(100).default(''),
  position:    z.string().max(100).default(''),
  startDate:   z.string().max(20).default(''),
  endDate:     z.string().max(20).default(''),
  description: z.string().max(2000).default(''),
})

// Single education entry
const educationSchema = z.object({
  id:          z.string(),
  institution: z.string().max(100).default(''),
  degree:      z.string().max(100).default(''),
  startDate:   z.string().max(20).default(''),
  endDate:     z.string().max(20).default(''),
  description: z.string().max(500).default(''),
})

// Full resume data payload
const resumeDataSchema = z.object({
  personal: z.object({
    name:     z.string().max(80).default(''),
    title:    z.string().max(100).default(''),
    email:    z.string().max(100).default(''),
    phone:    z.string().max(30).default(''),
    linkedin: z.string().max(200).default(''),
  }).default({}),
  summary:    z.string().max(1000).default(''),
  experience: z.array(experienceSchema).default([]),
  education:  z.array(educationSchema).default([]),
  skills:     z.string().max(500).default(''),
  hobbies:    z.string().max(300).default(''),
}).default({})

// Create resume — title + optional initial data
export const createResumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100).trim(),
  data:  resumeDataSchema.optional(),
})

// Update resume — partial update allowed
export const updateResumeSchema = z.object({
  title: z.string().min(1).max(100).trim().optional(),
  data:  resumeDataSchema.optional(),
  templateId:  z.string().optional(),
  isPublic:    z.boolean().optional(),
  lastExported: z.string().datetime().optional(),
})
