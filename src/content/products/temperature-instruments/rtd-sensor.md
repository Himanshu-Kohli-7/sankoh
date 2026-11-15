---
title: RTD Sensor
seoTitle: RTD Temperature Sensor (Resistance Thermometer)
metaDescription: RTD temperature sensor that measures through the change in resistance of a platinum element, giving stable, repeatable readings for process control.
updated: 2026-11-15
category: temperature-instruments
order: 2
images:
  - src: ../../../assets/products/rtd-sensor.jpg
    alt: RTD temperature sensor with a round aluminium terminal head, a chained cover and a threaded process fitting on a straight stem
summary: A temperature sensor whose platinum element changes its electrical resistance in a precise, known way as it heats, giving stable readings for control, logging and quality records.
operation: n/a
media: [Water, Steam, Oil, Air, Gas, Chemicals]
applications:
  - Chilled and hot water control in HVAC and building automation
  - Pasteurising, CIP and process temperature control in food and dairy plants
  - Reactor, vessel and heat exchanger temperatures in chemical plants
  - Oil, bearing and winding temperatures on motors and gearboxes
  - Temperature records in water treatment and industrial automation
relatedProducts:
  - temperature-instruments/temperature-transmitter
  - temperature-instruments/thermowell
  - temperature-instruments/high-temperature-sensor
  - temperature-instruments/temperature-gauge-mechanical
faqs:
  - question: Do I need 2-wire, 3-wire or 4-wire connection?
    answer: The cable itself has resistance, which adds to the reading. A 3-wire connection cancels most of that error and is the usual choice in plants. 4-wire cancels it completely for the most precise work, while 2-wire suits only very short runs.
  - question: Can I connect an RTD straight to my PLC?
    answer: Yes, if the PLC has an RTD input card of the matching type. If it only accepts a current signal, or the cable run is long, fit a temperature transmitter in the sensor head.
  - question: What does Pt100 mean?
    answer: It describes a platinum element with a resistance of 100 ohms at zero degrees Celsius, which is the most widely used type. Other values exist; your controller or transmitter must be set for the one fitted.
relatedRepair: []
todo: 'Applications and media are general typical uses (PENDING #53). Element type, wiring, sheath diameters, lengths, heads and connections supplied are not confirmed (PENDING #54). No repair or calibration link (PENDING #56).'
typicalOptions:
  - label: "Element"
    value: "Pt100 as standard; Pt1000 on request; simplex or duplex"
  - label: "Wiring"
    value: "2-wire, 3-wire or 4-wire"
  - label: "Sheath"
    value: "Stainless steel 316, 3 mm to 12 mm diameter"
  - label: "Range"
    value: "About −200 °C to 600 °C"
  - label: "Termination"
    value: "Head with terminal block, cable, or a head-mounted transmitter"
  - label: "Process connection"
    value: "Threaded, flanged or with a thermowell"
---

An RTD (resistance temperature detector) measures temperature through the electrical resistance of a fine metal element, almost always platinum. As the element warms, its resistance rises by a precise and well-documented amount. The controller or transmitter passes a small current through it, measures the resistance and works out the temperature.

Platinum is used because that change is very stable and repeatable over years of service. This makes RTDs the usual pick wherever readings feed automatic control, quality records or energy calculations within the everyday process range.

The element sits at the tip of a protective sheath. Wires run up the sheath to a terminal head, where the field cable connects or a head-mounted transmitter can be fitted. The sheath normally goes into a thermowell rather than straight into the process.
