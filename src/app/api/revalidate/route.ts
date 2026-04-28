import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PATHS = ['/', '/tools', '/blog'];

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.NOTION_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, error: 'NOTION_REVALIDATE_SECRET is not configured' },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const secret = typeof body?.secret === 'string' ? body.secret : '';

    if (secret !== expectedSecret) {
      return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
    }

    const requestedPaths: string[] = Array.isArray(body?.paths)
      ? body.paths.filter((value: unknown): value is string => typeof value === 'string')
      : typeof body?.path === 'string'
        ? [body.path]
        : DEFAULT_PATHS;

    const paths = Array.from(
      new Set(requestedPaths.map((value: string) => value.trim()).filter(Boolean)),
    );

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ ok: true, revalidated: paths });
  } catch (error) {
    console.error('[revalidate] failed', error);
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }
}
