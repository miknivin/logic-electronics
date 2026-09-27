# Logic Electronics – Website Revisions

Revision list for the Logic Electronics website. Work through each item in order.

## Revisions

### 1. Navigation: make menu items look clickable
- **Issue:** Menu items currently look like a plain text list, so it isn't clear they are clickable options.
- **Change:** Visually enhance the menu items so they clearly read as interactive (e.g., button/pill styling, hover and active states, pointer cursor, clear focus states).
- **Reference:** `screenshots/menu-dropdown.jpg` (Products dropdown: the links inside, e.g. Printer Sales & Repair, Copier Sales & Service, look like plain text).

### 2. Navigation: diagonal arrow on menu links
- **Change:** Add a diagonal arrow (↗) to the menu links, with a hover effect (e.g., arrow shifts/animates toward the top-right on hover).
- **Reference:** `screenshots/menu-dropdown.jpg`

### 3. Navigation: dropdown menus don't close properly
- **Issue 1:** The navigation menu stays open after an item is selected.
- **Issue 2:** If the Products menu is open and the user hovers over Services, the Products menu doesn't close, so the two dropdowns overlap.
- **Change:** Close the open dropdown when an item is selected, and close it when focus/hover moves away (only one dropdown open at a time; opening another closes the current one).
- **Reference:** `screenshots/menu-dropdown.jpg`

### 4. Products menu: restructure into four categories
- **Issue:** The Products dropdown currently has only two categories: Printers & Copiers, and Computers & Supplies. The revision calls for four categories: Sales, Rentals, PC Components, and Consumables.
- **Change:** Restructure the Products menu into those four categories, or use submenus to organize the items under them.
- **Reference:** `screenshots/menu-dropdown.jpg` (current two-column layout)

### 5. Rentals: Printers & Copiers as a products page
- **Change:** Under Rentals, "Printers & Copiers" should link to its own products page (a listing page) instead of just being a menu item. The menu needs to navigate to a page like the reference.
- **Reference:** `screenshots/rentals-products-page-reference.jpg` (product listing page: "Popular Brands" sidebar, grid/list view toggle, product cards with badges such as Refurbished and Featured)

### 6. Navigation: "Printers & Copiers" as one nav item
- **Change:** Place "Printers & Copiers" as a single nav item.

### 7. Consumables: products listing page
- **Change:** Use the same design as the Rentals products page for Consumables. Clicking a consumables item (e.g., Toner Cartridges) should navigate to a listing page like the reference, showing the products.
- **Reference:** `screenshots/consumables-products-page-reference.jpg` (product listing page: "Popular Brands" sidebar, grid/list view toggle, product cards with image and title)

### 8. Services menu: avoid overcrowding with 40 items / 7 submenus
- **Issue:** Having 40 items across 7 submenus in the Services dropdown would be overcrowded.
- **Suggestion:** List only the 7 main headings in the dropdown, so clicking a heading smoothly jumps/scrolls to the relevant section on the page — similar to how the main Services page works.
- **Open question:** Decide during design/development whether to show all items or just the headings, based on how crowded it looks. Also confirm: will icons be used alongside the headings?

### 9. Homepage: rental section image + bottom ribbon
- **Issue 1:** The image used in the Rentals section on the homepage isn't relevant.
- **Change 1:** Replace it with an image of a machine (printer/copier).
- **Issue 2:** The ribbon at the bottom of the homepage currently shows company and brand names/logos.
- **Change 2:** Replace it with images of machines and devices instead.
- **Reference:** `screenshots/homepage-hero-and-brand-ribbon.jpg` (bottom ribbon currently shows brand logos: Konica Minolta, Canon, Kyocera, Ricoh, HP, Sharp, UTAX)
- **Reference (Change 1):** `screenshots/rental-section-machine-cards-reference.jpg` (example "Printers for Rent" style: cards with machine photos, brand, model name, For Rent/New badge)

### 10. Pending items from previous revision round
- **Status note:** Development on the remaining sections still appears pending, carried over from yesterday's revision round — needs to be completed.
- **Issue:** Brand logo placement instructions from the earlier revision requests haven't been implemented yet. Relevant brand logos (e.g., Canon, HP) should appear at the bottom when navigating to the Printers section or its Service section, as previously requested.
- **Change:** Complete the pending sections from the previous revision, and add the relevant brand logos at the bottom of the Printers section and its Service section pages.

### 11. Solutions menu: display categories and products
- **Change:** In the Solutions menu (new arrivals), also display the categories and a few products from the revision list, organized nicely by category — similar to the Products menu restructuring.

### 12. Background: align "bg-circuit-light" lines for continuity (suggestion)
- **Suggestion:** Align the `bg-circuit-light` background lines across sections for better visual continuity, as shown in the reference.
- **Reference:** `screenshots/bg-circuit-light-alignment-reference.jpg`

### 13. Top bar: distinct icons for mobile and telephone numbers
- **Issue:** The mobile number and telephone (landline) number in the top bar use the same/similar phone icon.
- **Change:** Use different icons for mobile vs. telephone numbers so they're visually distinguishable.
- **Reference:** `screenshots/topbar-phone-icons-reference.jpg`
