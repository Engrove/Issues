# Engrove Alien LT tonearm wand — K2 Graded 1

K2 Graded 1 is an engineering study derived from the accepted Wand V3 R3. It uses the R3 outer mould, two corrected pickup slots, a graded carbon-fibre laminate, and a removable split-clamp pitch bearing. The assembly shows the complete Goldring 1042 REV G cartridge, four leads and the counterweight capsule in the calculated playback setting. R3 retains its accepted status.

## Files and use

- [Wand_K2_Graded_1_Study.step.xz](Wand_K2_Graded_1_Study.step.xz) contains the ISO 10303-214 assembly in millimetres. It opens as 50 named components containing 86 solids.
- [Wand_K2_Graded_1_Study.pseudo](Wand_K2_Graded_1_Study.pseudo) is a plain-text design specification. It gives the coordinate system, fibre stack, zone limits, machined features, hardware, final assembly position and transfer assumptions.

Extract the XZ archive with 7-Zip or run the following command. Then open the resulting `.step` file in a CAD application that supports STEP assemblies.

```sh
xz -dk Wand_K2_Graded_1_Study.step.xz
```

The SHA-256 of the decompressed STEP is `c30f1f7f300cff19718ec62b6f85071cd351ca0c313e7bb395bbae2e94e77ad6`.

## Interpreting the model

The stylus tip sets the neutral origin. X increases toward the counterweight, Y runs across the arm and Z points up. The shell solids show the reference wall, mounting lands, pickup slots and two finished wire passages. The companion specification defines the physical cured wall on that outer mould. At the assumed 50% fibre volume, the forward axial/braid/axial stack is 0.540 mm thick, the base braid/axial/braid stack is 0.816 mm, and the aft six-ply stack is 1.632 mm. The extra aft plies taper away around the capsule with a 20–27 mm radial transition. The bearing housing and clockable insert use 7075-T6 aluminium with steel clamp screws. The shell matrix is WEST SYSTEM 105/205 epoxy.

Both trim screws are centred. The capsule is raised 1.4273 mm from its R3 reference. The model balances at 1.7500 gf with 51.8481 g of fill occupying 10.3909 mL. Four bulk solids represent the mixture in its four chambers. The nominal recipe is 47.7983 g of dry 1 mm steel shot and 4.2629 mL of oil, using 4.6 g/mL dry packing density. Check the cured part mass, actual packing density, clamp settings and stylus force on the assembled prototype.
