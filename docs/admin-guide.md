# Admin Panel Guide

The portfolio includes a built-in CMS (Content Management System) that lets you update every section of the public-facing site — including your profile photo, resume, and credentials — without touching code.

---

## Accessing the Admin Panel

1. Navigate to `/admin/login` on your portfolio URL
2. Enter your credentials:
   - **Username**: `brijesh`
   - **Password**: `brijesh@admin2024`
3. You will be redirected to `/admin/dashboard`

> The session lasts **24 hours**. After that you will be automatically logged out and redirected to the login page.

> **Security note**: Change the default password immediately using the **My Profile** (⚙️) tab.

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
| 🏆 | Certifications | Certification cards with credential links |
| ⚙️ | My Profile | Name, email, password, profile photo, resume |

Click the **◀ / ▶** button to collapse or expand the sidebar.

At the bottom of the sidebar:
- **🌐 View Site** — opens the public portfolio in a new tab
- **🚪 Logout** — ends your admin session

---

## My Profile (⚙️)

The **My Profile** section lets you manage your personal admin settings and the files that appear on the public site.

### Profile Photo

- Click **📷 Upload Photo** to choose an image from your device
- Accepted formats: **JPG, PNG, WEBP, GIF, AVIF**
- The photo is **saved instantly** as soon as you pick the file — no extra "Save" button needed
- Once uploaded, the photo **replaces the placeholder image** in the About section of the homepage
- Click **✕ Remove** to clear the photo (the Unsplash placeholder will return)

### Resume / CV

- Click **📤 Upload Resume** to choose your resume file
- Accepted formats: **PDF, DOC, DOCX** (max ~10 MB)
- The resume is **saved instantly** as soon as you pick the file
- Once uploaded, a **"Download Resume"** button appears automatically on the homepage About section for all visitors
- Click **🔄 Replace Resume** to upload a new version at any time
- Click **👁 Preview / Download** to open the current resume in a new tab and verify it

### Basic Information

| Field | Description |
|---|---|
| Username | Your login username — **cannot be changed** |
| Display Name | Your full name as it may appear publicly |
| Email Address | Contact email stored in your profile |

Click **Save Name / Email / Password** after editing these fields.

### Change Password

| Field | Description |
|---|---|
| Current Password | Your existing password (required to change) |
| New Password | Must be at least 8 characters |
| Confirm New Password | Must match the new password |

Leave all three password fields **blank** to keep your current password unchanged.

> Photo and Resume are saved to the database **immediately on upload**.  
> Name, email, and password changes require clicking **"Save Name / Email / Password"**.

---

## Managing Content Sections

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

Click the **● Visible** badge to toggle it to **● Hidden**. The project stays in the database but is not shown to public visitors.

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

### Certifications

Manage certification cards. Fields:

| Field | Description |
|---|---|
| Title | Certificate name |
| Issuer | Issuing organisation |
| Tag | e.g. `Cloud · AWS` |
| Date Issued | e.g. `2024` or `Jan 2025` |
| Credential URL | Link to verify the certificate online |
| Description | Details about the certification |
| Image URL | Cover image for the card |
| Sort Order | Display order |
| Visibility | Show/hide on public site |

---

## Visibility System

Every content item (except About) has a **visible** flag:

- **● Visible** (green) — item is shown to all public visitors
- **● Hidden** (red) — item is hidden from public; only visible in the admin dashboard

This lets you draft content and show it only when ready, or temporarily hide items without deleting them.

---

## Security Notes

- The admin area is protected by **JWT authentication** with `httpOnly` cookies. No JavaScript on the page can read your token.
- All API mutation endpoints (`POST`, `PUT`, `DELETE`) verify the token server-side on every request.
- The middleware runs at the **Next.js Edge** layer — unauthenticated requests to `/admin/*` are redirected before they even reach the page component.
- After 24 hours of inactivity your session expires automatically.
- The upload API (`/api/admin/upload`) requires authentication — visitors cannot upload files.

---

## How the Resume Download Works

1. Go to **⚙️ My Profile** → **Resume / CV**
2. Click **📤 Upload Resume** and choose your PDF/DOC/DOCX file
3. The file is uploaded and saved to the database immediately
4. The **"Download Resume"** button on the homepage About section becomes **active and clickable**
5. Visitors click it → browser downloads your resume directly

> The "Download Resume" button is **always visible** on the homepage. Before a resume is uploaded it appears greyed out/disabled. Once you upload a resume, it becomes active automatically — no code changes needed.

The download endpoint is `/api/resume` — it streams the file with the original filename as the download name.

---

## How the Profile Photo Works

1. Go to **⚙️ My Profile** → **Profile Photo**
2. Click **📷 Upload Photo** and choose your image
3. The image is uploaded and saved immediately
4. The homepage About section now shows your photo instead of the default placeholder
5. To revert to the placeholder, click **✕ Remove**
