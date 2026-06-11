# Proofing at true fidelity

The proof step is what separates resurface from "export as PDF and hope." You
rasterize the artifact exactly as the device will render it — same pixels, same
bit depth — and you look at the image yourself before anything ships.

## The rule

**Proof at device fidelity, inspect visually, fix, re-proof.** Never deliver on
the first render. For physical output, print/flash exactly one before a batch.

## Rasterizing

Headless Chromium is the universal rasterizer. Size the window to the surface's
true pixel dimensions (from the profile):

```bash
# Screen-class and e-ink surfaces: exact device pixels
chromium --headless --screenshot=proof.png --window-size=800,480 \
  --hide-scrollbars out/eink-small/panel.html

# Paper: print to PDF, then rasterize a page at the device's DPI
chromium --headless --print-to-pdf=proof.pdf out/paper-letter/sheet.html
magick -density 150 proof.pdf[0] proof.png
```

Then degrade to the surface's real color depth:

```bash
magick proof.png -threshold 60% -depth 1 proof-mono.png        # thermal: hard threshold
magick proof.png -colorspace Gray -ordered-dither o4x4,4 proof-eink.png   # 4-level e-ink
magick proof.png -colorspace Gray proof-gray.png               # grayscale panels
```

If `magick` is unavailable: `python3 -c "from PIL import Image; ..."` (Pillow's
`convert("1")` does threshold; `quantize()` does levels).

## Inspecting

Read the proof image with your own eyes (load the PNG). Walk the profile's
**Failure modes** section as a checklist. Universal checks on top of those:

- **Edges**: nothing clipped at canvas edges, margins, bezels, or perforations.
- **Smallest text**: find the smallest type on the proof; is it readable at the
  surface's viewing distance? (At 2× intended distance on your render ≈ squint
  test.)
- **Line breaks**: no orphaned words, no breaks that split a unit of meaning —
  a chord from its lyric, a value from its label.
- **Contrast survivors**: after depth reduction, is every distinction the design
  relies on still visible? Gray that mattered must have become weight, size, or
  position.
- **Segmentation**: lay segment proofs side by side; check nothing meaningful
  straddles a tear, fold, or card boundary.
- **QR codes**: scan from the proof raster itself (e.g. `zbarimg proof-mono.png`)
  — if it doesn't scan from the degraded raster, it won't scan from paper.

## Iterating

Fix at the decision level when the failure is editorial (too much content for the
budget → re-triage), at the render level when it's mechanical (wrap point, rule
weight). Update the decision record if a decision changed — the record and the
artifact must never disagree.

## Physical one-proof

Before a batch print or a wall-mounted deploy: produce exactly one physical unit,
have the user confirm or photograph it, then run the batch. Hardware always has
one more opinion than the simulator.
