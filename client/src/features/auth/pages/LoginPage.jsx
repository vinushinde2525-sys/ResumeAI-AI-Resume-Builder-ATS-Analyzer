import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

// Full implementation comes in Phase B (Auth)
const LoginPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back to ResumeAI</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-center text-sm text-slate-500 py-4">
          Auth implementation coming in Phase B.
        </p>
        <p className="text-center text-sm text-slate-500">
          No account?{' '}
          <Link to="/register" className="text-brand-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        <Link to="/" className="hover:underline">← Back to home</Link>
      </p>
    </div>
  </div>
)

export default LoginPage
