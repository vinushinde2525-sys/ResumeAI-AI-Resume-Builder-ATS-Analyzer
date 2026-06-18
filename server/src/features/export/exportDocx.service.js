import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'

/**
 * DOCX Export Service.
 *
 * WHY A SEPARATE LIBRARY FROM PDF EXPORT:
 * Word documents are a structured XML format (OOXML) — Puppeteer can't
 * produce them (it only rasterizes/prints HTML to PDF). The `docx` npm
 * package builds the actual OOXML document tree programmatically, which
 * is the correct tool for this format, the same way `pdf-lib` would be
 * the right tool if we needed to manually position PDF text runs.
 *
 * The output is simpler/plainer than the PDF templates (single shared
 * layout, not 5 themed templates) because DOCX is typically downloaded
 * by users who want to make manual edits in Word — visual flourish
 * matters less here than clean, editable structure.
 */
export const generateResumeDocx = async (resumeData) => {
  const { personal = {}, summary, experience = [], education = [], skills, hobbies } = resumeData

  const children = []

  // Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: personal.name || 'Your Name', bold: true, size: 32 })],
    }),
    new Paragraph({
      children: [new TextRun({ text: personal.title || '', size: 24, color: '475569' })],
    }),
    new Paragraph({
      children: [new TextRun({
        text: [personal.email, personal.phone, personal.linkedin].filter(Boolean).join('  |  '),
        size: 20, color: '64748b',
      })],
      spacing: { after: 300 },
    })
  )

  // Summary
  if (summary) {
    children.push(
      new Paragraph({ text: 'Summary', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: summary, size: 22 })], spacing: { after: 200 } })
    )
  }

  // Experience
  if (experience.length) {
    children.push(new Paragraph({ text: 'Experience', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }))
    for (const exp of experience) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.position || ''} — ${exp.company || ''}`, bold: true, size: 22 }),
          ],
        }),
        new Paragraph({
          children: [new TextRun({ text: `${exp.startDate || ''} - ${exp.endDate || ''}`, italics: true, size: 18, color: '64748b' })],
          spacing: { after: 80 },
        })
      )
      const lines = (exp.description || '').split('\n').map(l => l.trim()).filter(Boolean)
      for (const line of lines) {
        children.push(new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: line.replace(/^[-•*]\s*/, ''), size: 20 })],
        }))
      }
      children.push(new Paragraph({ text: '', spacing: { after: 150 } }))
    }
  }

  // Education
  if (education.length) {
    children.push(new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }))
    for (const edu of education) {
      children.push(
        new Paragraph({ children: [new TextRun({ text: `${edu.degree || ''} — ${edu.institution || ''}`, bold: true, size: 22 })] }),
        new Paragraph({
          children: [new TextRun({ text: `${edu.startDate || ''} - ${edu.endDate || ''}`, italics: true, size: 18, color: '64748b' })],
          spacing: { after: 150 },
        })
      )
    }
  }

  // Skills
  if (skills) {
    children.push(
      new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: skills, size: 20 })] })
    )
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  })

  return Packer.toBuffer(doc)
}
