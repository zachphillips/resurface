import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { local, loaded } from './local.mjs';
export async function journey(args) {
  const { page, expect, note, step } = args;
  const origin = await local(args);
  const run = process.env.VERIFY_RESURFACE_RUN;
  expect(run && path.isAbsolute(run), 'Set VERIFY_RESURFACE_RUN to the launch directory');
  for (const spec of [
    { name: 'recipe', file: 'recipe-to-fridge-eink/out/eink-fridge/recipe-panel.html', width: 648, height: 480, threshold: '55%' },
    { name: 'receipt', file: 'agent-dashboard-to-receipt/out/thermal-receipt/fleet-strip.html', width: 384, height: 3000, threshold: '60%' }
  ]) {
    await page.setViewportSize({ width: spec.width, height: spec.height });
    await loaded(page, origin + '/examples/' + spec.file);
    await step(spec.name + ' original canvas');
    const source = path.join(run, 'proof', spec.name + '-rgb.png');
    const mono = path.join(run, 'proof', spec.name + '-1bit.png');
    await page.screenshot({ path: source });
    execFileSync('convert', [source, '-threshold', spec.threshold, '-depth', '1', mono]);
    const actual = execFileSync('identify', ['-format', '%w %h %[bit-depth] %[colors]', mono], { encoding: 'utf8' }).trim();
    note('true-fidelity raster', { surface: spec.name, expected: { width: spec.width, height: spec.height }, actual, file: mono });
    expect(actual.startsWith(`${spec.width} ${spec.height} 1 `), 'The raster preserves actual device pixels and 1-bit depth');
    await loaded(page, origin + '/__verify/proof/' + path.basename(mono));
    await step(spec.name + ' 1-bit device proof');
  }
}
