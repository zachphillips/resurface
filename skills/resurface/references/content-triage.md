# Content triage

Triage decides what the content *is* before layout decides where it goes. It is
the step that makes resurface editorial rather than mechanical: tiers first,
then condensing, then escape hatches — recorded in `source.md` so every surface
move starts from the same understanding.

## The tiers, and how to assign them

Run the **"what breaks if this disappears"** test against the artifact's intent:

- **T1 — must survive.** Remove it and the artifact stops serving its intent.
  The chord change, the oven temperature, the next event's time, the deadline.
  T1 survives *on every surface*, at full meaning — though not necessarily in
  full wording.
- **T2 — condensable.** Remove it and the artifact gets poorer but still works;
  more precisely, its *meaning* fits in fewer words. Descriptions, locations,
  context lines. T2 is where the rewriting work lives.
- **T3 — droppable.** Remove it and nothing breaks today. Rationale,
  background, links, change history, decoration. T3 vanishes on starved
  surfaces or escapes through a hatch (below).

Tier by intent, never by prominence. The hero image dominating the source page
is often T3; the footnote with the dosage is T1. And tiers attach to *meaning
units*, not blocks — one paragraph can contain a T1 number, a T2 explanation,
and a T3 aside, and they triage separately.

## Condensing: rewrite, never truncate

Truncation cuts words; condensing re-edits meaning. The rules:

- Merge items that share a decision or a subject.
- Cut qualifier words, never content words.
- Numbers, names, and units survive exactly — they are load-bearing.
- Keep the author's voice: condensed copy should read like the author on a
  good day, not like a summarizer.

Worked example — eight requirements from a signup-flow spec, written in the
author's flat declarative voice:

> 1. Users must be able to create an account using an email address and password.
> 2. Users should also have the option to sign up using their Google account.
> 3. Passwords must be at least 12 characters long.
> 4. Passwords must contain at least one number and one symbol.
> 5. Users must verify their email address before they can access the dashboard.
> 6. The verification email should be sent within 30 seconds of signup.
> 7. If a user doesn't verify within 7 days, the account is deleted along with its data.
> 8. Error messages should be friendly and should never blame the user.

Condensed to five for a surface that gives each line ~50 characters:

> 1. Sign up with email + password, or with Google.
> 2. Passwords: 12+ characters, with a number and a symbol.
> 3. Email verification gates the dashboard; the mail goes out within 30s.
> 4. Unverified accounts are deleted after 7 days — data included.
> 5. Error copy never blames the user.

The moves: 1+2 merged (one decision — how you get in); 3+4 merged (one rule
about one field); 5+6 merged (the gate and its SLA belong together); 7 kept
nearly whole because "data included" changes the legal meaning — that clause is
T1 hiding inside a T2 sentence; 8 trimmed to its operative clause. Every number
intact. Still flat declaratives — the author's register, tighter.

## T3 escape hatches

T3 doesn't have to die; it can leave a forwarding address:

- **QR code** on any printed surface — the full document, the live version, the
  rationale. Placement and sizing rules: `references/qr-codes.md`.
- **A "full version at …" line** with a short URL you control, when a QR is too
  big for the segment.
- **Cycling screens** on refreshing surfaces: an e-ink panel in rotation can
  give T3 its own screen one cycle in five instead of any space on the main one.
- **The back side** of cards and sheets — only when the use context leaves
  hands free to flip (judgment rule 7).

## Anti-patterns

- **Ellipsis truncation.** "Quarterly revenue grew by…" is worse than omission:
  it spends space to deliver nothing and signals carelessness.
- **"Read more" on paper.** Paper cannot expand. Interaction affordances on
  static surfaces are broken promises; replace them with a hatch or a cut.
- **Dropping T1 to fit.** If T1 doesn't fit, the layout or the segmentation is
  wrong — scale down to the type floor (not past it), re-segment, or challenge
  the surface choice. T1 is the definition of non-negotiable.
- **Summarizing into a different voice.** Corporate mush that "covers" the
  content fails the author. If the condensed line couldn't be theirs, redo it.
- **Tiering by render cost.** Keeping what's easy to draw and dropping what's
  hard is the renderer triaging instead of the editor. The tier test only asks
  what breaks — never what's convenient.

Record tiers once in `source.md`; record per-surface deviations (and the actual
T2 rewrites used) in that surface's decision record, so a re-render repeats the
editing instead of re-improvising it.
