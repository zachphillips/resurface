---
name: verify-resurface
description: Run the real ReSurface site and worked outputs locally; capture surface switching, saved choices, decision records, paper PDFs and exact-pixel monochrome examples before calling a change done.
---

# Verify ReSurface

Use for the interactive site, plugin instructions, surface profiles and worked
examples. This is a Markdown plugin plus a static demo, with no account, database,
form, build or application backend. Do not invent a sign-in or submission journey.

## Launch

From a fresh clone, no install or secrets. Needs Node 22, the existing `evidence`
browser/ffmpeg, Poppler (`pdfinfo`, `pdftoppm`) and ImageMagick (`convert`,
`identify`). Run `~/.agents/bin/evidence doctor` and `command -v` for those four
commands first. If absent, report the missing local tool; do not install a library.

```sh
D=.claude/skills/verify-resurface
RUN=$(mktemp -d "$(pwd)/../resurface-proof.XXXXXX")
setsid node "$D/serve.mjs" "$RUN" > "$RUN/server.log" 2>&1 & echo $! > "$RUN/server.pid"
timeout 60 bash -c 'until test -f "$1/run.json"; do if ! kill -0 "$(cat "$1/server.pid")" 2>/dev/null; then cat "$1/server.log"; exit 1; fi; sleep 0.2; done' _ "$RUN"
URL=$(node -p 'JSON.parse(require("fs").readFileSync(process.argv[1])).url' "$RUN/run.json")
curl --fail "$URL/__verify/health"
export VERIFY_RESURFACE_RUN="$RUN"
```

The loopback port is free and above 20000. Ready means `run.json` exists and
health returns the local checkout root and font count. Startup fetches only the
source's canonical Google Fonts CSS/font bytes into memory; it removes preconnect
hints and serves those exact bytes locally. It changes no page script, layout,
content or repository file. If canonical assets cannot load, stop and report that
failure rather than capturing substituted fonts. No live browser requests.

## Drive

Always start evidence on the health URL so the local-only guard is installed
before the actual page loads. Run separately with a unique slug per journey:

```sh
~/.agents/bin/evidence run --repo resurface --slug verify-site \
  --url "$URL/__verify/health" --journey "$D/journeys/site.mjs" \
  --sizes phone,desktop --claim 'The real demo and installation instructions work at phone and desktop widths.'
```

| Journey | Sizes | What it proves |
| --- | --- | --- |
| `site.mjs` | `phone,desktop` | Real hero and canonical logo load; installation link works; how, library and examples sections remain readable; screen rendition fits the requested width. |
| `surfaces.mjs` | `phone,desktop` | Click all seven surfaces, including offscreen dock buttons on phones. Check the rendered mode, active button, saved selection, title/hash read-back and current decision record; capture every rendition. |
| `controls.mjs` | `phone,desktop` | Direct hashes, stored choice on later navigation, explicit-hash precedence, keyboard selection, and opening/dismissing the decision record. |
| `hash.mjs` | `phone,desktop` | Navigate between surface hashes within an already open page and check the rendition follows the URL. Currently fails because the app only reads the hash at startup. |
| `paper.mjs` | `desktop` | Render all three supplied songs through actual Chromium print PDFs, rasterize every page at 96 DPI, and check one letter page per song and four card pages. Real generated files go under `$RUN/proof/`. |
| `mono.mjs` | `desktop` | Render the actual recipe at 648×480 and thermal example at 384×3000, reduce to 1-bit with the documented thresholds, record dimensions/depth, and display the resulting device rasters. |

For the last two, keep `VERIFY_RESURFACE_RUN` exported. They deliberately change
the browser viewport to the artifact's own units. Paper is 816×1056 CSS pixels;
cards are 480×288 per page. A fixed surface is not expected to reflow at phone
width. The screen journey, not the print artifacts, asserts responsive geometry.

## Read, publish, stop

Capture the parent first, then follow this skill from a clean clone of the head
with the same scripts. Read every manifest; inspect two or three screenshots and
the actual PDF/raster outputs. PASS is exit 0, FAIL is 1, INCONCLUSIVE is 2. Retain
real app/content failures with source lines; fix journey mistakes only.

```sh
~/.agents/bin/evidence publish <bundle> --artifact --notion --pr zachphillips/resurface#<draft-number>
kill -TERM "$(cat "$RUN/server.pid")"
```

Close your browser. Keep evidence and generated proof files outside git. No
dependencies, build output, local database or caches are created inside the repo.

## Limits and traps

- The site remembers the last surface. A fresh browser context starts clean;
  use a hash when a journey needs a specific surface.
- The dock scrolls on phones. Let Playwright scroll a real button into view;
  do not bypass a click by calling the page's internal mode setter.
- Desktop opens the decision record by default; phones require REC. Its opacity
  transition is not equivalent to `display:none`, so check its actual hide state.
- Phone screen overflow and dock clicks currently fail. Preserve the recorded
  geometry and click failure; do not force-click or patch CSS in a journey. At
  390px the install grid's 448px content (`site/index.html:346`) expands the
  document to 466px. The fixed chooser starts below the 844px visible viewport.
- Controls startup checks use a full page navigation. `hash.mjs` separately keeps
  the same-document failure at `site/index.html:1417` visible.
- Reduced motion is enabled for stable captures and disables the e-ink flash.
- This verifies supplied outputs, not a new agent's editorial judgment. Review
  the source, decision record and full surface profile when those change.
- Physical printers/panels, QR scanning, actual plugins/agent installation,
  connector delivery, scheduled output, live hosting and device legibility at a
  distance need separate authorized proof. No printer, CUPS, TRMNL or other
  delivery connector is contacted. Keep the PR a draft; do not deploy the site.
