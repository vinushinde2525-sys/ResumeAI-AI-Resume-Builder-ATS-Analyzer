import User from './user.model.js'
import {
  signAccessToken,
  signRefreshToken,
} from '../../shared/utils/jwt.utils.js'

/**
 * Auth Service — pure business logic, no req/res here.
 *
 * WHY SEPARATE SERVICE FROM CONTROLLER:
 * - Controller handles HTTP concerns (req, res, status codes)
 * - Service handles business logic (DB queries, token generation)
 * - Service is reusable and testable without HTTP context
 * - Clean Architecture principle: separate layers
 */

export const registerUser = async ({ name, email, password }) => {
  // Check duplicate email
  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    const err = new Error('Email already registered')
    err.status = 409
    throw err
  }

  // Create user — password hashed by pre-save hook in model
  const user = await User.create({ name, email, password })

  const accessToken = signAccessToken(user._id.toString())
  const refreshToken = signRefreshToken(user._id.toString())

  // Store refresh token on user for rotation validation
  user.refreshToken = refreshToken
  await user.save()

  return { user: user.toSafeObject(), accessToken, refreshToken }
}

export const loginUser = async ({ email, password }) => {
  // Explicitly select password (select:false by default)
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user) {
    const err = new Error('Invalid email or password')
    err.status = 401
    throw err
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    const err = new Error('Invalid email or password')
    err.status = 401
    throw err
  }

  const accessToken = signAccessToken(user._id.toString())
  const refreshToken = signRefreshToken(user._id.toString())

  user.refreshToken = refreshToken
  await user.save()

  return { user: user.toSafeObject(), accessToken, refreshToken }
}

export const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    const err = new Error('No refresh token')
    err.status = 401
    throw err
  }

  // Import here to avoid circular — verify token
  const { verifyRefreshToken } = await import('../../shared/utils/jwt.utils.js')

  let decoded
  try {
    decoded = verifyRefreshToken(incomingRefreshToken)
  } catch {
    const err = new Error('Invalid or expired refresh token')
    err.status = 401
    throw err
  }

  // Fetch user with stored refresh token for rotation check
  const user = await User.findById(decoded.sub).select('+refreshToken')
  if (!user || user.refreshToken !== incomingRefreshToken) {
    // Token reuse detected — clear token to force re-login
    if (user) {
      user.refreshToken = null
      await user.save()
    }
    const err = new Error('Refresh token reuse detected. Please log in again.')
    err.status = 401
    throw err
  }

  // Issue new token pair (rotation)
  const newAccessToken = signAccessToken(user._id.toString())
  const newRefreshToken = signRefreshToken(user._id.toString())

  user.refreshToken = newRefreshToken
  await user.save()

  return { user: user.toSafeObject(), accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null })
}
