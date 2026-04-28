/*
  Meta WhatsApp Business Cloud API — thin wrapper.
  Free tier: 1,000 service conversations per month, no monthly fee.
  Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

  Required env vars (set in Vercel):
    META_WHATSAPP_TOKEN          — System user access token (long-lived)
    META_PHONE_NUMBER_ID         — Phone number ID from Meta dashboard (NOT the phone number itself)
    META_VERIFY_TOKEN            — Random string you choose; Meta sends this back during webhook verification
    META_GRAPH_VERSION           — Optional, defaults to v21.0
*/

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v21.0';

function endpoint(): string {
  const phoneId = process.env.META_PHONE_NUMBER_ID;
  if (!phoneId) {
    throw new Error('META_PHONE_NUMBER_ID is not set');
  }
  return `https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`;
}

function authHeader(): Record<string, string> {
  const token = process.env.META_WHATSAPP_TOKEN;
  if (!token) {
    throw new Error('META_WHATSAPP_TOKEN is not set');
  }
  return { Authorization: `Bearer ${token}` };
}

/**
 * Send a plain text WhatsApp message.
 * `to` must be E.164 without the leading "+" (e.g. "447360277713").
 */
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

/**
 * Strip <iframe> blocks and HTML noise from Notion plain_text output.
 * Returns text safe to send through WhatsApp (which renders limited markdown).
 */
export function formatTemplateForWhatsApp(raw: string): string {
  return raw
    // strip iframes Notion sometimes embeds in code blocks
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    // strip stray html tags
    .replace(/<\/?[a-z][a-z0-9]*[^>]*>/gi, '')
    // collapse 3+ newlines into 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Append the standard SOR7ED referral nudge to any tool delivery.
 * Per Master Doc: every delivery activates word-of-mouth.
 */
export function appendReferralNudge(keyword: string, body: string): string {
  const nudge = [
    '',
    '---',
    'Know someone who needs this?',
    `Forward this message or send: wa.me/447360277713?text=${keyword.toUpperCase()}`,
    'SOR7ED is free. No catch.',
  ].join('\n');
  return `${body}${nudge}`;
}

/**
 * Append the medical-disclaimer footer for mental-health-related tools.
 * Per Master Doc: tools touching MH, self-harm, meds, emotional regulation
 * must auto-append this.
 */
export function appendMedicalDisclaimer(body: string): string {
  return `${body}\n\n— This is not medical or therapeutic advice. For emergencies call 999 or text SHOUT to 85258.`;
}
