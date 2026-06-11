# Contributing to resurface

resurface is a small core of judgment plus a growing library of hardware
truth. The core changes rarely; the library is where contributions live.

## The two community layers

**Surfaces** — one markdown profile per output surface: rooted Kindles,
e-paper price tags, split-flap boards, dot-matrix tractor feed, the 80×24
terminal. If you can describe a device's physical truth, agents can design
for it. Guide: [docs/writing-a-surface.md](docs/writing-a-surface.md).

**Connectors** — one markdown file per delivery path: how bytes actually
reach the device, with the quirks only real hardware teaches you. Guide:
[docs/writing-a-connector.md](docs/writing-a-connector.md).

These are the headline contribution path. A device you own, measured and
written down, is worth more to this project than any refactor.

## The quality bar

- **Real hardware truth.** Profiles and connectors are written from a device
  you measured or tested against, not from a datasheet alone. Say in the PR
  which device, and which numbers you verified versus inherited.
- **Every number real.** Printable widths, dot pitches, refresh times,
  typography minimums — measured or test-pattern-verified. One invented
  number poisons agent trust in the whole file.
- **Uncertainty routed.** What varies by model or installation goes to
  **Required-if-unknown** as the multiple-choice question an agent would ask
  — never silently assumed.
- **Proof attached.** PRs for surfaces and connectors include the proof
  raster (the true-fidelity PNG) and — the gold standard — **a photograph of
  the physical output**. A picture of a real strip hanging off a real printer
  settles arguments that ten review comments can't.

## Repo layout

```
resurface/
├── skills/resurface/
│   ├── SKILL.md              # the judgment core — changes rarely, reviewed hard
│   ├── surfaces/
│   │   ├── _schema.md        # profile structure; start here
│   │   └── <surface-id>.md   # one per surface (kebab-case, matches frontmatter)
│   ├── connectors/
│   │   └── <transport>.md    # one per delivery path
│   └── references/           # shared techniques (proofing, triage, typography…)
├── docs/                     # human-facing guides (this layer of the docs)
├── examples/                 # worked end-to-end resurfacings
└── CONTRIBUTING.md
```

New surface → `skills/resurface/surfaces/<surface-id>.md`, frontmatter
`surface:` matching the filename. New connector →
`skills/resurface/connectors/<transport>.md`, named for the protocol or
service. New shared technique → `references/`, only if two or more profiles
need it.

## Style: how profiles and connectors read

Agents read these files under token pressure; humans read them under
patience pressure. Both reward the same prose:

- **Dense and declarative.** "Minimum reliable gap: 2 dots." Not "you may
  find that very small gaps can sometimes be problematic."
- **Numbers with units, always.** `48mm`, `384 dots`, `~203 DPI`, `≥16 dots
  tall`. Never "small", "roughly half", or unitless pixels on paper.
- **Checkable claims.** Every failure mode maps to something inspectable in
  a proof; every Deliver section runs top to bottom.
- **No fluff.** No marketing adjectives, no throat-clearing, no restating
  the schema. Profiles stay under ~120 lines. If a sentence doesn't change
  a decision an agent makes, cut it.
- One personality line is allowed and encouraged: the title's character
  sketch ("the continuous monochrome strip"). That's the budget; spend it
  well.

## Testing your contribution

The test harness is the proofing discipline itself —
[`skills/resurface/references/proofing.md`](skills/resurface/references/proofing.md):

1. Take a real source (the `examples/` directory has captured ones) and have
   an agent run the full protocol against your new profile or connector.
2. Rasterize at the profile's stated fidelity and walk your own Failure
   modes section as a checklist. If a failure mode can't be checked from the
   proof, rewrite the failure mode.
3. For connectors, run the hardware checklist in
   [docs/writing-a-connector.md](docs/writing-a-connector.md) — including
   the unattended cron run and the run-it-twice idempotency check.
4. Deliver one physical unit. Photograph it. Attach both proof and photo to
   the PR.

Doc and core changes: keep the register (see the style section above; the
existing files are the voice to match), and check that every relative link
resolves.

## Conduct

Be the kind of person you'd lend your label printer to.
