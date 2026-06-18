import React from 'react'
import { formatList } from '../../../lib/utils'

/**
 * MinimalTemplate — thin type weights, no borders, no color accents
 * except subtle gray. Pure typography-driven hierarchy.
 */
const MinimalTemplate = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills } = data
  const formattedSkills = formatList(skills || '')

  return (
    <div ref={ref} className="bg-white p-12 w-full min-h-[900px] resume-paper text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="mb-10">
        <h1 className="text-2xl font-light tracking-tight">{personal?.name || 'Your Name'}</h1>
        <p className="text-sm text-slate-400 mt-1">{personal?.title || 'Professional Title'}</p>
        <p className="text-xs text-slate-400 mt-3">
          {[personal?.email, personal?.phone, personal?.linkedin].filter(Boolean).join('   ')}
        </p>
      </header>

      {summary && (
        <section className="mb-8">
          <p className="text-sm leading-loose text-slate-600">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400 mb-4">Experience</p>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-slate-900">{exp.position}</p>
                <p className="text-xs text-slate-400">{exp.startDate} — {exp.endDate}</p>
              </div>
              <p className="text-xs text-slate-400 mb-2">{exp.company}</p>
              {(exp.description || '').split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">{line.replace(/^[-•*]\s*/, '')}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400 mb-4">Education</p>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{edu.degree}</p>
                <p className="text-xs text-slate-400">{edu.institution}</p>
              </div>
              <p className="text-xs text-slate-400">{edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {formattedSkills.length > 0 && (
        <section>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400 mb-3">Skills</p>
          <p className="text-sm text-slate-600">{formattedSkills.join(' · ')}</p>
        </section>
      )}
    </div>
  )
})

MinimalTemplate.displayName = 'MinimalTemplate'
export default MinimalTemplate
