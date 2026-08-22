# Cast Iraq V11 — Production Planning Workspace

## Keep
Existing Photographer role, Project/Shot/Task/Asset entities, Talent integration, RBAC/feature flags and autosaved LocalStorage demo data.

## Remove / Merge
Separate Moodboard, Storyboard and Tasks application feel. Legacy URLs now redirect into one project workspace.

## Redesign
One workspace with Overview / Board / Shots / Tasks / Files. Shot details use a right inspector on desktop and bottom sheet on mobile. Shooting Mode removes unrelated UI and supports Previous / Done / Next.

## Core UX
- Overview: progress + next actions, not charts.
- Board: visual references, notes, colors and scene shots.
- Shots: Grid/List/Checklist backed by the same Shot entity.
- Tasks: minimal linked tasks.
- Files: reusable project assets.
- Inline editing for project name, notes, shot description and scene name.
- Progressive disclosure for camera/production details.

## Mobile
Dedicated one-column shot cards, bottom-sheet inspector, compact tabs and one-hand Shooting Mode.

## Limitations
This is still a static GitHub Pages demo using LocalStorage. Production offline sync, conflict resolution, server-side permissions, true image thumbnails/object storage and list virtualization require the real backend build.

## V11 acceptance notes
The redesign follows the supplied Master Prompt: one Project Workspace, visual-first hierarchy, progressive disclosure, same-data views and mobile-first Shooting Mode.

### Implemented
Unified project workspace, Overview, visual Board, Scenes/Shots, Grid/List/Checklist, right inspector / mobile bottom sheet, tasks, files, quick add, inline editing, search, status filters, project progress, reusable assets and Shooting Mode.

### Deferred intentionally
True freeform Figma-grade pan/zoom engine, grouped transforms, virtualization for 300+ cards, offline conflict sync, collaborative realtime presence, full crop/annotation editor and server-backed uploads. These should not be represented as complete until the production backend/runtime exists.
