import api from '../../lib/axios'

/**
 * atsApi — single endpoint for the ATS analyzer.
 */
export const atsApi = {
  analyze: (payload) => api.post('/ats/analyze', payload),
}
