import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PATHS = ['/tools', '/blog', '/'];
const SECRET = process.env.NOTION_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (SECRET && body?.secret !== SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
  }

  try {
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
