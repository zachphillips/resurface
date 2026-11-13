import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, context, expect, note, step } = args;
  const origin = await local(args);
  const health = await (await context.request.get(origin + '/__verify/health')).json();
  const run = process.env.VERIFY_RESURFACE_RUN;
  expect(run && path.isAbsolute(run), 'Set VERIFY_RESURFACE_RUN to the launch directory');
  const failures = [];
  const sources = [
    ['01-the-long-meander', 'paper-letter', 1],
    ['02-last-bus-out-of-calloway', 'paper-letter', 1],
    ['03-the-orchard-waltz', 'paper-letter', 1],
    ['repertoire-cards', 'index-cards', 4]
  ];
  for (const [name, surface, expectedPages] of sources) {
    await page.setViewportSize(surface === 'paper-letter' ? { width: 816, height: 1056 } : { width: 480, height: 1300 });
    await loaded(page, `${origin}/examples/lyrics-to-letter-and-cards/out/${surface}/${name}.html`);
    await page.emulateMedia({ media: 'print' });
    const file = path.join(run, 'proof', name + '.pdf');
    await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
    const info = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
    const pages = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
    note('actual printed PDF', { name, pages, expectedPages, file, pageSize: info.match(/^Page size:\s+(.+)$/m)?.[1], fontFilesCached: health.fonts });
    execFileSync('pdftoppm', ['-r', '96', '-png', file, path.join(run, 'proof', name)]);
    await page.emulateMedia({ media: 'screen' });
    await step(name + ' source preview');
    const rasters = (await fs.readdir(path.join(run, 'proof'))).filter(f => f.startsWith(name + '-') && f.endsWith('.png')).sort();
    for (const raster of rasters) {
      await loaded(page, origin + '/__verify/proof/' + raster);
      await step(raster + ' printed raster');
    }
    if (pages !== expectedPages) failures.push(`${name}: ${pages} printed pages, expected ${expectedPages}`);
  }
  expect(failures.length === 0, failures.join('; ') || 'Each song fits one letter page and the deck has four cards');
}
