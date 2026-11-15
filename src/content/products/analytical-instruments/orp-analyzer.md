---
title: ORP Analyzer
seoTitle: ORP Analyzer (Redox Meter) for Water Treatment
metaDescription: ORP analyzer for online redox measurement in disinfection, cooling water, effluent and plating. Platinum or gold electrode, with relays for dosing.
updated: 2026-11-15
category: analytical-instruments
order: 8
summary: An online instrument that measures oxidation-reduction potential in millivolts, showing how strongly a water is oxidising or reducing.
operation: n/a
enquiry: analytical
media: [Water, Chemicals]
applications:
  - Controlling chlorine and other oxidant dosing in water disinfection
  - Swimming pools and cooling towers
  - Chromium reduction and cyanide destruction in plating effluent
  - Protecting RO membranes by checking dechlorination
  - Aeration and odour control in sewage treatment
relatedProducts:
  - analytical-instruments/ph-transmitter
  - analytical-instruments/chlorine-analyzer
  - analytical-instruments/ph-sensor
relatedRepair: []
faqs:
  - question: What does an ORP reading actually tell me?
    answer: It is the net oxidising or reducing strength of everything dissolved in the water, in millivolts. A high positive value means an oxidising water, as after chlorination. A low or negative value means a reducing water. It does not say how much of any one chemical is present.
  - question: Is ORP the same as a chlorine measurement?
    answer: No. ORP rises with chlorine but also changes with pH and with other oxidants and contaminants, so the same millivolt value can mean different chlorine levels. ORP is a good control signal for whether disinfection is effective. To report chlorine in mg/L, use a chlorine analyzer.
  - question: Why measure pH alongside ORP?
    answer: Many redox reactions shift with pH, and the working set point in millivolts is only valid at the pH it was established for. Treatment steps such as chromium reduction are controlled on both, so a controller that reads pH and ORP together is common.
  - question: How is an ORP electrode checked?
    answer: It is not calibrated like a pH electrode. It is checked in a standard redox solution of known millivolt value, and the metal tip is cleaned if the reading is slow or off. A fouled platinum surface is the usual cause of drift.
typicalOptions:
  - label: "Range"
    value: "Typically −2000 to +2000 mV"
  - label: "Electrode"
    value: "Platinum band or pin as standard; gold for cyanide and some reducing duties"
  - label: "Reference"
    value: "Gel-filled or refillable, with a junction to suit dirty samples"
  - label: "Outputs"
    value: "4–20 mA, relays for dosing pumps and alarms, RS-485 Modbus"
  - label: "Mounting"
    value: "Panel or wall controller; inline, immersion or flow-cell electrode"
  - label: "Combined units"
    value: "pH and ORP on one controller"
---

ORP stands for oxidation-reduction potential, also called redox potential. An ORP analyzer measures it with an electrode that has an inert metal tip, usually platinum, and a reference cell. Oxidising substances in the water pull electrons from the metal and reducing substances give them up, and the resulting voltage against the reference is the reading.

The value of the measurement is that it responds to chemical activity directly. In disinfection, it shows whether the water is oxidising enough to kill organisms, whatever the dose was. In effluent treatment, it marks the point where a reduction or oxidation reaction is complete, so chemical is not wasted. A controller with relays uses the signal to start and stop dosing pumps.

The electrode looks much like a pH electrode and fits the same holders, and many controllers accept either. See the [pH transmitter](/products/analytical-instruments/ph-transmitter/) for the pH side, and the [chlorine analyzer](/products/analytical-instruments/chlorine-analyzer/) where a true chlorine figure is needed.
