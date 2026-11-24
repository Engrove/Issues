# Engrove Audio Tools & Audio Lab

Report equipment data issues for [Engrove Audio Tools](https://engroveaudio.com/) or browse the project's published models, drawings and test signals. Explore the scratch-built turntable and its Alien LT tonearm in [Engrove Audio Lab](https://lab.engroveaudio.com).

## Project files

| Contents | Files |
| --- | --- |
| Goldring 1042 cartridge | [REV G solid CAD, 3D model, geometry description and earlier renders](objekts/Goldring_1042/) |
| Accepted mechanical drawings | [Hertz pillar with R100 cup, revision 1](objekts/Hertz_Pillar/) · [Drawing index (JSON)](objekts/drawing-index.json) |
| Measurement signals | [Five stereo WAV files, Python generator and file manifest, v0.1.0](engrove_measurement_signals_v0.1.0/) |

Each object has a folder under `objekts/`. Its `drawings/` folder holds published PDF sheets and their matching JSON files. The drawing index lists the article ID, drawing ID, revision and SHA-256 for each accepted pair. Paths in the index are relative to `objekts/`.

## Reporting data issues

Reports are reviewed here before accepted changes enter the application's data-maintenance workflow. [Open a data report](https://github.com/Engrove/Issues/issues/new/choose).

### Choose the correct form

- **Incorrect data** — an existing cartridge, tonearm, test record, null-point record, or related item contains a value that appears to be wrong.
- **Missing data** — an existing item is present, but one or more useful values are absent or incomplete.
- **Missing gear** — a cartridge, tonearm, turntable, test record, or related item is not present at all.

## Evidence policy

Preferred sources, in descending order:

1. manufacturer product page, archived manufacturer page, service manual, user manual, or official datasheet;
2. official distributor documentation reproducing manufacturer specifications;
3. independent measurement with the method and equipment stated;
4. reputable specialist publication;
5. community or forum material, clearly identified as secondary evidence.

Conflicting values are retained as review evidence rather than silently resolved. Model variants, production revisions, regional versions, and measurement frequency must be stated when relevant.

## Scope and privacy

Do not include passwords, access tokens, private correspondence, personal contact details, purchase records, or other sensitive information. Reports are public.

The issue forms cover the Engrove Audio Tools dataset. The application source is maintained privately.

## Review states

Maintainers may request more evidence, mark duplicate reports, close unverifiable claims, or accept a report for internal implementation. Acceptance means the evidence passed review; it does not guarantee an immediate production release.
