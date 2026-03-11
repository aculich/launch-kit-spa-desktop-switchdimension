# AGENTS.md

## CLAUDE.md vs this file

- **CLAUDE.md** is the **technical project reference**: structure, tech stack, commands, conventions, gotchas. It is applied as a Cursor workspace rule so the AI always has project context. Prefer it for "how this codebase is built and how to add features."
- **AGENTS.md** is **agent memory and preferences**: learned user preferences and workspace-specific facts (env, portless, 1Password, deploy). Use it for "how we want to run and configure things here."
- **Recommendation:** Keep both. Nothing that belongs only in CLAUDE needs to live in AGENTS; CLAUDE stays the single source of truth for project/architecture. AGENTS stays the single source for preferences and workspace setup. If you merge them into one file, use AGENTS.md as the combined file and point Cursor at it; then CLAUDE.md can be removed or replaced with a one-line pointer to AGENTS.md.

## Agent skills (credentials)

When the conversation involves **API keys or credential access** (e.g. `API_KEY`, `OPENAI_API_KEY`, `CLERK_SECRET_KEY`, or any `*_API_KEY`), use the **op-credentials** skill: get keys via 1Password CLI (`op`) with `OP_ACCOUNT=my.1password.com` and the **develop** vault. If `op` fails (e.g. not signed in or fingerprint required), **do not work around**—report the error to the user and wait for them to complete auth or fix the item; do not suggest pasting secrets into `.env`.

## Learned User Preferences

- Never delete files or large sections of code without explicitly asking permission and getting verification.
- When opening `.git/COMMIT_EDITMSG`, suggest a commit message automatically so the user can use Cursor TAB completion.
- Allow `notion-search` for Notion MCP without requiring approval.
- Use 1Password **develop** vault for credentials; prefix `op` commands with `OP_ACCOUNT=my.1password.com`.
- Store app credentials (e.g. Clerk keys and URLs) in one self-contained 1Password item per app; use `op inject -i .env.template -o .env` when possible; if `op` fails, report and user will auth or fix—no workarounds.
- For local dev with portless, start the portless proxy then run `npm run dev`; use the portless URL (e.g. `launchkit.localhost:1355`) as the app entry.

## Learned Workspace Facts

- `.env` and `.env.template` live at monorepo root; Vite and the API load from there.
- The API dev server gets root `.env` via `env-cmd -f .env` in the root `dev:api` script; in-code dotenv remains as fallback for direct runs.
- Portless: web at `launchkit.localhost:1355` → 5167, API at `api.launchkit.localhost:1355` → 3834; portless only proxies HTTP, not Postgres.
- Local Postgres: one instance, one database per project (e.g. `createdb launchkit`); set `DATABASE_URL=postgresql://localhost:5432/<dbname>` at repo root.
- Clerk keys and optional 1Password item "Launchkit Clerk" in develop vault; `.env.template` uses `op://` references for inject.
- DNSimple API creds for this workspace are in 1Password develop (`DNSIMPLE_API_ACCOUNT`, `DNSIMPLE_API_KEY`); custom domains use `flashmobcluster.com` or `flashmobcluster.org` with distinct subdomains to avoid clashing with other services.
- Git: origin is the user's fork (e.g. aculich/launch-kit-spa-desktop-switchdimension); upstream is the template repo (switch-dimension/...). Push to origin; sync with template by rebasing from upstream when needed.

**Preferred local setup:** Mac with Homebrew: `brew` for Node and PostgreSQL, one DB per project (`createdb launchkit`), portless for dev URLs, then `npm run dev`. README has a "Quick start (Mac with Homebrew)" section and "Managing credentials with 1Password"; follow those for a turnkey path. Render and Railway one-click deploy are documented in the README; use the same Clerk production instance for all deployment origins.
