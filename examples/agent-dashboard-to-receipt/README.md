# Agent dashboard → thermal receipt

A four-project coding-agent dashboard, re-edited into a 384-dot monochrome
strip that's hanging off the printer by the kettle at 06:45.

## The situation

Foundry is a web dashboard where four coding agents report overnight work:
done tasks with green check pills, running tasks with spinners, and
**proposed-next tasks in gray** — work the agents want permission to start.
The owner's morning ritual is one decision: greenlight or block. They asked
for the board on the receipt printer, so the ritual happens standing at the
kettle with a pen, not behind a laptop lid.

A 58 mm thermal printer is a brutal target: 384 dots wide, one bit deep, no
gray, no color, hairlines vanish, small glyphs smear. Which is exactly why
this example exists — almost nothing from the web design survives literally.
Everything meaningful survives *translated*.

## The idiom translations

This is the core of the decision record
([`decisions/thermal-receipt.md`](decisions/thermal-receipt.md)) — each web
idiom re-decided against hardware truth from the
[thermal profile](../../skills/resurface/surfaces/thermal-receipt.md):

| Web | Strip |
|---|---|
| Gray "proposed" text | **Indent + bold `?` prefix** under `NEXT — YOUR CALL` — gray doesn't exist, so subordination becomes position, interrogation becomes punctuation |
| Checked checkboxes | **2-dot strikethroughs** — a 12-dot ballot glyph blooms into a smudge; a strike stays readable *and* finished |
| Done/next zones by color | **6-dot heavy rule** between them — the eye finds the decision zone before reading |
| Card headers | **Inverted black bands** — solid black costs nothing on thermal; it's the native section idiom |
| Red "stalled" badge | **`! STALLED` inverted chip** + `blocked on S3 perms — needs you` |
| 2×2 card grid | **Tear-mark segmentation** — each project tears off as its own strip; bold dashes because the tear bar is manual (asked, answered, recorded) |
| Links and charts | **One QR code** (116 dots, 4 dots/module) in its own tear-off footer → the live board |

Content gets the same treatment as form. Dashboard prose is T2 — condensed
to ≤26-character lines in the owner's commit-message voice, numbers kept,
prose dropped behind the QR:

> **Web:** "Implemented idempotency keys on the refunds endpoint so retried
> webhooks can't double-refund (PR #412, merged 02:14)"
> **Strip:** ~~refund idempotency keys~~ ~~#412~~

And the batched questions, asked once and recorded forever:

> **Q1.** Roll width: *(a) 58 mm → 384 dots (b) 80 mm → 576 dots?* **A: (a)**
> **Q2.** Cutter: *(a) auto-cutter (b) manual tear bar?* **A: (b)** — tear
> marks rendered bolder, 22-dot clearance.
> **Q3.** Proposed-next items: *(a) print all (b) only stale (c) cap at 3?*
> **A: (a)** — "if an agent proposed it, I want to rule on it."

## The artifact

[`out/thermal-receipt/fleet-strip.html`](out/thermal-receipt/fleet-strip.html)
— exactly 384 px wide (1 px = 1 printer dot), IBM Plex Mono, pure black on
white. Six tear-complete segments: masthead, four projects, QR footer.
1,790 dots ≈ 22 cm of paper. The QR is a real code — it encodes
`https://foundry.internal/fleet`.

## Try it

Proof it at the printer's true fidelity, the way the agent did:

```bash
chromium --headless --screenshot=strip.png --window-size=384,3000 \
  --default-background-color=FFFFFFFF --hide-scrollbars \
  out/thermal-receipt/fleet-strip.html
magick strip.png -trim -threshold 60% -depth 1 strip-mono.png
# view at 200% — thermal bloom ≈ 1-dot dilation; check the QR scans:
zbarimg strip-mono.png
```

Print it for real with a few lines of `python-escpos`
(see [`connectors/escpos.md`](../../skills/resurface/connectors/escpos.md)):

```python
from escpos.printer import Network
p = Network("192.168.1.87")
p.image("strip-mono.png", impl="bitImageRaster")
p.cut()
```

Or run it live: point the agent at any status page or task board and say
*"print this on the receipt printer every morning — each project should tear
off as its own strip."*
