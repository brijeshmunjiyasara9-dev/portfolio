# Documentation Index

This folder contains technical documentation for the Brijesh Munjiyasara portfolio system.

---

## Contents

| File | Description |
|---|---|
| [architecture.md](./architecture.md) | System architecture, request flows, DB schema, component structure, auth flow |
| [api-reference.md](./api-reference.md) | Full API reference — all endpoints, request/response formats, error codes |
| [admin-guide.md](./admin-guide.md) | How to use the Admin CMS — login, manage all content sections, visibility controls |
| [deployment.md](./deployment.md) | How to deploy on Vercel with Turso, environment variables, custom domain, CI/CD |
| [database.md](./database.md) | Database tables, columns, seed data, adapter pattern, local/production setup |

---

## Quick Reference

### Admin Login
- URL: `/admin/login`
- Username: `brijesh`
- Password: `brijesh@admin2024`

### Key Files
- `src/lib/db.ts` — database abstraction (SQLite + Turso)
- `src/lib/auth.ts` — JWT sign/verify
- `src/middleware.ts` — admin route protection
- `src/app/api/` — all API route handlers
- `src/app/admin/dashboard/page.tsx` — full CMS UI

### Environment Variables
- `TURSO_DATABASE_URL` — production DB URL
- `TURSO_AUTH_TOKEN` — production DB token  
- `JWT_SECRET` — JWT signing secret

---

## Tech Stack Summary

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Database (local) | SQLite via better-sqlite3 |
| Database (prod) | Turso via @libsql/client |
| Auth | JWT (jose) + bcrypt (bcryptjs) |
| Animations | GSAP 3 + ScrollTrigger |
| Deployment | Vercel |
