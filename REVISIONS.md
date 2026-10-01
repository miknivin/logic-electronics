# Logic Electronics – Website Revisions

Revision list for the Logic Electronics website. Work through each item in order.

**Note for implementation (AI/dev):** Several items below — especially in the "New items from Website Report" section — may already be implemented on the live site, since the source report predates recent updates. Before implementing any point, check the current state of the site/codebase first. If a point is already done, skip it (or mark it done); do not re-implement or duplicate existing work.

## Revisions

### 1. Navigation: make menu items look clickable
- **Status:** Implemented (revision of a previous change)
- **Issue:** Menu items currently look like a plain text list, so it isn't clear they are clickable options.
- **Change:** Visually enhance the menu items so they clearly read as interactive (e.g., button/pill styling, hover and active states, pointer cursor, clear focus states).
- **Reference:** `screenshots/menu-dropdown.jpg` (Products dropdown: the links inside, e.g. Printer Sales & Repair, Copier Sales & Service, look like plain text).

### 2. Navigation: diagonal arrow on menu links
- **Status:** Implemented (revision of a previous change)
- **Change:** Add a diagonal arrow (↗) to the menu links, with a hover effect (e.g., arrow shifts/animates toward the top-right on hover).
- **Reference:** `screenshots/menu-dropdown.jpg`

### 3. Navigation: dropdown menus don't close properly
- **Status:** Implemented (revision of a previous change)
- **Issue 1:** The navigation menu stays open after an item is selected.
- **Issue 2:** If the Products menu is open and the user hovers over Services, the Products menu doesn't close, so the two dropdowns overlap.
- **Change:** Close the open dropdown when an item is selected, and close it when focus/hover moves away (only one dropdown open at a time; opening another closes the current one).
- **Reference:** `screenshots/menu-dropdown.jpg`

### 4. Products menu: restructure into four categories
- **Status:** Implemented (revision of a previous change)
- **Issue:** The Products dropdown currently has only two categories: Printers & Copiers, and Computers & Supplies. The revision calls for four categories: Sales, Rentals, PC Components, and Consumables.
- **Change:** Restructure the Products menu into those four categories, or use submenus to organize the items under them.
- **Full item list (per report, `Website_Revision_Report.pdf`):**
  - **Sales:** New Printers, Refurbished Printers, Copiers, Multifunction Printers, Scanners, Projectors, Laptops, Desktops, Custom Build PCs, UPS Systems
  - **Rentals:** Rental Printers, Rental Copiers
  - **PC Components:** Monitors, RAM, Storage (SSD & HDD), Motherboards, Processors (CPUs), Graphics Cards (GPUs), Casings/Cabinets, Cooling Systems
  - **Consumables:** Toner Cartridges, Ink Cartridges, Drum Units, Fuser Units, Maintenance/Roller Kits, Laptop & PC Batteries, Laptop Spare Parts, Laptop & Mobile Chargers, Keyboards & Mice
- **Reference:** `screenshots/menu-dropdown.jpg` (current two-column layout), `Website_Revision_Report.pdf`

### 5. Rentals: Printers & Copiers as a products page
- **Status:** Implemented (revision of a previous change)
- **Change:** Under Rentals, "Printers & Copiers" should link to its own products page (a listing page) instead of just being a menu item. The menu needs to navigate to a page like the reference.
- **Reference:** `screenshots/rentals-products-page-reference.jpg` (product listing page: "Popular Brands" sidebar, grid/list view toggle, product cards with badges such as Refurbished and Featured)

### 6. Navigation: "Printers & Copiers" as one nav item
- **Status:** Implemented (revision of a previous change)
- **Change:** Place "Printers & Copiers" as a single nav item.

### 7. Consumables: products listing page
- **Status:** Implemented (revision of a previous change)
- **Change:** Use the same design as the Rentals products page for Consumables. Clicking a consumables item (e.g., Toner Cartridges) should navigate to a listing page like the reference, showing the products.
- **Reference:** `screenshots/consumables-products-page-reference.jpg` (product listing page: "Popular Brands" sidebar, grid/list view toggle, product cards with image and title)

### 8. Services menu: avoid overcrowding with 40 items / 7 submenus
- **Status:** Implemented (revision of a previous change)
- **Issue:** Having 40 items across 7 submenus in the Services dropdown would be overcrowded.
- **Suggestion:** List only the 7 main headings in the dropdown, so clicking a heading smoothly jumps/scrolls to the relevant section on the page — similar to how the main Services page works.
- **Open question:** Decide during design/development whether to show all items or just the headings, based on how crowded it looks. Also confirm: will icons be used alongside the headings?
- **The 7 headings (per report):** Printer & Copier Services, Managed IT Services, Installation & Deployment, Network & CCTV Maintenance, UPS Services, Office Shifting & IT Relocation, Digital Services. Each has its own long sub-item list in the report — see `Website_Revision_Report.pdf` for full detail (not repeated here due to length).

