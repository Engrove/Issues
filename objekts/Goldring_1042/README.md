# Goldring 1042 — REV D

This folder contains a 3D reconstruction of the Goldring 1042 cartridge for tonearm and headshell layout, together with a physical-behaviour specification.

| File | Contents and use |
|---|---|
| [Goldring_1042_REV_D.step](Goldring_1042_REV_D.step) | Solid CAD assembly for importing into a mechanical design. Units: millimetres; Z up. |
| [Goldring_1042_REV_D.glb](Goldring_1042_REV_D.glb) | Coloured version of the same model for a glTF/GLB-compatible 3D viewer. Units: metres; Y up. |
| [goldring1042_behavior.pseudo](goldring1042_behavior.pseudo) | Language-neutral description of geometry, mechanics, groove contact, electrical behaviour and model limits. It is a specification, not executable simulation code. |

## Using the models

Download the desired file and import it at its declared scale. In the STEP model the nominal stylus tip is at `(0, 0, 0)`. X points towards the rear terminals, Y is transverse and Z points upwards. The mounting datum is `(10.2, 0, 17.3)` mm; the two mounting-hole centres are `(10.2, ±6.35, 17.3)` mm. The GLB uses the equivalent axis mapping `(x, z, -y)` and converts millimetres to metres.

Use the model as a cartridge envelope and mounting reference when planning an assembly. It is a reconstruction, not factory CAD or a fully measured specimen. Outer details are partly estimated, and the visible diamond is a simplified shape. Check critical clearances against the actual cartridge before manufacturing.

Read the pseudocode when defining physical behaviour for a future simulation. Measured observations, manufacturer values, assumptions and unknown parameters are distinguished. Mass distribution, damping and microscopic contact geometry are not fully identified. Its evidence references use permanent links to the supporting files, so no additional local files are required to read the specification.
