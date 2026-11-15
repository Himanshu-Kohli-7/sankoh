---
title: Pressure Transmitter
seoTitle: Pressure Transmitter for Process and Utility Lines
metaDescription: Pressure transmitter that converts line pressure into a continuous signal for a PLC, DCS or controller, for monitoring, control and data logging.
updated: 2026-11-15
category: pressure-instruments
order: 3
images:
  - src: ../../../assets/products/pressure-transmitter.jpg
    alt: "Pressure transmitter with a round field housing, a display window and a threaded process connection"
summary: An electronic instrument that measures pressure continuously and sends it as a standard signal to a PLC, controller or recorder, often with a local display as well.
operation: n/a
media: [Water, Steam, Air, Oil, Gas, Chemicals]
applications:
  - Constant-pressure pumping with a VFD in water treatment and building water supply
  - Steam header and boiler pressure control
  - Compressed air network monitoring and compressor sequencing
  - Hydraulic and process pressure logging in industrial automation
  - Tank level from the pressure at the base of the tank (hydrostatic level)
relatedProducts:
  - pressure-instruments/differential-pressure-transmitter
  - pressure-instruments/pressure-switch
  - pressure-instruments/pressure-gauge
  - flow-meters/vortex-flow-meter
faqs:
  - question: What output signal does a pressure transmitter give?
    answer: The most common is a two-wire current loop, where the current carries the reading and also powers the transmitter. Voltage outputs and digital communication are also available. Tell us what your PLC or controller accepts.
  - question: Can a pressure transmitter measure tank level?
    answer: Yes, on an open tank. The pressure at the bottom rises with the height of liquid above it, so a transmitter at the base, set up for the liquid's density, reads level directly. A closed, pressurised tank needs a differential pressure transmitter instead.
  - question: How is it protected on steam or hot lines?
    answer: The same way as a gauge, with a siphon or impulse line that lets condensate cool before it reaches the sensor. Check the process temperature limit of the transmitter when you enquire.
  - question: What does "turndown" mean on a transmitter?
    answer: It is how far the measuring range can be narrowed from the sensor's maximum while staying accurate. A high turndown lets one model cover many ranges, which helps with spares.
relatedRepair: []
todo: 'No photo: the legacy photo shows a third-party maker''s logo on the display, so the page uses the placeholder drawing (PENDING #11, #50). Applications and media are general typical uses (PENDING #48). Ranges, outputs, protocols, enclosures and hazardous-area versions supplied are not confirmed (PENDING #49). No repair or calibration link (PENDING #52).'
typicalOptions:
  - label: "Ranges"
    value: "From a few mbar up to 600 bar; gauge, absolute or compound"
  - label: "Output"
    value: "4–20 mA two-wire; HART, or 0–10 V"
  - label: "Accuracy"
    value: "From ±0.5% to ±0.075% of span"
  - label: "Wetted parts"
    value: "Stainless steel 316L diaphragm; Hastelloy on request"
  - label: "Connection"
    value: "½\" BSP / NPT, flush diaphragm or sanitary clamp"
  - label: "Options"
    value: "Local display, diaphragm seal, flameproof or intrinsically safe"
---

A pressure transmitter measures pressure and sends it as an electrical signal, so the reading can be used far from where it is taken. It is how a control system sees pressure: to run a pump at constant pressure, sequence compressors, hold a steam header steady or record a process for later.

At its heart is a sensor that flexes very slightly under pressure. Strain gauges bonded to a diaphragm, or a capacitive or piezoresistive cell, turn that flexing into a small electrical change. The electronics correct it for temperature, scale it to the set range and send it out as a standard signal.

Gauge pressure transmitters measure against atmosphere and absolute types against a vacuum. Choose the range, process connection and wetted materials to suit the media, and the housing to suit where it will be mounted.
