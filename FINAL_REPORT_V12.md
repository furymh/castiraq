# Cast Iraq V12 — Photographer Reality Edition

## 1. Photographer Journey Tested
- Login as photographer.
- Create a production project.
- Add project talents.
- Create a Scene.
- Create reusable Location / Look / Lighting Setup / Camera Setup.
- Apply them once at Scene level and confirm Shot inheritance.
- Create Shots with minimal input.
- Override inherited data on a specific Shot.
- Create Wide / Medium / Close-Up variations.
- Maintain separate Story Order and Shooting Order.
- Mark Captured / Needs Retake / Skipped.
- Calculate Shoot Readiness and missing requirements.
- Create 100+ Shots and 50 Tasks.
- Regression login for Talent / Company / Admin.
- Permission negative test: Talent cannot access photographer project data layer.

## 2. Problems Found
### High
- V11 still organized planning around software tabs more than the photographer mental model.
- Scene-level production data was not inherited, causing repeated entry across Shots.
- Story order and shooting order were the same concept.
- Planning status and shoot result were mixed.
- Shoot Readiness did not detect missing Location or Look/Wardrobe.
- Photographer Dashboard still emphasized metrics instead of the next shoot and active work.

### Medium
- Freeform Board behavior could become visual noise in 50–100 Shot projects.
- Technical metadata could still become visible too early.
- Shooting Mode did not provide the three real-world outcomes Captured / Retake / Skip.
- No quick Shot variations workflow for Wide / Medium / Close-Up coverage.

## 3. Why It Hurts a Photographer
Repeated data entry wastes prep time. A single ordering system does not match real production, where the story sequence and the efficient shooting sequence differ. Mixing preparation and capture statuses makes it difficult to know whether a shot is missing information or simply still needs to be filmed. A freeform canvas becomes harder to scan under time pressure.

## 4. Remove
- Files removed from the primary project navigation.
- Freeform canvas is no longer the default planning mental model.
- Charts remain excluded from the photographer overview.
- Technical metadata remains collapsed and secondary.

## 5. Keep
- Existing Project / Scene / Shot / Task / Asset entities.
- Talent database integration.
- Existing Photographer account and public profile.
- Auto-save model.
- Inspector / Bottom Sheet approach.
- Existing image assets and project references.

## 6. Merge
- Mood / references and Storyboard planning are merged into a structured Plan per Scene.
- Shared Scene requirements replace repeated Shot-level entry.
- Storyboard / list / shoot-day state continue using the same Shot entity.

## 7. Add
- Shoot Readiness.
- Problems Before Shoot.
- Continue Planning context.
- Scene inheritance for Location / Look / Lighting / Camera Setup / Talents.
- Reusable project entities: Locations, Looks, Props, Lighting Setups, Camera Setups.
- Story Order vs Shooting Order.
- Planning status: Draft / Ready / Issue.
- Capture result: Not Shot / Captured / Retake / Skipped.
- Priority: Must Have / Nice to Have / Optional.
- Per-shot estimated minutes.
- Shot variations.
- Mobile Shooting Mode MARK SHOT sheet.
- Next Ready Shot behavior.
- Screen Wake Lock request when supported.
- Quick notes during shooting.

## 8. Redesign
The main photographer mental model is now Project → Scene → Look → Shot → Shoot. The Plan page is structured by Scenes. Each Scene owns the reusable production context and its Shots. The Shots page can switch between Story Order and Shooting Order. Shooting Mode is intentionally stripped down.

## 9. Mobile Problems Addressed
- Scene cards become single-column and image-first.
- Shot list changes to compact mobile cards.
- Inspector continues as a bottom sheet on mobile.
- Shooting Mode uses large touch actions and a bottom MARK SHOT sheet.
- Filters and order toggles are horizontally scrollable rather than compressed.
- Primary actions remain reachable without a desktop-style sidebar.

## 10. Shoot-Day Improvements
- MARK SHOT has only Captured / Needs Retake / Skip.
- Next Ready Shot can bypass a shot that is not ready after capture.
- Quick note is available without opening the full Inspector.
- Wake Lock is requested where browser support exists.
- Remaining / Retake / Skipped are visible immediately.

## 11. Changes Implemented
See db.v12.js, workspace.v12.js, styles.v12.css and supabase_v12_photographer_reality.sql.

## 12. QA Results
- Data / workflow tests: 17 / 17 PASS.
- Static routes: 21.
- Missing local dependencies: 0.
- Duplicate HTML IDs: 0.
- styles.v12.css brace validation: PASS.
- db.v12.js syntax: PASS.
- workspace.v12.js syntax: PASS.
- app.v10.js after Photographer dashboard refactor: PASS.
- 100-shot stress data test: PASS.
- 50-task stress data test: PASS.
- Talent / Company / Admin login regression: PASS.
- Unauthorized photographer project data access from Talent role: DENIED as expected.

## 13. Remaining Issues / Honest Limitations
- The deployed demo still uses LocalStorage. Real multi-device sync and backend authorization require Supabase to be connected.
- The included supabase_v12_photographer_reality.sql is additive and prepares the production data model, but has not been executed against a live Supabase project.
- Browser-based visual screenshot automation was attempted with the available Chromium binary, but Chromium did not complete headless rendering in this environment. Static, syntax, data, stress, and permission tests were completed; final visual QA should be repeated on the live GitHub Pages URL after upload.
- Full offline conflict resolution is not implemented. Wake Lock is best-effort and browser-dependent.
- Voice notes remain intentionally out of scope.

## Product Result
V12 prioritizes the real photographer loop: see the Scene, inherit the Look and setup, understand the Shot, see what is missing, shoot it, mark the result, and move on.
