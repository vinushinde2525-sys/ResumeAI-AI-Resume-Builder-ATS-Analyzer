import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { versionApi } from '../version.api'
import { resumeKeys } from './useResumes'
import { getErrorMessage } from '../../../lib/utils'

export const versionKeys = {
  list: (resumeId) => ['resumes', resumeId, 'versions'],
}

export const useResumeVersions = (resumeId) =>
  useQuery({
    queryKey: versionKeys.list(resumeId),
    queryFn: async () => {
      const { data } = await versionApi.list(resumeId)
      return data.data.versions
    },
    enabled: Boolean(resumeId) && resumeId !== 'new',
  })

export const useRestoreVersion = (resumeId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (versionId) => versionApi.restore(resumeId, versionId),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(resumeKeys.detail(resumeId), data.data.resume)
      queryClient.invalidateQueries({ queryKey: versionKeys.list(resumeId) })
      queryClient.invalidateQueries({ queryKey: resumeKeys.list() })
      toast.success('Version restored!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export const useCompareVersions = (resumeId, versionAId, versionBId) =>
  useQuery({
    queryKey: ['resumes', resumeId, 'versions', 'compare', versionAId, versionBId],
    queryFn: async () => {
      const { data } = await versionApi.compare(resumeId, versionAId, versionBId)
      return data.data
    },
    enabled: Boolean(resumeId && versionAId && versionBId),
  })
