# Cast Iraq V10 — Visual Production Workspace

## Product Architecture
A reusable visual workspace layer was added for photographer projects. Moodboard uses reusable Board/BoardItem data; Storyboard/Shot List/Checklist share the same Shot entity; Tasks link to project/shot.

## Photographer Role
Keeps the V9 photographer role and login. Projects remain private by default.

## Project Board
Project home is now a visual hub with Moodboard, Storyboard, Shot Checklist, Tasks, selected talents and quick notes.

## Moodboard
Desktop freeform drag/move/resize, multi-select with Shift, notes, colors, sections, talent cards, image batch upload, asset reuse into Storyboard, duplicate/delete, undo/redo. Mobile switches to an organized responsive layout rather than forcing desktop freeform behavior.

## Storyboard
Scenes, frame-first Shot cards, drag reorder, duplicate, multi-talent assignment, basic/advanced camera metadata, inline description, inspector, Board/Shot List/Checklist views.

## Frame Editor
Non-destructive annotation overlay with Pen, Line, Arrow, Rectangle, Circle and Text plus Undo/Clear. Original frame remains unchanged.

## Shot List
Same Shot data as Storyboard. Inline edits update the same entity immediately.

## Shot Checklist
Not Shot / Captured / Retake, quick checkbox and progress counts.

## Tasks
Simple List and optional 3-column Board (To Do / Doing / Done). Tasks can be related to a Shot.

## Talent Integration
Project talents are reused in Shot inspector; Moodboard can contain Talent cards.

## Database
Demo uses LocalStorage migrations. `supabase_v10_visual_workspace.sql` adds normalized Asset/Board/BoardItem/ShotTalent/ShotChecklist concepts for production.

## Performance
Images are resized before LocalStorage demo save and loaded lazily. Drag position saves on drop rather than every pointer movement. Production migration separates original/preview/thumbnail assets.

## Mobile
Project Hub becomes stacked visual cards; Moodboard becomes organized 2-column layout; Storyboard is large vertical cards; inspector becomes full screen; checklist is one-hand friendly.

## UX Research
Milanote principles: flexible visual board, quick content creation, low chrome. Boords principles: frame-first storyboards, reorder, synchronized shot list, detailed frame editor. StudioBinder principles: structured shot size/angle/movement metadata.

## Limitations
This remains a GitHub Pages demo using LocalStorage. Backend RLS/IDOR protection, real object storage thumbnails, true multi-user collaboration, robust crop transforms, grouping/alignment guides and clipboard persistence require the production backend/canvas layer. The visible UI does not claim those unimplemented features.
