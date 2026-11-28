# Alien LT · Flow yoke R3 · M2 rod clamp

Four STEP solids cover two guide geometries and two manufacturing states. All files use millimetres. Decompress the .xz file before opening or quoting it. Choose the file marked **stock** for metal printing with subsequent precision machining.

| Guide | P2 to rod axis | Print blank | Finished machining reference |
| --- | ---: | --- | --- |
| A | 50 mm | `lt-flow-cradle-a-r3-m2-stock.step.xz` | `lt-flow-cradle-a-r3-m2-finished.step.xz` |
| B | 54 mm | `lt-flow-cradle-b-r3-m2-stock.step.xz` | `lt-flow-cradle-b-r3-m2-finished.step.xz` |

The yoke belongs to the horizontal tracking carrier. The local origin lies on the vertical P2 axis at Z 0, +X points towards the rod, and +Z points upwards. The foot axis runs along Y at X 0, Z 3.50. The two finished inner foot faces lie at Y ±19.00. The top of the annular seat lies at Z 28.00.

The printable blank has a Ø5.00 rod pilot, a solid clamp and a solid seat centre. Its pads provide stock on the two feet, central seat and clamp end faces. After printing, bore the rod seat to Ø6.06, machine the seat to Ø8.30 with a flat-bottom Ø5.70 × 3.00 recess, and finish the mating foot faces and diameters. Reference the bores to the mating datums when setting up the part.

The M2 × 0.4 screw enters from −Y, on an axis parallel to Y at X = rod axis + 5.70 and Z 46.30. The near ear has a Ø2.20 clearance hole. The far ear is shown at Ø1.60 for a cutting tap. Drill the holes with the clamp solid, tap the far side, and saw the 0.50 slot through into the rod bore last. The proposed screw length is 8 mm under the head. Use the finished file as the nominal dimensional reference. The internal thread is represented at its tap-drill diameter.

`yoke-r3-m2.pseudo` describes the geometry and machining states. These are prototype models. Verify the actual rod fit, screw head envelope, free adjustment and holding force with the chosen materials and hardware.
