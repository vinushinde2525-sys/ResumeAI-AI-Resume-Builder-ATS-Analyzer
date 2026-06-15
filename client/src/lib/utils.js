/**
 * Utility functions shared across the app
 */

// Generate a short random ID (same as v1 pattern — preserved)
export const generateId = () => Math.random().toString(36).substring(2, 9)

// Format a comma-separated string into a trimmed array
export const formatList = (text) =>
  text.split(',').map((s) => s.trim()).filter((s) => s.length > 0)

// Truncate long strings for display
export const truncate = (str, length = 60) =>
  str.length > length ? str.substring(0, length) + '...' : str

// Format date to readable string
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Extract error message from axios error
export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  )
}

// Build classnames conditionally (lightweight clsx alternative)
export const cn = (...classes) => classes.filter(Boolean).join(' ')
