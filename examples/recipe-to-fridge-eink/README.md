# Recipe → fridge e-ink panel

Seven paragraphs of warm, digressive recipe prose, re-decided into a 648×480
1-bit panel a cook can read with wet hands from across the kitchen.

## The situation

"Tuesday Chicken" — a braised chicken with preserved lemon and olives —
lives in the author's notes as full prose: headnotes about preserved lemons,
asides about saving schmaltz, a metaphor about skin turning into "a sad gray
raincoat." Lovely to read on a couch. Useless mid-sear.

The target is a 5.83″ e-ink panel (648×480, strict 1-bit) magnet-mounted on
the fridge. No touch, no scroll, no zoom, no gray. The cook glances at it
maybe thirty times in an evening, often from 1.5 m, usually with hands that
shouldn't touch anything.

## The decisions

Full record: [`decisions/eink-fridge.md`](decisions/eink-fridge.md). The
ones that carry the example:

**Two reading distances, one panel.** The two facts that ruin dinner if
missed — 425°F and 1¼ hr — form a huge top-left block (84 px Archivo Black
≈ 15.5 mm caps, readable across the kitchen). Steps run at 18 px for
arm's-length reading, with bold verb heads that scan from further out.

**Ingredients down the RIGHT edge.** The fridge sits left of the prep
counter, so the cook's eye enters the panel from the right. The
mise-en-place column gets the nearest edge: bold quantities, knife-work in
regular weight, open-square eye anchors (not checkboxes — nothing here is
tappable).

**Prose → ≤8 imperative steps, rewritten not truncated.** The record shows
the surgery:

> **Before:** "…set the thighs skin side down in a wide, dry, cold ovenproof
> pan — no oil, the thighs bring their own — and only then turn the heat to
> medium. Render slowly, and leave them entirely alone: resist every urge to
> peek or shuffle them for a good seven or eight minutes…"
> **After:** **SEAR** skin-down, cold dry pan, 7–8 min. Don't move them.

The author's bossiness survives; the storytelling drops to T3 (it still
lives in [`source.md`](source.md), which is the point of capturing the
source). Step 7 pointedly does *not* repeat the oven temperature — the
number lives 300 px away at 15 mm tall, and repeating T1 facts in small type
teaches the eye to trust the small type.

**Orientation was asked, not assumed.** The surface profile flags
orientation as required-if-unknown; it came back in the one batched
question round, with the panel's bit depth and — because content is part of
the design — the oven type, since convection would change the biggest
number on the panel:

> **Q1.** The panel on the fridge: *(a) landscape, frame screwed — locked
> (b) portrait (c) rotatable?* **A: (a)** — 648 wide × 480 tall is the
> design truth.
> **Q3.** Your oven: *(a) conventional — keep 425°F (b) convection — print
> 400°F?* **A: (a)**

**The proof caught real failures.** Round 1: the title clipped at its
nowrap edge, and step 8's second line fell off the bottom of the panel.
Both were fixed *editorially* — a shorter title and tighter step copy — not
by shrinking type below glance size. That's the framework working as
intended: when content doesn't fit, re-edit the content.

## The artifact

[`out/eink-fridge/recipe-panel.html`](out/eink-fridge/recipe-panel.html) —
exactly 648×480, Archivo/Archivo Black/Archivo Narrow, pure black on white,
1 CSS px = 1 panel px.

## Try it

Proof at the panel's true fidelity:

```bash
chromium --headless --screenshot=panel.png --window-size=648,480 \
  --hide-scrollbars out/eink-fridge/recipe-panel.html
magick panel.png -threshold 55% -depth 1 panel-mono.png   # what e-ink sees
```

Delivery to real hardware is a connector away — TRMNL and OpenEPaperLink
both take a PNG at panel dimensions.

Or run it live: paste any long recipe and say *"put this on the fridge
e-ink — steps glanceable with wet hands."* Expect the agent to ask you about
orientation, gray levels, and your oven, once.
