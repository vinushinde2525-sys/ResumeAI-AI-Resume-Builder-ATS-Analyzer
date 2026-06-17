import { env } from '../../../config/env.js'

/**
 * OpenAI Provider
 *
 * Uses fetch directly (no SDK) to keep dependencies minimal.
 * Model: gpt-4o-mini — fast, cheap, good quality for resume tasks.
 *
 * WHY NO OPENAI SDK:
 * The SDK adds ~2MB. Since we're building a provider abstraction,
 * a raw fetch call is simpler, more portable, and easier to explain
 * in interviews. The API is just HTTP + JSON.
 */

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

const call = async (systemPrompt, userMessage, options = {}) => {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY in .env')
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens:  options.maxTokens  ?? 500,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const msg = err?.error?.message || `OpenAI error: ${response.status}`
    const error = new Error(msg)
    error.status = response.status === 429 ? 429 : 502
    throw error
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || ''
}

export const openaiProvider = { call, name: 'openai' }
