-- Glute Guide fitness tracker schema.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

create table if not exists logged_sets (
  id uuid primary key default gen_random_uuid(),
  week smallint not null,
  day smallint not null,
  exercise_index smallint not null,
  movement_index smallint not null,
  slot_index smallint not null,
  movement_label text not null,
  value numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (week, day, exercise_index, movement_index, slot_index)
);

create table if not exists body_metrics (
  id uuid primary key default gen_random_uuid(),
  log_date date not null unique,
  weight numeric,
  waist numeric,
  hip numeric,
  thigh numeric,
  notes text,
  created_at timestamptz not null default now()
);

alter table logged_sets enable row level security;
alter table body_metrics enable row level security;

-- Single-user app gated client-side by a hardcoded password (see config.js).
-- The anon key already has full read/write access once exposed to the
-- browser, so these policies just make that explicit rather than pretending
-- there's row-level protection here.
create policy "anon full access logged_sets" on logged_sets
  for all using (true) with check (true);

create policy "anon full access body_metrics" on body_metrics
  for all using (true) with check (true);
