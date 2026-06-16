import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { resumeApi } from '../resume.api'
import { getErrorMessage } from '../../../lib/utils'

// Query key factory — keeps keys consistent across hooks
// Centralizing prevents key typos across components
export const resumeKeys = {
  all:    () => ['resumes'],
  list:   () => ['resumes', 'list'],
  detail: (id) => ['resumes', 'detail', id],
}

/**
 * useResumeList — fetch all resumes for the logged-in user.
 * TanStack Query caches this — navigating away and back doesn't refetch
 * until staleTime (5min) expires or we manually invalidate.
 */
export const useResumeList = () =>
  useQuery({
    queryKey: resumeKeys.list(),
    queryFn: async () => {
      const { data } = await resumeApi.list()
      return data.data.resumes
    },
  })

/**
 * useResumeDetail — fetch a single resume by ID.
 * Only runs when id is truthy (skips on /resumes/new).
 */
export const useResumeDetail = (id) =>
  useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: async () => {
      const { data } = await resumeApi.get(id)
      return data.data.resume
    },
    enabled: Boolean(id) && id !== 'new',
  })

/**
 * useCreateResume — POST /api/resumes.
 * On success: invalidates list cache + navigates to editor.
 */
export const useCreateResume = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload) => resumeApi.create(payload),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.list() })
      toast.success('Resume created!')
      navigate(`/resumes/${data.data.resume._id}`)
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

/**
 * useUpdateResume — PUT /api/resumes/:id.
 * Optimistic pattern: invalidate on settle (simple & safe for this project).
 */
export const useUpdateResume = (id) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => resumeApi.update(id, payload),
    onSuccess: ({ data }) => {
      // Update the detail cache in place — no refetch needed
      queryClient.setQueryData(resumeKeys.detail(id), data.data.resume)
      // Invalidate list so title updates show there too
      queryClient.invalidateQueries({ queryKey: resumeKeys.list() })
      toast.success('Resume saved!')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

/**
 * useDeleteResume — DELETE /api/resumes/:id.
 * Removes from list cache immediately on success.
 */
export const useDeleteResume = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => resumeApi.delete(id),
    onSuccess: (_, id) => {
      // Remove this item from list cache without refetch
      queryClient.setQueryData(resumeKeys.list(), (old) =>
        old ? old.filter((r) => r._id !== id) : []
      )
      queryClient.removeQueries({ queryKey: resumeKeys.detail(id) })
      toast.success('Resume deleted')
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}
