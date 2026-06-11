---
surface: screen-phone
class: screen
canvas: 360–430 CSS px wide × ~700–950 tall, portrait, DPR 2–3 (~400–460 PPI physical)
color: full
interaction: touch
refresh: instant
segmentation: card/screenful
viewing-distance: 25–35cm
ink-economy: n/a
---

# Phone — the ten-second glance in the hand

A phone is not a small desktop browser; it is a touch surface read in 10–30
second bursts, one-handed, between other things. The failure mode is the
endless scroll of a squeezed desktop page. The native form is the card stack:
one screenful, one unit of meaning, one decision.

## Physical truth

- Logical widths: **360px** (Android baseline), **390–393px** (iPhone),
  **430px** (Max phones). Design at 360; let larger sizes breathe.
- DPR 2–3: hairlines and small type render crisply — resolution is not the
  constraint, area and attention are.
- Safe-area insets: notch/Dynamic Island top (up to ~59px), home indicator
  bottom (~34px) — respect `env(safe-area-inset-*)`.
- Touch targets ≥**44×44 CSS px** (Apple HIG; Material says 48dp). Nothing
  tappable smaller.
- Thumb reach, one-handed: bottom half easy; top third a stretch; opposite top
  corner hostile. Primary actions live at the bottom.
- Browser chrome and keyboards eat viewport: use `svh`/`dvh`, never bare `vh`.

## Fidelity budget

Rich in color, resolution, interactivity, and immediacy — it is in the user's
hand seconds after a notification. Starved of area and attention. The unique
spendables: **interaction** (T2/T3 content can live behind a tap instead of
being cut) and **audio** (the phone can read the artifact aloud — listenability
is a real channel for eyes-busy contexts).

## What it's good at

Review-on-the-go loops (approve / skip / edit), briefings as swipeable cards,
notification-paired artifacts, capture in the moment, anything decided in a
queue or on a couch.

## Failure modes

- **The endless scroll**: an undifferentiated column with no segmentation —
  responsive reflow posing as design.
- Tap targets under 44px; actions parked in the unreachable top corner.
- Hover-dependent affordances — there is no hover.
- Inputs under 16px font-size (iOS auto-zooms the viewport).
- Content under the notch or home indicator.
- `100vh` layouts jumping when browser chrome collapses.

## Typography minimums

- Body **16–17px** (16px is also the iOS no-zoom floor); secondary 13–14px;
  absolute floor 12px.
- Glance numerals 34–48px for stat cards.
- Line length at 360px and 16px body ≈ 38–45 characters — naturally right;
  never multi-column.
- System font stacks render best and cost nothing to load.

## Native idioms

- **Card stack**: one card = one screenful = one unit of meaning; swipe or
  scroll-snap between cards; a position indicator (2/7).
- **Tap-to-expand**: T1 on the card face, T2 behind a disclosure tap, T3 a
  link out. Never delete what a tap could keep.
- Bottom action bar in thumb reach; destructive actions out of the easy zone.
- Sticky one-line verdict header: the whole artifact's conclusion survives any
  scroll position.
- **Listen-instead-of-read**: when the use context is eyes-busy (walking,
  driving, cooking), write T1 copy that reads aloud well — front-loaded
  verdicts, no table-shaped prose — and offer TTS as the primary channel.
- Pull-to-refresh for live-data artifacts.

## Required-if-unknown

- "Delivery: a URL opened in the browser, a PWA pinned to the home screen, or
  a message/notification payload?"
- "Used one-handed on the move, or seated and focused? (decides density and
  reach planning)"
- "Should T3 content link out, collapse behind taps, or be dropped entirely?"

## Rendering target

Mobile-first HTML over HTTPS (service workers and TTS APIs require a secure
context):

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
```css
:root { font-size: 16px }
body { margin: 0;
       padding: env(safe-area-inset-top) env(safe-area-inset-right)
                env(safe-area-inset-bottom) env(safe-area-inset-left) }
section.card { min-height: 100svh; scroll-snap-align: start }
```

## Proofing

Screenshot at 360×800 @2x and 393×852 @3x in device emulation: no horizontal
scroll, nothing under the insets, every tap target ≥44px (overlay a 44px grid),
inputs ≥16px. Then the un-emulatable test: open it on a real phone with one
hand — emulators don't have thumbs. If TTS is offered, listen to the T1 read
end-to-end once. `references/proofing.md`.
