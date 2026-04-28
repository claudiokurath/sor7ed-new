export type ToolStatus = 'live' | 'coming-soon';

export type Tool = {
  slug: string;
  name: string;
  branch: string;
  keyword: string;
  tagline: string;
  description: string;
  example?: string;
  status: ToolStatus;
  template?: string;
  sensitive?: boolean;
  coverImage?: string;
  sourcePageId?: string;
};

// Static fallback data. The live site now attempts to read from the Notion TOOLS DB
// first and only falls back to this array if Notion is unavailable or env vars are missing.
export const TOOLS: Tool[] = [
  {
    slug: 'executive-function-triage',
    name: 'Executive Function Triage',
    branch: 'Keep Going',
    keyword: 'TRIAGE',
    tagline: 'Identify which executive function is breaking down — and unblock it fast.',
    description:
      'A rapid self-assessment delivered over WhatsApp. Answers a short series of weighted questions covering attention, working memory, cognitive flexibility, impulse control, emotional state, urgency, and complexity. Returns a Triage Score, a plain-language summary, and three targeted strategies.',
    example: 'Reply 1 to begin. Score: 6.4/10 — primary bottleneck: Emotional Regulation.',
    status: 'live',
  },
  {
    slug: 'dopamine-menu',
    name: 'Dopamine Menu',
    branch: 'Keep Going',
    keyword: 'DOPAMINE',
    tagline: 'Pick the right task, right now — without the shame spiral.',
    description:
      'Sends a structured menu of 4 task categories (Quick Wins, Body, Brain, Boring) so the ADHD brain can pick something doable in under 30 seconds.',
    status: 'coming-soon',
  },
  {
    slug: 'difficult-message',
    name: 'Difficult Message',
    branch: 'Be Connected',
    keyword: 'MESSAGE',
    tagline: 'Draft hard conversations — boundaries, apologies, pushbacks.',
    description:
      'Three drafts, three tones (firm, warm, neutral). You pick the version closest to what you want to say and edit from there.',
    status: 'coming-soon',
  },
  {
    slug: 'decision-clarity',
    name: 'Decision Clarity',
    branch: 'Keep Going',
    keyword: 'DECIDE',
    tagline: 'Force clarity when you are stuck between options.',
    description:
      'Breaks paralysis into 5 weighted prompts. Returns a structured comparison and a recommended next step.',
    status: 'coming-soon',
  },
  {
    slug: 'adhd-calendar',
    name: 'ADHD-Friendly Calendar',
    branch: 'Plan Ahead',
    keyword: 'CALENDAR',
    tagline: 'A weekly structure that survives time blindness.',
    description:
      'A 3-block daily template (Anchor, Energy, Buffer) that respects time blindness and protects recovery time.',
    status: 'coming-soon',
  },
  {
    slug: 'biometric-state',
    name: 'Biometric State Tracker',
    branch: 'Feel Good',
    keyword: 'STATE',
    tagline: 'Map sleep, meds, and mood to spot the pattern.',
    description:
      'A lightweight WhatsApp check-in. Logs sleep, medication, and mood; replies with a 7-day pattern read.',
    status: 'coming-soon',
  },
];
