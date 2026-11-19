---
title: Temperature Switch
seoTitle: Temperature Switch (Thermostat)
metaDescription: Temperature switch that operates a contact at a set temperature, for high-temperature trips, heater and fan control and alarms on tanks, lines and motors.
updated: 2026-11-19
category: temperature-instruments
order: 7
summary: A switch that changes over an electrical contact once the temperature it senses passes a set point, so a heater, fan, pump or alarm reacts without an operator.
operation: n/a
media: [Water, Oil, Steam, Air]
applications:
  - High-temperature trips on boilers, thermic fluid heaters and furnaces
  - Heater on/off control on tanks, baths and storage vessels
  - Cooling fan and pump control on oil coolers, transformers and gearboxes
  - Low-temperature alarms and frost protection on chilled water in HVAC
  - Hot water, steam and exhaust temperature interlocks in industrial automation
relatedProducts:
  - pressure-instruments/pressure-switch
  - temperature-instruments/temperature-gauge-mechanical
  - temperature-instruments/thermowell
relatedRepair: []
faqs:
  - question: What is the difference between a temperature switch and a temperature transmitter?
    answer: A switch gives a simple on/off contact at one set point and often needs no power to sense. A transmitter gives a continuous 4–20 mA reading for a controller or PLC, which can then set as many alarms as it needs.
  - question: What is the dead band?
    answer: The difference between the operating temperature and the reset temperature. A few degrees of dead band keeps a heater or fan from switching rapidly when the temperature hovers near the set point. Some switches have an adjustable dead band; manual-reset types stay tripped until someone presses a button.
  - question: Should the bulb go in a thermowell?
    answer: On pressurised lines and vessels, yes. The well lets the switch be removed without draining the system and protects the bulb from flow and corrosion, at the cost of a slightly slower response.
  - question: Can it switch a heater directly?
    answer: Only a small one within the contact rating. Larger heaters, pumps and fans are switched through a contactor or relay that the temperature switch controls.
typicalOptions:
  - label: "Sensing"
    value: "Liquid or vapour filled bulb and capillary, bimetal, or electronic with RTD"
  - label: "Set point range"
    value: "Adjustable ranges spanning about –30 °C to 300 °C; higher with special bulbs"
  - label: "Contact"
    value: "SPDT or DPDT microswitch; manual reset for safety trips"
  - label: "Mounting"
    value: "Direct stem, remote bulb on capillary, or surface (clamp-on) sensing"
  - label: "Process connection"
    value: "½\" BSP / NPT stem, or bulb in a thermowell"
  - label: "Enclosure"
    value: "Weatherproof die-cast housing; flameproof versions for hazardous areas"
---

A temperature switch watches one temperature and changes over a contact when it passes a set point. In the common mechanical design, a bulb filled with liquid or vapour sits in the process. As the temperature rises, the fill expands and pushes on a bellows or diaphragm in the switch housing. At the set point that movement snaps a microswitch over. A knob or screw sets the operating temperature.

Electronic versions use an RTD or thermistor with a relay output, and they often show the temperature as well. Bimetal switches, which bend a strip of two metals, are used where the switch can sit on or very close to the hot surface.

It is the temperature counterpart of a [pressure switch](/products/pressure-instruments/pressure-switch/): simple, and fitted wherever a single limit has to be enforced. For a reading as well, add a [temperature gauge](/products/temperature-instruments/temperature-gauge-mechanical/). On a pressurised line, mount the bulb in a [thermowell](/products/temperature-instruments/thermowell/).
