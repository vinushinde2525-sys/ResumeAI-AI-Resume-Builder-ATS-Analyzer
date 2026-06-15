import { Router } from 'express'
import { register, login, refresh, logout, getMe } from './auth.controller.js'
import { protect } from './auth.middleware.js'
import { authLimiter } from '../../shared/middleware/rateLimiter.js'
import { validateBody } from '../../shared/middleware/validate.js'
import { registerSchema, loginSchema } from './auth.validation.js'

const router = Router()

// Strict rate limit on auth endpoints
router.use(authLimiter)

// Public routes
router.post('/register', validateBody(registerSchema), register)
router.post('/login',    validateBody(loginSchema),    login)
router.post('/refresh',                                refresh)

// Protected routes
router.post('/logout', protect, logout)
router.get('/me',      protect, getMe)

export default router
