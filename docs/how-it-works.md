# How resurface works

This is the conceptual walkthrough. The operational version — the one the agent
actually executes — lives in [the skill itself](../skills/resurface/SKILL.md);
this document explains why the protocol is shaped the way it is.

## The thesis

Responsive design was a real achievement, and it ends at the edge of the
viewport. Media queries can reflow boxes, swap a three-column grid for one,
hide a sidebar. What they cannot do is *decide what matters*: shorten a recipe
step, show two days of a calendar instead of seven, replace a checkbox with a
strikethrough because the target printer turns small glyphs into smudges,
rewrite eight requirements as five tighter ones because five reads better at
this size.

Those are editorial decisions. They require knowing why the artifact exists,
who will use it and with what in their hands, and what the new surface can
physically do. No stylesheet holds that knowledge. An agent can — and modern
agents are good enough editors to act on it. resurface is the procedure, the
vocabulary, and the hardware library that lets that judgment land on real
devices correctly.

The prime directive, stated once here and enforced everywhere else: **the
useful meaning of the thing must survive the move.** Not the pixels. Not the
word count. The meaning.

## The six steps, and what each one leaves behind

Every step produces a durable artifact under `.resurface/` in your project.
Nothing important lives only in the agent's context window.

### 1. Capture → `.resurface/source.md`

Before touching form, the agent writes down its understanding of the artifact:
intent (what action or decision it serves), audience and use context, a tiered
content model — T1 must survive on every surface, T2 can be condensed in the
author's voice, T3 can drop or escape via QR — plus the design language and the
author's voice. This file is written once and updated, never re-derived. It is
the single source every surface renders from.

### 2. Choose — load a surface profile

You name a target; the agent reads the matching profile from
[`skills/resurface/surfaces/`](../skills/resurface/surfaces/) completely.
The profile is the hardware truth: real dimensions, color depth, refresh
behavior, failure modes, typography minimums, native idioms. If no profile
exists for your device, the agent writes one against
[`_schema.md`](../skills/resurface/surfaces/_schema.md) — measure first,
design second. See [Writing a surface profile](writing-a-surface.md).

### 3. Decide → `.resurface/decisions/<surface>.md`

The decision record is written *before* anything is rendered. It states the
fidelity budget and how it's being spent, layout in real units, content triage
with the actual T2 rewrites shown, the surface idioms chosen, and the
segmentation plan if the surface tears, folds, or stacks. Anything the agent
can't defend confidently comes back to you as compact multiple choice — once.

### 4. Render → `.resurface/out/<surface>/`

A surface-native artifact: print-CSS HTML for paper, fixed-pixel HTML or PNG
for e-ink, ESC/POS raster for thermal, paginated HTML for slides. Real units
(`in`, `mm`, `pt`, device pixels) for anything physical. One artifact per
segment when segmented.

### 5. Proof — at true fidelity

