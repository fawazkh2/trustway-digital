-- Durable, atomic throttling for anonymous inquiry endpoints.
create table public.public_request_rate_limits (
  key text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
);

alter table public.public_request_rate_limits enable row level security;
create index public_request_rate_limits_window_started_at_idx on public.public_request_rate_limits (window_started_at);

create or replace function public.consume_public_request_rate_limit(
  rate_key text,
  max_requests integer,
  window_seconds integer
)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  current_count integer;
begin
  delete from public.public_request_rate_limits
  where window_started_at < now() - interval '2 hours';

  insert into public.public_request_rate_limits (key, window_started_at, request_count)
  values (rate_key, now(), 1)
  on conflict (key) do update
  set window_started_at = case
        when public_request_rate_limits.window_started_at <= now() - make_interval(secs => window_seconds)
        then now()
        else public_request_rate_limits.window_started_at
      end,
      request_count = case
        when public_request_rate_limits.window_started_at <= now() - make_interval(secs => window_seconds)
        then 1
        else public_request_rate_limits.request_count + 1
      end
  returning request_count into current_count;

  return current_count <= max_requests;
end;
$$;

revoke all on function public.consume_public_request_rate_limit(text, integer, integer) from public;
grant execute on function public.consume_public_request_rate_limit(text, integer, integer) to service_role;
