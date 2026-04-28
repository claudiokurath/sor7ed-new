# SOR7ED — planetsorted (v3.1)

Next.js 16 App Router build for [sor7ed.com](https://sor7ed.com), aligned to the SOR7ED Master Document.

## Stack

- Next.js 16 + React 19 + Tailwind v4 (CSS-first `@theme`)
- **Notion** — CMS for blog posts and tools, plus CRM
- **Supabase** — magic-link auth + credits ledger
- **Meta WhatsApp Business Cloud API** (free tier — replaces Twilio)
- **Stripe** — paused per Feb 2026 pivot
- **Vercel** — deployment

## Getting started

> **First time?** Read [`SETUP.md`](./SETUP.md) — it walks through Supabase, Notion, and Vercel config end-to-end.

```bash
cp .env.local.example .env.local
# fill in env vars (see SETUP.md)
npm install
npm run dev
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/tools` `/tools/[slug]` | Tools index + detail |
| `/blog` `/blog/[slug]` | Articles index + detail |
| `/about` | Founder, framework, company details |
| `/signup` | Free account, GDPR consent → Supabase magic link + Notion CRM upsert |
| `/auth/callback` | Magic-link redirect handler |
| `/member` | Members-only shell |
| `/cookie-policy` | Cookies and similar technologies |
| `/admin/manual-send` | Hidden admin page — send WhatsApp by hand |
| `/api/signup` | Live: Supabase magic link + Notion CRM dual-write |
| `/api/webhooks/meta` | Meta WhatsApp inbound + verification |
| `/api/admin/manual-send` | Auth-gated manual fallback send |
| `/sitemap.xml` `/robots.txt` | SEO |

## Brand system (locked)

- Colours: black `#000000`, white `#FFFFFF`, yellow `#FFC107` — only
- Type: League Gothic (display, ALL CAPS) + Roboto Light (body)
- 7 Branches cards: yellow always, hover `transform: scale(1.05)`
- Brand assets in `/public`: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png` (1200×630), `manifest.json`

## What `/api/signup` does

```
Request body: { firstName, email, phone, consentMessaging, consentDisclaimer }

1. Validate input + GDPR consent
2. Normalise phone → E.164 (e.g. "+447360277713")
3. Supabase: signInWithOtp → creates user if new, sends magic link
4. Supabase: seed credits_ledger row (balance 0)
5. Notion CRM: upsert by phone (one member = one record, always)
6. Return 200 with { ok, magicLinkSent, crm: { ok, created } }

Notion failure does NOT block magic-link delivery (graceful degrade).
Supabase failure DOES fail loudly — that's the critical path.
```

## Keyword router (per master doc)

`src/lib/keywordRouter.ts` handles every WhatsApp inbound message:

1. **Crisis triggers** → hard-coded 999/SHOUT 85258, never touches Notion
2. **STOP** → unsubscribe acknowledgement
3. **MENU** → live keyword list from Notion
4. **HELP** → quick guide
5. **Notion lookup** on `WhatsApp Trigger` (TOOLS first, then ARTICLES)
6. **Sensitive flag** → auto-appends medical disclaimer
7. **Referral nudge** → appended to every successful delivery
8. **Unknown** → "Text MENU to see all available tools."

## Database expectations

**Notion CRM** (`NOTION_CRM_DB_ID`): Name (title), Email (email), Phone (phone_number), GDPR Consent (checkbox), Status (select), Source (select), Signup Date (date).

**Notion TOOLS / BLOG**: see `SETUP.md` step 2.

**Supabase**: run `supabase/schema.sql` once. Creates `credits_ledger` with RLS, `users_overview` view, and an `updated_at` trigger.

## Pending engineering tasks

- [ ] Replace `src/data/{tools,articles}.ts` static fallbacks with live Notion fetches in server components
- [ ] Add Supabase auth gate around `/member` and `/admin/manual-send` (currently the admin route uses a static token; member page is a shell)
- [ ] Wire Meta WhatsApp once business verification is approved (manual fallback works in the meantime)
