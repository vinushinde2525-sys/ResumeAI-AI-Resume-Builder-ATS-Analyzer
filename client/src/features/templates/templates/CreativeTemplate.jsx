import React from 'react'
import { Mail, Phone, Link as LinkIcon } from 'lucide-react'
import { formatList } from '../../../lib/utils'

/**
 * CreativeTemplate — two-column sidebar layout.
 * Pink/rose accent sidebar holds contact info + skills,
 * main column holds summary/experience/education.
 * Targets design and creative-industry roles.
 */
const CreativeTemplate = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills, hobbies } = data
  const formattedSkills = formatList(skills || '')
  const formattedHobbies = formatList(hobbies || '')

  return (
    <div ref={ref} className="bg-white w-full min-h-[900px] resume-paper flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-[34%] bg-rose-600 text-white p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold leading-tight">{personal?.name || 'Your Name'}</h1>
          <p className="text-sm text-rose-100 mt-1">{personal?.title || 'Professional Title'}</p>
        </div>

        <div className="space-y-2">
          {personal?.email && (
            <div className="flex items-center gap-2 text-xs"><Mail className="h-3.5 w-3.5" />{personal.email}</div>
          )}
          {personal?.phone && (
            <div className="flex items-center gap-2 text-xs"><Phone className="h-3.5 w-3.5" />{personal.phone}</div>
          )}
          {personal?.linkedin && (
            <div className="flex items-center gap-2 text-xs"><LinkIcon className="h-3.5 w-3.5" />{personal.linkedin}</div>
          )}
        </div>

        {formattedSkills.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-2 text-rose-100">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {formattedSkills.map((s, i) => (
                <span key={i} className="text-[10px] bg-rose-500/40 rounded-full px-2 py-0.5">{s}</span>
              ))}
            </div>
          </div>
        )}

        {formattedHobbies.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-2 text-rose-100">Interests</p>
            <p className="text-xs text-rose-100">{formattedHobbies.join(', ')}</p>
          </div>
        )}

        {education?.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-2 text-rose-100">Education</p>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree}</p>
                <p className="text-[10px] text-rose-200">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main column */}
      <main className="flex-1 p-6">
        {summary && (
          <section className="mb-5">
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase text-rose-600 mb-3 pb-1 border-b-2 border-rose-100">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-400">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-xs italic text-slate-500 mb-1">{exp.company}</p>
                {(exp.description || '').split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} className="text-sm text-slate-600 pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-rose-400">
                    {line.replace(/^[-•*]\s*/, '')}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
})

CreativeTemplate.displayName = 'CreativeTemplate'
export default CreativeTemplate
