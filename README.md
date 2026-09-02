# Modern Todo Magic 🧙‍♂️

A lightweight, mobile-first To-Do application built with React, TypeScript, and TanStack Start. Tasks are stored in the browser's LocalStorage — no database, no accounts, no setup.

**Live demo:** https://modern-do-magic.lovable.app

## 🌟 Features

- **Task Management:** Create, toggle completion, and delete tasks seamlessly.
- **Local Persistence:** Automatic synchronization with browser `localStorage`.
- **Automatic Sorting:** Active tasks stay at the top; completed tasks move to the bottom.
- **Loading & Error States:** Shows a loading row while tasks are read and a clear message if storage is unavailable.
- **Responsive & Dark UI:** Clean dark theme built with plain, modern CSS.

## 🛠️ Tech Stack

- **Framework:** React 19, TanStack Start
- **Routing:** TanStack Router (file-based)
- **Styling:** Plain CSS (CSS Variables, Flexbox, Media Queries)
- **Language & Tooling:** TypeScript, Vite

## 📁 Project Structure

```text
public/               # Static assets (favicon, robots.txt)
src/
├── lib/              # Error reporting and error-page helpers
├── routes/
│   ├── __root.tsx    # App shell, fonts, 404 and error boundaries
│   └── index.tsx     # Main To-Do page and logic
├── router.tsx        # TanStack Router configuration
├── server.ts         # SSR entry wrapper
├── start.ts          # Server middleware (CSRF, error handling)
└── styles.css        # Design tokens and component styles
```

## 🚀 Getting Started

### Prerequisites

[Node.js](https://nodejs.org/) 20+ (or [Bun](https://bun.sh/)).

### Installation

```bash
git clone https://github.com/jlnMldnvc/loveable-todo-react-supbase.git
cd loveable-todo-react-supbase
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format with Prettier |

## 📸 Screenshot

<img width="420" height="800" alt="s" src="https://github.com/user-attachments/assets/0f240d44-9406-4deb-afbe-047ec094fa6c" />


## 🔮 Future Improvements

- Add task categories and priority levels
- Add due dates and reminders
- Cloud sync with user authentication
- Task search and filtering
