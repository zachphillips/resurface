// Read the real Pages deployment and custom domain before and after an upload.
import assert from 'node:assert/strict';
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const mode = process.argv[2];
assert(['capture', 'verify'].includes(mode), 'Use capture or verify');
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
assert(account && token, 'Cloudflare account ID and Pages token are required');
const api = `https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/resurface`;
const origin = 'https://resurface.thekitchen.co';
const baselineFile = '.wrangler/pages-production-before.json';
const files = [['/', 'site/index.html'], ['/robots.txt', 'site/robots.txt'], ['/assets/logo.svg', 'site/assets/logo.svg']];
const settings = ['id', 'name', 'subdomain', 'domains', 'production_branch', 'source', 'deployment_configs', 'build_config', 'production_script_name', 'preview_script_name', 'uses_functions'];
const variableHeaders = new Set(['date', 'cf-ray', 'report-to', 'cf-cache-status', 'age', 'etag', 'content-length', 'server-timing']);

async function get(url, headers = {}) {
  const response = await fetch(url, { headers, redirect: 'manual', signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, `${new URL(url).pathname}: expected HTTP 200, got ${response.status}`);
  return response;
}

async function snapshot() {
  // GET must succeed before Wrangler runs: this release never creates a project.
  const response = await get(api, { Authorization: `Bearer ${token}` });
  const data = await response.json();
  assert(data.success, 'Cloudflare Pages project lookup failed');
  const project = data.result;
  assert.equal(project.name, 'resurface', 'Wrong Pages project');
  assert.equal(project.production_branch, 'main', 'Wrong production branch');
  assert(project.domains.includes('resurface.thekitchen.co'), 'Existing custom domain is missing');
  const deployment = project.canonical_deployment;
  assert.equal(deployment.environment, 'production', 'Expected a production deployment');
  assert.equal(deployment.latest_stage.status, 'success', 'Production deployment is not successful');
  const responses = {};
  for (const [route] of files) {
    const live = await get(origin + route);
    responses[route] = {
      body: await live.text(),
      headers: Object.fromEntries([...live.headers].filter(([name]) => !variableHeaders.has(name))),
    };
  }
  return { project: Object.fromEntries(settings.map(key => [key, project[key] ?? null])), deployment, responses };
}

async function report(message) {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, message + '\n\n');
}

const current = await snapshot();
if (mode === 'capture') {
  await mkdir('.wrangler', { recursive: true });
  await writeFile(baselineFile, JSON.stringify(current));
  await report(`Previous production deployment: \`${current.deployment.id}\``);
} else {
  const before = JSON.parse(await readFile(baselineFile, 'utf8'));
  assert.deepEqual(current.project, before.project, 'Pages project configuration changed');
  assert.notEqual(current.deployment.id, before.deployment.id, 'No new production deployment');
  const sha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const metadata = current.deployment.deployment_trigger.metadata;
  assert.equal(metadata.commit_hash, sha, 'Production commit does not match this checkout');
  assert.equal(metadata.branch, 'main', 'Production deployment is not from main');
  assert.equal(metadata.commit_dirty, false, 'Production deployment contains uncommitted changes');
  for (const [route, file] of files) {
    assert.deepEqual(Buffer.from(current.responses[route].body), await readFile(file), `${route}: body differs from main`);
    assert.deepEqual(current.responses[route].headers, before.responses[route].headers, `${route}: response policies changed`);
    await report(`HTTP 200 \`${route}\`: matches main; response policies unchanged.`);
  }
  assert.equal(current.responses['/robots.txt'].body, before.responses['/robots.txt'].body, 'Robots file changed');
  const robotsMeta = body => body.match(/<meta[^>]+(?:robots|googlebot)[^>]*>/gi) || [];
  assert.deepEqual(robotsMeta(current.responses['/'].body), robotsMeta(before.responses['/'].body), 'Robots meta changed');
  await report(`Verified production deployment: \`${current.deployment.id}\`, main commit \`${sha}\`, at ${origin}.`);
}
