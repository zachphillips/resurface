# Lyrics → letter sheets + index cards

One repertoire, two surfaces, two completely different sets of decisions —
made from a single captured source.

## The situation

A guitarist keeps three songs in a plain-text file: a river song in G, a
leaving-town song in C (played capo 2), a waltz in D. They asked for two
physical forms:

1. **Letter sheets** for the music stand — *"as big as possible, and I can't
   turn pages mid-song."*
2. **3×5 index cards** for jams — *"one song per card if you can. I'm not
   flipping anything over."*

"Can't turn pages" is not a layout preference. It's the constraint that
generates every other decision in this example.

## What the agent captured first

[`source.md`](source.md) records *why the artifact exists* before any design
happens: the player's eyes drop to the page only at chord changes, so chords
positioned over the exact syllable are T1 (must survive), repeated choruses
are T2 (the player knows them after one pass — condensable to a cue line),
and verse numbers are T3 (droppable). That tiering is what both surfaces
spend their budgets against.

## Surface 1: paper-letter

Decision record: [`decisions/paper-letter.md`](decisions/paper-letter.md) ·
Artifacts: [`out/paper-letter/`](out/paper-letter/)

The reasoning chain, straight from the record:

> Guitarist can't turn pages → each song fits one side of one sheet → short
> songs take one wide column at maximum size; the long song takes two columns
> at the size its longest phrase allows → font size is found by proofing
> against the bottom margin, not guessed.

Concretely:

- **The Long Meander** and **The Orchard Waltz** (17–18 rows each): one
  column at **17 pt** — huge for a lead sheet, and the point. 18.5 pt was
  tried first and the proof clipped the final cue line; 17 pt is the
  *measured* maximum, not a guess.
- **Last Bus Out of Calloway** (36 rows): one column would have forced
  ~13 pt. Instead: **two columns at 15.5 pt**, column break at a section
  boundary, long lines broken at sung phrase boundaries with hymnal
  turnover indents. The renderer is never allowed to wrap a line —
  `white-space: nowrap`, so a bad break shows up as proof overflow instead
  of a silent stumble at the gig.
- **Choruses print once, in full; repeats become pencil-mark cues**
  (`— chorus ×2 · end on G —`). The record shows the math: this rewrite
  bought ~4 pt of lyric size. Editorial decision, typographic payoff.

## Surface 2: index cards

Decision record: [`decisions/index-cards.md`](decisions/index-cards.md) ·
Artifact: [`out/index-cards/repertoire-cards.html`](out/index-cards/repertoire-cards.html)

Same source, 1/5.6 the area. The two short songs each fit one card in
Archivo Narrow at 8.5 pt, two columns. Calloway doesn't fit — so it splits
across **two cards laid side by side**, never front/back, with inverted
`CARD 1 OF 2 →` flags and the split placed after the first chorus, "a held
moment in the song, the one place the eye can afford to travel."

Two decisions worth reading the record for:

> **The Orchard Waltz is set 0.5 pt below deck standard (8 pt) with zero
> turnovers.** Phrase integrity beats half a point of type.

(The first proof had fractured its long waltz phrases into turnovers and
overflowed the card; the proof also measured the condensed face as narrower
than estimated, which made the unsplit lines fit.)

> **Calloway's final chorus is printed in full on card 2** — not as a cue —
> because the song *ends* there: the last thing the player needs is the one
> part of the card that must not require memory under a ritard.

And one batched question with a recorded answer, so it is never asked again:

> **Q3.** Calloway is played capo 2. Header shows: *(a) `C · Capo 2`
> (b) sounding key `D` (c) both?*
> **A: (a)** — shapes are what the hands need; the band isn't reading these.

## Try it

Open the artifacts in a browser and print (margins: none — the `@page` rules
carry the geometry). Cards print one per page onto pre-cut 3×5 stock.

Proof them the way the agent did:

```bash
# letter sheet at page pixels (8.5×11in @ 96px/in)
chromium --headless --screenshot=proof.png --window-size=816,1056 \
  --hide-scrollbars out/paper-letter/01-the-long-meander.html

# card deck (5×3in pages stack vertically on screen)
chromium --headless --screenshot=cards.png --window-size=480,1300 \
  --hide-scrollbars out/index-cards/repertoire-cards.html
```

Or run it live: drop your own ChordPro/text songs in a project with the
resurface skill installed and say *"print my repertoire on letter for the
stand and on 3×5 cards for jams — I can't turn pages or flip cards
mid-song."* The agent will capture its own `source.md`, write its own
decision records, and ask you its own batched questions.
