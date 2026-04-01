# Admin Panel Guide

The portfolio includes a built-in CMS (Content Management System) that lets you update every section of the public-facing site without touching code.

---

## Accessing the Admin Panel

1. Navigate to `/admin/login` on your portfolio URL
2. Enter your credentials:
   - **Username**: `brijesh`
   - **Password**: `brijesh@admin2024`
3. You will be redirected to `/admin/dashboard`

> The session lasts **24 hours**. After that you will be automatically logged out and redirected to the login page.

---

## Dashboard Overview

The dashboard has a collapsible **sidebar** on the left and a **content area** on the right.

### Sidebar Navigation

| Icon | Section | What it controls |
|---|---|---|
| 👤 | About | Homepage headline and bio paragraphs |
| 🚀 | Projects | Portfolio projects grid |
| 💼 | Experience | Work experience cards |
| ⚡ | Skills | Skill categories and tech stack |
| 🎓 | Education | Degrees, certifications, research |

Click the **◀ / ▶** button to collapse or expand the sidebar.

At the bottom of the sidebar:
- **🌐 View Site** — opens the public portfolio in a new tab
- **🚪 Logout** — ends your admin session

---

## Managing Each Section

### About

Edit the text shown in the **About** section on the homepage.

| Field | Description |
|---|---|
| Headline | The large heading. Use `\n` to insert line breaks (e.g. `Passionate\nAbout AI`) |
| First Paragraph | Main bio paragraph |
| Second Paragraph | Secondary bio paragraph |

Click **Save Changes** — updates take effect immediately on the live site.

---

### Projects

Displays a list of all projects. Each project card shows:
- Project name and tech stack
- Numbering (e.g. `(I)`) and sort order
- **Visible / Hidden** toggle badge
- **Edit** and **Delete** buttons

#### Adding a Project

1. Click **+ Add New**
2. Fill in:
   - **Number** — e.g. `(IX)` (shown as label on public site)
   - **Project Name** — full title
   - **Tech Stack** — use ` · ` to separate (e.g. `Python · TensorFlow · Docker`)
   - **Detail / Subtitle** — short description shown under the image
   - **Image URL** — a publicly accessible image URL
   - **Sort Order** — lower numbers appear first
   - **Visibility** — toggle to show or hide on public site
3. Click **Add Project**

#### Editing a Project

1. Click **Edit** on any project card
2. Modify fields as needed
3. Click **Save Changes**

#### Hiding a Project

Click the **● Visible** badge to toggle it to **● Hidden**. The project stays in the database but is not shown to public visitors. Only you (when logged in as admin) can see it in the CMS.

#### Deleting a Project

1. Click the 🗑 icon
2. A confirmation button appears — click **Confirm** to permanently delete
3. Click **Cancel** to abort

---

### Experience

Same controls as Projects. Fields:

| Field | Description |
|---|---|
| Company / Organisation | Employer or institution name |
| Role / Title | Your job title or role |
| Tag | Short descriptor e.g. `Internship · Govt. of India` |
| Period | Date range e.g. `May 2025 – Apr 2026` |
| Status Badge | `Current Role` / `Past Role` / `Academic Role` / `Leadership` |
| Description | Full description of responsibilities |
| Image URL | Cover image URL |
| Sort Order | Display order (ascending) |
| Visibility | Show/hide on public site |

---

### Skills

Manage skill categories. Fields:

| Field | Description |
|---|---|
| Category Name | e.g. `Machine Learning & AI` |
| Role Label | e.g. `Core Expertise` |
| Skills List | Use ` · ` separator e.g. `TensorFlow · PyTorch · Scikit-learn` |
| Image URL | Representative image for the category |
| Sort Order | Display order |
| Visibility | Show/hide on public site |

---

### Education

Manage degrees, certifications, and research entries. Fields:

| Field | Description |
|---|---|
| Title / Degree | e.g. `MTech in Computer Science & Engineering` |
| Institution | e.g. `Ahmedabad University` |
| Tag | e.g. `Education · Pursuing` or `Certification` |
| Period | e.g. `2024 — Present` |
| Description | Full description |
| Sort Order | Display order |
| Visibility | Show/hide on public site |

---

## Visibility System

Every content item (except About) has a **visible** flag:

- **● Visible** (green) — item is shown to all public visitors
- **● Hidden** (red) — item is hidden from public; only you see it in the admin dashboard

This lets you draft content and show it only when ready, or temporarily hide items without deleting them.

---

## Security Notes

- The admin area is protected by **JWT authentication** with `httpOnly` cookies. No JavaScript on the page can read your token.
- All API mutation endpoints (`POST`, `PUT`, `DELETE`) verify the token server-side on every request.
- The middleware runs at the **Next.js Edge** layer — unauthenticated requests to `/admin/*` are redirected before they even reach the page component.
- After 24 hours of inactivity your session expires automatically.

---

## Changing Your Password

Currently passwords are set via the database seed. To change your admin password:

**Option 1 — Update the seed (for fresh deployments)**

Edit `src/lib/db.ts`, find the `seedData` function, and change:

```typescript
const hash = bcrypt.hashSync('your-new-password', 10);
await db.run('INSERT INTO admin (username, password) VALUES (?, ?)', ['brijesh', hash]);
```

**Option 2 — Update directly in Turso (production)**

Using the Turso CLI:

```bash
# Connect to your database
turso db shell portfolio-admin

# Generate a new hash first (run in Node.js locally)
# node -e "const b=require('bcryptjs'); console.log(b.hashSync('newpassword',10))"

# Then run in Turso shell:
UPDATE admin SET password = '$2a$10$yourNewHashHere' WHERE username = 'brijesh';
```

**Option 3 — Update in local SQLite**

```bash
node -e "
const db = require('better-sqlite3')('./data/portfolio.db');
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('newpassword', 10);
db.prepare('UPDATE admin SET password=? WHERE username=?').run(hash, 'brijesh');
console.log('Password updated');
"
```
