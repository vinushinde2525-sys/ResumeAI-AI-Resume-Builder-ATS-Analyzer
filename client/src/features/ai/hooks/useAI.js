import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { aiApi } from '../ai.api'
import { getErrorMessage } from '../../../lib/utils'

/**
 * useAI hooks — TanStack Query mutations for AI features.
 *
 * WHY MUTATIONS not queries:
 * AI calls are expensive, user-triggered, and should not be cached
 * automatically or refetched. useMutation is correct here:
 * - No automatic background refetch
 * - isPending loading state
 * - onError toast
 * - Data available in mutation.data after success
 *
 * Each hook returns the mutation object so components get:
 *   mutate(payload)  — trigger the AI call
 *   isPending        — show loading spinner
 *   data             — the result
 *   reset()          — clear result to try again
 */

const makeAIMutation = (mutationFn, successMsg) => () =>
  useMutation({
    mutationFn: async (payload) => {
      const { data } = await mutationFn(payload)
      return data.data // unwrap { success, data: { result, provider } }
    },
    onSuccess: () => {
      if (successMsg) toast.success(successMsg)
    },
    onError: (err) => {
      const msg = getErrorMessage(err)
      toast.error(msg)
    },
  })

export const useImproveSummary      = makeAIMutation(aiApi.improveSummary,      'Summary improved!')
export const useRewriteBullet       = makeAIMutation(aiApi.rewriteBullet,       'Bullet rewritten!')
export const useSuggestSkills       = makeAIMutation(aiApi.suggestSkills,       null) // toast in component
export const useGenerateProjectDesc = makeAIMutation(aiApi.generateProjectDesc, 'Description generated!')
export const useResumeFeedback      = makeAIMutation(aiApi.getResumeFeedback,   'Feedback generated!')
