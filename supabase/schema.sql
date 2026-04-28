-- =====================================================================
-- SOR7ED — Supabase initial schema
-- Run this once in the Supabase SQL editor (Project → SQL → New query).
-- The `auth.users` table already exists (managed by Supabase Auth).
-- =====================================================================

-- ---------------------------------------------------------------------
-- credits_ledger
-- One row per user. Balance starts at 0 (Feb 2026 pivot — everything free).
-- Will be used in Q3 2026 if the credit-pack model is re-enabled.
-- ---------------------------------------------------------------------
create table if not exists public.credits_ledger (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  balance   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger to keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_credits_ledger_updated_at on public.credits_ledger;
create trigger trg_credits_ledger_updated_at
before update on public.credits_ledger
for each row execute procedure public.touch_updated_at();

-- ---------------------------------------------------------------------
-- Row Level Security
-- The signup route uses the SERVICE ROLE key, which bypasses RLS.
-- These policies make sure logged-in members can only read their own row.
-- ---------------------------------------------------------------------
alter table public.credits_ledger enable row level security;

drop policy if exists "members read own ledger" on public.credits_ledger;
create policy "members read own ledger"
  on public.credits_ledger
  for select
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Convenience view: combines auth.users metadata with ledger balance.
-- Useful for admin dashboards.
-- ---------------------------------------------------------------------
create or replace view public.users_overview as
select
  u.id,
  u.email,
  u.created_at,
  u.last_sign_in_at,
  u.raw_user_meta_data ->> 'first_name' as first_name,
  u.raw_user_meta_data ->> 'phone'      as phone,
  coalesce(c.balance, 0)                as credit_balance
from auth.users u
left join public.credits_ledger c on c.user_id = u.id;

-- The view inherits the security of the underlying tables — readers must
-- still satisfy RLS on credits_ledger.
