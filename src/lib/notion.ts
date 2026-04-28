/*
  Notion lookups for the WhatsApp keyword router.
  Searches the TOOLS DB first, then BLOG/ARTICLES DB, on the
  `WhatsApp Trigger` property (renamed from old `WhatsApp Keyword`).
*/

import { Client } from '@notionhq/client';

const SECRET = process.env.NOTION_SECRET || process.env.NOTION_API_KEY;

function client(): Client {
  if (!SECRET) throw new Error('NOTION_SECRET is not set');
  return new Client({ auth: SECRET });
}

type LookupResult = {
  found: boolean;
  template?: string;
  title?: string;
  isSensitive?: boolean;
  source?: 'tool' | 'article';
};

function plainText(prop: any): string {
  if (!prop) return '';
  if (prop.rich_text) return prop.rich_text.map((t: any) => t.plain_text).join('');
  if (prop.title) return prop.title.map((t: any) => t.plain_text).join('');
  return '';
}

async function searchDb(dbId: string, keyword: string): Promise<any | null> {
  const notion = client();
  const res = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: 'WhatsApp Trigger',
      rich_text: { equals: keyword.toUpperCase() },
    },
    page_size: 1,
  });
  return res.results[0] ?? null;
}

export async function lookupKeyword(keyword: string): Promise<LookupResult> {
  const k = keyword.trim().toUpperCase();
  if (!k) return { found: false };

  // 1) TOOLS DB
  try {
    const toolsId = process.env.NOTION_TOOLS_DB_ID;
    if (toolsId) {
      const page = await searchDb(toolsId, k);
      if (page) {
        const props = (page as any).properties || {};
        return {
          found: true,
          source: 'tool',
          title: plainText(props.Name) || plainText(props.Title) || k,
          template: plainText(props.Template),
          // Notion checkbox column "Sensitive" — optional, defaults to false
          isSensitive: !!props.Sensitive?.checkbox,
        };
      }
    }
  } catch (e) {
    console.error('[notion] tools lookup failed', e);
  }

  // 2) ARTICLES / BLOG DB
  try {
    const articlesId = process.env.NOTION_ARTICLES_DB_ID || process.env.NOTION_BLOG_DB_ID;
    if (articlesId) {
      const page = await searchDb(articlesId, k);
      if (page) {
        const props = (page as any).properties || {};
        return {
          found: true,
          source: 'article',
          title: plainText(props.Title) || k,
          template: plainText(props.Template) || plainText(props['TL;DR']),
          isSensitive: !!props.Sensitive?.checkbox,
        };
      }
    }
  } catch (e) {
    console.error('[notion] articles lookup failed', e);
  }

  return { found: false };
}

export async function listAllKeywords(): Promise<string[]> {
  const notion = client();
  const out: string[] = [];
  const ids = [process.env.NOTION_TOOLS_DB_ID, process.env.NOTION_ARTICLES_DB_ID]
    .filter(Boolean) as string[];

  for (const id of ids) {
    try {
      const res = await notion.databases.query({ database_id: id, page_size: 100 });
      for (const r of res.results) {
        const v = plainText((r as any).properties?.['WhatsApp Trigger']);
        if (v) out.push(v.toUpperCase());
      }
    } catch (e) {
      console.error('[notion] listAllKeywords failed', e);
    }
  }
  // De-dupe
  return Array.from(new Set(out));
}
