import api from '../../lib/axios'

export const applicationsApi = {
  list:      ()           => api.get('/applications'),
  get:       (id)         => api.get(`/applications/${id}`),
  create:    (data)       => api.post('/applications', data),
  update:    (id, data)   => api.put(`/applications/${id}`, data),
  delete:    (id)         => api.delete(`/applications/${id}`),
  analytics: ()           => api.get('/applications/analytics'),
}
