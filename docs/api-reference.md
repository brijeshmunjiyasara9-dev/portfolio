# API Reference

Base path: `/api`

All endpoints return JSON. Mutation endpoints (`POST`, `PUT`, `DELETE`) require an authenticated `admin_token` cookie — obtain it via the login endpoint first.

---

## Authentication Endpoints

### POST `/api/auth/login`

Authenticates an admin user and sets a session cookie.

**Request Body**

```json
{
  "username": "brijesh",
  "password": "brijesh@admin2024"
}
```

**Success Response** — `200 OK`

```json
{
  "success": true,
  "username": "brijesh"
}
```

Sets cookie: `admin_token` (httpOnly, SameSite=strict, 24h)

**Error Responses**

| Status | Body | Reason |
|---|---|---|
| 400 | `{ "error": "Username and password required" }` | Missing fields |
| 401 | `{ "error": "Invalid credentials" }` | Wrong username or password |
| 500 | `{ "error": "Internal server error" }` | DB or server error |

---

### POST `/api/auth/logout`

Clears the admin session cookie.

**Request**: No body required.

**Response** — `200 OK`

```json
{ "success": true }
```

---

### GET `/api/auth/verify`

Verifies the current session token (used by the dashboard on load).

**Response — Valid session** `200 OK`

```json
{ "username": "brijesh" }
```

**Response — No/invalid session** `401 Unauthorized`

```json
{ "error": "Not authenticated" }
```

---

## Admin Profile Endpoints

### GET `/api/admin/profile`

Returns the current admin's profile. **Requires admin auth.**

**Response** — `200 OK`

```json
{
  "username": "brijesh",
  "display_name": "Brijesh Munjiyasara",
  "email": "brijesh@example.com",
  "profile_image": "/uploads/profile_1234567890.png",
  "resume_path": "/uploads/resume_1234567890.pdf",
  "resume_original_name": "Brijesh_Resume.pdf"
}
```

---

### PUT `/api/admin/profile`

Updates the admin profile. **Requires admin auth.**

**Request Body** (all fields optional — only sent fields are used):

```json
{
  "display_name": "Brijesh Munjiyasara",
  "email": "brijesh@example.com",
  "profile_image": "/uploads/profile_1234567890.png",
  "resume_path": "/uploads/resume_1234567890.pdf",
  "resume_original_name": "Brijesh_Resume.pdf",
  "current_password": "oldpassword",
  "new_password": "newpassword123"
}
```

> `current_password` and `new_password` are only needed when changing the password.  
> Send an empty string `""` for `profile_image` to clear the profile photo.

**Response** — `200 OK`

```json
{ "success": true }
```

**Error Responses**

| Status | Body | Reason |
|---|---|---|
| 400 | `{ "error": "Current password is required..." }` | Changing password without providing current |
| 400 | `{ "error": "Current password is incorrect" }` | Wrong current password |
| 401 | `{ "error": "Unauthorized" }` | Not logged in |

---

### POST `/api/admin/upload`

Uploads a profile image or resume file. **Requires admin auth.**

**Request**: `multipart/form-data`

| Field | Type | Values |
|---|---|---|
| `file` | File | The file to upload |
| `type` | string | `"image"` or `"resume"` |

**Accepted formats:**
- `image`: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif` (max 10 MB)
- `resume`: `.pdf`, `.doc`, `.docx` (max 10 MB)

**Response** — `200 OK`

```json
{
  "success": true,
  "url": "/uploads/profile_1234567890.png",
  "originalName": "my-photo.png"
}
```

The returned `url` is a path relative to the public root (e.g. accessible at `https://yoursite.com/uploads/profile_1234567890.png`).

**Error Responses**

| Status | Body | Reason |
|---|---|---|
| 400 | `{ "error": "File and type are required" }` | Missing file or type field |
| 400 | `{ "error": "Invalid image format..." }` | File extension not allowed for images |
| 400 | `{ "error": "Invalid resume format..." }` | File extension not allowed for resumes |
| 401 | `{ "error": "Unauthorized" }` | Not logged in |
| 500 | `{ "error": "Upload failed" }` | Filesystem write error |

---

## Public Profile Endpoint

### GET `/api/portfolio/profile`

Returns public profile data for the homepage. **No auth required.**

**Response** — `200 OK`

```json
{
  "display_name": "Brijesh Munjiyasara",
  "email": "brijesh@example.com",
  "profile_image": "/uploads/profile_1234567890.png",
  "has_resume": true,
  "resume_original_name": "Brijesh_Resume.pdf"
}
```

- `profile_image` — empty string `""` if no photo uploaded
- `profile_image` — empty string `""` if no photo has been uploaded  
- `has_resume` — `true` when a resume has been uploaded; homepage Download button becomes active  
- The Download Resume button is **always visible** on the homepage; `has_resume: false` renders it disabled/greyed

---

## Resume Download Endpoint

### GET `/api/resume`

Streams the uploaded resume as a file download. **No auth required.**

