# To-Do App (React, TypeScript, TanStack Start)

A small, mobile-first to-do app with a dark theme. Tasks are stored in the browser
(`localStorage`): no database, no accounts.
Built as an experiment in prompt-driven development with Lovable.

**Live demo:** https://modern-do-magic.lovable.app

<img width="420" alt="To-do app on a phone-sized screen" src="https://github.com/user-attachments/assets/0f240d44-9406-4deb-afbe-047ec094fa6c" />

## Features

- Add, complete and delete tasks
- Active tasks on top, completed tasks in their own section
- Tasks persist in `localStorage`
- Loading row while tasks are read, error message if stored data is unavailable or corrupted
- Responsive single-column layout, dark theme, styles in plain CSS (variables, flexbox, media queries)

## Tech

React 19, TanStack Start / Router (file-based routing), TypeScript, Vite, ESLint, Prettier.

## How this was built

I wrote the requirements and the prompts; Lovable generated and edited the code.
I iterated in seven steps: a first version with the basic features, a simplification, a
dark mobile-first redesign, code optimisation, removal of Tailwind and the component
library (42 unused packages), then loading/error states. The full prompt history is in
[`prompts.md`](prompts.md).

## Project structure

```text
src/
├── routes/
│   ├── __root.tsx    # app shell, 404 and error boundary (from the template)
│   └── index.tsx     # the to-do page: state, localStorage, UI
├── styles.css        # design tokens and component styles
├── router.tsx, server.ts, start.ts, lib/    # framework and error handling (from the template)
public/               # static assets
AGENTS.md, .lovable/  # Lovable project files
```

## Run locally

Requirements: Node.js (current LTS) or Bun.

```bash
git clone https://github.com/jlnMldnvc/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Open the URL printed in the terminal.

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Ideas for later

- Edit a task, search and filtering
- Categories, priorities, due dates
- Tests (Vitest + Testing Library)
- Optional cloud sync with sign-in
