/*
  Meta WhatsApp Business Cloud API — thin wrapper.
  Required env vars:
    META_WHATSAPP_TOKEN
    META_PHONE_NUMBER_ID
    META_VERIFY_TOKEN
*/

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v21.0';

function endpoint(): string {
  const phoneId = process.env.META_PHONE_NUMBER_ID;
  if (!phoneId) throw new Error('META_PHONE_NUMBER_ID is not set');
  return `https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`;
}

function authHeader(): Record<string, string> {
  const token = process.env.META_WHATSAPP_TOKEN;
  if (!token) throw new Error('META_WHATSAPP_TOKEN is not set');
  return { Authorization: `Bearer ${token}` };
}

export async function sendWhatsappText(to: string, body: string): Promise<void> {
  const cleanTo = to.replace(/[^\d]/g, '');
  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: cleanTo,
      type: 'text',
      text: { preview_url: true, body },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Meta send failed (${res.status}): ${errText}`);
  }
}

export function formatTemplateForWhatsApp(raw: string): string {
  return raw
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<\/?[a-z][a-z0-9]*[^>]*>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function appendReferralNudge(keyword: string, body: string): string {
  const lines = [
    '',
    '---',
    'Know someone who needs this?',
    `Forward this or send: wa.me/447591922247?text=${keyword.toUpperCase()}`,
    'SOR7ED is free. No catch.',
  ];
  return body + lines.join('\n');
}

export function appendMedicalDisclaimer(body: string): string {
  return body + '\n\n— This is not medical or therapeutic advice. For emergencies call 999 or text SHOUT to 85258.';
}
