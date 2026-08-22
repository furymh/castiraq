# V13.4 SET Visual QA

## Static brand QA
- SET user-facing titles: PASS
- SET wordmark/mark files: PASS
- favicon + PWA icons: PASS
- manifest name/theme: PASS
- dark-first semantic token layer: PASS
- lime verification override: PASS
- legacy blue remains only in historical CSS/JS layers and is overridden by `styles.set.css`; not removed destructively to preserve old components.

## Pages covered by the brand layer
Home, Auth, Feed, Discover, Reels, Castings, Casting detail, Talent profile, Photographer profile, Company profile, Dashboard, Inbox, Settings, Shortlist, Project Workspace, Storyboard redirects, Moodboard redirects, Privacy, Terms, 404.

## Limitation
Automated browser screenshot regression is not claimed here. Final visual QA should be repeated on the deployed GitHub Pages build at mobile and desktop widths.
