import axios from 'axios'

/**
 * Axios instance with JWT interceptors.
 *
 * Request interceptor:  reads token from Zustand store → adds to header
 * Response interceptor: on 401 → calls /auth/refresh → retries original request
 *
 * WHY NOT useAuthStore directly here:
 * Circular import risk (store imports api, api imports store).
 * Solution: read from the store's getState() directly — no hook needed outside React.
 */

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends httpOnly refresh token cookie automatically
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach current access token
api.interceptors.request.use(
  (config) => {
    // Read from Zustand persisted storage directly (avoids circular import)
    try {
      const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
      const token = stored?.state?.accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // localStorage unavailable — skip token attachment
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — silent token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Only retry once, only on 401, not on the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        // Refresh token is in httpOnly cookie — browser sends it automatically
        const { data } = await axios.post(
          '/api/auth/refresh',
          {},
          { withCredentials: true }
        )

        const newToken = data.data?.accessToken

        // Update Zustand store with new token
        if (newToken) {
          const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
          if (stored?.state) {
            stored.state.accessToken = newToken
            localStorage.setItem('auth-storage', JSON.stringify(stored))
          }
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        return api(originalRequest)
      } catch {
        // Refresh failed — clear auth and redirect
        localStorage.removeItem('auth-storage')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
