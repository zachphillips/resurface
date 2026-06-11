# Decision record: repertoire → index cards (3×5 in, landscape)

Source: `../source.md` · Artifact: `../out/index-cards/repertoire-cards.html`
(one deck file, one card per `@page` — the deck prints as a single job onto
pre-cut stock; see Q1)

## Fidelity budget

A 3×5 card is 1/5.6 the area of the letter sheet that already ran at maximum
size — the whole design problem is **area starvation**. What the card gives
back: stiffness (no stand needed), shuffle-ability (set order changes at the
gig), and pocket persistence. Spend the budget on lyric+chord rows in a
condensed face; spend *nothing* on decoration. The header band earns its
0.34 in because finding the right card fast is part of playing.

## The chain

No stand, hands on the guitar → cards sit on a knee, never flipped or
re-stacked mid-song → a song must be fully visible while it's being played →
one card per song where the row count allows; otherwise **two cards laid
side by side before the song starts** — never front/back, never card-swap.

## Layout, in real units

- Card `5 × 3 in` landscape, `@page { size: 5in 3in; margin: 0 }`; padding
  `0.1 in` top, `0.13 in` sides. Printable lyric area after the header:
  ~`4.74 × 2.45 in`.
- Header: `1.5 pt` rule under Archivo 800 title at `10 pt` caps, key · tempo
  · meter right-aligned at `6.5 pt`. Split songs add an inverted flag
  (`CARD 1 OF 2 →`) — white-on-black so it can't be missed during setup.
- Body: **Archivo Narrow 500 at 8.5 pt** (deck standard), chords Archivo
  Narrow 700 at `0.72 em` above the syllable, `0.78 em` chord room per row.
- Columns: `0.12 in` gutter with a hairline `0.75 pt` divider. Meander and
  Waltz: 2 columns. Calloway: **3 columns** — its turnover-split rows are
  short enough (~33 chars max) to afford a third column, which is what lets
  each half of the song stay on one card.

**Proof-driven sizing notes (kept because re-renders will hit them again):**

- Proof 1 found the Waltz overflowing its card: I had split its long waltz
  phrases into turnovers, which added 6 rows. The proof also showed Archivo
  Narrow runs ~0.36 em/char — narrower than estimated — so the unsplit
  56-char line *fits* a half-card column at 8 pt. Decision: **The Orchard
  Waltz is set 0.5 pt below deck standard (8 pt) with zero turnovers.**
  Phrase integrity beats half a point of type.
- Calloway's 3-column width caps the longest row ("Mama said this town will
  hold you", 33 chars) at 8.5 pt almost exactly. The deck standard is set
  by this line.

## Content triage, rewrites shown

Same triage as paper-letter (choruses → cues after first occurrence), plus
one card-only editorial decision:

- **Calloway's final chorus is printed in full on card 2** — not as a cue —
  because the third column had budget to spare and the song *ends* there:
  the last thing the player needs is the one part of the card that must not
  require memory under a ritard. The repeated last line is printed twice:

  > `fits the rack above my seat.`
  > `fits the rack above my seat.`

  (A "×2" annotation costs the same space and asks for arithmetic mid-song.)

## Surface idioms

- Inverted `CARD 1 OF 2 →` / `→ CARD 2 OF 2` flags with directional arrows:
  the pair self-orders on a guitar case.
- A boxed pointer at the end of card 1 (`VERSE 3 → CARD 2, AT RIGHT`) so the
  eye knows where to land *before* the verse arrives.
- Title band on every card: cards get shuffled; sheets don't.

## Segmentation plan

| Card | Content |
|---|---|
| 1 | The Long Meander — complete (V1 · chorus ∣ V2 · cue · V3 · cue) |
| 2 | Last Bus Out of Calloway 1 of 2 — V1 ∣ V2 ∣ chorus + pointer |
| 3 | Last Bus Out of Calloway 2 of 2 — V3 ∣ cue + bridge ∣ final chorus in full |
| 4 | The Orchard Waltz — complete (V1 · chorus ∣ V2 · cue · V3 · cue) |

Card boundary falls after the first chorus — a held moment in the song, the
one place the eye can afford to travel to the next card. Both Calloway cards
repeat the full header; a torn-apart pair must still identify itself.

## Open questions — asked once, batched (2026-06-08)

> **Q1.** Card stock: *(a) pre-cut 3×5 cards fed through the printer's
> manual slot (b) print 4-up on letter and cut?*
> **A: (a)** — deck renders one card per page, 5×3 in exactly.
>
> **Q2.** For the split song, type size across the pair: *(a) identical on
> both cards (b) let card 2 run larger since it carries less?*
> **A: (a)** — "don't make my eyes re-calibrate mid-song."
>
> **Q3.** Calloway is played capo 2. Header shows: *(a) `C · Capo 2`
> (b) sounding key `D` (c) both?*
> **A: (a)** — shapes are what the hands need; the band isn't reading these.
