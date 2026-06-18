/**
 * Server-side resume HTML templates.
 *
 * WHY DUPLICATE TEMPLATES HERE INSTEAD OF REUSING REACT COMPONENTS:
 * Puppeteer needs a real HTML page to render and print to PDF. The
 * cleanest, most dependency-light way to produce that HTML on a Node
 * server is to generate it directly as template-literal strings with
 * inline CSS — no React server-rendering, no JSX compilation step,
 * no bundler needed in the export pipeline.
 *
 * Each function mirrors the visual design of its client-side React
 * counterpart in src/features/templates/templates/*.jsx so the PDF
 * matches what the user saw in the live preview. If the client
 * template changes, this file should be updated to match.
 *
 * Each function takes the same `resumeData` shape and returns a full
 * <html> document string ready to hand to Puppeteer's page.setContent().
 */

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const formatList = (str = '') =>
  str.split(',').map((s) => s.trim()).filter(Boolean)

const bulletLines = (description = '') =>
  description
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^[-•*]\s*/, ''))

const pageShell = (bodyHtml) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; margin: 0; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`

// ── Modern Professional ───────────────────────────────────────────────────────
export const renderModernHtml = (data) => {
  const { personal = {}, summary, education = [], experience = [], skills, hobbies } = data
  const skillList = formatList(skills)
  const hobbyList = formatList(hobbies)

  const expHtml = experience.map(exp => `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <h3 style="font-size:14px;font-weight:700;color:#3730a3;">${escapeHtml(exp.position)}</h3>
        <span style="font-size:11px;color:#64748b;white-space:nowrap;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</span>
      </div>
      <p style="font-size:11px;font-style:italic;color:#475569;margin-bottom:4px;">${escapeHtml(exp.company)}</p>
      ${bulletLines(exp.description).map(l => `<p style="font-size:13px;color:#334155;padding-left:14px;">- ${escapeHtml(l)}</p>`).join('')}
    </div>`).join('')

  const eduHtml = education.map(edu => `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;">
        <h3 style="font-size:13px;font-weight:600;color:#0f172a;">${escapeHtml(edu.degree)}</h3>
        <span style="font-size:11px;color:#64748b;">${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)}</span>
      </div>
      <p style="font-size:11px;font-style:italic;color:#475569;">${escapeHtml(edu.institution)}</p>
    </div>`).join('')

  const pillHtml = (list) => list.map(s =>
    `<span style="display:inline-block;padding:4px 12px;background:#f0fdfa;color:#312e81;border:1px solid #99f6e4;border-radius:999px;font-size:11px;font-weight:600;margin:0 6px 6px 0;">${escapeHtml(s)}</span>`
  ).join('')

  const body = `
    <div style="font-family:Arial,sans-serif;padding:32px;width:100%;min-height:900px;background:#fff;">
      <header style="border-bottom:4px solid #312e81;padding-bottom:12px;margin-bottom:16px;">
        <h1 style="font-size:26px;font-weight:900;color:#312e81;text-transform:uppercase;letter-spacing:1.5px;">${escapeHtml(personal.name) || 'Your Name'}</h1>
        <p style="font-size:14px;color:#0d9488;margin-top:2px;margin-bottom:8px;">${escapeHtml(personal.title) || 'Professional Title'}</p>
        <p style="font-size:11px;color:#475569;">${[personal.email, personal.phone, personal.linkedin].filter(Boolean).map(escapeHtml).join('   |   ')}</p>
      </header>
      ${summary ? `<p style="font-size:13px;color:#334155;font-style:italic;border-left:4px solid #5eead4;padding-left:12px;margin-bottom:16px;">${escapeHtml(summary)}</p>` : ''}
      ${experience.length ? `<h2 style="font-size:12px;font-weight:800;color:#312e81;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #14b8a6;padding-bottom:4px;margin:20px 0 12px;">Professional Experience</h2>${expHtml}` : ''}
      ${education.length ? `<h2 style="font-size:12px;font-weight:800;color:#312e81;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #14b8a6;padding-bottom:4px;margin:20px 0 12px;">Education</h2>${eduHtml}` : ''}
      ${skillList.length ? `<h2 style="font-size:12px;font-weight:800;color:#312e81;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #14b8a6;padding-bottom:4px;margin:20px 0 12px;">Technical Skills</h2><div>${pillHtml(skillList)}</div>` : ''}
      ${hobbyList.length ? `<h2 style="font-size:12px;font-weight:800;color:#312e81;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #14b8a6;padding-bottom:4px;margin:20px 0 12px;">Interests</h2><div>${pillHtml(hobbyList)}</div>` : ''}
    </div>`

  return pageShell(body)
}

// ── ATS Friendly ───────────────────────────────────────────────────────────────
export const renderAtsHtml = (data) => {
  const { personal = {}, summary, education = [], experience = [], skills } = data
  const skillList = formatList(skills)

  const expHtml = experience.map(exp => `
    <div style="margin-bottom:12px;">
      <p style="font-size:13px;font-weight:700;">${escapeHtml(exp.position)} - ${escapeHtml(exp.company)}</p>
      <p style="font-size:11px;color:#64748b;margin-bottom:4px;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</p>
      ${bulletLines(exp.description).map(l => `<p style="font-size:13px;padding-left:14px;">- ${escapeHtml(l)}</p>`).join('')}
    </div>`).join('')

  const eduHtml = education.map(edu => `
    <div style="margin-bottom:8px;">
      <p style="font-size:13px;font-weight:700;">${escapeHtml(edu.degree)} - ${escapeHtml(edu.institution)}</p>
      <p style="font-size:11px;color:#64748b;">${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)}</p>
    </div>`).join('')

  const body = `
    <div style="font-family:Arial,sans-serif;padding:40px;width:100%;min-height:900px;background:#fff;color:#0f172a;">
      <header style="margin-bottom:20px;">
        <h1 style="font-size:22px;font-weight:700;">${escapeHtml(personal.name) || 'Your Name'}</h1>
        <p style="font-size:14px;color:#334155;">${escapeHtml(personal.title) || 'Professional Title'}</p>
        <p style="font-size:12px;color:#475569;margin-top:4px;">${[personal.email, personal.phone, personal.linkedin].filter(Boolean).map(escapeHtml).join('  |  ')}</p>
      </header>
      ${summary ? `<section style="margin-bottom:20px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:8px;">Summary</h2><p style="font-size:13px;line-height:1.6;">${escapeHtml(summary)}</p></section>` : ''}
      ${experience.length ? `<section style="margin-bottom:20px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:8px;">Experience</h2>${expHtml}</section>` : ''}
      ${education.length ? `<section style="margin-bottom:20px;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:8px;">Education</h2>${eduHtml}</section>` : ''}
      ${skillList.length ? `<section><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;border-bottom:1px solid #cbd5e1;padding-bottom:4px;margin-bottom:8px;">Skills</h2><p style="font-size:13px;">${skillList.map(escapeHtml).join(', ')}</p></section>` : ''}
    </div>`

  return pageShell(body)
}

// ── Executive ────────────────────────────────────────────────────────────────
export const renderExecutiveHtml = (data) => {
  const { personal = {}, summary, education = [], experience = [], skills } = data
  const skillList = formatList(skills)

  const expHtml = experience.map(exp => `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <h3 style="font-size:15px;font-weight:700;">${escapeHtml(exp.position)}</h3>
        <span style="font-size:11px;color:#64748b;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</span>
      </div>
      <p style="font-size:13px;font-style:italic;color:#475569;margin-bottom:4px;">${escapeHtml(exp.company)}</p>
      ${bulletLines(exp.description).map(l => `<p style="font-size:13px;color:#334155;padding-left:12px;">- ${escapeHtml(l)}</p>`).join('')}
    </div>`).join('')

  const eduHtml = education.map(edu => `
    <div style="margin-bottom:8px;text-align:center;">
      <p style="font-size:13px;font-weight:700;">${escapeHtml(edu.degree)}</p>
      <p style="font-size:11px;color:#64748b;">${escapeHtml(edu.institution)} . ${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)}</p>
    </div>`).join('')

  const body = `
    <div style="font-family:Georgia,serif;padding:40px;width:100%;min-height:900px;background:#fff;color:#0f172a;">
      <header style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #78350f;">
        <h1 style="font-size:28px;font-weight:700;letter-spacing:0.5px;">${escapeHtml(personal.name) || 'Your Name'}</h1>
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#78350f;margin-top:4px;">${escapeHtml(personal.title) || 'Professional Title'}</p>
        <p style="font-size:11px;color:#64748b;margin-top:8px;">${[personal.email, personal.phone, personal.linkedin].filter(Boolean).map(escapeHtml).join('   .   ')}</p>
      </header>
      ${summary ? `<p style="font-size:13px;color:#334155;font-style:italic;text-align:center;max-width:540px;margin:0 auto 24px;line-height:1.6;">${escapeHtml(summary)}</p>` : ''}
      ${experience.length ? `<h2 style="text-align:center;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#78350f;margin-bottom:16px;">Experience</h2>${expHtml}` : ''}
      ${education.length ? `<h2 style="text-align:center;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#78350f;margin:24px 0 16px;">Education</h2>${eduHtml}` : ''}
      ${skillList.length ? `<h2 style="text-align:center;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#78350f;margin:24px 0 12px;">Core Competencies</h2><p style="text-align:center;font-size:13px;color:#334155;">${skillList.map(escapeHtml).join('  .  ')}</p>` : ''}
    </div>`

  return pageShell(body)
}

// ── Minimal ──────────────────────────────────────────────────────────────────
export const renderMinimalHtml = (data) => {
  const { personal = {}, summary, education = [], experience = [], skills } = data
  const skillList = formatList(skills)

  const expHtml = experience.map(exp => `
    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;">
        <p style="font-size:13px;font-weight:500;color:#0f172a;">${escapeHtml(exp.position)}</p>
        <p style="font-size:11px;color:#94a3b8;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</p>
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-bottom:6px;">${escapeHtml(exp.company)}</p>
      ${bulletLines(exp.description).map(l => `<p style="font-size:13px;color:#475569;line-height:1.6;">${escapeHtml(l)}</p>`).join('')}
    </div>`).join('')

  const eduHtml = education.map(edu => `
    <div style="margin-bottom:10px;display:flex;justify-content:space-between;">
      <div>
        <p style="font-size:13px;font-weight:500;color:#0f172a;">${escapeHtml(edu.degree)}</p>
        <p style="font-size:11px;color:#94a3b8;">${escapeHtml(edu.institution)}</p>
      </div>
      <p style="font-size:11px;color:#94a3b8;">${escapeHtml(edu.startDate)} - ${escapeHtml(edu.endDate)}</p>
    </div>`).join('')

  const body = `
    <div style="font-family:Arial,sans-serif;padding:48px;width:100%;min-height:900px;background:#fff;color:#334155;">
      <header style="margin-bottom:40px;">
        <h1 style="font-size:24px;font-weight:300;letter-spacing:-0.5px;color:#0f172a;">${escapeHtml(personal.name) || 'Your Name'}</h1>
        <p style="font-size:13px;color:#94a3b8;margin-top:4px;">${escapeHtml(personal.title) || 'Professional Title'}</p>
        <p style="font-size:11px;color:#94a3b8;margin-top:12px;">${[personal.email, personal.phone, personal.linkedin].filter(Boolean).map(escapeHtml).join('   ')}</p>
      </header>
      ${summary ? `<p style="font-size:13px;line-height:1.8;color:#475569;margin-bottom:32px;">${escapeHtml(summary)}</p>` : ''}
      ${experience.length ? `<p style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:3px;color:#94a3b8;margin-bottom:16px;">Experience</p>${expHtml}` : ''}
      ${education.length ? `<p style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:3px;color:#94a3b8;margin-bottom:16px;">Education</p>${eduHtml}` : ''}
      ${skillList.length ? `<p style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:3px;color:#94a3b8;margin-bottom:12px;">Skills</p><p style="font-size:13px;color:#475569;">${skillList.map(escapeHtml).join(' . ')}</p>` : ''}
    </div>`

  return pageShell(body)
}

// ── Creative ─────────────────────────────────────────────────────────────────
export const renderCreativeHtml = (data) => {
  const { personal = {}, summary, education = [], experience = [], skills, hobbies } = data
  const skillList = formatList(skills)
  const hobbyList = formatList(hobbies)

  const sidebarSkills = skillList.map(s =>
    `<span style="display:inline-block;font-size:10px;background:rgba(255,255,255,0.25);border-radius:999px;padding:3px 10px;margin:0 4px 4px 0;">${escapeHtml(s)}</span>`
  ).join('')

  const sidebarEdu = education.map(edu => `
    <div style="margin-bottom:8px;">
      <p style="font-size:11px;font-weight:600;">${escapeHtml(edu.degree)}</p>
      <p style="font-size:10px;color:#fecdd3;">${escapeHtml(edu.institution)}</p>
    </div>`).join('')

  const expHtml = experience.map(exp => `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;">
        <h3 style="font-size:13px;font-weight:700;color:#0f172a;">${escapeHtml(exp.position)}</h3>
        <span style="font-size:11px;color:#94a3b8;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</span>
      </div>
      <p style="font-size:11px;font-style:italic;color:#64748b;margin-bottom:4px;">${escapeHtml(exp.company)}</p>
      ${bulletLines(exp.description).map(l => `<p style="font-size:13px;color:#475569;padding-left:12px;">&#9656; ${escapeHtml(l)}</p>`).join('')}
    </div>`).join('')

  const body = `
    <div style="display:flex;width:100%;min-height:900px;background:#fff;font-family:Arial,sans-serif;">
      <aside style="width:34%;background:#e11d48;color:#fff;padding:24px;">
        <h1 style="font-size:19px;font-weight:700;line-height:1.2;">${escapeHtml(personal.name) || 'Your Name'}</h1>
        <p style="font-size:13px;color:#fecdd3;margin-top:4px;margin-bottom:20px;">${escapeHtml(personal.title) || 'Professional Title'}</p>
        <div style="margin-bottom:20px;">
          ${personal.email ? `<p style="font-size:11px;margin-bottom:6px;">${escapeHtml(personal.email)}</p>` : ''}
          ${personal.phone ? `<p style="font-size:11px;margin-bottom:6px;">${escapeHtml(personal.phone)}</p>` : ''}
          ${personal.linkedin ? `<p style="font-size:11px;margin-bottom:6px;">${escapeHtml(personal.linkedin)}</p>` : ''}
        </div>
        ${skillList.length ? `<p style="font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:8px;color:#fecdd3;">Skills</p><div style="margin-bottom:20px;">${sidebarSkills}</div>` : ''}
        ${hobbyList.length ? `<p style="font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:8px;color:#fecdd3;">Interests</p><p style="font-size:11px;color:#fecdd3;margin-bottom:20px;">${hobbyList.map(escapeHtml).join(', ')}</p>` : ''}
        ${education.length ? `<p style="font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:8px;color:#fecdd3;">Education</p>${sidebarEdu}` : ''}
      </aside>
      <main style="flex:1;padding:24px;">
        ${summary ? `<p style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:20px;">${escapeHtml(summary)}</p>` : ''}
        ${experience.length ? `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;color:#e11d48;border-bottom:2px solid #fecdd3;padding-bottom:4px;margin-bottom:12px;">Experience</h2>${expHtml}` : ''}
      </main>
    </div>`

  return pageShell(body)
}

// ── Registry — server-side mirror of client templateRegistry ─────────────────
export const SERVER_TEMPLATE_RENDERERS = {
  modern: renderModernHtml,
  ats: renderAtsHtml,
  executive: renderExecutiveHtml,
  minimal: renderMinimalHtml,
  creative: renderCreativeHtml,
}

export const renderResumeHtml = (templateId, resumeData) => {
  const renderer = SERVER_TEMPLATE_RENDERERS[templateId] || SERVER_TEMPLATE_RENDERERS.modern
  return renderer(resumeData)
}
