# Deployment Guide

This guide covers deploying the portfolio to **Vercel** (recommended) with **Turso** as the production database.

---

## Prerequisites

- GitHub account with the repository pushed
- [Vercel account](https://vercel.com) (free tier works)
- [Turso account](https://turso.tech) (free tier works)

---

## Step 1 — Set Up Turso Database

Turso provides a globally distributed SQLite-compatible database. The free tier is sufficient.

### Install Turso CLI

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Or via npm
npm install -g @tursodatabase/cli
```

### Create Database

```bash
# Login
turso auth login

# Create the database
turso db create portfolio-admin

# Get the database URL (copy the libsql:// URL)
turso db show portfolio-admin

# Create an auth token (copy the token value)
turso db tokens create portfolio-admin
```

Keep both values — you will need them in the next step.

---

## Step 2 — Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `brijeshmunjiyasara9-dev/portfolio`
4. Under **Environment Variables**, add:

| Name | Value |
|---|---|
| `TURSO_DATABASE_URL` | `libsql://portfolio-admin-xxxx.turso.io` |
| `TURSO_AUTH_TOKEN` | your Turso auth token |
| `JWT_SECRET` | a strong random string (e.g. 32+ random chars) |

5. Click **Deploy**

### Option B — Vercel CLI

```bash
# Install
npm install -g vercel

# Login
vercel login

# Deploy from project root
cd portfolio
vercel

# Set environment variables
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
vercel env add JWT_SECRET

# Deploy to production
vercel --prod
```

---

## Step 3 — Verify Deployment

1. Visit your Vercel URL (e.g. `https://portfolio-brijesh.vercel.app`)
2. Check the public pages load: `/`, `/projects`, `/experience`, `/skills`, `/education`
3. Navigate to `/admin/login` and sign in with your credentials
4. Verify the admin dashboard loads and all sections are populated

On first run, the app automatically:
- Creates all database tables
- Seeds the admin user
- Seeds all portfolio content

---

## Environment Variable Reference

| Variable | Required For | Description |
|---|---|---|
| `TURSO_DATABASE_URL` | Production | `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | Production | Turso database auth token |
| `JWT_SECRET` | Recommended | Strong secret for JWT signing. Falls back to a default if not set — always set this in production |

### Generating a JWT Secret

```bash
# Option 1 — Node.js
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# Option 2 — openssl
openssl rand -hex 48
```

---

## Automatic Database Initialisation

The database schema and seed data are created **automatically on first request** — no manual migration needed.

`src/lib/db.ts` runs `initSchema()` and `seedData()` once per process start:

- `initSchema()` — creates tables with `CREATE TABLE IF NOT EXISTS` (safe to re-run)
- `seedData()` — checks if data exists before inserting (idempotent, never overwrites)

---

## Custom Domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `brijeshmunjiyasara.com`)
3. Update your domain DNS records as instructed by Vercel
4. Vercel provisions an SSL certificate automatically

---

## Continuous Deployment

Vercel automatically deploys on every push to the `main` branch. No additional configuration needed.

For **preview deployments**, every pull request gets its own temporary URL for testing before merging to main.

---

## Local Development vs Production

| Aspect | Local (`npm run dev`) | Production (Vercel) |
|---|---|---|
| Database | `better-sqlite3` — file at `./data/portfolio.db` | Turso (libSQL) — cloud DB |
| Environment | `.env.local` | Vercel environment variables |
| Auth cookie | Not `secure` flag | `secure: true` flag |
| GSAP | Loaded from CDN | Loaded from CDN |
| DB file | `./data/portfolio.db` (git-ignored) | Turso cloud |

---

## Troubleshooting

### "Database file not found" on Vercel

Vercel serverless functions are read-only after deployment — you cannot use `better-sqlite3` in production. Ensure `TURSO_DATABASE_URL` is set in your Vercel environment variables.

### "Invalid credentials" on login after fresh Vercel deploy

The seed data runs on first request. If the first request to the admin was not to `/api/auth/login`, trigger the DB init by visiting any public page first (e.g. `/projects` — this calls `/api/portfolio/projects` which initialises the DB).

### Admin content not updating

Vercel serverless functions are stateless. The `adapter` singleton is per-instance — if you see stale data, hard refresh the page. Turso responses are real-time.

### Build errors

```bash
# Run locally to debug
npm run build

# Check TypeScript errors
npx tsc --noEmit
```
