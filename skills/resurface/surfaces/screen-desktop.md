---
surface: screen-desktop
class: screen
canvas: 24–32in panels, 1920×1080–3840×2160 (~92–163 PPI), often multi-monitor
color: full
interaction: pointer + keyboard (hover, scroll, tabs, states)
refresh: instant
segmentation: none
viewing-distance: 50–70cm
ink-economy: n/a
---

# Desktop — the rich home surface artifacts leave behind

This is where most sources come *from*: full color, instant refresh, a pointer,
hover states, unbounded scroll. In resurface it is usually the capture side —
its profile exists mostly so the agent knows exactly which riches a departing
artifact silently loses, and must re-budget on arrival elsewhere.

## Physical truth

- Common panels: 24in 1080p (**92 PPI**), 27in 1440p (**109 PPI**), 27in 4K
  (**163 PPI**), 32in 4K (**138 PPI**). 4K usually runs 1.5–2× OS scaling, so
  logical workspace is ~1920×1080 to 2560×1440.
- Browser chrome eats ~80–120px of height; windows are not always maximized.
- Hover, tooltips, focus, scroll, tabs, filters, live data, sound, video — all
  present, all invisible in a screenshot.
- sRGB baseline; wide gamut common but unguaranteed.

## Fidelity budget

Rich in everything except guaranteed attention: area, color, resolution,
interaction, instant refresh. Nothing is scarce, which is exactly why artifacts
born here travel badly — they were designed with no budget discipline at all.
When capturing, the job is an inventory of spent riches; when targeting, the
job is multi-pane density done deliberately.

## What it's good at

As **capture side**: it holds the canonical, full-fidelity source. Capture rule —
open every hover, tab, filter, and expander state while writing `source.md`; a
content model built from one screenshot under-counts T2 badly.

As a **target**: side-by-side comparison, master–detail, full data tables,
pointer-precision work, long-form reading with real navigation.

## Failure modes

- **Designing on your own monitor**: the user may be at 92 PPI 1080p with a
  half-width window. Test at 1920×1080, DPR 1, unmaximized.
- Hover-only affordances — fine here, fatal on every other surface; avoid them
  in anything that will ever resurface.
- 100+ character line lengths in full-width text.
- Treating the screenshot as the source: hidden interaction states are content.

## Typography minimums

- Body 14–16px; dense data tables down to 12px at 50–70cm.
- Line length 60–75 characters; cap text columns (~65ch) even when the window
  is wide.
- Hairlines render at every common PPI; 1px rules are safe here and almost
  nowhere else in this library.

## Native idioms

Listed with their portability, because each one is a re-budgeting line item
when the artifact leaves:

- **Hover/tooltips** → must surface into visible text or drop (no other surface
  has them).
- **Links** → QR on print/thermal, spoken or dropped on audio-adjacent surfaces.
- **Unbounded scroll** → fixed canvases force triage, never truncation.
- **Live refresh** → static surfaces need an as-of stamp and an honest cadence.
- **24-bit color encodings** → weight/shape/position on mono and gray surfaces.
- **Tabs/filters/expanders** → each state is a separate artifact, or one state
  is chosen editorially.
- **Sound/video** → QR escape or drop.
- Native-and-staying idioms: multi-pane master–detail, sticky headers, keyboard
  shortcuts, dense sortable tables.

## Required-if-unknown

- "Target window: a full-screen dashboard, or a document living in a tab among
  many? (decides density and width ceiling)"
- "Smallest screen in play — 13in 1080p laptop or 27in+ desktop?"
- (When capturing) "Are there interaction states — hovers, tabs, filters — that
  carry content I haven't seen?"

## Rendering target

Plain HTML at 1× design density; honest content width rather than full-bleed
fluidity:

```css
:root { font-size: 16px }
main { max-width: 1320px; margin-inline: auto; padding: 24px }
/* dashboards: explicit grid, e.g. grid-template-columns: repeat(3, 1fr) */
```

No @page — this surface has no physical contract. Deliver as a URL or local
file; pair with `connectors/` kiosk setup only if it runs unattended.

## Proofing

Screenshot at 1920×1080 DPR 1 (the worst common case) and at 2560×1440: layout
holds, 14px text legible at 92 PPI, no line over ~75ch. If capturing rather
than targeting: walk every interactive state and confirm the content model in
`source.md` accounts for each. `references/proofing.md`.
