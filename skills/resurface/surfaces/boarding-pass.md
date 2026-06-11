---
surface: boarding-pass
class: thermal
canvas: ATB stock 8×3.25in (203.2×82.55mm), 203 DPI → 1624×660 dots, landscape; 1–2 perforations → body + stub(s)
color: mono
interaction: writable (pen on thermal face)
refresh: static
segmentation: perforation (body + stub)
viewing-distance: 30–45cm handheld
ink-economy: free
---

# Boarding pass — the strip that tears into body and stub

ATB stock is a card-weight thermal page with perforations that *plan its own
destruction*: the body is read, acted on, and discarded; the stub survives in a
pocket. Design both halves to stand alone, and a stack of passes becomes a
tear-as-you-go dashboard.

## Physical truth

- ATB-style stock: **8×3.25in (203.2×82.55mm)**. The thermal head spans the
  3.25in dimension (**660 dots** at 203 DPI); the pass feeds lengthwise →
  canvas **1624×660 dots**, landscape.
- One or two perforations divide body and stub(s). A single stub commonly takes
  roughly the trailing 2–2.5in, but **positions vary by stock — measure them**
  (Required-if-unknown). Never trust a datasheet over a ruler.
- Card-weight stock: survives a pocket and a day of handling better than receipt
  paper, but it is still direct thermal — print fades with heat and friction.
- Registration is enforced by sensing marks on the reverse: each pass is a fixed
  page, no overflow onto the next.
- Same dot physics as all 203 DPI thermal: binary dots, bloom, rules ≥2 dots,
  minimum gap 2 dots, no gray.

## Fidelity budget

A fixed monochrome landscape page with one structural superpower: planned
separation. Spend the layout on the tear — the perforation is a content boundary,
not a decoration. Width is generous (1624 dots) but height is only 660; this is
a one-row surface. Black is free; spend it on identity bands and the big fields.

## What it's good at

Per-segment artifacts torn off as they complete: trip legs, meeting blocks, task
tickets, claim checks, queue tokens. A **strip of passes is a multi-segment
dashboard** — one pass per leg or per meeting, stacked in order; the stack is
the itinerary, and tearing is the done-state.

## Failure modes

- **Content straddling a perforation** — destroyed by the tear, the one
  unforgivable error here.
- **Stub that can't stand alone**: a seat number with no flight, a token with no
  context. Cover the body with your hand; the stub must still work.
- **Body that needs the stub**: same test, other hand.
- **Guessed perf positions**: 5mm off and the layout dies. Measure.
- **Receipt-grade paper assumptions**: stock is fixed-length; nothing continues.

## Typography minimums

- Body text ≥16 dots; labels may go to 12 dots bold, never lighter.
- The identity fields use the airline idiom: small caps label over a huge value —
  value numerals **60–90 dots tall** (GATE B12, SEAT 14C grammar), readable at
  arm's length in a hurry.
- Mono/slab faces; one heavy weight; inverted bands for free emphasis.
- Line length: columns, not running prose — 660 dots of height is ~8 lines of
  comfortable body text per column.

## Native idioms

- Label-over-value blocks in a row: the at-a-glance grammar everyone already
  reads fluently.
- Inverted band across the stub end: the stub's identity survives separation
  visually too.
- **Mirror the critical ID** (name/segment/token) on both sides of every perf.
- Dotted vertical 2-dot rule echoing the perforation line, so the tear plan is
  visible before tearing.
- Barcode/QR on the *body*, ≥16 dots clear of the perf, at the end fingers don't
  grip; a second small QR on the stub if the stub is the keeper.
- Sequence corner ("LEG 2/4") when printing a strip of passes.

## Required-if-unknown

- "Measure your stock: one perforation or two, and how far from the leading edge
  is each (e.g. 5.5in and 6.75in)? I'll plan segments around them."
- "Which half is the keeper for this use — does the stub survive (claim check)
  or does the body (ticket with stub torn off at a gate)?"
- "What printer model, and how do jobs reach it — CUPS driver, or raw bytes in
  its native language?"

## Rendering target

HTML at exactly 1624×660 px → raster → 1-bit threshold:

```css
@page { size: 1624px 660px; margin: 0 }
html, body { width: 1624px; height: 660px; margin: 0;
             font-family: <mono/slab>; -webkit-font-smoothing: none }
```

Deliver per the printer's language via `connectors/` (boarding-pass printers
vary: ESC/POS-style raster, vendor protocols, or a CUPS driver fed a PDF at
exactly 8×3.25in, 100% scale). One HTML file per pass when printing a strip.

## Proofing

Rasterize at 1624×660, 1-bit, view at 200% (1-dot bloom rule). Overlay vertical
guides at the measured perf positions: nothing within 16 dots of a perf, IDs
mirrored on both sides. Then the tear test on the raster: crop at each perf and
read each piece alone — both must work. Scan every barcode from the raster.
Print one pass and physically tear it before printing the strip.
`references/proofing.md`.
