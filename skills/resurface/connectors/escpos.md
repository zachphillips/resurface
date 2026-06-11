# Connector: ESC/POS thermal printers

Delivers raster output to receipt and kitchen printers speaking ESC/POS (Epson,
Star-compatible, and most no-name USB/network thermal printers).

## Detect

- USB: `lpinfo -v 2>/dev/null | grep -i usb` or `ls /dev/usb/lp*` (Linux),
  `lpstat -p` if it's already a CUPS queue (then prefer `connectors/cups.md`).
- Network: most listen on TCP 9100 (`nc -z <ip> 9100`).
- Ask the user for make/model once and record it in the decision record — dot
  width (384 vs 576) depends on it.

## Deliver

Recommended path: render HTML at exact dot width → rasterize → 1-bit → ESC/POS
raster command → device.

```bash
# 1. Rasterize the rendered HTML at true dot width (58mm → 384px)
chromium --headless --screenshot=strip.png --window-size=384,4000 \
  --default-background-color=FFFFFFFF --hide-scrollbars out/thermal-receipt/strip.html

# 2. Trim and threshold to 1-bit
magick strip.png -trim -threshold 60% -depth 1 strip-mono.png
```

Then encode and send. The `python-escpos` library handles raster encoding, cut,
and transport in a few lines:

```python
from escpos.printer import Network, Usb
p = Network("192.168.1.87")          # or Usb(0x04b8, 0x0e28)
p.image("strip-mono.png", impl="bitImageRaster")
p.cut()
```

Raw fallback with no dependencies (printer at 9100, image already 1-bit):
`GS v 0` raster — see python-escpos source if you must hand-roll; prefer the
library.

## Quirks

- **Feed before cut**: issue ~3 lines of feed before `cut()` or the last rule
  lands under the blade.
- **Buffer small**: send long strips in one job; interleaved jobs from other
  processes will splice into yours mid-strip.
- **Threshold, don't dither, text strips**: dithering is for photos; text
  strips want a hard 55–65% threshold.
- **Star ≠ Epson**: Star printers want `impl="graphics"` or StarPRNT mode;
  if output is blank or garbage, that's the first thing to flip.

## Scheduling

ESC/POS + cron is the morning-briefing pattern: a scheduled agent renders the
strip, proofs it, and pushes it, so it's hanging off the printer when the user
walks past. Keep scheduled jobs idempotent — re-running must not print twice
(write a date-stamped marker file next to the output).
