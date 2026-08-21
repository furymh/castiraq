# Cast Iraq V9 — Photographer + Simple Storyboard

## Added
- Third account type: Photographer.
- Photographer profile and compact dashboard.
- Photographer Projects.
- Add existing talents to project.
- Storyboard with scenes, shot cards, Board/List views, inline description editing, shot size, talent assignment, optional camera details, drag reorder, duplicate/delete/undo, autosave indicator.
- Simple Tasks: To Do / Done, optionally linked to shot and talent.
- Admin feature flags for Photographer Accounts / Storyboard / Tasks.
- Supabase migration with RLS ownership policies.

## Demo login
photo@castiraq.demo / 123456

## New routes
photographer-project.html?id=pp1
storyboard.html?project=pp1

## Philosophy
Frame-first, progressive disclosure, no call sheets/equipment/versioning/AI/annotations.

## QA files
- FINAL_REPORT_V9.md
- QA_SUMMARY_V9.md
- QA_FUNCTIONAL_V9.json
- QA_REGISTRATION_V9.json
- QA_STRESS_V9.json
- QA_RESPONSIVE_STORYBOARD_V9.json
- QA_STATIC_V9.json
- COMPETITIVE_STORYBOARD_V9.md


## V9.0.1 login migration fix
Existing V7/V8 LocalStorage is migrated automatically so the Photographer demo account is available without resetting user data.
