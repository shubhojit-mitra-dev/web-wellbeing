# Web Wellbeing — AI Development Context & TDD Guidelines

## What Is This Project?

A cross-browser extension + built-in dashboard that monitors web usage, provides
focus tools (Pomodoro, site blocking), tracks resource usage (RAM, bandwidth), and
replaces the browser new tab page with a productivity dashboard.

## Critical Architecture & Design Decisions

1. The dashboard IS the browser's new tab page — NOT a separate web app.
2. Everything ships as a single extension bundle via WXT.
3. CSS styles (`src/styles/globals.css`) MUST be imported at every React entry point (`main.tsx`) so Tailwind v4 processes and injects styles into HTML.
4. Supabase is the backend (Postgres + Auth + Edge Functions).
5. Storage adapter maps Supabase client to `chrome.storage.local` (no localStorage in SW).
6. Service workers die after ~30s — ALL state in `chrome.storage`, heartbeat via `chrome.alarms`.

## Professional Formatting & Tone Standards

- Maintain clean, professional formatting across all workflow definitions, log messages, commit messages, and source documentation. Do NOT use decorative non-text pictorial symbols in configurations or workflow names.

## TDD & Quality Assurance Principles

- **Strict TDD Workflow**: Write unit/integration tests covering happy paths, edge cases, error states, and DOM style assertions BEFORE or WITH implementation code.
- **FIRST Testing Standard**: Fast, Independent, Repeatable, Self-Validating, Timely.
- **E2E Visual & Functional Verification**: Playwright tests verify extension loading, CSS style rendering, tab overrides, and navigation.

## Commands

- `pnpm dev`: Start extension in dev mode with HMR
- `pnpm build`: Build for production (Chrome + Firefox)
- `pnpm test`: Run all unit/integration tests (Vitest)
- `pnpm test:e2e`: Run Playwright E2E browser tests
- `pnpm lint`: Lint all packages
- `pnpm typecheck`: TypeScript check all packages
