# Connector: CUPS standard printers

Spools paged output to any queued printer — laser, inkjet, driver-backed label
printers — on macOS and Linux. The spool format is PDF; render with exact `@page`
sizes first (see `connectors/pdf.md`), then hand CUPS a file whose geometry is
already correct.

## Detect

- `lpstat -p` — list queues and their states; `lpstat -p -d` adds the default.
- `lpoptions -p <queue> -l` — what this queue actually supports: media sizes,
  duplex, quality, trays. Read this before deciding; a "supported" custom size
  that isn't listed will be silently clamped by some drivers.
- `lpinfo -v` — devices that are connected but not yet queued.
- Thermal printers sometimes appear as raw CUPS queues; for those prefer
  `connectors/escpos.md` — CUPS raw queues give you no typography.

## Deliver

```bash
lp -d <queue> -o media=Letter -o print-quality=5 out/paper-letter/sheet.pdf
lp -d <queue> -o media=Custom.3x5in out/index-card/card-01.pdf
lp -d <queue> -o media=A4 -o sides=two-sided-long-edge out/paper-a4/brief.pdf
```

Options that matter:

- `-o media=` — `Letter`, `A4`, `Legal`, or `Custom.<W>x<H>in` / `Custom.<W>x<H>mm`.
  Must match the PDF's `@page` size exactly; a mismatch means the driver is
  scaling or cropping behind your back.
- `-o sides=` — `one-sided`, `two-sided-long-edge` (portrait flip),
  `two-sided-short-edge` (landscape flip). Only duplex when the segmentation
  plan says the back side is usable (judgment rule 7).
- `-o print-quality=5` — 3 draft / 4 normal / 5 best. Use 5 whenever the page
  carries QR codes or fine rules; draft mode thins hairlines below survival.
- `-n <copies>` — but see the one-proof rule below.

**`-o fit-to-page` is forbidden.** It rescales your page to the printer's
imageable area, and that breaks physical truth: type you sized at 12pt for arm's
length silently prints at ~11.3pt, QR modules drop below their scan minimum,
write-in rules no longer sit at the spacing you measured. If content doesn't fit
inside the hardware margins, that is a design decision — fix it in the decision
record, not in the driver. The same ban covers every driver-side "scale to fit"
or "shrink oversized pages" toggle.

One proof, then the batch:

```bash
lp -d <queue> -n 1 -o media=Custom.3x5in out/index-card/card-01.pdf
# user confirms the physical proof — measure type with a ruler if in doubt
lp -d <queue> -n 19 -o media=Custom.3x5in out/index-card/card-01.pdf
```

Watch and recover: `lpstat -o` lists pending jobs, `cancel -a <queue>` clears a
botched batch before it wastes a tray of card stock.

## Quirks

- **Hardware margins are real.** Most lasers cannot print the outer 4–6mm.
  Design inside the margin from the profile; "borderless" exists only on some
  inkjets and needs an explicit borderless media option.
- **Custom sizes are driver roulette.** Some PPDs accept any `Custom.` size,
  some clamp to the nearest preset with no error. The first physical proof on a
  custom size gets measured with a ruler, both axes.
- **Duplex flip direction** depends on orientation: long-edge for portrait,
  short-edge for landscape. Getting it wrong prints the back upside down —
  proof one duplex sheet before any duplex batch.
- **Driverless IPP queues** (`everywhere` model, AirPrint-class) take PDF
  natively. Old raw queues don't; if output is garbage, the queue has no PDF
  filter — re-add the printer as IPP.
- **macOS queue names** are sanitized (`HP_LaserJet_4001`); always copy from
  `lpstat -p` rather than guessing from the friendly name.

## Scheduling

cron + `lp` is fine, with two guards. First, idempotency: write a date-stamped
marker file next to the output so a re-run doesn't print twice. Second, queue
state: an offline printer holds jobs silently, then prints the whole backlog
when it wakes — a week of morning briefings at once. Scheduled jobs should check
`lpstat -p <queue>` for `idle`/`printing` and skip-with-alert rather than spool
into a dead queue.
