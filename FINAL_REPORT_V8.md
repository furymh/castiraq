# Cast Iraq V8 — Product / UI / QA Report

## Scope
15 HTML routes were inventoried and migrated to V8 assets. Product roles: Talent, Company, Admin, plus RBAC sub-roles.

## P0 / P1 issues addressed
- Responsive rules had accumulated and could conflict across Kanban, KPI grids and mobile navigation.
- Feature visibility was hardcoded into several navigation surfaces.
- Admin controls were fragmented across appearance/content/users instead of a platform control model.
- Permissions were primarily role/UI assumptions rather than an explicit permission catalog.
- Audit data was fragmented between old demo logs.

## UI / UX
- Unified light-first token system, 44px interaction baseline, consistent card rhythm and responsive grids.
- Feature control cards and permission matrix use shared controls and predictable spacing.
- Direct feature access shows an unavailable state when a feature is disabled instead of leaving a broken route.
- Navigation hides disabled feature access points based on role and platform.
- Dashboard widgets can be reordered and shown/hidden in the demo configuration.

## Feature Management
Admin can configure each feature:
- enabled / disabled
- visible roles
- desktop / tablet / mobile
- show/hide in navigation

Seed flags include Feed, Explore, Castings, Reels, Chat, Notifications, Portfolio, Verification, Self-Tapes and Scheduling.

## Roles & Permissions
Seed roles:
- Super Admin
- Admin
- Moderator
- Company Manager
- Company Staff
- Talent

Permission catalog includes users, companies, castings, applications, content, reports, settings, features, roles, permissions, audit and banners.

Admin UI supports:
- permission matrix
- create role
- clone role
- delete non-system role
- assign role to user

## Audit
Important V8 config mutations write an audit record containing actor, action, resource, previous/new values and timestamp in the demo store.

## Security status
### Enforced in current demo
- Permission guards around feature changes.
- Company can create casting; Talent cannot.
- Company cannot toggle platform features.
- Role management requires roles.manage.

### NOT production security yet
The hosted site is still static/localStorage. Browser code can always be modified by the user. Therefore production authorization must be enforced on the backend.

`supabase_v8_rbac.sql` is included with roles, permissions, role_permissions, user_roles, feature_flags, dashboard_widgets, audit_logs, `has_permission()` and RLS policy patterns.

Before real launch, move authentication, ownership checks, role checks, uploads and sensitive mutations to Supabase/backend and remove demo passwords from client seed data.

## Tests executed
- Node syntax check: app.v8.js PASS, db.v8.js PASS.
- Static HTML integrity: 15 routes, 0 missing local dependencies, 0 duplicate IDs.
- RBAC negative/positive test: Admin feature toggle PASS; audit write PASS; Company feature toggle denied PASS; Company create casting PASS; Talent create casting denied PASS.
- Browser responsive critical-flow test: 52 checks across 13 widths (320, 360, 375, 390, 414, 430, 480, 768, 820, 1024, 1280, 1440, 1920) on Feed, Explore, Castings and Talent Profile; 0 unintended horizontal overflow.
- Earlier full public-route smoke on 42 route/viewport combinations reported 0 horizontal overflow and 0 console errors.
- Gzip sizes: app ~30 KB, CSS ~13 KB, DB ~9 KB.

## Remaining production blockers
1. Real Supabase/Auth not connected.
2. No real server-side file upload validation/storage policies active yet.
3. Password reset/email verification are not real.
4. Rate limiting and server-side abuse prevention are not active.
5. Safari iOS / Firefox / Edge need a final device/browser pass after deployment.
6. Real loading/network failure states require actual API integration to test meaningfully.

## Definition of Done status
Frontend beta/product prototype: READY FOR REVIEW.
Production with real users/sensitive data: NOT YET — backend migration and live security validation required.
