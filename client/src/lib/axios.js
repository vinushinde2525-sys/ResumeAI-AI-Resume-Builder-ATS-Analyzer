import axios from 'axios'

// Central axios instance — all API calls go through here
// Base URL points to our Express backend
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // needed for refresh token cookie
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401s with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and we haven't already retried, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true })
        localStorage.setItem('accessToken', data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed — clear tokens and redirect to login
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
