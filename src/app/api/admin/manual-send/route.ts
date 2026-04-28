/*
  Manual fallback send — for when the live webhook is offline (e.g. while Meta
  verification is pending) and you want to respond to keywords by hand.

  POST /api/admin/manual-send
  Headers: x-admin-token: <SOR7ED_ADMIN_TOKEN>
  Body: { phone: "+447XXXXXXXXX", keyword?: "TRIAGE", customText?: "..." }

  Either `keyword` (looks up the template via the keyword router) or
  `customText` (sends raw text) must be provided.

  Env: SOR7ED_ADMIN_TOKEN — random string, set in Vercel
*/

import { NextResponse } from 'next/server';
import { resolveKeyword } from '@/lib/keywordRouter';
import { sendWhatsappText } from '@/lib/whatsapp';

function toE164NoPlus(raw: string): string | null {
  const trimmed = raw.replace(/[^\d+]/g, '');
  if (!trimmed) return null;
  const withCountry = trimmed.startsWith('+')
    ? trimmed
    : `+44${trimmed.replace(/^0/, '')}`;
  return withCountry.replace(/^\+/, '');
}

export async function POST(req: Request) {
  const adminToken = req.headers.get('x-admin-token');
  if (!adminToken || adminToken !== process.env.SOR7ED_ADMIN_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const phone = toE164NoPlus(String(body.phone ?? ''));
  if (!phone) return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });

  const keyword: string | undefined = body.keyword?.toString();
  const customText: string | undefined = body.customText?.toString();

  if (!keyword && !customText) {
    return NextResponse.json(
      { error: 'keyword_or_customText_required' },
      { status: 400 },
    );
  }

  try {
    let messageBody = customText ?? '';
    if (!customText && keyword) {
      const { reply } = await resolveKeyword(keyword);
      messageBody = reply;
    }
    await sendWhatsappText(phone, messageBody);
    return NextResponse.json({ ok: true, sent: messageBody.length, to: phone });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown_error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
