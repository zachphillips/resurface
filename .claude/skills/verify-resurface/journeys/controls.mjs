import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, expect, note, step } = args;
  const origin = await local(args);
  await loaded(page, origin + '/site/index.html#card');
  expect(await page.locator('html').getAttribute('data-surface') === 'card', 'A direct surface hash opens its rendition');
  await step('direct card link');
  await page.goto(origin + '/__verify/health');
  await loaded(page, origin + '/site/index.html');
  expect(await page.locator('html').getAttribute('data-surface') === 'card', 'The saved choice returns on a fresh navigation');
  await page.goto(origin + '/__verify/health');
  await loaded(page, origin + '/site/index.html#eink');
  expect(await page.locator('html').getAttribute('data-surface') === 'eink', 'An explicit hash overrides the saved choice');
  await page.keyboard.press('1');
  expect(await page.locator('html').getAttribute('data-surface') === 'screen', 'Keyboard shortcut returns to screen');
  const toggle = page.locator('#rec-toggle');
  if (await toggle.getAttribute('aria-pressed') === 'true') await toggle.click({ timeout: 5000 });
  await toggle.click({ timeout: 5000 });
  await expect.visible(page.locator('#record'));
  expect(!(await page.locator('#record').getAttribute('class')).split(' ').includes('hide'), 'The decision record opens');
  await step('decision record open');
  await page.keyboard.press('r');
  expect((await page.locator('#record').getAttribute('class')).split(' ').includes('hide'), 'Keyboard closes the record');
  await step('decision record dismissed');
  note('saved state read back', await page.evaluate(() => ({ mode: localStorage.getItem('resurface-mode'), hash: location.hash })));
}
