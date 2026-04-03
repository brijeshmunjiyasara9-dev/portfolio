import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

/* ── GET /api/resume  ── publicly accessible, triggers download ──────────── */
export async function GET(_req: NextRequest) {
  try {
    const db    = await getDb();
    const admin = await db.get(
      'SELECT resume_path, resume_original_name FROM admin LIMIT 1'
    );

    if (!admin || !admin.resume_path) {
      return NextResponse.json({ error: 'No resume uploaded yet' }, { status: 404 });
    }

    const resumePath  = admin.resume_path   as string;
    const originalName = (admin.resume_original_name as string) || 'resume.pdf';

    /* ── Serve from base64 data URL stored in DB ─────────────────────────── */
    if (resumePath.startsWith('data:')) {
      // Parse  data:<mime>;base64,<data>
      const commaIdx = resumePath.indexOf(',');
      if (commaIdx === -1) {
        return NextResponse.json({ error: 'Invalid resume data' }, { status: 500 });
      }
      const meta        = resumePath.slice(5, commaIdx);          // e.g. "application/pdf;base64"
      const contentType = meta.split(';')[0];                     // e.g. "application/pdf"
      const b64data     = resumePath.slice(commaIdx + 1);
      const fileBuffer  = Buffer.from(b64data, 'base64');

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type':        contentType,
          'Content-Disposition': `attachment; filename="${encodeURIComponent(originalName)}"`,
          'Cache-Control':       'no-store',
        },
      });
    }

    /* ── Legacy: path-based resume (local dev fallback) ─────────────────── */
    try {
      const { readFile } = await import('fs/promises');
      const path         = await import('path');
      const filePath     = path.join(process.cwd(), 'public', resumePath);
      const fileBuffer   = await readFile(filePath);

      const ext = path.extname(resumePath).toLowerCase();
      const contentTypeMap: Record<string, string> = {
        '.pdf':  'application/pdf',
        '.doc':  'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const contentType = contentTypeMap[ext] || 'application/octet-stream';

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type':        contentType,
          'Content-Disposition': `attachment; filename="${encodeURIComponent(originalName)}"`,
          'Cache-Control':       'no-store',
        },
      });
    } catch {
      return NextResponse.json({ error: 'Resume file not found' }, { status: 404 });
    }

  } catch (err) {
    console.error('Resume download error:', err);
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
}

/* ── HEAD /api/resume  ── returns resume metadata (for user-facing UI) ───── */
export async function HEAD(_req: NextRequest) {
  try {
    const db    = await getDb();
    const admin = await db.get(
      'SELECT resume_path FROM admin LIMIT 1'
    );
    if (!admin || !admin.resume_path) {
      return new NextResponse(null, { status: 404 });
    }
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
