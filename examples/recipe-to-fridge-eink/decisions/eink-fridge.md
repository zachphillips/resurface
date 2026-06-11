# Decision record: Tuesday Chicken → fridge e-ink (5.83″, 648×480, 1-bit)

Source: `../source.md` · Artifact: `../out/eink-fridge/recipe-panel.html`

## Surface facts this record designs against

5.83″ panel, 648×480 px ≈ 138 PPI (physical ≈ 4.69×3.47 in), **strict 1-bit**
(Q2), magnet-mounted on the fridge door in **landscape, orientation locked**
(Q1), static refresh — the image is repainted once when dinner is chosen and
then it's paper. Viewer stands 0.5–1.5 m away with wet hands; the panel can
never be touched, scrolled, or zoomed.

## Fidelity budget

311,040 pixels, one bit each, no interaction, but *unlimited attention* — a
fridge panel is glanced at dozens of times in an evening. Spend resolution on
type, never on imagery; spend layout on **eye position** (the cook stands at
the counter to the panel's right — see ingredient rail below); spend
contrast everywhere, because contrast is survival on e-ink: no grays exist,
so hierarchy comes from size, weight, and inversion only.

## Two reading distances, one panel

- **1.5 m glance tier (T1 vitals):** `425°F` set in Archivo Black at
  **84 px ≈ 15.5 mm caps** — readable across the kitchen. `1¼ HR` at 40 px
  beside it, split by a 4 px vertical bar. This block owns the top-left
  because that's where a left-to-right reader's "first fact" lives.
- **0.6 m read tier (steps):** Archivo 600 at **18 px / 22 px line** ≈
  2.7 mm x-height — comfortable at arm's-plus reach, scannable further out
  by the bold verb heads alone.

## Layout, in real units (1 CSS px = 1 panel px)

- **Ingredient rail down the RIGHT edge, 192 px** wide inside a 3 px rule,
  inverted `INGREDIENTS` band on top. The fridge sits left of the prep
  counter, so the cook's eye enters the panel from the right; mise en place
  is the panel's most-glanced column and gets the nearest edge. Items:
  Archivo Narrow 16/18 px, **bold quantity, regular knife-work**, with
  12 px open-square anchors (2 px stroke — crisp at 138 PPI; these are eye
  anchors, not tappable checkboxes — nothing on this surface is tappable).
- **Title** demoted to a 19 px caps label strip: the cook knows what they're
  making; identification needs to survive, dominance doesn't. ("Braised
  Chicken · Preserved Lemon · Olives" was 42 chars; the title field holds
  34 at 19 px caps, so *Braised* dropped — the steps are nothing but braise.)
- **Steps:** ≤8 numbered rows filling the remaining 456×~310 px, white-on-
  black 24 px number chips, verbs in Archivo 800 caps. Eight is the cap
  because eight rows is what keeps every step ≥18 px — if the recipe needed
  ten, the *content* would compress further, not the type.
- No grays anywhere: every distinction is weight, size, inversion, or
  position. Threshold-proofed, not dithered — this is a text panel.

## Content triage: prose → 8 glanceable steps

The whole middle of the source is T2 — rewritten, not truncated. Before/after
(two of the eight, the rest follow the same surgery):

> **Before:** "Set the thighs skin side down in a wide, dry, cold ovenproof
> pan — no oil, the thighs bring their own — and only then turn the heat to
> medium. Render slowly, and leave them entirely alone: resist every urge to
> peek or shuffle them for a good seven or eight minutes, until the skin
> releases from the pan by itself and has gone the color of dark caramel."
> **After:** **SEAR** skin-down, cold dry pan, 7–8 min. Don't move them.

> **Before:** "Nestle the thighs back in skin side up, and here is the rule
> the whole dish hangs on: the skin must sit proud of the liquid. […] if the
> skin goes under, it turns to a sad gray raincoat."
> **After:** **NESTLE** thighs skin-up, above the liquid.

The author's bossiness survives ("Don't move them"); the metaphors go. Step
7 deliberately does **not** repeat 425°F — the number lives 300 px away at
15 mm tall, and repeating T1 facts in small type teaches the eye to trust
the small type.

Dropped (T3, survive only in `source.md`): headnote, preserved-lemon cheat,
schmaltz aside, saffron option ("optional" doesn't earn rail space at
1-bit), leftovers note. No QR — unlike paper, the panel's source file is one
tap away on the machine that renders it.

## Proof results

648×480 screenshot → 55% threshold → 1-bit → inspected at 200%. Round 1
failed twice, both caught by the proof, both fixed at the right level:
title clipped at the nowrap edge (fixed editorially — shorter title, not
smaller type) and step 8's second line fell off the panel bottom (fixed
editorially — steps re-cut to ≤2 lines at 18 px with no single-word
orphans). Round 2 clean: no clipping, no grays, squares crisp, vitals
legible in a 200%-view squint test ≈ 3 m.

## Open questions — asked once, batched (2026-06-10)

> **Q1.** The panel on the fridge: *(a) landscape, frame screwed — locked
> (b) portrait (c) rotatable, pick the better fit?*
> **A: (a)** — landscape locked. 648 wide × 480 tall is the design truth.
>
> **Q2.** Panel grayscale: *(a) strict 1-bit (b) 4-level gray (c) 16-level?*
> **A: (a)** — strict 1-bit. No dither, no grays; hierarchy by weight/size
> only.
>
> **Q3.** Your oven: *(a) conventional — keep 425°F (b) convection — print
> 400°F instead?* (This changes the biggest number on the panel, so it's
> worth one question.)
> **A: (a)** — conventional, 425°F stands.
