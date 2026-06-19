import { z } from 'zod'
import { APPLICATION_STATUSES } from './application.model.js'

export const createApplicationSchema = z.object({
  jobId:     z.string().min(1, 'jobId is required'),
  resumeId:  z.string().optional().nullable(),
  status:    z.enum(APPLICATION_STATUSES).optional().default('saved'),
  notes:     z.string().max(5000).optional().default(''),
  appliedAt:     z.string().datetime().optional().nullable(),
  interviewDate: z.string().datetime().optional().nullable(),
  followUpDate:  z.string().datetime().optional().nullable(),
})

export const updateApplicationSchema = z.object({
  resumeId:  z.string().optional().nullable(),
  status:    z.enum(APPLICATION_STATUSES).optional(),
  notes:     z.string().max(5000).optional(),
  matchScore:    z.number().min(0).max(100).optional().nullable(),
  appliedAt:     z.string().datetime().optional().nullable(),
  interviewDate: z.string().datetime().optional().nullable(),
  followUpDate:  z.string().datetime().optional().nullable(),
})
