# Connector: OpenEPaperLink e-paper tags

Delivers to OpenEPaperLink (OEPL) fleets: an ESP32-based access point with a
radio manages battery-powered electronic shelf labels — the small e-paper tags
from retail, repurposed. You POST an image to the AP over HTTP; the AP transfers
it to the tag at the tag's next radio check-in. Small canvases, year-scale
batteries, minute-scale latency.

## Detect

- Find the AP's web UI at its LAN IP. It lists every paired tag with MAC,
  display model, native resolution, color variant, and battery level — that
  page is the ground truth; record per-tag facts in the decision record.
- Common tag canvases: 1.54" 152×152, 2.9" 296×128, 4.2" 400×300, plus larger
  wide formats (e.g. a 4.3" 522×152 BWR). Vendor batches vary — **verify the
  exact pixel dimensions in the AP UI before designing**, never from a model
  number.
- Color variants: BW (mono), BWR (black/white/red), BWY (black/white/yellow).
  The third color is a spot ink, not a tint — see
  `references/ink-color-and-dither.md`.

## Deliver

Render at the tag's exact native resolution, proof at 1-bit-plus-spot fidelity
(`references/proofing.md`), then POST multipart to the AP:

```bash
curl -X POST "http://<ap-ip>/imgupload" \
  -F "mac=00000197E5CB3B38" \
  -F "dither=0" \
  -F "file=@out/esl-2in9/tag.jpg"
```

- `mac` — from the AP UI; the 8-byte zero-padded form is safest (6-byte also
  accepted).
- `dither=0` for text and UI (the AP hard-maps colors to the panel palette);
  `dither=1` for photos and gradients. For full control, quantize the image
  yourself to the tag's exact palette (white/black, or white/black/red) and
  send with `dither=0` so the AP changes nothing.
- The reference tooling uploads JPEG at maximum quality; the AP quantizes to
  the panel palette on its side. Field name `file` — *verify on setup* against
  your firmware's wiki, the API has evolved.

Latency is two-stage: the tag checks in on a ~40-second-or-longer cadence
(worse with weak RF, or when the AP tells tags to back off), then the panel
itself refreshes — a full BWR refresh is tens of seconds of flashing. Budget
"within a couple of minutes," never "now."

## Quirks

- **Exact pixels or bust.** Send precisely the native resolution; whether a
  mismatched image is scaled or rejected depends on firmware — don't find out
  in production. Rotation is yours too: tags get mounted any way up, so rotate
  the raster before upload.
- **Red costs time and battery.** Three-color refreshes are much slower than
  mono; reserve BWR tags for content that earns the accent.
- **Battery is the real budget.** A coin-cell tag updated a few times a day
  lasts years; one updated every check-in lasts weeks. Hash the rendered image
  and skip pushes when nothing changed — this is mandatory, not an
  optimization. E-paper panels also have finite refresh cycles.
- **One tag, one meaning.** A fleet is a segmented surface (judgment rule 7):
  each tag gets a coherent unit — one metric, one room, one person's day —
  never a fragment of a larger layout that no one can reassemble at a glance.

## Scheduling

cron with change-detection: render → compare hash against the last-pushed image
→ POST only on difference. Schedule at the content's cadence, not the cron
habit of `* * * * *` — every push spends tag battery and panel life. For
fleet-wide updates, stagger pushes a few seconds apart so the AP's transfer
queue and radio airtime aren't saturated all at once.
