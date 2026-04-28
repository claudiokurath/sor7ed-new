/*
  Meta WhatsApp Business Cloud API — webhook endpoint.

  GET  /api/webhooks/meta  → verification handshake (Meta sends hub.challenge)
  POST /api/webhooks/meta  → inbound messages

  Configure in Meta App Dashboard:
    Callback URL:  https://sor7ed.com/api/webhooks/meta
    Verify Token:  same value as env META_VERIFY_TOKEN
    Subscribe to:  messages
*/

import { NextResponse } from 'next/server';
import { resolveKeyword } from '@/lib/keywordRouter';
import { sendWhatsappText } from '@/lib/whatsapp';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Meta delivers messages nested under entry[].changes[].value.messages[]
  const entries = body?.entry ?? [];
  for (const entry of entries) {
    const changes = entry?.changes ?? [];
    for (const change of changes) {
      const messages = change?.value?.messages ?? [];
      for (const msg of messages) {
        // Only handle plain text messages for now
        if (msg.type !== 'text') continue;
        const from: string = msg.from; // already E.164 without "+"
        const text: string = msg.text?.body ?? '';

        try {
          const { reply } = await resolveKeyword(text);
          await sendWhatsappText(from, reply);
        } catch (err) {
          console.error('[meta webhook] handler failed', err);
          // Acknowledge anyway — never let Meta retry into a loop.
        }
      }
    }
  }

  // Meta requires 200 OK quickly, otherwise it retries.
  return NextResponse.json({ ok: true });
}
