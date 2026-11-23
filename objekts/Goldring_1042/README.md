# Goldring 1042 — REV G

External reconstruction for nominal mounting, visual review and rendering.
It is not factory CAD or a measured copy of a particular cartridge.

| File | Contents and use |
| --- | --- |
| [Goldring_1042_REV_G.step](Goldring_1042_REV_G.step) | Solid CAD assembly, 21 named and coloured parts, millimetres and Z up; stylus tip at the origin. |
| [Goldring_1042_REV_G.glb](Goldring_1042_REV_G.glb) | Coloured 3D model, metres and Y up. |
| [Goldring_1042_REV_G.pseudo](Goldring_1042_REV_G.pseudo) | REV G geometry contract plus preserved physical-behaviour specification 1.2. Its older REV D geometry audit is explicitly historical. |
| [Goldring_1042_REV_F_3x3_300dpi.png](Goldring_1042_REV_F_3x3_300dpi.png) | Nine-view render, 4800 × 3600 px at 300 dpi, of the previous revision REV F. |
| [REV_F_vy1_utkast.png](REV_F_vy1_utkast.png) | Single-view draft render of REV F. |
| README.md | File contents and use. |

Import STEP in millimetres. X points aft towards the terminals, Y is transverse
(left channel and the G1042 print at −Y), and Z points upwards. The nominal
mounting centre is (10.2, 0, 17.3) mm and the two screw centres are
(10.2, ±6.35, 17.3) mm. GLB maps CAD axes to (x, z, −y) and scales by 0.001.

The 17.3 mm height, 10.2 mm offset, 12.7 mm fixing centre and 24° vertical
tracking angle are Goldring's published values. The housing, flange,
terminals, markings and stylus region are calibrated from orthographic product
views and Goldring's to-scale dimension diagram; most values are within roughly
0.1–0.5 mm, not measured on a sample. REV G differs from REV F only in the
stylus region: 21° cantilever axis with crimped front end and taper, square
magnet tube, forward-rising underside lip, rounded nose corners and a 1.1 mm
underside height. The renders show REV F. Check physical clearances before
making mating parts. CAD volume does not establish cartridge mass, centre of
mass or inertia. Stylus parts are visual proxies; the diamond is not a resolved
Gyger S contact surface.
