-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references analyses(id) not null,
  user_id uuid references auth.users(id) not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

create index on chat_messages (analysis_id, created_at);

alter table chat_messages enable row level security;

create policy "own chat messages" on chat_messages
  for all using (auth.uid() = user_id);
