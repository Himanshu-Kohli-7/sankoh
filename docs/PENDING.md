# Pending

Only what the site cannot be finished or launched without, plus real fact questions. Image, description, type, option and application choices are made with best judgement and are not listed here (CLAUDE.md §10).

How to use: when something is confirmed, tell Claude "X is confirmed: …". It updates CLAUDE.md §4, `site.ts` and the content, and removes the line here.

## Needed before launch

| # | Item | What the site does until then | Who |
|---|---|---|---|
| 1 | Domain email (e.g. info@sankohtech.com) | Uses sankoh.techsol@gmail.com from `site.ts` | You / company |
| 2 | Google Business Profile URL | Map link uses a Google Maps search for the address | You |
| 3 | LinkedIn, IndiaMART and other profile URLs | `sameAs` in the structured data is empty | Company |
| 4 | GA4 ID (then mark `click_call`, `click_whatsapp`, `download_catalogue`, `generate_lead` as key events in GA4), Search Console and Bing verification. Netlify env vars: `TURNSTILE_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`. Turnstile widget hostnames must include `www.sankohtech.com` (and `*.netlify.app` for deploy previews) | Turnstile site key is in `site.ts`. GA4 empty: analytics off. Without the env vars the quote form shows "Please call us" and logs the lead | You |
| 5 | **Written permission from Flowtech, UPC and Stolzel** to show their product photos and logos. A two-line email from each is enough. **Do not launch without all three** | Partner photos are in use provisionally (list in `docs/IMAGE-CREDITS.md` §2); partner logos are not shown, only text names | Company |
| 6 | Catalogue PDF for `public/downloads/sankoh-technical-solutions-catalogue.pdf`. **`reference/catalogue.pdf` cannot be published** (checked 15 Nov 2026): it carries a former contact's name, title, mobile number and email (none in CLAUDE.md §4), the banned availability wording (CLAUDE.md §2.5), servo drive and HMI repair, vibration sensors, a "valve management system" for compliance and "one of the most respected brands". No prices. Need a corrected file with only the CLAUDE.md §4 contacts | Catalogue card and download links stay hidden until a clean file is in `public/downloads/` (they appear automatically) | Company |

## Fact questions

| # | Question | What the site does until answered |
|---|---|---|
| 7 | Sanjay Kohli to confirm the privacy policy line "We do not sell your details or pass them to anyone for their own marketing." | The line is on /privacy-policy/ (standard wording, approved in principle); remove it if he does not agree |

## Confirmed (in CLAUDE.md §4)

- Primary phone and WhatsApp +91 98884 91527; sales backup line +91 98779 38373; proprietor, client reviews and logos, repair turnaround (typically 2–3 days)
- Own brand Sankoh® only; authorised partner of Stolzel, UPC and Flowtech Measuring Instruments Pvt Ltd; Scientific Devices is no longer a partner
- Office hours Monday to Saturday, 9:30 AM to 6:30 PM, Sunday closed (Google Business Profile); "Urgent breakdown support 7 days a week" (never 24/7, round the clock or 365 days)
- Repair scope: valves of any make (manual and automated, with actuators and cylinders), positioners, VFDs of any make (ABB, Danfoss and all other makes); no servo drive or HMI repair; on-site repair offered
- Warranty: 6 months on repaired valves and positioners, 3 months on repaired VFDs, 1 year on new products
- Services: technical advice; setting up and commissioning valve and automation systems for factories
- Steam traps are sold; vibration sensors are not
