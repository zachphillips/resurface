---
surface: thermal-receipt
class: thermal
canvas: 58mm roll (48mm / 384 dots printable) or 80mm roll (72mm / 576 dots printable), 8 dots/mm (~203 DPI), unlimited length
color: mono
interaction: writable (pen on thermal paper works; fades under heat)
refresh: static
segmentation: perforation/tear-off, continuous roll
viewing-distance: 30–45cm, handheld or pinned
ink-economy: free
---

# Thermal receipt — the continuous monochrome strip

A receipt printer is a 384- or 576-dot-wide monochrome display of unlimited
height that produces a physical object in two seconds for zero ink cost. It is
the cheapest, fastest path from agent to paper, and it rewards designs that
embrace the strip: one narrow column, hard rules, solid blacks, generous tear-off
segmentation.

## Physical truth

- 58mm paper → 48mm printable → **384 dots** wide at 8 dots/mm (~203 DPI).
- 80mm paper → 72mm printable → **576 dots** wide.
- Height is unbounded but tears at the cutter; auto-cutters leave ~5mm gripped
  tail. Plan a top margin of ~8–10mm on the first segment (paper already past the
  head) and end every job with a feed before cut.
- Thermal dots are binary and slightly bloom: a 1-dot line prints; a 1-dot *gap*
  may close up. Minimum reliable gap: 2 dots.
- Print is heat-formed and fades with time, sunlight, and friction — this surface
  is for *today*, not for archives.

## Fidelity budget

Starved of width and color; infinitely rich in length, contrast, and immediacy.
Solid black costs nothing, so spend it freely on headers, rules, and inverted
labels. Attention is high — a printed strip is in someone's hand, not behind a
tab. Persistence is hours-to-days, which makes it perfect for ephemeral state.

## What it's good at

Daily schedules and briefings, agent/task status strips, checklists to carry,
tickets and tokens, kitchen orders, packing lists, anything torn off and worked
through with a pen.

## Failure modes

- **Gray doesn't exist.** Any gray in the source must become weight, size,
  indentation, dither, or omission — never `#888`, which dithers to mud at 203 DPI.
- **Hairlines vanish, fine gaps fill in.** Rules ≥2 dots; never rely on 1px borders.
- **Tiny checkboxes smear.** A 12px ballot box becomes a blob. Use strikethrough
  for done, or a heavy rule between done and next.
- **Wide tables die.** 384 dots is ~32 chars of 12px mono. Two columns max;
  prefer label-over-value stacking.
- **Mid-thought tears.** Content crossing a tear-off line is destroyed by the tear.

## Typography minimums

- Body: ≥16 dots tall (~2mm x-height); below that, thermal bloom eats counters.
- Bold survives better than regular at small sizes; prefer one heavy weight over
  two light ones.
- Mono and slab faces feel native; thin serifs do not survive.
- Line length at 58mm: 24–32 characters. Break lines yourself — never let a
  proportional-face auto-wrap decide where a task name splits.
- Inverted (white-on-black) headers print beautifully and cost nothing: use them
  as the section idiom.

## Native idioms

- Full-width solid black header bands with knocked-out text.
- Double rules for section breaks, single 2-dot rules for items.
- Strikethrough (2-dot line) for completed items — still readable, clearly done.
- A heavy horizontal rule separating DONE from NEXT.
- Dotted feed/tear marks aligned to planned tear points.
- QR codes (see `references/qr-codes.md`): minimum 96×96 dots, quiet zone 8 dots,
  one per strip, near the tear so it survives the tear.
- Empty write-in lines: 2-dot rules with 24+ dots of air above.

## Required-if-unknown

- "Is the roll 58mm or 80mm?" (changes the dot budget by 50%)
- "Does the printer have an auto-cutter, or are tears manual?" (manual tears need
  bolder tear marks and more slack between segments)
- "Will this be pinned up or carried in a pocket?" (pocket → larger type, shorter
  strips)

## Rendering target

Either of:

1. **HTML → raster → ESC/POS** (recommended; full layout control): render HTML at
   exactly 384px (or 576px) wide, no margins, rasterize, 1-bit threshold (not
   dither, for text-dominant strips), send via `connectors/escpos.md`.
   ```css
   @page { margin: 0 }
   html { width: 384px }
   body { margin: 0; font-family: <mono/slab>; -webkit-font-smoothing: none }
   ```
2. **Native ESC/POS text** for plain text-only strips (fast, but no typography).

## Proofing

Rasterize at exactly 384 (or 576) px wide, convert to 1-bit threshold, then view
at 200% — thermal bloom roughly equals 1-dot dilation, so anything ambiguous at
200% will smear in print. Inspect: gaps ≥2 dots, no gray remnants, no content
within 16 dots of a planned tear, QR scannable from the rasterized image. Print
one strip before printing a batch. Recipes: `references/proofing.md`.
