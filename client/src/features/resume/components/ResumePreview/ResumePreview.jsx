import React from 'react'
import { Mail, Phone, Link, Briefcase, GraduationCap, Code, Heart } from 'lucide-react'
import { formatList } from '../../../../lib/utils'

/**
 * ResumePreview — migrated faithfully from v1.
 *
 * Preserved:
 * - forwardRef for print support
 * - Bullet point parsing in experience descriptions
 * - formatList for skills/hobbies pill display
 * - All section rendering logic
 *
 * Updated:
 * - Removed inline Tailwind classes that conflicted with v2 theme
 * - Uses v2 color tokens (indigo/teal preserved — they were right)
 * - Cleaner component structure with extracted sub-components
 */

// --- Sub-components (same as v1, refined styling) ---

const ContactItem = ({ Icon, text, link, isLink = true }) => (
  <div className="flex items-center text-xs sm:text-sm">
    <Icon className="mr-1.5 h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
    {isLink ? (
      <a
        href={link}
        className="hover:underline text-slate-600 truncate"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    ) : (
      <span className="text-slate-600">{text}</span>
    )}
  </div>
)

const ResumeSectionTitle = ({ Icon, title }) => (
  <h2 className="mt-6 mb-3 border-b-2 border-teal-500 pb-1 text-sm font-extrabold uppercase text-indigo-900 tracking-widest flex items-center gap-2">
    <Icon className="h-4 w-4 text-teal-600 flex-shrink-0" />
    {title}
  </h2>
)

const ResumeSummary = ({ text }) => (
  <p className="text-sm text-slate-700 mt-3 italic border-l-4 border-teal-300 pl-3 leading-relaxed">
    {text}
  </p>
)

const ResumeExperience = ({ company, position, role, startDate, endDate, description, years }) => {
  // Support both v1 field names (role, years) and v2 (position, startDate/endDate)
  const displayRole = position || role || ''
  const displayYears = years || (startDate && endDate ? `${startDate} – ${endDate}` : startDate || '')

  return (
    <div className="mb-4">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-sm font-bold text-indigo-800 leading-snug">{displayRole}</h3>
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap flex-shrink-0">{displayYears}</span>
      </div>
      <p className="text-xs italic text-slate-600 mb-1">{company}</p>
      <div className="text-sm text-slate-700 leading-snug">
        {(description || '').split('\n').map((line, index) => {
          const trimmed = line.trim()
          if (!trimmed) return null
          // Preserved from v1: convert - or * prefix to bullet point
          if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
            return (
              <span
                key={index}
                className="block pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500 before:font-bold"
              >
                {trimmed.replace(/^[-•*]\s*/, '')}
              </span>
            )
          }
          return <span key={index} className="block">{trimmed}</span>
        })}
      </div>
    </div>
  )
}

const ResumeEducation = ({ institution, degree, startDate, endDate, years, description }) => {
  const displayYears = years || (startDate && endDate ? `${startDate} – ${endDate}` : startDate || '')

  return (
    <div className="mb-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">{degree}</h3>
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap flex-shrink-0">{displayYears}</span>
      </div>
      <p className="text-xs italic text-slate-600">{institution}</p>
      {description && <p className="text-xs text-slate-600 mt-1">{description}</p>}
    </div>
  )
}

const ResumeSkillsOrHobbies = ({ list }) => (
  <div className="mt-2">
    <ul className="flex flex-wrap gap-2">
      {list.map((item, index) => (
        <li
          key={index}
          className="px-3 py-1 bg-teal-50 text-indigo-800 rounded-full text-xs font-semibold border border-teal-200"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
)

// --- Main Preview (forwardRef preserved from v1 for print/PDF support) ---

const ResumePreview = React.forwardRef(({ data }, ref) => {
  const { personal, summary, education, experience, skills, hobbies } = data

  const formattedSkills = formatList(skills || '')
  const formattedHobbies = formatList(hobbies || '')

  return (
    <div
      ref={ref}
      className="bg-white p-8 w-full min-h-[900px] resume-paper"
    >
      {/* Header */}
      <header className="border-b-4 border-indigo-900 pb-3 mb-4">
        <h1 className="text-3xl font-black text-indigo-900 uppercase tracking-widest">
          {personal.name || 'Your Name'}
        </h1>
        <p className="text-base font-light text-teal-600 mt-0.5 mb-2">
          {personal.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {personal.email && (
            <ContactItem Icon={Mail} text={personal.email} link={`mailto:${personal.email}`} />
          )}
          {personal.phone && (
            <ContactItem Icon={Phone} text={personal.phone} isLink={false} />
          )}
          {personal.linkedin && (
            <ContactItem
              Icon={Link}
              text="LinkedIn Profile"
              link={`https://${personal.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}`}
            />
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && <ResumeSummary text={summary} />}

      {/* Experience */}
      {experience?.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Briefcase} title="Professional Experience" />
          {experience.map((exp) => (
            <ResumeExperience key={exp.id} {...exp} />
          ))}
        </>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <>
          <ResumeSectionTitle Icon={GraduationCap} title="Education" />
          {education.map((edu) => (
            <ResumeEducation key={edu.id} {...edu} />
          ))}
        </>
      )}

      {/* Skills */}
      {formattedSkills.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Code} title="Technical Skills" />
          <ResumeSkillsOrHobbies list={formattedSkills} />
        </>
      )}

      {/* Hobbies */}
      {formattedHobbies.length > 0 && (
        <>
          <ResumeSectionTitle Icon={Heart} title="Interests & Hobbies" />
          <ResumeSkillsOrHobbies list={formattedHobbies} />
        </>
      )}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview
