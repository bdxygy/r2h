# R2H Project Agent Guide

## Build/Lint/Test Commands
```bash
pnpm dev      # Start development server with HMR (Rspack watch mode)
pnpm build    # Production build with JS obfuscation
pnpm start    # Run production server from _module/
```

## Code Style & Conventions
- **TypeScript**: Strict mode enabled, avoid `any` types
- **Imports**: Use path aliases `$client/`, `$server/`, `$shared/` (no relative imports)
- **Naming**: PascalCase components, camelCase functions, kebab-case files
- **Styling**: Tailwind CSS only via `cn()` utility from `$client/libs/utils`
- **Components**: Functional React with hooks, use shadcn/ui from `$client/components/ui/`
- **SSR Data**: Use `useServerQuery` hook for server-side data fetching
- **Auth**: Better-Auth with Drizzle adapter, protect routes via `auth.api.getSession()`
- **Errors**: Robust error handling in Hono routes, React Error Boundaries client-side
- **Formatting**: Prettier configured, 80-100 char line length
- **Package Manager**: Use bun or pnpm only (prefer bun)

## Project Structure
- `client/` - React app (components, pages, hooks)
- `server/` - Hono API (routes, auth, SSR)
- `shared/` - Shared types and utilities
- `_module/` - Build output (gitignored)

See `.cursor/rules/CODE_CONVENTIONS.mdc` for detailed conventions.