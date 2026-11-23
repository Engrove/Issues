# Goldring 1042 — REV E

External photo-based reconstruction for nominal mounting and visual review.
It is not factory CAD or a measured copy of a particular cartridge.

| File | Contents and use |
| --- | --- |
| [Goldring_1042_REV_E.step](Goldring_1042_REV_E.step) | Solid CAD assembly, millimetres and Z up; stylus tip at the origin. |
| [Goldring_1042_REV_E.glb](Goldring_1042_REV_E.glb) | Coloured 3D model, metres and Y up. |
| [Goldring_1042_REV_E.pseudo](Goldring_1042_REV_E.pseudo) | Current geometry contract plus preserved physical-behaviour specification 1.2. Its older REV D geometry audit is explicitly historical. |
| README.md | File contents and use. |

Import STEP in millimetres. X points aft towards the terminals, Y is transverse,
and Z points upwards. The nominal mounting centre is (10.2, 0, 17.3) mm and the
two screw centres are (10.2, ±6.35, 17.3) mm. GLB maps CAD axes to (x, z, −y)
and scales by 0.001.

The rounded exterior, D42 seam, contact panel, markings and visible underside
have been revised using photographs. External contours, small details and the
modelled 2.8 mm hole clearance remain estimates. Check physical clearances
before manufacturing mating parts. CAD volume does not establish cartridge
mass, centre of mass or inertia. The diamond is a visual proxy, not a resolved
Gyger S contact surface. Apply the behaviour specification only within its
stated evidence and validity limits; its REV D audit does not validate REV E.
