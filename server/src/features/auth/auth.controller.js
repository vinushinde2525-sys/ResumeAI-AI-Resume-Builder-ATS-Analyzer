import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from './auth.service.js'
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js'
import { refreshCookieOptions } from '../../shared/utils/jwt.utils.js'

/**
 * Auth Controller — HTTP layer only.
 * Reads req, calls service, sets cookies, sends response.
 * Zero business logic here.
 */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const { user, accessToken, refreshToken } = await registerUser({ name, email, password })

    res.cookie('refreshToken', refreshToken, refreshCookieOptions)
    sendSuccess(res, { user, accessToken }, 'Account created successfully', 201)
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await loginUser({ email, password })

    res.cookie('refreshToken', refreshToken, refreshCookieOptions)
    sendSuccess(res, { user, accessToken }, 'Logged in successfully')
  } catch (err) {
    sendError(res, err.message, err.status || 500)
  }
}

export const refresh = async (req, res) => {
  try {
    const incomingToken = req.cookies?.refreshToken
    const { user, accessToken, refreshToken } = await refreshAccessToken(incomingToken)

    res.cookie('refreshToken', refreshToken, refreshCookieOptions)
    sendSuccess(res, { user, accessToken }, 'Token refreshed')
  } catch (err) {
    // Clear bad cookie
    res.clearCookie('refreshToken', { path: '/' })
    sendError(res, err.message, err.status || 401)
  }
}

export const logout = async (req, res) => {
  try {
    // req.user set by protect middleware
    if (req.user) {
      await logoutUser(req.user._id)
    }
    res.clearCookie('refreshToken', { path: '/' })
    sendSuccess(res, {}, 'Logged out successfully')
  } catch (err) {
    sendError(res, err.message, 500)
  }
}

export const getMe = async (req, res) => {
  // req.user already populated by protect middleware
  sendSuccess(res, { user: req.user.toSafeObject() }, 'User fetched')
}
