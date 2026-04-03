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
    ? 'SELECT * FROM education ORDER BY sort_order ASC'
    : 'SELECT * FROM education WHERE visible = 1 ORDER BY sort_order ASC';
  return NextResponse.json(await db.all(query));
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { title, institution, tag, period, description, visible = 1, sort_order = 0 } = await request.json();
  const result = await db.run(
    'INSERT INTO education (title, institution, tag, period, description, visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, institution, tag, period, description, visible ? 1 : 0, sort_order]
  );
  return NextResponse.json({ success: true, id: result.lastInsertRowid });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { id, title, institution, tag, period, description, visible, sort_order } = await request.json();
  await db.run(
    'UPDATE education SET title=?, institution=?, tag=?, period=?, description=?, visible=?, sort_order=? WHERE id=?',
    [title, institution, tag, period, description, visible ? 1 : 0, sort_order, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  const { id } = await request.json();
  await db.run('DELETE FROM education WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
