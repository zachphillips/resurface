# The protocol, walked end to end

SKILL.md states the six steps; this walks one real move through all of them: a
household calendar dashboard, built as a 1920×1080 web page, moving to a 7.5"
800×480 1-bit e-ink panel on the kitchen wall. Every artifact shown lands in
`.resurface/` so the move is repeatable next week with new data.

## 1. Capture the source → `.resurface/source.md`

The web page: a seven-day week grid, hour gridlines 7am–9pm, colored category
chips (work blue, family green), tentative events in 40%-opacity gray, a
weather strip, "+3 more" overflow links. Don't describe the pixels — capture
the understanding:

```markdown
# Source: household week calendar
Intent: answer "what's happening soon, and does it involve me?" in a 2–5
  second glance while passing through the kitchen. Planning happens on phones;
  this surface only informs.
Audience: two adults, glancing from 1–2m, usually with full hands.
Content model:
- T1: next ~48h of events — title, start time, whose it is; firm vs tentative
- T2: locations (condensable: "Lincoln Elementary gymnasium" → "school gym");
  the week's overall shape (busy vs free days)
- T3: descriptions, category colors as colors, weather past today, "+3 more"
  links, every interaction
Design language: Inter, 8px grid, category hues, generous whitespace.
  Spirit: calm — nothing on this surface should shout.
Voice: terse titles, no punctuation ("Dentist — Maya", "Standup").
```

The intent line does the heavy lifting: "2–5 second glance from 1–2m" will set
the type floor, and "firm vs tentative is T1" will matter in step 5.

## 2. Choose the surface

Load the e-ink panel's profile: 800×480, 1-bit, wall-mounted, refresh every 30
minutes. Its required-if-unknown facts (mounted orientation? refresh cadence?)
get collected now but asked in step 3, batched.

## 3. Decide → `.resurface/decisions/eink-kitchen.md`

The budget collapse is brutal — 18% of the pixels, none of the color, no
interaction. A seven-column hour grid cannot survive. The record (abridged):

```markdown
Budget: 800×480 1-bit, glanced from 1–2m, refreshes every 30min. Spend area
  on the next 48h (T1); compress the rest of the week to its shape.
Type: titles 28px bold, times 22px, day headers 24px knocked out of solid
  black bands. Floor from references/typography-and-size.md at 1.5m.
Triage: hour gridlines drop (time is text here, not position); locations get
  the T2 rewrites from source.md; weather drops to today, one line.
Idioms: category color → owner initial in a square marker; tentative →
  50% gray, dithered. [← this line is about to be proven wrong]
Open questions: 1 (below)
```

One decision is low-confidence and expensive to guess: how much of the week
survives. Asked as a single batched multiple choice:

> The 7-day grid won't fit at the 1.5m type floor. Options:
> **(a)** Today + tomorrow, two columns, biggest type — richest detail, week
> invisible. **(b)** Today + next 2 days, three columns — detail still
> comfortable, plus a one-line "rest of week" strip. **(c)** Vertical 7-day
> list — whole week visible, but type lands at the floor exactly.
> I lean (b): the intent says "soon", and (c) spends the whole budget on days
> nobody acts on yet.

User picks (b). The answer and the reasoning go into the record — next week's
re-render never asks again.

## 4. Render → `.resurface/out/eink-kitchen/panel.html`

Fixed device pixels, no fluidity — the panel is one size forever:

```css
html, body { width: 800px; height: 480px; margin: 0; overflow: hidden;
             background: #fff; color: #000; -webkit-font-smoothing: none }
```

Three ~256px day columns; solid black header bands with knocked-out day names
(the 1-bit section idiom); events as time + title lines with owner markers; the
rest-of-week strip along the bottom.

## 5. Proof at true fidelity

```bash
chromium --headless --screenshot=proof.png --window-size=800,480 \
  --hide-scrollbars out/eink-kitchen/panel.html
magick proof.png -colorspace Gray -threshold 60% -depth 1 proof-1bit.png
```

Looking at `proof-1bit.png` (actually looking — load the image): the layout
holds, the bands are crisp, and one thing is broken. "Piano recital?" — a
tentative event rendered in 50% gray — has dithered to checkerboard mud. From
1.5m it reads as a printing defect, not as "tentative." A T1 distinction (firm
vs tentative) failed the contrast-survivor check in `references/proofing.md`.

The failure is editorial, not mechanical, so the fix lands at the decision
level: the record's idiom line changes to *tentative = outline style* — 2px
black border box, white fill, black text, "?" suffixed to the time. Re-render,
re-proof: the distinction survives at 1-bit. Record and artifact agree again.

## 6. Deliver

The panel's connector decides the mechanics: a TRMNL takes the proofed PNG or a
webhook payload (`connectors/trmnl.md`); a browser-based panel gets the HTML
served with fetch-and-swap refresh (`connectors/kiosk-browser.md`); an OEPL tag
fleet would take per-tag images (`connectors/openepaperlink.md`). Then schedule:
cron re-renders every 30 minutes to match the device's cadence, hashes the
output, and skips delivery when nothing changed.

## What carried the move

The order of operations. Intent came before layout, so "glance from 1.5m"
could veto the seven-column grid. Triage came before rendering, so the
gridlines died on purpose instead of by overflow. The one real uncertainty
became a permanent recorded answer. And the proof caught the one wrong decision
at the cost of a re-render — not a panel that quietly fails its household
every morning.
