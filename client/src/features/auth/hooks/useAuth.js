import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../../app/authStore'
import { authApi } from '../auth.api'
import { getErrorMessage } from '../../../lib/utils'

/**
 * useAuth — hook that wraps auth mutations with Zustand state updates.
 *
 * Pattern:
 * - useMutation from TanStack handles loading/error/success states
 * - On success: update Zustand store → triggers re-render of ProtectedRoutes
 * - On error: show toast with message from server
 *
 * WHY useMutation for auth (not just fetch):
 * Auth calls mutate server state (create session, delete session).
 * TanStack Query's useMutation gives us isPending, isError, reset for free.
 */

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: ({ data }) => {
      setAuth(data.data.user, data.data.accessToken)
      toast.success('Account created! Welcome to ResumeAI.')
      navigate('/dashboard')
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })
}

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      setAuth(data.data.user, data.data.accessToken)
      toast.success(`Welcome back, ${data.data.user.name}!`)
      navigate('/dashboard')
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })
}

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth()
      navigate('/')
      toast.success('Logged out successfully')
    },
    onError: () => {
      // Even if server call fails, clear local auth
      clearAuth()
      navigate('/')
    },
  })
}