**Response** — `200 OK`

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Brijesh_Resume.pdf"
[binary file content]
```

**Error Responses**

| Status | Reason |
|---|---|
| 404 | No resume has been uploaded yet |

---

## Portfolio Data Endpoints

### About

#### GET `/api/portfolio/about`

Returns the about section content. Public — no auth required.

**Response** — `200 OK`

```json
{
  "id": 1,
  "headline": "Passionate\nAbout Real-World\nAI Impact",
  "paragraph1": "As an MTech student...",
  "paragraph2": "From flood-prediction models..."
}
```

#### PUT `/api/portfolio/about`

Updates the about section. **Requires admin auth.**

**Request Body**

```json
{
  "headline": "New Headline\nWith Line Breaks",
  "paragraph1": "Updated first paragraph.",
  "paragraph2": "Updated second paragraph."
}
```

**Response** — `200 OK`

```json
{ "success": true }
```

---

### Projects

#### GET `/api/portfolio/projects`

Returns project list. Public users see only `visible=1` rows. Authenticated admins see all rows.

**Response** — `200 OK`

```json
[
  {
    "id": 1,
    "num": "(I)",
    "name": "Document Management System",
    "tech": "MEAN Stack · RAG · NLP",
    "detail": "NLP & LLM Integration",
    "image": "https://...",
    "visible": 1,
    "sort_order": 1
  }
]
```

Ordered by `sort_order ASC`.

#### POST `/api/portfolio/projects`

Creates a new project. **Requires admin auth.**

**Request Body**

```json
{
  "num": "(IX)",
  "name": "Project Name",
  "tech": "Python · TensorFlow",
  "detail": "Short description",
  "image": "https://example.com/image.jpg",
  "visible": 1,
  "sort_order": 9
}
```

**Response** — `200 OK`

```json
{ "success": true, "id": 9 }
```

#### PUT `/api/portfolio/projects`

Updates an existing project. **Requires admin auth.**

**Request Body** — include `id` plus any fields to update:

```json
{
  "id": 1,
  "num": "(I)",
  "name": "Updated Name",
  "tech": "Python · FastAPI",
  "detail": "New description",
  "image": "https://...",
  "visible": 0,
  "sort_order": 1
}
```

**Response** — `200 OK`

```json
{ "success": true }
```

#### DELETE `/api/portfolio/projects`

Deletes a project by ID. **Requires admin auth.**

**Request Body**

```json
{ "id": 1 }
```

**Response** — `200 OK`

```json
{ "success": true }
```

---

### Experience

All endpoints mirror the Projects pattern. Base path: `/api/portfolio/experience`

#### GET `/api/portfolio/experience`

Returns experience list. Public sees only visible entries.

**Experience object schema:**

```json
{
  "id": 1,
  "company": "BISAG-N (MeitY), Gandhinagar",
  "role": "Natural Disaster Prediction & Management",
  "tag": "Internship · Govt. of India",
  "period": "May 2025 – Apr 2026",
  "description": "Working at Bhaskaracharya National Institute...",
  "image": "https://...",
  "status": "Current Role",
  "visible": 1,
  "sort_order": 1
}
```

**Status values:** `Current Role` | `Past Role` | `Academic Role` | `Leadership`

#### POST `/api/portfolio/experience` — **Auth required**
#### PUT `/api/portfolio/experience` — **Auth required**
#### DELETE `/api/portfolio/experience` — **Auth required**

---

### Skills

Base path: `/api/portfolio/skills`

#### GET `/api/portfolio/skills`

Returns skill categories. Public sees only visible entries.

**Skill object schema:**

```json
{
  "id": 1,
  "category": "Machine Learning & AI",
  "role": "Core Expertise",
  "skills_list": "TensorFlow · PyTorch · Scikit-learn · OpenCV · YOLO · DeepSORT",
  "image": "https://...",
  "visible": 1,
  "sort_order": 1
}
```

#### POST `/api/portfolio/skills` — **Auth required**
#### PUT `/api/portfolio/skills` — **Auth required**
#### DELETE `/api/portfolio/skills` — **Auth required**

---

### Education

Base path: `/api/portfolio/education`

#### GET `/api/portfolio/education`

Returns education entries. Public sees only visible entries.

**Education object schema:**

```json
{
  "id": 1,
  "title": "MTech in Computer Science & Engineering",
  "institution": "Ahmedabad University",
  "tag": "Education · Pursuing",
  "period": "2024 — Present",
  "description": "School of Engineering...",
  "visible": 1,
  "sort_order": 1
}
```

#### POST `/api/portfolio/education` — **Auth required**
#### PUT `/api/portfolio/education` — **Auth required**
#### DELETE `/api/portfolio/education` — **Auth required**

---

## Error Handling

All endpoints return consistent error shapes:

```json
{ "error": "Human-readable error message" }
```

Common HTTP status codes used:

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request (missing or invalid input) |
| 401 | Unauthorised (no token or invalid token) |
| 500 | Internal server error |
