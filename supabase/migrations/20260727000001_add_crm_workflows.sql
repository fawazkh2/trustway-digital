-- Admin CRM workflow fields. Apply after 20260727000000_create_client_portal_schema.sql.

do $$ begin
  create type public.inquiry_status as enum ('new', 'in_progress', 'closed');
exception when duplicate_object then null;
end $$;

alter table public.contact_inquiries
  add column if not exists status public.inquiry_status not null default 'new',
  add column if not exists project_id uuid references public.projects (id) on delete set null;

alter table public.project_requests
  add column if not exists status public.inquiry_status not null default 'new',
  add column if not exists project_id uuid references public.projects (id) on delete set null;

create index if not exists contact_inquiries_status_created_at_idx on public.contact_inquiries (status, created_at desc);
create index if not exists project_requests_status_created_at_idx on public.project_requests (status, created_at desc);

-- Private storage bucket for files attached to client projects.
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;
