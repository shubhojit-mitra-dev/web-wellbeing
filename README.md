# 🧠 Web Wellbeing

> An AI-powered browser companion that replaces your Chrome & Firefox new tab page with a privacy-respecting, intelligent productivity dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)

---

## 🌟 Features

- 🕐 **Precision Time Tracking**: Multi-window & focus-aware tab tracking with idle detection and media playback awareness.
- 🏠 **Dashboard-as-Homepage**: Replaces default new tab page (`chrome://newtab`) with a rich React SPA dashboard.
- 💬 **AI Daily Intent Companion**: Set daily goals in natural language; AI tracks progress contextually.
- 🚫 **Focus Mode & Hard Blocking**: Enforce deep work sessions with hard tab closing and unobtrusive floating notifications.
- ⏱️ **Customizable Pomodoro**: Fully configurable work/break cycles with digital sunset visual overlays.
- 📱 **Resource Monitor**: RAM tracking per tab with cleanup notifications and network data budget alerts.
- 📊 **Rich Analytics**: Visualized timelines, category breakdowns, context switching metrics, and trend lines.
- 🔒 **Privacy-First & Cloud-Synced**: Local-first storage with Supabase cloud backup via Row-Level Security (RLS).

---

## 🏗️ Architecture & Tech Stack

- **Monorepo**: pnpm Workspaces + Turborepo
- **Extension**: WXT (Vite-based), Manifest V3 for Chromium & Firefox
- **Dashboard**: React 19 + React Router (bundled inside extension)
- **UI & Styling**: Tailwind CSS v4 + shadcn/ui + Radix UI
- **Backend & Auth**: Supabase (Postgres, RLS, PKCE OAuth, Edge Functions)
- **State & Charts**: Zustand + Recharts
- **Testing**: Vitest (Unit) + Playwright (E2E with extension persistence)
- **CI/CD**: GitHub Actions for verification, packaging, and store publishing

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0

### Development Setup

```bash
# Clone repository
git clone https://github.com/shubhojit-mitra-dev/web-wellbeing.git
cd web-wellbeing

# Install dependencies
pnpm install

# Start extension in development mode (Chrome)
pnpm dev

# Start extension in development mode (Firefox)
pnpm --filter extension dev:firefox
```

### Verification & Testing

```bash
# Run type checking
pnpm typecheck

# Run linter
pnpm lint

# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.
