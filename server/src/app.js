import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
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

// Feature routes (registered here as features are built)
// app.use('/api/auth', authRoutes)       ← Phase B
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
