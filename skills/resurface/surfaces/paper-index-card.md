---
surface: paper-index-card
class: paper
canvas: 3×5in (76.2×127mm) primary; 4×6in (101.6×152.4mm) variant; card stock ~199gsm
color: full (verify printer)
interaction: writable
refresh: static
segmentation: card
viewing-distance: 30–50cm handheld; up to 1m propped
ink-economy: costly
---

# Index card — one thought per piece of card

A card is not a small page; it is a physical unit of meaning that can be sorted,
shuffled, propped against a mixing bowl, and thrown away when done. The deck is
the document; the order of the deck is part of the information.

## Physical truth

- 3×5in = **76.2×127mm**; 4×6in = **101.6×152.4mm**. Landscape is the natural
  hand orientation; portrait suits propped/flip use.
- Stock: 110lb index ≈ **199gsm**. Standard trays choke on it — expect manual /
  bypass / rear feed, often one card at a time.
- Many printers' minimum feedable size is 89×127mm (3.5×5in); bare 3×5 may be
  below spec. Fallback: impose 3-up on Letter card stock with crop marks and cut.
- Hard margins still apply: ~5mm. Design margin 6mm → live area **64×115mm**
  (3×5) or **90×140mm** (4×6).
- Two faces exist, but the back is invisible while the front is in use.

## Fidelity budget

Starved of area — the live face of a 3×5 is one-eighth of a Letter sheet — and
rich in physicality: sortable, discardable, prop-able, pocketable. Persistence is
high (card stock outlives paper). Spend the budget on one unit of meaning set
large; the deck, not the card, carries the whole.

## What it's good at

Recipe steps, rehearsal and speech cues, flashcards, per-task work cards, packing
and checklist decks — any sequence a user works through with busy hands, one
discrete state at a time.

## Failure modes

- **A document shrunk onto cards**: continuation lines, "(cont'd)", mid-thought
  splits. Each card must stand alone.
- **Back-side dependencies while hands are busy** — nobody flips a card during a
  chorus or with flour on their fingers.
- **Unnumbered decks**: one drop of the stack destroys the document.
- **Tray feeding**: jams, skewed prints, ink smears on coated stock.
- **Tiny type to force a fit** — the fix is condensing content, not shrinking
  below minimums.

## Typography minimums

- Hands-busy glance use: body **14–18pt**, title 18–24pt. Seated study use: body
  11–13pt.
- Line length at 115mm live width: ~40–48 characters at 12pt; fewer at glance
  sizes. Break lines by meaning, not by wrap.
- Condensed faces are the native fit tool — buy characters with a condensed
  grotesque before surrendering point size.
- Rules ≥0.5pt; keep ink coverage light on coated card (smears when handled).

## Native idioms

- **One unit of meaning per card** — one step, one cue, one question. Doesn't
  fit? Condense the prose (T2 rewrite), never split.
- **Front-side-only** when the user's hands are busy; backs reserved for answer
  /detail in study decks (flashcard idiom).
- Corner index: **"3/12"** top-right, plus a one-word deck slug top-left so a
  scattered deck reassembles itself.
- Card order as information: sequence = process; done cards go to the back of
  the deck — no checkboxes needed.
- A title slug in the same position on every card, so flipping through the deck
  reads as a table of contents.
- Write-in space: one 0.5pt rule at the foot for the user's own note.

## Required-if-unknown

- "3×5 or 4×6 cards? (4×6 nearly doubles the live area)"
- "Can your printer feed card stock at this size (manual/rear tray), or should I
  impose 3-up on Letter card stock with crop marks for cutting?"
- "Used hands-busy at a glance (cooking, performing) or held and studied?
  (decides 14–18pt vs 11–13pt)"
- "Single-sided, or may the back carry detail (study/flashcard use)?"

## Rendering target

Print-CSS HTML → PDF, one page per card:

```css
@page { size: 127mm 76.2mm; margin: 6mm }   /* 3×5 landscape */
section.card { page-break-after: always }
```

For the imposition fallback: `@page { size: letter }` with three absolutely
positioned 127×76.2mm card boxes and hairline crop marks. Print at 100% via
`connectors/cups.md`; feed cards through the manual slot one at a time.

## Proofing

Rasterize each card at 300 DPI and view at actual size: one glance should yield
the card's whole meaning. Check the corner index on every card, no content
within 5mm of edges, and glance-type sizes against the declared use context.
Print one card, prop it where it will live (counter, music stand), and read it
from the real distance before printing the deck. `references/proofing.md`.
