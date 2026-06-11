# Connector: TRMNL e-ink

Delivers to TRMNL devices (usetrmnl.com) — the standard unit is a 7.5" 800×480
1-bit e-ink panel that deep-sleeps and **polls** its server on a refresh
interval. Nothing here is push-instant: you push to the server; the panel shows
it at its next wake. Design and schedule around that latency, not against it.

## Detect

No local discovery — it's a cloud (or BYOS) device. Collect once and record in
the decision record:

- The device's **refresh interval** (set in the TRMNL dashboard) — this is your
  real delivery latency and the ceiling on useful push frequency.
- Panel model and pixel dimensions. The OG device is 800×480 1-bit; newer
  models differ — *verify on setup* in the dashboard rather than assuming.
- Cloud or BYOS? Changes the Deliver path below entirely.

## Deliver

**A. Private plugin, webhook strategy — push data, TRMNL renders.**
Create a private plugin with strategy "Webhook", write its markup in TRMNL's
Liquid templating, then POST merge variables to the plugin's UUID endpoint:

```bash
curl "https://trmnl.com/api/custom_plugins/<PLUGIN_SETTINGS_UUID>" \
  -H "Content-Type: application/json" \
  -d '{"merge_variables": {"events": [{"t": "09:00", "title": "Standup"}]}}'
```

Limits are plan-dependent (verify on setup): roughly 2KB per payload and 12
requests/hour standard, 5KB and 30/hour on TRMNL+; excess gets a 429. 2KB is
small — send pre-triaged display strings, not raw data; triage happens before
the wire (`references/content-triage.md`). For incremental updates,
`"merge_strategy": "deep_merge"` patches nested keys, and
`"merge_strategy": "stream"` with `"stream_limit": N` appends to arrays and
drops the oldest entries.

**B. Image push — you render, proof, and ship exact pixels.**
When the layout matters more than the plumbing, render an exact 800×480 1-bit
PNG, proof it (`references/proofing.md`), and POST it to TRMNL's Webhook Image
plugin so the panel shows it verbatim. The plugin exists and is in active use;
its exact payload contract has shifted over time — *verify on setup* at
help.trmnl.com before wiring a scheduler to it.

**C. BYOS — self-hosted server, total control.**
Run your own server (official `usetrmnl/byos_hanami`; community Laravel, Rust,
Go implementations exist) and point the device at it. The contract: the device
wakes, calls `GET /api/display` with telemetry headers (battery, Wi-Fi,
firmware, dimensions); your server responds with JSON pointing at an 800×480
1-bit PNG plus a `refresh_rate`; the device fetches the image, displays it, and
sleeps that many seconds. No payload caps, no rate limits, your renderer — this
is the path when resurface's own render/proof loop should own the pixels.

## Quirks

- **1-bit means 1-bit.** Grayscale in your own CSS will band or mud on the
  panel. Route gray semantics through mono idioms
  (`references/ink-color-and-dither.md`); if using strategy A, prefer TRMNL's
  framework classes, which dither known grays deliberately.
- **Do the interval math.** A device refreshing every 30 minutes makes more
  than 2 pushes/hour pure waste — and the standard plan's rate limit agrees.
- **Battery trades against freshness.** Every wake costs charge. Match the
  refresh interval to the content's real cadence (a calendar changes hourly,
  not minutely), and say so in the decision record.
- **Iterating feels slow** unless you force-refresh the device from the
  dashboard; do that while proofing, not by shortening the interval.

## Scheduling

cron + webhook is the natural pattern: re-render on the content's cadence, push
once, let the device pick it up on its next wake. Pace pushes at least 5
minutes apart, back off on 429, and skip the push entirely when the rendered
output hasn't changed — hash it and compare. On BYOS, invert: the scheduler
just re-renders into the directory the server serves; the device pulls.
