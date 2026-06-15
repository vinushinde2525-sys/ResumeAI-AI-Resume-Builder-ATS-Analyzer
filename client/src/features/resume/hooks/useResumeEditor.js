import { useState, useCallback } from 'react'
import { generateId } from '../../../lib/utils'

/**
 * useResumeEditor — custom hook that owns all resume editor state and handlers.
 *
 * WHY A HOOK:
 * - v1 had all these handlers inline in a massive component
 * - Extracting to a hook = separation of concerns
 * - Easy to test independently
 * - Easy to explain in interviews: "I extracted business logic from UI"
 *
 * The state shape is preserved exactly from v1 so the editor still works.
 */

export const DEFAULT_RESUME_DATA = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    linkedin: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: '',
  hobbies: '',
}

const NEW_EXPERIENCE = () => ({
  id: generateId(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
})

const NEW_EDUCATION = () => ({
  id: generateId(),
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
  description: '',
})

const useResumeEditor = (initialData = DEFAULT_RESUME_DATA) => {
  const [resumeData, setResumeData] = useState(initialData)

  // Update a single field in personal info
  const handlePersonalChange = useCallback((e) => {
    const { name, value } = e.target
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }))
  }, [])

  // Update summary string
  const handleSummaryChange = useCallback((value) => {
    setResumeData((prev) => ({ ...prev, summary: value }))
  }, [])

  // Update skills string
  const handleSkillsChange = useCallback((value) => {
    setResumeData((prev) => ({ ...prev, skills: value }))
  }, [])

  // Update hobbies string
  const handleHobbiesChange = useCallback((value) => {
    setResumeData((prev) => ({ ...prev, hobbies: value }))
  }, [])

  // Generic: update a field in an array item (experience or education)
  const handleItemChange = useCallback((section, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }, [])

  // Add experience entry
  const handleAddExperience = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, NEW_EXPERIENCE()],
    }))
  }, [])

  // Remove experience entry
  const handleRemoveExperience = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }, [])

  // Add education entry
  const handleAddEducation = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, NEW_EDUCATION()],
    }))
  }, [])

  // Remove education entry
  const handleRemoveEducation = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }, [])

  // Replace entire resume data (used when loading from API)
  const loadResumeData = useCallback((data) => {
    setResumeData(data)
  }, [])

  return {
    resumeData,
    setResumeData,
    loadResumeData,
    handlePersonalChange,
    handleSummaryChange,
    handleSkillsChange,
    handleHobbiesChange,
    handleItemChange,
    handleAddExperience,
    handleRemoveExperience,
    handleAddEducation,
    handleRemoveEducation,
  }
}

export default useResumeEditor
