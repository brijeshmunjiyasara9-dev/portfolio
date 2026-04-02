import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { readFile } from 'fs/promises';
import path from 'path';

/* ── GET /api/resume  ── publicly accessible, triggers download ──────────── */
export async function GET(_req: NextRequest) {
  try {
    const db = await getDb();
    // Get the first (only) admin row
    const admin = await db.get(
      'SELECT resume_path, resume_original_name FROM admin LIMIT 1'
    );

    if (!admin || !admin.resume_path) {
      return NextResponse.json({ error: 'No resume uploaded yet' }, { status: 404 });
    }

    const resumePath = admin.resume_path as string;
    const originalName = (admin.resume_original_name as string) || 'resume.pdf';

    // resumePath is like /uploads/resume_xxx.pdf → map to public/
    const filePath = path.join(process.cwd(), 'public', resumePath);

    const fileBuffer = await readFile(filePath);

    const ext = path.extname(resumePath).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    const contentType = contentTypeMap[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(originalName)}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Resume download error:', err);
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
}

/* ── GET /api/resume/info  ── returns resume metadata (for user-facing UI) ─ */
export async function HEAD(_req: NextRequest) {
  try {
    const db = await getDb();
    const admin = await db.get(
      'SELECT resume_path, resume_original_name FROM admin LIMIT 1'
    );
    if (!admin || !admin.resume_path) {
      return new NextResponse(null, { status: 404 });
    }
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
