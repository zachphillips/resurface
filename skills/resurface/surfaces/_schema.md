# Writing a surface profile

A surface profile is the hardware truth for one output surface. Agents read it
completely before designing; everything physical in the decision record must trace
back to a line in the profile. Measure first, design second — if you are writing a
profile for a device on the user's desk, ask for or measure the real dimensions
rather than assuming a datasheet.

Every profile uses this structure:

```markdown
---
surface: <kebab-case id, matches filename>
class: screen | paper | thermal | eink | projection | terminal
canvas: <physical size and/or pixel dimensions, with DPI/dot pitch>
color: full | grayscale-N | mono
interaction: none | touch | pointer | buttons | writable
refresh: instant | slow (<seconds>) | static
segmentation: none | <unit: card, panel, perforation, page, slide>
viewing-distance: <typical, in real units>
ink-economy: n/a | costly | free
---

# <Human name> — <one-line character sketch>

## Physical truth
Exact dimensions, printable/visible area after margins or bezels, dot pitch,
how the device actually renders (thermal dot rows, e-ink particle refresh,
overscan). Numbers an agent can compute layout from.

## Fidelity budget
What this surface is rich in and starved of, in budget terms (area, color,
resolution, interaction, attention, persistence). One short paragraph.

## What it's good at
The jobs where this surface beats a browser window.

## Failure modes
The specific ways designs die here. Each one should be checkable in a proof.

## Typography minimums
Smallest reliable sizes in real units, recommended faces/weights, when to go
condensed, line-length guidance at this canvas width.

## Native idioms
The visual vocabulary that feels at home here (strikethrough vs checkbox,
rules, dither patterns, QR placement, fold-aware layout...).

## Required-if-unknown
Facts the agent must obtain before deciding (orientation lock? margins
enforced by driver? panel grayscale levels?). Phrase each as the multiple-
choice question the agent would ask.

## Rendering target
What artifact to produce (print-CSS HTML, fixed-pixel PNG, ESC/POS bytes...)
and the CSS/page setup that maps 1:1 onto the physical canvas.

## Proofing
The exact rasterization recipe for this surface (pixel dimensions, bit depth,
any dithering simulation) and what to inspect. Reference
`references/proofing.md` for shared commands.
```

Keep profiles under ~120 lines. Density over prose: an agent should be able to lay
out a page from the Physical truth section alone. If a fact varies by device model
(e-ink grayscale levels, label sizes), give the common cases as a short table and
put the variation in Required-if-unknown.
