/** AI-CODING NOTE: Independent PCM/header/spectrum assertions for the published
 * stimulus. A fixed digest alone is insufficient evidence of a useful signal. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { generateWave } from './generate-structure-coupling.mjs';
const arg = process.argv.indexOf('--protocol');
const protocol = JSON.parse(readFileSync(arg < 0 ? 'src/shared/structureCoupling/protocol.json' : process.argv[arg + 1], 'utf8'));
const wav = generateWave(protocol), sr = wav.readUInt32LE(24);
assert.equal(createHash('sha256').update(wav).digest('hex'), protocol.sha256);
assert.equal(wav.toString('ascii', 0, 4), 'RIFF'); assert.equal(wav.readUInt16LE(20), 1);
assert.equal(sr, 48000); assert.equal(wav.readUInt16LE(22), 2); assert.equal(wav.readUInt16LE(34), 16);
assert.equal(wav.length, 44 + 5586 * 480 * 4);
const sample = i => wav.readInt16LE(44 + i * 4) / 32768;
let peak = 0;
for (let i = 0; i < (wav.length - 44) / 4; i++) { assert.equal(wav.readInt16LE(44 + i * 4), wav.readInt16LE(46 + i * 4)); peak = Math.max(peak, Math.abs(sample(i))); }
assert.ok(Math.abs(20 * Math.log10(peak) + 12) < .01);
for (const segment of protocol.segments.filter(s => !s.name.startsWith('excitation'))) {
  for (let i = Math.round(segment.startSeconds * sr); i < Math.round(segment.endSeconds * sr); i++) assert.equal(sample(i), 0, segment.name);
}
const noiseStart = Math.round(15.86 * sr), repeatStart = Math.round(35.86 * sr);
assert.deepEqual(wav.subarray(44 + noiseStart * 4, 44 + (noiseStart + 12 * sr) * 4), wav.subarray(44 + repeatStart * 4, 44 + (repeatStart + 12 * sr) * 4));
function power(x, hz, fs) {
  const c = 2 * Math.cos(2 * Math.PI * hz / fs); let a = 0, b = 0;
  for (const value of x) { const v = value + c * a - b; b = a; a = v; }
  return a * a + b * b - c * a * b;
}
const bytes = [];
for (let byte = 0; byte < 4; byte++) {
  let value = 0;
  for (let bit = 0; bit < 8; bit++) {
    const start = Math.round((2.8 + (byte * 8 + bit) * .08 + .025) * sr);
    const x = Float64Array.from({ length: Math.round(.03 * sr) }, (_, i) => sample(start + i));
    const zero = power(x, 1200, sr), one = power(x, 2200, sr);
    assert.ok(Math.max(zero, one) > 100 * Math.min(zero, one)); value = (value << 1) | Number(one > zero);
  }
  bytes.push(value);
}
// CRC is an independently recorded protocol vector, not the generator's helper.
assert.deepEqual(bytes.slice(0, 3), [231, 6, 1]);
let crc = 0; for (const byte of bytes.slice(0, 3)) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc << 1) ^ ((crc & 128) ? 7 : 0); crc &= 255; }
assert.equal(bytes[3], crc);
// Independent Hann-windowed periodogram: pink noise has similar energy per
// octave, whereas equal-amplitude white-noise bins double it every octave.
const n = 8192, fs = 1000;
const x = Float64Array.from({ length: n }, (_, i) => sample(noiseStart + sr + i * 48) * (.5 - .5 * Math.cos(2 * Math.PI * i / (n - 1))));
const bands = [[20, 40], [40, 80], [80, 160]].map(([low, high]) => {
  let p = 0; for (let k = Math.ceil(low * n / fs); k < high * n / fs; k++) p += power(x, k * fs / n, fs); return p;
});
for (let i = 1; i < bands.length; i++) assert.ok(bands[i] / bands[0] > .75 && bands[i] / bands[0] < 1.33, `octave energy ${bands[i] / bands[0]}`);
console.log(`PASS structure-coupling WAV: SHA-256, PCM, dual mono, silent windows, repeated blocks, header CRC, pink octave energy ${bands.map(x => (x / bands[0]).toFixed(3)).join('/')}`);
