/** AI-CODING NOTE: Guided listening stimulus, not an automatically timed test.
 * No identification beep. Keep files versioned; never overwrite old releases. */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
export function generateGuidedBass() {
  const sampleRate = 48000, durationSeconds = 74, frequencies = [40, 50, 63, 80, 100, 125, 160, 200];
  const peak = 10 ** (-12 / 20), frames = durationSeconds * sampleRate;
  const wav = Buffer.alloc(44 + frames * 4), steps = frequencies.map((hz, i) => ({ hz, startSeconds: 5 + i * 8, endSeconds: 11 + i * 8 }));
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22); wav.writeUInt32LE(sampleRate, 24); wav.writeUInt32LE(sampleRate * 4, 28);
  wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(frames * 4, 40);
  for (const step of steps) for (let i = 0; i < 6 * sampleRate; i++) {
    const edge = Math.min(i, 6 * sampleRate - 1 - i), fade = .25 * sampleRate;
    const envelope = edge < fade ? .5 - .5 * Math.cos(Math.PI * edge / fade) : 1;
    const value = Math.round(32767 * peak * envelope * Math.sin(2 * Math.PI * step.hz * i / sampleRate));
    const offset = 44 + (step.startSeconds * sampleRate + i) * 4;
    wav.writeInt16LE(value, offset); wav.writeInt16LE(value, offset + 2);
  }
  return { wav, manifest: { schema: 'engrove.guided-bass.v1', filename: 'ENGROVE-GUIDED-BASS-STEPS-v1.0.0.wav', sampleRate, durationSeconds,
    channels: 2, bitsPerSample: 16, tonePeakDbfs: -12, plateauRmsDbfs: -15.0103, fadeSeconds: .25,
    identification: 'none-manual-start', synchronization: 'not-inferred-by-app', steps,
    sha256: createHash('sha256').update(wav).digest('hex'),
    interpretation: 'Guided exploration. Frequencies describe emitted tones, not the phone motion bandwidth. Equal digital level is not equal SPL. Do not raise volume until phone motion appears.' } };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = process.argv[2] ?? 'public/signals'; mkdirSync(output, { recursive: true });
  const { wav, manifest } = generateGuidedBass();
  writeFileSync(resolve(output, manifest.filename), wav);
  writeFileSync(resolve(output, manifest.filename.replace('.wav', '.manifest.json')), JSON.stringify(manifest, null, 2) + '\n');
  writeFileSync(resolve(output, manifest.filename.replace('.wav', '.README.md')), '# Guided bass steps 1.0.0\n\n74 seconds, no ID beep. 5 seconds quiet, 40/50/63/80/100/125/160/200 Hz for 6 seconds each with 2-second gaps, then quiet. Peak -12 dBFS, plateau RMS -15.01 dBFS, gentle 250 ms fades.\n\nDownload and play on an external device. In Vibration choose Start manually without ID after stillness. Tap Start manual observation, then play the file from the beginning. Finish when playback ends, or let the 90-second recording end. Download the observation JSON before leaving; manual observations are not saved in A/B History.\n\nStart at low volume. Equal digital levels are not equal acoustic pressure. Do not compensate for missing deep bass by continually raising volume. Stop for distress, rattling loudspeaker drivers or excessive excursion. Keep the turntable stopped and stylus parked. A phone showing 2–23 Hz cannot resolve the emitted 40–200 Hz vibrations reliably; this is guided exploration, not a frequency-response or feedback-margin measurement.\n\nSHA-256: ' + manifest.sha256 + '\n');
  console.log(JSON.stringify(manifest));
}