### 9. Homepage: rental section image + bottom ribbon
- **Status:** Implemented (revision of a previous change)
- **Issue 1:** The image used in the Rentals section on the homepage isn't relevant.
- **Change 1:** Replace it with an image of a machine (printer/copier).
- **Issue 2:** The ribbon at the bottom of the homepage currently shows company and brand names/logos.
- **Change 2:** Replace it with images of machines and devices instead.
- **Reference:** `screenshots/homepage-hero-and-brand-ribbon.jpg` (bottom ribbon currently shows brand logos: Konica Minolta, Canon, Kyocera, Ricoh, HP, Sharp, UTAX)
- **Reference (Change 1):** `screenshots/rental-section-machine-cards-reference.jpg` (example "Printers for Rent" style: cards with machine photos, brand, model name, For Rent/New badge)

### 10. Pending items from previous revision round
- **Status:** Implemented (revision of a previous change)
- **Status note:** Development on the remaining sections still appears pending, carried over from yesterday's revision round — needs to be completed.
- **Issue:** Brand logo placement instructions from the earlier revision requests haven't been implemented yet. Relevant brand logos (e.g., Canon, HP) should appear at the bottom when navigating to the Printers section or its Service section, as previously requested.
- **Change:** Complete the pending sections from the previous revision, and add the relevant brand logos at the bottom of the Printers section and its Service section pages.

### 11. Solutions menu: display categories and products
- **Status:** Implemented (revision of a previous change)
- **Change:** In the Solutions menu (new arrivals), also display the categories and a few products from the revision list, organized nicely by category — similar to the Products menu restructuring.

### 12. Background: align "bg-circuit-light" lines for continuity (suggestion)
- **Status:** Implemented (revision of a previous change)
- **Suggestion:** Align the `bg-circuit-light` background lines across sections for better visual continuity, as shown in the reference.
- **Reference:** `screenshots/bg-circuit-light-alignment-reference.jpg`

### 13. Top bar: distinct icons for mobile and telephone numbers
- **Status:** Implemented (revision of a previous change)
- **Issue:** The mobile number and telephone (landline) number in the top bar use the same/similar phone icon.
- **Change:** Use different icons for mobile vs. telephone numbers so they're visually distinguishable.
- **Reference:** `screenshots/topbar-phone-icons-reference.jpg`

### 14. Navigation: remove standalone "Printers & Copiers" link
- **Status:** Implemented — standalone nav item removed, now safe because item 15 is fixed.
- **Update to Point 6:** Remove the standalone "Printers & Copiers" nav item (shown highlighted in the reference). The one inside the Products menu is sufficient — no need for a separate top-level link.
- **Reference:** `screenshots/remove-standalone-printers-copiers-link.jpg`
- **Contradiction (from voice note, translated):** The reasoning "the one inside Products suffices" doesn't fully hold yet — under Products > Sales, every link currently goes to the same wrong page (e.g., "New Printers" redirects to "Product Sales" and shows laptops; same for "Refurbished," etc.). So the Products menu links need to be fixed with the correct pages before the standalone "Printers & Copiers" link can safely be removed.

### 15. Products menu: links not redirecting properly
- **Status:** Implemented — each Products sub-link now opens its own filtered listing (?type=...).
- **Issue:** The Products dropdown items (under Sales, Rentals, PC Components, Consumables — e.g., New Printers, Rental Printers, Monitors, Toner Cartridges) are not properly redirected to their relevant pages. Under Sales specifically, every link currently goes to the same page (e.g., "New Printers" and "Refurbished" both redirect to "Product Sales" showing laptops).
- **Change:** Fix the links so each item navigates to its own correct, corresponding page (not a single shared page). See also Point 14 — this needs to be resolved before removing the standalone "Printers & Copiers" nav link.
- **Reference:** `screenshots/products-menu-links-not-redirecting.jpg`

### 16. Products menu: "Custom PC Builds" missing + confirms common-page redirect issue
- **Status:** Implemented — "Custom Build PCs" added under PC Components (and Sales).
- **Open question:** Confirm whether Point 15's fix matches what was actually reported (asking for confirmation on the redirect issue).
- **Issue:** Custom PC Builds is a core offering, but no link or page for it was found in the current Products menu or site — unclear if it was included in the original requirements.
- **Change:** Add a "Custom PC Builds" item/page under the Products menu (likely under PC Components).
- **Confirms:** Reiterates that currently everything redirects to a common/shared page (see Point 14 & 15).

