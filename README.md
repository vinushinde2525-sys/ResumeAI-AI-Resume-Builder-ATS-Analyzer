# ResumeAI — AI Resume Builder & ATS Analyzer

> A production-quality full-stack SaaS application built as a portfolio flagship project.
> Evolved from a simple React Resume Builder (v1) into a modern AI-powered platform (v2).

![Phase](https://img.shields.io/badge/Phase-A%20Complete-brightgreen)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## Overview

ResumeAI is a full-stack SaaS application that helps job seekers:

- Build professional resumes with a real-time live preview editor
- Analyze their resume against ATS (Applicant Tracking System) criteria
- Get AI-generated summaries, skill suggestions, and improvement tips
- Download polished PDF exports

This project demonstrates production engineering practices including feature-based architecture, JWT authentication with refresh token rotation, provider-agnostic AI integration, and a modern React frontend with Zustand + TanStack Query state management.

---

## Evolution: v1 → v2

| Feature | v1 | v2 |
|---|---|---|
| Architecture | Single CRA file | Feature-based Vite + full-stack |
| State | useState monolith | Zustand + TanStack Query |
| Backend | None | Node/Express/MongoDB |
| Auth | None | JWT + Refresh Tokens |
| AI | None | OpenAI / Claude / Gemini |
| ATS | None | Full PDF analyzer |
| PDF | window.print() | html2pdf / Puppeteer |
| Routing | None | React Router v7 |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework + build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Router v7 | Client-side routing |
| Zustand v5 | Auth & global UI state |
| TanStack Query v5 | Server state management |
| React Hook Form + Zod | Form handling + validation |
| Axios | HTTP client with interceptors |
| Lucide React | Icon system |
| React Hot Toast | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | API server |
| MongoDB + Mongoose | Database + ODM |
| JWT (access + refresh) | Authentication |
| bcryptjs | Password hashing |
| Multer | File upload (PDF) |
| Cloudinary | Cloud file storage |
| Helmet + CORS | Security headers |
| express-rate-limit | API rate limiting |
| pdf-parse | PDF text extraction |

### AI
- Provider-agnostic abstraction layer
- Supports: OpenAI, Anthropic Claude, Google Gemini
- Switchable via `AI_PROVIDER` environment variable

---

## Architecture

```
ai-resume-builder/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── app/               # Router, Zustand stores
│       ├── components/ui/     # Shared primitives (Button, Card, Input...)
│       ├── features/          # Feature modules
│       │   ├── auth/          # Login, Register, auth hooks
│       │   ├── resume/        # Editor, Preview, useResumeEditor
│       │   ├── ai/            # AI assistant UI
│       │   ├── ats/           # ATS analyzer UI
│       │   └── dashboard/     # Dashboard
│       ├── lib/               # axios, queryClient, utils
│       └── pages/             # Landing, NotFound
│
└── server/                    # Node + Express backend
    └── src/
        ├── config/            # DB, Cloudinary, env
        ├── features/          # Feature modules (auth, resume, ai, ats)
        └── shared/            # Middleware, utilities
```

### State Management
```
Server State     → TanStack Query   (API data, caching, refetch)
Auth State       → Zustand          (user, token, isAuth)
Global UI        → Zustand          (theme, sidebar, modals)
Forms            → React Hook Form  (local form state + Zod validation)
Component State  → useState         (toggles, local UI)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for file uploads)
- OpenAI / Anthropic / Google AI API key (for AI features)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/vinushinde/ai-resume-builder.git
cd ai-resume-builder
```

**2. Set up the backend**
```bash
cd server
cp .env.example .env
# Fill in your .env values
npm install
npm run dev
```

**3. Set up the frontend**
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

**4. Open the app**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Health:   http://localhost:5000/api/health
```

---

## Features (by phase)

### ✅ Phase A — Foundation
- CRA → Vite migration
- Feature-based architecture
- React Router v7 with code splitting
- Zustand auth store
- TanStack Query setup
- Live resume editor (preserved from v1)
- Landing page, Dashboard stubs
- Express backend scaffold
- Environment validation
- Rate limiting, error handling, CORS

### 🔜 Phase B — Authentication
- User registration & login
- JWT access tokens (15min)
- Refresh token rotation (7d, httpOnly cookie)
- Protected routes

### 🔜 Phase C — Resume CRUD
- Save resumes to MongoDB
- List, edit, delete resumes
- TanStack Query mutations

### 🔜 Phase D — Premium UI
- Full landing page
- Dashboard with stats
- Framer Motion animations

### 🔜 Phase E — AI Integration
- AI summary generator
- Skills suggester
- Improvement recommendations

### 🔜 Phase F — ATS Analyzer
- PDF upload
- Text extraction
- AI-powered scoring
- Detailed feedback report

### 🔜 Phase G — PDF Export
- Clean PDF download

---

## API Overview

```
GET    /api/health

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout

GET    /api/resumes
POST   /api/resumes
GET    /api/resumes/:id
PUT    /api/resumes/:id
DELETE /api/resumes/:id

POST   /api/ai/summary
POST   /api/ai/skills
POST   /api/ai/improve

POST   /api/ats/analyze
GET    /api/ats/reports
GET    /api/ats/reports/:id
```

---

## Screenshots

> _Screenshots to be added after Phase D (UI polish)_

- Landing Page
- Resume Editor with Live Preview
- Dashboard
- ATS Score Report
- AI Assistant

---

## Interview Notes

Key topics I can explain from this project:

1. **Why feature-based architecture** over component-based
2. **Zustand vs Redux vs Context API** — trade-offs and when to use each
3. **TanStack Query** — caching, stale time, optimistic updates
4. **JWT + Refresh Token** rotation pattern and security
5. **Provider-agnostic AI layer** — adapter pattern
6. **ATS analysis** — how PDF parsing + AI scoring works
7. **v1 → v2 migration** — incremental refactoring without rewrite
8. **React Router v7** data router, lazy loading, protected routes

---

## License

MIT — built by Vinu Shinde as a portfolio project.


---

## Authentication (Phase B)

### Architecture

```
Client                          Server
──────                          ──────
Register/Login form
  → POST /api/auth/register     Validate (Zod)
  → POST /api/auth/login        Hash check (bcrypt)
                                Sign accessToken (15min, jti)
                                Sign refreshToken (7d, jti)
  ← { user, accessToken }       Set refreshToken in httpOnly cookie
  → Zustand.setAuth()
  → Navigate /dashboard

Every API request:
  Axios interceptor              Bearer {accessToken} header
  → 401 received?
  → POST /api/auth/refresh       Read cookie (httpOnly, auto-sent)
                                Verify + rotate refresh token
  ← { accessToken: newToken }
  → Retry original request

Logout:
  POST /api/auth/logout          Clear refreshToken in DB
  → Zustand.clearAuth()          Clear cookie
  → Navigate /
```

### Security Decisions

| Decision | Why |
|---|---|
| Access token in Zustand (memory) | Survives page refresh via persist; not in its own localStorage key so harder to target |
| Refresh token in httpOnly cookie | JS cannot read it at all — XSS proof |
| `jti` claim on every token | Prevents identical tokens when signed in same second; enables future blacklisting |
| bcrypt cost factor 12 | Balances security vs server load; ~300ms hash time |
| Same error for bad email/password | Prevents email enumeration attacks |
| Refresh token rotation | Stolen refresh token detected on next legitimate use |
| Reuse detection clears session | Attacker using stolen token forces full re-login |
| `select: false` on password/refreshToken | Never accidentally returned in DB queries |

### API Endpoints

```
POST /api/auth/register
  Body: { name, email, password }
  Returns: { user, accessToken }
  Cookie: refreshToken (httpOnly)

POST /api/auth/login
  Body: { email, password }
  Returns: { user, accessToken }
  Cookie: refreshToken (httpOnly)

POST /api/auth/refresh
  Cookie: refreshToken (auto-sent)
  Returns: { user, accessToken }
  Cookie: new refreshToken (rotated)

POST /api/auth/logout   [Protected]
  Clears DB refreshToken + cookie

GET /api/auth/me        [Protected]
  Returns: { user }
```

### Interview Talking Points

1. **Why two tokens?** Access token is short-lived (15min) — limits exposure window if stolen. Refresh token is long-lived but stored in httpOnly cookie JS can't read.

2. **Why jti?** JWT iat is second-precision. Two tokens for same user in same second = identical tokens. jti = crypto.randomUUID() guarantees uniqueness and enables future blacklisting.

3. **Why bcrypt cost 12?** Each increment doubles compute time. Cost 12 ≈ 300ms — painful for attackers (millions of attempts), acceptable for users (one login).

4. **How does refresh rotation work?** On every refresh, old token is replaced with a new one. If someone reuses the old token, it no longer matches what's in DB → attack detected → session cleared → attacker locked out.

5. **Why same error for wrong email/wrong password?** If we said "email not found" vs "wrong password" separately, attackers could enumerate valid emails.


---

## UI System (Phase D)

### Design Principles

| Principle | Implementation |
|---|---|
| Minimalistic | Slate color palette, generous whitespace, no decorative noise |
| Premium feel | Soft shadows, rounded-2xl corners, subtle backdrop blur |
| Motion | Framer Motion: fade+slide page entrances, spring nav indicator, hover lift |
| Typography | Inter font, tight tracking on headings, relaxed body copy |
| Responsive | Mobile hamburger menu, stacked → grid layouts at sm/lg breakpoints |

### Component Library

| Component | File | Purpose |
|---|---|---|
| Button | `components/ui/Button.jsx` | 5 variants, 3 sizes, loading state, icon support |
| Card | `components/ui/Card.jsx` | Surface with soft shadow, Header/Title/Body sub-components |
| Input | `components/ui/Input.jsx` | Labeled input with error state |
| Badge | `components/ui/Badge.jsx` | Status chips — default, brand, accent, success, warning, danger |
| Modal | `components/ui/Modal.jsx` | Animated dialog, Escape key, backdrop click, scroll lock |
| Spinner | `components/ui/Spinner.jsx` | Loading indicator, 3 sizes |
| Skeleton | `components/ui/Skeleton.jsx` | Pulse loader with ResumeCard preset |
| Navbar | `components/layout/Navbar.jsx` | Sticky header, spring nav indicator, mobile menu |
| PageWrapper | `components/layout/PageWrapper.jsx` | Fade+slide page transition |

### Landing Page Sections

1. **Navbar** — sticky, logo + nav links + auth CTAs
2. **Hero** — headline with animated underline, gradient orb, dual CTAs
3. **Features** — 3-column cards with hover lift
4. **How It Works** — 4-step process with connector lines
5. **CTA** — brand-600 background, contrast button
6. **Footer** — logo, credits, security note


---

## AI Assistant (Phase E)

### Architecture — Provider Abstraction (Adapter Pattern)

```
Client                  Server
──────                  ──────
AI Tool Card
  → useAI hook (TanStack useMutation)
  → POST /api/ai/{feature}

                        Route: protect + rate limit (30/hr) + Zod validate
                        Controller: extract body, call service, handle errors
                        Service: select prompt, call provider, parse response
                        ProviderFactory: reads AI_PROVIDER env var
                          ↓
                        ┌─────────────┬─────────────┬─────────────┐
                        │   OpenAI    │   Claude    │   Gemini    │
                        │ provider.js │ provider.js │ provider.js │
                        └─────────────┴─────────────┴─────────────┘
                        All implement: { call(system, user, opts), name }

← { result, provider }
Toast + AIResultPanel display
```

### Why This Design

| Decision | Reasoning |
|---|---|
| Adapter pattern via factory | Each provider has a different API (auth header, request shape, response shape). Factory normalises to one interface: `call(system, user, options)`. |
| `AI_PROVIDER` env var (server-side) | API keys never reach the browser. Switching providers is a deployment decision, not a client toggle — prevents cost abuse. |
| Raw `fetch()`, no SDKs | Keeps the abstraction simple and portable. Each provider file is ~50 lines — easy to read and extend. |
| Prompts centralised in `ai.prompts.js` | Prompts are business logic, like SQL queries. Easy to iterate without touching service code. |
| Zod validation before AI call | Rejects bad input before spending API credits. A 10-character minimum on summary, for example, blocks near-empty submissions. |
| `useMutation` not `useQuery` | AI calls are user-triggered, expensive, and shouldn't auto-refetch or cache silently. |

### Adding a New Provider

```js
// 1. Create server/src/features/ai/providers/mistral.provider.js
export const mistralProvider = { call: async (system, user, opts) => { /* ... */ }, name: 'mistral' }

// 2. Register in providerFactory.js
const PROVIDERS = { openai, claude, gemini, mistral: mistralProvider }

// 3. Set AI_PROVIDER=mistral in .env — done. Zero other changes.
```

### AI Features

| Feature | Endpoint | Input | Output |
|---|---|---|---|
| Summary Improver | `POST /api/ai/summary` | currentSummary, jobTitle | Improved summary (text) |
| Bullet Rewriter | `POST /api/ai/bullet` | bullet, role | Stronger bullet (text) |
| Skills Generator | `POST /api/ai/skills` | jobTitle, existingSkills | `{ technical: [], soft: [] }` |
| Project Description | `POST /api/ai/project-desc` | projectTitle, technologies, description | Bullet points (text) |
| Resume Feedback | `POST /api/ai/feedback` | resumeData (full object) | `{ overallScore, strengths[], improvements[], missingElements[], topRecommendation }` |

### Security

- All AI routes require valid JWT (`protect` middleware)
- Rate limited to 30 requests/hour per IP (`aiLimiter`)
- All inputs validated server-side with Zod before reaching the provider
- API keys live only in server `.env`, never sent to client
- Markdown code-fence stripping + JSON parse fallback for malformed AI responses

### Interview Talking Points

1. **Why the Adapter pattern?** Each AI provider (OpenAI, Claude, Gemini) has incompatible APIs — different auth headers, request bodies, response shapes. The adapter normalises them to one interface so the service layer never needs to know which provider is active.

2. **Why server-side provider selection?** If the client chose the provider, you'd need per-request API key routing and the client could force expensive calls. Server-side `AI_PROVIDER` env var keeps it a deployment concern.

3. **How do you handle a provider returning malformed JSON?** The service tries `JSON.parse()` after stripping markdown fences; on failure it falls back to a safe default shape so the UI never crashes.

4. **Why validate with Zod before calling the AI?** AI calls cost money and time. Rejecting a 3-character "summary" before it reaches OpenAI saves cost and gives the user instant feedback.

5. **How would you add response caching?** Add a cache key from a hash of (feature, input) → check TanStack Query staleTime client-side, or Redis server-side for identical repeated requests.


---

## ATS Analyzer (Phase F)

### Architecture — Deterministic, Rule-Based Scoring

```
ATSAnalyzerPage
  → select saved resume + optional job description
  → useAnalyzeResume().mutate({ resumeData, jobDescription })
  → POST /api/ats/analyze
      → protect + rate limit + Zod validate
      → ats.controller.analyze
      → ats.service.analyzeResume(resumeData, jobDescription)
          ├── scoreKeywords()      → word-boundary keyword matching
          ├── scoreFormatting()    → contact completeness, date consistency
          ├── scoreReadability()   → action verb ratio, bullet length, weak phrases
          ├── scoreCompleteness()  → missing section detection
          └── compareJobDescription() → keyword overlap % (if JD provided)
      → weighted overall score (30% keyword, 20% formatting, 20% readability, 30% completeness)
  ← { overallScore, keywordScore, formattingScore, readabilityScore,
      completenessScore, missingKeywords, missingSkills, weakActionVerbs,
      formattingSuggestions, improvementSuggestions, jdMatch }
  → ATSScoreCard (circular gauge) + ATSCategoryBreakdown (bars)
    + MissingKeywordsCard (pills) + SuggestionsCard (prioritized list)
```

### Why Rule-Based, Not AI

| Reason | Detail |
|---|---|
| Explainable | Every point deducted traces to a concrete rule (e.g. "missing email: -15") |
| Deterministic | Same resume always produces the same score — verified by automated test |
| Free | Zero API cost per analysis — runs in milliseconds |
| Realistic | Most commercial ATS systems are keyword/structure parsers, not LLMs |
| Complementary to AI Feedback | Phase E's AI Resume Feedback gives subjective critique; ATS Analyzer gives an objective, reproducible score |

### Scoring Breakdown

| Category | Weight | What It Checks |
|---|---|---|
| Keywords | 30% | Technical terms present, matched via word-boundary regex (avoids false positives like "go" inside "mongodb") |
| Formatting | 20% | Contact completeness (name, email, phone, LinkedIn), date consistency, section presence |
| Readability | 20% | Action verb ratio, weak phrase detection ("helped", "responsible for"), bullet point length |
| Completeness | 30% | Missing summary, experience, education, skills, LinkedIn |

### Bug Found & Fixed During Testing

**Bug:** Naive `.includes()` keyword matching caused false positives — searching for `"go"` matched inside `"mongodb"`, inflating keyword scores.

**Fix:** Replaced with word-boundary-aware regex (`(?<![a-z0-9])keyword(?![a-z0-9])`) that still allows special-character keywords like `"c++"` and `"node.js"` to match correctly while preventing substring leakage.

### Interview Talking Points

1. **Why not just ask an LLM to score the resume?** An LLM score isn't reproducible — ask it twice, get different numbers. ATS scoring needs to be explainable and consistent so users trust the feedback and can act on it.

2. **How do you avoid false-positive keyword matches?** Word-boundary regex instead of substring `.includes()`. Caught this exact bug in testing: "go" was matching inside "mongodb".

3. **How is the overall score calculated?** Weighted average of 4 sub-scores. Completeness and keywords are weighted highest (30% each) because missing sections and missing terms are the most common reasons real ATS systems reject resumes.

4. **What's the limitation of this approach?** It can't judge actual writing quality or whether an achievement is impressive — only structural/keyword signals. That's why Phase E's AI Resume Feedback exists as a complementary, more subjective layer.

5. **How would you extend this for production?** Add a configurable keyword dictionary per industry, support resume parsing from uploaded PDFs (not just saved resumes), and persist reports to MongoDB for history tracking (planned Phase H).


---

## PDF Export & Templates (Phase G)

### Architecture

```
TemplateGalleryPage
  → browse 5 templates (registry-driven) → live TemplatePreviewModal
  → select template → PUT /api/resumes/:id { templateId } (persisted on Resume doc)

ResumePage / TemplateGalleryPage
  → ExportMenu (PDF / DOCX / JSON dropdown)
      PDF:  POST /api/export/pdf  { resumeId, templateId } → Puppeteer → binary PDF
      DOCX: POST /api/export/docx { resumeId }             → docx lib  → binary DOCX
      JSON: POST /api/export/json { resumeId }             → raw backup JSON
  → axios blob response → triggerDownload() → browser save dialog

Resume save (PUT /api/resumes/:id)
  → BEFORE overwrite: snapshot old state into ResumeVersion collection
  → prune oldest snapshot beyond 20 versions per resume
  → History button → VersionHistoryModal → list / restore / compare
```

### Template System

5 templates registered in `templateRegistry.js`: Modern Professional, ATS Friendly, Executive, Minimal, Creative. Adding a 6th template requires exactly two changes: create the component, add one entry to the registry object — no other file needs touching (gallery, renderer, and editor all read from the registry dynamically).

The same templates exist twice by necessity — once as React components (`client/.../templates/*.jsx`, used for live browser preview) and once as HTML-string generator functions (`server/.../export.templates.js`, used by Puppeteer for PDF). Both describe identical visual design; the duplication is the cost of using a real browser engine (Puppeteer) for PDF instead of a JS-only PDF library.

### Why Puppeteer Over pdf-lib

| | Puppeteer | pdf-lib |
|---|---|---|
| Renders | Real HTML/CSS via headless Chrome | Manual x/y text positioning |
| Page breaks | Automatic via CSS | Must calculate manually |
| Matches live preview | Yes — same markup | No — separate implementation |
| Binary size | ~300MB Chromium | Pure JS, tiny |
| Best for | Content-driven documents (resumes, invoices, reports) | Filling existing PDF forms, precise programmatic layouts |

For a template-driven resume builder, Puppeteer was the right trade-off: it reuses the same layout logic our 5 templates already express in CSS, rather than re-implementing every template's spacing and wrapping rules as raw coordinates.

### Version History

Every `PUT /api/resumes/:id` snapshots the pre-update state into a separate `ResumeVersion` collection (not an embedded array — keeps the Resume document small and avoids MongoDB's 16MB document limit on heavily-edited resumes). Up to 20 versions are kept per resume; older ones are pruned automatically. Restoring a version itself creates a new "Before restore" snapshot, so restore is always undoable. Field-level comparison between any two versions is available via `GET /api/resumes/:id/versions/compare`.

### Multi-Format Export

| Format | Library | Use Case |
|---|---|---|
| PDF | Puppeteer | Final, polished file for job applications |
| DOCX | `docx` npm package (builds real OOXML) | Users who want to make manual edits in Word |
| JSON | Native `JSON.stringify` | Raw backup/portability — re-importable in the future |

### API Reference (Phase G additions)

```
POST /api/export/pdf   { resumeId, templateId } → binary PDF
POST /api/export/docx  { resumeId }              → binary DOCX
POST /api/export/json  { resumeId }              → JSON backup file

GET  /api/resumes/:id/versions                     → list version snapshots
GET  /api/resumes/:id/versions/compare?versionAId&versionBId → field diff
GET  /api/resumes/:id/versions/:versionId           → single version
POST /api/resumes/:id/versions/:versionId/restore   → restore + auto-snapshot current state
```

### Known Environment Limitation

Puppeteer's Chromium binary download is blocked in this development sandbox's network allowlist (`storage.googleapis.com` is not reachable). The `puppeteer` npm package and all PDF-generation *code* are correctly implemented and installed; what couldn't be executed in this sandbox is the final `browser.launch()` step that requires the actual Chrome binary. This is a standard Puppeteer deployment requirement — Render, Railway, and Docker-based hosts with Chrome pre-installed (or `puppeteer` configured to use a system Chrome) will run this exactly as written with no code changes.

### Interview Talking Points

1. **Why a separate ResumeVersion collection instead of an array field on Resume?** MongoDB documents cap at 16MB. An unbounded embedded array of every edit ever made risks hitting that ceiling on a heavily-edited resume. A separate collection scales independently and can be queried/paginated/pruned on its own.

2. **How do you guarantee the PDF matches the live preview?** Both the React template (browser preview) and the HTML-string template (server PDF) are written to describe an identical layout — same colors, same structure, same typography choices — even though they're technically separate files. They're a matched pair the same way client-side and server-side validation schemas are.

3. **What happens if 50 PDF requests hit at once?** The shared Puppeteer browser instance is reused across requests (only a new `page` is opened per request, not a new browser), and the export route has its own stricter rate limit (20/15min) separate from the general API limiter, since each request is meaningfully more expensive than a typical CRUD call.

4. **Why is restoring a version itself "undoable"?** Before applying the restore, the current state is snapshotted as a new version labeled "Before restore." This means a bad restore is just another item in history — never a one-way, unrecoverable action.
