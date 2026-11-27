# Alien LT mechanism · Flow R1 · Yoke R2

Two single-part STEP files contain the revised yoke and magnet arm of the Flow R1 horizontal tracking mechanism. Use `lt-flow-cradle-a-r2.step` with guide A and `lt-flow-cradle-b-r2.step` with guide B. Each file holds one closed solid. The [Flow R1 assemblies](../) one folder up still contain the R1 yoke. Swapping in R2 at the same pose moves no other part.

Dimensions are in millimetres. The part frame is the yoke's own body frame: the origin lies on the vertical P2 pivot axis at Z 0 of the Flow R1 assembly frame, +X points along the magnet arm towards P3, Y is transverse and Z points up. In the assemblies the part is rotated about Z to the carrier yaw and translated to P2 in plan. The guide-rod bore is centred at X 50 mm for A and X 54 mm for B.

R2 changes the form only. The foot discs that meet the wand bridge at Y ±19 mm, the flat seat under the link eye at Z 28 mm, the Ø6.06 mm rod bore, its clamp slit and the clamp-screw axis keep their R1 positions and sizes. The yoke is a lofted superelliptic section with pivot hubs. The arm tapers conically towards the magnet rod. Rounds measure 5 mm at the arm root, 3.5 mm at the rod boss and 3 mm at the hubs.

This is a design study. Material, wall structure, mass and the effect on the mechanism's horizontal dynamics have not been validated on hardware.
