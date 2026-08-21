# Cast Iraq V9 — Photographer + Simple Storyboard

## 1. ماذا أضفت؟
- Photographer كنوع حساب ثالث مستقل.
- Photographer public profile + dashboard بسيط.
- Projects للمصور.
- Find Talents + Save Talent + Add Talent to Project.
- Project workspace: Overview / Talents / Storyboard / Tasks فقط.
- Storyboard Board/List، Scenes، Shots، Upload، Shot Size، Talent، Description، More Details، Status، Duplicate، Delete + Undo، reorder، Auto-save indicator.
- Tasks بسيطة: To Do / Done وربط اختياري بالـShot والموهبة.
- Admin flags: Photographer Accounts / Storyboard / Photographer Tasks.

## 2. Database
Demo collections added: photographers, photoProjects, storyboards, scenes, shots, photoTasks.
Production migration: supabase_v9_photographer.sql adds normalized PostgreSQL tables and ownership RLS policies.

## 3. New Routes
- photographer.html?id=ph1
- photographer-project.html?id=pp1
- storyboard.html?project=pp1

## 4. Photographer Account
Registration now includes Talent / Company / Photographer. Photographer dashboard stays intentionally smaller than Company dashboard.
Demo: photo@castiraq.demo / 123456

## 5. Storyboard
Frame-first. Add Shot immediately. Image is the largest element. Essential fields stay visible; Camera Angle, Movement, Duration and Notes live under More Details.

## 6. Tasks
Only title is required. Related Shot, Assigned Talent and Due Date are optional. Status is To Do / Done.

## 7. Competitive principles
- StudioBinder: core shot metadata.
- Boords: grid + shot-list views and frame-first ordering.
- Milanote: drag/drop and visual simplicity.
No direct visual copy.

## 8. UI/UX fixes
- Reused Cast Iraq design system instead of creating a separate visual product.
- Progressive disclosure instead of long forms.
- Mobile drawer becomes bottom-sheet style.
- Storyboard grids scale 4/3/2/1 cards based on available width.
- Large touch targets and no wide mobile tables.

## 9. Mobile testing
Storyboard layout checked at 320, 360, 375, 390, 414, 430, 480, 768, 820, 1024, 1280, 1440 and 1920 px using a Chromium layout snapshot. No unintended horizontal overflow or off-screen controls were detected in the storyboard surface.

## 10. Remaining issues / production caveat
The shipped site is still a GitHub Pages / LocalStorage beta. Real multi-device persistence, secure uploads and true server-side permission enforcement require connecting Supabase. The included SQL migration contains the intended normalized schema and RLS ownership model, but it is not active until deployed to a Supabase project.

## QA passes
### Pass 1 — Functional data flow
Photographer login, create project, add talents, storyboard creation, duplicate, reorder, task create/done, delete/undo, permission denial and audit logging passed.

### Pass 2 — UI / responsive
18 HTML routes have no missing local dependencies or duplicate IDs. CSS parsed with zero syntax errors. Storyboard responsive snapshot passed all requested widths.

### Pass 3 — Regression / stress
Talent/Company data model remains intact. Photographer registration and feature flag enforcement passed. 100-shot stress data test passed (100 shots created successfully in the demo data layer).
