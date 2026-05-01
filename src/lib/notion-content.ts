import { Client } from '@notionhq/client';
import { ARTICLES, type Article, type ArticleBlock } from '@/data/articles';
import { TOOLS, type Tool, type ToolStatus } from '@/data/tools';

const NOTION_SECRET = process.env.NOTION_SECRET || process.env.NOTION_API_KEY;

const TOOLS_DB_ID = process.env.NOTION_TOOLS_DB_ID;
const ARTICLES_DB_ID = process.env.NOTION_ARTICLES_DB_ID || process.env.NOTION_BLOG_DB_ID;

const TOOL_LIST_REVALIDATE_SECONDS = 60;
const TOOL_DETAIL_REVALIDATE_SECONDS = 300;
const ARTICLE_LIST_REVALIDATE_SECONDS = 60;
const ARTICLE_DETAIL_REVALIDATE_SECONDS = 300;

export {
  ARTICLE_DETAIL_REVALIDATE_SECONDS,
  ARTICLE_LIST_REVALIDATE_SECONDS,
  TOOL_DETAIL_REVALIDATE_SECONDS,
  TOOL_LIST_REVALIDATE_SECONDS,
};

function createClient(): Client | null {
  if (!NOTION_SECRET) return null;
  return new Client({ auth: NOTION_SECRET });
}

function getPageId(page: any): string {
  return typeof page?.id === 'string' ? page.id : '';
}

function getProperty(props: Record<string, any>, names: string[]): any {
  for (const name of names) {
    if (props[name]) return props[name];
  }
  return undefined;
}

function plainTextFromProperty(prop: any): string {
  if (!prop) return '';

  if (Array.isArray(prop.title)) {
    return prop.title.map((item: any) => item.plain_text || '').join('').trim();
  }

  if (Array.isArray(prop.rich_text)) {
    return prop.rich_text.map((item: any) => item.plain_text || '').join('').trim();
  }

  if (typeof prop.email === 'string') return prop.email.trim();
  if (typeof prop.phone_number === 'string') return prop.phone_number.trim();
  if (typeof prop.url === 'string') return prop.url.trim();
  if (typeof prop.number === 'number') return String(prop.number);
  if (typeof prop.checkbox === 'boolean') return prop.checkbox ? 'true' : 'false';
  if (typeof prop.formula?.string === 'string') return prop.formula.string.trim();
  if (typeof prop.status?.name === 'string') return prop.status.name.trim();
  if (typeof prop.select?.name === 'string') return prop.select.name.trim();
  if (typeof prop.date?.start === 'string') return prop.date.start.trim();

  return '';
}

function titleFrom(props: Record<string, any>, names: string[]): string {
  return plainTextFromProperty(getProperty(props, names));
}

function textFrom(props: Record<string, any>, names: string[]): string {
  return plainTextFromProperty(getProperty(props, names));
}

function selectFrom(props: Record<string, any>, names: string[]): string {
  const prop = getProperty(props, names);
  return prop?.status?.name || prop?.select?.name || plainTextFromProperty(prop) || '';
}

function checkboxFrom(props: Record<string, any>, names: string[]): boolean {
  const prop = getProperty(props, names);
  return Boolean(prop?.checkbox);
}

