import { Link } from 'react-router-dom'
import { Plus, FileText } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

const ResumeListPage = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
        <Link to="/resumes/new">
          <Button icon={Plus}>New Resume</Button>
        </Link>
      </div>

      <Card>
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FileText className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No resumes yet</h3>
          <p className="text-sm text-slate-500 mb-6">Full list + CRUD coming in Phase C.</p>
          <Link to="/resumes/new">
            <Button icon={Plus}>Create your first resume</Button>
          </Link>
        </div>
      </Card>
    </div>
  </div>
)

export default ResumeListPage
