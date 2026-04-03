import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

// GET — public
export async function GET() {
  const db = await getDb();
  const about = await db.get('SELECT * FROM about WHERE id = 1');
  return NextResponse.json(about || {});
}

// PUT — admin only
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = await getDb();
  const { headline, paragraph1, paragraph2 } = await request.json();
  await db.run(
    'UPDATE about SET headline = ?, paragraph1 = ?, paragraph2 = ? WHERE id = 1',
    [headline, paragraph1, paragraph2]
  );
  return NextResponse.json({ success: true });
}
