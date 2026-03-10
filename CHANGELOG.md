# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] – fork (aculich)

Changes in this fork on top of the upstream Launch Kit: turnkey Mac setup, 1Password and deploy docs, in-app error display, and agent memory.

### Added

- **README**
  - "Quick start (Mac with Homebrew)": single path (brew → clone → createdb → env → Clerk → npm run dev) and optional portless.
  - "Managing credentials with 1Password": one item per app, `op inject` with `.env.template` and `OP_ACCOUNT=my.1password.com`, no workarounds.
  - Note that in-app errors (Todos and API) are shown in the UI with setup guidance; note for this fork’s Render deploy button.
- **Render one-click deploy:** `render.yaml` blueprint (Postgres + Node API + static site); deploy button and env steps in README.
- **Railway:** README documents template + deploy button flow and Clerk production URLs.
- **AGENTS.md:** Agent memory: CLAUDE vs AGENTS roles, learned user preferences (no delete without permission, commit message suggestion, notion-search, 1Password develop + op inject, portless then dev), workspace facts (env location, portless routes, Postgres one DB per project, Clerk + DNSimple). Preferred local setup: Mac + brew Postgres + portless; README quick start and deploy docs.
- **CLAUDE.md:** Technical project reference (structure, stack, commands, conventions, gotchas) used as Cursor workspace rule.
- **.env.template:** Template with `op://` references for 1Password inject (e.g. Launchkit Clerk item in develop vault).
- **In-app error display:** `ApiErrorBanner` in `shared/components`; Todos page catches API errors and shows status-based guidance (401 → Clerk keys, 500 → DB, etc.) so users don’t rely only on the console.
- **API:** `env-cmd -f .env` in root `dev:api` so the API loads root `.env`; DB connection errors surfaced in health/todos instead of silent failure.

### Changed

- **Root package.json:** `dev:api` uses `env-cmd -f .env`; added `env-cmd` devDependency.
- **API** (`apps/api`): Drizzle config and DB client tolerate missing `DATABASE_URL` with a clear error; todos route returns 503 when DB is unavailable.
- **Web:** Vite config mentions portless-friendly host; Todos page shows dismissible API error banner with setup hints.

### Why

- **One file for “how to run”:** README quick start + 1Password + deploy give a single, repeatable path (Mac, brew, portless, op or manual env).
- **Agent context:** AGENTS.md and CLAUDE.md ensure Cursor and other agents know project layout and this workspace’s preferences (1Password, portless, no destructive edits without confirmation).
- **Fewer console dives:** In-app errors and Clerk setup screen guide users through devops (Clerk, DB, env) where human steps are required.
- **Deploy without guesswork:** Render blueprint and README steps (Clerk keys, same production instance for multiple origins) so one-click deploy is correctly configured.

## [0.1.0] - 2026-03-10

Initial release of Launch Kit SPA Desktop.

### Added

- React 19 + Vite 7 frontend with TypeScript and HMR
- Hono API server (Node runtime) with typed RPC client
- Drizzle ORM with PostgreSQL — schema, migrations, and Drizzle Studio
- Todos feature with full CRUD API routes
- Clerk authentication end-to-end — sign-in, sign-up, protected routes, JWT-secured API
- shadcn/ui (new-york style) with Tailwind CSS v4 and Lucide icons
- Sidebar layout with nav (Home, Settings) and main content area
- React Router v7 SPA routing
- Vite dev proxy (`/api` → Hono) for seamless local development
- Optional Tauri v2 desktop build wrapping the same React app
- npm workspaces monorepo (`apps/web` + `apps/api`)
- Environment configuration with `.env.example` and documented Clerk key mapping (Vite `VITE_` prefix vs Hono conventions)
- Comprehensive README with setup instructions, troubleshooting, and architecture rationale

[0.1.0]: https://github.com/switch-dimension/launch-kit-spa-desktop-switchdimension/releases/tag/v0.1.0
