import { TECH_KEYWORDS, WEAK_VERBS, STRONG_VERBS, SOFT_SKILLS } from './ats.data.js'

/**
 * ATS Scoring Engine — pure, deterministic, rule-based functions.
 *
 * WHY RULE-BASED, NOT AI:
 * - Explainable: every point deducted has a concrete reason
 * - Free: no API cost per analysis
 * - Fast: runs in milliseconds, no network call
 * - Testable: same input always produces same output
 * - This is genuinely how most commercial ATS systems work —
 *   they parse text and match keywords, they don't run an LLM.
 *
 * Each score function returns { score: 0-100, details: {...} }
 * so the caller can build both the number AND the explanation.
 */

// ── Helper: word-boundary-safe keyword matching ───────────────────────────────
// Naive .includes() causes false positives (e.g. "go" matches inside "mongodb").
// We escape regex special chars (needed for keywords like "c++", "c#", "ci/cd")
// and use \b boundaries so only whole-word/phrase matches count.
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const containsKeyword = (text, keyword) => {
  // Keywords with special chars (c++, c#, ci/cd) can't use \b cleanly on both sides,
  // so we match on a non-word-character boundary instead, which still prevents
  // matches like "go" inside "mongodb" while allowing "c++" and "node.js" to match.
  const escaped = escapeRegex(keyword)
  const pattern = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, 'i')
  return pattern.test(text)
}

// ── Helper: extract all resume text into one searchable lowercase string ─────
const flattenResumeText = (resumeData) => {
  const parts = [
    resumeData.personal?.title,
    resumeData.summary,
    resumeData.skills,
    ...(resumeData.experience || []).map(e => `${e.position} ${e.company} ${e.description}`),
    ...(resumeData.education || []).map(e => `${e.degree} ${e.institution} ${e.description}`),
    resumeData.hobbies,
  ]
  return parts.filter(Boolean).join(' ').toLowerCase()
}

// ── 1. KEYWORD SCORE ──────────────────────────────────────────────────────────
// Measures how many recognized technical keywords appear in the resume.
export const scoreKeywords = (resumeData, jobDescription = '') => {
  const fullText = flattenResumeText(resumeData)

  // If a job description is provided, extract keywords from IT instead of the generic list
  const targetKeywords = jobDescription
    ? TECH_KEYWORDS.filter(kw => containsKeyword(jobDescription.toLowerCase(), kw))
    : TECH_KEYWORDS

  const found = targetKeywords.filter(kw => containsKeyword(fullText, kw))
  const missing = targetKeywords.filter(kw => !containsKeyword(fullText, kw))

  // Score: percentage of target keywords present, capped at 100.
  // When no JD is given, we score against a realistic expectation (12 keywords)
  // rather than the full 70+ list, since no resume should contain every tech term.
  const denominator = jobDescription ? targetKeywords.length : 12
  const score = denominator > 0
    ? Math.min(100, Math.round((found.length / denominator) * 100))
    : 50

  return {
    score,
    found,
    missing: missing.slice(0, 10), // top 10 most relevant missing
  }
}

// ── 2. FORMATTING SCORE ───────────────────────────────────────────────────────
// Checks structural completeness: contact info, consistent dates, section presence.
export const scoreFormatting = (resumeData) => {
  const issues = []
  let points = 100

  const { personal, experience, education } = resumeData

  // Contact completeness
  if (!personal?.email) { issues.push('Missing email address'); points -= 15 }
  if (!personal?.phone) { issues.push('Missing phone number'); points -= 10 }
  if (!personal?.linkedin) { issues.push('Missing LinkedIn profile URL'); points -= 8 }
  if (!personal?.name) { issues.push('Missing full name'); points -= 20 }
  if (!personal?.title) { issues.push('Missing professional title/headline'); points -= 10 }

  // Date consistency in experience entries
  const expWithDates = (experience || []).filter(e => e.startDate || e.endDate)
  const expMissingDates = (experience || []).filter(e => e.company && !e.startDate)
  if (expMissingDates.length > 0) {
    issues.push(`${expMissingDates.length} experience entr${expMissingDates.length > 1 ? 'ies' : 'y'} missing dates`)
    points -= Math.min(15, expMissingDates.length * 5)
  }

  // Education dates
  const eduMissingDates = (education || []).filter(e => e.institution && !e.startDate)
  if (eduMissingDates.length > 0) {
    issues.push('Education entries missing dates')
    points -= 5
  }

  // Empty sections entirely
  if (!experience?.length) { issues.push('No work experience listed'); points -= 15 }
  if (!education?.length) { issues.push('No education listed'); points -= 5 }

  return {
    score: Math.max(0, Math.round(points)),
    issues,
  }
}

