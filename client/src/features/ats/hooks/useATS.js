import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { atsApi } from '../ats.api'
import { getErrorMessage } from '../../../lib/utils'

/**
 * useAnalyzeResume — triggers ATS analysis.
 * Unlike AI features, this is instant (rule-based, no external API),
 * but we still use useMutation for consistent loading/error UX.
 */
export const useAnalyzeResume = () =>
  useMutation({
    mutationFn: async (payload) => {
      const { data } = await atsApi.analyze(payload)
      return data.data.report
    },
    onSuccess: () => toast.success('Resume analyzed!'),
    onError: (err) => toast.error(getErrorMessage(err)),
  })
