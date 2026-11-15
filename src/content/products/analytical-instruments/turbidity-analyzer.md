---
title: Turbidity Analyzer
seoTitle: Online Turbidity Analyzer for Water and Effluent
metaDescription: Online turbidity analyzer that measures the cloudiness of water from scattered light, for filtration, clarifiers, drinking water and effluent checks.
updated: 2026-11-15
category: analytical-instruments
order: 7
summary: An online analyzer that measures how cloudy water is by the light scattered from suspended particles, giving a continuous check on filtration and clarity.
operation: n/a
enquiry: analytical
media: [Water]
applications:
  - Filter outlet and clarifier overflow in water treatment plants
  - Drinking water distribution and storage
  - Raw water intakes, to warn of rising silt after rain
  - Final effluent from sewage and effluent treatment plants
  - Product water on RO plants and water ATMs
relatedProducts:
  - analytical-instruments/conductivity-tds-analyzer
  - analytical-instruments/cod-sensor
  - analytical-instruments/dissolved-oxygen-do-analyzer
faqs:
  - question: What does NTU mean?
    answer: Nephelometric turbidity unit, the standard unit for turbidity measured by scattered light. Clear treated water reads very low, while raw river water after rain or untreated effluent reads far higher. Give us the range you expect.
  - question: Why do air bubbles cause high readings?
    answer: Bubbles scatter light just as particles do. Sample lines and flow cells are designed to let air escape before the measurement, and immersion probes should sit where the water is free of entrained air.
  - question: Is turbidity the same as suspended solids?
    answer: Related but not the same. Turbidity measures the optical effect of particles, while suspended solids is their weight. Some analyzers estimate suspended solids from turbidity using a correlation for the specific water.
relatedRepair: []
todo: 'No photo yet: placeholder drawing (PENDING #11). Applications and media are general typical uses; water ATMs is a company-stated application (PENDING #53). Low-range (flow cell) or high-range (immersion) versions, outputs and cleaning options supplied are not confirmed (PENDING #54). No repair or calibration link (PENDING #56).'
typicalOptions:
  - label: "Method"
    value: "90° scattered light (nephelometric) or surface scatter"
  - label: "Range"
    value: "0–10 NTU for drinking water up to 0–4000 NTU for effluent"
  - label: "Installation"
    value: "Flow cell with a bubble trap for low range; immersion for high range"
  - label: "Cleaning"
    value: "Wiper or air jet"
  - label: "Outputs"
    value: "4–20 mA, relays, Modbus"
---

A turbidity analyzer measures how cloudy water is. Fine particles of silt, clay, organic matter or microbes scatter light, and the more there are, the cloudier the water. Turbidity is the quickest way to see whether filtration and settling are doing their job.

The usual method shines a beam of light into the sample and measures the light scattered at right angles by suspended particles. More scattered light means higher turbidity. Some designs add detectors at other angles to cancel out colour in the water and fouling of the optics.

Low-range analyzers for treated and drinking water normally draw a sample through a small flow cell, where bubbles can escape before measurement. Immersion probes, often with a wiper, are used for raw water, sludge and effluent. The transmitter shows the value, sends it on to a PLC and can raise an alarm when it rises.
