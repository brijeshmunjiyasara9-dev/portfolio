import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/* ── Route segment config: raise body-size limit to 10 MB ───────────────── */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/* ── Auth helper ─────────────────────────────────────────────────────────── */
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── POST /api/admin/upload ─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const payload = await requireAuth(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string | null; // 'image' or 'resume'

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 });
    }

    // Validate file size (10 MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10 MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const originalExt = path.extname(file.name);
    const ext = originalExt.toLowerCase();
    const timestamp = Date.now();

    if (type === 'image') {
      const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
      if (!allowedImageTypes.includes(ext)) {
        return NextResponse.json({ error: 'Invalid image format. Allowed: JPG, PNG, WEBP, GIF, AVIF.' }, { status: 400 });
      }
      const filename = `profile_${timestamp}${ext}`;
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        originalName: file.name,
      });
    }

    if (type === 'resume') {
      const allowedResumeTypes = ['.pdf', '.doc', '.docx'];
      if (!allowedResumeTypes.includes(ext)) {
        return NextResponse.json({ error: 'Invalid resume format. Allowed: PDF, DOC, DOCX.' }, { status: 400 });
      }
      const filename = `resume_${timestamp}${ext}`;
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        originalName: file.name,
      });
    }

    return NextResponse.json({ error: 'Invalid type. Use "image" or "resume".' }, { status: 400 });

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
