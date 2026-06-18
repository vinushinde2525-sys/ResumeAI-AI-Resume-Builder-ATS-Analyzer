import puppeteer from 'puppeteer'
import { renderResumeHtml } from './export.templates.js'

/**
 * Export Service — generates a PDF buffer from resume data + template.
 *
 * WHY PUPPETEER (not pdf-lib):
 * Puppeteer renders real HTML/CSS through a headless Chrome instance,
 * so the PDF is a faithful screenshot-to-PDF of the same markup our
 * templates describe — flexbox layouts, web fonts, automatic text
 * wrapping, and CSS @page rules all "just work" because it's a real
 * browser engine doing the layout, not manual coordinate placement.
 *
 * pdf-lib is a lower-level library: you position every text run with
 * explicit x/y coordinates and manually calculate line wrapping and
 * page breaks yourself. That's appropriate for filling existing PDF
 * forms or precise programmatic documents, but it would mean writing
 * a full layout engine by hand for something CSS already solves.
 *
 * TRADE-OFF: Puppeteer needs a real Chromium binary (~300MB) and a
 * browser process per request, which is heavier than pdf-lib's pure-JS
 * approach. For a resume builder's volume (one PDF per user action,
 * not bulk-generation), this is an acceptable and standard trade-off —
 * it's why most resume/invoice SaaS tools (and headless-CMS print tools)
 * use a Puppeteer/Chromium-based renderer in production.
 */

let browserInstance = null

// Reuse a single browser instance across requests instead of launching
// a fresh one every time — launching Chromium is the slowest part of
// the whole pipeline (hundreds of ms), so we pay that cost once.
const getBrowser = async () => {
  if (browserInstance && browserInstance.connected) return browserInstance

  browserInstance = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  return browserInstance
}

export const generateResumePdf = async (resumeData, templateId) => {
  const html = renderResumeHtml(templateId, resumeData)

  const browser = await getBrowser()
  const page = await browser.newPage()

  try {
    await page.setContent(html, { waitUntil: 'networkidle0' })

    // A4 with zero margin — our templates already include their own padding.
    // printBackground is required or all our background colors (sidebar,
    // accent bars, pill backgrounds) would render as blank white.
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    })

    return pdfBuffer
  } finally {
    // Always close the page (not the browser) to free memory per-request
    await page.close()
  }
}

// Graceful shutdown — called from server.js on process exit
export const closeBrowser = async () => {
  if (browserInstance) {
    await browserInstance.close()
    browserInstance = null
  }
}
