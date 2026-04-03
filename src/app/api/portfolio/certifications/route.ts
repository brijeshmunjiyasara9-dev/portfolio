export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(request: NextRequest) {
  const db = await getDb();
  const isAdmin = await isAuthenticated(request);
  const query = isAdmin
    ? 'SELECT * FROM certifications ORDER BY sort_order ASC'
    : 'SELECT * FROM certifications WHERE visible = 1 ORDER BY sort_order ASC';
  return NextResponse.json(await db.all(query));
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { title, issuer, tag, date_issued, credential_url = '', description = '', image = '', visible = 1, sort_order = 0 } = await request.json();
  const result = await db.run(
    'INSERT INTO certifications (title, issuer, tag, date_issued, credential_url, description, image, visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, issuer, tag, date_issued, credential_url, description, image, visible ? 1 : 0, sort_order]
  );
  return NextResponse.json({ success: true, id: result.lastInsertRowid });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { id, title, issuer, tag, date_issued, credential_url, description, image, visible, sort_order } = await request.json();
  await db.run(
    'UPDATE certifications SET title=?, issuer=?, tag=?, date_issued=?, credential_url=?, description=?, image=?, visible=?, sort_order=? WHERE id=?',
    [title, issuer, tag, date_issued, credential_url ?? '', description ?? '', image ?? '', visible ? 1 : 0, sort_order, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { id } = await request.json();
  await db.run('DELETE FROM certifications WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
