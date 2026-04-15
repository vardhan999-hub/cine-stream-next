# 🎬 Cine-Stream — Next.js 15 Movie App

A production-ready **movie discovery application** built with **Next.js 15 App Router**, focused on Server-Side Rendering (SSR), SEO, and performance.

🔗 **Live Demo:** https://cine-stream-next-ivory.vercel.app/
📂 **GitHub Repository:** https://github.com/vardhan999-hub/cine-stream-next

---

## 📌 Overview

Cine-Stream is a modern movie browsing platform that allows users to discover, search, and save their favorite movies.

This project was migrated from a React (Vite) app to **Next.js 15**, shifting from Client-Side Rendering (CSR) to **Server-Side Rendering (SSR)**.

### 🚀 Key Improvements After Migration

* Pages are rendered on the **server** → faster initial load
* Content is **SEO-friendly** → better indexing by search engines
* Dynamic routing enables detailed movie pages
* Optimized images and performance enhancements

---

## ✨ Features

* 🎥 Popular movies fetched on the **server**
* 🔍 Search movies with debounced input
* ♾️ Infinite scroll using `IntersectionObserver`
* ❤️ Save favorites with **localStorage persistence**
* 🎬 Dynamic movie detail pages (`/movie/[id]`)
* 🔍 Dynamic SEO using `generateMetadata()`
* 🖼️ Optimized images via Next.js `<Image />`
* 📱 Fully responsive design
* 🌙 Dark-themed cinematic UI

---

## 🛠 Tech Stack

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| Next.js 15   | App Router, SSR, routing |
| React 18     | UI components            |
| TMDB API     | Movie data               |
| CSS          | Styling and layout       |
| localStorage | Favorites persistence    |

---

## 📂 Project Structure

```bash
cine-stream-next/
│
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── favorites/
│   │   └── page.js
│   └── movie/
│       └── [id]/
│           └── page.js
│
├── components/
├── lib/
├── public/
├── next.config.js
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/vardhan999-hub/cine-stream-next.git
cd cine-stream-next
npm install
cp .env.local.example .env.local
npm run dev
```

Open: http://localhost:3000

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

> Get your free API key from: https://www.themoviedb.org/settings/api

---

## ⚙️ Core Concepts

### 🔹 Server vs Client Components

* Server Components → data fetching and SSR
* Client Components → interactivity (search, favorites, scroll)

### 🔹 Dynamic SEO

Each movie page generates its own metadata:

```js
generateMetadata()
```

### 🔹 ISR Caching

API requests are cached and revalidated every 1 hour.

---

## 🚀 Deployment

Deployed on Vercel.

Steps:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable
4. Deploy

---

## 🎯 Highlights

* SSR-based architecture for performance
* Clean separation of server and client logic
* Scalable folder structure
* Production-ready deployment

---

## 👨‍💻 Author

**Tadigadapa Harshavardhan**
🔗 https://github.com/vardhan999-hub
