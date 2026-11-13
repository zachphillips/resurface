import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, expect, note, step } = args;
  const origin = await local(args);
  await loaded(page, origin + '/site/index.html#card');
  await step('card rendition from direct link');
  await page.goto(origin + '/site/index.html#eink');
  const actual = { hash: new URL(page.url()).hash, mode: await page.locator('html').getAttribute('data-surface'), title: await page.title() };
  note('same-document surface navigation', actual);
  await step('eink hash navigation result');
  expect(actual.hash === '#eink' && actual.mode === 'eink', 'A same-document surface link updates the rendered rendition');
}
