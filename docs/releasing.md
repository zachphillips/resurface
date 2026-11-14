# Releasing the site

Production is <https://resurface.thekitchen.co>, served by Cloudflare Pages project
`resurface` in account `18c14eced1b91d7718e054b8767d5d46`. The production branch is
`main`. The project has no Git integration: merging to main does not deploy.
The root `wrangler.jsonc` describes local preview, not the production target.

## Capture before publishing

Start from a clean, current `main`. The commands below need Bash, curl, Python 3,
Node and an account-scoped Cloudflare token with Pages Read and Pages Write.
On the fleet, the existing credential is `CLOUDFLARE_PAGES_TOKEN` in the private
file below. Never commit credentials or release evidence.

```bash
source ~/.agents/secrets/cloudflare.env
export CLOUDFLARE_API_TOKEN="$CLOUDFLARE_PAGES_TOKEN"
export CLOUDFLARE_ACCOUNT_ID=18c14eced1b91d7718e054b8767d5d46
RELEASE_DIR="$(mktemp -d)"
PAGES_API="https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/resurface"
SITE_URL=https://resurface.thekitchen.co

capture_release() {
  rm -f "$RELEASE_DIR/baseline-ready" || return
  curl --fail-with-body --silent --show-error \
    --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    "$PAGES_API" > "$RELEASE_DIR/project-before.json" || return
  PREVIOUS_DEPLOYMENT_ID="$(python3 - "$RELEASE_DIR/project-before.json" <<'PY'
import json, sys, uuid
data = json.load(open(sys.argv[1]))
assert data["success"], data.get("errors")
project = data["result"]
assert project["name"] == "resurface" and project["production_branch"] == "main"
assert "resurface.thekitchen.co" in project["domains"]
deployment = project["canonical_deployment"]
assert deployment["environment"] == "production"
assert deployment["latest_stage"]["status"] == "success"
print(uuid.UUID(deployment["id"]))
PY
  )" || return
  printf '%s\n' "$PREVIOUS_DEPLOYMENT_ID" > "$RELEASE_DIR/previous-deployment-id" || return
  for asset in index.html robots.txt assets/logo.svg; do
    name="${asset//\//-}"
    route="/$asset"; [ "$asset" != index.html ] || route=/
    status="$(curl --fail-with-body --silent --show-error --compressed \
      --dump-header "$RELEASE_DIR/$name.before.headers" \
      --output "$RELEASE_DIR/$name.before" --write-out '%{http_code}' "$SITE_URL$route")" || return
    [ "$status" = 200 ] || { printf 'FAIL: baseline %s returned %s\n' "$route" "$status"; return 1; }
  done
  touch "$RELEASE_DIR/baseline-ready"
}
capture_release
```

Stop if capture reports any failure. The upload below refuses to run without
the completion marker. Keep this Bash shell open for verification and rollback.

Check the saved project still names `resurface`, production branch `main` and
the same custom domain. Keep the deployment ID and response files until the
release has been verified. The page before the November 2026 release had a
`noindex, nofollow` robots meta, a `User-agent: *` / `Disallow: /` robots file,
and these response policies on home, logo and robots:

```text
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

Those existing policies are now included in `site/`; upload the whole directory.
Do not change the zone's existing robots rule, DNS, custom domain or access rules.

## Publish and verify

```bash
verify_release() {
  [ -f "$RELEASE_DIR/baseline-ready" ] && [ -n "$PREVIOUS_DEPLOYMENT_ID" ] || {
    printf 'FAIL: complete baseline and rollback ID are required before upload\n'; return 1;
  }
  npx --yes wrangler@4.156.0 pages deploy site --project-name resurface --branch main \
    --commit-hash "$(git rev-parse HEAD)" --commit-dirty=false || return

  for asset in index.html robots.txt assets/logo.svg; do
    name="${asset//\//-}"
    route="/$asset"; [ "$asset" != index.html ] || route=/
    status="$(curl --fail-with-body --silent --show-error --compressed \
      --dump-header "$RELEASE_DIR/$name.after.headers" \
      --output "$RELEASE_DIR/$name.after" --write-out '%{http_code}' "$SITE_URL$route")" || return
    [ "$status" = 200 ] || { printf 'FAIL: %s returned %s\n' "$route" "$status"; return 1; }
    cmp "site/$asset" "$RELEASE_DIR/$name.after" || return
  done
  cmp "$RELEASE_DIR/robots.txt.before" "$RELEASE_DIR/robots.txt.after" || return

  curl --fail-with-body --silent --show-error --compressed \
    --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    "$PAGES_API" > "$RELEASE_DIR/project-after.json" || return
}
verify_release
RELEASE_VERIFICATION_STATUS=$?
```

The function returns failure without exiting the shell, so the rollback
variables remain available. A nonzero `RELEASE_VERIFICATION_STATUS` requires
investigation and rollback if the live site is worse; do not mark it verified.

Require all comparisons to pass. Confirm the new `canonical_deployment` is a
successful production deployment with the published main SHA, and project
domains and configuration are unchanged. Inspect the real address in a browser:
the updated copy, logo and fonts must load, and surface switching must work.

Compare the saved headers for each response. Header names are case insensitive;
their order is immaterial. Policy values (robots, security, CORS, cache control,
content type and preconnect links) must be unchanged. Date, request ID (`CF-Ray`),
the signed reporting URL, cache hit status/age and content validators/length are
request or content metadata and can change; retain the raw headers as evidence.
Also confirm the robots meta value matches the saved home page. A failed check
is a failed release, even if the upload command succeeded.

## Roll back

If the real site is worse, restore the **recorded previous production ID**:

```bash
curl --fail-with-body --silent --show-error --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "$PAGES_API/deployments/$PREVIOUS_DEPLOYMENT_ID/rollback" \
  > "$RELEASE_DIR/rollback.json"
```

Check the API response's `success` field. Fetch the project and custom-domain
responses again, require the previous canonical deployment, compare the home,
logo and robots bodies to the saved **before** files, and recheck the policies.
Pages keeps earlier deployments; no re-upload or DNS change is needed.

## Optional automation

A small GitHub Actions job on pushes to `main` could check out the repository
and run the same pinned Pages command, then verify the custom domain. It needs
a repository secret containing a Pages Read/Write token scoped to this account;
the account ID can be a repository variable. Use deployment concurrency to avoid
overlapping releases. Adding that secret requires a separate owner action.
