import React from 'react'
import { formatList } from '../../../lib/utils'

/**
 * ExecutiveTemplate — serif headings, centered header, wide letter-spacing.
 * Targets senior/leadership roles where a more formal, traditional
 * presentation is expected.
 */
const ExecutiveTemplate = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills } = data
  const formattedSkills = formatList(skills || '')

  return (
    <div ref={ref} className="bg-white p-10 w-full min-h-[900px] resume-paper text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
      <header className="text-center mb-6 pb-4 border-b border-amber-800">
        <h1 className="text-3xl font-bold tracking-wide">{personal?.name || 'Your Name'}</h1>
        <p className="text-sm uppercase tracking-widest text-amber-800 mt-1">{personal?.title || 'Professional Title'}</p>
        <p className="text-xs text-slate-500 mt-2">
          {[personal?.email, personal?.phone, personal?.linkedin].filter(Boolean).join('   •   ')}
        </p>
      </header>

      {summary && (
        <section className="mb-6 text-center">
          <p className="text-sm leading-relaxed text-slate-700 italic max-w-xl mx-auto">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold">{exp.position}</h3>
                <span className="text-xs text-slate-500">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="text-sm italic text-slate-600 mb-1">{exp.company}</p>
              {(exp.description || '').split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="text-sm text-slate-700 pl-3">— {line.replace(/^[-•*]\s*/, '')}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 text-center">
              <p className="text-sm font-bold">{edu.degree}</p>
              <p className="text-xs text-slate-500">{edu.institution} · {edu.startDate} – {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {formattedSkills.length > 0 && (
        <section className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-3">Core Competencies</h2>
          <p className="text-sm text-slate-700">{formattedSkills.join('  •  ')}</p>
        </section>
      )}
    </div>
  )
})

ExecutiveTemplate.displayName = 'ExecutiveTemplate'
export default ExecutiveTemplate
