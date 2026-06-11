# Ink, color, and dither — the monochrome playbook

Most resurface targets are mono or nearly so: thermal, e-ink, laser on white
paper. Color in the source is not decoration to strip; it is *meaning encoded
in hue*, and the move's job is rerouting that meaning through channels the
surface still has. Strip the hue, keep the semantics.

## Rerouting hue

On a good screen design, color is already redundantly coded (accessibility
demands it). Find the redundant channel, keep it, drop the hue. The surviving
channels at 1-bit: **weight, size, position/indentation, enclosure (outline vs
solid), pattern, and marker glyphs.** A working map:

| Source color says | 1-bit idiom |
|---|---|
| Primary / "look here" | Heaviest weight, or inverted (knocked-out) band |
| Danger / overdue | Enclosure: heavy border box, plus a glyph (!) |
| Secondary / meta | Smaller size — not lighter weight; light dies on low DPI |
| Disabled | Outline style or strikethrough — or ask: is a disabled control even T2 on paper? |
| Tentative / upcoming | Outline box, "?" suffix, or indentation |
| Category hues | Position (grouping, columns) or marker glyphs ■ ▲ ● — beware glyphs below ~12 dots on thermal |

The test is the proof step's contrast-survivor check
(`references/proofing.md`): after depth reduction, every distinction the design
relies on must still be visible. If two things differed only by hue, you
haven't finished translating.

## Threshold, ordered dither, error diffusion

Three ways down to 1-bit; each has a job:

- **Hard threshold** (50–65%): text, rules, UI linework. Crisp edges, zero
  speckle. Always for text-dominant artifacts.
  `magick in.png -threshold 60% -depth 1 out.png`
- **Ordered dither** (Bayer): flat tints and large fills, especially on e-ink —
  the pattern is stable and reads as intentional texture rather than noise.
  `magick in.png -ordered-dither o8x8 out.png`
- **Error diffusion** (Floyd–Steinberg): photographs and continuous gradients —
  best perceived tonal range, but it speckles glyph edges and turns flat areas
  into static. Never let it touch text.
  `magick in.png -dither FloydSteinberg -monochrome out.png`

Mixed pages get composited: threshold the text/UI layer, diffuse the photo,
merge. Or — usually better on starved surfaces — the photo was T3 all along.

## Ink economy by surface class

"Ink" is a budget line and the exchange rate varies wildly:

- **Inkjet:** ink is the most expensive liquid you own, and heavy fills cockle
  the paper. Linework over fills, outline headers, no solid bands.
- **Laser:** toner is cheaper; solid fills are fine, though very large solids
  can band. Spend moderately.
- **Thermal:** ink is *free* — heat is the pigment. Solid black bands,
  inverted headers, heavy rules are the house style
  (`surfaces/thermal-receipt.md`).
- **E-ink:** no consumable, but **contrast is survival**. Pure black on pure
  white; mid-grays only if the panel physically has gray levels, and even then
  spent reluctantly. A washed-out e-ink panel across a room communicates
  nothing.

## The five grays

Screen designs use gray for at least five different meanings. Each needs its
own mono idiom, because "make it gray" is the one move you no longer have:

disabled → outline or omit; secondary → smaller, same weight; tentative →
outline + "?"; placeholder → drop it (a printed placeholder is noise);
divider → a real rule at the profile's minimum weight (≥2 dots on thermal —
hairlines vanish).

## Accent-color panels: black, white, and one more ink

BWR and BWY e-ink (TRMNL-class panels come mono; OEPL shelf tags often carry
red or yellow — `connectors/openepaperlink.md`) are not "color screens." Treat
them as exactly three inks: paper white, black, and one spot color. Rules:

- **One semantic per deployment.** Red means *one* thing on this surface —
  alerts, or the today-marker, or the single number that matters. Map the
  source's whole warning palette (red/orange/amber) onto it.
- No tints, no mixing: spot red halftones poorly and dithered red reads as
  damage. Solid red on white, at bold sizes and up.
- Red refreshes slowly on these panels and costs battery — an accent, not a
  background.
- Proof with the palette quantized to the actual three colors, not RGB.
