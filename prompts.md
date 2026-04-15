# 🎬 Prompts.md — Cine-Stream Next.js Migration Notes

**Project:** Cine-Stream — Next.js 15 Upgrade
**Week:** 9
**Track:** A — Frontend Specialists
**Intern:** Tadigadapa Harshavardhan

---

## 📌 Overview

This document explains how AI was used as a **learning reference** during the migration of Cine-Stream from React + Vite to **Next.js 15 (App Router)**.

### 🎯 Focus Areas

* Understanding **Server-Side Rendering (SSR)** vs **Client-Side Rendering (CSR)**
* Migrating to the **Next.js App Router**
* Implementing **dynamic routes** with `generateMetadata()` for SEO
* Deciding proper usage of **Server vs Client Components**

> AI was used only for conceptual understanding.
> All implementation, debugging, and decisions were done independently.

---

## 🔹 Prompt 1 — SSR vs CSR

**Prompt Used:**
What is the difference between Client-Side Rendering and Server-Side Rendering, and why does it matter for SEO?

**Implementation:**

* Identified Week 8 as CSR (browser-rendered)
* Migrated to SSR using Next.js
* Server now renders HTML before sending to browser
* Replaced `useEffect` fetching with async Server Components

---

## 🔹 Prompt 2 — App Router Structure

**Prompt Used:**
How does the Next.js App Router work?

**Implementation:**

* `app/layout.js` → global layout (Navbar)
* `app/page.js` → Home page
* `app/favorites/page.js` → Favorites route
* `app/movie/[id]/page.js` → Dynamic route

✔ Learned file-based routing system

---

## 🔹 Prompt 3 — Server vs Client Components

**Prompt Used:**
How to decide which components need `"use client"`?

**Implementation:**

* Server Components → data fetching
* Client Components → interactivity

### Client Components used:

* `SearchBar.jsx` → input handling
* `NavLinks.jsx` → active route detection
* `MovieCard.jsx` → favorite button
* `HomeClient.jsx` → state + infinite scroll
* `FavoritesClient.jsx` → localStorage

### Server Component:

* `Loader.jsx` → pure UI

---

## 🔹 Prompt 4 — Data Fetching in Server Components

**Prompt Used:**
How to fetch data without `useEffect`?

**Implementation:**

* Used async Server Component:

```js
export default async function HomePage() {
  const data = await fetchPopularMovies(1);
  return <HomeClient initialMovies={data.results} />;
}
```

✔ Server fetch → Client render pattern

---

## 🔹 Prompt 5 — Dynamic Routes & SEO

**Prompt Used:**
How to create dynamic routes with SEO metadata?

**Implementation:**

* Created `/movie/[id]` route
* Implemented `generateMetadata()`

```js
export async function generateMetadata({ params }) {
  const movie = await fetchMovieDetails(params.id);
  return {
    title: `${movie.title} — Cine·Stream`,
    description: movie.overview,
  };
}
```

✔ Each movie page has unique SEO data

---

## 🔹 Prompt 6 — API Migration

**Prompt Used:**
How to adapt API utilities for Next.js?

**Implementation:**

* Moved to `lib/api.js`
* Updated env variable:

```js
process.env.NEXT_PUBLIC_TMDB_API_KEY
```

* Added ISR caching:

```js
next: { revalidate: 3600 }
```

✔ API calls cached for 1 hour

---

## 🔹 Prompt 7 — localStorage SSR Fix

**Prompt Used:**
Why does localStorage crash in Next.js?

**Implementation:**

```js
if (typeof window === 'undefined') return [];
```

✔ Prevents server-side crashes
✔ Shared logic via `lib/favorites.js`

---

## 🔹 Prompt 8 — Next.js Image Optimization

**Prompt Used:**
How to fix images in Next.js?

**Implementation:**

* Replaced `<img>` with `<Image />`
* Updated `next.config.js`:

```js
images: {
  remotePatterns: [{ hostname: 'image.tmdb.org' }]
}
```

✔ Optimized loading + performance

---

## 🔹 Prompt 9 — useRef Memory Fix

**Prompt Used:**
Best way to manage `setTimeout`?

**Implementation:**

```js
const toastRef = useRef(null);
clearTimeout(toastRef.current);
toastRef.current = setTimeout(() => setToast(null), 2500);
```

✔ Prevents memory leaks
✔ Avoids global variable issues

---

## 🔹 Prompt 10 — 404 Handling

**Prompt Used:**
How to handle invalid dynamic routes?

**Implementation:**

```js
import { notFound } from 'next/navigation';
if (!movie) notFound();
```

✔ Uses built-in Next.js 404 page

---

## 🔧 Additional Work (Independent)

* Fixed incorrect `await params`
* Added `observer.disconnect()` cleanup
* Fixed React dependency warnings
* Added API fallback: `data.results || []`
* Implemented scroll-to-top on search
* Centralized favorites logic
* Tested all routes thoroughly

---

## 📊 Week 8 vs Week 9

| Feature       | Week 8       | Week 9            |
| ------------- | ------------ | ----------------- |
| Rendering     | CSR          | SSR               |
| Data Fetching | useEffect    | Server Components |
| SEO           | ❌            | ✅                 |
| Routing       | React Router | App Router        |
| Images        | `<img>`      | `<Image />`       |
| Caching       | None         | ISR               |

---

## 🎯 Final Reflection

AI was used strictly as a **learning aid**, not for implementation.

### Key Learnings:

* Server vs Client Components is the core of Next.js
* SSR significantly improves SEO and performance
* `generateMetadata()` is essential for dynamic SEO
* Proper handling of browser APIs is critical in SSR

This project represents a **real-world production migration**, aligning with modern Next.js practices.
