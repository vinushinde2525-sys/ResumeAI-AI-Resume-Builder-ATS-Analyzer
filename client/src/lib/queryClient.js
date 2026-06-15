import { QueryClient } from '@tanstack/react-query'

// Global TanStack Query client
// Controls caching, retry, and stale time behavior
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5 min — don't refetch if data is fresh
      gcTime: 1000 * 60 * 10,      // 10 min — keep in cache after unmount
      retry: 1,                     // retry failed requests once
      refetchOnWindowFocus: false,  // don't refetch on tab switch
    },
    mutations: {
      retry: 0, // never retry mutations automatically
    },
  },
})
