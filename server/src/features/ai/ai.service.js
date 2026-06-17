import { getProvider, getProviderName } from './providers/providerFactory.js'
import { PROMPTS } from './ai.prompts.js'

/**
 * AI Service — orchestrates AI features.
 *
 * Flow:
 *   Controller → service function → getProvider() → provider.call(system, user, opts)
 *
 * The service owns:
 * - Which prompt to use for each feature
 * - Any post-processing (e.g. JSON parsing for structured responses)
 * - Error enrichment with context
 *
 * The service does NOT know which provider is active — that's the factory's job.
 * This means we can swap providers without touching this file.
 */

const provider = () => getProvider() // lazy — re-evaluated per request so env changes work

// ── Improve Summary ──────────────────────────────────────────────────────────
export const improveSummary = async ({ currentSummary, jobTitle }) => {
  const { system, user } = PROMPTS.improveSummary
  const result = await provider().call(system, user(currentSummary, jobTitle), {
    temperature: 0.7,
    maxTokens: 300,
  })
  return { result, provider: getProviderName() }
}

// ── Rewrite Bullet ───────────────────────────────────────────────────────────
export const rewriteBullet = async ({ bullet, role }) => {
  const { system, user } = PROMPTS.rewriteBullet
  const result = await provider().call(system, user(bullet, role), {
    temperature: 0.6,
    maxTokens: 150,
  })
  return { result, provider: getProviderName() }
}

// ── Suggest Skills ───────────────────────────────────────────────────────────
export const suggestSkills = async ({ jobTitle, existingSkills }) => {
  const { system, user } = PROMPTS.suggestSkills
  const raw = await provider().call(system, user(jobTitle, existingSkills), {
    temperature: 0.5, // lower = more consistent JSON
    maxTokens: 400,
  })

  // Parse JSON response — handle markdown code fences if present
  let parsed
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    parsed = JSON.parse(cleaned)
  } catch {
    // If parsing fails, return raw text split into array
    const items = raw.split(/[\n,]/).map(s => s.trim()).filter(Boolean)
    parsed = { technical: items, soft: [] }
  }

  return { result: parsed, provider: getProviderName() }
}

// ── Generate Project Description ─────────────────────────────────────────────
export const generateProjectDesc = async ({ projectTitle, technologies, description }) => {
  const { system, user } = PROMPTS.generateProjectDesc
  const result = await provider().call(
    system,
    user(projectTitle, technologies, description),
    { temperature: 0.7, maxTokens: 300 }
  )
  return { result, provider: getProviderName() }
}

// ── Resume Feedback ───────────────────────────────────────────────────────────
export const getResumeFeedback = async ({ resumeData }) => {
  const { system, user } = PROMPTS.resumeFeedback
  const raw = await provider().call(system, user(resumeData), {
    temperature: 0.3, // low = more consistent structured output
    maxTokens: 800,
  })

  let parsed
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    parsed = JSON.parse(cleaned)
  } catch {
    // Fallback: return raw text as top recommendation
    parsed = {
      overallScore: null,
      strengths: [],
      improvements: [],
      missingElements: [],
      topRecommendation: raw,
    }
  }

  return { result: parsed, provider: getProviderName() }
}
