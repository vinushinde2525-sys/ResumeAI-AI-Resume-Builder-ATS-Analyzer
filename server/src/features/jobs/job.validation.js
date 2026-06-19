import { z } from 'zod'

export const createJobSchema = z.object({
  title:    z.string().min(1, 'Job title is required').max(150),
  company:  z.string().min(1, 'Company is required').max(150),
  location: z.string().max(150).optional().default(''),
  salary:   z.string().max(100).optional().default(''),
  description: z.string().max(10000).optional().default(''),
  requiredSkills: z.array(z.string()).optional().default([]),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']).optional().default('full-time'),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional().default('mid'),
  source: z.string().max(100).optional().default(''),
  url:    z.string().max(500).optional().default(''),
})

export const updateJobSchema = createJobSchema.partial()
