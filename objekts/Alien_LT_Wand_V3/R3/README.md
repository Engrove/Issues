# Alien LT tonearm wand · V3 R3

Open `Wand_V3_R3.step` as an assembly in a STEP-compatible CAD viewer. For a clear view of the shell, isolate W01 and W02. The assembly contains 27 solids, including the two shell halves, counterweight components, trim tubes and the magnetic bearing parts carried by the arm. The four-chamber counterweight is shown in one nominal balance position.

Dimensions are in millimetres. X increases from the stylus toward the counterweight, Y is transverse and Z increases upward from the record surface. View along Y for the side profile.

`Wand_V3_R3.pseudo` describes the profiles, datums, interfaces and assembly sequence. The STEP file defines the freeform surfaces. This is a design study. Fit, adhesive joints and laminate strength require hardware tests.

## Mounted 2 kHz study

The [mounted finite-element study](https://lab.engroveaudio.com/revisions/tonearm-wand/v3-r3/fe/2khz/) compares this R3 reference with the [K2 Graded 1 prototype CAD](../studies/K2_Graded_1/). The tracked torsional mode of K2 is at 2,188 Hz in the model. Lower modes at 904 and 1,053 Hz still rotate the pickup relative to its bearing. The report explains the design targets and shows the deformation of the arm, laminate shear and load in the WEST SYSTEM 105/205 bonds.

## R3 bonded assembly and WEST SYSTEM 105/205

A new analysis follows the assembled load path from the Goldring 1042 to both vertical bearing contacts. It includes elastic shells and fittings, finite-stiffness joints with WEST SYSTEM 105/205 and separate models for the adjustable insert and capsule clamp.

| Comparison | R3 model result |
|---|---|
| Pivot tube P01 bonded into its saddle | 14.4% less stylus-end bending compliance in a matched sectional model. The titanium plate changes that same measure by 0.07% and distributes the local cartridge load. |
| Adhesive film of 0.05 / 0.10 / 0.20 mm | Balanced front/rear compliance of 0.1109 / 0.1122 / 0.1142 mm/N on the same sensitivity mesh. Reducing only the P01 joint stiffness to 1% increased this compliance by 21%. |
| Reference assembly modes | 247 Hz vertical bending, 876 Hz lateral bending and 1,030 Hz pronounced torsion. A coupled bearing/twist mode at 658 Hz also transfers motion to the pickup. |
| Braid with four longitudinal UD layers | With the original ballast, the strongest single match to the reference torsion is a mixed mode at 1,790 Hz. The project's 2 kHz objective remains open. |

The first change proposed for the next revision is to provide through-clearance for the pickup screws, a defined glue space under the nut cages and washer seating on the actual REV G flange. The interference comes from intersections of the published CAD parts. The linear joint model predicts load transfer. Bond strength, bearing stiffness and damping require tests on the built assembly. [Read the illustrated report and design targets in Engrove Audio Lab](https://lab.engroveaudio.com/revisions/tonearm-wand/v3-r3/fe/).

## Earlier R3 performance study

The analysis covers everything that pitches with the wand, from the Goldring 1042 and titanium mounting plate through the carbon shell, both trim screws and the loaded capsule to the moving side of the vertical rolling bearing. The nominal stylus-to-pivot distance is 237.1 mm.

| Quantity | Calculated result |
|---|---:|
| Moving mass including the cartridge and nominal fill | 156.575 g |
| Vertical effective mass at the stylus, cartridge and mounting hardware included | 23.121 g |
| Tracking force on a level record, trims centred | 1.750 gf |
| Tracking-force change for both screws displaced 1 mm towards the rear | −0.05061 gf |
| Predicted vertical arm/cartridge resonance for a dynamic compliance of 13 to 10 mm/N | 9.18–10.47 Hz |
| Earlier model with rigid attachments and ideal carrier support, lateral and vertical bending | 296.2 Hz and 333.5 Hz |
| First torsion-dominated mode in the earlier rigid-attachment model | 1,067.4 Hz |
| Vertical and lateral stylus-point flexibility with a clamped pivot saddle | 0.06934 and 0.02431 mm/N |

The earlier rigid-attachment model falls short of the 2 kHz torsion target. Under a unit vertical front load, 46.9% of the shell’s strain energy is concentrated in the 18 mm zone around the pivot seat. The static fixture, the freely pitching assembled structure and the low-frequency cartridge suspension are separate tests. The finite-element results concern the assumed laminate and joints.

Moving the capsule vertically can leave tracking force unchanged on a level record while altering the arm's restoring moment. The two studied magnet orientations put the zero crossing of the local arm stiffness at a capsule rise of 6.93 or 8.21 mm. Cartridge suspension adds stiffness during playback. Cartridge compliance direction, actual bonded area, bearing stiffness and damping of the oil/shot fill require measurements on a prototype.

[View the R3 field plots, mesh checks and operating results in Engrove Audio Lab](https://lab.engroveaudio.com/revisions/tonearm-wand/v3-r3/fe/).
