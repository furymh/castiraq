# SET V13.4.1 — Theme System Fix

## Fixed
- Added real persistent Light/Dark theme engine (`set_theme`).
- Added global theme toggle to the persistent header and auth fallback.
- Added theme-aware SET wordmark variants so the logo stays readable on both themes.
- Reworked legacy Dashboard/Sidebar surfaces to use SET semantic tokens.
- Removed legacy blue active states from dashboard tabs/pipeline filters in the theme layer.
- Fixed white cards with light text in dark mode by normalizing V6/dashboard/workspace surfaces.
- Normalized forms, tables, cards, task boards, storyboard legacy surfaces, overlays and controls.
- Kept Shooting Mode deliberately dark/high-contrast in both themes.

## Theme behavior
- Dark: Charcoal / Slate / Off-white / Lime.
- Light: Off-white / White / Charcoal / Steel / Lime.
- User choice persists across pages.
- If no choice exists, OS preference is used.

## Static QA
- 23 HTML routes scanned.
- 0 missing local dependencies.
- Theme CSS loaded by 19 full pages; 4 remaining HTML files are redirect-only routes.
- `app.v13.js` syntax PASS.
- `theme.v13.js` syntax PASS.
