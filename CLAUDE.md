# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint check
- `npm run preview` — Preview production build locally

## Architecture

**Stack:** React 19 + TypeScript + Vite 7, Supabase backend, deployed on Vercel.

This is a landing page + application system for the Epoch accelerator programme. There is no server-side code — Supabase handles the backend (form submissions, asset storage).

### Routing & Pages

- `/` — Landing page composed of section components: Hero → Manifesto → Tracks → Partners → Apply CTA
- `/apply` — Application form that submits to Supabase `applications` table

Router is configured in `src/App.tsx` with React Router DOM v7.

### Key Directories

- `src/components/` — Section components (Hero, Manifesto, Tracks, Partners, ApplyForm)
- `src/lib/supabase.ts` — Supabase client initialization
- `src/index.css` — All styles (~889 lines, no CSS-in-JS)
- `public/logos/` — Partner logo assets

### Supabase Integration

- Client initialized in `src/lib/supabase.ts` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars
- `applications` table stores form submissions (name, email, github_url, twitter_url, project_description, track)
- Partner logos served from Supabase storage bucket

### Styling

Pure CSS with custom properties. Neo-brutalist dark theme:
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels)
- Background: pure black (#000), white text, monochrome palette
- CSS variables defined at `:root` in `src/index.css`
- Responsive breakpoints at 1024px and 768px

## Deployment

Vercel, serving the Vite `dist/` output from root. No serverless functions or API routes.
