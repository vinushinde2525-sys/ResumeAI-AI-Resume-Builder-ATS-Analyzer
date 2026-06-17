import { env } from '../../../config/env.js'

/**
 * Google Gemini Provider
 *
 * Uses gemini-1.5-flash — fast and generous free tier.
 * Gemini API structure differs: system instruction is separate,
 * content is wrapped in { parts: [{ text }] }.
 *
 * API key is passed as a URL query parameter (Google's pattern).
 */

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const MODEL = 'gemini-1.5-flash'

const call = async (systemPrompt, userMessage, options = {}) => {
  if (!env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Set GEMINI_API_KEY in .env')
  }

  const model = options.model || MODEL
  const url = `${GEMINI_URL}/${model}:generateContent?key=${env.GEMINI_API_KEY}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature:     options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens   ?? 500,
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const msg = err?.error?.message || `Gemini error: ${response.status}`
    const error = new Error(msg)
    error.status = response.status === 429 ? 429 : 502
    throw error
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''
}

export const geminiProvider = { call, name: 'gemini' }
