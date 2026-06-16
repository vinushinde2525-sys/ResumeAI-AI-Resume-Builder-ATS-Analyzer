import { Router } from 'express'
import { listResumes, getResume, create, update, remove } from './resume.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { createResumeSchema, updateResumeSchema } from './resume.validation.js'

const router = Router()

// All resume routes require authentication
router.use(protect)

router.get('/',      listResumes)
router.post('/',     validateBody(createResumeSchema), create)
router.get('/:id',   getResume)
router.put('/:id',   validateBody(updateResumeSchema), update)
router.delete('/:id', remove)

export default router
