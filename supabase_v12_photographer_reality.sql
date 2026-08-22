-- Cast Iraq V12 additive migration: photographer reality planning model.
-- Run after V9/V10 migrations. No destructive operations.

alter table photographer_projects add column if not exists client text;
alter table photographer_projects add column if not exists shoot_date date;
alter table photographer_projects add column if not exists call_time time;
alter table photographer_projects add column if not exists status text default 'planning';
alter table photographer_projects add column if not exists aspect_ratio text default '16:9';
alter table photographer_projects add column if not exists last_context jsonb;

create table if not exists project_locations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references photographer_projects(id) on delete cascade,
  name text not null,
  image_path text,
  address text,
  notes text,
  created_at timestamptz default now()
);
create table if not exists project_looks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references photographer_projects(id) on delete cascade,
  name text not null,
  talent_user_id uuid references auth.users(id) on delete set null,
  image_path text,
  notes text,
  created_at timestamptz default now()
);
create table if not exists project_props (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references photographer_projects(id) on delete cascade,
  name text not null,
  image_path text,
  notes text,
  created_at timestamptz default now()
);
create table if not exists lighting_setups (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references photographer_projects(id) on delete cascade,
  name text not null,
  image_path text,
  notes text,
  created_at timestamptz default now()
);
create table if not exists camera_setups (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references photographer_projects(id) on delete cascade,
  name text not null,
  camera text,
  lens text,
  fps text,
  stabilization text,
  notes text,
  created_at timestamptz default now()
);

alter table storyboard_scenes add column if not exists scene_number int;
alter table storyboard_scenes add column if not exists reference_asset_id uuid;
alter table storyboard_scenes add column if not exists location_id uuid references project_locations(id) on delete set null;
alter table storyboard_scenes add column if not exists look_id uuid references project_looks(id) on delete set null;
alter table storyboard_scenes add column if not exists lighting_setup_id uuid references lighting_setups(id) on delete set null;
alter table storyboard_scenes add column if not exists camera_setup_id uuid references camera_setups(id) on delete set null;
alter table storyboard_scenes add column if not exists time_of_day text;
alter table storyboard_scenes add column if not exists general_look text;
alter table storyboard_scenes add column if not exists estimated_minutes int default 0;
alter table storyboard_scenes add column if not exists notes text;

create table if not exists scene_talents (
  scene_id uuid not null references storyboard_scenes(id) on delete cascade,
  talent_user_id uuid not null references auth.users(id) on delete cascade,
  primary key(scene_id,talent_user_id)
);

alter table storyboard_shots add column if not exists planning_status text default 'draft' check (planning_status in ('draft','ready','issue'));
alter table storyboard_shots add column if not exists capture_status text default 'not_shot' check (capture_status in ('not_shot','captured','retake','skipped'));
alter table storyboard_shots add column if not exists story_order numeric;
alter table storyboard_shots add column if not exists shooting_order numeric;
alter table storyboard_shots add column if not exists priority text default 'must' check (priority in ('must','nice','optional'));
alter table storyboard_shots add column if not exists estimated_minutes int default 5;
alter table storyboard_shots add column if not exists location_id uuid references project_locations(id) on delete set null;
alter table storyboard_shots add column if not exists look_id uuid references project_looks(id) on delete set null;
alter table storyboard_shots add column if not exists lighting_setup_id uuid references lighting_setups(id) on delete set null;
alter table storyboard_shots add column if not exists camera_setup_id uuid references camera_setups(id) on delete set null;
alter table storyboard_shots add column if not exists group_key text;
alter table storyboard_shots add column if not exists quick_note text;
alter table storyboard_shots add column if not exists skip_reason text;

create table if not exists shot_props (
  shot_id uuid not null references storyboard_shots(id) on delete cascade,
  prop_id uuid not null references project_props(id) on delete cascade,
  primary key(shot_id,prop_id)
);

-- Ownership policies: project owner only. Admin policies can be layered separately.
alter table project_locations enable row level security;
alter table project_looks enable row level security;
alter table project_props enable row level security;
alter table lighting_setups enable row level security;
alter table camera_setups enable row level security;
alter table scene_talents enable row level security;
alter table shot_props enable row level security;

do $$
declare t text;
begin
  foreach t in array array['project_locations','project_looks','project_props','lighting_setups','camera_setups'] loop
    execute format('drop policy if exists owner_all on %I',t);
    execute format('create policy owner_all on %I for all using (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid())) with check (exists(select 1 from photographer_projects p where p.id=project_id and p.photographer_id=auth.uid()))',t);
  end loop;
end $$;
