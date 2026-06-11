---
surface: eink-large
class: eink
canvas: 10.3in 1872×1404 (227 PPI); 13.3in 1600×1200 (150 PPI) or 2200×1650 (~207 PPI); repurposed Kindle/Kobo 167–300 PPI
color: grayscale-16
interaction: none mounted; touch on repurposed readers
refresh: slow (1–3s full flash; partial faster but ghosts)
segmentation: none
viewing-distance: 1–3m wall-mounted; 30–40cm handheld
ink-economy: n/a
---

# Large e-ink — the typographer's wall

A 10–13in e-paper panel with 16 grays at 200–300 PPI renders type at print
quality and holds it at zero power. This is the one electronic surface that
rewards real typographic care: set it like a broadsheet page, hang it like a
framed print, and let it quietly be correct all day.

## Physical truth

- 10.3in panels: **1872×1404, 227 PPI** (reMarkable 2 / Boox Note Air / Kobo
  Elipsa class).
- 13.3in panels: **1600×1200 at 150 PPI** (ED133UT2 class); newer generation
  **2200×1650 at ~207 PPI**.
- Repurposed readers as wall dashboards: Kindle Paperwhite (2015 onward)
  **300 PPI** — 1072×1448 (6in) or 1236×1648 (6.8in) — print-grade type; older
  basic Kindles **167 PPI, 600×800**. Kobo Clara line is also 300 PPI.
- **16-level grayscale (4-bit)** typical: real anti-aliasing, real halftones.
- Full refresh flashes (~1–3s); partial refresh is quick but ghosts accumulate
  until a full refresh clears them. Reflective; zero-power image hold.

## Fidelity budget

Rich in resolution, gray nuance, and persistence; starved of color and motion.
Unusually for an electronic surface, the budget surplus is *typographic*: at
227–300 PPI with 16 grays, hairlines, serifs, optical sizes, and smooth
anti-aliased curves all render. Spend the surplus on type quality and
composition, not on cramming more data.

## What it's good at

Wall calendars and daily briefings that look like framed prints, reading-queue
and quote boards, household dashboards with broadsheet dignity, status displays
in spaces where a glowing LCD would be wrong.

## Failure modes

- **Ghost accumulation**: partial updates without scheduled full refreshes leave
  yesterday's layout haunting today's.
- **Layout shift between updates** — every change flashes; static chrome must be
  pixel-identical across renders.
- **Color habits**: hue-coded categories collapse in grayscale; re-encode as
  weight, value steps (use the 16 levels deliberately), or position.
- **Kiosk font fallback**: web fonts that fail to load on a rooted reader's
  browser destroy the entire point of this surface — embed or pre-install.
- **Viewport mis-scaling** on reader browsers: set an explicit viewport and
  design at exact device pixels.
- **Dead battery, confident data**: an unpowered panel keeps displaying — the
  as-of stamp is the only defense.

## Typography minimums

- Handheld (30–40cm): book rules apply — body 10–12pt equivalent (≈42–50px at
  300 PPI), anything a printed page can do.
- Wall at 1–3m: walk-up body ≥5mm cap height (**59px at 300 PPI, 45px at 227,
  30px at 150**); across-room headline ≥10mm (double those).
- Hairlines render at 1px from 227 PPI up — this is the rare mono surface where
  0.5pt-equivalent rules are safe.
- Real faces: text serifs, optical sizes, true small caps. Line length 45–75
  characters. This surface deserves the `references/typography-and-size.md`
  full treatment.

## Native idioms

- Broadsheet vocabulary: drop caps, small-caps labels, hanging indents, thin
  rules, generous margins (e-ink white is slightly gray; whitespace reads as
  paper).
- Grayscale halftone images: error-diffusion dither at 227+ PPI, ordered dither
  at 150 PPI.
- Value-step hierarchy: 16 grays = a real tonal scale; use 3–4 deliberate steps.
- The full refresh as a page-turn moment: schedule it on the update cadence, not
  randomly.
- As-of timestamp set like a folio line — present, quiet, typeset.

## Required-if-unknown

- "What hardware: rooted Kindle/Kobo (which model?), a bare panel with driver
  board, or a commercial e-ink display (TRMNL-class)?"
- "Delivery: kiosk browser on the device, or image push (PNG via script or
  screensaver swap)?"
- "Update cadence — minutes, hourly, or daily? (decides the ghost-management
  plan)"
- "Mounted landscape or portrait, and is the orientation fixed?"

## Rendering target

Fixed-pixel HTML at exact device pixels. For image push, render → 8-bit
grayscale PNG (device quantizes to 16 levels):

```css
@page { size: 1872px 1404px; margin: 0 }   /* match the panel exactly */
html, body { width: 1872px; height: 1404px; margin: 0 }
/* fonts: @font-face with local/woff2 embedded — never network-dependent */
```

For kiosk delivery: a static page at device CSS pixels, no animation, meta
refresh on the cadence. Force a full refresh every push (image-push does this
inherently; FBInk and screensaver-swap methods flash by default). See
`connectors/`.

## Proofing

Posterize the render to 16 gray levels and inspect at 100%: type still smooth,
tonal steps still distinct after quantization. Diff consecutive renders —
static chrome pixel-identical. For wall mounts, view at ~25% size to simulate
3m. Read the type closely: if it doesn't look like print, the surface is being
wasted. `references/proofing.md`.
