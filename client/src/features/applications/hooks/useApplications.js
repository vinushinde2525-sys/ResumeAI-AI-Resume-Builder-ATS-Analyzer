import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { applicationsApi } from '../applications.api'
import { getErrorMessage } from '../../../lib/utils'

export const appKeys = {
  list:      () => ['applications', 'list'],
  analytics: () => ['applications', 'analytics'],
}

export const useApplicationList = () =>
  useQuery({
    queryKey: appKeys.list(),
    queryFn: async () => { const { data } = await applicationsApi.list(); return data.data.applications },
  })

export const useApplicationAnalytics = () =>
  useQuery({
    queryKey: appKeys.analytics(),
    queryFn: async () => { const { data } = await applicationsApi.analytics(); return data.data.analytics },
  })

export const useCreateApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload) => applicationsApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: appKeys.list() })
      qc.invalidateQueries({ queryKey: appKeys.analytics() })
      toast.success('Added to tracker!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export const useUpdateApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }) => applicationsApi.update(id, payload),
    onSuccess: ({ data }) => {
      const updated = data.data.application
      qc.setQueryData(appKeys.list(), (old) =>
        old?.map(a => a._id === updated._id ? updated : a) ?? []
      )
      qc.invalidateQueries({ queryKey: appKeys.analytics() })
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export const useDeleteApplication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => applicationsApi.delete(id),
    onSuccess: (_, id) => {
      qc.setQueryData(appKeys.list(), (old) => old?.filter(a => a._id !== id) ?? [])
      qc.invalidateQueries({ queryKey: appKeys.analytics() })
      toast.success('Removed from tracker')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}
