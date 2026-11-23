# Goldring 1042 — REV F

External reconstruction for nominal mounting, visual review and rendering.
It is not factory CAD or a measured copy of a particular cartridge.

| File | Contents and use |
| --- | --- |
| [Goldring_1042_REV_F.step](Goldring_1042_REV_F.step) | Solid CAD assembly, 21 named and coloured parts, millimetres and Z up; stylus tip at the origin. |
| [Goldring_1042_REV_F.glb](Goldring_1042_REV_F.glb) | Coloured 3D model, metres and Y up. |
| [Goldring_1042_REV_F.pseudo](Goldring_1042_REV_F.pseudo) | REV F geometry contract plus preserved physical-behaviour specification 1.2. Its older REV D geometry audit is explicitly historical. |
| README.md | File contents and use. |

Import STEP in millimetres. X points aft towards the terminals, Y is transverse
(left channel and the G1042 print at −Y), and Z points upwards. The nominal
mounting centre is (10.2, 0, 17.3) mm and the two screw centres are
(10.2, ±6.35, 17.3) mm. GLB maps CAD axes to (x, z, −y) and scales by 0.001.

The 17.3 mm height, 10.2 mm offset and 12.7 mm fixing centre are Goldring's
published values. The housing, flange, terminals and markings are calibrated
from orthographic product views and Goldring's to-scale dimension diagram;
most of these values are within roughly 0.1–0.5 mm, not measured on a sample.
The housing uses flat faces and radii only, which removes the surface waviness
of REV E. Check physical clearances before making mating parts. CAD volume does
not establish cartridge mass, centre of mass or inertia. The diamond is a
visual proxy, not a resolved Gyger S contact surface. Apply the behaviour
specification only within its stated evidence and validity limits.
