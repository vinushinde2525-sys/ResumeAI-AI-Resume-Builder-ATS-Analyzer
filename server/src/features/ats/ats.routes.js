import { Router } from 'express'
import { analyze } from './ats.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { analyzeResumeSchema } from './ats.validation.js'
import { apiLimiter } from '../../shared/middleware/rateLimiter.js'

const router = Router()

// ATS analysis is rule-based (no external API cost), so it uses the
// standard apiLimiter rather than the stricter aiLimiter used for /api/ai.
router.use(protect)

router.post('/analyze', apiLimiter, validateBody(analyzeResumeSchema), analyze)

export default router
