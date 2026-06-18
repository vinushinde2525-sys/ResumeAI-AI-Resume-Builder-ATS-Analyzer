import React from 'react'
import { Mail, Phone, Link, Briefcase, GraduationCap, Code, Heart } from 'lucide-react'
import { formatList } from '../../../lib/utils'

/**
 * ModernTemplate — two-tone header, teal accent underlines.
 * This is the original v1-derived layout from ResumePreview,
 * now registered as one of five selectable templates.
 */
const ModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills, hobbies } = data
  const formattedSkills = formatList(skills || '')
  const formattedHobbies = formatList(hobbies || '')

  return (
    <div ref={ref} className="bg-white p-8 w-full min-h-[900px] resume-paper" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="border-b-4 border-indigo-900 pb-3 mb-4">
        <h1 className="text-3xl font-black text-indigo-900 uppercase tracking-widest">{personal?.name || 'Your Name'}</h1>
        <p className="text-base font-light text-teal-600 mt-0.5 mb-2">{personal?.title || 'Professional Title'}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {personal?.email && (
            <div className="flex items-center text-xs sm:text-sm">
              <Mail className="mr-1.5 h-3.5 w-3.5 text-teal-600" /><span className="text-slate-600">{personal.email}</span>
            </div>
          )}
          {personal?.phone && (
            <div className="flex items-center text-xs sm:text-sm">
              <Phone className="mr-1.5 h-3.5 w-3.5 text-teal-600" /><span className="text-slate-600">{personal.phone}</span>
            </div>
          )}
          {personal?.linkedin && (
            <div className="flex items-center text-xs sm:text-sm">
              <Link className="mr-1.5 h-3.5 w-3.5 text-teal-600" /><span className="text-slate-600">{personal.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {summary && (
        <p className="text-sm text-slate-700 mt-3 italic border-l-4 border-teal-300 pl-3 leading-relaxed">{summary}</p>
      )}

      {experience?.length > 0 && (
        <>
          <h2 className="mt-6 mb-3 border-b-2 border-teal-500 pb-1 text-sm font-extrabold uppercase text-indigo-900 tracking-widest flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-teal-600" /> Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-bold text-indigo-800">{exp.position}</h3>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="text-xs italic text-slate-600 mb-1">{exp.company}</p>
              <div className="text-sm text-slate-700">
                {(exp.description || '').split('\n').filter(Boolean).map((line, i) => (
                  <span key={i} className="block pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500 before:font-bold">
                    {line.replace(/^[-•*]\s*/, '')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {education?.length > 0 && (
        <>
          <h2 className="mt-6 mb-3 border-b-2 border-teal-500 pb-1 text-sm font-extrabold uppercase text-indigo-900 tracking-widest flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-teal-600" /> Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-xs italic text-slate-600">{edu.institution}</p>
            </div>
          ))}
        </>
      )}

      {formattedSkills.length > 0 && (
        <>
          <h2 className="mt-6 mb-3 border-b-2 border-teal-500 pb-1 text-sm font-extrabold uppercase text-indigo-900 tracking-widest flex items-center gap-2">
            <Code className="h-4 w-4 text-teal-600" /> Technical Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {formattedSkills.map((s, i) => (
              <li key={i} className="px-3 py-1 bg-teal-50 text-indigo-800 rounded-full text-xs font-semibold border border-teal-200">{s}</li>
            ))}
          </ul>
        </>
      )}

      {formattedHobbies.length > 0 && (
        <>
          <h2 className="mt-6 mb-3 border-b-2 border-teal-500 pb-1 text-sm font-extrabold uppercase text-indigo-900 tracking-widest flex items-center gap-2">
            <Heart className="h-4 w-4 text-teal-600" /> Interests
          </h2>
          <ul className="flex flex-wrap gap-2">
            {formattedHobbies.map((h, i) => (
              <li key={i} className="px-3 py-1 bg-teal-50 text-indigo-800 rounded-full text-xs font-semibold border border-teal-200">{h}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
})

ModernTemplate.displayName = 'ModernTemplate'
export default ModernTemplate
