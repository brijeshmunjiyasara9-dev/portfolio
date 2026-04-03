import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDb } from '@/lib/db';

/* ── Route segment config ────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/*
 * WHY THIS APPROACH:
 * Vercel (and most serverless platforms) run API routes inside a read-only
 * filesystem — writing to `public/uploads/` throws EROFS / ENOENT errors,
 * which is exactly the 500 that was happening.
 *
 * Instead we store the raw file bytes (base64-encoded) directly in the
 * database and expose them through /api/uploads/[key].  This works on every
 * host with zero extra services.
 */

/* ── Allowed MIME types ──────────────────────────────────────────────────── */
const ALLOWED_IMAGE_MIMES = new Set([
  'image/jpeg', 'image/jpg', 'image/png',
  'image/webp', 'image/gif', 'image/avif',
]);
const ALLOWED_IMAGE_EXTS  = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const ALLOWED_RESUME_MIMES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const ALLOWED_RESUME_EXTS = new Set(['.pdf', '.doc', '.docx']);

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

/* ── Auth helper ─────────────────────────────────────────────────────────── */
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── POST /api/admin/upload ──────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const payload = await requireAuth(req);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string | null; // 'image' or 'resume'

    if (!file || !type) {
      return NextResponse.json(
        { error: 'Both "file" and "type" fields are required.' },
        { status: 400 }
      );
    }

    if (type !== 'image' && type !== 'resume') {
      return NextResponse.json(
        { error: 'Invalid type. Must be "image" or "resume".' },
        { status: 400 }
      );
    }

    // ── Size guard ──────────────────────────────────────────────────────────
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10 MB.' },
        { status: 400 }
      );
    }

    // ── Extension & MIME validation ─────────────────────────────────────────
    const originalName = file.name;
    const ext = ('.' + originalName.split('.').pop()).toLowerCase();
    const mime = file.type || 'application/octet-stream';

    if (type === 'image') {
      if (!ALLOWED_IMAGE_EXTS.has(ext) && !ALLOWED_IMAGE_MIMES.has(mime)) {
        return NextResponse.json(
          { error: 'Invalid image format. Allowed: JPG, PNG, WEBP, GIF, AVIF.' },
          { status: 400 }
        );
      }
    } else {
      if (!ALLOWED_RESUME_EXTS.has(ext) && !ALLOWED_RESUME_MIMES.has(mime)) {
        return NextResponse.json(
          { error: 'Invalid resume format. Allowed: PDF, DOC, DOCX.' },
          { status: 400 }
        );
      }
    }

    // ── Read file bytes ─────────────────────────────────────────────────────
    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString('base64');

    // ── Derive MIME for serving ─────────────────────────────────────────────
    let serveMime = mime;
    if (!serveMime || serveMime === 'application/octet-stream') {
      const mimeMap: Record<string, string> = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.png': 'image/png', '.webp': 'image/webp',
        '.gif': 'image/gif', '.avif': 'image/avif',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      serveMime = mimeMap[ext] ?? 'application/octet-stream';
    }

    // ── Generate a unique storage key ───────────────────────────────────────
    const timestamp = Date.now();
    const prefix = type === 'image' ? 'profile' : 'resume';
    const key = `${prefix}_${timestamp}${ext}`;

    // ── Persist in database ─────────────────────────────────────────────────
    const db = await getDb();
    await db.run(
      `INSERT INTO uploads (key, mime_type, filename, data, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET
         mime_type  = excluded.mime_type,
         filename   = excluded.filename,
         data       = excluded.data,
         created_at = excluded.created_at`,
      [key, serveMime, originalName, base64Data, timestamp]
    );

    // ── Return the serve URL ────────────────────────────────────────────────
    const url = `/api/uploads/${key}`;
    return NextResponse.json({
      success: true,
      url,
      originalName,
    });

  } catch (err) {
    console.error('[upload] Error:', err);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
