import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, context, expect, note, step, size } = args;
  const origin = await local(args);
  await loaded(page, origin + '/site/index.html');
  await expect.visible(page.getByRole('heading', { name: 'Responsive beyond the viewport.', exact: true }));
  expect((await context.request.get(origin + '/site/assets/logo.svg')).ok(), 'The canonical logo loads');
  await step('screen homepage');
  await page.getByRole('link', { name: 'Install the skill', exact: true }).click();
  await expect.visible(page.getByRole('heading', { name: 'Install it, then talk to it', exact: true }));
  expect(new URL(page.url()).hash === '#install', 'Install link reaches the real section');
  await step('installation instructions reached');
  for (const section of ['how', 'surfaces', 'examples']) {
    await page.locator('#' + section).scrollIntoViewIfNeeded();
    await step(section + ' section');
  }
  const geometry = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, visualViewport: { width: visualViewport.width, height: visualViewport.height }, overflow: [...document.querySelectorAll('body *')].map(e => ({ element: e.tagName + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' ? '.' + e.className.replaceAll(' ', '.') : ''), x: e.getBoundingClientRect().x, right: e.getBoundingClientRect().right, width: e.getBoundingClientRect().width })).filter(e => e.width && (e.x < -1 || e.right > document.documentElement.clientWidth + 1)).slice(0, 15) }));
  note('screen geometry', { requested: size.width, ...geometry });
  expect(geometry.width <= size.width && geometry.scroll <= size.width, 'The screen rendition fits the requested device width');
}
