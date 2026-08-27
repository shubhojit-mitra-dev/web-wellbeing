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
- Testing: Vitest (unit) + Playwright (E2E)
- CI/CD: GitHub Actions

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
- **S - Single Responsibility**: Each class/module does one thing. A TrackingEngine does not also handle syncing. A FocusManager does not also render UI.
- **O - Open/Closed**: Use strategy pattern for extensibility (e.g., different sync strategies, different break themes). New behavior via new implementations, not modifying existing code.
- **L - Liskov Substitution**: Interfaces define contracts. Any implementation of `ISyncStrategy` must be substitutable without breaking callers.
- **I - Interface Segregation**: Small, focused interfaces. `ITrackable` is separate from `ISyncable`. Don't force consumers to depend on methods they don't use.
- **D - Dependency Inversion**: Core business logic depends on abstractions (interfaces), not concrete implementations. Inject dependencies via constructor or factory functions.

### Design Patterns
- **Strategy Pattern**: For sync strategies (batch vs real-time), break themes, AI providers
- **Observer Pattern**: For tracking state changes, storage updates, focus state broadcasts
- **Factory Pattern**: For creating activity records, session objects, notification configs
- **Repository Pattern**: For data access layer (Supabase queries abstracted behind interfaces)
- **Command Pattern**: For user actions that need undo/logging (start focus, set goal)
- **State Machine Pattern**: For tracking engine states (idle, tracking, paused, syncing)
- **Singleton Pattern**: ONLY for service worker global state manager (via chrome.storage)

### React Patterns
- **Component Composition**: Use compound components and slot patterns over prop drilling
- **Custom Hooks**: Extract ALL business logic into custom hooks. Components are render-only.
- **Container/Presenter**: Separate data-fetching (containers) from rendering (presenters)
- **Render Props / Children as Function**: For flexible component APIs when needed
- **Error Boundaries**: Wrap every major section. Never let one component crash the dashboard.
- **Lazy Loading**: React.lazy + Suspense for dashboard views (analytics, settings, reports)
- **Controlled Components**: All form inputs are controlled. No uncontrolled refs for data.

### Memoization Rules
- `React.memo()` every list item component and any component receiving stable object props
- `useMemo()` for derived data computations (chart data transformations, filtered lists)
- `useCallback()` for event handlers passed to memoized children
- NEVER prematurely memoize — only when profiler confirms re-render cost
- Use `React.lazy()` for code-splitting dashboard views

### Component Architecture
```text
components/
├── ui/          # Primitive UI (Button, Input, Card) — from shadcn/ui
├── composed/    # Composite components (StatCard, ChartPanel, TimerDisplay)
├── features/    # Feature-specific (FocusTimer, DistractionList, ActivityTimeline)
├── layouts/     # Layout shells (DashboardLayout, SidebarLayout)
└── providers/   # Context providers (ThemeProvider, AuthProvider, TrackingProvider)
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `ActivityChart.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-tracking-data.ts`)
- Utils: `kebab-case.ts` (e.g., `domain-parser.ts`)
- Types: `kebab-case.types.ts` (e.g., `activity.types.ts`)
- Constants: `SCREAMING_SNAKE_CASE` for values, `kebab-case.ts` for files
- Tests: `*.test.ts` or `*.test.tsx` colocated with source

### Commit Convention
All commits MUST follow Conventional Commits:
- `feat(scope)`: Add new feature
- `fix(scope)`: Fix a bug
- `docs(scope)`: Documentation only changes
- `test(scope)`: Add or update tests
- `refactor(scope)`: Code change that neither fixes a bug nor adds a feature
- `chore(scope)`: Build process or auxiliary tool changes
- `ci(scope)`: CI configuration changes
- `perf(scope)`: Performance improvements
- `style(scope)`: Code formatting (no logic changes)

### Testing Standards (FIRST)
- **Fast**: Unit tests complete in <3s. No real network, no real browser.
- **Independent**: Each test creates its own state. No shared mutable fixtures.
- **Repeatable**: Deterministic. Mock time, mock network, seed data.
- **Self-validating**: Explicit assertions. No manual inspection.
- **Timely**: Tests written WITH features, not after. PRs without tests for new logic will be rejected.

### Chrome Extension Rules
- NEVER store state in service worker global variables (dies after 30s)
- ALL event listeners registered synchronously at top level of service worker
- Use `chrome.alarms` for scheduled work, NEVER `setTimeout`/`setInterval`
- Use `chrome.storage.session` for ephemeral state, `chrome.storage.local` for persistent
- Tab URL/title access requires `"tabs"` permission
- Always return true from onMessage listeners when using async `sendResponse`
- New tab page must load instantly — no network requests on initial render

### Import Order
1. React/external libraries
2. Internal packages (`@web-wellbeing/shared`, `@web-wellbeing/ui`)
3. Local components
4. Local hooks
5. Local utils/types
6. CSS/styles (always last)

Blank line between each group.

### Error Handling
- Use `Result<T, E>` pattern for operations that can fail
- Never swallow errors silently — log with context
- User-facing errors must be human-readable
- Network errors must trigger retry with exponential backoff
- Supabase errors must not leak to UI — wrap in domain errors
