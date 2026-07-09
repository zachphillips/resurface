---
name: resurface
description: >
  Surface-aware publishing. Re-design any document, dashboard, or interface for a
  different output surface — letter paper, index cards, thermal receipts, label
  stickers, e-ink panels, slides, phones, TVs, terminals — by re-deciding both the
  layout AND the content for that surface's real constraints. Use when the user
  wants to print something, send something to a small or unusual display, condense
  a document into another format, or says "make this into" a different medium.
---

# resurface

Responsive design ends at the edge of the viewport. Media queries can reflow boxes;
they cannot decide what matters. You can.

## Why this exists

Every artifact someone makes — a dashboard, a recipe, a proposal, a set of song
lyrics — was built to fit one surface, usually a browser window. But people live
among many surfaces: a 32" display at the desk, a 7" e-ink panel on the fridge, a
thermal printer that produces 58mm receipts, a stack of 3×5 index cards, a sheet of
letter paper, a 16:9 projector. Traditional responsive design moves boxes around.
It cannot shorten a recipe step, choose two days of a calendar instead of seven,
swap checkboxes for strikethroughs because the printer can't render a crisp 12px
glyph, or condense eight requirements into five because five reads better.

Those are editorial decisions. Making them well requires knowing **why the artifact
exists**, **who is using it**, and **what the new surface can physically do**. That
is your job. resurface gives you the vocabulary, the procedure, and a library of
surface knowledge so your judgment lands on real hardware correctly.

The prime directive: **the useful meaning of the thing must survive the move.**
Not the pixels. Not the word count. The meaning.

## Vocabulary

- **Source** — the artifact being resurfaced, captured as intent + content model +
  design language. Not a file format; an understanding.
- **Surface** — a target output, described by a *surface profile*: physical
  dimensions, resolution, color depth, interactivity, refresh behavior,
  writability, segmentation, viewing distance, ink economy. See `surfaces/`.
- **Fidelity budget** — what a surface gives you to spend: area, color, resolution,
  interaction, attention, persistence. Every surface change is a re-budgeting.
- **Decision record** — a written, durable record of the design and content
  decisions for moving one source to one surface. See step 3.
- **Proof** — a render of the output at the surface's true fidelity (real pixels,
  real bit depth) that you actually look at before delivering.
- **Connector** — a delivery integration that gets the artifact onto the physical
  surface: CUPS, ESC/POS, TRMNL, OpenEPaperLink, PDF, kiosk browser. See
  `connectors/`.

## The protocol

Six steps. Each produces an artifact in the project's `.resurface/` directory so
the work is durable, repeatable, and consistent across re-renders.

### 1. Capture the source → `.resurface/source.md`

Understand the artifact before touching its form. Record:

- **Intent**: why does this exist? What action or decision does it serve? A lyrics
  sheet exists so a guitarist can sing without stopping; that single fact later
  dictates font size, page count, and column layout.
