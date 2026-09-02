# Modern Todo Magic 🧙‍♂️

A modern, responsive To-Do application built with React and Supabase. The app allows users to manage daily tasks seamlessly with real-time database synchronization and user authentication.

## 🌟 Features

- **Task Management:** Create, mark as completed, and delete tasks.
- **User Authentication:** Sign up and log in securely via Supabase.
- **Real-time Sync:** Data persists across sessions in a Postgres database.
- **Responsive Design:** Clean and modern UI tailored for both desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
- **Build Tool:** Vite
- **Backend & Database:** Supabase (Authentication & PostgreSQL)

## 📁 Project Structure

```text
src/
├── components/     # UI components (Task items, forms, headers)
├── integrations/   # Supabase client setup & configuration
├── pages/          # Main application views
├── hooks/          # Custom React hooks
└── App.tsx
```

## 🚀 Getting Started

Prerequisites
Make sure you have Node.js installed on your machine.

Installation

1. Clone the repository:

```Bash
git clone https://github.com/jlnMldnvc/loveable-todo-react-supbase.git
cd loveable-todo-react-supbase
```
2. Install dependencies:

```bash
npm install
```
3. Set up Environment Variables:
Create a .env file in the root directory and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Run the application:

```Bash
npm run dev
```
## 📸 Screenshot
<img width="720" height="457" alt="modernDoMagic" src="https://github.com/user-attachments/assets/2dd5a4a7-7e13-4e09-ad95-cf108ca73c2e" />

## 🔮 Future Improvements

- Add task categories and priority levels
- Implement dark mode toggle
- Add due dates and push notifications
