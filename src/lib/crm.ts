/*
  Notion CRM upsert — aligned to the live SOR7ED CRM schema.

  Per master doc: "One member = one CRM record. Always.
    - if phone exists  → update existing record
    - if phone missing → create exactly one record"

  Live CRM properties (verified from Notion screenshot, Apr 2026):
    Name              (title)
    Email             (email)
    Phone Number      (phone_number)         ← NOTE: "Phone Number", not "Phone"
    GDPR Consent      (checkbox)
    Member Status     (select)               ← NOTE: "Member Status", not "Status"
                                                values used: "New", "Active", "Unsubscribed"
    Date Joined       (date)                 ← NOTE: "Date Joined", not "Signup Date"
    Supabase User ID  (rich_text)            ← optional — links Notion CRM to Supabase auth.users.id
    Workspace Origin  (select)               ← optional — value: "Website signup"
*/

import { Client } from '@notionhq/client';

export type CrmInput = {
  firstName: string;
  email: string;
  phoneE164: string; // must include leading "+"
  source?: string; // -> Workspace Origin
  supabaseUserId?: string; // -> Supabase User ID
};

export type CrmResult = {
  ok: boolean;
  created: boolean;
  pageId?: string;
  error?: string;
};

export async function upsertCrmContact(input: CrmInput): Promise<CrmResult> {
  // Per master doc: initialise the Notion client INSIDE the handler, not
  // globally. Vercel can otherwise cache stale env vars at build time.
  const auth = process.env.NOTION_SECRET || process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_CRM_DB_ID;
  if (!auth || !dbId) {
    return { ok: false, created: false, error: 'Notion CRM env not configured' };
  }
  const notion = new Client({ auth });

  // 1) Find existing record by Phone Number (the unique identifier)
  let existingId: string | undefined;
  try {
    const search = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: 'Phone Number',
        phone_number: { equals: input.phoneE164 },
      },
      page_size: 1,
    });
    existingId = (search.results[0] as any)?.id;
  } catch (err) {
    return {
      ok: false,
      created: false,
      error: `Notion CRM query failed: ${(err as Error).message}`,
    };
  }

  const today = new Date().toISOString().slice(0, 10);

  // 2) Update if exists, else create
  try {
    if (existingId) {
      // Re-signup of an existing member — refresh consent + status, do NOT
      // overwrite Date Joined (we want to preserve their original join date).
      const properties: Record<string, any> = {
        Name: { title: [{ text: { content: input.firstName } }] },
        Email: { email: input.email },
        'GDPR Consent': { checkbox: true },
        'Member Status': { select: { name: 'Active' } },
      };
      if (input.supabaseUserId) {
        properties['Supabase User ID'] = {
          rich_text: [{ text: { content: input.supabaseUserId } }],
        };
      }
      await notion.pages.update({ page_id: existingId, properties });
      return { ok: true, created: false, pageId: existingId };
    }

    // New member
    const properties: Record<string, any> = {
      Name: { title: [{ text: { content: input.firstName } }] },
      Email: { email: input.email },
      'Phone Number': { phone_number: input.phoneE164 },
      'GDPR Consent': { checkbox: true },
      'Member Status': { select: { name: 'New' } },
      'Date Joined': { date: { start: today } },
      'Workspace Origin': { select: { name: input.source ?? 'Website signup' } },
    };
    if (input.supabaseUserId) {
      properties['Supabase User ID'] = {
        rich_text: [{ text: { content: input.supabaseUserId } }],
      };
    }

    const created = await notion.pages.create({
      parent: { database_id: dbId },
      properties,
    });
    return { ok: true, created: true, pageId: (created as any).id };
  } catch (err) {
    return {
      ok: false,
      created: false,
      error: `Notion CRM write failed: ${(err as Error).message}`,
    };
  }
}
