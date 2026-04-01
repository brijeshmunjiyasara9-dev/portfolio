# Brijesh Munjiyasara — Portfolio

Personal portfolio website for **Brijesh Munjiyasara**, MTech student in Computer Science & Engineering at Ahmedabad University, specialising in Machine Learning, Deep Learning, and Computer Vision.

Live at: [brijeshmunjiyasara9-dev.vercel.app](https://portfolio-brijeshmunjiyasara9-dev.vercel.app) _(or your custom domain)_

---

## Overview

A dark-themed, animation-rich portfolio built with **Next.js 14** and a fully-featured **Admin CMS** backed by SQLite (local) / Turso (production). All portfolio content — projects, experience, skills, education, and the about section — is managed through the admin dashboard without touching any code.

---

## Features

- **Full-stack Next.js 14** with App Router and TypeScript
- **Admin CMS** at `/admin/dashboard` — manage all content live
- **JWT authentication** with `httpOnly` cookies (24-hour sessions)
- **SQLite locally** via `better-sqlite3`, **Turso** in production via `@libsql/client`
- **GSAP animations** — scroll-triggered reveals, parallax, horizontal scroll
- **Google Fonts** — Playfair Display, EB Garamond, Inter
- **Vercel-ready** deployment with `vercel.json`
- Responsive, dark-mode-only design with grain overlay aesthetic

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, about, project preview, experience highlights, skills, contact |
| `/projects` | Full projects grid pulled live from DB |
| `/experience` | Work experience cards pulled live from DB |
| `/skills` | Skill categories pulled live from DB |
| `/education` | Education, certifications & research publications from DB |
| `/admin/login` | Admin login (JWT-secured) |
| `/admin/dashboard` | Full CMS — edit all content sections |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Global CSS (custom design system) |
| Animations | GSAP 3 + ScrollTrigger |
| Auth | JWT via `jose`, bcrypt via `bcryptjs` |
| Database (local) | SQLite via `better-sqlite3` |
| Database (production) | Turso (libSQL) via `@libsql/client` |
| Deployment | Vercel |
| Fonts | Google Fonts CDN |

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/brijeshmunjiyasara9-dev/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables (optional)

Copy the example file and fill in values if you want to use Turso in production:

```bash
cp .env.example .env.local
```

For **local development**, no environment variables are required — the app automatically uses a local SQLite file at `./data/portfolio.db`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access the Admin Panel

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

| Field | Value |
|---|---|
| Username | `brijesh` |
| Password | `brijesh@admin2024` |

> **Security note**: Change these credentials after first login in production by updating the seed in `src/lib/db.ts` or directly in your database.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `TURSO_DATABASE_URL` | Production only | Turso database URL e.g. `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | Production only | Turso auth token |
| `JWT_SECRET` | Optional | JWT signing secret (default is set in code) |

For local development, **none** of these are required. The app falls back to a local SQLite file automatically.

---

## Deployment on Vercel

1. Push the repository to GitHub (already done)
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add the following environment variables in Vercel dashboard:
   - `TURSO_DATABASE_URL` — your Turso database URL
   - `TURSO_AUTH_TOKEN` — your Turso auth token
   - `JWT_SECRET` — a strong random secret (recommended)
4. Deploy — Vercel picks up `vercel.json` automatically

### Setting up Turso (Free)

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create portfolio-admin

# Get URL
turso db show portfolio-admin

# Create auth token
turso db tokens create portfolio-admin
```

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Root layout (fonts, metadata)
│   │   ├── projects/page.tsx           # Projects page
│   │   ├── experience/page.tsx         # Experience page
│   │   ├── skills/page.tsx             # Skills page
│   │   ├── education/page.tsx          # Education page
│   │   ├── admin/
│   │   │   ├── login/page.tsx          # Admin login
│   │   │   ├── dashboard/page.tsx      # Admin CMS dashboard
│   │   │   └── page.tsx                # Admin redirect
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts      # POST /api/auth/login
│   │       │   ├── logout/route.ts     # POST /api/auth/logout
│   │       │   └── verify/route.ts     # GET  /api/auth/verify
│   │       └── portfolio/
│   │           ├── about/route.ts      # GET/PUT /api/portfolio/about
│   │           ├── projects/route.ts   # CRUD  /api/portfolio/projects
│   │           ├── experience/route.ts # CRUD  /api/portfolio/experience
│   │           ├── skills/route.ts     # CRUD  /api/portfolio/skills
│   │           └── education/route.ts  # CRUD  /api/portfolio/education
│   ├── components/
│   │   ├── Nav.tsx                     # Navigation bar
│   │   ├── Footer.tsx                  # Footer
│   │   ├── GSAPScripts.tsx             # GSAP loader component
│   │   └── usePortfolioAnimations.ts   # GSAP animation hook
│   ├── lib/
│   │   ├── auth.ts                     # JWT sign/verify helpers
│   │   └── db.ts                       # DB abstraction (SQLite / Turso)
│   ├── middleware.ts                   # Route protection for /admin/*
│   └── styles/
│       └── globals.css                 # Full design system CSS
├── docs/                               # System documentation
├── data/                               # Local SQLite DB (auto-created, git-ignored)
├── .env.example                        # Environment variable template
├── vercel.json                         # Vercel deployment config
├── tsconfig.json                       # TypeScript config
└── package.json                        # Dependencies & scripts
```

---

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Admin CMS Capabilities

Once logged in at `/admin/dashboard`, you can:

- **About** — Edit homepage headline and bio paragraphs
- **Projects** — Add, edit, delete, reorder, and show/hide projects
- **Experience** — Manage work experience entries with company, role, period, description
- **Skills** — Manage skill categories and tech stack lists
- **Education** — Manage degrees, certifications, and research publications

All changes are reflected live on the public-facing portfolio instantly.

---

## Contact

**Brijesh Munjiyasara**  
MTech — Computer Science & Engineering, Ahmedabad University  
Email: [brijesh.m@ahduni.edu.in](mailto:brijesh.m@ahduni.edu.in)  
LinkedIn: [linkedin.com/in/brijesh-munjiyasara](https://www.linkedin.com/in/brijesh-munjiyasara/)  
GitHub: [github.com/brijesh279](https://github.com/brijesh279) · [github.com/Brijesh439](https://github.com/Brijesh439)