// ── 3. READABILITY SCORE ──────────────────────────────────────────────────────
// Measures bullet point quality: action verb usage, weak verb penalties, length.
export const scoreReadability = (resumeData) => {
  const issues = []
  const weakVerbsFound = []
  let strongVerbCount = 0
  let totalBullets = 0
  let tooLongCount = 0
  let tooShortCount = 0

  const allDescriptions = (resumeData.experience || [])
    .map(e => e.description)
    .filter(Boolean)

  for (const desc of allDescriptions) {
    const lines = desc.split('\n').map(l => l.trim()).filter(Boolean)
    for (const line of lines) {
      totalBullets++
      const lower = line.toLowerCase()
      const wordCount = line.split(/\s+/).length

      if (wordCount > 35) tooLongCount++
      if (wordCount < 4) tooShortCount++

      const hasWeak = WEAK_VERBS.find(v => lower.includes(v))
      if (hasWeak) weakVerbsFound.push(hasWeak)

      const hasStrong = STRONG_VERBS.find(v => lower.startsWith(v) || lower.includes(` ${v}`))
      if (hasStrong) strongVerbCount++
    }
  }

  let score = 100

  if (totalBullets === 0) {
    issues.push('No experience bullet points found to analyze')
    score = 40
  } else {
    const strongRatio = strongVerbCount / totalBullets
    if (strongRatio < 0.5) {
      issues.push('Less than half of bullet points start with a strong action verb')
      score -= 25
    }
    if (weakVerbsFound.length > 0) {
      issues.push(`Found ${weakVerbsFound.length} weak/passive phrase(s) — replace with action verbs`)
      score -= Math.min(30, weakVerbsFound.length * 8)
    }
    if (tooLongCount > 0) {
      issues.push(`${tooLongCount} bullet point(s) are too long (35+ words) — aim for concise, scannable lines`)
      score -= Math.min(15, tooLongCount * 5)
    }
    if (tooShortCount > 0) {
      issues.push(`${tooShortCount} bullet point(s) are too short to convey real impact`)
      score -= Math.min(10, tooShortCount * 3)
    }
  }

  // Summary readability
  if (resumeData.summary && resumeData.summary.split(/\s+/).length < 15) {
    issues.push('Professional summary is very short — aim for 2-4 sentences')
    score -= 5
  }

  return {
    score: Math.max(0, Math.round(score)),
    issues,
    weakVerbsFound: [...new Set(weakVerbsFound)],
  }
}

// ── 4. COMPLETENESS SCORE ─────────────────────────────────────────────────────
// Checks whether all expected resume sections are present and non-trivial.
export const scoreCompleteness = (resumeData) => {
  const missingElements = []
  let points = 100

  if (!resumeData.summary || resumeData.summary.trim().length < 20) {
    missingElements.push('Professional Summary')
    points -= 20
  }
  if (!resumeData.experience?.length) {
    missingElements.push('Work Experience')
    points -= 25
  }
  if (!resumeData.education?.length) {
    missingElements.push('Education')
    points -= 15
  }
  if (!resumeData.skills || resumeData.skills.trim().length < 5) {
    missingElements.push('Skills Section')
    points -= 20
  }
  if (!resumeData.personal?.linkedin) {
    missingElements.push('LinkedIn URL')
    points -= 10
  }
  if (!resumeData.hobbies || resumeData.hobbies.trim().length === 0) {
    // Minor — hobbies are optional, smaller penalty
    points -= 5
  }

  return {
    score: Math.max(0, Math.round(points)),
    missingElements,
  }
}

