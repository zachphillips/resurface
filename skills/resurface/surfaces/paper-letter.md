---
surface: paper-letter
class: paper
canvas: US Letter 215.9×279.4mm (8.5×11in) or A4 210×297mm, inkjet/laser 600–1200 DPI
color: full (many office lasers are mono — verify)
interaction: writable
refresh: static
segmentation: page
viewing-distance: 35–45cm
ink-economy: costly
---

# Letter / A4 paper — the writable workhorse

The default sheet is the highest-resolution surface most people own, and the only
one they will sign, annotate, file, and hand across a table. It punishes exactly
one habit: treating ink as free. Line-work over fills, and design for the pen the
reader is already holding.

## Physical truth

- US Letter: **215.9×279.4mm** (8.5×11in). A4: **210×297mm** — 6mm narrower, 18mm
  taller. Never assume which; see Required-if-unknown.
- Printer hard margins: **~5mm typical** (inkjets often 3mm at sides/top but
  12–17mm at the trailing edge; lasers ~4–5mm all round). Borderless exists on
  some inkjets only — never rely on it.
- Safe design margin: **12.7mm (0.5in)** all round. Live area: Letter 190×254mm,
  A4 184.6×271.6mm. A layout confined to a centered **184×254mm** block prints
  identically on both sizes.
- Print at **100% / "Actual size"** — "Fit to page" silently rescales (Letter ⇄ A4
  is a 94–97% shrink) and breaks every physical unit in the design.
- 600–1200 DPI renders 0.5pt hairlines reliably; duplex halves paper but hides
  side two — glance-critical content cannot live on the back.

## Fidelity budget

Rich in resolution, area, and permanence; writability is the hidden asset. The
only scarce resource is ink — fills, bleeds, and dark backgrounds cost money,
band on inkjets, and curl the page. Attention is moderate: read at a desk,
filed, pinned. Spend resolution on type and hairlines, not coverage.

## What it's good at

Documents that get signed, filled in, filed, or handed over: one-pagers, briefs,
worksheets, forms, checklists with real pen-sized checkboxes — anything that must
outlive a browser tab by years.

## Failure modes

- **Fit-to-page scaling** — rulers, forms, and any measured element come out 94%.
- **Edge-hugging designs** clipped by hard margins, worst at the trailing edge.
- **Solid fills**: banding (inkjet), cracking and cost (laser), curl everywhere.
- **Wrong sheet**: designed for Letter, printed on A4 — the bottom 18mm of a
  full-bleed layout vanishes or margins inflate.
- **Duplex flip surprise**: landscape layouts come out upside-down on side two
  under the default long-edge flip.
- **Screen grays**: #777 body text prints anemic; color-coded meaning dies on a
  mono laser.

## Typography minimums

- Body 10–12pt; footnotes/captions ≥7pt. Gray text only ≥9pt and ≥50% K.
- Line length 60–75 characters. Full live width at 11pt runs ~95 characters —
  use two columns (~85mm each, 8mm gutter) or widen side margins.
- Rules ≥0.5pt; 0.25pt holds on laser, risky on inkjet plain paper.
- Text in pure black (100% K), never rich-screen gray below the sizes above.

## Native idioms

- Empty checkboxes, 4–5mm square — the reader completes the artifact.
- Write-in rules: 0.5pt lines with ≥8mm of air above.
- Hierarchy by rules, boxes, weight, and whitespace — not tinted fills.
- QR escape hatches for T3 content: ≥15×15mm at this viewing distance.
- "2/3" page numbering on multi-page; keep the staple corner clear.
- Date/version in the footer — paper goes stale silently.

## Required-if-unknown

- "Letter or A4? (US/Canada → Letter; nearly everywhere else → A4)"
- "Color printer or mono laser?"
- "Duplex: print both sides, or must everything be glanceable on one face?"
- "Will this be annotated or filled in by hand, or is it read-only?"

## Rendering target

Print-CSS HTML → PDF. Real units everywhere; @page carries the physical contract:

```css
@page { size: letter; margin: 12.7mm }   /* or: size: A4 */
html { font-size: 11pt }
body { margin: 0 }
* { print-color-adjust: exact }
```

For dual-size delivery, hold content in a 184×254mm centered block and emit one
PDF per @page size. Spool with `lp -o media=Letter` and scaling off
(`connectors/cups.md`), or hand over the PDF with a "print at 100%" note.

## Proofing

Rasterize the PDF at 150 DPI for layout, 600 DPI for hairlines and QR
(`references/proofing.md`). If the printer may be mono, convert to grayscale and
re-check: every color-coded distinction must survive as weight or shape. Verify
nothing sits within 5mm of any edge and checkboxes are ≥4mm. Print one page
before a stack, and measure a known 100mm rule with a real ruler to confirm
scale survived the driver.
