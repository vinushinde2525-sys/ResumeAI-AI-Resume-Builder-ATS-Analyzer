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
