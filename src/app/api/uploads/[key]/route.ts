import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

/*
 * GET /api/uploads/[key]
 *
 * Serves a file that was stored in the `uploads` database table by the
 * /api/admin/upload endpoint.  This replaces the old approach of writing
 * files to public/uploads/ on disk, which fails on read-only serverless
 * environments like Vercel.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  if (!key || key.includes('..') || key.includes('/')) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const row = await db.get(
      'SELECT mime_type, filename, data FROM uploads WHERE key = ?',
      [key]
    );

    if (!row) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const buffer = Buffer.from(row.data as string, 'base64');
    const mime   = row.mime_type as string;
    const filename = row.filename as string;

    // Decide Content-Disposition: inline for images, attachment for documents
    const isImage = mime.startsWith('image/');
    const disposition = isImage
      ? `inline; filename="${filename}"`
      : `attachment; filename="${filename}"`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': disposition,
        // Cache for 1 year — the key is unique per upload so cache-busting
        // happens automatically when a new file is uploaded.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('[uploads/serve] Error:', err);
    return NextResponse.json({ error: 'Failed to retrieve file' }, { status: 500 });
  }
}
