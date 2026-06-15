import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
    <p className="text-8xl font-black text-brand-200 mb-4">404</p>
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
    <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/">
      <Button variant="primary">Back to home</Button>
    </Link>
  </div>
)

export default NotFoundPage
