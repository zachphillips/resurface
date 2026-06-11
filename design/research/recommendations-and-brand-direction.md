# ReSurface Research And Brand Direction

Scope: this is brand, reference, and marketing-page direction only. It intentionally does not specify the implementation architecture of the framework.

## Open-Source Projects To Study

### Strong print and paged-media references

- [Paged.js](https://github.com/pagedjs/pagedjs)
  - Take: the seriousness about paged media, CSS print vocabulary, browser-based print preview, page fragmentation language, and extensible hook mindset.
  - Do not simply copy: the project is about paginating web content; ReSurface is about deciding what content and form should survive when a surface changes.

- [Vivliostyle](https://github.com/vivliostyle/vivliostyle.js)
  - Take: the browser-native publishing posture and the idea that web technology can produce publication-quality output.
  - Brand lesson: this category can look scholarly and credible without feeling like a generic SaaS dashboard.

- [WeasyPrint](https://github.com/Kozea/WeasyPrint)
  - Take: confidence around HTML/CSS becoming real paper artifacts, especially in docs and examples.
  - Brand lesson: "document factory" language is useful, but ReSurface should feel more adaptive and agent-native.

- [Typst](https://github.com/typst/typst)
  - Take: the clean mental model of modern typesetting, excellent documentation tone, and the way constraints become a productive authoring surface.
  - Brand lesson: technical projects can feel precise, beautiful, and open-source-native at the same time.

- [react-pdf](https://github.com/diegomura/react-pdf)
  - Take: the idea that developers want a familiar authoring model for fixed-format documents.
  - Brand lesson: show examples that feel concrete and printable, not abstract.

### Surface/device/output references

- [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror)
  - Take: the community/plugin energy around ambient dashboards and weird personal displays.
  - Brand lesson: ReSurface should welcome hobbyist surfaces, old screens, wall dashboards, and personal automations.

- [OpenEPaperLink](https://github.com/OpenEPaperLink/OpenEPaperLink)
  - Take: real e-paper constraint language: tiny canvases, limited color, slow refresh, hardware-specific output.
  - Brand lesson: e-ink is not just "small screen"; it is a different design material.

- [node-escpos](https://github.com/lsongdev/node-escpos)
  - Take: receipt-printer and thermal-printer vocabulary, especially the low-level constraints that make printed output feel native.
  - Brand lesson: thermal output should be a first-class hero, not a novelty demo.

### Renderer and hostile-surface references

- [Satori](https://github.com/vercel/satori)
  - Take: the constrained-renderer mindset and the way a limited subset of layout can still produce polished, portable output.
  - Brand lesson: a surface can be powerful because it is constrained.

- [MJML](https://github.com/mjmlio/mjml)
  - Take: the posture of compiling intent into a hostile target surface, because responsive email is a good analogy for "not all output surfaces behave like the browser."
  - Brand lesson: the marketing can say "this is bigger than screen breakpoints" while still sounding grounded.

- [Puppeteer](https://github.com/puppeteer/puppeteer)
  - Take: visual verification culture, screenshots, PDFs, and repeatable browser output examples.
  - Brand lesson: show the output, not just code.

## Brand Position

ReSurface is not "responsive design for more screen sizes." It is surface-aware publishing with editorial judgment. The emotional center is: the useful meaning of a thing should survive when it leaves the browser.

The brand should feel:

- Useful before magical.
- Exacting, but not sterile.
- Open-source and hackable, but visually mature.
- Tactile: paper, e-ink, thermal printers, labels, screens, and slides all count as real surfaces.
- Constraint-aware: monochrome, dimensions, touch capability, refresh rate, writeability, perforation, ink cost, and viewing distance are design materials.

Avoid:

- Generic AI glow, purple gradients, floating blobs, and abstract "transformation" shapes.
- Hero sections that show only code.
- Treating paper as a nostalgia prop.
- Treating e-ink and thermal print as jokes.
- Overly whimsical printer imagery.

## Core Message

Primary line:

> Responsive beyond the viewport.

Other strong lines:

- Content that knows its surface.
- Choose the surface. Keep the meaning.
- Not smaller. Smarter.
- Constraints become design decisions.
- One design. Useful everywhere.
- Stop resizing. Start resurfacing.

The landing page should quickly show that ReSurface changes both layout and content. The page itself should become the demo: switching the chooser should visibly change format, density, typography, color, and what is emphasized.

## Visual Language

### Main Direction: Paper Specimen Utility

Use this as the primary identity lane.

- Backgrounds: paper white, warm off-white, very light gray.
- Ink: near-black charcoal, never pure gray-on-gray for body text.
- Accent: cobalt blue as the primary digital signal.
- Texture: very subtle paper fiber, dither, halftone, crop marks, perforation marks, QR registration squares.
- Layout: Swiss grid plus print-spec details. Dense when useful, never decorative density.
- Imagery: physical paper, labels, cards, receipts, e-ink devices, print previews, and the chooser control.

### Secondary Direction: Thermal / E-Ink Utility

Use this for examples, docs callouts, contributor badges, and launch graphics.

- Palette: black, white, two grays, e-paper red, occasional amber.
- Motifs: dither patterns, receipt widths, perforations, low-resolution UI glyphs, QR codes.
- Text treatment: bold labels, hard rules, dimension tags, capability tags.
- Mood: practical, field-tested, "it prints correctly."

### Supporting Direction: Editorial Technical Manual

Use this for README, documentation, and long-form explanation.

- Typography should feel like a technical manual from a serious design lab.
- Use rules, margins, captions, specimen tables, and paper-size diagrams.
- Keep examples concrete: 3x5 index card, 58mm receipt, 4x6 label, 800x480 e-ink, 8.5x11 letter, 16:9 slide.

### Community Direction: Open Hardware Lab

Use this for community pages and examples.

- Show real devices and hacked surfaces.
- Use sticker labels, QR codes, device tags, and simple iconography.
- Make it clear that weird personal surfaces are welcome.

## Logo Direction

Best direction: surface-stack monogram.

The mark should imply an `R` through nested surfaces lifting or resurfacing. It needs to work as:

- GitHub org avatar.
- README header mark.
- Receipt-printer monochrome mark.
- 16px favicon.
- Sticker on a 4x6 label.
- E-ink boot/loading mark.

Logo rules:

- Must work in one color.
- Must not depend on gradients.
- Must not use tiny interior details that disappear on receipt printers.
- Prefer squared geometry with slight optical correction.
- The wordmark should be calm, not futuristic.

Alternate logo directions worth keeping:

- Crop-mark cursor: best for the "agent chooses a surface" story.
- Receipt curl: best for thermal/print launch campaigns, weaker as the permanent mark.

## Surface Chooser Direction

The chooser is the signature UI element of the brand. Even on a static landing-page concept, it should be visible in the first viewport.

It should feel like a cross between a print dialog, device picker, and design-system control. Every surface option should show:

- Human name: Letter, Index Card, Receipt, Label, E-ink, Slide, Screen.
- Physical spec: 8.5x11, 3x5, 58mm, 4x6, 800x480, 16:9.
- Capability hints: color/mono, touch/no touch, writable, continuous roll, QR-friendly, slow refresh.

Interaction language:

- Selected surface changes the entire site skin, not just a preview box.
- Paper modes become more ink-aware.
- Thermal modes become monochrome and denser.
- E-ink modes become dithered, slower, calmer, and more contrast-driven.
- Slide mode becomes sparse and landscape.
- Mobile mode can reveal capability-specific actions like listen/play.

## Marketing Page Image System

Use real-feeling output examples:

- Daily schedule on a 4x6 label sticker.
- Lyrics fit for a guitarist on one letter page.
- Same lyrics split across index cards.
- Project agent dashboard printed on guest-check slips.
- Recipe condensed to a small fridge e-ink display.
- Proposal turned into a slide with notes.
- Long document turned into folded brochure panels.
- Dashboard turned into boarding-pass strips.

The image system should not show many tiny alternatives in one image. Each visual should make one surface feel native and desirable.

## Generated Assets

Generated and upscaled assets are in:

`/Users/whisperingwoods/Dev/resurface/design/research/brand-exploration`

Landing-page concepts:

- `01-landing-tactile-lab-index-card.png`
- `02-landing-eink-recipe-fridge.png`
- `03-landing-thermal-receipt-dashboard.png`
- `04-landing-shipping-label-sticker.png`
- `05-landing-boarding-pass-dashboard.png`
- `06-landing-letter-proposal.png`
- `07-landing-folded-brochure.png`
- `08-landing-mobile-review-cards.png`
- `09-landing-cli-index-preview.png`
- `10-landing-os-format-switcher.png`
- `11-landing-paper-specimen-wall.png`
- `12-landing-brutalist-print-shop.png`
- `13-landing-craftsman-software-desk.png`
- `14-landing-capability-matrix-eink.png`
- `15-landing-topographic-resurface.png`
- `16-landing-docs-print-preview.png`
- `17-landing-constraint-print-dialog.png`
- `18-landing-lyrics-letter-index.png`
- `19-landing-proposal-to-slide-deck.png`
- `20-landing-wall-tv-dashboard.png`
- `21-landing-rooted-kindle-dashboard.png`
- `22-landing-epaper-tag-dashboard.png`
- `23-landing-morning-sticker.png`
- `24-landing-transformation-timeline.png`
- `25-landing-newspaper-technical-announcement.png`
- `26-landing-agent-status-guest-checks.png`

Logo and kit concepts:

- `27-logo-surface-stack-monogram.png`
- `28-logo-crop-mark-cursor.png`
- `29-logo-receipt-curl.png`
- `30-brand-kit-paper-specimen-utility.png`
- `31-brand-kit-thermal-eink-utility.png`
- `32-brand-kit-editorial-technical-manual.png`
- `33-brand-kit-open-hardware-lab.png`

Representative dimensions verified after upscaling:

- Landing-page concepts: 3840 x 2160.
- Logo and brand-kit boards: 4096px wide, aspect ratio preserved.
