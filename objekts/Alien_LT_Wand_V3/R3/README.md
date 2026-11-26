# Alien LT tonearm wand · V3 R3

Open `Wand_V3_R3.step` as an assembly in a STEP-compatible CAD viewer. For a clear view of the shell, isolate W01 and W02. The assembly contains 27 solids, including the two shell halves, counterweight components, trim tubes and the magnetic bearing parts carried by the arm. The four-chamber counterweight is shown in one nominal balance position.

Dimensions are in millimetres. X increases from the stylus toward the counterweight, Y is transverse and Z increases upward from the record surface. View along Y for the side profile.

`Wand_V3_R3.pseudo` describes the profiles, datums, interfaces and assembly sequence. The STEP file defines the freeform surfaces. This is a design study. Fit, adhesive joints and laminate strength require hardware tests.

## R3 performance study

The analysis covers everything that pitches with the wand, from the Goldring 1042 and titanium mounting plate through the carbon shell, both trim screws and the loaded capsule to the moving side of the vertical rolling bearing. The nominal stylus-to-pivot distance is 237.1 mm.

| Quantity | Calculated result |
|---|---:|
| Moving mass including the cartridge and nominal fill | 156.575 g |
| Vertical effective mass at the stylus, cartridge and mounting hardware included | 23.121 g |
| Tracking force on a level record, trims centred | 1.750 gf |
| Tracking-force change for both screws displaced 1 mm towards the rear | −0.05061 gf |
| Predicted vertical arm/cartridge resonance for a dynamic compliance of 13 to 10 mm/N | 9.18–10.47 Hz |
| First installed lateral and vertical bending modes, ideal carrier support | 296.2 Hz and 333.5 Hz |
| First torsion-dominated installed mode | 1,067.4 Hz |
| Vertical and lateral stylus-point flexibility with a clamped pivot saddle | 0.06934 and 0.02431 mm/N |

The mounted model falls short of the 2 kHz torsion target. Under a unit vertical front load, 46.9% of the shell’s strain energy is concentrated in the 18 mm zone around the pivot seat. The static fixture, the freely pitching assembled structure and the low-frequency cartridge suspension are separate tests. The finite-element results concern the assumed laminate and joints.

Moving the capsule vertically can leave tracking force unchanged on a level record while altering the arm's restoring moment. The two studied magnet orientations put the zero crossing of the local arm stiffness at a capsule rise of 6.93 or 8.21 mm. Cartridge suspension adds stiffness during playback. Cartridge compliance direction, actual bonded area, bearing stiffness and damping of the oil/shot fill require measurements on a prototype.

[View the R3 field plots, mesh checks and operating results in Engrove Audio Lab](https://lab.engroveaudio.com/revisions/tonearm-wand/v3-r3/fe/).
