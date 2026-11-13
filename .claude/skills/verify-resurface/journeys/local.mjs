export async function local({ page, context, expect, url }) {
  const base = new URL(url);
  expect(base.protocol === 'http:' && base.hostname === '127.0.0.1' && Number(base.port) > 20000, 'Use only your loopback server above port 20000');
  await context.route('**/*', route => {
    const request = new URL(route.request().url());
    return ['data:', 'about:', 'blob:'].includes(request.protocol) || request.origin === base.origin ? route.continue() : route.abort('blockedbyclient');
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  return base.origin;
}
export async function loaded(page, address) {
  await page.goto(address, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}
