---
surface: eink-trmnl
class: eink
canvas: TRMNL OG/7.5in 800x480 1-bit (~124 PPI); TRMNL 10.3 1872x1404 grayscale; mini/baby class verify exact pixels
color: mono common; grayscale on 10.3 class
interaction: none on device; private-plugin/playlist controls in dashboard
refresh: slow device-pull (minutes; configured device/playlist cadence)
segmentation: playlist screen
viewing-distance: 30-80cm desk/counter OR 1-3m mounted
ink-economy: n/a
---

# TRMNL e-ink - pull-fed instrument

TRMNL not just small e-ink. device sleeps, wakes, pulls next playlist/plugin
screen, refreshes, sleeps again. Design instrument panel whose state may arrive
minutes late but must still be true.

## Physical truth

- OG / 7.5in class: **800x480, 1-bit black/white**, about 124 PPI. Default
proof target unless dashboard says otherwise.
- TRMNL 10.3 class: **1872x1404 grayscale**. Same delivery model, larger
typographic budget; verify actual grayscale before relying on subtle tones.
- Mini / baby class: smaller low-power panels. Exact pixels, color depth, safe
margins are setup facts, not assumptions.
- Device-pull delivery: webhook/API updates server state now; device sees it on
next wake, playlist slot, or configured refresh.
- Private-plugin webhook path uses `merge_variables`; image/BYOS paths can own
exact pixels. Playlist rotation means one physical device may show N views.
- Reflective, no assumed backlight. Last image can remain visible while battery
low, Wi-Fi down, server stale, or device asleep.

## Fidelity budget

7.5in rich in persistence and placement, poor in pixels, tone, immediacy,
interaction. 10.3 buys area and grayscale, not liveness. Spend budget on
complete, calm, timestamped screens that tolerate pull latency and sleep.

## What it's good for

- Ambient operational dashboards: queues, counts, status, next action.
- Rotating playlists where every view is complete but shares one masthead.
- Low-frequency high-trust facts: today's plan, active projects, weather,
calendar summary, device or room state.
- Counter, desk, hallway, appliance-adjacent displays where glance beats tap.

## Failure modes

- **Push-instant fantasy**: webhook accepts now, panel updates minutes later.
- **Stale confidence**: old image persists during sleep, low battery, Wi-Fi
loss, upstream failure. as-of stamp required.
- **Playlist dependence**: "continued", missing totals, or previous-screen
context fails because viewer may see only this screen.
- **Gray mud on OG**: CSS grays and anti-aliased small type collapse on 1-bit.
- **Battery-hostile churn**: unchanged frequent refreshes burn wake cycles and
add flash. hash output; skip unchanged pushes where possible.
- **Web-dashboard transplant**: tiny widgets and dense tables become texture.

## Typography minimums

- OG 800x480 1-bit: labels >=16px at desk distance; key numerals 36-56px;
mounted facts often need >=44px cap-height equivalents.
- Use hinted sans, bold weights, 2px+ rules, manual line breaks. No light
weights, thin hairlines, auto-wrapped labels.
- 10.3 grayscale can use print-like type, but wall reading still follows
physical cap-height math in `references/typography-and-size.md`.
- Masthead/status small but findable: owner/view, generated time, screen label.

## Native idioms

- Consistent masthead across playlist views: title, view label, owner/context,
generated/as-of time.
- Big-number-plus-label tiles, ruled panels, all-caps labels for 1-bit hierarchy.
- Repeat state per view: if total queue count matters, show it on each screen
that needs interpretation.
- Deck logic: same grid, timestamp position, terms; each view gets one job.
- `merge_variables` carry pre-triaged strings/counts, not raw app payload.
- Refresh cadence editorial constraint: claims must remain useful arriving late.

## Required-if-unknown

- "Which TRMNL class: OG/7.5in 800x480 1-bit, 10.3 1872x1404 grayscale,
mini/baby, or other dashboard-reported dimensions?"
- "Delivery: private-plugin webhook with `merge_variables`, image plugin, BYOS?"
- "Device/playlist refresh cadence: 5, 15, 30, 60 minutes, or custom?"
- "Standalone screen or playlist rotation? If rotation, what sibling views?"
- "Read distance: desk/counter 30-80cm, wall 1-3m, or both?"
- "Battery priority: preserve sleep cycles aggressively, or frequent active updates?"

## Rendering target

Exact-pixel path: fixed-size HTML or direct bitmap to dashboard canvas, then
1-bit PNG/PBM for OG or quantized grayscale for 10.3. Private-plugin path:
pre-edited `merge_variables` plus Liquid/HTML mapping to same fixed canvas.
See `connectors/trmnl.md`.

```css
@page { size: 800px 480px; margin: 0 }
html, body { width: 800px; height: 480px; margin: 0; -webkit-font-smoothing: none }
```

## Proofing

Proof real target: OG **800x480 1-bit**, 10.3 **1872x1404 grayscale**. Inspect
100% for broken type, lost rules, clipped labels, gray collapse; inspect 25-50%
for mounted glance value. Verify each playlist view alone: masthead, as-of time,
no dependency on adjacent views. Diff consecutive renders so static chrome stays
pixel-identical and unchanged screens can skip delivery. `references/proofing.md`.
