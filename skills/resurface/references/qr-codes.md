# QR codes — print's escape hatch

Paper cannot link, but it can carry a QR code (judgment rule 8). A QR is where
T3 content escapes to instead of dying, and where a static surface hands off to
a live one. It is also a piece of precision artwork that fails silently when
printed too small — so it gets sized in physical units and verified by actually
scanning the proof.

## What belongs in a QR — and what doesn't

**Belongs:** T3 overflow (the full document, the appendix, change history), the
live version's URL ("this dashboard, but current"), media the surface can't
carry (the audio rationale, a walkthrough video), machine-readable payloads
(calendar subscribe, Wi-Fi credentials).

**Doesn't:** anything T1. If the content must survive on this surface, it must
be readable *on this surface*, without a phone, a network, or a charged
battery. A QR is a door, and doors can be locked — never put the fire
instructions behind one. Same exclusion for anything needed while hands are
busy: nobody scans mid-recipe with wet hands.

## Sizing: two floors, both binding

A module (one QR "pixel") must clear both:

1. **Printer floor:** ≥4 printer dots per module — on thermal, prefer 6, since
   binary dots bloom (`surfaces/thermal-receipt.md`).
2. **Optical floor:** ≥0.4mm per module for a phone at close range.

By print class: at thermal 203 DPI, 4 dots ≈ 0.5mm, so the printer floor clears
the optical one — a version-1 code (21 modules) lands at ~96 dots square,
matching the thermal profile's minimum. At laser 600 DPI the printer floor is a
useless 0.17mm; the optical floor governs, so keep modules ≥10 printer dots
(≈0.42mm).

For scan-from-distance (posters, wall panels): overall symbol size ≈ expected
scan distance ÷ 10. A code scanned from 1m wants to be ~10cm square.

**Shorter data is bigger modules.** Every character pushes the symbol toward a
higher version (more, smaller modules at the same physical size). Use a short
redirect URL you control rather than a 90-character deep link; that's the
difference between a version-2 code that scans from a receipt and a version-7
code that doesn't. If your redirect host is case-insensitive, an
UPPERCASE-ONLY URL encodes in alphanumeric mode and packs ~30% tighter still.

## Error correction

Levels recover L 7% / M 15% / Q 25% / H 30% of damaged area — paid for in
density. Choose:

- **M — the default.** Honest margin for ordinary print defects.
- **H — when damage is expected:** stickers on gear, receipts that live in
  pockets, anything outdoors or handled daily.
- **L — never on print.** Print defects are the norm, not the exception; L is
  for pristine screens only.

H costs real density — if choosing H forces a higher version, shorten the URL
before shrinking the modules.

## The quiet zone

Four modules of clean white on all sides, minimum. No layout rules, borders, or
type intruding — the quiet zone is part of the symbol, not negotiable padding.
On dark or inverted areas, knock out a white plate first; a QR printed on a
black band without one is unscannable art.

## Generating

```bash
# qrencode: -s = pixels per module, -m = quiet zone in modules, -l = EC level
qrencode -o qr.png -s 8 -m 4 -l M 'https://r.example/k3'
```

```python
import segno
qr = segno.make('https://r.example/k3', error='m')
qr.save('qr.png', scale=8, border=4)
print(qr.version)   # watch this: version up = modules shrink at fixed size
```

Render the PNG at final physical size in the layout (real units: `width: 24mm`)
— never let CSS rescale it by an arbitrary factor; non-integer scaling smears
module edges.

## Verifying

Scan the **proof raster**, not the pretty source render — the degraded 1-bit
image at true device pixels is what the paper will look like
(`references/proofing.md`):

```bash
zbarimg proof-mono.png        # must print the decoded URL
```

(`pip install pyzbar` + Pillow as a fallback when zbar isn't installed.) If it
doesn't decode from the proof, it won't decode from paper — fix size, EC, or
quiet zone and re-proof. Then confirm once more on the single physical proof
with an actual phone before any batch.

## Placement

- **One QR per segment, maximum.** Two codes adjacent invite mis-scans and a
  decision the reader shouldn't have to make. If two destinations are needed,
  one QR to an index page.
- **Caption every code.** A naked QR is a mystery box; "Full proposal + appendix →"
  is an invitation. The caption is part of the escape hatch.
- Keep the symbol *and* its quiet zone clear of folds, perforations, and card
  edges; on receipts, place it just above the tear so it survives the tear
  (`surfaces/thermal-receipt.md`).
- Convention: bottom-right of the segment for left-to-right documents — the
  reader finishes, then leaves through the door.
