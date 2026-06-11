# Source: Foundry — coding-agent fleet dashboard

> In a live project this file is `.resurface/source.md`.

## Intent

Foundry is a self-hosted web dashboard (`foundry.internal/fleet`) where four
coding agents report overnight work on four repos. It exists for one decision,
made daily over coffee: **what gets greenlit and what's blocked.** Everything
on the board serves "what did they finish, what are they doing, what are they
asking permission to do next."

## Audience & use context

One developer-lead. The requested surface changes the context completely:
instead of opening a laptop, they want the printer by the kettle to have a
strip waiting at 06:45 — read standing up, torn apart, one project's strip
carried to the desk or handed off, marked up with a pen.

## Content model

| Tier | Web dashboard form | Notes |
|---|---|---|
| **T1** | Project name + one-word scope ("payments") | Identity of each segment |
| **T1** | Running task, its state, and any blocker | The stalled item is the single most important line on the board |
| **T1** | Proposed-next items (rendered **gray** on the web, awaiting approval) | This is the morning decision; on the web they're literally `#8a8f98` |
| **T1** | Fleet totals (projects / merged / running / proposed) | The 5-second version |
| **T2** | Done tasks — web cards show full sentences with PR links, e.g. *"Implemented idempotency keys on the refunds endpoint so retried webhooks can't double-refund (PR #412, merged 02:14)"* | Condensable to title + PR number; the *what* survives, the *how* lives behind the link |
| **T3** | Burndown sparklines, agent avatars, token-spend charts, log links, merge timestamps | Drop; escape to QR → live board |

Snapshot being resurfaced (overnight run, Wed Jun 10, 23:40 → 06:45):

- **atlas-api** (payments): 3 merged (#412 refund idempotency, #415 webhook
  retry budget, #418 p99 alert at 800 ms); running: ledger IDs → UUIDv7 at
  62%, backfill ETA 09:00; proposed: backfill 2024 invoices, kill legacy
  `/v1/charges`.
- **orbit-web** (storefront): 2 merged (#209 checkout A/B — variant B
  shipped, +4.1% conversion; #213 bundle 312 kB → 187 kB); running: Safari
  focus-trap fix, PR open with 2 tests red; proposed: dark-mode token pass,
  Enzyme → Playwright migration.
- **courier** (notifications): 3 merged (#87 DKIM auto-rotation, #91 bounce
  webhook normalization, #95 digest send 14 m → 90 s); running: template
  versioning, draft PR; proposed: per-tenant rate limits.
- **darkroom** (image pipeline): 2 merged (#56 HEIC decode path, #58 EXIF
  orientation fix); running: batch-resize queue — **stalled on S3
  permissions, needs human action**; proposed: GPU offload spike, prune
  originals >90 days.

## Design language

Web: dark theme, Inter, 2×2 card grid, green check pills for done, animated
spinner for running, gray text for proposed-next, blue PR links. The *spirit*
to preserve: terse engineering telegraphy, state legible before words are
read, "proposed" visually subordinate to "done/running".

## Voice

Commit-message clipped. Numbers over adjectives ("14 m → 90 s", not "much
faster"). Imperatives for proposals. Never marketing.