// ── 5. JOB DESCRIPTION MATCH (optional) ───────────────────────────────────────
// Compares resume content against a pasted job description.
export const compareJobDescription = (resumeData, jobDescription) => {
  if (!jobDescription || jobDescription.trim().length < 20) return null

  const fullResumeText = flattenResumeText(resumeData)
  const jdLower = jobDescription.toLowerCase()

  // Extract candidate keywords from JD: tech keywords + soft skills that appear in it
  const jdTechKeywords = TECH_KEYWORDS.filter(kw => containsKeyword(jdLower, kw))
  const jdSoftSkills = SOFT_SKILLS.filter(kw => containsKeyword(jdLower, kw))
  const allJdKeywords = [...jdTechKeywords, ...jdSoftSkills]

  if (allJdKeywords.length === 0) {
    return {
      matchPercent: null,
      missingKeywords: [],
      missingSkills: [],
      note: 'Could not detect specific technical keywords in the job description',
    }
  }

  const matched = allJdKeywords.filter(kw => containsKeyword(fullResumeText, kw))
  const missing = allJdKeywords.filter(kw => !containsKeyword(fullResumeText, kw))

  const matchPercent = Math.round((matched.length / allJdKeywords.length) * 100)

  return {
    matchPercent,
    matchedKeywords: matched,
    missingKeywords: missing.filter(k => jdTechKeywords.includes(k)),
    missingSkills: missing.filter(k => jdSoftSkills.includes(k)),
  }
}

// ── ORCHESTRATOR: full analysis ───────────────────────────────────────────────
// Combines all scores into one weighted overall score + full report.
export const analyzeResume = (resumeData, jobDescription = '') => {
  const keyword      = scoreKeywords(resumeData, jobDescription)
  const formatting    = scoreFormatting(resumeData)
  const readability   = scoreReadability(resumeData)
  const completeness  = scoreCompleteness(resumeData)
  const jdMatch        = compareJobDescription(resumeData, jobDescription)

  // Weighted average — completeness and keywords matter most for ATS parsing
  const WEIGHTS = { keyword: 0.3, formatting: 0.2, readability: 0.2, completeness: 0.3 }
  const overallScore = Math.round(
    keyword.score * WEIGHTS.keyword +
    formatting.score * WEIGHTS.formatting +
    readability.score * WEIGHTS.readability +
    completeness.score * WEIGHTS.completeness
  )

  // Build consolidated, prioritized improvement suggestions
  const improvementSuggestions = []
  if (completeness.missingElements.length > 0) {
    improvementSuggestions.push(`Add missing sections: ${completeness.missingElements.join(', ')}`)
  }
  if (readability.weakVerbsFound.length > 0) {
    improvementSuggestions.push(`Replace weak phrases (${readability.weakVerbsFound.slice(0,3).join(', ')}) with strong action verbs`)
  }
  if (keyword.missing.length > 0) {
    improvementSuggestions.push(`Consider adding relevant keywords: ${keyword.missing.slice(0, 5).join(', ')}`)
  }
  formatting.issues.forEach(issue => improvementSuggestions.push(issue))
  readability.issues.forEach(issue => {
    if (!improvementSuggestions.includes(issue)) improvementSuggestions.push(issue)
  })

  return {
    overallScore,
    keywordScore: keyword.score,
    formattingScore: formatting.score,
    readabilityScore: readability.score,
    completenessScore: completeness.score,
    missingKeywords: keyword.missing,
    missingSkills: completeness.missingElements,
    weakActionVerbs: readability.weakVerbsFound,
    formattingSuggestions: formatting.issues,
    improvementSuggestions: [...new Set(improvementSuggestions)].slice(0, 8),
    jdMatch,
  }
}
