---
surface: thermal-label-4x6
class: thermal
canvas: 4×6in (101.6×152.4mm) direct thermal label, 203 DPI → 812×1218 dots printable; 300 DPI variants 1200×1800
color: mono
interaction: writable (pen on thermal top-coat works)
refresh: static
segmentation: label (gap or black-mark die-cut)
viewing-distance: 30cm–1m, stuck at eye line
ink-economy: free
---

# 4×6 thermal label — the peel-and-stick dashboard

A shipping-label printer is a 812-dot-wide monochrome page printer whose output
comes with adhesive. Free solid black, two-second output, and
persistence-by-placement: the artifact lives on the door, the laptop lid, the
shelf edge — wherever it gets stuck.

## Physical truth

- 4×6in label at **203 DPI** (8 dots/mm): **812×1218 dots** printable (print
  heads are 832 dots / 104mm; the die-cut label is 812).
- **300 DPI** variants exist: **1200×1800 dots**. Verify before pixel work.
- Fixed height — unlike a receipt, the canvas ends at 1218 dots. No overflow:
  content is triaged to fit, never continued.
- Same dot physics as receipts: binary dots that bloom; rules ≥2 dots, minimum
  gap 2 dots; gray does not exist.
- Labels are die-cut with ~3mm gaps; the printer finds label starts via a
  transmissive **gap sensor** or reflective **black-mark sensor** — calibration
  is required whenever stock changes, or prints drift mid-label.
- Registration drifts ±1mm (~8 dots): keep content ≥16 dots from every edge.
- Direct thermal fades with sunlight and heat: weeks at eye line, not years.

## Fidelity budget

The receipt's budget reshaped: free black, zero color, but a fixed page and an
adhesive back. Persistence comes from placement, not from the paper. Attention is
glance-as-you-pass — the reader is walking by the door, not holding the artifact.
Spend dots on one dominant element and on QR codes, which this surface loves.

## What it's good at

The **morning briefing sticker** (cron + label printer: today's calendar, weather,
and tasks waiting on the door at 7am), task/kanban cards that stick to the thing
they describe, inventory and cable labels, QR gateways to live dashboards.

## Failure modes

- **Uncalibrated stock**: content prints across the gap, every label half-shifted.
- **Edge-flush content**: die-cut drift clips it; peeling fingers grab it.
- **Receipt thinking**: layouts that assume unlimited length get truncated at
  1218 dots — triage first.
- **Gray remnants** dither to mud; hairlines vanish; tiny checkboxes smear (use
  strikethrough or rules — see `thermal-receipt.md`, same physics).
- **Sun placement**: a label on a sunlit door is blank in a month.

## Typography minimums

- Glance element (the date, the count, the name): **60–120 dots tall**, readable
  at 1m while walking past.
- Body ≥16 dots; labels read at 30cm bear receipt-grade density, but a stuck
  label usually shouldn't — two tiers (glance + detail) maximum.
- One heavy weight; mono/slab faces; inverted bands cost nothing.
- Line length at 812 dots: ~50 characters of 16-dot mono — still break lines
  yourself.

## Native idioms

- Full-width inverted header band: the label's title at 1m.
- Big-number-plus-label stat blocks (the airline-gate idiom).
- **QR-heavy**: ≥120×120 dots, ≥4 dots/module, 8-dot quiet zone, ≥16 dots from
  edges; one QR per label as the escape hatch to the live version.
- A 2-dot rule splitting GLANCE (top half, 1m type) from DETAIL (bottom, 30cm).
- Day-strip calendars: hour labels left, 2-dot rules per slot, solid blocks for
  busy.
- Date-of-print in a corner — stuck labels outlive their truth.

## Required-if-unknown

- "Is the printer 203 or 300 DPI? (changes every dot count by ~1.5×)"
- "Gap-cut labels or black-mark stock — and has the printer been calibrated for
  this roll?"
- "Where will it be stuck: door/wall at eye line (~1m glance) or on an object
  read at 30cm? (decides the type ramp)"

## Rendering target

HTML at exactly the dot dimensions → raster → 1-bit threshold:

```css
@page { size: 812px 1218px; margin: 0 }
html, body { width: 812px; height: 1218px; margin: 0;
             font-family: <mono/slab>; -webkit-font-smoothing: none }
```

Deliver the 1-bit raster in the printer's language — ZPL `~DG`/`^GFA` on
Zebra-class printers, ESC/POS raster on Epson-style — or through the printer's
CUPS driver at 100% scale. See `connectors/`.

## Proofing

Rasterize at exactly 812×1218 (or 1200×1800), threshold to 1-bit, view at 200% —
thermal bloom ≈ 1-dot dilation. Inspect: nothing within 16 dots of any edge, no
gray remnants, rules ≥2 dots, QR scans from the raster with a phone. Then the
distance test: shrink the proof to ~25% and confirm the glance tier still reads —
that is the walk-past view. Print one label and stick it where it will live
before printing a week's worth. `references/proofing.md`.
