# SiliconPath

Learning platform for VLSI careers: course catalog, mock-interview browsing and a learner dashboard (RTL design, physical design, verification).

## Stack
TanStack Start, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui (new-york, slate), Vite, Vitest. Package manager: npm or bun.

## Commands
- `npm run dev` start the dev server
- `npm run lint` ESLint + Prettier check
- `npm test` Vitest (jsdom)
- `npm run build` production build
Run lint, test and build before saying a task is done.

## Product rules
- The home route holds the dashboard, course catalog and mock-interview browsing. Learners search, filter and preview in place.
- Layout rules live in `src/styles.css`. Reuse semantic tokens for every surface and state so views and dialogs stay consistent.
- Do not add new colors or fonts outside the tokens. Ask the designer first.

## Code rules
- Use the `@/` alias for imports from `src/`.
- tsconfig is strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`): handle undefined values properly, do not silence errors.
- Keep components small. Put data in its own file, not inside route components.
- shadcn components live in `src/components/ui`. Add new ones with the shadcn CLI, avoid editing them by hand.
- `@lovable.dev/vite-tanstack-config` already registers the TanStack, React, Tailwind and Nitro plugins. Do not add them again in `vite.config.ts`.
- `bunfig.toml` has a 24 hour package-age guard. Do not bypass it without asking.
- Never commit secrets or `.env` files.

## Git workflow
- One branch per task: `feature/<name>` or `fix/<name>`. Never push straight to `main`.
- Small commits with clear messages. Open a PR and get one approval before merging.
- Never force push or rewrite published history.

## Who owns what
- Designer: `src/styles.css`, design tokens
- Frontend A: courses, lessons, progress
- Frontend B: interviews, booking, shared dialogs
- Backend: database, auth, payments
- QA and content: `src/test/*`, lesson and question data
Do not edit another person's area without asking.
