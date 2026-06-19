import { Search } from 'lucide-react'

const JobSearchBar = ({ value, onChange }) => (
  <div className="relative flex-1 max-w-sm">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search jobs by title or company…"
      className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
    />
  </div>
)

export default JobSearchBar
