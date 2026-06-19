import { Router } from 'express'
import { list, get, create, update, remove, match } from './job.controller.js'
import { protect } from '../auth/auth.middleware.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { createJobSchema, updateJobSchema } from './job.validation.js'

const router = Router()
router.use(protect)

router.get('/',       list)
router.post('/',      validateBody(createJobSchema), create)
router.get('/:id',    get)
router.put('/:id',    validateBody(updateJobSchema), update)
router.delete('/:id', remove)
router.get('/:id/match', match)

export default router
