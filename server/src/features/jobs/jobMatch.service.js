import { scoreKeywords, compareJobDescription } from '../ats/ats.service.js'

/**
 * Job Match Service.
 *
 * CRITICAL DESIGN DECISION: this does NOT reimplement scoring logic.
 * It imports and reuses the exact same deterministic functions built
 * in Phase F (ats.service.js) — scoreKeywords and compareJobDescription
 * already do precisely "resume vs job description" analysis.
 *
 * Reusing them here means:
 * - Zero duplicate keyword-matching code (the word-boundary regex bug
 *   fix from Phase F automatically applies here too)
 * - One scoring algorithm to test, explain, and maintain
 * - "matchScore" on a job card means the same thing as "keywordScore"
 *   on an ATS report — consistent mental model across the whole app
 */
export const matchResumeToJob = (resumeData, job) => {
  const jobDescription = [job.description, (job.requiredSkills || []).join(', ')]
    .filter(Boolean)
    .join('\n')

  if (!jobDescription.trim()) {
    return {
      matchScore: null,
      matchingSkills: [],
      missingSkills: [],
      keywordCoverage: null,
      recommendedImprovements: ['This job has no description or required skills to match against yet.'],
    }
  }

  // Reuse Phase F's exact comparison engine
  const jdMatch = compareJobDescription(resumeData, jobDescription)
  const keywordResult = scoreKeywords(resumeData, jobDescription)

  if (!jdMatch) {
    return {
      matchScore: keywordResult.score,
      matchingSkills: keywordResult.found,
      missingSkills: keywordResult.missing,
      keywordCoverage: keywordResult.score,
      recommendedImprovements: [],
    }
  }

  const recommendedImprovements = []
  if (jdMatch.missingKeywords?.length > 0) {
    recommendedImprovements.push(
      `Add these skills if you have them: ${jdMatch.missingKeywords.slice(0, 5).join(', ')}`
    )
  }
  if (jdMatch.missingSkills?.length > 0) {
    recommendedImprovements.push(
      `Consider highlighting: ${jdMatch.missingSkills.slice(0, 3).join(', ')}`
    )
  }
  if (jdMatch.matchPercent < 50) {
    recommendedImprovements.push('Your resume has low keyword overlap with this job — consider tailoring your summary and skills section.')
  }

  return {
    matchScore: jdMatch.matchPercent,
    matchingSkills: jdMatch.matchedKeywords || [],
    missingSkills: [...(jdMatch.missingKeywords || []), ...(jdMatch.missingSkills || [])],
    keywordCoverage: keywordResult.score,
    recommendedImprovements,
  }
}

// Batch version — used by JobsPage to show match % on every job card
// against the user's currently-selected resume.
export const matchResumeToJobs = (resumeData, jobs) =>
  jobs.map((job) => ({
    jobId: job._id,
    ...matchResumeToJob(resumeData, job),
  }))
