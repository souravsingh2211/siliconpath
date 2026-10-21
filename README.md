# SiliconPath

Learning platform for VLSI careers: courses, mock interviews and a learner dashboard (RTL design, physical design, verification).

**Stack:** TanStack Start, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Vite, Vitest.

## Run locally
Node 22 LTS recommended (`node -v`).

```sh
git clone <repo-url>
cd siliconpath
npm install
npm run dev
```

Open the localhost link shown in the terminal.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-format files |
| `npm test` | Run tests |
| `npm run build` | Production build |

## Folders
```
src/routes/               pages (home route has dashboard, courses, interviews)
src/components/ui/        shadcn components (do not hand-edit)
src/components/courses/   course components
src/components/interviews/ interview components
src/components/shared/    shared components
src/data/                 courses, lessons, interview questions
src/styles.css            global styles and design tokens
src/test/                 tests
docs/                     team plan and Git guide
```

## Team
Read `docs/TEAM.md` (who does what) and `docs/GIT_GUIDE.md` (how to push and pull).
Environment variables: copy `.env.example` to `.env.local`.
