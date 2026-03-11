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

## Quick start (Mac with Homebrew)

Shortest path to a running app on macOS with Homebrew:

1. **Install dependencies**
   ```bash
   brew install node postgresql@17
   brew services start postgresql@17
   ```
   Optional: [portless](https://github.com/portless/portless) for stable dev URLs (e.g. `http://launchkit.localhost:1355`). Install and start the portless proxy before `npm run dev` if you use it.

2. **Clone, install, database**
   ```bash
   git clone https://github.com/aculich/launch-kit-spa-desktop-switchdimension.git my-app && cd my-app
   npm install
   createdb launchkit
   ```
   Copy env: `cp .env.example .env` (or use 1Password inject — see [Managing credentials with 1Password](#managing-credentials-with-1password)). Set `DATABASE_URL=postgresql://localhost:5432/launchkit` in `.env`, then:
   ```bash
   npm run db:push --workspace=@launch-kit-spa-desktop-switchdimension/api
   ```

3. **Clerk**  
   Create an app at [clerk.com](https://clerk.com), copy Publishable and Secret keys into `.env` as `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY` (see [Set up Clerk](#3b-set-up-clerk-authentication)).

4. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5167](http://localhost:5167). If you use portless, start it first and open [http://launchkit.localhost:1355](http://launchkit.localhost:1355) instead.

To stay in sync with the upstream template: `git remote add upstream https://github.com/switch-dimension/launch-kit-spa-desktop-switchdimension.git` (or the original repo URL), then `git fetch upstream && git rebase upstream/main` when you want to pull in updates.

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

Copy the example env file:

```bash
cp .env.example .env
```

You need a PostgreSQL database. Set one up **locally** or in the cloud with **[NeonDB](https://neon.tech)** or **[Supabase](https://supabase.com)**:

- **Local Postgres (one instance, one DB per project):** Use a single Postgres install and create one database per app (e.g. `launchkit` for this repo). [Portless](https://github.com/portless/portless) only proxies HTTP (Vite/API); the API connects to Postgres via `DATABASE_URL` on `localhost:5432`, so no portless config is needed for the DB.
  - **macOS (Homebrew):** Start Postgres, create a DB, set `.env`:
    ```bash
    brew services start postgresql@17   # or postgresql@16, etc.
    createdb launchkit                  # one DB per project
    ```
    In `.env`: `DATABASE_URL=postgresql://localhost:5432/launchkit` (no password needed for default local trust auth). Then run `npm run db:push --workspace=@launch-kit-spa-desktop-switchdimension/api`.
  - **Other local setups:** Install PostgreSQL, create a database, and set `DATABASE_URL` in `.env` (e.g. `postgresql://user:password@localhost:5432/your_db`).
- **NeonDB:** If you have the [Neon CLI](https://neon.tech/docs/reference/cli-install) installed, ask your AI agent to create a new database and save the connection string to `.env`. Or create a project at [neon.tech](https://neon.tech), copy the connection string from the dashboard, and paste it into `.env`.
- **Supabase:** Create a project at [supabase.com](https://supabase.com), go to **Settings → Database**, copy the connection string (URI format), and paste it into `.env`.

Once `DATABASE_URL` is set, run migrations from the API package (or use `db:push` for prototyping):

```bash
npm run db:push --workspace=@launch-kit-spa-desktop-switchdimension/api
# Or: npm run db:migrate --workspace=@launch-kit-spa-desktop-switchdimension/api
```

### 3b. Set up Clerk (authentication)

The app uses [Clerk](https://clerk.com) for authentication. Without keys the app shows a "Clerk not configured" screen with setup instructions.

**No CLI or API for creating applications.** Clerk does not provide a public CLI or REST API to create a new Clerk application or to obtain the publishable/secret key pair (`pk_test_` / `sk_test_`) programmatically. Creating an application and copying API keys is a one-time manual step in the [Clerk Dashboard](https://dashboard.clerk.com). The [Clerk CLI](https://github.com/clerk/cli) (early access) is for using an *existing* secret key to manage resources, not for creating applications.

1. Create a free account at [clerk.com](https://clerk.com) and create an application. When prompted to choose a framework, select **React**.
2. In the Clerk Dashboard, go to **API Keys**. The dashboard will show keys using Next.js naming conventions:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
   **This project uses Vite, not Next.js**, so the variable names are different. Copy the key **values** and set them in `.env` using the names below:

   | Clerk Dashboard shows | Set in `.env` as | Used by |
   |---|---|---|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...` | `VITE_CLERK_PUBLISHABLE_KEY=pk_test_...` | Vite frontend |
   | *(same publishable key value)* | `CLERK_PUBLISHABLE_KEY=pk_test_...` | Hono API (`@hono/clerk-auth`) |
   | `CLERK_SECRET_KEY=sk_test_...` | `CLERK_SECRET_KEY=sk_test_...` | Hono API (JWT verification) |

   The publishable key appears twice with different prefixes: `VITE_` is required for Vite to expose it to the browser, and the unprefixed `CLERK_PUBLISHABLE_KEY` is what the API middleware expects. Use the same `pk_test_...` value for both.
3. The **Publishable Key** is all you need to get sign-in and sign-up working. The **Secret Key** is needed for the API to verify JWTs (protect `/api/todos`, `/api/users`, etc.).
4. If you can't see the Secret Key, look for a **"Reveal"** or **"Show"** button next to it on the API Keys page. Only account **Admins** can reveal it.
5. Ensure your Clerk application's allowed redirect URLs include your dev URLs. Add at least:
   - `http://localhost:5167` (direct Vite port)
   - If you use [portless](https://github.com/portless/portless): `http://launchkit.localhost:1355` (and optionally `https://launchkit.localhost:1355`). Add these in Clerk Dashboard → **Configure** → **Paths** (or **Settings** → **Domains** / redirect allowlist).

> **Important:** When you first open the app, click **Sign up** to create an account before trying to sign in. There are no existing users until you register one.

> **Note:** The `.env` file lives in the **project root** (same folder as `package.json`). Vite is configured to load env vars from there via `envDir` in `apps/web/vite.config.ts`. Do not put your `.env` inside `apps/web/`.

### Managing credentials with 1Password

If you use the 1Password CLI (`op`), keep one **1Password item per app** (e.g. "Launchkit Clerk") in a vault like **develop**, and reference secrets in a template file so you never commit real values.

- **Template:** Keep `.env.template` with `op://` references (e.g. `op://develop/Launchkit Clerk/VITE_CLERK_PUBLISHABLE_KEY`). Do not commit `.env`.
- **Inject:** Run `OP_ACCOUNT=my.1password.com op inject -i .env.template -o .env` to write resolved values into `.env`. Use the same account prefix for all `op` commands if your setup requires it.
- **Best practice:** One item per app; use `op inject` and avoid workarounds. If `op` fails (e.g. not signed in), fix auth or the item — don’t paste secrets into the repo.
- After inject, set any local-only vars in `.env` (e.g. `DATABASE_URL=postgresql://localhost:5432/launchkit`).

### 4. Run the app

```bash
npm run dev
```

- **Web app:** [http://localhost:5167](http://localhost:5167) — or, if you use [portless](https://github.com/portless/portless), [http://launchkit.localhost:1355](http://launchkit.localhost:1355) (portless proxies to 5167).
- **API:** [http://localhost:3834](http://localhost:3834) (e.g. [http://localhost:3834/api/health](http://localhost:3834/api/health)); with portless, [http://api.launchkit.localhost:1355](http://api.launchkit.localhost:1355) → 3834.

Open the web app URL in your browser. The frontend proxies `/api` to the API in development, so you don’t need CORS. After changing `.env` (e.g. adding Clerk keys), restart the dev server (Ctrl+C, then `npm run dev`) and hard-refresh the browser (Cmd+Shift+R / Ctrl+Shift+R) or use an incognito window.

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
├── .agents/skills/          # Agent skills (canonical path per [Cursor](https://cursor.com/docs/skills) / [Agent Skills](https://agentskills.io))
├── package.json             # Workspaces + root scripts
└── tsconfig.base.json
```

- **`.agents/skills/`** — Project-level agent skills (each subdir has `SKILL.md`). Use this path only; `.agent/skills/` (singular) is non-standard.
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

## One-click deploy (Render & Railway)

You can deploy this repo to **Render** or **Railway** and then wire up Clerk (and optional custom domains). Use **one Clerk production instance** for both platforms: add all deployment URLs (Render, Railway, and any custom domains) to Clerk's allowed redirect/sign-in URLs. That is not problematic—Clerk supports multiple origins per application.

### Deploy to Render

The repo includes a [Render Blueprint](https://render.com/docs/blueprint-spec) (`render.yaml`) that defines a **Postgres database**, a **Node API** service, and a **static site** (Vite SPA).

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aculich/launch-kit-spa-desktop-switchdimension)

> **This fork:** The button above points at this repo. To deploy from the upstream template instead, use `repo=https://github.com/switch-dimension/launch-kit-spa-desktop-switchdimension` (or the current upstream URL) in the deploy link.

1. Click the button, connect the repo, and create the Blueprint. Render will create `launchkit-db`, `launchkit-api`, and `launchkit-web`.
2. In the **Dashboard**, set environment variables (they are marked *sync: false* in the Blueprint so you provide values once):
   - **launchkit-api:** `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (use your [Clerk production keys](https://clerk.com/docs/guides/development/deployment/production) — `pk_live_...` and `sk_live_...`).
   - **launchkit-web:** `VITE_CLERK_PUBLISHABLE_KEY` (same `pk_live_...`), `VITE_API_URL` (your API URL, e.g. `https://launchkit-api.onrender.com`).
3. In the [Clerk Dashboard](https://dashboard.clerk.com) (production instance), add your Render URLs to **Configure → Paths** (or **Domains** / redirect allowlist): e.g. `https://launchkit-web.onrender.com` and your API URL if needed for redirects.
4. Redeploy the web service after setting `VITE_API_URL` so the frontend is built with the correct API base URL.

### Deploy to Railway

Railway uses **templates** for one-click deploy. Create a template from this project, then add the deploy button to your README.

1. In [Railway](https://railway.com), create a new project from this repo (or your fork). Add a **Web Service** for the API (root dir `apps/api`, build `npm install && npm run build`, start `npm start`) and a **Static Site** (or second service) for the frontend (build from root, output `apps/web/dist`). Add a **Postgres** plugin and connect it to the API via `DATABASE_URL`. Configure Clerk env vars as above.
2. In **Workspace → Templates**, use **Generate Template from Project** to create a template. Copy the template URL.
3. Add the deploy button to your README (replace `YOUR_TEMPLATE_ID` with the ID from the template URL):

   ```markdown
   [![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/YOUR_TEMPLATE_ID?utm_medium=integration&utm_source=button&utm_campaign=launchkit)
   ```

4. In the Clerk Dashboard (production instance), add your Railway URLs (e.g. `https://your-app.up.railway.app`) to the allowed redirect/sign-in list.

### Clerk production and custom domains

- **Same Clerk for Render and Railway:** Use one Clerk **production** instance; add every deployment origin (Render, Railway, and any custom domains) to Clerk's allowed URLs. See [Deploy your Clerk app to production](https://clerk.com/docs/guides/development/deployment/production).
- **Custom domains (e.g. DNSimple):** For `flashmobcluster.com` / `flashmobcluster.org`, add CNAME (or A) records for your chosen subdomains (e.g. `launchkit.flashmobcluster.com` → Render/Railway). Then add `https://launchkit.flashmobcluster.com` (and API subdomain if used) to Clerk. DNSimple API credentials are in 1Password **develop** vault (`DNSIMPLE_API_ACCOUNT`, `DNSIMPLE_API_KEY`) for automation; if you have other services on the same domain, use distinct subdomains to avoid conflicts.

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
| `CLERK_PUBLISHABLE_KEY` | API (`@hono/clerk-auth` middleware) | Yes — API fails silently without it |
| `CLERK_SECRET_KEY` | API (JWT verification) | Yes — API returns 401 without it |

All three go in the root `.env` file. `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_PUBLISHABLE_KEY` use the same `pk_test_...` value.

### What happens without keys

- **No Publishable Key:** The app shows a full-page "Clerk not configured" screen with step-by-step setup instructions.
- **No Secret Key:** The frontend works (sign-in, sign-up, navigation), but all API calls to protected routes return `401 Unauthorized`.

**In-app errors:** Pages that call the API (e.g. Todos) show setup and API errors in the UI (not only in the console). If you see "Sign-in required" or "Request failed (401)", add the Clerk keys to `.env` and restart the API; for 500 errors, check `DATABASE_URL` and that the database is running. The app guides you through each step of the devops setup where human intervention is needed.

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
3. **Set up Clerk**: Create a Clerk application and add `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY` to `.env` (see [Set up Clerk](#3b-set-up-clerk-authentication) for the key name mapping).
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

**API returns 401 on all requests or fails silently**

- Make sure **all three** Clerk variables are set in `.env`: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY`. The Clerk dashboard shows `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — copy that value into both `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_PUBLISHABLE_KEY`.
- `CLERK_PUBLISHABLE_KEY` (no prefix) is required by `@hono/clerk-auth`. If it's missing the API will throw "Missing Clerk Publishable key" on every request.
- `CLERK_SECRET_KEY` starts with `sk_test_`. Find it on the Clerk Dashboard → API Keys page (click "Reveal" or "Show"; only Admins can see it).
- Restart the dev server after editing `.env`.

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
