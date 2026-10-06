# To-Do App (React, TypeScript, TanStack Start)

A small, mobile-first to-do app with a dark theme. Tasks are stored in the browser
(`localStorage`): no database, no accounts.
Built as an experiment in prompt-driven development with Lovable.

**Live demo:** https://modern-do-magic.lovable.app

<img width="420" alt="To-do app on a phone-sized screen" src="https://github.com/user-attachments/assets/0f240d44-9406-4deb-afbe-047ec094fa6c" />

## Features

- Add, complete and delete tasks
- One list: active tasks first, completed tasks below, struck through
- Tasks persist in `localStorage`
- A loading row is shown until storage is read on the client (avoids a server/client hydration mismatch)
- Error message if saved data is corrupted or storage is unavailable; corrupted data is backed up
- Responsive single-column layout, dark theme, styles in plain CSS (variables, flexbox, media queries)

## Tech

React 19, TanStack Start / Router (file-based routing), TypeScript, Vite, ESLint, Prettier.

## How this was built

I wrote the requirements and the prompts; Lovable generated the first version of the code
and applied my follow-up prompts (see [`prompts.md`](prompts.md)). I then reviewed
`src/routes/index.tsx` myself and fixed:

- saved data was overwritten when `localStorage` held corrupted data: it is now validated and backed up
- checkboxes were announced as "Mark as complete" without the task text: accessible names now come from the task label
- `crypto.randomUUID()` fails on non-secure origins (e.g. testing on a phone over HTTP): added a fallback id

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
