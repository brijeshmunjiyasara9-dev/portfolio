import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

/* ── GET /api/portfolio/profile  ── publicly accessible ─────────────────── */
export async function GET() {
  try {
    const db = await getDb();
    const admin = await db.get(
      'SELECT display_name, email, profile_image, resume_path, resume_original_name FROM admin LIMIT 1'
    );

    return NextResponse.json({
      display_name: admin?.display_name || '',
      email: admin?.email || '',
      profile_image: admin?.profile_image || '',
      has_resume: !!(admin?.resume_path),
      resume_original_name: admin?.resume_original_name || '',
    });
  } catch (err) {
    console.error('Portfolio profile error:', err);
    return NextResponse.json({
      display_name: '',
      email: '',
      profile_image: '',
      has_resume: false,
      resume_original_name: '',
    });
  }
}
