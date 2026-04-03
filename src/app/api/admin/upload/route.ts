import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDb } from '@/lib/db';

/* ── Route segment config ────────────────────────────────────────────────── */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/* ── Allowed MIME types ──────────────────────────────────────────────────── */
const ALLOWED_IMAGE_MIME: Record<string, string> = {
  'image/jpeg':  '.jpg',
  'image/jpg':   '.jpg',
  'image/png':   '.png',
  'image/webp':  '.webp',
  'image/gif':   '.gif',
  'image/avif':  '.avif',
};

const ALLOWED_RESUME_MIME: Record<string, string> = {
  'application/pdf':                                                          '.pdf',
  'application/msword':                                                       '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

/* ── Auth helper ─────────────────────────────────────────────────────────── */
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── POST /api/admin/upload ─────────────────────────────────────────────── */
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
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 });
    }

    /* ── File size limit: 5 MB for images, 10 MB for resume ─────────────── */
    const MAX_IMAGE_SIZE  = 5  * 1024 * 1024;
    const MAX_RESUME_SIZE = 10 * 1024 * 1024;

    if (type === 'image') {
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: 'Image too large. Maximum size is 5 MB.' },
          { status: 400 }
        );
      }

      const mime = file.type || 'image/jpeg';
      if (!ALLOWED_IMAGE_MIME[mime]) {
        // Also check by extension as fallback
        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
        const extMap: Record<string, string> = {
          jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
          webp: 'image/webp', gif: 'image/gif', avif: 'image/avif',
        };
        const resolvedMime = extMap[ext];
        if (!resolvedMime || !ALLOWED_IMAGE_MIME[resolvedMime]) {
          return NextResponse.json(
            { error: 'Invalid image format. Allowed: JPG, PNG, WEBP, GIF, AVIF.' },
            { status: 400 }
          );
        }
      }

      /* ── Convert to base64 data URL ──────────────────────────────────── */
      const bytes  = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      const resolvedMime = file.type || 'image/jpeg';
      const dataUrl = `data:${resolvedMime};base64,${base64}`;

      /* ── Persist to DB immediately ───────────────────────────────────── */
      const db = await getDb();
      await db.run(
        `UPDATE admin SET profile_image = ? WHERE username = ?`,
        [dataUrl, payload.username as string]
      );

      return NextResponse.json({
        success:      true,
        url:          dataUrl,
        originalName: file.name,
      });
    }

    if (type === 'resume') {
      if (file.size > MAX_RESUME_SIZE) {
        return NextResponse.json(
          { error: 'Resume too large. Maximum size is 10 MB.' },
          { status: 400 }
        );
      }

      const mime = file.type || '';
      const ext  = file.name.split('.').pop()?.toLowerCase() ?? '';
      const extMimeMap: Record<string, string> = {
        pdf:  'application/pdf',
        doc:  'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const resolvedMime = ALLOWED_RESUME_MIME[mime]
        ? mime
        : extMimeMap[ext] ?? '';

      if (!resolvedMime) {
        return NextResponse.json(
          { error: 'Invalid resume format. Allowed: PDF, DOC, DOCX.' },
          { status: 400 }
        );
      }

      /* ── Convert to base64 data URL ──────────────────────────────────── */
      const bytes  = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      const dataUrl = `data:${resolvedMime};base64,${base64}`;

      /* ── Persist to DB immediately ───────────────────────────────────── */
      const db = await getDb();
      await db.run(
        `UPDATE admin SET resume_path = ?, resume_original_name = ? WHERE username = ?`,
        [dataUrl, file.name, payload.username as string]
      );

      return NextResponse.json({
        success:      true,
        url:          dataUrl,
        originalName: file.name,
      });
    }

    return NextResponse.json(
      { error: 'Invalid type. Use "image" or "resume".' },
      { status: 400 }
    );

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
