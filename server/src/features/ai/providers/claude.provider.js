import { env } from '../../../config/env.js'

/**
 * Anthropic Claude Provider
 *
 * Uses claude-3-haiku-20240307 — fastest + cheapest Claude model.
 * Good for high-volume resume tasks.
 *
 * Anthropic Messages API differs from OpenAI:
 * - system prompt is a top-level field, not a message
 * - model string format differs
 * - header is x-api-key, not Authorization Bearer
 */

const CLAUDE_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5'

const call = async (systemPrompt, userMessage, options = {}) => {
  if (!env.CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured. Set CLAUDE_API_KEY in .env')
  }

  const response = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      options.model || MODEL,
      max_tokens: options.maxTokens ?? 500,
      system:     systemPrompt,
      messages: [
        { role: 'user', content: userMessage },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const msg = err?.error?.message || `Claude error: ${response.status}`
    const error = new Error(msg)
    error.status = response.status === 429 ? 429 : 502
    throw error
  }

  const data = await response.json()
  return data.content?.[0]?.text?.trim() || ''
}

export const claudeProvider = { call, name: 'claude' }
