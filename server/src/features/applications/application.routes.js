import { Router } from 'express'
import { list, get, create, update, remove, analytics } from './application.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { createApplicationSchema, updateApplicationSchema } from './application.validation.js'

const router = Router()
router.use(protect)

router.get('/analytics', analytics)        // before /:id to avoid collision
router.get('/',          list)
router.post('/',         validateBody(createApplicationSchema), create)
router.get('/:id',       get)
router.put('/:id',       validateBody(updateApplicationSchema), update)
router.delete('/:id',    remove)

export default router
