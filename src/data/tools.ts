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

export const TOOLS: Tool[] = [
  {
    slug: 'executive-function-triage',
    name: 'Executive Function Triage',
    branch: 'Keep Going',
    keyword: 'TRIAGE',
    tagline: 'Find out exactly what is blocking you — and what to do first.',
    description: 'A 6-dimension diagnostic that identifies your primary executive function bottleneck. Takes 2 minutes. Gives you a concrete first action, a reset plan, and what to avoid — not generic advice.',
    status: 'live',
  },
  {
    slug: 'difficult-message',
    name: 'Difficult Message',
    branch: 'Be Connected',
    keyword: 'MESSAGE',
    tagline: 'Draft the message you have been avoiding. In 3 steps.',
    description: 'Pick the scenario, pick the tone, pick the audience. Get a tailored draft — short version free, full version unlocked after signup. For boundaries, apologies, follow-ups, pushback, and check-ins.',
    status: 'live',
  },
  {
    slug: 'decision-clarity',
    name: 'Decision Clarity',
    branch: 'Plan Ahead',
    keyword: 'DECIDE',
    tagline: 'Stop going in circles. Rate your options. Get a clear answer.',
    description: 'Enter 2–4 options and rate each on urgency, regret risk, energy cost, reversibility, and values fit. The tool scores them and tells you which one wins — and why.',
    status: 'live',
  },
  {
    slug: 'dopamine-menu',
    name: 'Dopamine Menu',
    branch: 'Feel Good',
    keyword: 'MENU',
    tagline: 'Pick activities matched to your energy level right now.',
    description: 'Tell us your current energy level and how much time you have. Get a personalised menu of activities that will actually feel good, not just productive.',
    status: 'coming-soon',
  },
  {
    slug: 'task-breakdown-wizard',
    name: 'Task Breakdown Wizard',
    branch: 'Keep Going',
    keyword: 'BREAKDOWN',
    tagline: 'Turn the overwhelming task into the first tiny step.',
    description: 'Paste in a task that feels impossible. Get it broken into micro-steps with time estimates — sized for your current capacity, not your best day.',
    status: 'coming-soon',
  },
  {
    slug: 'social-battery-tracker',
    name: 'Social Battery Tracker',
    branch: 'Be Yourself',
    keyword: 'BATTERY',
    tagline: 'Know your limit before you hit it.',
    description: 'Log your social energy before and after interactions. Identify which situations drain you most. Get a weekly pattern read.',
    status: 'coming-soon',
  },
];
