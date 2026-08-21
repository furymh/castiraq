-- Cast Iraq V8 RBAC + Feature Flags migration (Supabase/Postgres)
-- Run only after reviewing on a staging project.
create extension if not exists pgcrypto;

create table if not exists public.roles (
  id text primary key,
  name text not null,
  enabled boolean not null default true,
  is_system boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.permissions (
  key text primary key,
  resource text not null,
  action text not null,
  description text
);
create table if not exists public.role_permissions (
  role_id text references public.roles(id) on delete cascade,
  permission_key text references public.permissions(key) on delete cascade,
  primary key(role_id, permission_key)
);
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role_id text not null references public.roles(id),
  updated_at timestamptz not null default now()
);
create table if not exists public.feature_flags (
  key text primary key,
  label text not null,
  enabled boolean not null default true,
  visible_roles text[] not null default '{}',
  platforms text[] not null default '{desktop,tablet,mobile}',
  show_in_navigation boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.dashboard_widgets (
  id uuid primary key default gen_random_uuid(),
  role_id text references public.roles(id) on delete cascade,
  widget_key text not null,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  config jsonb not null default '{}'::jsonb,
  unique(role_id, widget_key)
);
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  previous_value jsonb,
  new_value jsonb,
  ip inet,
  created_at timestamptz not null default now()
);

create or replace function public.has_permission(p_permission text)
returns boolean language sql stable security definer set search_path=public as $$
 select exists(
   select 1 from public.user_roles ur
   join public.roles r on r.id=ur.role_id and r.enabled
   join public.role_permissions rp on rp.role_id=r.id
   where ur.user_id=auth.uid() and rp.permission_key=p_permission
 );
$$;

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;
alter table public.feature_flags enable row level security;
alter table public.dashboard_widgets enable row level security;
alter table public.audit_logs enable row level security;

-- Read configuration for authenticated users; public feature visibility can be exposed via a safe view later.
create policy if not exists "authenticated can read enabled roles" on public.roles for select to authenticated using (enabled);
create policy if not exists "authenticated can read permissions" on public.permissions for select to authenticated using (true);
create policy if not exists "admin manages roles" on public.roles for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy if not exists "admin manages role permissions" on public.role_permissions for all to authenticated using (public.has_permission('permissions.manage')) with check (public.has_permission('permissions.manage'));
create policy if not exists "user reads own role" on public.user_roles for select to authenticated using (user_id=auth.uid() or public.has_permission('roles.manage'));
create policy if not exists "admin manages user roles" on public.user_roles for all to authenticated using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy if not exists "read features" on public.feature_flags for select using (enabled or public.has_permission('features.view'));
create policy if not exists "admin manages features" on public.feature_flags for all to authenticated using (public.has_permission('features.toggle')) with check (public.has_permission('features.toggle'));
create policy if not exists "read widgets" on public.dashboard_widgets for select to authenticated using (true);
create policy if not exists "admin manages widgets" on public.dashboard_widgets for all to authenticated using (public.has_permission('features.toggle')) with check (public.has_permission('features.toggle'));
create policy if not exists "admin reads audit" on public.audit_logs for select to authenticated using (public.has_permission('audit.view'));

-- Example ownership policy pattern for castings (adapt column/table names to production schema):
-- create policy "company edits own castings" on public.castings for update to authenticated
-- using (company_id in (select id from public.companies where user_id=auth.uid()) or public.has_permission('castings.edit'));
