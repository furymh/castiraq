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


-- V9 Photographer / Storyboard extension
create table if not exists photographer_profiles (user_id uuid primary key references auth.users(id) on delete cascade, bio text default '', city text default '', specialties text[] default '{}', portfolio jsonb default '[]'::jsonb, verified boolean default false, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists photographer_projects (id uuid primary key default gen_random_uuid(), photographer_id uuid not null references auth.users(id) on delete cascade, name text not null check (char_length(name) between 1 and 100), created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists project_talents (project_id uuid references photographer_projects(id) on delete cascade, talent_user_id uuid references auth.users(id) on delete cascade, created_at timestamptz default now(), primary key(project_id,talent_user_id));
create table if not exists storyboards (id uuid primary key default gen_random_uuid(), project_id uuid unique not null references photographer_projects(id) on delete cascade, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists storyboard_scenes (id uuid primary key default gen_random_uuid(), storyboard_id uuid not null references storyboards(id) on delete cascade, name text not null, position int not null default 0, collapsed boolean default false);
create table if not exists storyboard_shots (id uuid primary key default gen_random_uuid(), storyboard_id uuid not null references storyboards(id) on delete cascade, scene_id uuid references storyboard_scenes(id) on delete set null, shot_number int not null, image_path text, shot_size text not null default 'Medium Shot', description text default '', talent_user_id uuid references auth.users(id) on delete set null, camera_angle text, camera_movement text, duration text, notes text, status text not null default 'Draft' check(status in ('Draft','Ready','Done')), position int not null default 0, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists photographer_tasks (id uuid primary key default gen_random_uuid(), project_id uuid not null references photographer_projects(id) on delete cascade, shot_id uuid references storyboard_shots(id) on delete cascade, title text not null, assigned_to uuid references auth.users(id) on delete set null, due_date date, status text not null default 'todo' check(status in ('todo','done')), created_at timestamptz default now(), updated_at timestamptz default now());

alter table photographer_profiles enable row level security; alter table photographer_projects enable row level security; alter table project_talents enable row level security; alter table storyboards enable row level security; alter table storyboard_scenes enable row level security; alter table storyboard_shots enable row level security; alter table photographer_tasks enable row level security;
drop policy if exists photographer_profile_owner on photographer_profiles;
create policy photographer_profile_owner on photographer_profiles for all using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists photographer_project_owner on photographer_projects;
create policy photographer_project_owner on photographer_projects for all using (photographer_id=auth.uid()) with check (photographer_id=auth.uid());
drop policy if exists project_talents_owner on project_talents;
create policy project_talents_owner on project_talents for all using (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid())) with check (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid()));
drop policy if exists storyboard_owner on storyboards;
create policy storyboard_owner on storyboards for all using (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid())) with check (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid()));
drop policy if exists scene_owner on storyboard_scenes;
create policy scene_owner on storyboard_scenes for all using (exists(select 1 from storyboards sb join photographer_projects p on p.id=sb.project_id where sb.id=storyboard_id and p.photographer_id=auth.uid())) with check (exists(select 1 from storyboards sb join photographer_projects p on p.id=sb.project_id where sb.id=storyboard_id and p.photographer_id=auth.uid()));
drop policy if exists shot_owner on storyboard_shots;
create policy shot_owner on storyboard_shots for all using (exists(select 1 from storyboards sb join photographer_projects p on p.id=sb.project_id where sb.id=storyboard_id and p.photographer_id=auth.uid())) with check (exists(select 1 from storyboards sb join photographer_projects p on p.id=sb.project_id where sb.id=storyboard_id and p.photographer_id=auth.uid()));
drop policy if exists task_owner on photographer_tasks;
create policy task_owner on photographer_tasks for all using (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid())) with check (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid()));
