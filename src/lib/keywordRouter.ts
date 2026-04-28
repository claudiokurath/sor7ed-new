/*
  Keyword router — single source of truth for what comes back when a
  user texts SOR7ED. Used by both the live Meta webhook and the manual
  fallback admin route.
*/

import { lookupKeyword, listAllKeywords } from './notion';
import {
  formatTemplateForWhatsApp,
  appendReferralNudge,
  appendMedicalDisclaimer,
} from './whatsapp';

const CRISIS_TRIGGERS = [
  'suicide', 'kill myself', 'end it', 'end my life',
  'self harm', 'self-harm', 'cut myself', 'overdose',
  "can't go on", 'cant go on', 'want to die',
];

const STOP_RESPONSE =
  'You have been unsubscribed from SOR7ED. We will not send any further messages. Reply START at any time to opt back in.';

const CRISIS_RESPONSE =
  'Please call 999 or text SHOUT to 85258 right now. SOR7ED is not a crisis service. You are not alone — please reach out to people trained to help.';

const UNKNOWN_RESPONSE =
  "We don't recognise that keyword. Text MENU to see all available tools.";

/**
 * Resolve the user's inbound text into the message we should send back.
 * NEVER fetches Notion in the crisis path — must be hard-coded per master doc.
 */
export async function resolveKeyword(rawText: string): Promise<{
  reply: string;
  classification: 'crisis' | 'stop' | 'menu' | 'help' | 'tool' | 'article' | 'unknown';
}> {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // 1) CRISIS — hard-coded, runs first, never touches Notion
  if (CRISIS_TRIGGERS.some((trigger) => lower.includes(trigger))) {
    return { reply: CRISIS_RESPONSE, classification: 'crisis' };
  }

  // 2) STOP — must be honoured before anything else
  if (/^stop$/i.test(text)) {
    return { reply: STOP_RESPONSE, classification: 'stop' };
  }

  // 3) MENU / HELP — always free, never deducts credits
  if (/^menu$/i.test(text)) {
    let body =
      'SOR7ED MENU — text any keyword to get the template:\n\n';
    try {
      const keywords = await listAllKeywords();
      body += keywords.length
        ? keywords.map((k) => `▸ ${k}`).join('\n')
        : '▸ TRIAGE — Executive Function Triage\n▸ MENU — this list';
    } catch {
      body += '▸ TRIAGE — Executive Function Triage\n▸ MENU — this list';
    }
    body += '\n\nReply STOP to leave at any time.';
    return { reply: body, classification: 'menu' };
  }

  if (/^help$/i.test(text)) {
    return {
      reply:
        'SOR7ED help.\n\n• Text MENU for the full list of keywords.\n• Text STOP to unsubscribe.\n• Text any keyword (e.g. TRIAGE) to get a template.\n\nNot therapy. Not medical advice. For emergencies call 999 or text SHOUT to 85258.',
      classification: 'help',
    };
  }

  // 4) Notion lookup
  const result = await lookupKeyword(text);
  if (!result.found || !result.template) {
    return { reply: UNKNOWN_RESPONSE, classification: 'unknown' };
  }

  let body = formatTemplateForWhatsApp(result.template);
  if (result.isSensitive) body = appendMedicalDisclaimer(body);
  body = appendReferralNudge(text, body);

  return {
    reply: body,
    classification: result.source === 'article' ? 'article' : 'tool',
  };
}
