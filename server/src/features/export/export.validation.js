import { z } from 'zod'

export const exportPdfSchema = z.object({
  resumeId: z.string().min(1, 'resumeId is required'),
  templateId: z.enum(['modern', 'ats', 'executive', 'minimal', 'creative']).optional().default('modern'),
})

export const exportDocxSchema = z.object({
  resumeId: z.string().min(1, 'resumeId is required'),
})

export const exportJsonSchema = z.object({
  resumeId: z.string().min(1, 'resumeId is required'),
})
