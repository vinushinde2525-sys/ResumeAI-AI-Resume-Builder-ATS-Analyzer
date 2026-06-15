import rateLimit from 'express-rate-limit'

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Strict limit for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// AI endpoints — expensive, rate limit harder
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: { success: false, message: 'AI request limit reached. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
