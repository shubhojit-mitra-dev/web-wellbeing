# Contributing to Web Wellbeing

Thank you for your interest in contributing to Web Wellbeing!

## Code of Conduct

Please review and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) in all project interactions.

## Development Workflow

We follow a strict **Git Flow** variant:

1. **`main`**: Production releases. Tagged versions.
2. **`develop`**: Active integration branch.
3. **`feature/phase-XX-name`**: Feature branches for specific phases.

### Commit Messages

All commit messages MUST follow Conventional Commits format:

```text
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`  
**Scopes**: `repo`, `tooling`, `extension`, `shared`, `types`, `utils`, `supabase`, `ci`, `tracking`, `auth`, `sync`, `dashboard`, `popup`, `focus`, `pomodoro`, `overlay`, `ram`, `network`, `onboarding`

### Pull Request Process

1. Create a branch from `develop`.
2. Ensure all 15+ atomic commits are well-formed.
3. Verify local verification commands pass:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```
4. Open a Pull Request targeting `develop`.
5. Squash merging is disabled; commit history must be preserved.

## Code Quality Standards

Please consult [`AGENTS.md`](./AGENTS.md) for full architectural guidelines, SOLID principles, React design patterns, and TypeScript strictness rules.
