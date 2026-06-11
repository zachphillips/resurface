# Writing a surface profile

A surface profile is the hardware truth for one output surface, written so an
agent can compute a layout from it. The canonical structure is
[`skills/resurface/surfaces/_schema.md`](../skills/resurface/surfaces/_schema.md);
the best existing example to study is
[`thermal-receipt.md`](../skills/resurface/surfaces/thermal-receipt.md). This
page is the contributor's guide: what each section is for, and what "good"
looks like.

## Measure first

The whole framework rests on profiles telling the truth. Before writing a
line:

- Get the device in front of you, or get someone who has it on the line.
- Measure the *usable* canvas, not the nominal one. A "58mm" thermal roll
  prints 48mm. A "7.5-inch" panel has bezels. A label has a leader the
  printer grips.
- Print or flash a test pattern: a ruler of 1/2/3-dot lines, a type ramp from
  8px up, a gray ramp if the surface claims grays. The pattern tells you the
  minimums; the datasheet only tells you the marketing.
- If you genuinely can't measure something, don't guess — route it to
  **Required-if-unknown** so the agent asks the user who *is* standing in
  front of the device.

A profile with one invented number is worse than no profile, because agents
trust it.

## The sections, in order

**Frontmatter.** Machine-scannable summary: `surface` (kebab-case, matches the
filename), `class`, `canvas`, `color`, `interaction`, `refresh`,
`segmentation`, `viewing-distance`, `ink-economy`. Put real numbers in
`canvas` — physical size *and* pixel dimensions *and* dot pitch where they all
exist.

**Title line.** `# <Human name> — <one-line character sketch>`. "The
continuous monochrome strip" is a design brief in five words; aim for that.

**Physical truth.** The load-bearing section. Exact dimensions, printable or
visible area after margins and bezels, dot pitch, and how the device actually
forms an image (thermal bloom, e-ink particle refresh, overscan). The test: an
agent should be able to lay out a page from this section alone.

**Fidelity budget.** One paragraph: what the surface is rich in and starved of,
in budget terms (area, color, resolution, interaction, attention,
persistence). This is where the surface's strategy gets set.

**What it's good at.** The jobs where this surface beats a browser window.
Honest and specific — if the answer is "nothing, but it's mounted where the
browser isn't," say that.

**Failure modes.** The ways designs die here, each one *checkable in a proof*.
"Looks bad" is not a failure mode; "a 1-dot gap closes up under thermal bloom"
is.

**Typography minimums.** Smallest reliable sizes in real units, faces and
weights that survive, when to go condensed, line length at this canvas width.
These come from your test pattern, not from taste.

**Native idioms.** The visual vocabulary that feels at home: strikethrough vs
checkbox, rules, dither patterns, QR placement, fold-aware layout. This is the
section that stops agents transplanting screen habits.

**Required-if-unknown.** Every fact that varies by installation or model,
phrased as the multiple-choice question the agent should ask. This is where
your uncertainty goes — all of it.

**Rendering target.** What artifact to produce and the exact CSS or page setup
that maps 1:1 onto the physical canvas. Include the snippet; agents copy it.

**Proofing.** The rasterization recipe — pixel dimensions, bit depth, any
dithering simulation — and what to inspect. Point at the shared commands in
[`references/proofing.md`](../skills/resurface/references/proofing.md).

## A worked mini-example: the 2.13″ e-paper shelf tag

The 2.13″ panel in electronic shelf labels and OpenEPaperLink tags is a good
first profile: cheap, common, full of sharp constraints. Condensed — a real
profile would run fuller, still under ~120 lines:

```markdown
---
surface: epaper-shelf-tag
class: eink
canvas: 250×122 px on 48.55×23.71mm active area (~131 DPI), 2.13" diagonal
color: mono (B/W) — B/W/red variant common, see Required-if-unknown
interaction: none
refresh: slow (~2s full refresh B/W; ~15s if red is involved)
segmentation: none
viewing-distance: 40–70cm, at a shelf edge, often glanced while walking
ink-economy: free (image persists at zero power)
---

# E-paper shelf tag — the tiny permanent sign

250×122 binary pixels that hold an image forever on no power. One unit of
meaning per tag: a price, a status, a name. Designs that try to say two
things here say nothing.

## Physical truth
- 250×122 px, 48.55×23.71mm active, ~131 DPI; ~0.19mm per pixel.
- Pixels are crisp: 1px lines render. Anti-aliased text does not — render
  with a hard threshold, never grayscale-smoothed.
- Full refresh flashes black/white for ~2s; no animation, no frequent
  updates (panel lifetime is rated in refresh cycles).

## Fidelity budget
Starved of everything except contrast and persistence. ~30k pixels total —
a 1080p dashboard has 68× more. Spend them on one number or one line, huge.
Attention is a half-second glance; persistence is effectively infinite.

## Failure modes
- Anti-aliasing dithers to fuzz at 131 DPI — threshold everything.
- Ghosting from partial refresh: faint previous image persists.
- Red (tri-color) mis-registers ~1px: never use red for fine text.
- Anything under ~14px tall is unreadable at 50cm walking pace.

## Required-if-unknown
- "B/W or B/W/red panel?" (changes the accent strategy entirely)
- "Mounted landscape or portrait? Can it be rotated?"
- "Delivered via OpenEPaperLink AP, or direct SPI?"

## Rendering target
Fixed-pixel HTML at exactly 250×122, zero margin → PNG → 1-bit threshold.

## Proofing
chromium --headless --screenshot --window-size=250,122; then
magick proof.png -threshold 50% -depth 1 proof-mono.png. View at 400%.
Check: no gray remnants, smallest text ≥14px, nothing within 4px of edges.
```

Notice what made that work: every number is measurable on a real tag, the
failure modes map to proof checks, and the two facts that vary by deployment
(red, orientation) became questions rather than assumptions.

## Quality bar

- **Every number real.** Measured, ruler-verified in print, or from a
  datasheet you cross-checked against the device. Say which.
- **Uncertainty routed, not papered over.** Variation goes to
  Required-if-unknown as a question; common cases go in a short table.
- **Density over prose.** Under ~120 lines. If a sentence doesn't change a
  layout decision, cut it.
- **Proofable.** Every failure mode checkable in the proof recipe you give.

## Where it goes

One file per surface at `skills/resurface/surfaces/<surface-id>.md`, where
`<surface-id>` is the kebab-case `surface:` value in the frontmatter —
`epaper-shelf-tag.md`, `brother-ql-label.md`, `terminal-80x24.md`. Name for
the surface class the agent designs for, not the brand — unless the brand
*is* the constraint (a Vestaboard is a Vestaboard). Then open a PR; the
merge bar, including the proof photo we'll ask for, is in
[CONTRIBUTING.md](../CONTRIBUTING.md).
