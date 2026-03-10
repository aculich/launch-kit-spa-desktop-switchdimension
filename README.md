# 🚀 Launch Kit SPA Desktop SwitchDimension

Everything you need to ship a full-stack single-page app and optional desktop build. A modern starter for React + Vite + Hono with shadcn/ui, designed for AI-assisted refactors and deploy-anywhere flexibility.

## Tech Stack

- **Framework:** React 19 with Vite 7
- **Language:** TypeScript 5.9
- **Auth:** Clerk (sign-in, sign-up, protected routes, JWT-secured API)
- **UI Library:** shadcn/ui (new-york style) + Lucide React icons
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7 (SPA)
- **Backend:** Hono (Node runtime; portable to Cloudflare Workers, Deno, Bun)
- **Database:** PostgreSQL with Drizzle ORM
- **Desktop (optional):** Tauri v2
- **Monorepo:** npm workspaces (`apps/web` + `apps/api`)

## Features

- ✅ **React 19 + Vite 7** — Fast SPA with HMR and simple build pipeline
- ✅ **Hono API** — Type-safe backend with RPC-style types flowing to the frontend
- ✅ **Drizzle + PostgreSQL** — Type-safe ORM with migrations and Drizzle Studio
- ✅ **Tailwind CSS v4** — Utility-first styling with a single config
- ✅ **shadcn/ui + Lucide** — Button, theme variables, `cn()` utility; add more with `npx shadcn@latest add <name>`
- ✅ **Sidebar layout** — Ready-made app shell with nav (Home, Settings) and main content area
- ✅ **Typed API client** — End-to-end types via Hono RPC; no codegen
- ✅ **Deploy anywhere** — Node runs on Railway, Render, Fly, and most hosts; same API can target Workers
- ✅ **Clerk authentication** — Sign-in, sign-up, and protected routes; API protected with JWT verification
- ✅ **Optional desktop** — Tauri v2 for a native shell around the same React app
- ✅ **One repo, two apps** — AI (and you) get a full view of frontend and backend; deploy together or separately

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher; 20+ recommended) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (for the API database) — [Download here](https://www.postgresql.org/download/) or use a hosted service (Neon, Supabase, Railway, etc.)
- **Rust** (only if you use Tauri) — [Install guide](https://tauri.app/start/install)

To check your versions:

```bash
node --version   # 18.0 or higher
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url> my-app
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment and database

Copy the example env file and set your PostgreSQL connection string:

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL=postgresql://user:password@localhost:5432/your_db
```

From the API package, run migrations (or use `db:push` for prototyping):

```bash
npm run db:push --workspace=@launch-kit-spa-desktop-switchdimension/api
# Or: npm run db:migrate --workspace=@launch-kit-spa-desktop-switchdimension/api
```

### 3b. Set up Clerk (authentication)

The app uses [Clerk](https://clerk.com) for authentication. Without keys the app shows a "Clerk not configured" screen with setup instructions.

1. Create a free account at [clerk.com](https://clerk.com) and create an application.
2. In the Clerk Dashboard, go to **API Keys** and copy:
   - **Publishable Key** (starts with `pk_test_`) → set `VITE_CLERK_PUBLISHABLE_KEY` in `.env`
   - **Secret Key** (starts with `sk_test_`) → set `CLERK_SECRET_KEY` in `.env`
3. The **Publishable Key** is all you need to get sign-in and sign-up working. The **Secret Key** is needed for the API to verify JWTs (protect `/api/todos`, `/api/users`, etc.).
4. If you can't see the Secret Key, look for a **"Reveal"** or **"Show"** button next to it on the API Keys page. Only account **Admins** can reveal it.
5. Ensure your Clerk application's allowed redirect URLs include `http://localhost:5167` (and your production URL when deploying).

> **Note:** The `.env` file lives in the **project root** (same folder as `package.json`). Vite is configured to load env vars from there via `envDir` in `apps/web/vite.config.ts`. Do not put your `.env` inside `apps/web/`.

### 4. Run the app

```bash
npm run dev
```

- **Web app:** [http://localhost:5167](http://localhost:5167)
- **API:** [http://localhost:3834](http://localhost:3834) (e.g. [http://localhost:3834/api/health](http://localhost:3834/api/health), [http://localhost:3834/api/users](http://localhost:3834/api/users))

Open the web app URL in your browser. The frontend proxies `/api` to the API in development, so you don’t need CORS.

### 5. (Optional) Run the desktop app

With Rust installed:

```bash
npm run tauri
```

Tauri starts the web app and opens a native window. Build a production desktop binary with `npm run tauri:build`.

## Scripts (from repo root)

| Command | What it does |
|---------|----------------|
| `npm run dev` | Runs the web app (5167) and API (3834) together. |
| `npm run dev:web` | Web app only. |
| `npm run dev:api` | API only. |
| `npm run build` | Builds the web app and API. |
| `npm run lint` | Lints the frontend. |
| `npm run tauri` | Starts the Tauri dev window (loads the app from 5167). |
| `npm run tauri:build` | Builds the desktop app. |
| `npm run db:generate -w @launch-kit-spa-desktop-switchdimension/api` | Generates Drizzle migrations from schema. |
| `npm run db:migrate -w @launch-kit-spa-desktop-switchdimension/api` | Runs Drizzle migrations. |
| `npm run db:push -w @launch-kit-spa-desktop-switchdimension/api` | Pushes schema to DB (prototyping). |
| `npm run db:studio -w @launch-kit-spa-desktop-switchdimension/api` | Opens Drizzle Studio. |

## Project Structure

```
├── apps/
│   ├── web/                 # Frontend SPA
│   │   ├── src/
│   │   │   ├── app/         # Layout, sidebar, route config
│   │   │   ├── features/    # Feature modules (add your own)
│   │   │   ├── shared/      # Components, hooks, lib (e.g. API client)
│   │   │   ├── components/  # shadcn/ui components
│   │   │   └── pages/       # Route-level pages
│   │   └── ...
│   └── api/                 # Hono API
│       ├── src/
│       │   ├── routes/      # Route modules (e.g. health, users)
│       │   └── lib/
│       │       └── db/      # Drizzle schema and client
│       ├── drizzle/        # Generated migrations
│       └── drizzle.config.ts
├── src-tauri/               # Tauri desktop app (optional)
├── package.json             # Workspaces + root scripts
└── tsconfig.base.json
```

- **`app/`** — Shell: layout, sidebar, and routing. Change once, everything updates.
- **`features/`** — Domain or product features; each can own components, hooks, and state.
- **`shared/`** — Reusable UI and utilities; no imports from `features` or `pages`.
- **`pages/`** — Thin route components that compose features.

## Building for Production

```bash
# Build frontend and API
npm run build
```

Deploy `apps/web/dist` to any static host or CDN, and run the API (e.g. `node dist/index.js` from `apps/api`, or your host’s Node runtime). Or run both in a single Railway (or similar) container.

## Why This Stack

| Piece | Choice | Why |
|-------|--------|-----|
| **Build** | Vite | Fast dev server and builds; works the same for web and Tauri. |
| **UI** | React 19 + TypeScript | Familiar, strong ecosystem; TypeScript keeps the app and API in sync. |
| **Styling** | Tailwind CSS v4 | Utility-first, quick to refactor; one config for the whole UI. |
| **Routing** | React Router v7 | SPA routing with a simple, stable API. |
| **API** | Hono | Small, fast, type-safe; runs on Node now and can move to Cloudflare Workers, Deno, or Bun with a different adapter. |
| **Database** | Drizzle + PostgreSQL | Type-safe schema and queries; migrations via Drizzle Kit; works with any Postgres (local, Neon, Supabase, etc.). |
| **Auth** | Clerk | Hosted auth with prebuilt UI components; JWT verification on the API via `@hono/clerk-auth`. |
| **Types** | Hono RPC | The API exports its route types; the frontend gets a typed `api` client with no codegen. |
| **Desktop** | Tauri v2 | Same HTML/JS/CSS as the web app; small binaries and system access when you need it. |
| **UI components** | shadcn/ui | Copy-paste components (Radix primitives + Tailwind); theme via CSS variables. |
| **Icons** | Lucide React | Consistent icon set; used by shadcn and across the app. |

The repo is a **monorepo** (npm workspaces): frontend and API are separate packages so you can deploy or scale them independently, while still sharing types and running everything with one `npm run dev`.

## Opinions on the stack

I usually reach for Next.js, but I find myself building more and more single-page applications. Next is excellent at static rendering and has a rich ecosystem, but it comes with a lot of APIs and opinions. I want to refactor quickly with AI, host and store the app anywhere, and often ship a desktop build—and I don’t always need the serverless model Next optimizes for. For those cases, a lean SPA fits better.

On the **frontend**, we use React, Vite, Tailwind, and shadcn/ui. These are widely understood by AI tools and have a strong, predictable developer experience, so refactors and feature work stay fast.

On the **backend**, we use **Hono** instead of Express. Hono’s typing and design make it very well suited to working with modern AI: the codebase is easy for models to reason about, and the RPC-style types flow cleanly to the client. We run it on **Node** for maximum compatibility—Railway, Render, Fly, and almost every other host support it, so you can deploy the API wherever you like. Because Hono is runtime-agnostic, you can later move the same app to **Cloudflare Workers** (or other edges) for a very cheap, globally distributed backend if that fits your product.

Everything lives in **one repository** with two clear folders (`apps/web` and `apps/api`). You can deploy them separately—frontend to a CDN or static host, API to Node or Workers—or run both in a single Railway (or similar) container: one process serves the API, another serves the built frontend, and they talk over the network. Keeping both sides in one repo means an AI assistant has a complete view of the application and can change frontend and backend together. It also means the API can evolve into a standalone service: other clients (another app, an MCP server, or an agent) can talk to the same backend without being tied to this UI. In an agent-first world, having a first-class, deployable API that isn’t locked to a single framework is important.

## UI: shadcn/ui + Lucide

The app uses **shadcn/ui** (new-york style, Radix) and **Lucide React** for icons. Theme variables live in `apps/web/src/index.css` (dark by default; add class `light` on `<html>` for light mode).

- **Add components:** From `apps/web`, run `npx shadcn@latest add <component>` (e.g. `button`, `card`, `dialog`). Components go into `src/components/ui/`.
- **Use components:** `import { Button } from "@/components/ui/button"`.
- **Use icons:** `import { Home, Settings } from "lucide-react"`.
- **`cn()` helper:** `import { cn } from "@/lib/utils"` to merge Tailwind classes.

## Authentication (Clerk)

The app ships with Clerk wired end-to-end:

- **Frontend:** `ClerkProvider` wraps the app in `main.tsx`. Routes `/sign-in` and `/sign-up` render Clerk's prebuilt components. All other routes are wrapped in a `ProtectedRoute` that redirects unauthenticated users to `/sign-in`. The sidebar shows a `UserButton` when signed in.
- **API:** `clerkMiddleware()` from `@hono/clerk-auth` is applied to all `/api/*` routes. Protected route handlers (todos, users) call `getAuth(c)` and return `401` when no valid session is present. `/api/health` remains public.
- **Authenticated API calls:** Use the `useApi()` hook from `@/shared/lib/use-api` — it returns a Hono RPC client that automatically attaches the Clerk session JWT as a `Bearer` token.

### Environment variables

| Variable | Where it's used | Required |
|----------|----------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend (Vite exposes it to the browser) | Yes — app won't load without it |
| `CLERK_SECRET_KEY` | API (JWT verification) | Yes — API returns 401 without it |

Both go in the root `.env` file.

### What happens without keys

- **No Publishable Key:** The app shows a full-page "Clerk not configured" screen with step-by-step setup instructions.
- **No Secret Key:** The frontend works (sign-in, sign-up, navigation), but all API calls to protected routes return `401 Unauthorized`.

## Using the typed API client

The API exports its type; the frontend gets a typed client with no codegen:

```ts
// Unauthenticated client (for public routes like /api/health)
import { api } from '@/shared/lib/api-client';
const res = await api.api.health.$get();
const data = await res.json(); // { status: 'ok' } — typed
```

```ts
// Authenticated client (for protected routes — use inside React components)
import { useApi } from '@/shared/lib/use-api';

function MyComponent() {
  const api = useApi(); // attaches Clerk JWT automatically
  // ...
  const res = await api.api.todos.$get();
}
```

Add routes in `apps/api/src/routes/` and mount them in `apps/api/src/index.ts`; the client types update automatically.

## Database (Drizzle + PostgreSQL)

The API uses **Drizzle ORM** with PostgreSQL. Schema lives in `apps/api/src/lib/db/schema.ts`; the client is in `apps/api/src/lib/db/index.ts`.

- **Env:** Set `DATABASE_URL` in `.env` (see `.env.example`).
- **Schema:** Edit `apps/api/src/lib/db/schema.ts` and add tables with `pgTable`, `serial`, `text`, `timestamp`, etc.
- **Migrations:** Run `npm run db:generate -w @launch-kit-spa-desktop-switchdimension/api` to generate SQL, then `npm run db:migrate` to apply. For quick prototyping, use `npm run db:push`.
- **Studio:** Run `npm run db:studio -w @launch-kit-spa-desktop-switchdimension/api` to open Drizzle Studio and inspect or edit data.
- **In routes:** Import `db` from `../lib/db/index.js` and use `db.select()`, `db.insert()`, etc. Example: `GET /api/users` in `apps/api/src/routes/users.ts`.

## Desktop app (Tauri)

The same React app runs in a Tauri window. No separate “desktop” UI. Config lives in `src-tauri/tauri.conf.json` (dev URL, build commands, icons). You need Rust installed to use Tauri.

## Using this as a starter for new apps

1. **Clone or fork** this repo and rename it (e.g. `my-product`).
2. **Search and replace** any remaining project-specific names in:
   - `package.json` (name)
   - `apps/web/index.html` (title)
   - `src-tauri/tauri.conf.json` (productName, identifier, window title)
   - Set `DATABASE_URL` in `.env` for your database.
3. **Set up Clerk**: Create a Clerk application and add `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env`.
4. **Customize** the sidebar in `apps/web/src/app/layout/Sidebar.tsx` (nav items, branding).
5. **Add routes** in `apps/web/src/app/routes.tsx` and `apps/api/src/routes/`, and use the shared `api` client (or `useApi()` for authenticated calls) in the UI.
6. **Optionally remove Tauri** if you only need web: delete `src-tauri/`, drop `@tauri-apps/api` from the web app, and remove the `tauri` / `tauri:build` scripts from the root `package.json`.

You can keep the API and run the frontend as a static site, or deploy both; the structure stays the same.

## Ports

| Service | Port | Override |
|---------|------|----------|
| Web (Vite) | 5167 | `server.port` in `apps/web/vite.config.ts` |
| API (Hono) | 3834 | `PORT` env var or default in `apps/api/src/index.ts` |

If you change the API port, update the proxy in `apps/web/vite.config.ts` and (for production) `VITE_API_URL` if you use it.

## Troubleshooting

**Port already in use (EADDRINUSE)**

- Another process is using 5167 or 3834. Stop other dev servers or kill the process:
  ```bash
  lsof -ti:5167 | xargs kill
  lsof -ti:3834 | xargs kill
  ```
- Then run `npm run dev` again.

**API types not resolving in the frontend**

- Ensure `npm install` has been run from the repo root so the `@launch-kit-spa-desktop-switchdimension/api` workspace is linked.
- The API package exposes `main` and `types` in `apps/api/package.json` pointing at `./src/index.ts`.

**API fails to start or "DATABASE_URL is required"**

- Copy `.env.example` to `.env` and set `DATABASE_URL` to a valid PostgreSQL connection string (e.g. `postgresql://user:password@localhost:5432/dbname`).
- Ensure the database exists and migrations have been run (`npm run db:push` or `npm run db:migrate` from the API workspace).

**"Clerk not configured" screen**

- You need `VITE_CLERK_PUBLISHABLE_KEY` set in the root `.env` to a valid Clerk publishable key (starts with `pk_test_` and has more characters after it).
- The `.env` file must be in the **project root** (next to `package.json`), not inside `apps/web/`.
- After editing `.env`, **restart the dev server** (Ctrl+C, then `npm run dev`). Vite only reads env files at startup.
- Open the browser console (F12 → Console) and look for the `[Clerk config]` log to see what value the app received.

**API returns 401 on all requests**

- Set `CLERK_SECRET_KEY` in `.env` to your Clerk secret key (starts with `sk_test_`). Find it on the Clerk Dashboard → API Keys page (click "Reveal" or "Show" next to the secret key; only Admins can see it).
- Restart the dev server after adding it.

**Tauri dev/build fails**

- Install Rust: [tauri.app/start/install](https://tauri.app/start/install).
- Ensure the web app builds: `npm run build --workspace=@launch-kit-spa-desktop-switchdimension/web`.

## Additional resources

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Hono](https://hono.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/docs)
- [Tauri](https://tauri.app/)
- [React Router](https://reactrouter.com/)
