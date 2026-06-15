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
