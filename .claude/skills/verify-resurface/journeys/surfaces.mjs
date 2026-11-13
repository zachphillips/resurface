import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, expect, note, step } = args;
  const origin = await local(args);
  await loaded(page, origin + '/site/index.html');
  note('chooser hit area', await page.locator('#chooser').evaluate(e => ({ rect: e.getBoundingClientRect().toJSON(), visualViewport: { width: visualViewport.width, height: visualViewport.height }, layout: { width: innerWidth, height: innerHeight } })));
  for (const mode of ['letter', 'card', 'receipt', 'label', 'eink', 'slide', 'screen']) {
    await page.locator(`button[data-mode="${mode}"]`).click({ timeout: 5000 });
    expect(await page.locator('html').getAttribute('data-surface') === mode, 'The chosen surface renders: ' + mode);
    expect(await page.locator(`button[data-mode="${mode}"]`).getAttribute('aria-pressed') === 'true', 'The chooser reports its active state');
    expect(await page.locator('#rec-surface').textContent() === mode.toUpperCase(), 'Decision record follows the chosen surface');
    expect(await page.evaluate(() => localStorage.getItem('resurface-mode')) === mode, 'Chosen surface is saved');
    note('rendered surface', { mode, title: await page.title(), hash: new URL(page.url()).hash });
    await step(mode + ' rendition');
  }
}
