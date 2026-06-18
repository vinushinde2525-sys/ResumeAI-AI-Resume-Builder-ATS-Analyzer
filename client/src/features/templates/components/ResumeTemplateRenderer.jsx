import { getTemplate } from '../templateRegistry'

/**
 * ResumeTemplateRenderer — looks up a template by id and renders it.
 * This is the ONLY place that needs to know about the registry lookup —
 * every consumer (editor preview, gallery preview modal) just passes
 * templateId + data and gets the right component back.
 */
const ResumeTemplateRenderer = ({ templateId, data, refProp }) => {
  const template = getTemplate(templateId)
  const TemplateComponent = template.component
  return <TemplateComponent ref={refProp} data={data} />
}

export default ResumeTemplateRenderer
