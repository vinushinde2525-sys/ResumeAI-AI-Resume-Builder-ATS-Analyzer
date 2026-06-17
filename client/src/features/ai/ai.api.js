import api from '../../lib/axios'

/**
 * aiApi — all AI HTTP calls.
 * One function per endpoint. Never call axios directly from components.
 */
export const aiApi = {
  improveSummary:      (data) => api.post('/ai/summary',      data),
  rewriteBullet:       (data) => api.post('/ai/bullet',       data),
  suggestSkills:       (data) => api.post('/ai/skills',       data),
  generateProjectDesc: (data) => api.post('/ai/project-desc', data),
  getResumeFeedback:   (data) => api.post('/ai/feedback',     data),
}
