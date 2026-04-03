import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

/*
 * GET /api/resume
 *
 * Publicly accessible — streams the admin's resume file for download.
 *
 * Resume files are now stored in the `uploads` database table (base64-encoded)
 * rather than on disk, so this route reads from the DB instead of the
 * filesystem.  This works correctly on Vercel and all serverless platforms.
 */
export async function GET(_req: NextRequest) {
  try {
    const db = await getDb();

    // Get the first admin row to find the resume path / key
    const admin = await db.get(
      'SELECT resume_path, resume_original_name FROM admin LIMIT 1'
    );

    if (!admin || !admin.resume_path) {
      return NextResponse.json({ error: 'No resume uploaded yet' }, { status: 404 });
    }

    const resumePath   = admin.resume_path as string;
    const originalName = (admin.resume_original_name as string) || 'resume.pdf';

    // resumePath is now of the form /api/uploads/<key>
    // Extract the key so we can look it up in the uploads table.
    const key = resumePath.startsWith('/api/uploads/')
      ? resumePath.replace('/api/uploads/', '')
      : resumePath.startsWith('/uploads/')
        ? resumePath.replace('/uploads/', '')   // legacy path — try DB too
        : null;

    if (!key) {
      return NextResponse.json({ error: 'Invalid resume path stored in database' }, { status: 500 });
    }

    const row = await db.get(
      'SELECT mime_type, filename, data FROM uploads WHERE key = ?',
      [key]
    );

    if (!row) {
      return NextResponse.json({ error: 'Resume file not found in database' }, { status: 404 });
    }

    const buffer = Buffer.from(row.data as string, 'base64');
    const mime   = (row.mime_type as string) || 'application/pdf';
    const name   = (row.filename as string) || originalName;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': `attachment; filename="${encodeURIComponent(name)}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[resume] Download error:', err);
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
}

/* ── HEAD /api/resume — quick existence check used by the UI ─────────────── */
export async function HEAD(_req: NextRequest) {
  try {
    const db = await getDb();
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