- **Audience & use context**: who, where, doing what with their hands and eyes?
- **Content model**: break the content into units and assign survival tiers:
  - **T1 — must survive on every surface** (the chord change, the next calendar
    event, the oven temperature)
  - **T2 — condensable** (descriptions that can be rewritten shorter in the
    author's voice)
  - **T3 — droppable** (background, rationale, links — can vanish or escape via
    QR code on printed surfaces)
- **Design language**: capture it if it exists (tokens, fonts, spacing); infer it
  from the artifact if it doesn't. Record the *spirit*, not just the values — a
  surface that can't render cobalt blue should still feel like the same brand.
- **Voice**: how the author writes, so condensed copy still sounds like them.

If a `source.md` already exists, read it and update it rather than re-deriving.

### 2. Choose the surface

The user names a target ("put this on the fridge e-ink", "print it on the label
printer"). Load the matching profile from `surfaces/`. If no profile matches,
write one using `surfaces/_schema.md` — measure first, design second.

Each profile lists **required-if-unknown** facts (e.g. can this e-ink panel be
rotated, or is it screwed to the wall in landscape?). Collect the ones you don't
know — but ask in step 3, batched, not piecemeal.

### 3. Decide → `.resurface/decisions/<surface>.md`

Write the decision record *before* rendering. It contains:

- The fidelity budget for this surface and what you're spending it on.
- Layout decisions in **real units** (inches, millimeters, points, device pixels —
  never unitless "looks about right").
- Content triage: what survives verbatim, what gets rewritten shorter, what drops
  or escapes to QR. Show the actual rewrites for anything T2.
- Surface idioms chosen (see judgment rules below).
- Segmentation plan when the surface is segmented (which song goes on which card;
  where the receipt perforations fall).
- **Open questions** — only the decisions where your confidence is low AND the
  cost of guessing wrong is high. Present them to the user as compact multiple
  choice ("Show 2 days, 3 days, or switch to a vertical 7-day list?"). Record the
  answers in the decision record so they are never asked again.

The record is the contract. When the user re-renders next week with new data, the
same decisions apply — same fonts, same triage, same answers — unless they change
the record.

### 4. Render → `.resurface/out/<surface>/`

Produce the surface-native artifact. The profile names the rendering target —
print-CSS HTML for paper, fixed-pixel HTML or PNG for e-ink, ESC/POS for thermal,
paginated HTML for slides. Use real units in CSS (`in`, `mm`, `pt`) for anything
physical. One artifact per segment when segmented.

### 5. Proof at true fidelity

This is the step deterministic responsive design can never do: **look at your
output the way the device will render it.** Rasterize at the device's actual pixel
dimensions and bit depth — 384px wide and 1-bit for a 58mm thermal printer, 800×480
grayscale for a 7.5" e-ink panel — and inspect the image yourself. Check the
failure modes the profile warns about: hairlines that vanish, gray text that
dithers to mud, orphaned lines, a lyric that wrapped where a guitarist's eye would
stumble. Fix and re-proof. For physical prints, print **one** before printing
twenty. Commands and techniques: `references/proofing.md`.

### 6. Deliver

Use a connector to get the artifact onto the surface: spool to CUPS, push raw
ESC/POS, upload to TRMNL, write the PNG to an e-paper tag, open a kiosk browser,
emit a PDF. Connectors compose with schedulers — a cron job plus a connector is a
morning briefing sticker waiting on the printer at 7am. See `connectors/`.

## Judgment rules

These are the editorial principles. They outrank any habit carried over from
screen design.

1. **Physical truth.** Work in real units and real device capabilities, from the
   profile, never from memory. An index card is 3×5 in. A 58mm receipt prints
   ~48mm wide at 8 dots/mm = 384 dots. A 12pt glyph at arm's length is not a 12pt
   glyph across the kitchen.
2. **Use-context beats screen size.** The guitarist can't turn a page mid-song, so
   everything fits one side — two columns, condensed face if needed, font as large
   as fitting allows. The cook's hands are wet, so steps are glanceable from a
   meter away. Context decides; geometry only constrains.
3. **Never truncate — re-edit.** Cutting a sentence at the ellipsis is failure.
   Rewriting eight requirements as five tighter ones, in the author's voice, is
   the job. Design informs content; content informs design. You hold both pens.
4. **Spend the whole budget.** Empty space on a printed page is wasted fidelity —
   scale type up until the content fits the surface, not just on it. Conversely,
   on a surface with attention to spare (a slide), spend it on emptiness.
5. **Translate idioms, don't transplant them.** A checked checkbox reads on
   retina; on thermal it's a smudge — use a thin strikethrough, or a horizontal
   rule between done and next, or italics for not-yet. Gray "upcoming" text
   becomes indentation or weight on a 1-bit surface. Every profile lists native
   idioms.
6. **Ink is part of the budget.** Inkjet on white paper: spend ink sparingly,
   prefer line-work to fills. Thermal: "ink" is free — solid blacks are cheap and
   crisp. E-ink: contrast is survival; mid-grays only if the panel truly has them.
7. **Segment by meaning.** When output is segmented (cards, receipt perforations,
   boarding passes, brochure panels), each segment gets a coherent unit of
   meaning, never a mid-thought cut. If hands are busy, content goes front-side
   only — nobody flips an index card during a chorus.
8. **Print gets escape hatches.** Paper can't link, but it can carry QR codes —
   use them for T3 overflow, live versions, audio rationale. Paper can also be
   written on: leave rules and empty checkboxes where the surface profile says
   the artifact invites annotation.
9. **Ask rarely, batch always.** Decide everything you can defend. Bring the user
   only low-confidence/high-cost calls, as multiple choice, in one batch, and
   record the answers permanently.
10. **Proof like it's hardware, because it is.** Nothing ships on the strength of
    "should work." Rasterize, look, fix, then deliver.

## Library

- `surfaces/` — one profile per surface; `_schema.md` to write new ones.
- `connectors/` — delivery integrations and their setup.
- `references/workflow.md` — the protocol in long form, with worked examples.
- `references/content-triage.md` — tiering, condensing, voice preservation.
- `references/typography-and-size.md` — point sizes, viewing distance, condensed
  faces, line-break hygiene.
- `references/ink-color-and-dither.md` — monochrome strategy, dithering, ink economy.
- `references/qr-codes.md` — QR as the print-surface escape hatch.
- `references/rotating-views.md` — playlist/kiosk rotations where every view
  must stand alone.
- `references/proofing.md` — rasterizing at true fidelity, inspection checklists.

Read a profile **completely** before designing for its surface. The profiles are
where the hardware truth lives; this file only teaches the judgment.
