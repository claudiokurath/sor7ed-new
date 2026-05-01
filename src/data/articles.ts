export type ArticleBlockType =
  | 'paragraph'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote';

export type ArticleBlock = {
  type: ArticleBlockType;
  text: string;
};

export type Article = {
  slug: string;
  title: string;
  branch: string;
  tldr: string;
  excerpt?: string;
  publishedAt: string;
  keyword: string;
  readMinutes: number;
  coverImage?: string;
  body?: ArticleBlock[];
  sourcePageId?: string;
};

// Static fallback data. The live site now attempts to read from the Notion BLOG /
// ARTICLES DB first and only falls back to this array if Notion is unavailable.
export const ARTICLES: Article[] = [
  {
    slug: 'why-todo-lists-fail-with-adhd',
    title: 'Why your to-do list does not work when you have ADHD',
    branch: 'Keep Going',
    tldr: 'To-do lists assume sequence. ADHD brains run on salience. Use TRIAGE, not lists.',
    publishedAt: '2026-04-22',
    keyword: 'TRIAGE',
    readMinutes: 4,
    body: [
      {
        type: 'paragraph',
        text: 'Most to-do systems assume a stable order of operations. ADHD brains often respond to urgency, novelty, dread, and energy instead.',
      },
      {
        type: 'paragraph',
        text: 'A better system starts by naming the bottleneck: task initiation, working memory, overwhelm, or emotional drag. That is why TRIAGE works better than another empty list.',
      },
    ],
  },
  {
    slug: 'time-blindness-is-not-laziness',
    title: 'Time blindness is not laziness',
    branch: 'Plan Ahead',
    tldr: 'Time blindness is a measurable executive function gap. Anchor blocks beat clock blocks.',
    publishedAt: '2026-04-19',
    keyword: 'CALENDAR',
    readMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'If you cannot feel time passing, “just start earlier” is not useful advice. Time needs shape, not guilt.',
      },
      {
        type: 'paragraph',
        text: 'Anchor blocks, buffers, and visible transitions reduce planning friction more reliably than over-detailed hourly calendars.',
      },
    ],
  },
  {
    slug: 'rsd-and-the-unsent-message',
    title: 'RSD and the unsent message',
    branch: 'Be Connected',
    tldr: 'Rejection-sensitive dysphoria turns drafting into spiralling. A scaffold cuts the loop.',
    publishedAt: '2026-04-15',
    keyword: 'MESSAGE',
    readMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: 'When every sentence feels dangerous, the draft never gets sent. Templates reduce the emotional load by narrowing the decisions you have to make.',
      },
    ],
  },
  {
    slug: 'shutdown-vs-burnout',
    title: 'Shutdown is not burnout — and the fix is different',
    branch: 'Feel Good',
    tldr: 'Shutdown is acute. Burnout is chronic. Mistaking one for the other delays recovery.',
    publishedAt: '2026-04-10',
    keyword: 'STATE',
    readMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'Shutdown often needs immediate reduction of demands. Burnout needs longer-term restructuring. If you treat them as the same, you miss the real need.',
      },
    ],
  },
];
