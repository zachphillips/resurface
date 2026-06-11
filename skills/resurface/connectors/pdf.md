# Connector: PDF

Delivers a paged artifact as a PDF — for email, archive, AirPrint from a phone,
or hand-off to a print shop — and produces the spool file for `connectors/cups.md`.
A PDF is a measurement-bearing format: 1pt = 1/72in, so a correct PDF *is* the
physical page, and a wrong one silently lies about it. Verify, don't trust.

## Detect

Nothing to discover on the wire; you need a renderer and an inspector locally:

- Renderer: `chromium --version` (or `google-chrome`, or on macOS
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`).
- Inspector: `pdfinfo` from poppler (`brew install poppler` /
  `apt install poppler-utils`).

## Deliver

Page geometry lives in the document's print CSS, not in CLI flags:

```css
@page { size: 8.5in 11in; margin: 0.5in }   /* or: size: A4; size: 3in 5in */
```

```bash
chromium --headless --print-to-pdf=out/paper-letter/sheet.pdf \
  --no-pdf-header-footer out/paper-letter/sheet.html
```

Then verify both facts a PDF can lie about:

```bash
pdfinfo out/paper-letter/sheet.pdf
# Pages:      1            ← must match the segmentation plan
# Page size:  612 x 792 pts ← 612×792 = Letter; 216×360 = 3×5in; 595×842 = A4
```

Page size wrong → your `@page` rule lost to a default; check it isn't trapped
in a screen-only stylesheet. Page count wrong → content overflowed onto a page
nobody decided to have. A two-page render of a lyrics sheet whose intent says
"no page turns" is a failed render, not a delivery detail — go back to triage.

**End product vs intermediate.** PDF is the *end product* when the surface is
someone else's printer or a reading device you don't control: email it, AirPrint
it, send it to the shop. Chromium embeds fonts automatically, so the file is
portable. PDF is an *intermediate* when you control the hardware: spool it via
`connectors/cups.md`, or rasterize a page for proofing
(`magick -density 150 sheet.pdf[0] proof.png`, see `references/proofing.md`).
Never route PDF toward thermal or e-ink surfaces — those are raster paths.

## Quirks

- **Print media type applies.** `--print-to-pdf` renders with `@media print`;
  screen-only styles vanish and `display: none` print rules kick in. Proof the
  PDF, not the browser view.
- **Header/footer flag spelling** changed across Chromium versions:
  `--no-pdf-header-footer` is current; very old builds want
  `--print-to-pdf-no-header`. Either way, the default datestamp-and-URL footer
  must not ship.
- **Late-drawing pages**: content rendered by JS after load needs
  `--virtual-time-budget=5000` or it prints half-finished.
- **Hairlines**: rules below ~0.5pt can render in the PDF viewer yet drop on a
  printer. Match the minimum rule weight from the surface profile.
- **Color space**: Chromium emits RGB. A print shop that demands CMYK needs a
  real conversion step (Ghostscript or the shop's prepress) — flag it, don't
  pretend the RGB file is CMYK.

## Scheduling

Date-stamp the filename (`briefing-2026-06-11.pdf`): scheduled re-renders become
idempotent and the archive sorts itself. For email delivery, pair the cron
render with whatever mailer the host has; attach the PDF, never inline-render
it. Keep `.resurface/out/` as the single source so a scheduled render and a
manual one can never diverge.
