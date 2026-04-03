import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

/* ── Auth helper ─────────────────────────────────────────────────────────── */
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── GET /api/admin/profile ──────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const payload = await requireAuth(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db    = await getDb();
  const admin = await db.get(
    'SELECT id, username, display_name, email, profile_image, resume_path, resume_original_name FROM admin WHERE username = ?',
    [payload.username as string]
  );
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

  return NextResponse.json({
    username:             admin.username             ?? '',
    display_name:         admin.display_name         ?? '',
    email:                admin.email                ?? '',
    profile_image:        admin.profile_image        ?? '',
    resume_path:          admin.resume_path          ?? '',
    resume_original_name: admin.resume_original_name ?? '',
  });
}

/* ── PUT /api/admin/profile ──────────────────────────────────────────────── */
export async function PUT(req: NextRequest) {
  const payload = await requireAuth(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json() as Record<string, string | undefined>;
  const {
    display_name,
    email,
    new_password,
    current_password,
    profile_image,
    resume_path,
    resume_original_name,
  } = body;

  const db    = await getDb();
  const admin = await db.get('SELECT * FROM admin WHERE username = ?', [payload.username as string]);
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

  // ── Password change validation ──────────────────────────────────────────
  if (new_password) {
    if (!current_password) {
      return NextResponse.json(
        { error: 'Current password is required to set a new password' },
        { status: 400 }
      );
    }
    const valid = bcrypt.compareSync(current_password, admin.password as string);
    if (!valid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }
  }

  // ── Build update values ─────────────────────────────────────────────────
  // Use incoming value if key was sent, else keep existing DB value.
  // Explicitly allow empty string to clear a field (e.g. remove profile image).
  const newDisplayName        = display_name         !== undefined ? display_name         : (admin.display_name         as string ?? '');
  const newEmail              = email                !== undefined ? email                : (admin.email                as string ?? '');
  const newProfileImage       = profile_image        !== undefined ? profile_image        : (admin.profile_image        as string ?? '');
  const newResumePath         = resume_path          !== undefined ? resume_path          : (admin.resume_path          as string ?? '');
  const newResumeOriginalName = resume_original_name !== undefined ? resume_original_name : (admin.resume_original_name as string ?? '');

  if (new_password) {
    const hashed = bcrypt.hashSync(new_password, 10);
    await db.run(
      `UPDATE admin SET
         display_name = ?, email = ?, password = ?,
         profile_image = ?, resume_path = ?, resume_original_name = ?
       WHERE username = ?`,
      [newDisplayName, newEmail, hashed, newProfileImage, newResumePath, newResumeOriginalName, payload.username as string]
    );
  } else {
    await db.run(
      `UPDATE admin SET
         display_name = ?, email = ?,
         profile_image = ?, resume_path = ?, resume_original_name = ?
       WHERE username = ?`,
      [newDisplayName, newEmail, newProfileImage, newResumePath, newResumeOriginalName, payload.username as string]
    );
  }

  return NextResponse.json({ success: true });
}
