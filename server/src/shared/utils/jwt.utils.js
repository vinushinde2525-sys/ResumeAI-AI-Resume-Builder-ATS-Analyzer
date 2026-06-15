import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { env } from '../../config/env.js'

/**
 * JWT Utilities — with jti (JWT ID) for uniqueness
 *
 * WHY jti:
 * JWT iat (issued-at) has second-precision only.
 * Two tokens signed within the same second for the same user
 * produce identical tokens — breaking refresh rotation detection.
 *
 * jti = crypto.randomUUID() → every token is globally unique.
 * This also enables token blacklisting in future (store revoked jtis).
 *
 * Two-token strategy:
 *   Access token  — short-lived (15min), Authorization header
 *   Refresh token — long-lived (7d), httpOnly cookie
 */

export const signAccessToken = (userId) =>
  jwt.sign(
    { sub: userId, jti: randomUUID(), type: 'access' },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES }
  )

export const signRefreshToken = (userId) =>
  jwt.sign(
    { sub: userId, jti: randomUUID(), type: 'refresh' },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES }
  )

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET)

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET)

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days ms
  path: '/',
}
