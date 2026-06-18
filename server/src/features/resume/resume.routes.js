import { Router } from 'express'
import {
  listResumes, getResume, create, update, remove,
  listVersions, getVersion, restoreVersion, compareVersions,
} from './resume.controller.js'
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

// Version history
router.get('/:id/versions',                  listVersions)
router.get('/:id/versions/compare',          compareVersions)
router.get('/:id/versions/:versionId',       getVersion)
router.post('/:id/versions/:versionId/restore', restoreVersion)

export default router
