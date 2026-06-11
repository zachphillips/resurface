# Typography as physical measurement

A point is 1/72 of an inch. That makes type size a physical quantity — and a
meaningless one until you attach a viewing distance. "12pt" describes a page at
arm's length; the same glyphs across a kitchen are a smudge. Every size decision
in a decision record is therefore a pair: size *and* the distance it was chosen
for.

## The arc-minute rule

The eye reads angle, not millimeters. Sustained reading wants a capital height
of roughly 16–20 arc-minutes; glanceable labels — short, familiar strings
recognized rather than read — get away with ~10. As working formulas:

- **Floor (sustained reading):** cap height ≥ viewing distance ÷ 200
- **Comfort:** cap height ≥ viewing distance ÷ 150

Cap height runs ~70% of the nominal point size, so: at 40cm, distance ÷ 200 =
2mm cap ≈ 9pt body — which is why receipts work at 9–10pt and fail below.

## The practical table

Minimum *body* sizes by use context. Headlines scale up from these; nothing
scales down past them.

| Context | Distance | Body minimum |
|---|---|---|
| Handheld — receipt, index card | 30–45cm | 9–11pt |
| Desk / arm's length — letter paper | 50–70cm | 12–14pt |
| Music stand, lectern | ~1m | 16pt+ |
| Wall panel, fridge e-ink, walked past | 1.5–3m | 24pt+ labels, 36pt+ key lines |
| TV dashboard ("10-foot UI") | 3m+ | 32px+ at 1080p, 48px+ headlines |

The TV row is in pixels deliberately: on screens you control pixels, not
points, and in practice larger TVs sit proportionally farther away, so
px-at-resolution stays roughly stable as an angular measure. For anything not
in the table, compute from the arc-minute rule — never interpolate by feel.

## When condensed faces earn their keep

A condensed face buys 10–20% more characters per line. It earns that on
measure-starved surfaces: the 384-dot thermal strip, a 3×5 card column, the
one-page-no-turns lyric sheet where fitting one more line avoids a page turn
mid-song. It pays a distance penalty — narrower counters and tighter rhythm
blur sooner as the angle shrinks — so:

- Never condensed on across-room surfaces.
- Never condensed *below the size floor*. Condensing is for fitting more at an
  adequate size, not a license to shrink further. If condensed-at-floor still
  doesn't fit, the problem is triage, not type
  (`references/content-triage.md`).

## Line length by measure

- Sustained prose: 45–75 characters per line.
- Glanceable lists and dashboards: 30–50 — shorter lines, faster eye return.
- 58mm thermal: 24–32 characters is what the dots allow
  (`surfaces/thermal-receipt.md`).
- Below ~20 characters, prose turns to confetti; switch layouts (fewer columns,
  label-over-value stacking) rather than hyphenating your way through.

## Line breaks carry meaning

Auto-wrap is a typesetter that has read nothing. On any surface where lines are
performed, glanced, or acted on, decide the breaks:

- No widowed last words; no orphaned heading lines at a page or card boundary.
- **Lyrics break at phrase boundaries** — where the singer breathes — never
  mid-phrase, and a chord stays welded above its syllable.
- **Never split a value from its label or unit.** "350" at a line's end and
  "°F" at the next line's start is a kitchen accident in waiting; the same goes
  for times and their events, currencies and their amounts.
- Enforce mechanically: `&nbsp;` between value and unit,
  `white-space: nowrap` on label–value pairs, manual `<br>` at phrase
  boundaries. Hope is not a line-breaking strategy — and the proof step
  (`references/proofing.md`) checks breaks explicitly.

## Low-DPI floors: thermal

At 203 DPI, 1pt ≈ 2.8 printer dots, and binary dots bloom — small counters fill
in. The floors from `surfaces/thermal-receipt.md` override the table above:
body ≥16 dots (~2mm x-height, ≈11pt equivalent), one heavy weight instead of
two light ones, mono or slab faces, no thin serifs. When a surface profile and
this reference disagree, the profile wins — it knows the hardware.
