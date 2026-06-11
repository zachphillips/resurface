---
surface: terminal-cli
class: terminal
canvas: 80×24 character cells baseline, monospace grid, cell aspect ~1:2 (w:h)
color: full via ANSI — 16-color floor; 256/truecolor common but unverified
interaction: none (an output artifact; scrollback above, prompt below)
refresh: instant
segmentation: none (scrollback persists)
viewing-distance: 50–70cm
ink-economy: n/a
---

# Terminal — the original 80-column grid

The terminal is the surface agents already live on: a monospace grid where
layout is integer arithmetic and characters are the only pixels. The contract
is 80×24 — everything wider is a bonus, never a requirement — and the design
must still mean something after the colors are stripped by a pipe.

## Physical truth

- Baseline: **80 columns × 24 rows** (VT100 legacy; still what CI logs, pipes,
  and tmux panes guarantee). Real windows are usually larger.
- Monospace grid, cell aspect ≈ **1:2** — a visual square is 2 cells wide.
- Color via ANSI SGR: **16 colors always**; 256 (`TERM=*-256color`) and 24-bit
  (`COLORTERM=truecolor`) common but not universal. `NO_COLOR` and non-TTY
  output (pipes, files) mean color can vanish entirely.
- Glyph palette: box drawing **U+2500–257F** (─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼, heavy
  ━ ┃, double ═ ║), blocks **U+2580–259F** (█ ▓ ▒ ░, partials ▏▎▍), sparkline
  ramp **▁▂▃▄▅▆▇█** (U+2581–2588).
- **No images.** (Sixel/Kitty/iTerm2 graphics exist but are rare enough to be a
  different surface.)
- CJK and most emoji occupy 2 cells, and terminals disagree about which —
  alignment-critical layouts avoid them.

## Fidelity budget

Starved of resolution, typefaces (exactly one: the user's), and graphics; rich
in immediacy, scriptability, and proximity — zero infrastructure between agent
and surface. Persistence is the scrollback: output must still make sense when
re-read later, uncolored, in a log file.

## What it's good at

End-of-run status reports, build/test summaries, aligned tables and diffs,
trend strips via sparklines, anything an agent prints where the user already is.

## Failure modes

- Lines over 80 columns wrapping into hash.
- **Tabs for alignment** — tab stops vary; pad with spaces, always.
- Counting bytes instead of display width: ANSI escapes are 0 columns, CJK and
  emoji are 2 (wcwidth logic, not `len()`).
- Color as the only encoding — dies under `NO_COLOR`, pipes, and colorblindness.
- Box-drawing in non-UTF-8 locales → mojibake; need an ASCII `+-|` fallback.
- Hardcoded RGB text on the user's unknown theme: dark-on-dark, invisible
  "gray". Use the 16 named colors and let the theme resolve them.

## Typography minimums

There is no type to set; the levers are structural:

- Emphasis: SGR bold, inverse video for the strongest band, dim for chrome.
- Hierarchy: CAPITALS, blank lines, two-space indents, rules made of ─/━/═.
- One cell is both the minimum and maximum resolution: nothing smaller than a
  character exists, so density is line discipline, not font size.

## Native idioms

- Full-width rules: light `─` per item, heavy `━` per section, `═` for the
  header band.
- Box-drawn panels with the title set into the top rule: `┌─ STATUS ─────┐`.
- Key–value gutters aligned on a fixed column; numerals right-aligned.
- Sparklines `▁▂▃▅▇` for trends; `░▒▓█` ramps for bars and heat.
- Status glyphs `✓ ✗ ● ○ △` with color reinforcing — never replacing — the
  glyph.
- Semantic 16-color use: green good, red failed, yellow warning, cyan links,
  dim metadata.

## Required-if-unknown

- "Color depth to target: 16-color safe, 256, truecolor — or must it survive
  `NO_COLOR` and piping to a file?"
- "Hard-wrap at 80 columns, or detect width at runtime (`tput cols`) and use
  it?"
- "Is UTF-8 guaranteed, or is an ASCII-only fallback needed (CI logs, serial
  consoles)?"

## Rendering target

UTF-8 plain text with ANSI SGR escapes — no CSS; the page setup is the grid:
every line ≤80 display columns, space-padded alignment, hard line breaks. Emit
from a script that checks `isatty()` and `NO_COLOR`, degrading to plain text
with identical layout. The artifact should `cat` correctly with no runtime.

## Proofing

Open a real terminal at exactly 80×24 and `cat` the artifact: no wrapped lines,
all columns aligned. Strip the colors (`sed 's/\x1b\[[0-9;]*m//g'`) and re-read:
meaning must survive. If ASCII fallback is claimed, view under `LC_ALL=C`. Pipe
to a file and back: still aligned. The proof loop here is seconds long — use it
after every edit. `references/proofing.md`.
