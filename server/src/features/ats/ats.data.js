/**
 * ATS Scoring Data — dictionaries used by the rule-based scoring engine.
 *
 * WHY HARDCODED LISTS (not AI-generated):
 * ATS scoring needs to be deterministic and explainable. A recruiter
 * or interviewer should be able to ask "why did I get 65 on keywords"
 * and get a concrete, reproducible answer — not "the AI decided".
 */

// Common technical keywords across software roles — used for general keyword scoring
export const TECH_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby',
  'react', 'vue', 'angular', 'next.js', 'node.js', 'express', 'django', 'flask', 'spring',
  'mongodb', 'postgresql', 'mysql', 'redis', 'sql', 'nosql', 'graphql', 'rest api', 'grpc',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'jenkins', 'github actions',
  'git', 'linux', 'agile', 'scrum', 'microservices', 'tdd', 'unit testing', 'jest', 'cypress',
  'html', 'css', 'tailwind', 'sass', 'webpack', 'vite', 'figma', 'jira', 'confluence',
  'machine learning', 'ai', 'data structures', 'algorithms', 'oop', 'design patterns',
]

// Verbs considered weak/passive — recruiters and ATS systems penalize these
export const WEAK_VERBS = [
  'helped', 'worked on', 'responsible for', 'involved in', 'assisted',
  'participated', 'tasked with', 'duties included', 'in charge of',
  'familiar with', 'exposed to', 'handled', 'did',
]

// Strong action verbs — presence of these boosts readability score
export const STRONG_VERBS = [
  'built', 'designed', 'developed', 'architected', 'implemented', 'led', 'launched',
  'optimized', 'reduced', 'increased', 'improved', 'automated', 'scaled', 'migrated',
  'deployed', 'engineered', 'spearheaded', 'delivered', 'achieved', 'streamlined',
  'created', 'established', 'drove', 'accelerated', 'pioneered', 'transformed',
  'mentored', 'collaborated', 'orchestrated', 'refactored', 'integrated',
]

// Soft/general skills commonly expected on resumes
export const SOFT_SKILLS = [
  'communication', 'leadership', 'teamwork', 'problem solving', 'collaboration',
  'time management', 'adaptability', 'critical thinking', 'attention to detail',
]
