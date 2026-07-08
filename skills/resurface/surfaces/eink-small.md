---
surface: eink-small
class: eink
canvas: 2.9-7.5in panels, 296x128 to 800x480 px, ~112-138 DPI (see table)
color: mono (1-bit) common; some grayscale-4; some black/white/red
interaction: none
refresh: slow (2-4s full flash mono; 15-30s tri-color; device-pull often minutes)
segmentation: none
viewing-distance: 30-50cm handheld OR 2-3m mounted - must establish
ink-economy: n/a
---

# Small e-ink - patient signpost

small e-paper panel printed page reprints itself few times an hour, holds image
zero power, readable in direct sunlight. cannot animate, cannot do gray
(usually), flashes black when changes. Design stillness: every frame complete,
self-sufficient statement.

## Physical truth

| Panel | Pixels | ~DPI |
|-------|--------|------|
| 2.9" | 296x128 | 112 |
| 4.2" | 400x300 | 119 |
| 5.83" | 648x480 | 138 |
| 7.5" | 800x480 | 124 |

- 1-bit common case: **no anti-aliasing** - glyph edges stairsteps. Some panels
do 4-level gray; black/white/red panels add one spot color.
- Full refresh inverts whole panel (the flash): **2-4s** mono, **15-30s**
tri-color. Partial refresh exists on mono panels but accumulates ghosts.
- Many small e-ink products are **device-pull** systems: server updates now,
panel refreshes on configured wake cadence minutes later.
- Reflective: needs ambient light, superb in sunlight, invisible in dark.
- Image persists unpowered - panel *is* artifact between updates.

## Fidelity budget

Starved pixels, color, motion; rich in persistence, sunlight legibility,
placement freedom (battery + zero-power hold = lives anywhere). Attention
ambient - glances, not sessions. Spend few pixels on one or two facts set large,
not many facts set tiny.

## What it's good for

- Door signs, room status, fridge recipes, pantry inventory, medication prompts.
- Weather glance, calendar next-up, dashboard single KPI.
- Anything can update itself and remain true at next glance, maybe 15 minutes
after render, without power cable.

## Failure modes

- **Gray on 1-bit panel** - dithers mud or thresholds away entirely.
- **Strokes under 2px** break up; light type weights disintegrate.
- **Animation thinking**: spinners, progress, "loading..." - frame caught
mid-state may display next 15 minutes.
- **Layout shift between updates**: moving chrome makes refresh visual event and
worsens ghosting; static elements should be pixel-identical.
- **Stale data dressed fresh**: no seconds, no "2 min ago"; show data true whole
update interval, stamped.
- **Refresh cadence ignored**: "now", countdowns, and cross-screen dependencies
fail when device pull or playlist rotation arrives late.
- **Red as body text** on B/W/R panels - red is slow-refresh accent, not ink.

## Typography minimums

- Handheld/desk (30-50cm): body >=**16px** on 1-bit (~3.6mm 112 DPI); bold
survives better than regular.
- Across-the-room (2-3m): cap height >=10mm -> **>=44px 112 DPI** - 296x128
panel holds one display line plus one caption line. Do math per panel.
- Faces rasterize clean 1-bit: hinted sans, pixel-honest grotesques, mono. No
thin serifs, no light weights.
- Line length fits without auto-wrap: break every line yourself.

## Native idioms

- Big-number-plus-label tiles; one fact per panel region.
- Solid black bands with knocked-out text headers.
- Icon-grade pictograms (weather glyphs, battery bars) - silhouettes, not
illustrations.
- Red (B/W/R panels) single accent: alert, today-marker.
- 50% checkerboard dither "third tone" only 124+ DPI only in >=16px square; never
in type.
- As-of timestamp, small but findable, same position every frame.
- Refresh cadence as editorial constraint: choose facts and wording that remain
true until next pull, not just at render time.

## Required-if-unknown

- "Which panel: 2.9in 296x128, 4.2in 400x300, 5.83in 648x480, 7.5in 800x480,
other (give pixel dimensions)?"
- "Viewed handheld/at desk (30-50cm), mounted read across the room (2-3m)?"
- "Color depth: pure black/white, 4-level gray, or black/white/red?"
- "Is it mounted in fixed orientation (landscape/portrait, locked), or free rotate?"
- "Delivery cadence: instant push, device-pull every N minutes, or playlist rotation?"

## Rendering target

Fixed-pixel HTML exactly panel's resolution -> PNG -> quantize panel's palette
(hard threshold text-dominant frames; ordered dither only imagery on gray-capable
panels):

```css
@page { size: 800px 480px; margin: 0 } /* match panel exactly */
html, body { width: 800px; height: 480px; margin: 0; -webkit-font-smoothing: none }
```

Deliver via `connectors/` - TRMNL upload, OpenEPaperLink, or driver-board image
push.

## Proofing

Quantize PNG true palette inspect at 100%: no gray remnants, strokes >=2px,
timestamp present. mounted panels, view proof ~25% size to simulate 2-3m -
glance tier must survive. Diff consecutive renders: static chrome should be
pixel-identical (less flash, less ghost). For B/W/R, view red channel alone -
design must still work if red is ignored. `references/proofing.md`.
