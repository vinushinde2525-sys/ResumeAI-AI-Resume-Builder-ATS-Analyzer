import { sendError } from '../utils/response.utils.js'

/**
 * validateBody — Zod v4 compatible request body validator.
 *
 * Zod v4: errors live in error.issues (not error.errors)
 * We format the first issue message to be user-friendly.
 */
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const issue = result.error.issues?.[0]
    // Make "received undefined" → friendlier message
    let message = issue?.message || 'Validation failed'
    if (message.includes('received undefined') || message.includes('expected string')) {
      const field = issue?.path?.[0]
      message = field ? `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required` : 'All fields are required'
    }
    return sendError(res, message, 400)
  }
  req.body = result.data
  next()
}
