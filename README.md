# AI Engineer Academy — Phase 1 Foundation

منصة تعليمية تفاعلية لتعلم هندسة الذكاء الاصطناعي (المرحلة الأولى: تأسيس الواجهة والهيكلية).

## Overview
- **Default Language & Direction**: Arabic (`lang="ar"`) with full `RTL` (`dir="rtl"`) support and `LTR` inline formatting (`BilingualTerm`) for English technical terms and code.
- **Themes**: Dark theme by default with an optional Light theme persisted in `localStorage`.
- **Architecture**: Pure client-side React + TypeScript + Vite SPA with zero backend dependencies, zero paid APIs, and modular separation of concerns.

## Setup Guide

### Prerequisites
- Node.js `>= 20`
- npm `>= 10`

### Installation & Local Development
```bash
npm install
npm run dev
```
The development server runs on `http://localhost:3000`.

### Production Build & Type Checking
```bash
npm run lint
npm run build
```

### Running Unit & Navigation Tests
```bash
npx --yes tsx --test src/services/academy.test.ts
```

## Project Structure

```text
src/
├── components/           # Reusable UI building blocks & navigation shell
│   ├── BilingualTerm.tsx # Inline LTR wrapper for English terms/code inside RTL prose
│   ├── DemoNotice.tsx    # Clear banner labeling Phase 1 local demo data
│   ├── ErrorBoundary.tsx # React error boundary with Arabic recovery UI
│   ├── LayoutShell.tsx   # Responsive RTL sidebar (desktop) & slide-over drawer (mobile)
│   ├── NavIcon.tsx       # Lucide icon mapper for primary navigation routes
│   ├── PhaseAccordion.tsx# Accessible expandable roadmap phase card (aria-expanded)
│   └── StatMetric.tsx    # Tabular-numeral KPI metric card with optional progress bar
├── data/                 # Local sample/demo datasets (clearly separated from UI)
│   ├── assessments.ts    # Phase 1 self-check quiz questions
│   ├── courses.ts        # Courses library catalog mapped to roadmap phases
│   ├── dashboard.ts      # Demo daily mission and initial progress defaults
│   ├── labs.ts           # Code Lab reference snippets & Math Lab formulas
│   ├── navigation.ts     # All 10 primary route definitions
│   ├── projects.ts       # Sample portfolio projects
│   └── roadmap.ts        # Complete 11-phase roadmap (Phase 0 to Phase 10) with lessons
├── hooks/                # Custom React hooks
│   ├── useAcademyState.ts# Persistent curriculum progress, daily target, projects & notes
│   ├── useRouter.ts      # History API client-side router with invalid route handling
│   └── useTheme.ts       # Persistent dark/light theme controller
├── pages/                # Route-level page views (10 primary sections + 404)
│   ├── AssessmentsPage.tsx
│   ├── ClassroomPage.tsx
│   ├── CodeLabPage.tsx
│   ├── CoursesPage.tsx
│   ├── DashboardPage.tsx
│   ├── MathLabPage.tsx
│   ├── NotFoundPage.tsx
│   ├── NotesPage.tsx
│   ├── ProjectsPage.tsx
│   ├── RoadmapPage.tsx
│   └── SettingsPage.tsx
├── services/             # Pure TypeScript domain logic & tests (decoupled from DOM)
│   ├── academy.test.ts   # Unit tests for routing, 11-phase metrics, math engine & rendering
│   ├── curriculum.ts     # Progress calculation, phase completion & lesson traversal
│   ├── mathEngine.ts     # Deterministic 2D vector dot product, gradient descent & quiz scoring
│   ├── router.ts         # Path normalization, route resolution & document title builder
│   └── storage.ts        # Safe localStorage persistence helpers
├── styles/
│   └── theme.css         # Font variables, tabular numerals & reduced-motion rules
├── types/
│   └── academy.ts        # Shared TypeScript interfaces and route types
├── App.tsx               # Root application shell and route switch
├── index.css             # Tailwind CSS v4 entry & dark custom-variant
└── main.tsx              # React DOM mount
```

## Implemented Sections (Phase 1)
1. **Dashboard (`/`)**: Academy header, Daily Mission checklist, 60-minute Daily Target tracker, curriculum progress, current phase, completed lessons, portfolio projects, and Continue Learning CTA.
2. **Roadmap (`/roadmap`)**: Expandable phases 0 through 10 (`Environment Setup` to `Professional Portfolio`) with phase filters and direct lesson links.
3. **My Classroom (`/classroom`)**: Active lesson viewer, objectives, bilingual terms, copyable code sample, completion toggle, and previous/next lesson navigation.
4. **Courses Library (`/courses`)**: Searchable and level-filterable module catalog.
5. **Code Lab (`/code-lab`)**: Reference Python/CLI snippets with editable draft scratchpad, copy, and reset.
6. **Mathematics Lab (`/math-lab`)**: Interactive 2D vector dot product explorer, gradient descent step simulator, and core AI formulas.
7. **Projects (`/projects`)**: Portfolio projects with deliverables and persistent status updates.
8. **Assessments (`/assessments`)**: Client-side self-check diagnostic quiz with score calculation and explanations.
9. **Notes (`/notes`)**: Persistent local study notes manager with search, phase filter, and validation.
10. **Settings (`/settings`)**: Dark/Light theme switcher, daily target adjustment, and demo data reset.
11. **Invalid Routes**: Graceful Arabic 404 screen with return to Dashboard.
