import api from '../../lib/axios'

export const versionApi = {
  list:    (resumeId) => api.get(`/resumes/${resumeId}/versions`),
  get:     (resumeId, versionId) => api.get(`/resumes/${resumeId}/versions/${versionId}`),
  restore: (resumeId, versionId) => api.post(`/resumes/${resumeId}/versions/${versionId}/restore`),
  compare: (resumeId, versionAId, versionBId) =>
    api.get(`/resumes/${resumeId}/versions/compare`, { params: { versionAId, versionBId } }),
}
