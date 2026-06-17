import { motion } from 'framer-motion'

/**
 * PageWrapper — wraps every page with a subtle fade+slide-up entrance.
 * Kept intentionally subtle — we want pages to feel snappy, not theatrical.
 */
const PageWrapper = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
)

export default PageWrapper
