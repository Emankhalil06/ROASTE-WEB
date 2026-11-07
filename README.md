# ROASTÉ

### Rooted in Jordan. Crafted for the world.

ROASTÉ is a premium coffee brand website concept inspired by Jordanian coffee culture and designed with a cinematic, editorial, and minimal visual language.

The project focuses on creating an immersive digital coffee experience rather than a traditional restaurant website.

---

## ✨ Project Overview

ROASTÉ combines luxury visual design, smooth interactions, bilingual support, and a complete coffee ordering experience.

The website was designed as a reusable concept that can be adapted for premium coffee brands, cafés, and hospitality businesses.

---

## 🎯 Goals

- Create a premium and memorable coffee brand experience.
- Combine Jordanian identity with modern international aesthetics.
- Build a fully responsive website.
- Support both English and Arabic languages.
- Provide an interactive coffee menu.
- Implement a complete shopping cart and checkout flow.
- Create smooth cinematic animations and interactions.
- Build the project with reusable React components.

---

## 🖥️ Main Sections

### 01 — Hero

A cinematic opening section introducing the ROASTÉ brand.

### 02 — Coffee Story

An editorial storytelling section presenting the brand philosophy and coffee identity.

### 03 — From Bean to Cup

An interactive coffee preparation experience showing the journey from selecting the beans to brewing.

### 04 — Interactive Menu

A dynamic menu with:

- Category filtering
- Interactive products
- Product images
- Product details
- Prices
- Add to Cart functionality

### 05 — Locations

A future-location concept presenting planned ROASTÉ destinations in Jordan.

### 06 — Brand Statement

A visual brand statement reinforcing the ROASTÉ identity.

### 07 — Order

An interactive ordering experience allowing users to customize and place an order.

### 08 — Shopping Cart & Checkout

A complete customer flow including:

- Shopping cart
- Quantity controls
- Product removal
- Customer information
- Phone number
- City and area
- Delivery address
- Delivery notes
- Payment method
- Order confirmation
- Generated order number

---

## 🌍 Bilingual Experience

ROASTÉ supports:

- English 🇬🇧
- Arabic 🇯🇴

The interface automatically switches between:

- LTR layout for English
- RTL layout for Arabic

---

## 🎨 Design System

### Visual Style

- Luxury
- Editorial
- Cinematic
- Minimal
- Modern

### Color Palette

| Color | Hex |
|---|---|
| Espresso | `#17120F` |
| Cream | `#F3EBDD` |
| Coffee Brown | `#6B4632` |
| Sand | `#C9B08A` |
| White | `#FFFFFF` |

### Typography

**Headings:** Playfair Display

**Body & UI:** Manrope

---

## ⚡ Animations & Interactions

The website includes several interactive experiences:

- Page loading animation
- Hero image reveal
- Image scaling
- Text reveal animations
- Scroll-based parallax
- Sticky visual sections
- Interactive product selection
- Menu category filtering
- Hover interactions
- Smooth navigation
- Cart badge animation
- Interactive checkout
- Order confirmation experience

Animations are implemented using GSAP and CSS transitions.

---

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- CSS
- GSAP
- HTML5
- Responsive Web Design
- Local Storage

---

## 📁 Project Structure

```text
roaste-app/
│
├── public/
│   └── assets/
│       └── images/
│           ├── hero/
│           ├── story/
│           ├── process/
│           ├── products/
│           └── locations/
│
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Story.jsx
│   │   ├── Process.jsx
│   │   ├── SignatureCollection.jsx
│   │   ├── InteractiveMenu.jsx
│   │   ├── Locations.jsx
│   │   ├── BrandStatement.jsx
│   │   ├── Order.jsx
│   │   ├── Cart.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   └── translations.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md