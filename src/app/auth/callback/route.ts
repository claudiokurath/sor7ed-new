import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/member';

  if (!code) {
    return NextResponse.redirect(new URL('/signup?error=missing_code', req.url));
  }

  // Delegate session exchange to the browser-side client so the session
  // is stored in localStorage where the browser Supabase client can read it.
  const params = new URLSearchParams({ code, next });
  return NextResponse.redirect(new URL(`/auth/complete?${params}`, req.url));
}
