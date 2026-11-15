---
title: I/P Converter
seoTitle: I/P Converter (Current to Pneumatic Converter)
metaDescription: I/P converter that turns a current signal from a PLC or controller into a proportional air pressure to drive pneumatic actuators and positioners.
updated: 2026-11-15
category: valve-automation-accessories
order: 3
summary: A transducer that turns an electrical current signal from a controller into a proportional air pressure that a pneumatic actuator or positioner can use.
operation: n/a
enquiry: accessory
applications:
  - Driving pneumatic control valves from a PLC or DCS current output
  - Feeding a pneumatic positioner from an electronic control loop
  - Pneumatic damper and louvre actuators in HVAC
  - Upgrading older pneumatic control loops to electronic controllers
  - Setting air pressure remotely on process equipment in industrial automation
relatedProducts:
  - valve-automation-accessories/smart-valve-positioner
  - pneumatic-actuated-valves/pneumatic-globe-control-valve
  - pneumatic-actuated-valves/pneumatic-power-cylinder-for-dampers
relatedRepair:
  - /valve-repair/positioner-repair-calibration/
faqs:
  - question: Can an I/P converter do the job of a positioner?
    answer: Not fully. A converter delivers air in proportion to the signal but never checks where the valve ended up. Where friction is high or control must be precise, a positioner is still needed, either fed by the converter or taking the electronic signal itself.
  - question: Where should it be mounted?
    answer: Close to the valve, on a bracket or panel away from heavy vibration. A short air line to the actuator keeps the response quick.
  - question: Why does the output pressure drift?
    answer: Water, oil or dirt in the supply air, a partly blocked nozzle, or a supply pressure that wanders. A filter regulator ahead of the converter and a regular calibration check keep it steady.
typicalOptions:
  - label: "Input"
    value: "4–20 mA"
  - label: "Output"
    value: "0.2–1.0 bar (3–15 psi); other ranges on request"
  - label: "Air supply"
    value: "About 1.4 bar clean, dry instrument air"
  - label: "Mounting"
    value: "Pipe, wall or DIN rail"
  - label: "Enclosure"
    value: "Weatherproof or flameproof"
---

Much of a plant's control now happens in electronics, but many valves are still moved by air. An I/P converter, short for current-to-pressure, connects the two. It takes the current signal from a controller and gives out an air pressure that rises and falls in step with it.

Inside, the current flows through a small coil that moves a flapper against a nozzle. Changing the gap changes the back-pressure, and a relay amplifies that into an output strong enough to drive an actuator or the input of a pneumatic positioner. The converter needs its own supply of clean, dry instrument air.

On a modern loop, a [smart valve positioner](/products/valve-automation-accessories/smart-valve-positioner/) often does the same job and more. An I/P converter remains the simpler choice where the valve has a plain spring-and-diaphragm actuator, or where an existing pneumatic positioner is staying in place.
