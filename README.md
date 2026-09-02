# ⚡ Minimalist Dark Mode Task Manager (`modern-do-magic`)

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Plain_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Lovable.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://modern-do-magic.lovable.app/)

A ultra-fast, mobile-first, minimalist task management web application built with modern React. Designed with a clean Slate & Sky dark mode palette, zero heavy external UI libraries, and optimized for maximum render efficiency and minimal bundle size.

🌐 **Live Demo:** [https://modern-do-magic.lovable.app/](https://modern-do-magic.lovable.app/)

---

## ✨ Features & Architecture Highlights

- 🎨 **Minimalist & Mobile-First UI:** Responsive single-column layout using custom plain CSS (no Tailwind, zero UI library clutter).
- ⚡ **Highly Performance-Optimized:** Code-audited to remove 40+ unused packages; utilizes React memoization (`React.memo`, lean state management) to prevent unnecessary re-renders.
- 💾 **Persistent Data:** Automatic task persistence using browser `localStorage`.
- ♿ **Native & Accessible:** Built with semantic HTML elements and native form submission logic.

---

## 🛠 Tech Stack

- **Frontend:** React, JavaScript (ES6+), HTML5, Plain CSS3
- **Tooling & Environment:** Node.js, npm, Vite
- **Deployment:** Lovable Cloud Platform

---

## ⚙️ How to Run Locally

**Clone the repository:**
```bash
git clone https://github.com/jlnMldnvc/modern-do-magic.git
```
   1. Navigate to the project folder:

```bash
cd modern-do-magic
```
2. Install dependencies:

```bash
npm install
```
3. Start the local development server:

```bash
npm run dev
```

## 📝 Key Engineering Learnings
This app was iteratively refined through a focus on performance:

- Replaced heavyweight UI framework components (shadcn/Radix/Tailwind) with lightweight, semantic CSS.
- Drastically reduced JavaScript bundle size by auditing dependencies.
- Applied React memoization strategies for seamless task list rendering.
