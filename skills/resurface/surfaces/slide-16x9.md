---
surface: slide-16x9
class: projection
canvas: 1920×1080 logical = 13.333×7.5in (PowerPoint/Keynote 16:9), landscape
color: full, projector-degraded (assume washed blacks, ~10:1 effective contrast in lit rooms)
interaction: none (presenter advances; audience only watches)
refresh: instant
segmentation: slide
viewing-distance: 2–15m audience; 50cm presenter reading notes
ink-economy: n/a
---

# 16:9 slides — one idea at a time, narrated

A slide is not a page; it is a backdrop for a sentence someone is speaking.
Paragraphs on canvas are the defining failure mode — prose belongs in presenter
notes, which are a first-class output channel, not an afterthought. The canvas
gets one idea, set huge, surviving a cheap projector and the back row.

## Physical truth

- Logical canvas **1920×1080 = 13.333×7.5in** at 144px/in (so 1pt = 2px:
  24pt = 48px).
- Projectors in lit rooms collapse contrast to ~10:1: blacks go gray, thin
  strokes and subtle tints vanish. Screen-share adds 720p re-compression and
  small-window viewing.
- The back row sits at 2–15m; assume the slide is seen at a fraction of the
  angular size you designed it at.
- Edge safe area ~5% (**96px sides, 54px top/bottom**): keystone correction,
  projector misalignment, and screen-share window chrome all nibble edges.
- Time is the scroll axis: each slide is visible 30–120 seconds while the
  audience also listens.

## Fidelity budget

Rich in area-per-idea, color, and sequence; starved of audience reading time,
because attention is split with the speaker. Spend the canvas on emptiness and
one idea (this is the surface where whitespace is the spend); spend the notes
channel on everything else — narration, rationale, T2/T3 content.

## What it's good at

Persuasion and pacing: one decision per slide, sequence as argument, the One
Big Number, the reveal. With notes exported, the deck doubles as the
leave-behind document.

## Failure modes

- **The pasted document**: paragraphs on canvas, read aloud verbatim, audience
  reading ahead of the speaker.
- Type under 24pt; six-plus bullet lines; charts imported from dashboards with
  12px axis labels (re-draw and re-label at slide scale).
- Low-contrast palettes — light gray on white, thin weights — that die on
  projection.
- Edge content clipped by keystone or share-window chrome.
- Notes written as keyword crumbs instead of speakable prose — they are the
  script.

## Typography minimums

- Body **≥24pt (48px)**, titles 36–44pt, footnotes/sources floor 20pt — nothing
  smaller on canvas, ever.
- ≤5 lines per slide, ≤~8 words per line, line length ≤36 characters.
- The One Big Number: 200–400pt.
- Weights regular-to-bold; semibold survives projectors best. No light weights.

## Native idioms

- **One idea per slide** — slides are free, attention is not; split rather than
  stack.
- **Presenter notes as the prose home**: full speakable sentences, ~130 words
  per minute of intended slide time; T2 rewrites and T3 rationale live here.
- Full-bleed image with one line of text; section-divider slides as breathing
  room.
- Builds as consecutive slides (no animation dependency — survives PDF export).
- A constant grid: title baseline, margins, and footer identical on every slide
  so eyes never re-search.
- Sources in the 20pt footer; the verdict slide first or last, never buried.

## Required-if-unknown

- "Shown on a projector in a lit room, a large LED/TV, or screen-share only?
  (sets the contrast floor)"
- "Will the deck be read standalone afterwards? (yes → notes exported as the
  handout; canvas can be sparser)"
- "Is there a house template/brand to honor, or do I design fresh?"

## Rendering target

**Paginated HTML** — one `.html` per slide, or one deck file with one page per
slide — exported to PDF for the universal artifact:

```css
@page { size: 13.333in 7.5in; margin: 0 }
section.slide { width: 1920px; height: 1080px; position: relative;
                page-break-after: always; overflow: hidden }
:root { font-size: 48px }            /* 1rem = the 24pt body floor */
section.slide .notes { display: none } /* emitted separately, keyed by slide # */
```

Presenter notes ship as a parallel Markdown/HTML document numbered by slide —
deliver both files; the notes are not optional output.

## Proofing

Rasterize every slide at 1920×1080. Back-of-room test: view each at **25%
zoom** — if anything is unreadable, the back row can't read it. Convert to
grayscale to simulate projector washout: hierarchy must survive. Overlay the 5%
safe frame. Then read the notes aloud against a timer — they are a script, and
a slide whose notes run four minutes is two slides. `references/proofing.md`.