function numberFrom(props: Record<string, any>, names: string[], fallback = 0): number {
  const prop = getProperty(props, names);
  if (typeof prop?.number === 'number') return prop.number;
  const parsed = Number(plainTextFromProperty(prop));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function dateFrom(props: Record<string, any>, names: string[], fallback = ''): string {
  const prop = getProperty(props, names);
  return prop?.date?.start || plainTextFromProperty(prop) || fallback;
}

function fileUrlFromPage(page: any, props: Record<string, any>, names: string[]): string | undefined {
  const prop = getProperty(props, names);
  const file = Array.isArray(prop?.files) ? prop.files[0] : undefined;

  if (file?.external?.url) return file.external.url;
  if (file?.file?.url) return file.file.url;
  if (page?.cover?.external?.url) return page.cover.external.url;
  if (page?.cover?.file?.url) return page.cover.file.url;

  return undefined;
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeToolStatus(value: string): ToolStatus {
  const status = value.trim().toLowerCase();
  if (!status) return 'live';
  if (status.includes('soon') || status.includes('draft') || status.includes('planned')) {
    return 'coming-soon';
  }
  return 'live';
}

function isHiddenByStatus(value: string): boolean {
  const status = value.trim().toLowerCase();
  return ['archived', 'hidden', 'inactive'].includes(status);
}

function sortByDateDesc<T extends { publishedAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

async function queryAllPages(databaseId: string): Promise<any[]> {
  const notion = createClient();
  if (!notion) return [];

  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: cursor,
    });

    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return pages;
}

function fallbackTools(): Tool[] {
  return TOOLS;
}

function fallbackArticles(): Article[] {
  return ARTICLES;
}

function mapToolPage(page: any): Tool | null {
  const props = page?.properties || {};
  const name = titleFrom(props, ['Name', 'Title']);
  const slugSource = textFrom(props, ['Slug']) || name;
  const slug = slugify(slugSource);
  const statusRaw = selectFrom(props, ['Status', 'Member Status']);

  if (!name || !slug || isHiddenByStatus(statusRaw)) return null;

  return {
    slug,
    name,
    branch: textFrom(props, ['Branch', 'Category']) || 'Keep Going',
    keyword: (textFrom(props, ['WhatsApp Trigger', 'Keyword']) || 'MENU').toUpperCase(),
    tagline:
      textFrom(props, ['Tagline', 'Summary', 'One-liner']) ||
      textFrom(props, ['Description', 'Template']) ||
      'Practical structure, delivered fast.',
    description:
      textFrom(props, ['Description', 'Template', 'TL;DR']) ||
      'A practical support template designed for fast action.',
    example: textFrom(props, ['Example', 'Sample Output', 'Preview']) || undefined,
    status: normalizeToolStatus(statusRaw),
    template: textFrom(props, ['Template']) || undefined,
    sensitive: checkboxFrom(props, ['Sensitive']),
    coverImage: fileUrlFromPage(page, props, ['Cover']),
    sourcePageId: getPageId(page),
  };
}

function mapArticlePage(page: any): Article | null {
  const props = page?.properties || {};
  const title = titleFrom(props, ['Title', 'Name']);
  // Use slug directly from Notion — do NOT slugify, it's already set correctly
  const slug = textFrom(props, ['Slug']) || slugify(title);
  const statusRaw = selectFrom(props, ['Status']);

  if (!title || !slug || isHiddenByStatus(statusRaw)) return null;

  const publishedAt =
    dateFrom(props, ['Published At', 'Publish Date', 'Date']) || new Date().toISOString().slice(0, 10);

  // Read Time is stored as text e.g. "7 min read" — parse out the number
  const readTimeText = textFrom(props, ['Read Time', 'Read minutes', 'Read Minutes', 'Minutes']);
  const readMinutesFromText = readTimeText ? parseInt(readTimeText) : 0;
  const readMinutes = Number.isFinite(readMinutesFromText) && readMinutesFromText > 0
    ? readMinutesFromText
    : numberFrom(props, ['Read Time', 'Read minutes', 'Read Minutes', 'Minutes'], 4);

  return {
    slug,
    title,
    branch: textFrom(props, ['Branch', 'Category']) || 'Keep Going',
    tldr:
      textFrom(props, ['TL;DR', 'TLDR', 'Summary', 'Tagline']) ||
      'A practical article from SOR7ED with a clear next step.',
    excerpt: textFrom(props, ['Excerpt', 'Description']) || undefined,
    publishedAt,
    keyword: (textFrom(props, ['WhatsApp Trigger', 'Keyword']) || 'MENU').toUpperCase(),
    readMinutes,
    // Cover Image is the property name in this DB
    coverImage: fileUrlFromPage(page, props, ['Cover Image', 'Cover']) ||
      page?.cover?.external?.url || page?.cover?.file?.url || undefined,
    sourcePageId: getPageId(page),
  };
}

function blockText(block: any): string {
  const value = block?.[block?.type];
  const richText = Array.isArray(value?.rich_text) ? value.rich_text : [];
  return cleanText(richText.map((item: any) => item.plain_text || '').join(''));
}

function blockToArticleBlock(block: any): ArticleBlock | null {
  const supportedTypes: ArticleBlock['type'][] = [
    'paragraph',
    'heading_2',
    'heading_3',
    'bulleted_list_item',
    'numbered_list_item',
    'quote',
  ];

  if (!supportedTypes.includes(block?.type)) return null;

  const text = blockText(block);
  if (!text) return null;

  return {
    type: block.type,
    text,
  };
}

async function listBlockChildren(blockId: string): Promise<any[]> {
  const notion = createClient();
  if (!notion) return [];

  const blocks: any[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });

    blocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

async function fetchArticleBlocks(pageId: string): Promise<ArticleBlock[]> {
  if (!pageId) return [];

  try {
    const blocks = await listBlockChildren(pageId);
    return blocks.map(blockToArticleBlock).filter(Boolean) as ArticleBlock[];
  } catch (error) {
    console.error('[notion-content] failed to fetch article blocks', error);
    return [];
  }
}

export async function getTools(): Promise<Tool[]> {
  if (!TOOLS_DB_ID || !NOTION_SECRET) return fallbackTools();

  try {
    const pages = await queryAllPages(TOOLS_DB_ID);
    const tools = pages.map(mapToolPage).filter(Boolean) as Tool[];

    if (!tools.length) return fallbackTools();

    return tools.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'live' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('[notion-content] tools query failed', error);
    return fallbackTools();
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await getTools();
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export async function getArticles(): Promise<Article[]> {
  if (!ARTICLES_DB_ID || !NOTION_SECRET) return sortByDateDesc(fallbackArticles());

  try {
    const pages = await queryAllPages(ARTICLES_DB_ID);
    const articles = pages.map(mapArticlePage).filter(Boolean) as Article[];

    if (!articles.length) return sortByDateDesc(fallbackArticles());

    return sortByDateDesc(articles);
  } catch (error) {
    console.error('[notion-content] articles query failed', error);
    return sortByDateDesc(fallbackArticles());
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fallback = fallbackArticles().find((article) => article.slug === slug) ?? null;

  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return fallback;

  const body = article.sourcePageId ? await fetchArticleBlocks(article.sourcePageId) : [];

  return {
    ...article,
    body: body.length ? body : article.body || fallback?.body || [],
  };
}
