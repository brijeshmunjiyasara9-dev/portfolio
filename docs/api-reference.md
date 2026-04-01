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
