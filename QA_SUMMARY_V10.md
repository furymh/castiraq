# QA Summary V10

## Pass 1 — Functional
- Photographer login: PASS
- Create visual project: PASS
- Add project talent: PASS
- Create Moodboard/Asset/Board items: PASS
- Move/resize data persistence API: PASS
- Create Scene/Shot: PASS
- Multi-talent assignment: PASS
- Shot checklist: PASS
- Shot-related task: PASS
- Moodboard asset → Storyboard shot: PASS
- Duplicate/Delete/Restore board item: PASS

## Pass 2 — UI/Responsive static architecture
- 20 HTML routes scanned
- Missing local dependencies: 0
- Duplicate IDs: 0
- V10 JS syntax: PASS
- V10 CSS parsed by browser-compatible CSS text construction; no deliberate overflow-x hiding added
- Mobile-specific layouts are provided for Hub, Moodboard, Storyboard, Checklist, Tasks and Inspector

## Pass 3 — Regression / Stress
- Talent login: PASS
- Company login: PASS
- Admin login: PASS
- Photographer login: PASS
- 100 Moodboard items created: PASS
- 100 Storyboard shots created: PASS
- Capture/Retake counts: PASS (60 captured / 10 retake / 40 remaining in stress fixture)

## Environment limitation
The sandbox Chromium policy blocked direct navigation to local HTTP/file URLs, so automated full visual-browser screenshot regression could not be completed in this environment. Functional data tests, static route/dependency checks and stress tests were executed. Manual device verification is still recommended after GitHub deployment.
