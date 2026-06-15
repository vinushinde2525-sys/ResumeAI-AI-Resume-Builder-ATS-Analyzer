import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { router } from './app/router'
import { queryClient } from './lib/queryClient'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: { iconTheme: { primary: '#14b8a6', secondary: '#ffffff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#ffffff' } },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
)
