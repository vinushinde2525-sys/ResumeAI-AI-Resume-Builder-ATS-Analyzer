const JOB_TYPES = ['all', 'full-time', 'part-time', 'contract', 'internship', 'freelance']
const EXPERIENCE_LEVELS = ['all', 'entry', 'mid', 'senior', 'lead']

const JobFilters = ({ jobType, setJobType, experienceLevel, setExperienceLevel }) => (
  <div className="flex flex-wrap gap-3">
    <select
      value={jobType}
      onChange={(e) => setJobType(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
    >
      {JOB_TYPES.map(t => <option key={t} value={t}>{t === 'all' ? 'All job types' : t}</option>)}
    </select>
    <select
      value={experienceLevel}
      onChange={(e) => setExperienceLevel(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
    >
      {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l === 'all' ? 'All levels' : l}</option>)}
    </select>
  </div>
)

export default JobFilters
