# Engrove Measurement Signals v0.1.0

**Prototype — not metrologically validated.**

Format: 48 kHz / 16-bit signed PCM / stereo WAV.

Every file starts with:
- 2.0 s digital silence
- 0.60 s logarithmic wake chirp, 1 kHz → 5 kHz
- 32-bit BFSK acoustic ID: MAGIC 0xE7, TEST_ID, VERSION_CODE 0x01, CRC-8(poly 0x07)
- 1200 Hz = 0, 2200 Hz = 1, 80 ms/bit

Measurement payload peak: -12 dBFS.
Header peak: -18 dBFS.

Use the same unmodified file and playback path for comparative A/B/C measurements.
Disable loudness normalization / stable-volume / DSP when possible.
Start at low amplifier volume and increase only as needed for adequate SNR.

See manifest.json for exact durations and SHA-256 values.
