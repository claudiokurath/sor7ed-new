# SOR7ED — first-time setup checklist

Follow these steps in order. Total time: ~30 minutes if you have all accounts ready.

## 1. Supabase project

1. Go to <https://supabase.com> → **New project** (free tier is fine).
2. Once provisioned, go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` *(server-only — never put in client code)*
3. Go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, run it. This creates the `credits_ledger` table, the `users_overview` view, and Row Level Security policies.
4. Go to **Authentication → URL Configuration**:
   - **Site URL**: `https://sor7ed.com`
   - **Redirect URLs**: add `https://sor7ed.com/auth/callback` and `http://localhost:3000/auth/callback`
5. Go to **Authentication → Email Templates → Magic Link**. Customise the email if you want (subject, body). The default works fine.

## 2. Notion integration

1. Go to <https://www.notion.so/my-integrations> → **New integration**:
   - Name: `SOR7ED Website`
   - Type: **Internal**
   - Capabilities: **Read content**, **Update content**, **Insert content**
2. Copy the **Internal Integration Secret** → `NOTION_SECRET`.
3. Open each of these databases in Notion and click **"..." → Connections → Add `SOR7ED Website`**:
   - **CRM** (`29e2bff4d39e4bbe90ef0f72d310256b`)
   - **TOOLS** (`08ac767d313845ca91886ce45c379b99`)
   - **BLOG / ARTICLES** (`db668e4687ed455498357b8d11d2c714`)
4. Confirm the **CRM database** has these properties (case-sensitive — these are the live SOR7ED column names, NOT the master-doc placeholders):
   | Property | Type | Used for |
   |----------|------|----------|
   | Name | Title | First name |
   | Email | Email | Login + magic link |
   | Phone Number | Phone | Unique key — links website to WhatsApp |
   | GDPR Consent | Checkbox | Set to true on signup |
   | Member Status | Select | New / Active / Unsubscribed |
   | Date Joined | Date | Original signup date (not overwritten on re-signup) |
   | Workspace Origin | Select | Source of signup, e.g. "Website signup" |
   | Supabase User ID | Text | Links Notion CRM ↔ Supabase auth.users.id |

   The other columns (Credits Balance, Credits Purchased, Subscription Tier, Tools Used, Last Active, Last Trial Used, Trial Score) are **not written by signup** — they're for future use when the credit-pack model goes live.
5. Confirm the **TOOLS database** has these properties:
   | Property | Type |
   |----------|------|
   | Name | Title |
   | WhatsApp Trigger | Text *(was `WhatsApp Keyword` — rename per master doc)* |
   | Template | Text *(was `Excerpt` — rename per master doc)* |
   | Sensitive | Checkbox *(optional — auto-appends medical disclaimer when ticked)* |
6. Confirm the **BLOG / ARTICLES database** has at minimum:
   | Property | Type |
   |----------|------|
   | Title | Title |
   | Slug | Text *(recommended — if omitted, the site auto-generates from Title)* |
   | TL;DR | Text |
   | Branch | Select or Text *(recommended)* |
   | WhatsApp Trigger | Text |
   | Read minutes | Number *(recommended)* |
   | Published At | Date *(recommended)* |
   | Template | Text |
   | Cover | Files & media *(optional)* |

   The article page will read top-level Notion page blocks for the body. Supported block types: paragraph, heading 2, heading 3, bulleted list, numbered list, and quote.

7. Optional but recommended: create a random `NOTION_REVALIDATE_SECRET` value. This lets you trigger `POST /api/revalidate` after a Notion automation or manual content update so changes appear instantly instead of waiting for the normal ISR window.

## 3. Vercel environment variables

In your Vercel project → **Settings → Environment Variables**, add every key listed in `.env.local.example`. Set scope to **Production, Preview, Development** for the public ones; **Production** only for service-role and admin secrets.

| Name | Required for | Notes |
|------|--------------|-------|
| `NEXT_PUBLIC_SITE_URL` | Magic-link redirect | `https://sor7ed.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth (client + server) | from Supabase API page |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth (client) | from Supabase API page |
| `SUPABASE_SERVICE_ROLE_KEY` | Server signup writes | server-only — don't expose |
| `NOTION_SECRET` | All Notion reads/writes | the integration secret |
| `NOTION_REVALIDATE_SECRET` | On-demand cache refresh | optional but recommended |
| `NOTION_CRM_DB_ID` | Signup CRM mirror | `29e2bff4d39e4bbe90ef0f72d310256b` |
| `NOTION_TOOLS_DB_ID` | Tool index + tool detail + keyword lookup | `08ac767d313845ca91886ce45c379b99` |
| `NOTION_ARTICLES_DB_ID` | Blog index + article detail + keyword lookup | `db668e4687ed455498357b8d11d2c714` |
| `NOTION_BLOG_DB_ID` | Legacy alias for blog DB | same as ARTICLES |
| `META_WHATSAPP_TOKEN` | WhatsApp send | from Meta dashboard |
| `META_PHONE_NUMBER_ID` | WhatsApp send | from Meta dashboard |
| `META_VERIFY_TOKEN` | Meta webhook handshake | any random string you choose |
| `SOR7ED_ADMIN_TOKEN` | `/admin/manual-send` gate | any random string you choose |

After adding env vars, **redeploy** (Vercel does not pick up new env vars automatically until next deploy).

## 4. Smoke tests

Once everything's set, test in this order:

1. **Notion read** — visit `/blog` and `/tools`. They should reflect live Notion content within ~60 seconds of a change, while still falling back safely if Notion returns nothing. ✓
2. **Signup** — fill out `/signup` with your real email + phone. You should:
   - Get a magic-link email within ~30 seconds
   - See a new row in **Notion CRM** with your phone, email, GDPR Consent ticked, Status = New
   - See a new row in `auth.users` in Supabase (Authentication → Users)
   - See a new row in `credits_ledger` with balance 0
3. **Magic link click** — opens `/auth/callback`, redirects to `/member`. You should be logged in.
4. **Re-signup** with the same phone — Notion CRM should **update** the existing row, not create a duplicate (one member = one record).

## 5. Common issues

- **"Notion CRM query failed: object_not_found"** → you forgot to add the integration to the CRM database. Step 2.3.
- **Tools or blog content never updates** → check `NOTION_SECRET`, confirm the integration has access to the TOOLS and BLOG databases, and redeploy after adding env vars.
- **Content updates but takes a minute** → that is expected. List pages use ISR (~60 seconds) and detail pages use ISR (~300 seconds). Use `POST /api/revalidate` with your `NOTION_REVALIDATE_SECRET` if you want instant refresh.
- **"Phone Number is not a property"** → property name in Notion doesn't match what the code expects. The code uses these EXACT names (case-sensitive): `Name`, `Email`, `Phone Number`, `GDPR Consent`, `Member Status`, `Date Joined`, `Workspace Origin`, `Supabase User ID`.
- **Magic-link email never arrives** → check Supabase **Authentication → Logs** and your email spam folder. If still nothing, check Supabase **Authentication → Email** is enabled.
- **Magic-link redirect lands on a 404** → you didn't add `/auth/callback` to Supabase **Redirect URLs**. Step 1.4.
- **Service role key error in browser console** → never reference `SUPABASE_SERVICE_ROLE_KEY` in a client component. Only `adminClient()` uses it, and it lives in `src/lib/supabase.ts`.
