# Rotating Views

Use when one physical surface shows multiple views over time: TRMNL playlists,
kiosk rotations, wall dashboards, anything cycles without user control.

## Physical truth

Rotation destroys adjacency. Viewer may see one screen, arrive halfway through
playlist, and leave before next view. A rotating set is a deck, not long page.

## Rules

- Every view stands alone at a glance. No "continued", "see next", orphaned
totals, or context only present on previous screen.
- Repeat state needed for interpretation: owner/device, generated/as-of time,
key totals, mode, alert state.
- Use consistent masthead: same title area, timestamp position, view label,
status vocabulary.
- Keep chrome pixel-stable across views and refreshes. Movement should mean
information changed, not template drift.
- Design set together. Choose full playlist, then give each view one job.
- Cadence is content. A view seen every 20 minutes cannot carry "now",
"next minute", or progress language unless true when late.
- Avoid cliffhangers. If list cannot fit, show ranked subset plus overflow count
("Top 6 of 18"), not continuation screen.
- Proof each view alone and proof playlist contact sheet. Single proof catches
missing context; contact sheet catches deck drift.

## TRMNL estate-dashboard lessons

Estate dashboard worked because 800x480 was whole artifact: title, owner,
generated time, queue counts, urgent items, reviews, active projects all appeared
on one frame. Future playlist siblings should keep masthead and estate-level
counts, then spend remaining area on one focus: needs-you, reviews, active
projects, freshness/health.

`merge_variables` should carry already-edited display strings and counts for each
view. Renderer must build any playlist screen without reading previous screen.

## Decision-record prompts

- "How many views rotate, and what one job does each view do?"
- "What state must repeat on every view so each stands alone?"
- "Worst-case time between data change and viewer seeing updated view?"
- "Which masthead fields are fixed: title, owner, generated time, view label,
alert count?"
