import { z } from 'zod'

// We reuse the same loose resumeData shape from resume.validation
// since the ATS analyzer operates on the same resume structure.
const resumeDataSchema = z.object({
  personal: z.object({
    name:     z.string().optional().default(''),
    title:    z.string().optional().default(''),
    email:    z.string().optional().default(''),
    phone:    z.string().optional().default(''),
    linkedin: z.string().optional().default(''),
  }).optional().default({}),
  summary:    z.string().optional().default(''),
  experience: z.array(z.object({
    id: z.string().optional(),
    company: z.string().optional().default(''),
    position: z.string().optional().default(''),
    startDate: z.string().optional().default(''),
    endDate: z.string().optional().default(''),
    description: z.string().optional().default(''),
  })).optional().default([]),
  education: z.array(z.object({
    id: z.string().optional(),
    institution: z.string().optional().default(''),
    degree: z.string().optional().default(''),
    startDate: z.string().optional().default(''),
    endDate: z.string().optional().default(''),
    description: z.string().optional().default(''),
  })).optional().default([]),
  skills:  z.string().optional().default(''),
  hobbies: z.string().optional().default(''),
})

export const analyzeResumeSchema = z.object({
  resumeData: resumeDataSchema,
  jobDescription: z.string().max(5000).optional().default(''),
})
