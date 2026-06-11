# FAQ

Honest answers, including the ones with "no" in them.

### Isn't this just print CSS?

No. Print CSS reflows; resurface re-edits. `@media print` can hide a navbar
and break pages politely, but it ships the same words to every surface. The
point of resurface is that the *content decisions* change with the surface:
eight requirements become five tighter ones, a week of calendar becomes two
days, checkboxes become strikethroughs because the printer can't render a
crisp 12px glyph. Print CSS is one of resurface's rendering targets (paper
surfaces render through it) — it is the last step, not the idea.

### Why does the agent rewrite my content?

Because truncation is failure and most surfaces can't hold the original.
During capture, content is tiered: T1 survives verbatim everywhere, T2 may be
condensed *in your voice*, T3 may drop or escape via QR. Every T2 rewrite is
shown, original and replacement, in the decision record before anything
renders. You veto by editing the record — your edit becomes the standing
decision for every future render. Nothing is rewritten silently.

### What agent runtimes does this work with?

resurface is a [Claude Code](https://claude.com/claude-code) plugin in the
skill format — plain markdown files. Any agent runtime that reads markdown
skills (or that you can point at
[`skills/resurface/SKILL.md`](../skills/resurface/SKILL.md) and its library)
can run the protocol. There is no resurface binary, daemon, or API.

### Does it need internet or an LLM at render time?

The agent *is* the renderer-decider — resurfacing happens when you ask an
agent to do it, with whatever connectivity that agent needs. But the outputs
are static: HTML, PNG, PDF, ESC/POS bytes sitting in `.resurface/out/`. Once
rendered and proofed, delivery and scheduled re-delivery need no model at all
(re-rendering with *new data* does — that's an agent run, governed by the
existing decision record).

### Is the output deterministic?

The decisions are; the bytes aren't, byte-for-byte. The decision record pins
every choice — layout in real units, triage, rewrites, answered questions —
and renders follow the record. Two renders from the same record and the same
data produce the same design; the proof step verifies the result against the
record either way. If you need bit-identical output, keep the rendered
artifact: it's static and committed.

### Why markdown instead of code?

Because judgment is the engine. The hard part of moving a dashboard to a
receipt isn't rasterizing — it's deciding what a status dot *becomes*. That's
expressed best as written principles and hardware facts an agent reads, not as
a template language. Code appears only at the edges, where it belongs:
rasterize (chromium, imagemagick) and deliver (connectors). Everything between
is editorial.

### What about my printer / panel / weird device X?

Write it down and it's supported. A device needs at most two markdown files: a
[surface profile](writing-a-surface.md) (its physical truth — what designs for
it must respect) and, if it isn't reachable through an existing connector, a
[connector](writing-a-connector.md) (how bytes get to it). Measure first;
route what you can't measure to Required-if-unknown. Then send the PR —
profiles and connectors are the community layer.

### How do scheduled prints work?

Cron plus a connector. A scheduled agent run re-renders from `source.md` under
the existing decision record (no new questions — they were answered once),
proofs, and delivers. Connectors are idempotent: a date-stamped marker file
next to the output means a retried job never prints twice. The result is the
morning-briefing pattern: your day is a sticker on the printer before you're
awake. See the Scheduling section of
[`connectors/escpos.md`](../skills/resurface/connectors/escpos.md).

### Can it go the other way — or keep two surfaces in sync?

Surfaces never sync with each other; they all render from the same
`.resurface/source.md`, captured once. Update the source (or let an agent
update it from your living document) and every surface's next render reflects
it, each under its own decision record. There is no reverse path — scribbles
on a printed strip don't flow back — though pen-on-paper is a feature, not a
sync bug: several profiles deliberately leave write-in lines.

### What happens on a re-render when only the data changed?

The fast path. Source content updates, the decision record applies unchanged
— same layout, same triage rules, same answered questions — render, proof,
deliver. The agent should not re-ask anything or re-decide anything unless the
new data breaks the budget (e.g. twelve tasks where the record planned for
eight), in which case the record is amended and the change is visible in the
diff.

### What if the agent makes a call I disagree with?

Edit the decision record — it's the contract, and it's plain markdown in your
repo. Genuinely uncertain calls never get guessed in the first place: the
protocol requires low-confidence/high-cost decisions to come to you as batched
multiple choice, recorded once. Everything else the agent decides and *shows
its work* in the record, where it's one edit away from being overruled.

### Do I need special hardware to try it?

No. Letter/A4 via any printer (or just the PDF), slides, terminal, and phone
are all surfaces. The cheapest path to the full experience — including the
1-bit proof and the physical tear-off — is a no-name 58mm thermal receipt
printer, commonly under $40, fed by
[`connectors/escpos.md`](../skills/resurface/connectors/escpos.md) with zero
ink costs forever.

### Should I commit `.resurface/` to version control?

Yes. `source.md` and `decisions/` are the valuable, hand-editable state —
diffs of a decision record are genuinely informative ("show 2 days → show 3
days"). `out/` is regenerable; commit it if you want rendered history, ignore
it if you don't. Marker files under `out/` are per-machine and safe to ignore.

### Why does the agent ask multiple-choice questions instead of just asking?

Because open questions are expensive on both sides. The protocol's rule is
*ask rarely, batch always*: the agent decides everything it can defend, then
brings the few low-confidence/high-cost calls in one batch, pre-chewed into
options ("2 days, 3 days, or vertical 7-day list?"). Each answer is recorded
in the decision record and never asked again.

### What does resurface *not* do well?

Honest list: live interactivity (its outputs are static by design — a kiosk
browser is as dynamic as it gets); high-fidelity photography on 1-bit
surfaces (dither helps, physics wins); archival output on thermal paper (it
fades — the profile says so); and zero-judgment batch conversion of a
thousand documents (every source deserves a capture; if you don't want
editorial decisions made, you want a file converter, not resurface).

### Where do I start?

Read [how it works](how-it-works.md), install the skill from the
[README](../README.md), then ask your agent to put something real on a
surface you actually live with. The fridge knows what it wants.
