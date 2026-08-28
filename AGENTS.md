# Web Wellbeing — Agent Guidelines

## Project Overview

Web Wellbeing is a cross-browser extension (Chrome + Firefox) that monitors web usage,
provides focus tools, and replaces the browser's new tab page with an intelligent
productivity dashboard. The entire product ships as a single extension bundle — there
is NO separate web application.

## Architecture

- Monorepo: pnpm workspaces + Turborepo
- Extension: WXT (Vite-based), Manifest V3
- Dashboard: React + React Router (bundled in extension as new tab override)
- UI: shadcn/ui + Radix + Tailwind CSS v4
- Backend: Supabase (Postgres, Auth, Edge Functions, RLS)
- State: Zustand
- Charts: Recharts
- Testing: Vitest (unit/integration) + Playwright (E2E)
- CI/CD: GitHub Actions

## Strict Test-Driven Development (TDD) Guidelines

### TDD Cycle Mandate (Red -> Green -> Refactor)

1. **Red**: Write failing unit & integration tests FIRST that define the expected behavior, edge cases, error states, and contracts before writing implementation logic.
2. **Green**: Write the minimum code required to make the tests pass.
3. **Refactor**: Clean up the implementation while keeping all tests passing.
4. **Verification**: Run complete test suites (`pnpm test` & `pnpm build`) and E2E tests before committing.

### Testing Standards (FIRST Principles)

- **Fast**: Unit tests complete in <3s. No real network, no real browser.
- **Independent**: Each test creates its own state. No shared mutable fixtures.
- **Repeatable**: Deterministic. Mock time, mock network, seed data.
- **Self-validating**: Explicit assertions asserting exact state, UI rendering, style application, and error conditions. No trivial `toBeDefined()` checks.
- **Timely**: Tests written BEFORE/WITH features, never after. PRs without comprehensive behavioral unit tests will be rejected.

### Code Coverage & Edge Case Mandate

- Minimum 85% line and branch coverage across all business logic, stores, strategies, and utilities.
- Every function/component MUST test:
  - Happy path standard execution
  - Boundary conditions (0, negative, max limits, empty inputs, null/undefined handling)
  - Error states (network failures, invalid JSON, unexpected API responses, DOM missing elements)
  - State mutations & UI re-renders
  - Visual styling integrity (CSS imports, Tailwind classes presence)

### Playwright E2E Testing Mandate

- Extension pages (New Tab Dashboard, Popup, Options) MUST have Playwright E2E tests running against a built extension context (`chromium.launchPersistentContext`).
- E2E tests must verify:
  - New tab page override loads with CSS styles applied cleanly without unstyled HTML flashes.
  - Sidebar navigation routes between dashboard views correctly.
  - Theme toggling (Dark / Light mode) applies background and text classes correctly.
  - Background tracking service worker communicates with dashboard stores.

## Code Quality Standards

### TypeScript Strictness

- `strict: true` in all tsconfig files — no exceptions
- No `any` types — use `unknown` with type guards or proper generics
- No type assertions (`as`) unless absolutely necessary with a comment explaining why
- Prefer discriminated unions over optional fields for state modeling
- Use branded types for domain IDs: `type UserId = string & { __brand: 'UserId' }`
- Use `satisfies` over `as` for compile-time type checking with inference preservation
- Use exhaustive switch statements with `never` for union type handling
- Prefer `readonly` arrays and objects for immutable data

### SOLID Principles

- **S - Single Responsibility**: Each class/module does one thing.
- **O - Open/Closed**: Use strategy pattern for extensibility.
- **L - Liskov Substitution**: Interfaces define contracts. Any implementation must be substitutable.
- **I - Interface Segregation**: Small, focused interfaces.
- **D - Dependency Inversion**: Core business logic depends on abstractions, not concrete implementations.

### Design Patterns

- **Strategy Pattern**: For sync strategies (batch vs real-time), break themes, AI providers
- **Observer Pattern**: For tracking state changes, storage updates, focus state broadcasts
- **Factory Pattern**: For creating activity records, session objects, notification configs
- **Repository Pattern**: For data access layer (Supabase queries abstracted behind interfaces)
- **Command Pattern**: For user actions that need undo/logging (start focus, set goal)
- **State Machine Pattern**: For tracking engine states (idle, tracking, paused, syncing)
- **Singleton Pattern**: ONLY for service worker global state manager (via chrome.storage)

### React & UI Patterns

- **Styling**: Tailwind CSS v4. CSS file (`globals.css`) MUST be imported in all entry points (`main.tsx`).
- **Component Composition**: Use compound components and slot patterns over prop drilling.
- **Custom Hooks**: Extract ALL business logic into custom hooks. Components are render-only.
- **Container/Presenter**: Separate data-fetching from rendering.
- **Error Boundaries**: Wrap every major view section. Never let one component crash the dashboard.
- **Lazy Loading**: React.lazy + Suspense for dashboard views.

### File Naming & Commit Conventions

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utils: `kebab-case.ts`
- Types: `kebab-case.types.ts`
- Tests: `*.test.ts` or `*.test.tsx` colocated with source
- Conventional Commits enforced (`feat`, `fix`, `test`, `refactor`, `chore`, `ci`, `docs`, `style`, `perf`).

### Professional Formatting Standards

- Maintain strict professional formatting across all project manifests, CI workflows, logs, and commit logs. Avoid decorative unicode pictorial symbols in system configurations, workflow labels, and source documentation unless strictly functional for user-facing UI controls.
