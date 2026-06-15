import api from '../../lib/axios'

/**
 * Auth API service — all HTTP calls related to authentication.
 * Components and hooks never call axios directly — they go through here.
 * This makes it easy to mock in tests and swap endpoints later.
 */

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  getMe: () => api.get('/auth/me'),
}
