import { Router } from 'express'
import { exportPdf, exportDocx, exportJson } from './export.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { exportPdfSchema, exportDocxSchema, exportJsonSchema } from './export.validation.js'
import rateLimit from 'express-rate-limit'

const router = Router()

// PDF generation is CPU/memory-heavier than a normal API call (spins up
// a browser page render), so it gets its own dedicated, stricter limiter
// rather than reusing the generic apiLimiter.
const exportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many export requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.use(protect)
router.post('/pdf',  exportLimiter, validateBody(exportPdfSchema),  exportPdf)
router.post('/docx', exportLimiter, validateBody(exportDocxSchema), exportDocx)
router.post('/json', exportLimiter, validateBody(exportJsonSchema), exportJson)

export default router
