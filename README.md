<p align="center">
  <img src="site/assets/logo.svg" width="72" height="72" alt="ReSurface mark — stacked surfaces forming an R" />
</p>

<h1 align="center">ReSurface</h1>

<p align="center"><strong>Responsive beyond the viewport.</strong><br/>
Surface-aware publishing for agents. One source. Many surfaces. Always useful.</p>

---

Responsive design moves boxes around. It cannot shorten a recipe step for a 5"
fridge display, fit a whole song on one guitar-stand page, condense eight
requirements into five because five reads better, or swap checkboxes for
strikethroughs because a thermal printer turns small glyphs into smudges.

Those are *editorial* decisions, and modern agents can make them. **resurface**
is an open-source skill framework that teaches an agent to take any document,
dashboard, or interface and re-decide both its **form and its content** for a
different output surface — then actually get it there.

| Surface | Spec | What changes |
|---|---|---|
| Letter / A4 | 8.5×11in · 210×297mm | ink-aware, annotation-ready, no wasted whitespace |
| Index card | 3×5in | condensed faces, one unit of meaning per card |
| Thermal receipt | 58/80mm · 384/576 dots · 1-bit | solid blacks, strikethroughs, tear-aware segments |
| Label sticker | 4×6in · 203 DPI · 1-bit | QR-heavy, glanceable, free "ink" |
| E-ink panel | e.g. 800×480 · 1–16 gray | contrast-first, dithered, slow-refresh calm |
| Slide deck | 16:9 | paragraphs become notes; bullets surface |
| Phone | touch · portrait | cards, gestures, listen-instead-of-read |
| TV / wall | 1080p+ at 3–5m | distance typography, ambient density |
| Terminal | 80×24 mono | box-drawing, the original constrained surface |

…and any surface you can describe in a [profile](skills/resurface/surfaces/_schema.md).

## How it works

resurface is judgment plus hardware truth, written down:

1. **Capture** — the agent records why the artifact exists, who uses it where,
   a tiered content model (what must survive / can condense / can drop), and the
   design language → `.resurface/source.md`
2. **Choose** — you name a surface; the agent loads its profile: real dimensions,
   color depth, interactivity, refresh, ink economy, failure modes.
3. **Decide** — it writes a durable [decision record](docs/how-it-works.md):
   layout in real units, content rewrites shown, surface idioms chosen. Anything
   it can't defend confidently comes back to you as compact multiple choice —
   once, then recorded forever.
4. **Render** — a surface-native artifact: print-CSS HTML, 1-bit raster, ESC/POS,
   fixed-pixel PNG, slides.
5. **Proof** — it rasterizes at the device's *true* pixels and bit depth and
   inspects the result itself. 384px wide and 1-bit, if that's what the printer
   sees. Nothing ships on "should work."
6. **Deliver** — via a [connector](skills/resurface/connectors): CUPS, ESC/POS,
   TRMNL, OpenEPaperLink, PDF, kiosk browser. Add cron and your day's schedule is
   a sticker on the printer before you wake up.

## Install

resurface is a [Claude Code](https://claude.com/claude-code) plugin (a skill set
— plain markdown; it also works with any agent runtime that reads skills).

```bash
# As a plugin
/plugin install resurface

# Or as a plain skill, per-user
git clone https://github.com/zachphillips/resurface
cp -r resurface/skills/resurface ~/.claude/skills/

# Or per-project
cp -r resurface/skills/resurface .claude/skills/
```

Optional tooling the proofing and delivery steps will use when present:
`chromium` (rasterizing), `imagemagick` (bit-depth simulation), `zbar`
(QR verification), `python-escpos` (thermal delivery), CUPS (`lp`).

## Use

Talk to your agent about surfaces:

```
> Print my repertoire on index cards. I can't flip cards mid-song.

> Put tonight's recipe on the fridge e-ink. Steps glanceable with wet hands.

> Make this proposal a 12-slide deck. Prose goes to presenter notes.

> Every morning at 6:45, print my day on the label printer:
  schedule, three priorities, weather, one QR to the full calendar.
```

The agent captures the source once, then each surface gets its own decision
record under `.resurface/decisions/` — so re-renders stay consistent, and
questions you've answered are never asked twice.

## Examples

Worked end-to-end in [`examples/`](examples/):

- **[lyrics-to-letter-and-cards](examples/lyrics-to-letter-and-cards/)** — a
  song sheet that fits one page at maximum type size, then the same repertoire
  re-segmented across 3×5 cards in a condensed face.
- **[agent-dashboard-to-receipt](examples/agent-dashboard-to-receipt/)** — a
  project dashboard re-edited into a 384-dot thermal strip: done gets
  strikethroughs, next stays clean, a rule divides them.
- **[recipe-to-fridge-eink](examples/recipe-to-fridge-eink/)** — a long recipe
  re-written to glanceable steps for a 648×480 1-bit panel, ingredients down
  the right where a cook's eye expects them.

## Documentation

- [How it works](docs/how-it-works.md) — the protocol and the decision record format
- [Writing a surface profile](docs/writing-a-surface.md) — add your weird display
- [Writing a connector](docs/writing-a-connector.md) — add your printer
- [FAQ](docs/faq.md)

## Contributing

Surfaces and connectors are the community layer — rooted Kindles, e-paper price
tags, dot-matrix printers, departure boards: if you can describe its physical
truth, agents can design for it. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
