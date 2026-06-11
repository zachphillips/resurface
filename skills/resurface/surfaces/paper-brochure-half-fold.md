---
surface: paper-brochure-half-fold
class: paper
canvas: one 215.9×279.4mm (8.5×11in) sheet, landscape, folded once → four 139.7×215.9mm (5.5×8.5in) panels
color: full (verify printer)
interaction: writable
refresh: static
segmentation: panel (fold)
viewing-distance: 35–45cm handheld
ink-economy: costly
---

# Half-fold brochure — four panels from one sheet and one fold

One Letter sheet printed both sides and folded once becomes a four-panel booklet
with a cover, a spread, and a back. The fold creates reading order, reveal, and
an imposition puzzle: the panels do not print in the order they are read.

## Physical truth

- Sheet: 8.5×11in landscape, folded across the 11in width → four portrait panels
  of **5.5×8.5in (139.7×215.9mm)** each.
- **Imposition map** (sheet viewed landscape):
  - Side 1 (outside): `[ PANEL 4 — back cover | PANEL 1 — front cover ]`
  - Side 2 (inside):  `[ PANEL 2 — inside left | PANEL 3 — inside right ]`
  - Panel 4 prints to the *left* of panel 1. Reading order is 1 → 2 → 3 → 4.
- **Duplex trap**: landscape sheets must duplex with **flip on short edge**. The
  default long-edge flip prints the inside upside-down relative to the cover.
- Panels 2+3 are physically contiguous and revealed together: the inside is one
  **11×8.5in spread** if you want it to be.
- Hard margins ~5mm per printed side; design margin 10mm at outer edges.
- Fold-safe zone: keep text ≥10mm clear of the fold line; avoid heavy toner
  coverage across the fold (toner cracks when folded). Stock above ~176gsm needs
  scoring; ordinary 90–120gsm text paper folds clean by hand.

## Fidelity budget

Rich in sequence and reveal — the fold gives you a cover moment, an open-the-book
moment, and a parting shot — at the cost of imposition complexity and a hard
four-panel segmentation. Area is four Letter half-pages; ink is still costly.
Spend the budget on the reveal: tease on 1, deliver on 2–3, close on 4.

## What it's good at

Event programs, product one-sheets that need a narrative arc, menus, orientation
hand-outs, anything that benefits from a cover and a two-page spread rather than
a flat sheet.

## Failure modes

- **Imposition scrambled**: content laid out in reading order 1-2-3-4 across the
  sheet prints as gibberish. Side 1 must be 4|1, side 2 must be 2|3.
- **Long-edge duplex**: inside panels upside-down. Always short-edge for this
  format.
- **Content on the fold**: text straddling the fold line cracks and disappears
  into the crease — unless panels 2+3 are deliberately designed as one spread
  with nothing critical in the central 20mm.
- **Cover that tells everything**: panel 1 carrying body content defeats the
  reveal and crowds the one panel seen first.
- **Manual-duplex misfeed**: on printers without auto-duplex, re-inserting the
  sheet the wrong way flips or swaps sides.

## Typography minimums

Same engine as `paper-letter.md`: body 10–12pt, footnotes ≥7pt, rules ≥0.5pt.
Panel measure: 5.5in wide minus margins ≈ 119mm → ~55–65 characters at 11pt;
single column per panel, no exceptions. Cover (panel 1) type is display type:
title 24–40pt — it competes with a tabletop, not a paragraph.

## Native idioms

- **Cover (1)**: title, one hook line, one image or mark, optional date — nothing
  the reader must retain. The cover earns the open.
- **Spread (2+3)**: the payload. Either two parallel panels or one continuous
  11×8.5in canvas with the gutter respected.
- **Back (4)**: contact, colophon, QR escape hatch, map — or leave it as the
  mailing/label panel.
- Panel-edge discipline: each panel reads as a complete page; the fold is a page
  break, not a wrap point.
- QR on panel 4, ≥15×15mm, so the link survives after the brochure is read.

## Required-if-unknown

- "Auto-duplex printer, or manual two-pass duplex? (manual: I'll add a re-feed
  instruction line and a test-sheet step)"
- "Letter or A4 sheet? (A4 half-fold panels are A5, 148×210mm)"
- "Inside as two separate panels, or one full spread across 2+3?"

## Rendering target

Print-CSS HTML → PDF, **two landscape pages in imposition order**, each carrying
two panels:

```css
@page { size: 11in 8.5in; margin: 0 }      /* trust panel-level margins */
.side { width: 11in; height: 8.5in; display: flex; page-break-after: always }
.panel { width: 5.5in; height: 8.5in; padding: 10mm; box-sizing: border-box }
/* side 1: .panel#p4 then .panel#p1 — side 2: .panel#p2 then .panel#p3 */
```

Print at 100%, duplex **short-edge** (`lp -o sides=two-sided-short-edge`, see
`connectors/cups.md`).

## Proofing

Rasterize both sides at 150 DPI. Then do the paper test the pixels can't: print
one sheet, fold it, and walk the reading order 1→2→3→4 checking every panel is
upright and nothing critical sits in the crease. Verify side 2 orientation
against the short-edge flip before any batch. `references/proofing.md`.
