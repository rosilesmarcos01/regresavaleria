-- Waitlist signups from the marketing site (public anon insert only).
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null
);

create unique index if not exists waitlist_email_key on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

grant insert on table public.waitlist to anon;

create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
