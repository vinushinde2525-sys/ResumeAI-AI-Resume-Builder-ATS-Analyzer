import { env } from '../../config/env.js'

/**
 * Global Express error handler.
 * Must be registered LAST in app.js after all routes.
 *
 * Catches: thrown errors, next(err) calls, mongoose validation errors
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ success: false, message: messages.join(', ') })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(409).json({ success: false, message: `${field} already in use` })
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' })
  }

  const status = err.status || err.statusCode || 500
  const message = env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message || 'Internal server error'

  res.status(status).json({ success: false, message })
}

export default errorHandler
