/**
 * Consistent API response shape across all routes.
 * Every endpoint returns { success, message, data } or { success, message, error }
 */

export const sendSuccess = (res, data = {}, message = 'Success', status = 200) =>
  res.status(status).json({ success: true, message, data })

export const sendError = (res, message = 'Something went wrong', status = 500) =>
  res.status(status).json({ success: false, message })
