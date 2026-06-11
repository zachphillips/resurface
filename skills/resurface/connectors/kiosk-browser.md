# Connector: Kiosk browser

Delivers to any device that is, in the end, a full-screen browser pointed at a
URL: a TV running a wall dashboard, an old tablet on a stand, a rooted Kindle
on the fridge. You serve the rendered HTML; the device displays it; a refresh
strategy keeps it current. The browser is part of the surface — its age and its
panel type (LCD vs e-ink) drive every choice below.

## Detect

Three facts, recorded in the decision record:

- **True viewport in device pixels.** Have the device load a page that prints
  `innerWidth × innerHeight × devicePixelRatio`, or take it from the surface
  profile. TVs lie (see overscan, below).
- **Browser engine and age.** A rooted Kindle or a 2015 tablet runs an old
  engine: treat it as 5–10 years behind, prefer plain CSS and system fonts,
  and test on the device, not in your desktop browser.
- **Panel type.** E-ink browsers punish full page reloads with a full-panel
  flash; that decides the refresh strategy.

## Deliver

Serve the render directory:

```bash
python3 -m http.server 8741 -d out/wall-dashboard/   # quick LAN serve
# or any static host / VPN-reachable server for devices off your LAN
```

The device must be able to reach the server across reboots — a stable LAN IP
or hostname, not a laptop that leaves the house.

On devices you control, launch the browser pinned full-screen:

```bash
chromium --kiosk --noerrdialogs --disable-infobars \
  --disable-session-crashed-bubble --hide-scrollbars --incognito \
  http://<server>:8741/dashboard.html
```

`--incognito` matters: after a power cut, it suppresses the "Restore pages?"
bubble that would otherwise sit over your dashboard forever. On Kindles and old
tablets you type the URL by hand — keep it short, then bookmark it.

**Auto-refresh — two strategies, choose deliberately:**

- `<meta http-equiv="refresh" content="300">` — works on every engine ever
  shipped, but it's a full reload: white flash on LCD, full-panel black/white
  flashing on e-ink. Use only when JS cannot be trusted.
- **Fetch-and-swap** — fetch the page in the background and swap the DOM in
  place. No flash; e-ink repaints only the regions that changed. Default
  everywhere, mandatory on e-ink browsers:

```html
<script>
setInterval(async () => {
  const r = await fetch(location.href, {cache: 'no-store'});
  const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
  document.body.replaceChildren(...doc.body.childNodes);
}, 300000);
</script>
```

**Keeping the device awake:** OS first — disable sleep in settings; Android
plugged in: `adb shell svc power stayon true`; a Linux box driving a TV:
`xset s off -dpms`. In-page, `navigator.wakeLock.request('screen')` works on
modern browsers but needs a secure (HTTPS) context. Dedicated kiosk apps (e.g.
Fully Kiosk on Android) handle wake, autostart, and crash recovery better than
a bare browser — worth it for unattended walls.

## Quirks

- **TV overscan.** Many TVs crop ~3–5% of the signal; a 1920×1080 page loses
  its edges. Fix in the TV ("Just Scan" / "Full pixel" / "Screen fit") or keep
  a safe margin from the profile.
- **10-foot type.** Across-room minimums are far larger than desk habits —
  `references/typography-and-size.md` has the table.
- **Static-image burn-in** on OLED TVs: shift the layout a few pixels per
  refresh, or schedule a nightly off period.
- **Caches are sticky** on kiosk devices. Serve with `Cache-Control: no-store`
  or cache-bust (`dashboard.html?t=<epoch>`); a stale dashboard fails silently.
- **Reboots happen.** The URL must come back without a human: kiosk autostart,
  a boot script, or at minimum the browser's homepage set to the dashboard.

## Scheduling

The device stays dumb; the server does the work. cron re-renders into the
served directory **atomically** — render to a temp path, then `mv` into place —
so a fetch that lands mid-write never sees half a page. The device's refresh
interval and the cron cadence should match; refreshing faster than you re-render
is noise, slower is staleness.
