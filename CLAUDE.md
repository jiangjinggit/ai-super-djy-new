# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 3000 (host 0.0.0.0)
npm run build     # Production build to dist/
npm run preview   # Serve dist/ locally
npm run lint      # TypeScript type check (no emit)
npm run clean     # Remove dist/
```

No test framework is configured. Use `npm run lint` to check types.

## Architecture

This is a **static-content educational SPA** for an AI learning platform ("AI Superman EVOLUTION") with 6 modules and 30+ lessons.

**Content is entirely compile-time** — no runtime API calls for content. Lessons are Markdown files imported via `import.meta.glob()`. Module structure is defined in TypeScript files.

### Routing (App.tsx)
```
/                          → HomePage
/module/:id                → ModulePage
/module/:id/lesson/:slug   → LessonPage
/about, /faq, /privacy, /terms
```

All pages are lazy-loaded via `React.lazy()`.

### Content Layer (`src/content/`)
- `modules/*.ts` — Module definitions (title, icon, color, lesson list)
- `modules/index.ts` — Enrichment logic: combines modules + lesson slugs + metadata into `MODULE_CONTENT`
- `moduleEnhancements/*.ts` — Enhancement blocks rendered on ModulePage (checklists, model options, case evidence)
- `lessons/**/*.md` — Actual lesson content in Markdown
- `moduleCatalog.ts` — Module registry used on HomePage
- `lessonCovers.ts` — Dynamic cover image generation per lesson

### Type System (`src/types/course.ts`)
Central schema for all content. Key types: `ModuleContent`, `Lesson`, `ModuleEnhancementBlock` (discriminated union by `type` field).

### Component Structure
- `src/components/` — Shared components (Navbar, Footer, ModuleCard, ThemeProvider)
- `src/components/module-page/` — ModulePage-specific rendering
- `src/components/lesson-page/` — LessonPage markdown viewer + visual guide
- `src/pages/` — Full page components
- `src/hooks/` — `useCountUp` (stats animation), `useDocumentTitle`
- `src/constants/moduleStyles.ts` — Color scheme mappings per module

### UI Stack
- Tailwind CSS 4 (via Vite plugin, no tailwind.config.js)
- Motion (Framer Motion) for animations
- lucide-react for icons
- sonner for toasts
- react-markdown + remark-gfm for lesson rendering

## Adding Content

**New lesson**: Create `src/content/lessons/<module-dir>/<slug>.md`, then add the lesson entry to the corresponding `src/content/modules/<module>.ts`.

**New enhancement block**: Add to `src/content/moduleEnhancements/<module>.ts` following the discriminated union type in `course.ts`.

## Design Guidelines

See `UI优化设计文档.md` for the full design spec. Key constraints:
- Background: micro-blue-tinted dark `#020817`, not pure black
- Accent color: Electric Cyan `#0EA5E9`
- Fonts: Syne (titles), JetBrains Mono (numbers/code), Noto Sans SC (Chinese)
- No WebGL/Three.js, no typewriter animations, no custom cursor
- Visual inspiration: Linear.app, Vercel, Raycast, Resend
