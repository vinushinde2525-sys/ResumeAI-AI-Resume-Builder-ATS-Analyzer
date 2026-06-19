import api from '../../lib/axios'

export const jobsApi = {
  list:   ()           => api.get('/jobs'),
  get:    (id)         => api.get(`/jobs/${id}`),
  create: (data)       => api.post('/jobs', data),
  update: (id, data)   => api.put(`/jobs/${id}`, data),
  delete: (id)         => api.delete(`/jobs/${id}`),
  match:  (id, resumeId) => api.get(`/jobs/${id}/match`, { params: { resumeId } }),
}
