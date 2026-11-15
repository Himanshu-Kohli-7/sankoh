# Image sources and credits

Where every product photo that is not from the old site came from. Rules are in CLAUDE.md §2.3.

- **Partner photos are provisional.** They may be used only once Flowtech, UPC and Stolzel have each agreed in writing (docs/PENDING.md). Do not launch before that.
- **Openly licensed photos** must be public domain, CC0, CC BY or CC BY-SA (never NC or ND), show the same kind of product and show no brand. They are also listed in `src/config/imageCredits.ts`, which feeds the `/image-credits/` page. Add both entries in the same commit as the image.
- **A photo that fails the mark check falls back to the placeholder drawing**, never to a marked photo.
- Nameplate and dial data visible in a photo is never printed as a spec.

## 1. Openly licensed (credited on /image-credits/)

| File (`src/assets/products/`) | Used on | Title | Author | Licence | Source | Changes |
|---|---|---|---|---|---|---|
| `thermowell.png` | Thermowell | Thermowell | Taintedkernel | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | https://commons.wikimedia.org/wiki/File:Thermowell.png | Resized and converted for the web |

## 2. Authorised partner photos (provisional until written permission)

### Flowtech Measuring Instruments Pvt Ltd — flowtech-instruments.com

| File | Used on | Source page | Image URL |
|---|---|---|---|
| `electromagnetic-flow-meter.jpg` | Electromagnetic Flow Meter, home hero | /product/electromagnetic-flow-meter/ | /wp-content/uploads/2023/09/FlowTech-FlowMag-900-ELECTROMAGNETIC-FLOWMETER-Series.jpg |
| `ultrasonic-flow-meter.jpg` | Ultrasonic Flow Meter | /product/ultrasonic-flow-meter/ | /wp-content/uploads/2024/07/Ultrasonic-Flowmeter.jpg |
| `ultrasonic-level-transmitter.jpg` | Ultrasonic Level Transmitter | /product/ultrasonic-level-transmitter/ | /wp-content/uploads/2024/07/Ultrasonic-Level-Transmitter.jpg |
| `side-mounted-level-transmitter.jpg` | Side Mounted Level Transmitter | /product/side-mounted-level-switches/ | /wp-content/uploads/2023/11/Side-Mounted-Level-Switches.jpg |
| `pressure-transmitter.jpg` | Pressure Transmitter | /product/smart-pressure-transmitter/ | /wp-content/uploads/2024/07/Smart-Pressure-Transmitter.jpg |
| `conductivity-tds-analyzer.jpg` | Conductivity & TDS Analyzer | /product/conductivity-meter/ | /wp-content/uploads/2024/07/Conductivity-Meter.jpg |
| `ph-transmitter.jpg` | pH Transmitter | /product/ph-analyzer/ | /wp-content/uploads/2024/09/pH-Analyzer1-2.jpg |

### UPC Instruments Pvt Ltd — unitechmeter.com

| File | Used on | Source page | Image URL |
|---|---|---|---|
| `mechanical-water-meter.webp` | Mechanical Water Meter | /product/water-meter/woltman-type-water-meter-cold | /storage/products/upc-wmc-110-67dd58886a1a4.webp |
| `dissolved-oxygen-do-analyzer.webp` | Dissolved Oxygen (DO) Analyzer | /product/analytical-instruments/do-meter | /storage/products/do-130-69c3828a83dab.webp |
| `ball-valve-flanged-end.webp` | Ball Valve – Flanged End | /product/valves/wcb-two-piece-flange-end-ball-valve | /storage/products/upc-feb-466-6818678982993.webp |

### Stolzel — stolzelvalves.com

| File | Used on | Image URL |
|---|---|---|
| `limit-switch-box.png` | Limit Switch Box | /aboutpic/Limit Switch.png |
| `motorised-globe-valve.png` | Motorised Globe Valve | /aboutpic/04e8f8e8-ed4b-4a9e-8675-9803154f8703.png |
| `pneumatic-power-cylinder-for-dampers.jpg` | Pneumatic Power Cylinder for Dampers | /aboutpic/pc.jpg |

Not used from the Stolzel site, because they do not pass CLAUDE.md §2.3: the Electric Gate Valve image (file name says it is AI-generated), the positioner image (another maker's product), and the gearbox, air filter regulator, butterfly valve and angle seat valve images (file names point to other makers or marketplaces).

## 3. From the old site (`legacy/`), newly put to use

| File | Used on | Legacy file | Note |
|---|---|---|---|
| `pilot-operated-piston-type-steam-solenoid-valve.png` | Pilot Operated Piston Type Steam Solenoid Valve | `Automated_Valves/ssv.png` | Stolzel mark. Coil plate data is not printed as a spec |
| `bod-sensor.webp` | BOD Sensor | `Level Transmitter/online-bod-sensor-.webp` | No marks |

## 4. Removed

| Photo | Why | Now shows |
|---|---|---|
| Electromagnetic Flow Meter, Mechanical Water Meter, Ultrasonic Level Transmitter, Side Mounted Level Transmitter (old) | Scientific Devices mark | Partner photos above |
| Pressure Gauge (old) | Scientific Devices mark; no partner or openly licensed photo without a brand found | Placeholder drawing |
| Pneumatic Power Cylinder for Dampers (old) | Third-party name on the position indicator box | Stolzel photo above |

## 5. Still on the placeholder drawing

No partner photo and no openly licensed photo without a visible brand was found for: Pressure Gauge, Pressure Switch, Siphon, pH Sensor, Turbidity Analyzer, Mass Flow Meter, Flush Bottom Valve, Pneumatic Plug Valve, Motorised Plug Valve, Motorised Gate Valve, Pulse Jet Dust Collector Valve, Solenoid Coils, Smart Valve Positioner, I/P Converter, Air Release Valve, Position Feedback & Local Control Units. Wikimedia Commons was searched for each; the results were antique or branded items, diagrams, or unrelated photos.
