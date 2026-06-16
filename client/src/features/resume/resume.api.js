import api from '../../lib/axios'

/**
 * resumeApi — all resume HTTP calls.
 * Components never call axios directly — always through this service.
 */
export const resumeApi = {
  list:   ()          => api.get('/resumes'),
  get:    (id)        => api.get(`/resumes/${id}`),
  create: (data)      => api.post('/resumes', data),
  update: (id, data)  => api.put(`/resumes/${id}`, data),
  delete: (id)        => api.delete(`/resumes/${id}`),
}
