# Decision record: Foundry fleet → thermal receipt (58 mm, 384 dots, 1-bit)

Source: `../source.md` · Surface profile: `skills/resurface/surfaces/thermal-receipt.md`
· Artifact: `../out/thermal-receipt/fleet-strip.html`

## Fidelity budget

384 dots wide, one bit deep, unlimited length, ink free. The strip is starved
of width and color and rich in contrast and physicality — so state stops
being *color* (green pills, gray text, spinners) and becomes *geometry*:
position, weight, strikethrough, indentation, solid black. Length is cheap;
this strip spends 1,790 dots (~22 cm) and would happily spend more before
ever shrinking type below the 16-dot floor.

## Idiom translation table

The heart of this record. Every web idiom re-decided for 203 DPI thermal:

| Web dashboard | Why it dies on thermal | Strip idiom |
|---|---|---|
| Gray `#8a8f98` proposed-next text | Gray doesn't exist; dithered gray text is mud at 203 DPI | **Indent 24 dots + bold `?` prefix** under a `NEXT — YOUR CALL` header, below the heavy rule. Subordination by position, interrogation by punctuation |
| Green ✓ checkbox pills on done items | A 12-dot ballot glyph blooms into a smudge | **2-dot strikethrough** — still readable (you want to *see* what shipped), unmistakably finished |
| Done/next mixed in one card flow | No color to separate the zones | **6-dot heavy rule** between DONE/RUNNING and NEXT — the eye finds the decision zone before reading a word |
| Card header with avatar + colored status dot | No color, no raster portraits worth 48 dots | **Full-width inverted band** (white-on-black, free on thermal): `1·ATLAS-API` left, scope word right |
| Animated progress spinner, "62%" tooltip | Nothing animates on paper | **Solid-black bar in a 2-dot track** + `62% · backfill ETA 09:00` line. A bar at glance distance beats a number |
| Red "stalled" badge | Red is a color | **Inverted chip `! STALLED`** + plain-words line `blocked on S3 perms — needs you` |
| 2×2 card grid | 384 dots is one column, full stop | **Vertical segments separated by tear marks** — the grid becomes torn-apart strips |
| Blue PR links, charts, logs | Paper can't link | **One QR** (29 modules at 4 dots = 116 dots + 8-dot quiet zone) in its own tear-off footer → live board |

## Layout, in real units

- Canvas: `html { width: 384px }`, 1 CSS px = 1 printer dot. Side padding
  10 dots. Top padding 48 dots (paper already past the head), bottom 56
  (feed-before-cut).
- Type: IBM Plex Mono throughout — mono is native here, and column-stable
  for the name/PR rows. Body **16 px** (the profile's 16-dot floor), band
  names 21 px/700, annotations 13 px, never lighter than 500.
- Rules: items 2 dots, double rule 2+2 under the masthead, **6 dots** for
  the DONE/NEXT divide. Nothing below 2 dots anywhere — 1-dot lines vanish,
  1-dot gaps close.
- Tear marks: 4-dot-high dashes (12 on / 12 off) — bolder than the profile
  default because tears are manual (Q2), with 22 dots of clearance to the
  nearest content (profile minimum: 16).

## Content triage, rewrites shown

Done items condense from dashboard sentences to ≤26-char strip lines
(384 dots at 16 px mono ≈ 36 chars; 26 leaves room for the PR number):

> **Web:** "Implemented idempotency keys on the refunds endpoint so retried
> webhooks can't double-refund (PR #412, merged 02:14)"
> **Strip:** ~~refund idempotency keys~~ ~~#412~~

> **Web:** "Checkout A/B test concluded; variant B improved conversion 4.1%
> and has been shipped to 100% of traffic (PR #209)"
> **Strip:** ~~checkout A/B: ship B +4.1%~~ ~~#209~~

The numbers survive (voice rule: numbers over adjectives); the prose goes
behind the QR. PR numbers stay because they're how you'd cite the work in a
standup, struck through with their item. Timestamps drop — "overnight" is
already the masthead's claim.

## Segmentation plan

Six segments, each tear-complete: masthead+totals · atlas-api · orbit-web ·
courier · darkroom · QR footer. Each project band repeats the segment number
(`1·`…`4·`) so torn strips keep their fleet order. The QR gets its **own**
segment so any project strip can be torn away without orphaning the link;
it sits just above the final tear, per the profile ("near the tear so it
survives the tear").

## Proof results

Rasterized 384 px wide → 60% threshold → 1-bit → inspected at 200%:
strikethroughs read at 2 dots, no gray remnants anywhere, the QR's 4-dot
modules are crisp (scan-check with `zbarimg` where available), no content
within 22 dots of a tear. Full strip: 384×1790 dots ≈ 22 cm of paper.

## Open questions — asked once, batched (2026-06-09)

> **Q1.** Roll width: *(a) 58 mm → 384 dots (b) 80 mm → 576 dots?*
> **A: (a)** — the kettle printer is a 58 mm Epson TM-T20.
>
> **Q2.** Cutter: *(a) auto-cutter (b) manual tear bar?*
> **A: (b)** — tear marks rendered 4 dots high with 22-dot clearance,
> bolder than the auto-cutter default.
>
> **Q3.** Proposed-next items: *(a) print all, freshest first (b) only items
> already idle >1 day (c) cap at 3 per project?*
> **A: (a)** — "if an agent proposed it, I want to rule on it."

## Delivery

`connectors/escpos.md`: rasterize → threshold 60% → `python-escpos`
`bitImageRaster` → TCP 9100. Cron at 06:40 with a date-stamped marker file so
re-runs never print twice.
