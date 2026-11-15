---
title: High Temperature Sensor
seoTitle: High Temperature Sensor for Furnaces, Flues and Exhausts
metaDescription: High temperature sensors for furnaces, kilns, flue gas ducts, exhausts and hot air, where the heat is beyond what everyday process sensors can take.
updated: 2026-11-15
category: temperature-instruments
order: 3
images:
  - src: ../../../assets/products/high-temperature-sensor.webp
    alt: High temperature probe with a bent metal sheath, a threaded compression fitting and a braided metal lead ending in two spade terminals
summary: A temperature sensor built for heat beyond the everyday process range, such as furnaces, kilns, flues and exhausts, most often working as a thermocouple.
operation: n/a
media: [Air, Gas, Steam]
applications:
  - Furnace, kiln and oven temperature control
  - Boiler flue gas and stack temperatures
  - Engine and generator exhaust monitoring
  - Hot air ducts, dryers and heat treatment lines
  - Molten metal, glass and plastic processing
relatedProducts:
  - temperature-instruments/rtd-sensor
  - temperature-instruments/temperature-transmitter
  - temperature-instruments/thermowell
faqs:
  - question: Why is a thermocouple usually chosen for high temperatures?
    answer: Its junction is simple and robust and certain metal pairs keep working well beyond the limit of resistance sensors. It also responds quickly. The trade-off is slightly less precision and stability than an RTD at moderate temperatures.
  - question: Can I join the sensor to the controller with ordinary copper cable?
    answer: Not for a thermocouple. Every joint between different metals creates its own small voltage, so the run back to the controller uses extension or compensating cable matched to the thermocouple type.
  - question: What protects the sensor in a furnace or flue?
    answer: A metal or ceramic protection tube chosen for the temperature and the atmosphere. Ash, sulphur and reducing gases attack some materials, so tell us what the gas contains as well as how hot it gets.
relatedRepair: []
todo: 'Written about high-temperature sensing in general; thermocouples are named only as the usual type, not as a type the company supplies (PENDING #54). Unreadable engraving on the photo sheath: confirm it is not a third-party mark (PENDING #55). Applications and media are general typical uses (PENDING #53). No repair or calibration link (PENDING #56).'
typicalOptions:
  - label: "Sensor type"
    value: "Thermocouple types K, N, R, S or B, by temperature"
  - label: "Range"
    value: "To about 1200 °C with base-metal types; to 1600 °C and above with noble-metal types"
  - label: "Protection tube"
    value: "Heat-resistant alloy, or ceramic for the highest temperatures"
  - label: "Construction"
    value: "Mineral insulated, or beaded wire in a tube"
  - label: "Termination"
    value: "Connection head, with compensating cable to the instrument"
---

A high temperature sensor measures heat in places that would quickly damage an everyday process sensor: furnaces, kilns, flue ducts, engine exhausts and hot air streams. It needs materials that survive the heat, a sheath or protection tube suited to the gases around it, and an output the controller can read.

The usual type is the thermocouple. Two wires of different metals are joined at the tip. Heating that junction produces a small voltage, and the size of the voltage depends on the difference in temperature between the tip and the cold end at the instrument. Different metal pairs are standardised for different temperature bands, and each is identified by a letter code.

The signal is small, so the controller, indicator or transmitter must be set for the exact type fitted, and cold-end compensation corrects for the temperature at the terminals.
