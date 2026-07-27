-- Trustway Digital client portal schema. Apply with the Supabase CLI or SQL editor.

create type public.app_role as enum ('admin', 'client');
create type public.project_status as enum ('planning', 'development', 'complete');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null unique,
  role public.app_role not null default 'client',
  avatar text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete restrict,
  title text not null,
  description text not null default '',
  status public.project_status not null default 'planning',
  progress integer not null default 0 check (progress between 0 and 100),
  budget numeric(12, 2),
  start_date date,
  due_date date,
  created_at timestamptz not null default timezone('utc'::text, now()),
  check (due_date is null or start_date is null or due_date >= start_date)
);

create table public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete restrict,
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  filename text not null,
  url text not null,
  uploaded_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 500),
  completed boolean not null default false,
  position integer not null default 0
);

-- Public forms are inserted by server-side route handlers using the service role.
-- No anonymous read policy is created for either table.
create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table public.project_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  project_type text not null,
  budget text not null,
  timeline text not null,
  description text not null,
  attachment_filename text,
  privacy_accepted_at timestamptz not null default timezone('utc'::text, now()),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index projects_client_id_idx on public.projects (client_id);
create index project_messages_project_id_created_at_idx on public.project_messages (project_id, created_at);
create index project_files_project_id_idx on public.project_files (project_id);
create index project_tasks_project_id_position_idx on public.project_tasks (project_id, position);
create index contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);
create index project_requests_created_at_idx on public.project_requests (created_at desc);

-- Roles are controlled from auth.app_metadata only. Never accept a role from user_metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.email, ''),
    coalesce((new.raw_app_meta_data ->> 'role')::public.app_role, 'client'),
    new.raw_user_meta_data ->> 'avatar'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_messages enable row level security;
alter table public.project_files enable row level security;
alter table public.project_tasks enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.project_requests enable row level security;

create policy "Admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Clients view own profile" on public.profiles for select to authenticated using (id = auth.uid());

create policy "Admins manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Clients view own projects" on public.projects for select to authenticated using (client_id = auth.uid());

create policy "Admins manage messages" on public.project_messages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Clients view own project messages" on public.project_messages for select to authenticated using (exists (select 1 from public.projects where projects.id = project_messages.project_id and projects.client_id = auth.uid()));
create policy "Clients send own project messages" on public.project_messages for insert to authenticated with check (sender_id = auth.uid() and exists (select 1 from public.projects where projects.id = project_messages.project_id and projects.client_id = auth.uid()));

create policy "Admins manage files" on public.project_files for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Clients view own project files" on public.project_files for select to authenticated using (exists (select 1 from public.projects where projects.id = project_files.project_id and projects.client_id = auth.uid()));
create policy "Clients upload own project files" on public.project_files for insert to authenticated with check (uploaded_by = auth.uid() and exists (select 1 from public.projects where projects.id = project_files.project_id and projects.client_id = auth.uid()));

create policy "Admins manage tasks" on public.project_tasks for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Clients view own project tasks" on public.project_tasks for select to authenticated using (exists (select 1 from public.projects where projects.id = project_tasks.project_id and projects.client_id = auth.uid()));

create policy "Admins manage contact inquiries" on public.contact_inquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage project requests" on public.project_requests for all to authenticated using (public.is_admin()) with check (public.is_admin());
