/** AI-CODING NOTE: Deterministic public WAV generator. No audio hardware or
 * credentials. Existing release assets are immutable. A normal build verifies
 * the pinned SHA-256; --write-reference is only for creating a new version. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export function crc8(bytes) {
  let crc = 0;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = ((crc & 128) ? (crc << 1) ^ 7 : crc << 1) & 255;
  }
  return crc;
}
function inverseFft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len *= 2) {
    const a = 2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a), half = len / 2;
    for (let base = 0; base < n; base += len) {
      let r = 1, m = 0;
      for (let j = 0; j < half; j++) {
        const u = base + j, v = u + half;
        const vr = re[v] * r - im[v] * m, vi = re[v] * m + im[v] * r;
        re[v] = re[u] - vr; im[v] = im[u] - vi; re[u] += vr; im[u] += vi;
        const next = r * wr - m * wi; m = r * wi + m * wr; r = next;
      }
    }
  }
  for (let i = 0; i < n; i++) re[i] /= n;
  return re;
}
export function makePink(protocol, seconds = 12) {
  const { sampleRate, stimulus: s } = protocol, n = s.fftSize;
  if (n < sampleRate * seconds || (n & (n - 1))) throw Error('Invalid pink-noise transform size.');
  const re = new Float64Array(n), im = new Float64Array(n);
  let state = s.seed >>> 0;
  const random = () => { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
  // Fixed spectral magnitudes proportional to 1/sqrt(f), independent phases.
  // Negative bins are the conjugates: the inverse transform is real-valued.
  for (let k = Math.ceil(s.lowHz * n / sampleRate); k <= Math.floor(s.highHz * n / sampleRate); k++) {
    const phase = 2 * Math.PI * random(), amplitude = 1 / Math.sqrt(k);
    re[k] = re[n - k] = amplitude * Math.cos(phase);
    im[k] = amplitude * Math.sin(phase); im[n - k] = -im[k];
  }
  const raw = inverseFft(re, im).subarray(0, Math.round(seconds * sampleRate));
  const fade = Math.round(s.fadeSeconds * sampleRate);
  let peak = 0;
  for (let i = 0; i < raw.length; i++) {
    const edge = Math.min(i, raw.length - 1 - i);
    if (edge < fade) raw[i] *= .5 - .5 * Math.cos(Math.PI * edge / fade);
    peak = Math.max(peak, Math.abs(raw[i]));
  }
  const gain = 10 ** (s.peakDbfs / 20) / peak;
  return Float64Array.from(raw, x => x * gain);
}
export function generateWave(protocol) {
  const sr = protocol.sampleRate, frames = Math.round(protocol.durationSeconds * sr);
  if (sr !== 48_000 || protocol.channels !== 2 || protocol.bitsPerSample !== 16) throw Error('Unsupported WAV format.');
  const mono = new Float64Array(frames), h = protocol.header;
  const headerPeak = 10 ** (h.peakDbfs / 20);
  function tone(startSeconds, duration, fn, fadeSeconds = .02) {
    const start = Math.round(startSeconds * sr), count = Math.round(duration * sr), fade = Math.round(fadeSeconds * sr);
    for (let i = 0; i < count; i++) {
      const edge = Math.min(i, count - 1 - i), window = edge < fade ? .5 - .5 * Math.cos(Math.PI * edge / fade) : 1;
      mono[start + i] = headerPeak * fn(i / sr) * window;
    }
  }
  const ratio = Math.log(5_000 / 1_000);
  tone(2, .6, t => Math.sin(2 * Math.PI * 1_000 * .6 / ratio * (Math.exp(t * ratio / .6) - 1)));
  const packet = [h.magic, h.testId, h.version]; packet.push(crc8(packet));
  for (let i = 0; i < 32; i++) {
    const bit = (packet[i >> 3] >> (7 - (i % 8))) & 1, frequency = bit ? h.oneHz : h.zeroHz;
    tone(h.bitsStartSeconds + i * h.bitSeconds, h.bitSeconds, t => Math.sin(2 * Math.PI * frequency * t));
  }
  const pink = makePink(protocol);
  for (const segment of protocol.segments.filter(x => x.name.startsWith('excitation-'))) {
    if (Math.abs(segment.endSeconds - segment.startSeconds - 12) > 1e-9) throw Error('Noise block must be 12 seconds.');
    mono.set(pink, Math.round(segment.startSeconds * sr));
  }
  const wav = Buffer.alloc(44 + frames * 4);
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
  wav.writeUInt32LE(sr, 24); wav.writeUInt32LE(sr * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(frames * 4, 40);
  for (let i = 0; i < frames; i++) {
    if (!Number.isFinite(mono[i]) || Math.abs(mono[i]) >= 1) throw Error('Invalid or clipping output.');
    const pcm = Math.max(-32768, Math.min(32767, Math.round(mono[i] * 32767)));
    wav.writeInt16LE(pcm, 44 + i * 4); wav.writeInt16LE(pcm, 46 + i * 4);
  }
  return wav;
}
export function writeAssets(protocolPath, output, writeReference = false) {
  const protocol = JSON.parse(readFileSync(protocolPath, 'utf8'));
  const wav = generateWave(protocol), sha256 = createHash('sha256').update(wav).digest('hex');
  if (writeReference) { protocol.sha256 = sha256; writeFileSync(protocolPath, JSON.stringify(protocol, null, 2) + '\n'); }
  else if (protocol.sha256 !== sha256) throw Error(`WAV integrity mismatch: expected ${protocol.sha256}, generated ${sha256}`);
  mkdirSync(output, { recursive: true });
  writeFileSync(resolve(output, protocol.filename), wav);
  writeFileSync(resolve(output, `${protocol.id}.manifest.json`), JSON.stringify({ ...protocol, fileBytes: wav.length }, null, 2) + '\n');
  writeFileSync(resolve(output, `${protocol.id}.README.md`), `# Engrove Structure Coupling v1.0.0\n\nControlled phone-sensor comparison stimulus: 48 kHz / PCM16 / stereo dual mono / 55.86 s.\n\n- Identifiable chirp + BFSK header: E7 / 06 / 01 / CRC-8 (polynomial 07, init 00, MSB first).\n- 10 s background; 12 s 20–200 Hz pink noise; 8 s quiet; identical 12 s pink noise; 8 s recovery.\n- Noise peak −12 dBFS, 250 ms fades. Start at low playback volume. Never change gain within a comparison.\n- Keep the turntable stopped and stylus parked for the phone-vibration protocol.\n- Use the same phone, position, speaker path and level. The app identifies the recorded header and checks the input level.\n- An input microphone provides relative dBFS, not SPL. Phone sensor bandwidth and anti-aliasing are not independently validated.\n- Structural response is not the phono chain’s feedback margin. Peaks do not establish a resonance mechanism or cause.\n- This new signal does not replace ENGROVE-ISOLATION-v0.1.0.wav, whose sweep serves a different investigation.\n\nSHA-256: ${sha256}\n\nThe manifest provides sample-exact windows. This is software-qualified and not metrologically validated.\n`);
  return { filename: protocol.filename, bytes: wav.length, sha256 };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = name => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1]; };
  const here = dirname(fileURLToPath(import.meta.url));
  const protocolPath = resolve(arg('--protocol') ?? resolve(here, '../src/shared/structureCoupling/protocol.json'));
  const output = resolve(arg('--out') ?? resolve(here, '../public/signals'));
  console.log(JSON.stringify(writeAssets(protocolPath, output, process.argv.includes('--write-reference')), null, 2));
}
