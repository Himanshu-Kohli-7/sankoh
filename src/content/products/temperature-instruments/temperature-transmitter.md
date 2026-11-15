---
title: Temperature Transmitter
seoTitle: Temperature Transmitter for RTD and Thermocouple Inputs
metaDescription: Temperature transmitter that turns an RTD or thermocouple signal into a robust standard output for a PLC, DCS or controller over long cable runs.
updated: 2026-11-15
category: temperature-instruments
order: 4
images:
  - src: ../../../assets/products/temperature-transmitter.png
    alt: Temperature transmitter in a round field housing with a display window, joined by a flexible armoured capillary to a straight sensing probe
summary: An electronic unit that reads an RTD or thermocouple, corrects and scales the reading, and sends it as a standard signal that holds up over long cables and electrical noise.
operation: n/a
media: [Water, Steam, Oil, Air, Gas, Chemicals]
applications:
  - Temperature loops into PLC and DCS systems in industrial automation
  - Chilled water, supply air and return air control in HVAC and building automation
  - Steam and condensate temperatures in boiler houses
  - Process and effluent temperatures in water treatment
  - Remote tanks and long cable runs where a raw sensor signal would pick up noise
relatedProducts:
  - temperature-instruments/rtd-sensor
  - temperature-instruments/high-temperature-sensor
  - temperature-instruments/thermowell
  - pressure-instruments/pressure-transmitter
faqs:
  - question: Where is the transmitter mounted?
    answer: Three common ways. A small puck fits inside the terminal head of the sensor. A field housing, often with a display, sits on or near the sensor. A rail-mounted unit lives in the control panel. The first two keep the weak sensor signal short.
  - question: What signal does it send?
    answer: Most often a two-wire current loop that both carries the reading and powers the transmitter. Some also add digital communication for set-up and diagnostics. Tell us what your controller accepts.
  - question: Can one transmitter work with different sensors?
    answer: Many universal transmitters accept several RTD and thermocouple types and are set up for the one fitted. The range can usually be adjusted too, which keeps spares simple.
relatedRepair: []
todo: 'Low-resolution photo (225px): ask for a larger one (PENDING #55). Applications and media are general typical uses (PENDING #53). Mounting forms, inputs, outputs, protocols and housings supplied are not confirmed (PENDING #54). No repair or calibration link (PENDING #56).'
typicalOptions:
  - label: "Input"
    value: "Pt100 RTD, thermocouple, or universal"
  - label: "Output"
    value: "4–20 mA two-wire; HART on smart models"
  - label: "Mounting"
    value: "Head mounted, DIN rail or field housing with display"
  - label: "Isolation"
    value: "Galvanically isolated versions"
  - label: "Configuration"
    value: "By PC software, HART communicator or push-buttons"
---

A temperature transmitter takes the small signal from an RTD or thermocouple and turns it into a standard output that a PLC, DCS, controller or recorder can use. The raw signal from a sensor is weak and easily disturbed by long cables and electrical noise from motors and drives. The transmitter's output is strong, so it carries cleanly over long distances.

Inside, the electronics measure the sensor, correct for its known behaviour and for lead-wire or cold-junction effects, and scale the result to the range you set. The output then spans the lowest to the highest temperature of interest.

Some transmitters sit in the sensor's terminal head; others come in a field housing with a local display, or mount on a rail in the panel. A version with a remote probe on a capillary or cable lets the electronics sit away from heat or vibration.
