import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * useAuthStore — global auth state via Zustand.
 *
 * WHY ZUSTAND over Context API:
 * - No re-render of entire tree on every auth state change
 * - Persist middleware auto-syncs to localStorage
 * - Dead simple API: get, set, subscribe
 * - No Provider wrapping needed
 * - Perfect for interview demos — easy to explain
 *
 * State shape:
 *   user        — the logged-in user object (or null)
 *   accessToken — JWT access token (short-lived, ~15min)
 *   isAuth      — boolean derived from user presence
 *
 * The refresh token lives in an httpOnly cookie (server-set).
 * We never store it in JS — that's the security win.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuth: false,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuth: true }),

      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),

      clearAuth: () =>
        set({ user: null, accessToken: null, isAuth: false }),
    }),
    {
      name: 'auth-storage',
      // Only persist user + token — not derived booleans
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuth: state.isAuth,
      }),
    }
  )
)
