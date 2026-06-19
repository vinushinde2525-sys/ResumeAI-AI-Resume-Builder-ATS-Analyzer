import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jobsApi } from '../jobs.api'
import { getErrorMessage } from '../../../lib/utils'

export const jobKeys = {
  all:    () => ['jobs'],
  list:   () => ['jobs', 'list'],
  detail: (id) => ['jobs', 'detail', id],
  match:  (id, resumeId) => ['jobs', 'match', id, resumeId],
}

export const useJobList = () =>
  useQuery({
    queryKey: jobKeys.list(),
    queryFn: async () => { const { data } = await jobsApi.list(); return data.data.jobs },
  })

export const useJobDetail = (id) =>
  useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: async () => { const { data } = await jobsApi.get(id); return data.data.job },
    enabled: !!id,
  })

export const useJobMatch = (jobId, resumeId) =>
  useQuery({
    queryKey: jobKeys.match(jobId, resumeId),
    queryFn: async () => { const { data } = await jobsApi.match(jobId, resumeId); return data.data.match },
    enabled: !!(jobId && resumeId),
    staleTime: 1000 * 60 * 10, // match is deterministic — cache aggressively
  })

export const useCreateJob = () => {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (payload) => jobsApi.create(payload),
    onSuccess: ({ data }) => {
      qc.invalidateQueries({ queryKey: jobKeys.list() })
      toast.success('Job saved!')
      navigate(`/jobs/${data.data.job._id}`)
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export const useUpdateJob = (id) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload) => jobsApi.update(id, payload),
    onSuccess: ({ data }) => {
      qc.setQueryData(jobKeys.detail(id), data.data.job)
      qc.invalidateQueries({ queryKey: jobKeys.list() })
      toast.success('Job updated!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export const useDeleteJob = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => jobsApi.delete(id),
    onSuccess: (_, id) => {
      qc.setQueryData(jobKeys.list(), (old) => old?.filter(j => j._id !== id) ?? [])
      qc.removeQueries({ queryKey: jobKeys.detail(id) })
      toast.success('Job removed')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}
