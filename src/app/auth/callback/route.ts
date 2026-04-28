/*
  Magic-link callback.
  Supabase redirects here after the user clicks the email link.
  The URL contains a `code` query param we must exchange for a session.
*/

import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/member';

  if (!code) {
    return NextResponse.redirect(new URL('/signup?error=missing_code', req.url));
  }

  try {
    const supabase = adminClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
  } catch (err) {
    console.error('[auth/callback] exchange failed', err);
    return NextResponse.redirect(new URL('/signup?error=invalid_link', req.url));
  }

  return NextResponse.redirect(new URL(next, req.url));
}
