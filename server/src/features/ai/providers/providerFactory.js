import { openaiProvider } from './openai.provider.js'
import { claudeProvider } from './claude.provider.js'
import { geminiProvider } from './gemini.provider.js'
import { env } from '../../../config/env.js'

/**
 * Provider Factory — Adapter Pattern
 *
 * WHY THIS PATTERN:
 * Different AI providers have different APIs, auth methods, and request shapes.
 * The factory normalises them all to a single interface: { call(system, user, opts) }
 *
 * Adding a new provider (e.g. Mistral, Groq) requires:
 * 1. Create providers/mistral.provider.js implementing { call, name }
 * 2. Add it to the PROVIDERS map below
 * 3. Done. Zero changes to service or controller.
 *
 * AI_PROVIDER env var controls which is active.
 * Default: openai
 *
 * INTERVIEW TALKING POINT:
 * "This is the Adapter pattern — each provider adapts its own API to a
 * common interface. The factory selects the adapter at runtime based on config."
 */

const PROVIDERS = {
  openai: openaiProvider,
  claude: claudeProvider,
  gemini: geminiProvider,
}

export const getProvider = () => {
  const name = env.AI_PROVIDER?.toLowerCase() || 'openai'
  const provider = PROVIDERS[name]

  if (!provider) {
    const available = Object.keys(PROVIDERS).join(', ')
    throw new Error(
      `Unknown AI provider: "${name}". Available providers: ${available}. ` +
      `Set AI_PROVIDER in .env to one of these values.`
    )
  }

  return provider
}

// Export provider name for logging/debugging
export const getProviderName = () => env.AI_PROVIDER?.toLowerCase() || 'openai'
