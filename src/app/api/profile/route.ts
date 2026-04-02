import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

// GET — public (for site to read display_name, email, resume_url, photos)
export async function GET() {
  const db = await getDb();
  const profile = await db.get('SELECT id, display_name, email, profile_photo, about_photo, resume_url, resume_filename FROM profile WHERE id = 1');
  return NextResponse.json(profile || {
    display_name: 'Brijesh Munjiyasara',
    email: 'brijesh.m@ahduni.edu.in',
    profile_photo: '',
    about_photo: '',
    resume_url: '',
    resume_filename: '',
  });
}

// PUT — admin only: update profile fields (name, email, photos, resume)
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = await getDb();
  const body = await request.json();
  const { display_name, email, profile_photo, about_photo, resume_url, resume_filename } = body;

  await db.run(
    `UPDATE profile SET
      display_name = COALESCE(?, display_name),
      email = COALESCE(?, email),
      profile_photo = COALESCE(?, profile_photo),
      about_photo = COALESCE(?, about_photo),
      resume_url = COALESCE(?, resume_url),
      resume_filename = COALESCE(?, resume_filename)
    WHERE id = 1`,
    [
      display_name ?? null,
      email ?? null,
      profile_photo ?? null,
      about_photo ?? null,
      resume_url ?? null,
      resume_filename ?? null,
    ]
  );
  return NextResponse.json({ success: true });
}

// PATCH — change admin password (requires current password)
export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = await getDb();

  // Get token to find current admin username
  const token = request.cookies.get('admin_token')?.value!;
  const payload = await verifyToken(token);
  const username = payload?.username as string;

  const { current_password, new_password, new_username, new_email } = await request.json();

  // Verify current password
  const admin = await db.get('SELECT * FROM admin WHERE username = ?', [username]);
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

  if (!bcrypt.compareSync(current_password, admin.password as string)) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
  }

  // Update username if provided
  if (new_username && new_username !== username) {
    const exists = await db.get('SELECT id FROM admin WHERE username = ? AND id != ?', [new_username, admin.id]);
    if (exists) return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    await db.run('UPDATE admin SET username = ? WHERE id = ?', [new_username, admin.id]);
  }

  // Update password if provided
  if (new_password && new_password.length >= 6) {
    const hash = bcrypt.hashSync(new_password, 10);
    await db.run('UPDATE admin SET password = ? WHERE id = ?', [hash, admin.id]);
  }

  // Update email in profile if provided
  if (new_email) {
    await db.run('UPDATE profile SET email = ? WHERE id = 1', [new_email]);
  }

  return NextResponse.json({ success: true, new_username: new_username || username });
}
