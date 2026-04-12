# Design System Document

## 1. Overview & Creative North Star: "The Urban Compass"

This design system is built to transform the search for affordable dining from a chore into a curated exploration. Our Creative North Star is **"The Urban Compass"**—a philosophy that blends the utility of a precision tool with the warmth of a friendly local guide.

Moving away from the rigid, boxed-in layouts of traditional map services, this system embraces an **Editorial Map Aesthetic**. We utilize intentional asymmetry, overlapping layers, and high-contrast typography to create an experience that feels like a premium lifestyle magazine, yet remains radically accessible. By using generous negative space and a "borderless" interface, we ensure the focus remains on the food and the journey, making the "affordable" choice feel like the "exclusive" choice.

---

## 2. Colors

Our palette is designed to be energetic yet sophisticated, using vibrant accents to drive action and soft neutrals to manage cognitive load.

### Palette Strategy
- **Primary (`#b9082c` / `#dd2d42`):** A high-energy coral-red used for the most critical actions and map markers. It signals urgency and appetite.
- **Secondary (`#47626f`):** A muted, slate blue that provides a professional anchor to the vibrant primary red, used primarily for map UI elements and secondary navigation.
- **Tertiary (`#006b1c`):** A success green used to highlight "good deals" and positive status indicators.
- **Surface & Neutrals:** A sophisticated range of greys from `surface-container-lowest` (`#ffffff`) to `surface-dim` (`#dadada`) that form the backbone of our layering system.

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are prohibited for sectioning.** Structural boundaries must be defined exclusively through background color shifts. For example, a card should be distinguished from the background by placing a `surface-container-lowest` element on a `surface-container-low` background.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- Use `surface-container` tiers to create depth. 
- **The Glass & Gradient Rule:** For floating map overlays or modals, use Glassmorphism. Apply semi-transparent surface colors with a `backdrop-filter: blur(12px)` to allow the map's vibrant colors to bleed through subtly.
- **Signature Textures:** Use subtle linear gradients transitioning from `primary` (`#b9082c`) to `primary_container` (`#dd2d42`) on main action buttons to add "soul" and a tactile, 3D quality.

---

## 3. Typography

The typography system pairs the expressive, modern personality of **Plus Jakarta Sans** with the functional clarity of **Inter**.

- **Display & Headlines (Plus Jakarta Sans):** Used for large titles and branding. The slightly wider stance and geometric curves feel "friendly but authoritative."
- **Body & Labels (Inter):** Used for all functional data, descriptions, and map labels. Inter’s high x-height ensures readability at small scales on a busy map.

**Editorial Scale:** Use high contrast between `display-lg` (3.5rem) and `body-md` (0.875rem) to create clear information hierarchies. Avoid "middle-ground" sizing; either make it a bold statement or a functional detail.

---

## 4. Elevation & Depth

We eschew traditional "drop shadows" in favor of **Tonal Layering** and **Ambient Light**.

- **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural lift.
- **Ambient Shadows:** For floating elements like Map Markers or FABs (Floating Action Buttons), use extra-diffused shadows. 
    - **Specs:** Blur: 24px-40px, Opacity: 4-8%.
    - **Color:** Instead of pure black, use a tinted version of `on-surface` to mimic natural light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque lines.
- **Glassmorphism:** Use semi-transparent backgrounds on elements that hover over the map to maintain a sense of place and spatial awareness.

---

## 5. Components

### Buttons
- **Primary:** High-rounded (`DEFAULT: 1rem`), using the Primary Gradient. No border. White text (`on_primary`).
- **Secondary:** `surface-container-high` background with `primary` colored text.
- **Tertiary:** Transparent background with an underline or `primary` text color for low-emphasis actions.

### Map Markers (The "Hero" Component)
- **Design:** A custom teardrop shape with a `xl` (3rem) corner radius at the top and a sharp point at the bottom.
- **Style:** Use `primary` for the main body and a `surface-container-lowest` inner dot to represent the "deal" level.

### Cards & Lists
- **Rule:** **Strictly no divider lines.** 
- **Separation:** Use vertical white space or a subtle shift from `surface-container-low` to `surface-container-lowest`. 
- **Shape:** Use `md` (1.5rem) or `lg` (2rem) corner radius to reinforce the "friendly" brand profile.

### Chips (Filter Elements)
- **Style:** Pill-shaped (`full` roundedness). 
- **State:** Unselected chips should use `surface-container-high`. Selected chips should pop with `primary_container` and `on_primary_container` text.

### Input Fields
- **Style:** Soft, `sm` (0.5rem) rounded boxes with a `surface-container-highest` background. 
- **Interaction:** On focus, transition the background to `surface-container-lowest` and add a "Ghost Border" of `primary` at 20% opacity.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., more padding on the left than the right in editorial headers) to create visual interest.
- **Do** use high-quality food photography with soft, natural lighting.
- **Do** lean into the "vibrant" aspect of the primary red for call-to-action moments.
- **Do** ensure all touch targets are at least 48x48px to remain "accessible."

### Don't
- **Don't** use black (`#000000`) for text; always use `on_surface` (`#1a1c1c`) to maintain a premium, soft feel.
- **Don't** use "default" system shadows that look muddy or heavy.
- **Don't** use 1px borders to separate content; let the background colors do the heavy lifting.
- **Don't** clutter the map. Use clustering and high-contrast markers to keep the interface "clean."