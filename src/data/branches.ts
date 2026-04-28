export type Branch = {
  slug: string;
  emoji: string;
  name: string;
  focus: string;
};

export const BRANCHES: Branch[] = [
  { slug: 'keep-going', emoji: '🧠', name: 'Keep Going', focus: 'Focus, persistence, executive function' },
  { slug: 'spend-smart', emoji: '💰', name: 'Spend Smart', focus: 'Money, budgeting, ADHD tax, spending' },
  { slug: 'feel-good',   emoji: '💪', name: 'Feel Good',   focus: 'Body, energy, sleep, meds, self-care' },
  { slug: 'plan-ahead',  emoji: '💻', name: 'Plan Ahead',  focus: 'Systems, calendars, routines, organisation' },
  { slug: 'be-connected',emoji: '🤝', name: 'Be Connected',focus: 'Social, boundaries, relationships, RSD' },
  { slug: 'be-yourself', emoji: '✨', name: 'Be Yourself', focus: 'Identity, masking, authenticity' },
  { slug: 'level-up',    emoji: '🌱', name: 'Level Up',    focus: 'Growth, goals, habits, learning' },
];
