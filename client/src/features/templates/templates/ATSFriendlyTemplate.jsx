import React from 'react'
import { formatList } from '../../../lib/utils'

/**
 * ATSFriendlyTemplate — deliberately plain.
 * No icons, no colored backgrounds, no multi-column layout.
 * Pure semantic structure: h1/h2/p — this is what parses most
 * reliably across real-world ATS parsing engines.
 */
const ATSFriendlyTemplate = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills, hobbies } = data
  const formattedSkills = formatList(skills || '')

  return (
    <div ref={ref} className="bg-white p-10 w-full min-h-[900px] resume-paper text-slate-900" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="mb-5">
        <h1 className="text-2xl font-bold">{personal?.name || 'Your Name'}</h1>
        <p className="text-base text-slate-700">{personal?.title || 'Professional Title'}</p>
        <p className="text-sm text-slate-600 mt-1">
          {[personal?.email, personal?.phone, personal?.linkedin].filter(Boolean).join('  |  ')}
        </p>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <p className="text-sm font-bold">{exp.position} — {exp.company}</p>
              <p className="text-xs text-slate-500 mb-1">{exp.startDate} - {exp.endDate}</p>
              {(exp.description || '').split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="text-sm pl-4">- {line.replace(/^[-•*]\s*/, '')}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="text-sm font-bold">{edu.degree} — {edu.institution}</p>
              <p className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {formattedSkills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">Skills</h2>
          <p className="text-sm">{formattedSkills.join(', ')}</p>
        </section>
      )}
    </div>
  )
})

ATSFriendlyTemplate.displayName = 'ATSFriendlyTemplate'
export default ATSFriendlyTemplate
