import ModernTemplate from './templates/ModernTemplate'
import ATSFriendlyTemplate from './templates/ATSFriendlyTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

/**
 * Template Registry — single source of truth for all resume templates.
 *
 * WHY A REGISTRY PATTERN:
 * Adding a new template requires touching exactly ONE file (this one)
 * plus creating the template component. No other code — not the gallery,
 * not the renderer, not the export flow — needs to change.
 *
 * Each entry: { id, name, description, component, thumbnail accent color }
 * `component` is the actual React component used for BOTH:
 *   - live preview in the browser (ResumeTemplateRenderer)
 *   - server-side PDF generation (same component, rendered to HTML string)
 * This guarantees the PDF always matches what the user saw in preview.
 */
export const TEMPLATE_REGISTRY = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean two-tone design with a bold header — great for tech and product roles.',
    component: ModernTemplate,
    accent: '#6366f1',
  },
  ats: {
    id: 'ats',
    name: 'ATS Friendly',
    description: 'Single-column, no graphics — maximum compatibility with applicant tracking systems.',
    component: ATSFriendlyTemplate,
    accent: '#0f172a',
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Serif typography and generous spacing for senior and leadership roles.',
    component: ExecutiveTemplate,
    accent: '#78350f',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean with maximum whitespace — lets your content speak for itself.',
    component: MinimalTemplate,
    accent: '#475569',
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Sidebar layout with color accents — for design and creative roles.',
    component: CreativeTemplate,
    accent: '#db2777',
  },
}

export const TEMPLATE_LIST = Object.values(TEMPLATE_REGISTRY)

export const DEFAULT_TEMPLATE_ID = 'modern'

export const getTemplate = (id) => TEMPLATE_REGISTRY[id] || TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_ID]