### 17. PC Components menu: filter by component instead of common page
- **Status:** Implemented — PC Components links pre-filter the common page by component.
- **Issue:** All PC Components links (RAM, Monitors, Motherboards, GPUs, etc.) currently go to the same common page with no filtering — clicking any of them shows identical, unfiltered results.
- **Change:** Clicking "PC Components" itself can still go to the common/all-components page (that's fine), but clicking a specific item (e.g., RAM, Monitors, Motherboards, GPU) should take the user to that common page pre-filtered to show only that component's results.

### 18. Consumables menu/page: same common-page issue + tabs for navigation
- **Status:** Implemented — Consumables page has sub-category tabs; each link filters.
- **Issue:** The Consumables page has the same issue as Points 15 & 17 — clicking any consumables link (Toner Cartridges, Ink Cartridges, Drum Units, Fuser Units, Laptop & PC Batteries, etc.) leads to the same common page with no separation.
- **Change:** Create separate sections for each category (e.g., Cartridges, Fuser Units, and PC-related items like Laptop & PC Batteries).
- **Suggestion:** Add tabs at the top of the Consumables page for easier navigation between groups — e.g., Toners, Other Consumables, and PC Consumables.

### 19. Solutions menu: UPS and other links go to generic pages, not specific ones
- **Status:** Implemented — UPS and other Solutions links land on their specific content.
- **Issue:** Similar to Points 15, 17 & 18 — the UPS link under Solutions goes to a generic/variant page instead of a page specifically about UPS. Many links across the site behave the same way.
- **Change:** Each Solutions link (e.g., UPS) should go to its own dedicated page/content, not a generic placeholder.
- **Note:** This was raised while cross-checking against a report that was sent separately, which is said to be about 80% reflected in this revision doc so far — items like Products, Sales, and UPS custom billing pages are reportedly missing/not yet covered here. That report hasn't been shared in this chat — please share it (text or file) so the remaining items can be added and cross-checked.

---

## New items from Website Report (dated 16-09-2026, "Website_Revision_Report.pdf")

Cross-checked against the full report. Items already covered above are updated in place; the following are new.

### 20. Top utility bar: add telephone number
- **Change:** Add the telephone number **02 633 3364** to the top utility bar (alongside the existing mobile number and email). Relates to Point 13 (distinguishing mobile vs. telephone icons).

### 21. Navbar: center-aligned mega-menu navigation
- **Change:** Center-align the nav menu. Use a mega-menu style (categorized columns, not a long list) for dropdowns, similar to the Solutions mega-menu example in the report (columns like Security, Infrastructure, Development, Cloud Solutions for a reference site).
- **Recommended top-level structure:** Home – About Us – Products – Services – Solutions – Rentals – Contact, with the Request a Quote button.
- **Solutions menu categories (per report):**
  - **CCTV & Security:** IP & HD CCTV Systems, NVR/DVR Systems, Remote Monitoring, Access Control Systems, Door Access & Magnetic Locks, Biometric Attendance Systems, Intercom Systems
  - **Network & Data:** Structured Cabling, LAN/WAN Setup, Wi-Fi Solutions, Firewall & Security Setup, NAS & Data Storage, Network Security Solutions, Rack Installation & Organization, Server Virtualization
  - **Data Backup & Protection:** Cloud Data Backup, On-Premise Backup, Workstation Backup, NAS Backup, VM Backup, Database Backup, Video Storage & Backup, Data Loss Prevention (DLP)
  - **Communication & Power:** IP Phone Solutions, Conference Solutions, Wireless Solutions, RFID/GPS Solutions, UPS Solutions (relates to Point 19 — UPS currently goes to a generic page)
- **Rentals menu categories (per report):**
  - **Printer & Copier Rental:** Short-Term & Long-Term Rental, Monthly Printing Solutions, Corporate Printer Rental, Copier Rental, Event & Temporary Rental
  - **Managed Print Services:** Maintenance Support, Toner & Consumables Management, Pay-Per-Print Solutions
  - **Contracts:** AMC, Annual Rental Contracts, Leasing, FSMA
- **Reference:** `Website_Revision_Report.pdf` (Navbar section)

### 22. Hero section: redesign as a dynamic 3-state hero
- **Issue:** Current hero copy reads like an "About Us" intro rather than a strong landing-page hero.
- **Change:** Redesign to be shorter, more engaging, and focused on the range of solutions and UAE-wide reach. Layout and CTA position stay fixed; headline, supporting text, and image rotate through 3 states, each with its own relevant CTA:
  - **State 1 – Printers & Copiers:** Printers, Copiers, Scanners, Consumables, New & Refurbished, Repairs, AMC, Rentals, Leasing
  - **State 2 – IT Hardware & Support Solutions:** Computers, Laptops, PC Components, Monitors, Storage & RAM, Networking, Custom PC Builds, IT Equipment
  - **State 3:** A visual overview showcasing all major services
- **Reference:** `Website_Revision_Report.pdf` (Hero Section)

### 23. Hero section: move service grid to an animated ribbon
- **Issue:** The existing 2×4 services grid (Annual Maintenance, 24/7 Support, Remote Help Desk, On Site Support, Free Pickup & Delivery, Rental Facility, Office Shifting Facility, Office Equipment & Stationery) sits at the bottom of the hero and falls below the initial viewport — visitors miss it without scrolling.
- **Change:** Move it below the next section (right below the "26+ years" stats section) as a horizontally moving animated sliding ribbon.

### 24. Home page: swap "What We Do" and "Five Areas of Expertise" sections
- **Change:** Swap the order — the "Five Areas of Expertise" section ("Everything your business needs, from one partner") should appear first.

### 25. Home page: add a rental section below "What We Do"
- **Change:** Add a rental section below "What We Do" featuring a one-line ribbon gallery of printer/copier photos, plus a brief explanation of rental and AMC contract types and their benefits. Relates to Points 9 and 19 (rental imagery/cards).
- **Reference:** `Website_Revision_Report.pdf`, example site sosauh.com

### 26. Brands section: original colors + continuous sliding ribbon
- **Change:** Display brand logos in their original/brand colors by default (not monochrome). Change the display to a horizontal continuous sliding ribbon animation. Include software brand logos as well, not just hardware brands.

### 27. Add a "Our Trusted Clients" section
- **Change:** Add a new section displaying logos of prestigious/trusted clients. Use the same animation style as the Brands section, or optionally a different style. Client logos to be supplied separately.

### 28. Services page: category navigation buttons need to look interactive
- **Issue:** The category buttons on the Services page (Printing & Copier Solutions, IT Infrastructure & Support, Security & Communication, Digital Solutions, Office Supplies & Equipment) don't feel like interactive buttons.
- **Change:** Make them look and feel more interactive — e.g., a default-selected state (such as "Printing & Copier Solutions" selected by default), plus styling so the buttons stand out more.

### 29. Overall content direction (site-wide guideline)
- **Guideline:** Content across the site should be straightforward and customer-focused, easy to scan rather than paragraph-heavy, focused on what the company sells/provides/can do, and supported by clear CTAs (Request a Quote, Contact Us, Explore Services, Enquire Now). Layout/presentation details are flexible, but the site should consistently communicate that Logic Electronics provides printer, IT, office equipment, rental, and technical solutions across the UAE.

### 30. Solutions mega-menu: links not connected to relevant page content
- **Status:** Implemented — every Solutions link anchors to the matching offering.
- **Issue:** In the Solutions mega-menu (CCTV & Security, Network & Data, Backup & Protection, Communication & Power), many links redirect to the same page, with no connection between the clicked link and the content shown on the destination page.
- **Change:** Each Solutions link should navigate to a page whose content actually matches that link (e.g., "Structured Cabling" should land on Structured Cabling content, not a generic/unrelated page). Same underlying issue as Points 15, 17, 18 & 19 — applies here too.
- **Reference:** `logic-electronics-revision-screenshots/solutions-menu-links-not-connected.jpg`

---

## Closing audit (all items)

Every header navigation link was checked against the running build: **71 links, all resolve, every `#anchor` target exists.**

Every product sub-category filter was checked for silently falling back to the
unfiltered list. All now return a proper subset:

| Category | Sub-categories | Result |
| --- | --- | --- |
| Printers & Copiers | 4 | all filter |
| Sales | 10 | all filter (printer types route to Printers & Copiers) |
| Rentals | 2 | all filter |
| PC Components | 10 | all filter |
| Consumables | 9 | all filter |

Known remaining gaps, none blocking:

- **Product specifications** are deliberately empty. Publishing invented
  figures for real, named machines would be worse than showing nothing. Paste
  manufacturer spec rows into `specs` in `lib/products.ts` and the table appears.
- **One machine has no photo:** Kyocera TASKalfa 2553ci — the source catalogue
  does not list that model.
- **Non-machine photography** (toner, PC components, laptops) still uses the
  brand-styled line art in `public/imgs/products/`.
