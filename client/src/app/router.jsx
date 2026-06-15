import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from './authStore'
import Spinner from '../components/ui/Spinner'

// Lazy load pages for code splitting
// Each page only loads when the user navigates to it
const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'))
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'))
const ResumePage = lazy(() => import('../features/resume/pages/ResumePage'))
const ResumeListPage = lazy(() => import('../features/resume/pages/ResumeListPage'))
const ATSAnalyzerPage = lazy(() => import('../features/ats/pages/ATSAnalyzerPage'))
const AIAssistantPage = lazy(() => import('../features/ai/pages/AIAssistantPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

// Page loading fallback
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <Spinner size="lg" />
  </div>
)

// Wrap lazy pages in Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

// Guard — redirects to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const isAuth = useAuthStore((s) => s.isAuth)
  return isAuth ? children : <Navigate to="/login" replace />
}

// Guard — redirects authenticated users away from auth pages
const PublicOnlyRoute = ({ children }) => {
  const isAuth = useAuthStore((s) => s.isAuth)
  return isAuth ? <Navigate to="/dashboard" replace /> : children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(LandingPage),
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>{withSuspense(LoginPage)}</PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>{withSuspense(RegisterPage)}</PublicOnlyRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>{withSuspense(DashboardPage)}</ProtectedRoute>
    ),
  },
  {
    path: '/resumes',
    element: (
      <ProtectedRoute>{withSuspense(ResumeListPage)}</ProtectedRoute>
    ),
  },
  {
    path: '/resumes/new',
    element: (
      <ProtectedRoute>{withSuspense(ResumePage)}</ProtectedRoute>
    ),
  },
  {
    path: '/resumes/:id',
    element: (
      <ProtectedRoute>{withSuspense(ResumePage)}</ProtectedRoute>
    ),
  },
  {
    path: '/ats',
    element: (
      <ProtectedRoute>{withSuspense(ATSAnalyzerPage)}</ProtectedRoute>
    ),
  },
  {
    path: '/ai',
    element: (
      <ProtectedRoute>{withSuspense(AIAssistantPage)}</ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
])
