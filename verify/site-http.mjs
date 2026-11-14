// Drive the real local runtime, including the boundary around private repo files.
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.HOSTING_CHECK_ORIGIN || 'http://127.0.0.1:21134';
const deadline = Date.now() + 90_000;
let ready = false;
while (Date.now() < deadline) {
  try {
    ready = (await fetch(origin)).status === 200;
    if (ready) break;
  } catch {}
  await new Promise(resolve => setTimeout(resolve, 500));
}
assert(ready, `Local Wrangler did not become ready at ${origin}`);

for (const [path, file] of [['/', 'site/index.html'], ['/assets/logo.svg', 'site/assets/logo.svg']]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, `${path} must load`);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(file), `${path} must preserve the original asset`);
  console.log(`200 ${path}: matches source bytes`);
}
const redirect = await fetch(origin + '/index.html', { redirect: 'manual' });
assert.equal(redirect.status, 307, 'index.html must redirect');
assert.equal(new URL(redirect.headers.get('location'), origin).pathname, '/', 'index.html redirects to root');
console.log('307 /index.html -> /');

for (const path of ['/missing-hosting-check', '/README.md', '/wrangler.jsonc', '/.assetsignore', '/.git/config', '/verify/site-hosting.mjs']) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, `${path} must stay outside the public site`);
  console.log(`404 ${path}`);
}
