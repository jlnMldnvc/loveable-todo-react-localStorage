# Modern Todo Magic 🧙‍♂️

A lightweight, mobile-first To-Do application built with React, TypeScript, and TanStack Start. The app provides instant task management with local persistence using browser LocalStorage and zero external database overhead.

## 🌟 Features

- **Task Management:** Create, toggle completion, and delete tasks seamlessly.
- **Local Persistence:** Automatic synchronization with browser `localStorage`.
- **Automatic Sorting:** Active tasks stay at the top; completed tasks move to the bottom.
- **Responsive & Dark UI:** Clean dark theme built with modern native CSS.

## 🛠️ Tech Stack

- **Framework:** React 19, TanStack Start
- **Routing & State:** TanStack Router, TanStack Query
- **Styling:** Plain CSS (CSS Variables, Flexbox, Media Queries)
- **Language & Tooling:** TypeScript, Vite

## 📁 Project Structure

```text
src/
├── routes/
│   ├── __root.tsx    # App shell, fonts, and base HTML configuration
│   └── index.tsx     # Main To-Do application page and logic
├── styles.css        # Native CSS styles and CSS Variables
└── router.tsx        # TanStack Router configuration
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

```Bash
git clone https://github.com/jlnMldnvc/loveable-todo-react-supbase.git
cd loveable-todo-react-supbase
```
2. Install dependencies:

```bash
npm install
```
3. Run the application:

```Bash
npm run dev
```
## 📸 Screenshot
<img width="720" height="457" alt="modernDoMagic" src="https://github.com/user-attachments/assets/2dd5a4a7-7e13-4e09-ad95-cf108ca73c2e" />

## 🔮 Future Improvements

- Add task categories and priority levels
- Implement dark mode toggle
- Add due dates and push notifications
- Implement Supabase backend sync and user authentication
- Add task search and filtering
