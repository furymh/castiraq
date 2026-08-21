-- Cast Iraq V10 Visual Production Workspace migration (apply after V9)
create table if not exists project_assets (
 id uuid primary key default gen_random_uuid(), project_id uuid not null, owner_id uuid not null references auth.users(id),
 type text not null default 'image', original_path text, preview_path text, thumbnail_path text, source text default 'upload', created_at timestamptz default now());
create table if not exists visual_boards (
 id uuid primary key default gen_random_uuid(), project_id uuid not null, type text not null check (type in ('moodboard','project')), name text not null, zoom numeric default 1, created_at timestamptz default now());
create table if not exists board_items (
 id uuid primary key default gen_random_uuid(), board_id uuid not null references visual_boards(id) on delete cascade,
 type text not null check (type in ('note','image','color','talent','checklist','link','section','board')),
 asset_id uuid references project_assets(id), talent_id uuid, x numeric default 0, y numeric default 0, width numeric default 240, height numeric default 180,
 z_index int default 1, rotation numeric default 0, locked boolean default false, payload jsonb default '{}'::jsonb, created_at timestamptz default now());
alter table shots add column if not exists capture_status text default 'not_shot' check (capture_status in ('not_shot','captured','retake'));
alter table shots add column if not exists annotation_path text;
alter table shots add column if not exists camera text;
alter table shots add column if not exists lens text;
alter table shots add column if not exists focal_length text;
alter table shots add column if not exists fps text;
alter table shots add column if not exists blocking text;
create table if not exists shot_talents (shot_id uuid not null, talent_id uuid not null, action text, expression text, position text, wardrobe_note text, primary key(shot_id,talent_id));
create table if not exists shot_checklist_items (id uuid primary key default gen_random_uuid(), shot_id uuid not null, text text not null, completed boolean default false, position int default 0);
-- Production: enable RLS and scope all project/board/asset/shot rows to project owner/member. Never trust frontend role checks.
