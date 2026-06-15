import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * AppLayout — shell for all authenticated pages.
 * Renders Navbar + page content via <Outlet />.
 *
 * Usage in router: wrap protected routes with this layout.
 * Currently Navbar is included per-page; this component
 * is ready to use as a layout route in Phase C refactor.
 */
const AppLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
)

export default AppLayout
