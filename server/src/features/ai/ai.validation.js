import { z } from 'zod'

export const improveSummarySchema = z.object({
  currentSummary: z.string().min(10, 'Summary must be at least 10 characters').max(1000),
  jobTitle: z.string().max(100).optional().default(''),
})

export const rewriteBulletSchema = z.object({
  bullet: z.string().min(5, 'Bullet point must be at least 5 characters').max(500),
  role: z.string().max(100).optional().default('Software Developer'),
})

export const suggestSkillsSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required').max(100),
  existingSkills: z.string().max(500).optional().default(''),
})

export const generateProjectDescSchema = z.object({
  projectTitle: z.string().min(2, 'Project title is required').max(100),
  technologies: z.string().min(2, 'Technologies are required').max(300),
  description: z.string().max(500).optional().default(''),
})

export const resumeFeedbackSchema = z.object({
  resumeData: z.object({
    personal: z.object({
      name:     z.string().optional(),
      title:    z.string().optional(),
      email:    z.string().optional(),
      phone:    z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
    summary:    z.string().optional(),
    experience: z.array(z.any()).optional(),
    education:  z.array(z.any()).optional(),
    skills:     z.string().optional(),
  }),
})
