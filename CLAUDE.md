# CLAUDE.md

## Project Overview

Full-stack SPA starter kit: React 19 frontend + Hono API backend + optional Tauri v2 desktop wrapper. npm workspaces monorepo with Clerk auth, Drizzle ORM (PostgreSQL), and Tailwind CSS v4.

## Repository Structure

```
/                          # Monorepo root (npm workspaces)
├── apps/
│   ├── web/               # React 19 SPA (Vite 7, port 5167)
│   │   └── src/
│   │       ├── app/       # Routes, layout, protected route guard
│   │       ├── pages/     # Route-level page components
│   │       ├── components/ui/  # shadcn/ui components (new-york style)
│   │       ├── shared/lib/     # API client, hooks (useApi)
│   │       └── lib/       # Utilities (cn helper)
│   └── api/               # Hono API server (port 3834)
│       ├── src/
│       │   ├── routes/    # Route handlers (health, todos, users)
│       │   ├── lib/db/    # Drizzle schema + connection
│       │   └── middleware/ # Custom middleware (placeholder)
│       └── drizzle/       # SQL migration files
├── src-tauri/             # Tauri v2 desktop shell (optional)
├── .agents/skills/        # Agent skills (canonical path; each subdir has SKILL.md)
├── .env.example           # Template for environment variables
└── tsconfig.base.json     # Shared TypeScript config
```

**Agent skills:** The canonical path for project-level skills is **`.agents/skills/`** (plural). Cursor discovers skills from `.agents/skills/` and `.cursor/skills/` ([Cursor docs](https://cursor.com/docs/skills)); the [Agent Skills](https://agentskills.io) convention is `.agents/skills/` for cross-client interoperability. Do not use `.agent/skills/` (singular); that path is non-standard and redundant.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router v7, Vite 7 |
| Styling | Tailwind CSS v4, shadcn/ui (new-york), CVA, tailwind-merge |
| Backend | Hono v4 on Node.js (@hono/node-server) |
| Database | PostgreSQL via Drizzle ORM |
| Auth | Clerk (@clerk/react frontend, @hono/clerk-auth backend) |
| Desktop | Tauri v2 (optional) |
| Icons | Lucide React |

## Commands

```bash
# Development (starts web + api concurrently)
npm run dev

# Build all
npm run build

# Lint
npm run lint

# Database (run from /apps/api or root)
npm run db:push        # Push schema to DB (prototyping)
npm run db:migrate     # Run migrations
npm run db:generate    # Generate migrations from schema changes
npm run db:studio      # Open Drizzle Studio

# Desktop (requires Tauri CLI)
npm run tauri dev
npm run tauri build
```

## Environment Variables

All env vars live in a single `.env` file at the **monorepo root** (not in `/apps/`). Copy `.env.example` to get started.

```
PORT=3834                              # API server port
DATABASE_URL=postgresql://...          # PostgreSQL connection string
VITE_CLERK_PUBLISHABLE_KEY=pk_test_... # Clerk publishable key (Vite-exposed)
CLERK_PUBLISHABLE_KEY=pk_test_...      # Same key for API server
CLERK_SECRET_KEY=sk_test_...           # Clerk secret key (API only)
VITE_API_URL=                          # API base URL (empty = same-origin proxy)
```

**Important**: Vite reads env via `envDir: '../..'` in vite.config.ts. Frontend-exposed vars must be prefixed with `VITE_`.

## Architecture Patterns

### API Type Safety (End-to-End)
The frontend imports `AppType` from the API package for fully typed RPC calls via Hono client — no codegen needed:
- API defines routes with Hono's chained syntax → exports `AppType`
- Web imports `AppType` and creates typed client with `hc<AppType>()`
- `useApi()` hook injects Clerk auth token into every request

**Known issue**: `tsc -b` loses workspace types. Three `@ts-expect-error` directives in `apps/web/src/pages/TodosPage.tsx` are intentional workarounds — do not remove them.

### Authentication Flow
- Frontend: `ClerkProvider` wraps app; `ProtectedRoute` guards authenticated routes (6s timeout)
- Backend: `clerkMiddleware()` applied to all `/api/*` routes when `CLERK_SECRET_KEY` is set
- Routes check `getAuth(c).userId` and return 401 if missing
- Auth is gracefully optional — app shows setup instructions if Clerk keys are missing

### Frontend Conventions
- **Routing**: React Router v7 with outlet-based nested routes in `apps/web/src/app/routes.tsx`
- **Pages**: One file per route in `apps/web/src/pages/`
- **Components**: shadcn/ui components in `apps/web/src/components/ui/`
- **Styling**: Tailwind utility classes; design tokens as CSS custom properties in `index.css`; dark mode by default (`.light` class toggles)
- **State**: React hooks only (useState, useCallback) — no external state library
- **Utilities**: `cn()` helper from `apps/web/src/lib/utils.ts` (clsx + tailwind-merge)

### Backend Conventions
- **Routes**: Each feature gets its own file in `apps/api/src/routes/`
- **Route mounting**: Register in `apps/api/src/index.ts` via `.route()`
- **Auth guard**: Check `getAuth(c).userId` at the start of protected handlers
- **DB access**: Use `getDb()` from `apps/api/src/lib/db/index.ts` (lazy singleton)
- **Schema**: Define tables in `apps/api/src/lib/db/schema.ts`, then run `db:generate`

### Database Schema
Currently two tables:
- `users` (id, email, createdAt)
- `todos` (id, title, completed, createdAt)

Todos are not yet associated with users (planned enhancement).

## Development Workflow

1. `npm install` at root
2. Copy `.env.example` → `.env` and fill in values
3. Set up PostgreSQL and run `npm run db:push` (from `apps/api`)
4. `npm run dev` starts both servers
5. Vite dev server (port 5167) proxies `/api` → Hono (port 3834)

## Adding New Features

### New API Route
1. Create `apps/api/src/routes/<feature>.ts`
2. Export a Hono app with route handlers
3. Mount in `apps/api/src/index.ts` via `.route("/api/<feature>", featureRoutes)`
4. Types automatically flow to frontend via `AppType`

### New Database Table
1. Add table definition to `apps/api/src/lib/db/schema.ts`
2. Run `npm run db:generate` to create migration
3. Run `npm run db:migrate` or `npm run db:push`

### New Frontend Page
1. Create `apps/web/src/pages/<Name>Page.tsx`
2. Add route to `apps/web/src/app/routes.tsx`
3. Add nav link to `apps/web/src/app/layout/Sidebar.tsx`

### New UI Component
Follow shadcn/ui patterns — place in `apps/web/src/components/ui/` with CVA variants.

## What's NOT Set Up

- **Testing**: No test framework configured (no Vitest, Jest, etc.)
- **CI/CD**: No GitHub Actions or other pipeline
- **Linting**: ESLint configured for web only (flat config, ESLint 9)

## Gotchas

- `.env` must be at monorepo root, not inside individual apps
- `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_PUBLISHABLE_KEY` are the same value but both must be set
- The Vite dev proxy handles `/api` routing — in production, configure your reverse proxy or hosting accordingly
- Tailwind CSS v4 uses `@import "tailwindcss"` syntax, not the v3 `@tailwind` directives
- React Router v7 uses `createBrowserRouter` + `RouterProvider` pattern
