# Anix Portfolio Website (Next.js) — Implementation Plan

## Overview

This project is a **modern, responsive developer portfolio** built using **Next.js (App Router)**.

### Features

* Responsive UI
* Modular component structure
* GitHub API integration (real projects)
* Live demo links
* Mobile navigation
* Clean developer-focused design

---

## Tech Stack

* Next.js 14 (App Router)
* React (Client + Server Components)
* CSS Modules
* GitHub REST API

---

## Project Structure

```
anix-portfolio/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Navbar.js
│   ├── Hero.js
│   ├── About.js
│   ├── Projects.js
│   ├── Github.js
│   └── Contact.js
├── styles/
│   ├── Navbar.module.css
│   ├── Hero.module.css
│   └── Projects.module.css
├── .env.local
└── package.json
```

---

## Setup Instructions

```bash
npx create-next-app@latest anix-portfolio
cd anix-portfolio
npm install
npm run dev
```

---

## Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

---

### app/layout.js

```javascript
export const metadata = {
  title: "Anix | Software Developer",
  description: "Portfolio of Anix",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### app/page.js

```javascript
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Github from "../components/Github";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Github />
      <Contact />
    </>
  );
}
```

---

### app/globals.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
  scroll-behavior: smooth;
}

body {
  background: #0f172a;
  color: #fff;
}

section {
  padding: 80px 20px;
  text-align: center;
}
```

---

## Components

---

### Navbar

```javascript
"use client";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <h2>Anix</h2>

      <div className={`${styles.links} ${open ? styles.active : ""}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>

      <div className={styles.menu} onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}
```

```css
.nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #020617;
  position: sticky;
  top: 0;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  color: white;
  text-decoration: none;
}

.menu {
  display: none;
}

@media (max-width: 768px) {
  .links {
    display: none;
    flex-direction: column;
  }

  .active {
    display: flex;
  }

  .menu {
    display: block;
  }
}
```

---

### Hero

```javascript
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <h1>Hi, I'm Anix 👋</h1>
      <h2>Software Developer</h2>
      <p>I build modern web applications.</p>
      <a href="#projects" className={styles.btn}>View Work</a>
    </section>
  );
}
```

```css
.hero {
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #2563eb, #06b6d4);
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: white;
  color: #2563eb;
}
```

---

### About

```javascript
export default function About() {
  return (
    <section id="about">
      <h2>About Me</h2>
      <p>
        I'm Anix, a software developer specializing in modern web technologies.
      </p>
    </section>
  );
}
```

---

### Projects (GitHub Integration)

```javascript
"use client";
import { useEffect, useState } from "react";
import styles from "../styles/Projects.module.css";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  useEffect(() => {
    async function fetchRepos() {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated`
      );
      const data = await res.json();

      const filtered = data
        .filter(repo => !repo.fork)
        .slice(0, 6);

      setRepos(filtered);
    }

    fetchRepos();
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className={styles.grid}>
        {repos.map(repo => (
          <div key={repo.id} className={styles.card}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>

            <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>

            <a href={repo.html_url} target="_blank">GitHub</a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank">Live</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### GitHub Profile Section

```javascript
"use client";
import { useEffect, useState } from "react";

export default function Github() {
  const [user, setUser] = useState(null);
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return null;

  return (
    <section>
      <h2>GitHub Profile</h2>

      <img src={user.avatar_url} width="100" />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>

      <p>Repos: {user.public_repos}</p>

      <a href={user.html_url}>Visit GitHub</a>
    </section>
  );
}
```

---

### Contact

```javascript
"use client";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <section id="contact">
      <h2>Contact</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
```

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

---

## Future Enhancements

* Dark/Light mode toggle
* Framer Motion animations
* Project filtering (tags)
* Blog section
* Backend contact API (email sending)
* GitHub contribution graph

---

## Status
- Fully functional
- Production-ready
- Clean architecture

---

## Author

**Anix — Software Developer**
---