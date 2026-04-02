# Database Documentation

## Overview

The portfolio uses an **SQLite-compatible** database with a dual-mode setup:

| Environment | Engine | Location |
|---|---|---|
| Local development | `better-sqlite3` | `./data/portfolio.db` |
| Vercel production | `@libsql/client` (Turso) | Cloud (libsql URL) |

The `getDb()` function in `src/lib/db.ts` automatically chooses the correct engine based on the `TURSO_DATABASE_URL` environment variable.

---

## Tables

### `admin`

Stores admin credentials and profile data (added via migration).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTOINCREMENT | Internal ID |
| `username` | TEXT | UNIQUE, NOT NULL | Login username |
| `password` | TEXT | NOT NULL | bcrypt hash (rounds: 10) |
| `display_name` | TEXT | default `''` | Public display name |
| `email` | TEXT | default `''` | Contact email address |
| `profile_image` | TEXT | default `''` | Path to uploaded photo e.g. `/uploads/profile_xxx.png` |
| `resume_path` | TEXT | default `''` | Path to uploaded resume e.g. `/uploads/resume_xxx.pdf` |
| `resume_original_name` | TEXT | default `''` | Original filename for download headers |

**Default seed:**
- Username: `brijesh`
- Password: `brijesh@admin2024` (stored as bcrypt hash)

> Profile columns (`display_name`, `email`, `profile_image`, `resume_path`, `resume_original_name`) are added via `ALTER TABLE` migrations on first run — safe to run against existing databases.

---

### `about`

Stores the homepage about section content. Always has exactly one row (`id = 1`).

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | INTEGER | PK | Always 1 |
| `headline` | TEXT | — | Large heading (use `\n` for line breaks) |
| `paragraph1` | TEXT | — | First bio paragraph |
| `paragraph2` | TEXT | — | Second bio paragraph |
| `visible` | INTEGER | 1 | Visibility flag |

---

### `projects`

Stores portfolio project entries.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTOINCREMENT | — |
| `num` | TEXT | — | Display number e.g. `(I)` |
| `name` | TEXT | — | Project name |
| `tech` | TEXT | — | Tech stack string |
| `detail` | TEXT | — | Subtitle / short description |
| `image` | TEXT | — | Image URL |
| `visible` | INTEGER | 1 | 1 = public, 0 = admin-only |
| `sort_order` | INTEGER | 0 | Display order (ASC) |

**Seeded with 8 projects** from Brijesh's actual work.

---

### `experience`

Stores work experience entries.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTOINCREMENT | — |
| `company` | TEXT | — | Company or organisation name |
| `role` | TEXT | — | Job title |
| `tag` | TEXT | — | Short label e.g. `Internship · Govt. of India` |
| `period` | TEXT | — | Date range e.g. `May 2025 – Apr 2026` |
| `description` | TEXT | — | Full role description |
| `image` | TEXT | — | Cover image URL |
| `status` | TEXT | `'Past Role'` | Role type badge |
| `visible` | INTEGER | 1 | Visibility flag |
| `sort_order` | INTEGER | 0 | Display order |

**Status values:** `Current Role` · `Past Role` · `Academic Role` · `Leadership`

**Seeded with 4 entries:**
1. BISAG-N (MeitY) — Natural Disaster Prediction (Current Role)
2. WebRepp HK — Healthcare Data Analyst (Past Role)
3. Ahmedabad University — Teaching Assistant (Academic Role)
4. Team Leader — Cross-functional Project Lead (Leadership)

---

### `skills`

Stores skill category entries.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTOINCREMENT | — |
| `category` | TEXT | — | Category name e.g. `Machine Learning & AI` |
| `role` | TEXT | — | Sub-label e.g. `Core Expertise` |
| `skills_list` | TEXT | — | Skills separated by ` · ` |
| `image` | TEXT | — | Representative image URL |
| `visible` | INTEGER | 1 | Visibility flag |
| `sort_order` | INTEGER | 0 | Display order |

**Seeded with 6 categories:** ML & AI, Cloud & DevOps, Programming Languages, Data Engineering, NLP & LLMs, Remote Sensing & GIS.

---

### `education`

Stores education, certifications, and research entries.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTOINCREMENT | — |
| `title` | TEXT | — | Degree or certification title |
| `institution` | TEXT | — | University or issuing body |
| `tag` | TEXT | — | Type label e.g. `Education · Pursuing` |
| `period` | TEXT | — | Date or year range |
| `description` | TEXT | — | Details |
| `visible` | INTEGER | 1 | Visibility flag |
| `sort_order` | INTEGER | 0 | Display order |

**Seeded with 6 entries:** MTech, BE, AWS Certification, NPTEL Python, IJSRST Research Paper, BERT Study.

---

## DB Adapter Interface

```typescript
interface DbAdapter {
  // Returns first matching row or undefined
  get(sql: string, params?: unknown[]): Promise<DbRow | undefined>

  // Returns all matching rows
  all(sql: string, params?: unknown[]): Promise<DbRow[]>

  // Executes INSERT / UPDATE / DELETE, returns last insert row ID
  run(sql: string, params?: unknown[]): Promise<{ lastInsertRowid?: number | bigint }>

  // Executes raw DDL (no return value)
  exec(sql: string): Promise<void>
}
```

---

## Initialisation Lifecycle

```
Application starts
  ↓
First call to getDb()
  ↓
getAdapter() → checks TURSO_DATABASE_URL env var
  ├── Set? → create @libsql/client → makeLibsqlAdapter()
  └── Not set? → open ./data/portfolio.db → makeSqliteAdapter()
  ↓
Store singleton adapter
  ↓
initSchema() — CREATE TABLE IF NOT EXISTS for all 6 tables
  ↓
seedData() — INSERT if not exists for all tables
  ↓
Return adapter (cached for lifetime of process)
```

This is **idempotent** — safe to call multiple times. Tables and seed data are never duplicated.

> The `admin` table has **profile columns added via `ALTER TABLE` migrations** (`display_name`, `email`, `profile_image`, `resume_path`, `resume_original_name`). These migrations use `IF NOT EXISTS`-style error handling and are safe to run on existing databases.

---

## Working with the Local Database

The local SQLite file is created at `./data/portfolio.db` and is **git-ignored**.

### Inspect with SQLite CLI

```bash
sqlite3 data/portfolio.db

# List tables
.tables

# View all projects
SELECT id, name, visible, sort_order FROM projects;

# View admin user
SELECT id, username FROM admin;

# Exit
.quit
```

### Reset the Database

Delete the file and restart the dev server — it will be recreated with fresh seed data:

```bash
rm data/portfolio.db
npm run dev
```

---

## Turso (Production) Operations

### Connect to Production Shell

```bash
turso db shell portfolio-admin
```

### Useful Queries

```sql
-- Check admin users
SELECT id, username FROM admin;

-- Count content items
SELECT 'projects' as tbl, COUNT(*) as count FROM projects
UNION ALL SELECT 'experience', COUNT(*) FROM experience
UNION ALL SELECT 'skills', COUNT(*) FROM skills
UNION ALL SELECT 'education', COUNT(*) FROM education;

-- Toggle project visibility
UPDATE projects SET visible = 0 WHERE id = 3;
```

### Update Admin Password

```bash
# 1. Generate hash locally
node -e "const b=require('bcryptjs'); console.log(b.hashSync('newpassword',10))"

# 2. Run in Turso shell
UPDATE admin SET password = '<paste-hash>' WHERE username = 'brijesh';
```
