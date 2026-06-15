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
 *
 * Security model:
 *   accessToken → Zustand (in-memory + localStorage)
 *   refreshToken → httpOnly cookie (server-set, JS cannot read)
 *
 * The refresh token is NEVER stored in JS.
 * It lives in a cookie the browser sends automatically.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuth: false,

      // Called after successful login or register
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuth: true }),

      // Update user profile fields without full re-auth
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // Update access token (called by axios refresh interceptor)
      setAccessToken: (accessToken) =>
        set({ accessToken }),

      // Clear everything on logout
      clearAuth: () =>
        set({ user: null, accessToken: null, isAuth: false }),

      // Getter for axios interceptor (avoids stale closure)
      getAccessToken: () => get().accessToken,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuth: state.isAuth,
      }),
    }
  )
)
