# Decision record: repertoire → paper-letter (8.5×11 in)

Source: `../source.md` · Artifacts: `../out/paper-letter/*.html` (one file per
song — a coffee-spilled song reprints alone, the others don't re-render)

## Fidelity budget

Letter paper is rich in area and resolution, starved of nothing — except that
this player's hands remove **interaction entirely**. The page cannot be
turned, so the budget is really *one side of one sheet per song*. Spend all
of it: type scales up until the song touches the bottom margin, not until it
merely fits. Ink is costly (home inkjet), so blacks go to type and two or
three structural rules, no fills.

## The chain every layout decision hangs on

Guitarist can't turn pages → each song fits one side of one sheet → short
songs take one wide column at maximum size; the long song takes two columns
at the size its longest phrase allows → font size is found by proofing
against the bottom margin, not guessed.

## Layout, in real units

- Page `8.5 × 11 in`, `@page { size: 8.5in 11in; margin: 0 }`; sheet padding
  `0.45 in` top, `0.62 in` sides, `0.4 in` bottom (inside the printer's
  0.25 in hardware margin — see Q1).
- Title block: Fraunces 560 at `30 pt`; meta line (key · tempo · meter ·
  feel) Archivo 600 at `10 pt`, letterspaced 0.14 em; `2.5 pt` rule below.
- Chord-over-syllable rows: each lyric line reserves `0.8 em` of chord room
  above it. Chords are Archivo 700 at `0.62 em` of the lyric size, anchored
  to the syllable where the change lands — never floated to the nearest word.
- Lyric lines: `white-space: nowrap`. Overflow is a proofing failure, not a
  wrap — the renderer is never allowed to choose a break point.

**Per-song type size (proofed, not predicted):**

| Song | Rows | Layout | Lyric size | Why |
|---|---|---|---|---|
| The Long Meander | 18 | 1 column | **17 pt** | 18.5 pt clipped the final cue at the bottom margin in proof; 17 pt lands the last line at ~95% page height |
| Last Bus Out of Calloway | 36 | 2 columns, `1.5 pt` rule in a `0.3 in` gutter | **15.5 pt** | Column width 3.45 in caps the longest phrase fragment (~35 chars) at 15.5 pt |
| The Orchard Waltz | 17 | 1 column | **17 pt** | Matches Meander so the set reads as one family of sheets |

## Content triage, rewrites shown

- **Repeated choruses → cue lines (T2 condensed).** Chorus prints in full
  once, at first occurrence. Every later occurrence becomes an italic cue in
  the author's pencil-mark voice. This bought The Long Meander 8 rows —
  the difference between 17 pt and ~13 pt.

  > Before (source, 2nd/3rd chorus): full 4-line chorus, twice more
  > After: `— chorus —` · `— chorus, twice · end on G, let it ring —`

- **Long lines → hymnal turnovers (Calloway only).** Two columns shrink the
  line budget to ~35 characters. Lines longer than that break **at sung
  phrase boundaries** and indent the continuation `1.3 em`:

  > Before: `The diner light goes amber at a quarter after nine,`
  > After: `The diner light goes amber` ⏎ `    at a quarter after nine,`

  One proof-round fix: "The hardest part of leaving / Calloway" left
  *Calloway* orphaned on its own row; the un-split line was measured against
  the column in proof and fits whole.

- **Dropped (T3):** verse numbers, alternate voicings. A folk verse is
  identified by its first line, not its number.

## Surface idioms

- Phrase-boundary breaks only; the eye returns to a hard left edge.
- Italic serif cues for "you know this part"; bold sans labels (`CHORUS`,
  `BRIDGE`) for "new part starts here".
- Chorus indented `0.45 in` — structure is visible from arm's length without
  reading a word.
- `(stop)` set as a chord, because to the playing hand that's what it is.

## Segmentation plan

One song = one page = one file. Column break in Calloway falls at a section
boundary (after the first chorus), never mid-verse.

## Open questions — asked once, batched (2026-06-08)

> **Q1.** Your printer: borderless-capable, or standard ~0.25 in hardware
> margins? *(a) borderless (b) standard margins (c) unsure — assume standard*
> **A: (b)** — layout keeps ≥0.4 in clearance everywhere.
>
> **Q2.** Repeated choruses: *(a) print in full every time (b) full once,
> then a one-line cue?* Full-every-time costs ~4 pt of lyric size on Meander
> and Waltz.
> **A: (b)** — "I know my own chorus."
>
> **Q3.** Sheet order: *(a) set order Meander → Calloway → Waltz
> (b) alphabetical (c) by key?*
> **A: (a)** — files are numbered 01–03 in set order.

Answers are permanent. Re-renders (new song, lyric fix) reuse every decision
above; only the proofed pt sizes get re-checked against the bottom margin.
