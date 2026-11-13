# Cloudflare local preview

From the repository root:

```sh
npx wrangler@4.156.0 dev --local --ip 127.0.0.1 --port 21134
```

`wrangler.jsonc` serves the existing `site/` directory through Cloudflare's local
static asset runtime. It needs no build step, application dependencies, account
credentials or remote bindings. The repository's skills, examples and design
files are outside the asset root. The site's `.gitignore` is excluded too.

The site already has a Cloudflare Pages deployment. This configuration makes an
alternative Workers static asset preview reproducible; it does not change that
deployment or attach a hostname. Public Worker and preview URLs are disabled,
and no automatic deployment workflow is added.

Check `/`, `/assets/logo.svg`, the `/index.html` redirect, and a missing route
(404). The page's existing surface chooser, keyboard shortcuts, hash links and
local storage run in the browser. `verify/site-hosting.mjs` captures the iPad
surface changes and decision record, plus the phone rendering.
The compatibility date matches Wrangler 4.156.0's bundled runtime. Update the
CLI and compatibility date together.

An existing phone layout issue puts the fixed surface chooser below the visible
viewport at 390×844. The hosting config preserves that behavior. The browser
journey records the limitation; phone surface-button interactions are not claimed
as verified.
