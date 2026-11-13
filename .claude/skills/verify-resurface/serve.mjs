// Serve the real site/examples and their canonical font bytes. No build or host configuration.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../../..');
const run = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw Error('Usage: node serve.mjs <absolute run directory>');
await fs.mkdir(path.join(run, 'proof'), { recursive: true });
const htmlFiles = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith('.html')) htmlFiles.push(file);
  }
}
await walk(path.join(root, 'site'));
await walk(path.join(root, 'examples'));
const cssSources = new Set();
for (const file of htmlFiles) {
  for (const match of (await fs.readFile(file, 'utf8')).matchAll(/https:\/\/fonts\.googleapis\.com\/[^"'<> ]+/g)) cssSources.add(match[0].replaceAll('&amp;', '&'));
}
const fonts = new Map(), styles = new Map();
for (const source of cssSources) {
  const response = await fetch(source, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw Error('Canonical font CSS unavailable: ' + response.status);
  let css = await response.text();
  for (const remote of new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]))) {
    let cached = fonts.get(remote);
    if (!cached) {
      const response = await fetch(remote, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw Error('Canonical font unavailable: ' + response.status);
      cached = { id: String(fonts.size), bytes: Buffer.from(await response.arrayBuffer()), type: response.headers.get('content-type') };
      fonts.set(remote, cached);
    }
    css = css.replaceAll(remote, '/__verify/font/' + cached.id);
  }
  styles.set(source, css);
}
const types = { '.html': 'text/html; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://127.0.0.1');
    if (u.pathname === '/__verify/health') { res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify({ root, fonts: fonts.size })); }
    if (u.pathname === '/__verify/font-css') { res.setHeader('Content-Type', 'text/css'); const css = styles.get(u.searchParams.get('source')); if (!css) throw Error('Unknown canonical CSS'); return res.end(css); }
    if (u.pathname.startsWith('/__verify/font/')) { const font = [...fonts.values()].find(f => f.id === u.pathname.split('/').at(-1)); if (!font) throw Error('Unknown canonical font'); res.setHeader('Content-Type', font.type); return res.end(font.bytes); }
    const proof = u.pathname.startsWith('/__verify/proof/');
    const base = proof ? path.join(run, 'proof') : root;
    const relative = decodeURIComponent(proof ? u.pathname.slice('/__verify/proof/'.length) : u.pathname.slice(1));
    const file = path.resolve(base, relative || 'site/index.html');
    if (!file.startsWith(base + '/')) { res.writeHead(403); return res.end('Outside local root'); }
    let bytes = await fs.readFile(file);
    if (file.endsWith('.html')) {
      let html = bytes.toString('utf8');
      html = html.replace(/<link\b[^>]*rel="preconnect"[^>]*>/g, '');
      for (const source of cssSources) html = html.replaceAll(source, '/__verify/font-css?source=' + encodeURIComponent(source));
      bytes = Buffer.from(html);
    }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(bytes);
  } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 500); res.end(error.message); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
if (port <= 20000) { server.close(); throw Error('Allocated port is below 20000; restart'); }
const info = { url: `http://127.0.0.1:${port}`, pid: process.pid, root, run, fonts: fonts.size };
await fs.writeFile(path.join(run, 'run.json'), JSON.stringify(info, null, 2));
console.log(JSON.stringify(info));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
