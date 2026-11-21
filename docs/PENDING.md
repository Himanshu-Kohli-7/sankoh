# Pending

Only what the site cannot be finished or launched without, plus real fact questions. Image, description, type, option and application choices are made with best judgement and are not listed here (CLAUDE.md §10).

How to use: when something is confirmed, tell Claude "X is confirmed: …". It updates CLAUDE.md §4, `site.ts` and the content, and removes the line here.

## Needed before launch

| # | Item | What the site does until then | Who |
|---|---|---|---|
| 1 | Domain email (e.g. info@sankohtech.com) | Uses sankoh.techsol@gmail.com from `site.ts` | You / company |
| 2 | Google Business Profile URL | Map link uses a Google Maps search for the address | You |
| 3 | LinkedIn, IndiaMART and other profile URLs | `sameAs` in the structured data is empty | Company |
| 3a | Latitude and longitude of the Google Business Profile pin (right-click the pin in Google Maps → copy the coordinates) | `geo` is left out of the LocalBusiness structured data (`site.pending.geo` in `site.ts`) | You |
| 4 | GA4 ID (then mark `click_call`, `click_whatsapp`, `download_catalogue`, `generate_lead` as key events in GA4), Search Console and Bing verification. Netlify env vars: `TURNSTILE_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`. Turnstile widget hostnames must include `www.sankohtech.com` (and `*.netlify.app` for deploy previews) | Turnstile site key is in `site.ts`. GA4 empty: analytics off. Without the env vars the quote form shows "Please call us" and logs the lead | You |
| 4a | The old site's `index.html` (branch `master`) carries `google-site-verification` `h9uoNpgYEd0oiQ6efmhi0RXsxttM0ZDs72BKsxMpHb4` and GA4 `G-RH50RQ1ZL1`. Confirm both belong to an account you control. If so, put them in `site.ts` (`searchConsoleVerification`, `ga4MeasurementId`) so the existing Search Console property stays verified at launch and analytics history continues | Both empty: no verification tag, no analytics. If the property is verified only by this meta tag, it loses verification when the new site goes live | You |
| 5 | **Written permission from Flowtech, UPC and Stolzel** to show their product photos. A two-line email from each is enough. **Do not launch without all three.** Logo permission confirmed by the user on 18 Nov 2026 (company holds written permission from all three partners); the photo part is covered by the same statement but the product photos in use are still listed in `docs/IMAGE-CREDITS.md` §2 | Logos shown: Flowtech (SVG) and UPC (PNG) from their own sites. Stolzel's site has no logo file (its header is styled text), so Stolzel stays a text name until the company supplies a logo file | Company |
| 6 | Catalogue PDF for `public/downloads/sankoh-technical-solutions-catalogue.pdf`. **`reference/catalogue.pdf` cannot be published** (checked 15 Nov 2026): it carries a former contact's name, title, mobile number and email (none in CLAUDE.md §4), the banned availability wording (CLAUDE.md §2.5), servo drive and HMI repair, vibration sensors, a "valve management system" for compliance and "one of the most respected brands". No prices. Need a corrected file with only the CLAUDE.md §4 contacts | Catalogue card and download links stay hidden until a clean file is in `public/downloads/` (they appear automatically) | Company |
| 8 | **Testimonials need company confirmation before launch**: each person quoted must have agreed to be named (name, role, company). Logo permission confirmed by the user on 18 Nov 2026 (client and partner logos: all `logoPermission` flags are true). **Launch blocker** | Testimonials (`src/content/reviews/`) stay as they are; not changed until confirmed | Company |

## Fact questions

| # | Question | What the site does until answered |
|---|---|---|
| 7 | Sanjay Kohli to confirm the privacy policy line "We do not sell your details or pass them to anyone for their own marketing." | The line is on /privacy-policy/ (standard wording, approved in principle); remove it if he does not agree |

## Confirmed (in CLAUDE.md §4)

- Address: 69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab (current address, confirmed 19 Nov 2026; replaces the former first-floor unit everywhere)
- Primary phone and WhatsApp +91 98884 91527; sales backup line +91 98779 38373; proprietor, client reviews and logos, repair turnaround (typically 2–3 days)
- Own brand Sankoh® only; authorised partner of Stolzel, UPC and Flowtech Measuring Instruments Pvt Ltd; Scientific Devices is no longer a partner
- Office hours Monday to Saturday, 9:30 AM to 6:30 PM, Sunday closed (Google Business Profile); "Urgent breakdown support 7 days a week, Sundays included" (never 24/7, round the clock or 365 days; never "7-day breakdown support")
- Repair scope: valves of any make (manual and automated, with actuators and cylinders), positioners, VFDs of any make (ABB, Danfoss and all other makes); no servo drive or HMI repair; on-site repair offered
- Warranty: 6 months on repaired valves and positioners, 3 months on repaired VFDs, 1 year on new products
- Services: technical advice; setting up and commissioning valve and automation systems for factories
- Steam traps are sold; vibration sensors are not