The agent rasterizes the render at the device's actual pixel dimensions and
bit depth, then inspects the image itself against the profile's failure modes.
More on why this step matters [below](#proofing-is-the-closed-loop).

### 6. Deliver — via a connector

A [connector](../skills/resurface/connectors/) moves the proofed artifact onto
the physical surface: CUPS, raw ESC/POS, TRMNL, OpenEPaperLink, PDF, a kiosk
browser. Connectors compose with schedulers — cron plus
[`escpos.md`](../skills/resurface/connectors/escpos.md) is a morning briefing
hanging off the printer at 7am.

## The `.resurface/` directory

After resurfacing one dashboard to two targets, a project looks like this:

```
your-project/
└── .resurface/
    ├── source.md                    # intent, tiers, design language, voice — captured once
    ├── decisions/
    │   ├── thermal-receipt.md       # the contract for this surface
    │   └── eink-fridge.md           # a different contract, same source
    └── out/
        ├── thermal-receipt/
        │   ├── strip.html           # render
        │   ├── strip-mono.png       # 1-bit proof, 384 dots wide
        │   └── delivered.2026-06-11 # idempotency marker from the connector
        └── eink-fridge/
            ├── panel.html
            └── proof-gray.png       # 800×480, panel's real gray levels
```

Everything is plain text or an image. Commit it. Diff it. Edit it by hand —
the agent treats your edits as decisions.

## The decision record is a contract

The record exists so that resurfacing is a *decision made once*, not a vibe
re-rolled on every render. A condensed real example:

```markdown
# Decisions: project dashboard → thermal-receipt
surface: thermal-receipt · 58mm roll · 384 dots · 1-bit

## Budget
Starved: width, color, interaction. Rich: length, solid black, immediacy.
Spending length on one column, black on section bands, immediacy on "next".

## Layout
- 384 dots, zero margin; 10mm slack before first ink (paper past the head).
- Inverted full-width band per section, 24-dot caps.
- Heavy 4-dot rule between DONE and NEXT.

## Content triage
- T1 verbatim: task names, due times, blocker count.
- T2 rewritten: "Refactor the authentication middleware to support
  per-tenant session policies" → "Auth middleware: per-tenant sessions"
- T3 → one QR near the tear: live dashboard URL.

## Answered questions
- Roll width? → 58mm           (user, 2026-06-02)
- Pinned or pocket? → pinned   (user, 2026-06-02)
```

Three properties make it a contract:

- **Re-renders reuse it.** Next week's dashboard has new data; it gets the
  same column, the same band style, the same triage rules, the same rewrite
  register. Consistency comes from the record, not from luck.
- **Questions are asked once.** Low-confidence, high-cost calls go to you as
  batched multiple choice; the answers are recorded and never asked again.
- **You veto by editing.** Don't like a rewrite or an idiom? Change the line
  in the record. The next render follows your edit. The record and the
  artifact must never disagree — that rule is enforced at proof time
  (see [`references/proofing.md`](../skills/resurface/references/proofing.md)).

## The fidelity budget

Every surface gives you a budget across six currencies: **area, color,
resolution, interaction, attention, persistence**. Moving surfaces is never
"shrinking" — it is liquidating one budget and re-spending in another.

Concretely. A 1920×1080 dashboard has roughly two million pixels, 16.7 million
colors, hover states and tooltips, scrolling, live refresh every few seconds,
and a viewer at 60cm who chose to look. A 58mm thermal receipt has 384 dots of
width, one bit of color, no interaction, and no refresh — ever.

So the move is a re-spend, line by line:

| Dashboard spends on | Receipt re-spends as |
|---|---|
| red/amber/green status dots | strikethrough for done, clean text for next, a heavy rule between them |
| a sparkline per project | dropped (T3), or a three-character delta: `+3 ▸` |
| hover tooltips with detail | one QR code to the live dashboard, placed to survive the tear |
| eight cards in a grid, scannable | one column, *re-ordered by what the reader does next* |
| live refresh | a timestamp and a cron line that reprints at 6:45 |

And the receipt has currencies the dashboard never had: unlimited length,
solid black at zero cost, pen-writability, and the peculiar attention premium
of a physical object in someone's hand. A good decision record spends those
too — write-in lines, inverted bands, a strip short enough to pin by the door.
Judgment rule 4 applies in both directions: spend the *whole* budget.

## Proofing is the closed loop

Deterministic responsive design is open-loop: it asserts `@media (max-width:
600px)` and never observes the result. Nobody's stylesheet looks at the
output. When it breaks — a wrapped chord, a dithered-to-mud gray, a table
clipped at a bezel — a human discovers it on the device, later.

resurface closes the loop, because the renderer can see. Step 5 rasterizes
the artifact at the device's true fidelity — 384 pixels wide and 1-bit if
that's what the printer's head lays down, 800×480 at four gray levels if
that's the panel — and the agent inspects the image with its own eyes, walking
the profile's failure-mode checklist. Editorial failures (too much content for
the budget) are fixed in the decision record; mechanical ones (a wrap point, a
rule weight) in the render. Then re-proof. For physical output, exactly one
unit is printed before any batch, because hardware always has one more opinion
than the simulator.

Nothing ships on "should work." That single discipline is most of what makes
the rest of this trustworthy.

## Further reading

- [Writing a surface profile](writing-a-surface.md) — add your device's truth
- [Writing a connector](writing-a-connector.md) — add your delivery path
- [FAQ](faq.md)
- [The skill itself](../skills/resurface/SKILL.md) — the protocol as the agent reads it
