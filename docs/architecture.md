# System Architecture

## High-Level Overview

```
Browser
  │
  ├── Public Pages (Next.js SSR/CSR)
  │     ├── /                 → Home (fetches /api/portfolio/about)
  │     ├── /projects         → Projects grid (fetches /api/portfolio/projects)
  │     ├── /experience       → Experience (fetches /api/portfolio/experience)
  │     ├── /skills           → Skills (fetches /api/portfolio/skills)
  │     └── /education        → Education (fetches /api/portfolio/education)
  │
  ├── Admin Area (JWT-protected)
  │     ├── /admin/login      → Login form → POST /api/auth/login
  │     └── /admin/dashboard  → CMS (CRUD on all sections)
  │
  └── API Layer (Next.js Route Handlers)
        ├── /api/auth/*       → Authentication endpoints
        └── /api/portfolio/*  → Portfolio data endpoints
              │
              └── Database Layer (db.ts abstraction)
                    ├── Local dev  → better-sqlite3 (./data/portfolio.db)
                    └── Production → @libsql/client (Turso cloud database)
```

---

## Request Flow

### Public Page Load

```
User visits /projects
  → Next.js renders ProjectsPage component (client component)
  → useEffect fires → fetch('/api/portfolio/projects')
  → API handler checks for admin_token cookie
      → No token: returns only visible=1 rows
      → With valid token: returns all rows including hidden
  → DB query executes (SQLite or Turso)
  → JSON response → React state update → UI renders
```

### Admin Login Flow

```
Admin submits /admin/login form
  → POST /api/auth/login { username, password }
  → Route handler:
      1. Validates input presence
      2. Queries admin table by username
      3. bcrypt.compareSync(password, storedHash)
      4. If match: signToken({ username }) → Jose JWS (HS256, 24h)
      5. Sets httpOnly cookie 'admin_token'
      6. Returns { success: true, username }
  → Client redirects to /admin/dashboard
```

### Admin Protected Route

```
User visits /admin/dashboard
  → Next.js Middleware (middleware.ts) intercepts
  → Reads admin_token cookie
  → Calls verifyToken() → Jose jwtVerify()
  → Valid: request passes through
  → Invalid/missing: redirect to /admin/login
```

### Admin CMS Update

```
Admin edits a project and clicks Save
  → PUT /api/portfolio/projects { id, name, tech, ... }
  → isAuthenticated() checks admin_token cookie
  → DB UPDATE query
  → Returns { success: true }
  → Client re-fetches list to show updated data
```

---

## Database Architecture

### Schema

```sql
-- Admin credentials
CREATE TABLE admin (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL        -- bcrypt hash
);

-- Homepage about section
CREATE TABLE about (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  headline   TEXT NOT NULL,
  paragraph1 TEXT NOT NULL,
  paragraph2 TEXT NOT NULL,
  visible    INTEGER DEFAULT 1
);

-- Portfolio projects
CREATE TABLE projects (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  num        TEXT NOT NULL,       -- e.g. "(I)", "(II)"
  name       TEXT NOT NULL,
  tech       TEXT NOT NULL,       -- tech stack string
  detail     TEXT NOT NULL,       -- subtitle / description
  image      TEXT NOT NULL,       -- URL
  visible    INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0
);

-- Work experience
CREATE TABLE experience (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  company     TEXT NOT NULL,
  role        TEXT NOT NULL,
  tag         TEXT NOT NULL,       -- e.g. "Internship · Govt. of India"
  period      TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'Past Role',
  visible     INTEGER DEFAULT 1,
  sort_order  INTEGER DEFAULT 0
);

-- Skills categories
CREATE TABLE skills (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  category    TEXT NOT NULL,
  role        TEXT NOT NULL,       -- label like "Core Expertise"
  skills_list TEXT NOT NULL,       -- "· "-separated list
  image       TEXT NOT NULL,
  visible     INTEGER DEFAULT 1,
  sort_order  INTEGER DEFAULT 0
);

-- Education, certifications, research
CREATE TABLE education (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  institution TEXT NOT NULL,
  tag         TEXT NOT NULL,
  period      TEXT NOT NULL,
  description TEXT NOT NULL,
  visible     INTEGER DEFAULT 1,
  sort_order  INTEGER DEFAULT 0
);
```

### DB Adapter Pattern

`src/lib/db.ts` exports a single `getDb()` function that returns a unified `DbAdapter` interface regardless of the underlying engine:

```typescript
interface DbAdapter {
  get(sql, params?): Promise<DbRow | undefined>
  all(sql, params?): Promise<DbRow[]>
  run(sql, params?): Promise<{ lastInsertRowid? }>
  exec(sql): Promise<void>
}
```

- **Local dev**: wraps `better-sqlite3` (sync) in async adapter
- **Production**: uses `@libsql/client` native async HTTP client

The singleton adapter is initialised once and reused. On first call, `initSchema()` and `seedData()` run automatically (idempotent).

---

## Authentication Architecture

### Token Lifecycle

```
Login → signToken({ username }) 
      → Jose SignJWT (HS256, 24h expiry)
      → Set as httpOnly cookie 'admin_token'

Each admin request → middleware.ts reads cookie
                   → verifyToken() → Jose jwtVerify()
                   → Valid payload → allow
                   → Invalid/expired → redirect login

Logout → POST /api/auth/logout
       → Clears admin_token cookie
       → Redirects to login
```

### Security Measures

| Measure | Implementation |
|---|---|
| Password hashing | bcryptjs (salt rounds: 10) |
| Token algorithm | HS256 (HMAC-SHA256) |
| Token storage | `httpOnly` cookie — not accessible via JS |
| Token expiry | 24 hours |
| Secure flag | Enabled in production (`NODE_ENV === 'production'`) |
| SameSite | `strict` — prevents CSRF |
| Route protection | Next.js middleware (edge-compatible) |
| Unauthenticated writes | All mutating API endpoints check token |

---

## Component Architecture

### Client Components (marked `'use client'`)

- All page components — they use `useEffect` for data fetching and GSAP animations
- `Nav.tsx` — uses `usePathname` hook
- `src/app/admin/*` — all admin pages use React state

### Server Components / Route Handlers

- All `src/app/api/**` — pure Next.js Route Handlers (server-side)
- `src/lib/db.ts` — server-only, never bundled to client
- `src/lib/auth.ts` — server-only, JWT operations
- `src/middleware.ts` — Next.js Edge middleware

### Animation System

`usePortfolioAnimations.ts` is a custom hook that:
1. Waits for GSAP to be available on `window`
2. Initialises `ScrollTrigger.refresh()`
3. Creates scroll-triggered animations for `.reveal-up`, `.reveal-line`, `.img-reveal`, `.reveal-fade` classes
4. Sets up parallax on `.parallax-img`
5. Handles horizontal scroll on `#objScroll`
6. Cleans up all animations on unmount
