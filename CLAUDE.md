# Web Wellbeing — AI Development Context

## What Is This Project?
A cross-browser extension + built-in dashboard that monitors web usage, provides
focus tools (Pomodoro, site blocking), tracks resource usage (RAM, bandwidth), and
replaces the browser new tab page with a productivity dashboard.

## Critical Architecture Decisions
1. The dashboard IS the browser's new tab page — NOT a separate web app
2. Everything ships as a single extension bundle via WXT
3. Supabase is the backend (Postgres + Auth + Edge Functions)
4. The Supabase anon key is in the extension bundle → RLS is MANDATORY on every table
5. Auth uses PKCE flow with `chrome.identity.launchWebAuthFlow()`
6. Storage adapter maps Supabase client to `chrome.storage.local` (no localStorage in SW)
7. Service workers die after ~30s — ALL state in `chrome.storage`, heartbeat via `chrome.alarms`

## Data Flow
Extension (SW) → `chrome.storage.local` (buffer) → Supabase (batch sync every 5 min)  
Focus events → Supabase (real-time sync)  
Dashboard (new tab) ← `chrome.storage.local` (instant) + Supabase (historical)

## Key Constraints
- No `eval()`, no inline scripts, no remote code (MV3 CSP)
- `chrome.windows` has NO `.query()` method — use `getAll`/`getLastFocused`/`getCurrent`
- `chrome.processes` API is Chrome-only (not Firefox) — degrade gracefully
- New tab page must render instantly with zero network dependency
- All timestamps stored as UTC, displayed in user's timezone
- AI provider is BYOK (Bring Your Own Key) — keys stored ONLY in `chrome.storage.local`, NEVER sent to our backend

## Monorepo Structure
- `apps/extension/`: WXT extension (background, popup, newtab, content, options)
- `packages/shared/`: Types, constants, utils, validators (Zod)
- `packages/supabase/`: Client, storage adapter, queries, generated types, migrations
- `packages/ui/`: shadcn/ui components shared across extension pages
- `packages/eslint-config/`: Shared ESLint rules
- `packages/tsconfig/`: Shared TypeScript configs

## Commands
- `pnpm dev`: Start extension in dev mode with HMR
- `pnpm build`: Build for production (Chrome + Firefox)
- `pnpm test`: Run all unit tests (Vitest)
- `pnpm test:e2e`: Run E2E tests (Playwright)
- `pnpm lint`: Lint all packages
- `pnpm typecheck`: TypeScript check all packages
- `pnpm db:generate`: Generate Supabase types
- `pnpm db:migrate`: Run Supabase migrations

## Testing
- Unit tests: Vitest, colocated with source, mock `chrome.*` APIs
- E2E tests: Playwright with `chromium.launchPersistentContext` + extension loading
- Coverage target: >80% for `packages/shared`, >70% for extension logic
- E2E tests run headed (extensions require it) with xvfb in CI

## Environment Variables
- `VITE_SUPABASE_URL=https://xxx.supabase.co`
- `VITE_SUPABASE_ANON_KEY=eyJ...`
# AI keys are NEVER in env — they live in `chrome.storage.local` per user (BYOK)
