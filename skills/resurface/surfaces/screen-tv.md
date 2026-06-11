---
surface: screen-tv
class: screen
canvas: design at 1920×1080 logical (4K panels = same layout at 2×), 40–75in panels
color: full
interaction: none (no pointer, no hover; remote at best)
refresh: instant
segmentation: none
viewing-distance: 3–5m
ink-economy: n/a
---

# TV — the dashboard across the room

A TV has two million pixels and almost none of them are legible from the couch.
At 3–5m the 10-foot rules apply: huge type, high contrast, a 5% safe area, and
zero interaction. An ambient dashboard earns 2–5 seconds per walk-past glance —
that is the whole attention budget.

## Physical truth

- Design at **1920×1080**; render 4K as the same layout at 2× — design pixels,
  not device pixels.
- On a 55in 1080p panel one pixel ≈ **0.63mm**; at 3m, 1-arcminute acuity makes
  ~1.4px the smallest resolvable detail — single-pixel anything is invisible.
- **Overscan**: many TVs still crop up to ~5%. Safe area at 1080p: **96px
  left/right, 54px top/bottom** → live canvas 1728×972. ("Just Scan"/"PC mode"
  disables it, but you can't assume it's set.)
- Panel processing (sharpening, vivid modes, ABL) halos hairlines and shifts
  colors; ambient light flattens contrast.
- No cursor, no hover, no scroll. The artifact must be complete on one screen
  or rotate on a timer.

## Fidelity budget

Rich in physical area, color, and ambient persistence; starved of interaction
and *effective* resolution — at 3m the canvas carries roughly the legible
information of a phone at 30cm. Budget: ≤7 first-class data points, each
readable in a 2-second glance. Spend color on state, area on type.

## What it's good at

Ambient shared-space dashboards: team status walls, family calendars, transit
and meeting-room boards, metric tickers, rotating briefings — anything many
eyes check and nobody touches.

## Failure modes

- **The desktop dashboard transplant**: 14px widget labels, dense tables —
  illegible wallpaper at 3m.
- Content in the overscan crop: clocks and headers half-eaten at the edges.
- Hairlines and light type shimmering under TV sharpening — rules ≥3px,
  weights ≥regular.
- Full-field white backgrounds: glare by night, ABL dimming by day; dark or
  muted grounds are the native finish.
- Static bright elements burning into OLED panels — nudge pixels or rotate
  layouts on a cycle.
- Data that requires interaction to reveal — there is no interaction.

## Typography minimums

- Body ≥**32px** at 1080p (≈20mm on a 55in panel — comfortably legible at 3m);
  absolute floor 24px for captions.
- Headline/stat numerals **96–160px**.
- High contrast ≥7:1; never mid-gray on gray. Light-on-dark survives living
  rooms best.
- One sentence maximum of running prose, ≤50 characters per line. This surface
  is for labels and numbers, not paragraphs.

## Native idioms

- Big-number-plus-small-label stat blocks on a dark ground.
- Color as state — red/amber/green read across a room — always doubled with
  position or shape for colorblind viewers.
- Timed rotation between boards: 10–20s per board with a position indicator;
  never more boards than the loop can show in a minute.
- Fat progress bars (≥24px tall), not percentages alone.
- An as-of clock in a corner — a wall dashboard with stale data is worse than
  a blank one.
- Layout grid identical across rotating boards so eyes never re-search.

## Required-if-unknown

- "Panel size and viewing distance — 43in at 2m, 55in at 3m, 75in at 5m?
  (sets the type ramp)"
- "What renders the page: the TV's built-in browser (often underpowered) or a
  stick/Pi/PC feeding HDMI?"
- "Is overscan disabled ('Just Scan'/'PC mode'), or should I keep the full 5%
  safe area?"
- "One static board, or a rotating set?"

## Rendering target

Fixed 1920×1080 kiosk HTML, fullscreen browser, no visible cursor:

```css
html, body { width: 1920px; height: 1080px; margin: 0; overflow: hidden }
.safe { position: absolute; inset: 54px 96px }   /* 5% overscan safe area */
:root { font-size: 32px }                         /* 1rem = legibility floor */
```

Data via meta-refresh or websocket; keep JS light for TV-embedded browsers.
Deliver via kiosk-browser connector (`connectors/`).

## Proofing

Screenshot at 1920×1080, then view it scaled to roughly 40% width on a desktop
monitor at arm's length — an honest approximation of a 55in panel at 3m;
everything must still read. Overlay the 5% safe-area frame and check every
element is inside. Convert to grayscale: state encoding must survive without
hue. Leave the real board running for an hour and glance at it from across the
actual room. `references/proofing.md`.
