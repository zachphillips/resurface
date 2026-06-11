---
surface: eink-small
class: eink
canvas: 2.9–7.5in panels, 296×128 to 800×480 px, ~112–138 DPI (see table)
color: mono (1-bit) common; some grayscale-4; some black/white/red
interaction: none
refresh: slow (2–4s full flash mono; 15–30s tri-color)
segmentation: none
viewing-distance: 30–50cm handheld OR 2–3m mounted — must be established
ink-economy: n/a
---

# Small e-ink — the patient signpost

A small e-paper panel is a printed page that reprints itself a few times an hour,
holds its image at zero power, and is readable in direct sunlight. It cannot
animate, cannot do gray (usually), and flashes black when it changes. Design for
stillness: every frame is a complete, self-sufficient statement.

## Physical truth

| Panel | Pixels   | ~DPI |
|-------|----------|------|
| 2.9"  | 296×128  | 112  |
| 4.2"  | 400×300  | 119  |
| 5.83" | 648×480  | 138  |
| 7.5"  | 800×480  | 124  |

- 1-bit is the common case: **no anti-aliasing** — glyph edges are stairsteps.
  Some panels do 4-level gray; black/white/red panels add one spot color.
- Full refresh inverts the whole panel (the flash): **2–4s** mono, **15–30s**
  tri-color. Partial refresh exists on some mono panels but accumulates ghosts.
- Reflective: needs ambient light, superb in sunlight, invisible in the dark.
- Image persists unpowered — the panel *is* the artifact between updates.

## Fidelity budget

Starved of pixels, color, and motion; rich in persistence, sunlight legibility,
and placement freedom (battery + zero-power hold = it lives anywhere). Attention
is ambient — glances, not sessions. Spend the few pixels on one or two facts set
as large as the panel allows, and spend honesty on an as-of timestamp.

## What it's good at

Fridge/door status tags, room signs, weather and next-event tiles, shelf labels
that update themselves, anything that must be true at a glance for the next
15 minutes without a power cable.

## Failure modes

- **Gray on a 1-bit panel** — dithers to mud or thresholds away entirely.
- **Strokes under 2px** break up; light type weights disintegrate.
- **Animation thinking**: spinners, progress, "loading…" — a frame caught
  mid-state is the display for the next 15 minutes.
- **Layout shift between updates**: moving chrome makes every refresh a visual
  event and worsens ghosting; static elements should be pixel-identical.
- **Stale data dressed as fresh**: no seconds, no "2 min ago"; show data true
  for the whole update interval, stamped.
- **Red as body text** on B/W/R panels — red is a slow-refresh accent, not ink.

## Typography minimums

- Handheld/desk (30–50cm): body ≥**16px** on 1-bit (~3.6mm at 112 DPI); bold
  survives better than regular.
- Across-the-room (2–3m): cap height ≥10mm → **≥44px at 112 DPI** — a 296×128
  panel holds one display line plus one caption line. Do that math per panel.
- Faces that rasterize clean at 1-bit: hinted sans, pixel-honest grotesques,
  mono. No thin serifs, no light weights.
- Line length is whatever fits without auto-wrap: break every line yourself.

## Native idioms

- Big-number-plus-label tiles; one fact per panel region.
- Solid black bands with knocked-out text for headers and states.
- Icon-grade pictograms (weather glyphs, battery bars) — silhouettes, not
  illustrations.
- Red (B/W/R panels) as the single accent: the alert, the today-marker.
- 50% checkerboard dither for a "third tone" only at 124+ DPI and only in areas
  ≥16px square; never in type.
- As-of timestamp, small but findable, same position every frame.

## Required-if-unknown

- "Which panel: 2.9in 296×128, 4.2in 400×300, 5.83in 648×480, 7.5in 800×480, or
  other (give pixel dimensions)?"
- "Viewed handheld/at a desk (30–50cm), or mounted and read across the room
  (2–3m)?"
- "Color depth: pure black/white, 4-level gray, or black/white/red?"
- "Is it mounted in a fixed orientation (landscape/portrait, locked), or free
  to rotate?"

## Rendering target

Fixed-pixel HTML at exactly the panel's resolution → PNG → quantize to the
panel's palette (hard threshold for text-dominant frames; ordered dither only
for imagery on gray-capable panels):

```css
@page { size: 800px 480px; margin: 0 }   /* match panel exactly */
html, body { width: 800px; height: 480px; margin: 0;
             -webkit-font-smoothing: none }
```

Deliver via `connectors/` — TRMNL upload, OpenEPaperLink, or a driver-board
image push.

## Proofing

Quantize the PNG to the true palette and inspect at 100%: no gray remnants,
strokes ≥2px, timestamp present. For mounted panels, view the proof at ~25%
size to simulate 2–3m — the glance tier must survive. Diff consecutive renders:
static chrome should be pixel-identical (less flash, less ghost). For B/W/R,
view the red channel alone — the design must still work if red is ignored.
`references/proofing.md`.
