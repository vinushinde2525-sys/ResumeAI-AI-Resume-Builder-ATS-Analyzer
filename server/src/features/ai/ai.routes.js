import { Router } from 'express'
import {
  handleImproveSummary,
  handleRewriteBullet,
  handleSuggestSkills,
  handleGenerateProjectDesc,
  handleResumeFeedback,
} from './ai.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { aiLimiter } from '../../shared/middleware/rateLimiter.js'
import {
  improveSummarySchema,
  rewriteBulletSchema,
  suggestSkillsSchema,
  generateProjectDescSchema,
  resumeFeedbackSchema,
} from './ai.validation.js'

const router = Router()

// All AI endpoints: authenticated + strict rate limited (30 req/hr)
router.use(protect)
router.use(aiLimiter)

router.post('/summary',      validateBody(improveSummarySchema),      handleImproveSummary)
router.post('/bullet',       validateBody(rewriteBulletSchema),       handleRewriteBullet)
router.post('/skills',       validateBody(suggestSkillsSchema),       handleSuggestSkills)
router.post('/project-desc', validateBody(generateProjectDescSchema), handleGenerateProjectDesc)
router.post('/feedback',     validateBody(resumeFeedbackSchema),      handleResumeFeedback)

export default router
