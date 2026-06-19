import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './features/auth/auth.routes.js'
import resumeRoutes from './features/resume/resume.routes.js'
import aiRoutes from './features/ai/ai.routes.js'
import atsRoutes from './features/ats/ats.routes.js'
import exportRoutes from './features/export/export.routes.js'
import jobRoutes from './features/jobs/job.routes.js'
import applicationRoutes from './features/applications/application.routes.js'
import { env } from './config/env.js'
import { apiLimiter } from './shared/middleware/rateLimiter.js'
import errorHandler from './shared/middleware/errorHandler.js'

const app = express()

// Security headers
app.use(helmet())

// CORS — allow client dev server and production URL
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true, // required for httpOnly refresh token cookie
}))

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Cookie parser — needed for refresh token httpOnly cookie
app.use(cookieParser())

// HTTP request logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// Rate limit all API routes
app.use('/api', apiLimiter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ResumeAI API is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth',         authRoutes)
app.use('/api/resumes',      resumeRoutes)
app.use('/api/ai',           aiRoutes)
app.use('/api/ats',          atsRoutes)
app.use('/api/export',       exportRoutes)
app.use('/api/jobs',         jobRoutes)
app.use('/api/applications', applicationRoutes)
// app.use('/api/resumes', resumeRoutes)  ← Phase C
// app.use('/api/ai', aiRoutes)           ← Phase E
// app.use('/api/ats', atsRoutes)         ← Phase F
// app.use('/api/user', userRoutes)       ← Phase H

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` })
})

// Global error handler — must be last
app.use(errorHandler)

export default app
