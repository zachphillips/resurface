# Writing a connector

A connector is the delivery half of resurface: it takes a proofed,
surface-native artifact from `.resurface/out/<surface>/` and gets it onto the
physical device. Surface profiles hold the design truth; connectors hold the
plumbing truth — discovery, transport, encodings, and the device's bad habits.

The reference example is
[`skills/resurface/connectors/escpos.md`](../skills/resurface/connectors/escpos.md).
Read it before writing your own; every connector uses its four-section shape.

## The structure

**Detect.** How the agent finds the device from a shell: the `lpinfo` line,
the TCP port to probe, the USB vendor/product IDs, the mDNS service name. End
with what to ask the user once and record in the decision record (make/model,
queue name, IP) — detection should never be re-derived on every run.

**Deliver.** The happy path, as runnable commands and minimal code. Prefer the
boring, widely packaged tool (`lp`, `python-escpos`, `curl`) over a bespoke
script. Show the full chain from rendered artifact to device, including any
rasterize/threshold steps, so the agent can execute it top to bottom. Give a
no-dependency fallback if one exists, and say when to prefer it.

**Quirks.** The device's bad habits, one bold-led bullet each, with the fix:
feed-before-cut, buffer splicing, Star-vs-Epson raster modes. This section is
earned on real hardware — it's the part nobody can write from a datasheet.

**Scheduling.** How the connector composes with cron or a scheduled agent, and
the idempotency mechanism (typically a date-stamped marker file next to the
output). If the device sleeps, queues, or rate-limits, say what a 6:45am
unattended run needs to know.

## Principles

1. **Idempotent by construction.** A scheduled job that re-runs must not print
   twice, flash twice, or email twice. Write a marker file
   (`delivered.<date>`) next to the artifact and check it first. Cron retries;
   your connector must not care.
2. **One proof before any batch.** The connector inherits the discipline from
   [`references/proofing.md`](../skills/resurface/references/proofing.md):
   deliver exactly one physical unit, get confirmation (or a photograph), then
   run the batch. Build this into your Deliver section, not into a footnote.
3. **Never silently rescale.** The artifact arrives at exact device
   dimensions because the surface profile and the proof guaranteed it. If the
   transport wants to "fit to page" or the driver wants to scale 384→376 dots,
   turn that off and document the flag. A connector that resizes is destroying
   work the proof step already validated.
4. **Fail loudly, fail early.** Check reachability before encoding. A
   half-printed strip from a dropped connection is worse than an error message
   at 6:45.

## Testing against real hardware

Run this checklist before opening a PR, on the actual device:

- [ ] **Cold detect** — the Detect commands find the device on a machine that
  has never seen it.
- [ ] **Known-good artifact** — deliver a proof from an existing example
  (e.g. a 384-dot strip) and confirm output matches the proof raster 1:1.
- [ ] **Dimensions on device** — measure the physical output. No scaling, no
  clipped edges, margins as the surface profile predicts.
- [ ] **Long job** — a deliberately long artifact survives intact (buffers,
  timeouts, roll length).
- [ ] **Interleaving** — a second job sent mid-delivery doesn't splice in.
- [ ] **Idempotency** — run the delivery twice; the second run is a no-op
  with a clear message.
- [ ] **Unattended run** — the full chain (render → proof → deliver) from
  cron, with the machine's normal PATH, no display, nobody watching.
- [ ] **Photograph it** — the physical output, in the PR. This is the gold
  standard attachment (see [CONTRIBUTING.md](../CONTRIBUTING.md)).

## Wanted connectors

Connectors we'd merge tomorrow, each a real transport with real quirks:

- **AirPrint / IPP** — driverless delivery to most modern printers;
  `ipptool` is the probe, media-size negotiation is the quirk minefield.
- **Brother QL label printers** — `brother_ql` speaks the raster protocol;
  endless-tape vs die-cut label handling is the interesting part.
- **Dot-matrix (ESC/P)** — tractor-feed continuous paper is a glorious
  segmentation story, and the 9-pin fidelity budget is brutally honest.
- **Vestaboard** — split-flap characters via local or cloud API; 6 rows ×
  22 columns is the smallest editorial budget in the library.
- **Departure-board LED matrices** — HUB75 panels and flip-dot boards;
  scrolling is a refresh idiom, not a layout cop-out.
- **E-mail digest** — the humblest surface; delivery is trivial, the quirk
  list (client CSS mangling) is anything but.

A connector PR pairs naturally with a surface profile PR when the device is
both — a Vestaboard needs its
[surface truth](writing-a-surface.md) *and* its transport.

## Where it goes

One file per transport at `skills/resurface/connectors/<name>.md`, named for
the protocol or service, not the artifact: `escpos.md`, `ipp.md`,
`brother-ql.md`, `vestaboard.md`. Keep it executable — an agent should be
able to deliver by reading top to bottom and running what it sees.
