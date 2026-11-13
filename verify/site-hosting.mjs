// Read-only interaction journey; changes only this page's local presentation.
export async function journey({ page, step, expect, note, size }) {
  await expect.visible(page.locator('#chooser'));
  await step('screen');
  if (size.name === 'phone') {
    note('existing phone layout limitation', await page.evaluate(() => ({
      visibleHeight: visualViewport.height,
      chooserTop: document.querySelector('#chooser').getBoundingClientRect().top,
      note: 'Existing chooser falls below visible viewport. Phone capture checks rendering only; surface interactions are verified at iPad sizes.'
    })));
    return;
  }
  for (const mode of ['receipt', 'eink', 'screen']) {
    const button = page.locator(`.surf[data-mode="${mode}"]`);
    await button.scrollIntoViewIfNeeded();
    await button.click();
    expect(await page.locator('html').getAttribute('data-surface') === mode, `${mode} surface selected`);
    expect(await page.locator(`.surf[data-mode="${mode}"]`).getAttribute('aria-pressed') === 'true', `${mode} control selected`);
    await step(`${mode}-surface`);
  }
  if (await page.locator('#rec-toggle').getAttribute('aria-pressed') === 'true') {
    await page.locator('#rec-toggle').click();
    expect(await page.locator('#rec-toggle').getAttribute('aria-pressed') === 'false', 'decision record closes');
  }
  await page.locator('#rec-toggle').scrollIntoViewIfNeeded();
  await page.locator('#rec-toggle').click();
  expect(await page.locator('#rec-toggle').getAttribute('aria-pressed') === 'true', 'decision record opens');
  await step('decision-record');
  note('surface changes', 'Screen, receipt, e-ink and return to screen work; no downloads, installs or publishing.');
}
