import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './authStore'
import Spinner from '../components/ui/Spinner'
import Navbar from '../components/layout/Navbar'

// Lazy load every page — code splitting per route
const LandingPage      = lazy(() => import('../pages/LandingPage'))
const LoginPage        = lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage     = lazy(() => import('../features/auth/pages/RegisterPage'))
const DashboardPage    = lazy(() => import('../features/dashboard/pages/DashboardPage'))
const ResumePage       = lazy(() => import('../features/resume/pages/ResumePage'))
const ResumeListPage   = lazy(() => import('../features/resume/pages/ResumeListPage'))
const ATSAnalyzerPage  = lazy(() => import('../features/ats/pages/ATSAnalyzerPage'))
const AIAssistantPage  = lazy(() => import('../features/ai/pages/AIAssistantPage'))
const TemplateGalleryPage = lazy(() => import('../features/templates/pages/TemplateGalleryPage'))
const NotFoundPage     = lazy(() => import('../pages/NotFoundPage'))

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-slate-50">
    <Spinner size="lg" />
  </div>
)

// Authenticated layout — Navbar + page
const AppShell = () => {
  const isAuth = useAuthStore((s) => s.isAuth)
  if (!isAuth) return <Navigate to="/login" replace />
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

// Public-only guard — redirect logged-in users to dashboard
const PublicOnly = ({ children }) => {
  const isAuth = useAuthStore((s) => s.isAuth)
  return isAuth ? <Navigate to="/dashboard" replace /> : children
}

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicOnly>
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </PublicOnly>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnly>
        <Suspense fallback={<PageLoader />}>
          <RegisterPage />
        </Suspense>
      </PublicOnly>
    ),
  },

  // Authenticated layout — all children get Navbar automatically
  {
    element: <AppShell />,
    children: [
      { path: '/dashboard',   element: <DashboardPage /> },
      { path: '/resumes',     element: <ResumeListPage /> },
      { path: '/resumes/new', element: <ResumePage /> },
      { path: '/resumes/:id', element: <ResumePage /> },
      { path: '/resumes/:id/templates', element: <TemplateGalleryPage /> },
      { path: '/ats',         element: <ATSAnalyzerPage /> },
      { path: '/ai',          element: <AIAssistantPage /> },
    ],
  },

  // 404
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
])
