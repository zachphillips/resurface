---
surface: eink-large
class: eink
canvas: 10.3in 1872x1404 (227 PPI); 13.3in 1600x1200 (150 PPI) or 2200x1650 (~207 PPI); repurposed Kindle/Kobo 167-300 PPI
color: grayscale-16
interaction: none mounted; touch on repurposed readers
refresh: slow (1-3s full flash; partial faster but ghosts; remote dashboards may pull on minute cadence)
segmentation: none
viewing-distance: 1-3m wall-mounted; 30-40cm handheld
ink-economy: n/a
---

# Large e-ink - typographer's wall

A 10-13in e-paper panel 16 grays 200-300 PPI renders type print quality and
holds it zero power. This one electronic surface rewards real typographic care:
set it like broadsheet page, hang like framed print, let it quietly be correct
all day.

## Physical truth

- 10.3in panels: **1872x1404, 227 PPI** (reMarkable 2 / Boox Note Air / Kobo
Elipsa class).
- 13.3in panels: **1600x1200 150 PPI** (ED133UT2 class); newer generation
**2200x1650 ~207 PPI**.
- Repurposed readers as wall dashboards: Kindle Paperwhite (2015 onward)
**300 PPI** - 1072x1448 (6in) 1236x1648 (6.8in) - print-grade type; older basic
Kindles **167 PPI, 600x800**. Kobo Clara line also 300 PPI.
- **16-level grayscale (4-bit)** typical: real anti-aliasing, real halftones.
- Full refresh flashes (~1-3s); partial refresh quick but ghosts accumulate
until full refresh clears them. Reflective; zero-power image hold.
- Remote dashboards may be **pull-fed**: renderer updates server state now, but
panel displays it on next device wake, playlist slot, or refresh cadence.

## Fidelity budget

Rich in resolution, gray nuance, persistence; starved color and motion.
Unusually electronic surface, budget surplus *typographic*: at 227-300 PPI you
can spend on optical size, real hierarchy, dense but readable tables. Because
image persists without power, freshness is editorial constraint, not UI chrome.

## What it's good for

- Wall calendars, family dashboards, shop status boards, longform daily briefings.
- Quiet dashboards in spaces where glowing LCD wrong.
- Typography-first artifacts: poem, schedule, menu, scorecard, paper replacement.

## Failure modes

- **Ghost accumulation**: partial updates without scheduled full refreshes leave
yesterday's layout haunting today's.
- **Layout shift between updates** - every change flashes; static chrome must be
pixel-identical across renders.
- **Color habits**: hue-coded categories collapse in grayscale; re-encode weight,
value steps (use 16 levels deliberately), position.
- **Kiosk font fallback**: web fonts fail to load on rooted reader's browser and
destroy entire point surface - embed or pre-install.
- **Viewport mis-scaling** on reader browsers: set explicit viewport design exact
device pixels.
- **Dead battery, confident data**: unpowered panel keeps displaying - as-of
stamp only defense.
- **Refresh cadence ignored**: dashboards pulling every few minutes cannot
honestly carry live, countdown, or just-happened language.

## Typography minimums

- Handheld (30-40cm): book rules apply - body 10-12pt equivalent (~42-50px
300 PPI), anything printed page can do.
- Wall 1-3m: walk-up body >=5mm cap height (**59px 300 PPI, 45px 227, 30px
150**); across-room headline >=10mm (double those).
- Hairlines render 1px 227 PPI up - rare mono surface 0.5pt-equivalent rules safe.
- Real faces: text serifs, optical sizes, true small caps. Line length 45-75
characters. surface deserves `references/typography-and-size.md` full treatment.

## Native idioms

- Broadsheet vocabulary: drop caps, small-caps labels, hanging indents, thin
rules, generous margins (e-ink white slightly gray; whitespace reads paper).
- Grayscale halftone images: error-diffusion dither 227+ PPI, ordered dither
150 PPI.
- Value-step hierarchy: 16 grays = real tonal scale; use 3-4 deliberate steps.
- full refresh page-turn moment: schedule on update cadence, not randomly.
- As-of timestamp set like folio line - present, quiet, typeset.
- Refresh cadence as editorial constraint: select claims still useful if they
arrive minutes late.

## Required-if-unknown

- "What hardware: rooted Kindle/Kobo (which model?), bare panel driver board,
commercial e-ink display (TRMNL-class)?"
- "Delivery: kiosk browser on device, image push (PNG via script or screensaver
swap), BYOS/device-pull, or vendor cloud?"
- "Update cadence - minutes, hourly, daily? (decides ghost-management and
freshness language)"
- "Mounted landscape or portrait, orientation fixed?"

## Rendering target

Fixed-pixel HTML at exact device pixels. image push, render -> 8-bit grayscale
PNG (device quantizes 16 levels):

```css
@page { size: 1872px 1404px; margin: 0 } /* match panel exactly */
html, body { width: 1872px; height: 1404px; margin: 0 }
/* fonts: @font-face with local/woff2 embedded - never network-dependent */
```

For kiosk delivery: static page at device CSS pixels, no animation, meta refresh
on cadence. Force full refresh every push (image-push does inherently; FBInk
screensaver-swap methods flash by default). See `connectors/`.

## Proofing

Posterize render 16 gray levels inspect 100%: type still smooth, tonal steps
still distinct after quantization. Diff consecutive renders - static chrome
pixel-identical. wall mounts, view at ~25% size to simulate 3m. Read type
closely: if it doesn't look like print, surface being wasted.
`references/proofing.md`.
