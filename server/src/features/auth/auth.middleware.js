import { verifyAccessToken } from '../../shared/utils/jwt.utils.js'
import { sendError } from '../../shared/utils/response.utils.js'
import User from './user.model.js'

/**
 * protect — middleware that guards private routes.
 *
 * Flow:
 * 1. Extract Bearer token from Authorization header
 * 2. Verify JWT signature + expiry
 * 3. Look up user in DB (ensures account still exists / not deleted)
 * 4. Attach user to req.user for downstream handlers
 *
 * If any step fails → 401 Unauthorized
 *
 * INTERVIEW NOTE:
 * "Why look up user in DB on every request?"
 * → So that if an account is deleted or banned, their token immediately stops working.
 *   Without this check, a deleted user's token would still pass until it expires.
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return sendError(res, 'No token provided', 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyAccessToken(token)

    const user = await User.findById(decoded.sub)
    if (!user) {
      return sendError(res, 'User no longer exists', 401)
    }

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 'Token expired', 401)
    }
    return sendError(res, 'Invalid token', 401)
  }
}
