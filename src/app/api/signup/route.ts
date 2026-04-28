/*
  POST /api/signup

  Master doc rules enforced:
    - Phone collected & stored in E.164 (unique CRM key)
    - GDPR explicit consent — both checkboxes required
    - Magic-link login via Supabase signInWithOtp (no passwords)
    - Notion CRM mirror, idempotent on phone
    - Notion failure does not block magic-link delivery (graceful degrade)

  Body: { firstName, email, phone, consentMessaging, consentDisclaimer }
*/

import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase';
import { upsertCrmContact } from '@/lib/crm';

function toE164(raw: string): string | null {
  const trimmed = raw.replace(/[^\d+]/g, '');
  if (!trimmed) return null;
  if (trimmed.startsWith('+')) {
    return trimmed.length >= 8 && trimmed.length <= 16 ? trimmed : null;
  }
  // Default to UK if no country code
  return `+44${trimmed.replace(/^0/, '')}`;
}

function normalizeNextPath(raw: unknown): string {
  if (typeof raw !== 'string') return '/member';
  const trimmed = raw.trim();
  if (!trimmed.startsWith('/')) return '/member';
  if (trimmed.startsWith('//')) return '/member';
  return trimmed;
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { firstName, email, phone, next, consentMessaging, consentDisclaimer } = body ?? {};
  if (!firstName || !email || !phone) {
    return NextResponse.json(
      { error: 'firstName, email, and phone are required' },
      { status: 400 },
    );
  }
  if (!consentMessaging || !consentDisclaimer) {
    return NextResponse.json(
      { error: 'Both consent checkboxes are required' },
      { status: 400 },
    );
  }
  const phoneE164 = toE164(String(phone));
  if (!phoneE164) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }

  // ---- Step 1: Supabase magic-link (critical path) ---------------------
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sor7ed.com';
  const nextPath = normalizeNextPath(next);
  const emailRedirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`;

  let supabaseUserId: string | undefined;
  try {
    const supabase = adminClient();

    // signInWithOtp creates the user if they don't exist + emails the magic link.
    // We use the admin client server-side so we control the redirect URL.
    const { error } = await supabase.auth.signInWithOtp({
      email: String(email).toLowerCase(),
      options: {
        emailRedirectTo,
        shouldCreateUser: true,
        data: {
          first_name: firstName,
          phone: phoneE164,
          gdpr_consent_at: new Date().toISOString(),
        },
      },
    });
    if (error) throw error;

    // Try to read the user record so we can mirror the ID into the credits ledger
    const { data: userByEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', String(email).toLowerCase())
      .maybeSingle();
    supabaseUserId = userByEmail?.id;
  } catch (err) {
    return NextResponse.json(
      { error: `Supabase signup failed: ${(err as Error).message}` },
      { status: 500 },
    );
  }

  // ---- Step 2: Credits ledger (best-effort) ----------------------------
  // Business model is paused (Feb 2026 pivot — everything free), so we
  // just seed a 0-balance row so future credit logic has something to read.
  if (supabaseUserId) {
    try {
      const supabase = adminClient();
      await supabase
        .from('credits_ledger')
        .upsert(
          { user_id: supabaseUserId, balance: 0 },
          { onConflict: 'user_id', ignoreDuplicates: true },
        );
    } catch (err) {
      console.warn('[signup] credits_ledger seed failed', err);
    }
  }

  // ---- Step 3: Notion CRM mirror (best-effort) -------------------------
  let crm: Awaited<ReturnType<typeof upsertCrmContact>> = {
    ok: false,
    created: false,
    error: 'skipped',
  };
  try {
    crm = await upsertCrmContact({
      firstName,
      email: String(email).toLowerCase(),
      phoneE164,
      source: 'Website signup',
      supabaseUserId, // links Notion CRM <-> Supabase auth.users
    });
    if (!crm.ok) {
      console.warn('[signup] CRM upsert failed (non-blocking):', crm.error);
    }
  } catch (err) {
    console.warn('[signup] CRM upsert threw (non-blocking):', err);
  }

  return NextResponse.json({
    ok: true,
    phone: phoneE164,
    magicLinkSent: true,
    crm: { ok: crm.ok, created: crm.created },
    next: nextPath,
  });
}
