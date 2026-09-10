/* =========================================================
   AEVORA CAFE — SCRIPT.JS
   Vanilla JS. No frameworks, no backend, no paid APIs.
   Edit CAFE_CONFIG and MENU_ITEMS below to update content.
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIG — edit these values to reconfigure the site
   --------------------------------------------------------- */
const CAFE_CONFIG = {
  name: "Aevora Cafe",
  city: "Lucknow, Uttar Pradesh, India",
  whatsapp: "919026638445", // country code + number, digits only
  phoneDisplay: "+91 90266 38445",
  deliveryCharge: 40,       // INR, flat demo delivery charge — confirmed on WhatsApp in practice
  freeDeliveryAbove: 499,   // INR, set to 0 to disable free-delivery threshold
  openingTime: "10:00 AM",
  closingTime: "11:00 PM",
  currency: "₹"
};

/* ---------------------------------------------------------
   2. MENU DATA
   Each item: id, name, category, price, description, veg, tags
   Categories: coffee, tea, cold-drinks, pizza, burgers, pasta,
               sandwiches, snacks, desserts
   --------------------------------------------------------- */
const MENU_ITEMS = [
  // ---- COFFEE ----
  { id: "cof-01", name: "Espresso", category: "coffee", price: 110, description: "Rich, concentrated shot of freshly ground coffee.", veg: true, tags: ["Signature"] },
  { id: "cof-02", name: "Americano", category: "coffee", price: 130, description: "Espresso lengthened with hot water for a smooth sip.", veg: true, tags: [] },
  { id: "cof-03", name: "Signature Cappuccino", category: "coffee", price: 160, description: "Espresso, steamed milk and a thick layer of micro-foam.", veg: true, tags: ["Signature", "Popular"] },
  { id: "cof-04", name: "Classic Latte", category: "coffee", price: 170, description: "Smooth espresso balanced with generous steamed milk.", veg: true, tags: ["Popular"] },
  { id: "cof-05", name: "Mocha", category: "coffee", price: 180, description: "Espresso, chocolate and steamed milk, finished with cocoa.", veg: true, tags: [] },
  { id: "cof-06", name: "Cold Coffee", category: "coffee", price: 170, description: "Chilled coffee blended with milk and a scoop of ice cream.", veg: true, tags: ["Popular"] },
  { id: "cof-07", name: "Caramel Coffee", category: "coffee", price: 190, description: "Cold coffee swirled with caramel sauce.", veg: true, tags: ["Signature"] },
  { id: "cof-08", name: "Iced Latte", category: "coffee", price: 180, description: "Chilled espresso and cold milk served over ice.", veg: true, tags: ["New"] },

  // ---- TEA ----
  { id: "tea-01", name: "Masala Tea", category: "tea", price: 70, description: "Classic Indian tea simmered with aromatic spices.", veg: true, tags: ["Popular"] },
  { id: "tea-02", name: "Ginger Tea", category: "tea", price: 70, description: "Strong tea infused with fresh ginger.", veg: true, tags: [] },
  { id: "tea-03", name: "Green Tea", category: "tea", price: 90, description: "Light, antioxidant-rich green tea.", veg: true, tags: [] },
  { id: "tea-04", name: "Lemon Tea", category: "tea", price: 80, description: "Refreshing black tea with a hint of lemon.", veg: true, tags: [] },
  { id: "tea-05", name: "Iced Tea", category: "tea", price: 120, description: "Chilled tea served over ice with a citrus twist.", veg: true, tags: ["New"] },

  // ---- COLD BEVERAGES ----
  { id: "cd-01", name: "Fresh Lime Soda", category: "cold-drinks", price: 90, description: "Classic sweet, salted or plain lime soda.", veg: true, tags: [] },
  { id: "cd-02", name: "Lemon Mint Cooler", category: "cold-drinks", price: 120, description: "Mint and lemon blended into a cooling refresher.", veg: true, tags: ["Popular"] },
  { id: "cd-03", name: "Virgin Mojito", category: "cold-drinks", price: 140, description: "Non-alcoholic mojito-style cooler with mint and lime.", veg: true, tags: ["Signature"] },
  { id: "cd-04", name: "Mixed Fruit Cooler", category: "cold-drinks", price: 150, description: "Seasonal fruits blended into a refreshing cooler.", veg: true, tags: [] },
  { id: "cd-05", name: "Chocolate Milkshake", category: "cold-drinks", price: 180, description: "Thick milkshake blended with chocolate and ice cream.", veg: true, tags: ["Popular"] },
  { id: "cd-06", name: "Oreo Milkshake", category: "cold-drinks", price: 190, description: "Creamy milkshake loaded with crushed Oreo cookies.", veg: true, tags: ["Popular"] },

  // ---- PIZZA ----
  { id: "piz-01", name: "Margherita Pizza", category: "pizza", price: 250, description: "Classic tomato, mozzarella and basil, 9-inch.", veg: true, tags: ["Popular"] },
  { id: "piz-02", name: "Farmhouse Pizza", category: "pizza", price: 290, description: "Loaded with capsicum, onion, tomato and corn, 9-inch.", veg: true, tags: ["Popular"] },
  { id: "piz-03", name: "Paneer Tikka Pizza", category: "pizza", price: 320, description: "Spiced paneer tikka, onion and peppers, 9-inch.", veg: true, tags: ["Signature"] },
  { id: "piz-04", name: "Cheese Burst Pizza", category: "pizza", price: 340, description: "Extra cheese-stuffed crust with a classic veg topping, 9-inch.", veg: true, tags: ["New"] },

  // ---- BURGERS ----
  { id: "bur-01", name: "Classic Veg Burger", category: "burgers", price: 130, description: "Crisp veg patty, lettuce and house sauce in a soft bun.", veg: true, tags: ["Popular"] },
  { id: "bur-02", name: "Paneer Tikka Burger", category: "burgers", price: 170, description: "Grilled paneer tikka patty with mint mayo.", veg: true, tags: ["Signature"] },
  { id: "bur-03", name: "Cheese Loaded Burger", category: "burgers", price: 180, description: "Double cheese slices over a crisp veg patty.", veg: true, tags: ["Popular"] },
  { id: "bur-04", name: "Crispy Corn Burger", category: "burgers", price: 160, description: "Crunchy corn and vegetable patty with tangy sauce.", veg: true, tags: [] },

  // ---- PASTA ----
  { id: "pas-01", name: "Arrabbiata Pasta", category: "pasta", price: 220, description: "Penne tossed in a spicy tomato and herb sauce.", veg: true, tags: ["Popular"] },
  { id: "pas-02", name: "White Sauce Alfredo", category: "pasta", price: 240, description: "Creamy white sauce pasta with mixed vegetables.", veg: true, tags: ["Popular"] },
  { id: "pas-03", name: "Pink Sauce Pasta", category: "pasta", price: 250, description: "A blend of red and white sauce with herbs.", veg: true, tags: ["Signature"] },
  { id: "pas-04", name: "Pesto Pasta", category: "pasta", price: 260, description: "Basil pesto tossed penne with parmesan.", veg: true, tags: ["New"] },

  // ---- SANDWICHES ----
  { id: "san-01", name: "Veg Club Sandwich", category: "sandwiches", price: 150, description: "Triple-layered sandwich with fresh vegetables.", veg: true, tags: ["Popular"] },
  { id: "san-02", name: "Grilled Cheese Sandwich", category: "sandwiches", price: 130, description: "Buttery grilled bread loaded with melted cheese.", veg: true, tags: ["Popular"] },
  { id: "san-03", name: "Paneer Tikka Sandwich", category: "sandwiches", price: 160, description: "Spiced paneer tikka filling, grilled to perfection.", veg: true, tags: ["Signature"] },
  { id: "san-04", name: "Corn & Cheese Sandwich", category: "sandwiches", price: 140, description: "Sweet corn and cheese, grilled golden.", veg: true, tags: [] },

  // ---- CAFE SNACKS ----
  { id: "snk-01", name: "French Fries", category: "snacks", price: 120, description: "Crispy golden fries with seasoning.", veg: true, tags: ["Popular"] },
  { id: "snk-02", name: "Garlic Bread", category: "snacks", price: 130, description: "Toasted bread with garlic butter and herbs.", veg: true, tags: [] },
  { id: "snk-03", name: "Cheese Garlic Bread", category: "snacks", price: 160, description: "Garlic bread loaded with melted cheese.", veg: true, tags: ["Popular"] },
  { id: "snk-04", name: "Veg Nuggets", category: "snacks", price: 150, description: "Crunchy vegetable nuggets served with dip.", veg: true, tags: [] },
  { id: "snk-05", name: "Paneer Popcorn", category: "snacks", price: 180, description: "Bite-sized crispy fried paneer bites.", veg: true, tags: ["Signature"] },

  // ---- INDIAN CAFE SNACKS ----
  { id: "ind-01", name: "Masala Maggi", category: "snacks", price: 90, description: "Everyone's favourite noodles, spiced up cafe-style.", veg: true, tags: ["Popular"] },
  { id: "ind-02", name: "Paneer Tikka", category: "snacks", price: 220, description: "Char-grilled marinated paneer skewers.", veg: true, tags: ["Signature"] },
  { id: "ind-03", name: "Samosa (2 pcs)", category: "snacks", price: 60, description: "Crisp pastry filled with spiced potato.", veg: true, tags: [] },
  { id: "ind-04", name: "Chilli Paneer", category: "snacks", price: 210, description: "Indo-Chinese style paneer tossed in spicy sauce.", veg: true, tags: ["Popular"] },
  { id: "ind-05", name: "Aloo Tikki Chaat", category: "snacks", price: 100, description: "Crisp potato patties with tangy chutneys.", veg: true, tags: [] },

  // ---- DESSERTS ----
  { id: "des-01", name: "Chocolate Cake", category: "desserts", price: 140, description: "Rich, moist chocolate sponge slice.", veg: true, tags: ["Popular"] },
  { id: "des-02", name: "Fudge Brownie", category: "desserts", price: 150, description: "Dense chocolate brownie, served warm.", veg: true, tags: ["Popular"] },
  { id: "des-03", name: "Baked Cheesecake", category: "desserts", price: 190, description: "Creamy baked cheesecake with a biscuit base.", veg: true, tags: ["Signature"] },
  { id: "des-04", name: "Assorted Pastry", category: "desserts", price: 110, description: "Cafe-style pastry slice, flavour of the day.", veg: true, tags: [] },
  { id: "des-05", name: "Vanilla Ice Cream", category: "desserts", price: 100, description: "Two scoops of classic vanilla ice cream.", veg: true, tags: [] },
  { id: "des-06", name: "Molten Chocolate Dessert", category: "desserts", price: 170, description: "Warm chocolate dessert with a gooey centre.", veg: true, tags: ["New"] }
];

const CATEGORY_LABELS = {
  "all": "All",
  "coffee": "Coffee",
  "tea": "Tea",
  "cold-drinks": "Cold Drinks",
  "pizza": "Pizza",
  "burgers": "Burgers",
  "pasta": "Pasta",
  "sandwiches": "Sandwiches",
  "snacks": "Snacks",
  "desserts": "Desserts"
};

// Original illustrated graphics (not real photography) standing in for each
// menu category until real food photos are available — see assets/images/.
const CATEGORY_IMAGES = {
  "coffee": "assets/images/coffee/category-coffee.svg",
  "tea": "assets/images/coffee/category-tea.svg",
  "cold-drinks": "assets/images/coffee/category-cold-drinks.svg",
  "pizza": "assets/images/food/category-pizza.svg",
  "burgers": "assets/images/food/category-burger.svg",
  "pasta": "assets/images/food/category-pasta.svg",
  "sandwiches": "assets/images/food/category-sandwich.svg",
  "snacks": "assets/images/food/category-snacks.svg",
  "desserts": "assets/images/desserts/category-dessert.svg"
};

// Real photos supplied for this project (AI-generated food/cafe photography
// provided by the cafe). Keyed by MENU_ITEMS id — only items with a genuine
// matching or closely-relevant photo are listed here. Every other item still
// falls back to the illustrated CATEGORY_IMAGES graphic above.
const ITEM_PHOTOS = {
  "pas-01": "assets/images/hero/pasta-arrabbiata.jpg",
  "pas-02": "assets/images/hero/pasta-alfredo.jpg",
  "piz-01": "assets/images/hero/pizza-margherita.jpg",
  "piz-03": "assets/images/hero/pizza-paneer-tikka.jpg",
  "bur-01": "assets/images/hero/burger-classic-veg.jpg",
  "bur-03": "assets/images/hero/burger-cheese-loaded.jpg",
  "san-01": "assets/images/hero/sandwich-veg-club.jpg",
  "snk-03": "assets/images/hero/cheese-garlic-bread.jpg",
  "ind-02": "assets/images/hero/paneer-tikka-skewers.jpg",
  "cof-01": "assets/images/hero/espresso.jpg",
  "cof-02": "assets/images/hero/americano.jpg",
  "cof-03": "assets/images/hero/signature-cappuccino.jpg",
  "cof-04": "assets/images/hero/classic-latte.jpg",
  "cof-05": "assets/images/hero/mocha.jpg",
  "cof-06": "assets/images/hero/cold-coffee.jpg",
  "cof-08": "assets/images/hero/iced-latte.jpg",
  "cd-02": "assets/images/hero/lemon-mint-cooler.jpg",
  "cd-03": "assets/images/hero/virgin-mojito.jpg",
  "cd-04": "assets/images/hero/mixed-fruit-cooler.jpg",
  "des-01": "assets/images/hero/chocolate-cake.jpg",
  "des-02": "assets/images/hero/brownie.jpg",
  "des-03": "assets/images/hero/cheesecake.jpg",
  "des-04": "assets/images/hero/pastry.jpg",
  "des-06": "assets/images/hero/chocolate-mousse-dessert.jpg",

  "cof-07": "assets/images/hero/caramel-coffee.jpg",
  "tea-01": "assets/images/hero/masala-tea.jpg",
  "tea-02": "assets/images/hero/ginger-tea.jpg",
  "tea-03": "assets/images/hero/green-tea.jpg",
  "tea-04": "assets/images/hero/lemon-tea.jpg",
  "tea-05": "assets/images/hero/iced-tea.jpg",
  "cd-01": "assets/images/hero/fresh-lime-soda.jpg",
  "cd-05": "assets/images/hero/chocolate-milkshake.jpg",
  "cd-06": "assets/images/hero/oreo-milkshake.jpg",
  "piz-02": "assets/images/hero/farmhouse-pizza.jpg",
  "piz-04": "assets/images/hero/cheese-burst-pizza.jpg",
  "bur-02": "assets/images/hero/paneer-tikka-burger.jpg",
  "bur-04": "assets/images/hero/crispy-corn-burger.jpg",
  "pas-03": "assets/images/hero/pink-sauce-pasta.jpg",
  "pas-04": "assets/images/hero/pesto-pasta.jpg",
  "san-02": "assets/images/hero/grilled-cheese-sandwich.jpg",
  "san-03": "assets/images/hero/paneer-tikka-sandwich.jpg",
  "san-04": "assets/images/hero/corn-cheese-sandwich.jpg",
  "snk-01": "assets/images/hero/french-fries.jpg",
  "snk-02": "assets/images/hero/garlic-bread.jpg",
  "snk-04": "assets/images/hero/veg-nuggets.jpg",
  "snk-05": "assets/images/hero/paneer-popcorn.jpg",
  "ind-01": "assets/images/hero/masala-maggi.jpg",
  "ind-03": "assets/images/hero/samosa.jpg",
  "ind-04": "assets/images/hero/chilli-paneer.jpg",
  "ind-05": "assets/images/hero/aloo-tikki-chaat.jpg",
  "des-05": "assets/images/hero/vanilla-ice-cream.jpg"
};

const CHEF_SPECIAL_IDS = ["piz-03", "bur-02", "pas-03", "snk-05", "des-03", "ind-02"];

// Decorative showcase photos for the top of the Chef's Specials section.
// These are not priced menu entries — just photography highlights.
const SPECIALS_SHOWCASE = [
  { title: "Chef's Special Vegetarian Platter", path: "assets/images/hero/vegetarian-platter.jpg" },
  { title: "Aevora Signature Vegetarian Dish", path: "assets/images/hero/signature-vegetarian-dish.jpg" },
  { title: "Premium Vegetarian Combo", path: "assets/images/hero/premium-vegetarian-combo.jpg" }
];
const BESTSELLER_IDS = ["bur-01", "piz-01", "pas-01", "san-01", "cof-03", "des-01"];
const COFFEE_SECTION_IDS = ["cof-03", "cof-04", "cof-05", "cof-06", "cof-07", "cof-08"];

const FEATURES = [
  { title: "Free Wi-Fi", desc: "Stay connected while you eat, study or work.", icon: "wifi" },
  { title: "Charging Points", desc: "Convenient outlets at most tables.", icon: "plug" },
  { title: "Air Conditioned", desc: "A cool, comfortable space all year round.", icon: "snow" },
  { title: "Comfortable Seating", desc: "Cosy corners for solo visits or groups.", icon: "seat" },
  { title: "Family Friendly", desc: "A relaxed space that welcomes everyone.", icon: "family" },
  { title: "Student Friendly", desc: "Great for study sessions and catch-ups.", icon: "book" },
  { title: "Instagram-Friendly Ambience", desc: "Thoughtfully designed corners and lighting.", icon: "camera" },
  { title: "Clean & Hygienic", desc: "Maintained to a high standard, always.", icon: "sparkle" },
  { title: "Parking Available", desc: "Convenient parking near the cafe.", icon: "car" },
  { title: "Relaxing Music", desc: "A curated soundtrack for a calm visit.", icon: "note" }
];

const FEATURE_ICONS = {
  wifi: '<path d="M2 8.5a16 16 0 0 1 20 0M5.5 12a11 11 0 0 1 13 0M9 15.5a6 6 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 18v4" stroke="currentColor" stroke-width="2"/>',
  snow: '<path d="M12 2v20M4.2 6.5l15.6 11M4.2 17.5l15.6-11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  seat: '<path d="M6 13V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7M5 13h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4zM6 19v2M18 19v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  family: '<circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 20c0-3.3 2.5-6 6-6s6 2.7 6 6M14 20c0-2.6 1.8-4.7 4-4.7S21 17.4 21 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 4H12v16H6.5A2.5 2.5 0 0 0 4 22.5v-17zM20 5.5A2.5 2.5 0 0 0 17.5 4H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5v-17z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="13.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 7l1.5-3h5L16 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  car: '<path d="M4 16V11l2-4h12l2 4v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="7.5" cy="16.5" r="1.7" fill="currentColor"/><circle cx="16.5" cy="16.5" r="1.7" fill="currentColor"/><path d="M4 12h16" stroke="currentColor" stroke-width="2"/>',
  note: '<path d="M9 18V5l10-2v13" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>'
};

const OFFERS = [
  { title: "Student Special", desc: "Show a valid student ID for a discount on combo meals.", discount: "15% OFF" },
  { title: "Coffee Combo", desc: "Any signature coffee paired with a pastry of the day.", discount: "Combo Price" },
  { title: "Family Combo", desc: "A curated spread designed for 4, at a shared table price.", discount: "Family Price" },
  { title: "Weekend Special", desc: "A rotating weekend dish, available Saturday–Sunday.", discount: "Chef's Pick" },
  { title: "Happy Hours", desc: "Selected beverages at a friendlier price, weekday afternoons.", discount: "4 PM – 6 PM" }
];

const GALLERY_CATEGORIES = ["Our Cafe", "Food", "Coffee & Drinks", "Desserts", "Ambience"];
// Real photos supplied for this project, organized by gallery category.
const GALLERY_ITEMS = [
  { category: "Our Cafe", path: "assets/images/hero/cafe-cozy-corner.jpg" },
  { category: "Our Cafe", path: "assets/images/hero/cafe-lounge-seating.jpg" },
  { category: "Food", path: "assets/images/hero/vegetarian-platter.jpg" },
  { category: "Food", path: "assets/images/hero/premium-vegetarian-combo.jpg" },
  { category: "Food", path: "assets/images/hero/sandwich-halves-pesto.jpg" },
  { category: "Coffee & Drinks", path: "assets/images/hero/coffee-closeup.jpg" },
  { category: "Coffee & Drinks", path: "assets/images/hero/cappuccino-heart-art.jpg" },
  { category: "Desserts", path: "assets/images/hero/cheesecake.jpg" },
  { category: "Ambience", path: "assets/images/hero/cafe-ambience-wide.jpg" },
  { category: "Ambience", path: "assets/images/hero/cafe-window-nook.jpg" },
  { category: "Ambience", path: "assets/images/hero/cafe-night-glow.jpg" },
  { category: "Ambience", path: "assets/images/hero/cafe-laptop-desk.jpg" }
];

const REVIEWS = [
  { name: "Sample Guest — Priya", text: "A cosy spot to sit with friends over coffee and good conversation.", stars: 5 },
  { name: "Sample Guest — Rohit", text: "Loved the paneer tikka pizza — generous toppings and quick service.", stars: 5 },
  { name: "Sample Guest — Ananya", text: "Great for working with laptop-friendly seating and steady Wi-Fi.", stars: 4 }
];

/* ---------------------------------------------------------
   3. STATE
   --------------------------------------------------------- */
let cart = loadCart();
let activeMenuFilter = "all";
let activeGalleryFilter = "Our Cafe";
let activeOrderType = "delivery";

/* ---------------------------------------------------------
   4. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderFeatures();
  renderSpecialsShowcase();
  renderItemGrid("specialsGrid", CHEF_SPECIAL_IDS.map(findItem));
  renderItemGrid("coffeeGrid", COFFEE_SECTION_IDS.map(findItem));
  renderItemGrid("bestsellerGrid", BESTSELLER_IDS.map(findItem));
  renderMenuFilters();
  renderMenuGrid();
  renderOffers();
  renderGalleryTabs();
  renderGallery();
  renderReviews();

  setupHeader();
  setupMobileNav();
  setupRevealAnimations();
  setupCartUI();
  setupOrderTypeToggle();
  setupCheckoutForm();
  setupReservationForm();
  setupLeaveReviewButton();

  updateCartUI();
});

function findItem(id){ return MENU_ITEMS.find(i => i.id === id); }

/* ---------------------------------------------------------
   5. RENDER: Why Choose Us
   --------------------------------------------------------- */
function renderFeatures(){
  const grid = document.getElementById("featureGrid");
  grid.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon">
        <svg width="30" height="30" viewBox="0 0 24 24">${FEATURE_ICONS[f.icon] || ""}</svg>
      </div>
      <h3>${escapeHTML(f.title)}</h3>
      <p>${escapeHTML(f.desc)}</p>
    </div>
  `).join("");
}

function renderSpecialsShowcase(){
  const el = document.getElementById("specialsShowcase");
  if (!el) return;
  el.innerHTML = SPECIALS_SHOWCASE.map(s => `
    <figure class="showcase-tile">
      <img src="${escapeHTML(s.path)}" alt="${escapeHTML(s.title)} at Aevora Cafe" loading="lazy">
      <figcaption>${escapeHTML(s.title)}</figcaption>
    </figure>
  `).join("");
}

/* ---------------------------------------------------------
   6. RENDER: item cards (specials / coffee / bestsellers / menu)
   --------------------------------------------------------- */
function itemCardHTML(item){
  const qty = getCartQty(item.id);
  const tag = item.tags && item.tags[0] ? `<span class="item-tag">${escapeHTML(item.tags[0])}</span>` : "";
  const img = ITEM_PHOTOS[item.id] || CATEGORY_IMAGES[item.category] || "";
  const altText = ITEM_PHOTOS[item.id]
    ? `${escapeHTML(item.name)} at Aevora Cafe`
    : `${escapeHTML(item.name)} — illustrative graphic, replace with a real photo`;
  return `
    <article class="item-card" data-id="${item.id}">
      <div class="item-media">
        ${tag}
        <img src="${img}" alt="${altText}" loading="lazy">
      </div>
      <div class="item-body">
        <div class="item-top">
          <h3>${escapeHTML(item.name)}</h3>
          <span class="item-price">${CAFE_CONFIG.currency}${item.price}</span>
        </div>
        <p class="item-desc">${escapeHTML(item.description)}</p>
        <span class="veg-dot">100% Veg</span>
        <div class="item-footer">
          <button type="button" class="add-cart-btn" data-add="${item.id}" ${qty > 0 ? 'style="display:none"' : ""}>Add to Cart</button>
          <div class="qty-stepper ${qty > 0 ? "active" : ""}" data-stepper="${item.id}">
            <button type="button" data-dec="${item.id}" aria-label="Decrease quantity">−</button>
            <span data-qty="${item.id}">${qty}</span>
            <button type="button" data-inc="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderItemGrid(elId, items){
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = items.filter(Boolean).map(itemCardHTML).join("");
}

/* ---------------------------------------------------------
   7. RENDER: Menu filters + grid
   --------------------------------------------------------- */
function renderMenuFilters(){
  const cats = ["all", ...Array.from(new Set(MENU_ITEMS.map(i => i.category)))];
  const wrap = document.getElementById("menuFilters");
  wrap.innerHTML = cats.map(c => `
    <button type="button" class="filter-btn ${c === activeMenuFilter ? "active" : ""}" role="tab" aria-selected="${c === activeMenuFilter}" data-filter="${c}">
      ${escapeHTML(CATEGORY_LABELS[c] || c)}
    </button>
  `).join("");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    activeMenuFilter = btn.dataset.filter;
    wrap.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    renderMenuGrid();
  });
}

function renderMenuGrid(){
  const el = document.getElementById("menuGrid");
  const items = activeMenuFilter === "all" ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeMenuFilter);
  el.innerHTML = items.length ? items.map(itemCardHTML).join("") : `<p class="menu-empty">No items in this category yet.</p>`;
}

/* ---------------------------------------------------------
   8. RENDER: Offers
   --------------------------------------------------------- */
function renderOffers(){
  const grid = document.getElementById("offerGrid");
  grid.innerHTML = OFFERS.map(o => `
    <div class="offer-card">
      <h3>${escapeHTML(o.title)}</h3>
      <p>${escapeHTML(o.desc)}</p>
      <span class="offer-discount">${escapeHTML(o.discount)}</span>
    </div>
  `).join("");
}

/* ---------------------------------------------------------
   9. RENDER: Gallery
   --------------------------------------------------------- */
function renderGalleryTabs(){
  const wrap = document.getElementById("galleryTabs");
  wrap.innerHTML = GALLERY_CATEGORIES.map(c => `
    <button type="button" class="filter-btn ${c === activeGalleryFilter ? "active" : ""}" role="tab" aria-selected="${c === activeGalleryFilter}" data-gcat="${escapeHTML(c)}">${escapeHTML(c)}</button>
  `).join("");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-gcat]");
    if (!btn) return;
    activeGalleryFilter = btn.dataset.gcat;
    wrap.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    renderGallery();
  });
}

function renderGallery(){
  const grid = document.getElementById("galleryGrid");
  const items = GALLERY_ITEMS.filter(i => i.category === activeGalleryFilter);
  grid.innerHTML = items.map(i => `
    <div class="gallery-tile" tabindex="0">
      <img src="${escapeHTML(i.path)}" alt="${escapeHTML(i.category)} at Aevora Cafe" loading="lazy">
    </div>
  `).join("");
}

/* ---------------------------------------------------------
   10. RENDER: Reviews
   --------------------------------------------------------- */
function renderReviews(){
  const grid = document.getElementById("reviewGrid");
  grid.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <span class="review-badge">Sample Review</span>
      <div class="stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
      <p class="review-text">"${escapeHTML(r.text)}"</p>
      <p class="review-name">${escapeHTML(r.name)}</p>
    </div>
  `).join("");
}

function setupLeaveReviewButton(){
  document.getElementById("leaveReviewBtn").addEventListener("click", () => {
    showToast("Review collection is coming soon — thanks for your interest!");
  });
}

/* ---------------------------------------------------------
   11. HEADER: sticky shrink + mobile nav
   --------------------------------------------------------- */
function setupHeader(){
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMobileNav(){
  const nav = document.getElementById("mainNav");
  const btn = document.getElementById("hamburgerBtn");

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")){
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  });
}

/* ---------------------------------------------------------
   12. SCROLL REVEAL (respects prefers-reduced-motion)
   --------------------------------------------------------- */
function setupRevealAnimations(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".reveal");
  targets.forEach(t => t.classList.add("reveal-init"));

  if (reduceMotion || !("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => io.observe(t));
}

/* ---------------------------------------------------------
   13. CART: storage helpers
   --------------------------------------------------------- */
function loadCart(){
  try{
    const raw = localStorage.getItem("aevora_cart");
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    return {};
  }
}

function saveCart(){
  try{
    localStorage.setItem("aevora_cart", JSON.stringify(cart));
  }catch(e){ /* storage unavailable — cart still works for this session */ }
}

function getCartQty(id){ return cart[id] ? cart[id].qty : 0; }

function addToCart(id, qty = 1){
  const item = findItem(id);
  if (!item) return;
  if (!cart[id]) cart[id] = { qty: 0 };
  cart[id].qty += qty;
  saveCart();
  updateCartUI();
  showToast(`${item.name} added to cart`);
}

function decreaseFromCart(id){
  if (!cart[id]) return;
  cart[id].qty -= 1;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  updateCartUI();
}

function increaseInCart(id){
  if (!cart[id]) return addToCart(id, 1);
  cart[id].qty += 1;
  saveCart();
  updateCartUI();
}

function removeFromCart(id){
  delete cart[id];
  saveCart();
  updateCartUI();
}

function clearCart(){
  cart = {};
  saveCart();
  updateCartUI();
  showToast("Cart cleared");
}

function cartEntries(){
  return Object.keys(cart).map(id => ({ item: findItem(id), qty: cart[id].qty })).filter(e => e.item);
}

function cartSubtotal(){
  return cartEntries().reduce((sum, e) => sum + e.item.price * e.qty, 0);
}

function cartDeliveryCharge(){
  if (activeOrderType !== "delivery") return 0;
  const subtotal = cartSubtotal();
  if (subtotal === 0) return 0;
  if (CAFE_CONFIG.freeDeliveryAbove && subtotal >= CAFE_CONFIG.freeDeliveryAbove) return 0;
  return CAFE_CONFIG.deliveryCharge;
}

/* ---------------------------------------------------------
   14. CART: UI sync
   --------------------------------------------------------- */
function updateCartUI(){
  const entries = cartEntries();
  const totalQty = entries.reduce((s, e) => s + e.qty, 0);
  document.getElementById("cartCount").textContent = totalQty;

  // sync every rendered add-to-cart control across all sections
  document.querySelectorAll("[data-id]").forEach(card => {
    const id = card.dataset.id;
    const qty = getCartQty(id);
    const addBtn = card.querySelector(`[data-add="${id}"]`);
    const stepper = card.querySelector(`[data-stepper="${id}"]`);
    const qtyLabel = card.querySelector(`[data-qty="${id}"]`);
    if (addBtn) addBtn.style.display = qty > 0 ? "none" : "inline-flex";
    if (stepper) stepper.classList.toggle("active", qty > 0);
    if (qtyLabel) qtyLabel.textContent = qty;
  });

  renderCartDrawer(entries);
}

function renderCartDrawer(entries){
  const body = document.getElementById("cartBody");
  const summary = document.getElementById("cartSummary");

  if (!entries.length){
    body.innerHTML = `<p class="cart-empty">Your cart is empty. Add something delicious from the menu.</p>`;
    summary.hidden = true;
    return;
  }

  summary.hidden = false;
  body.innerHTML = entries.map(e => `
    <div class="cart-line" data-id="${e.item.id}">
      <div class="cart-line-thumb" aria-hidden="true"></div>
      <div class="cart-line-info">
        <h4>${escapeHTML(e.item.name)}</h4>
        <div class="cart-line-price">${CAFE_CONFIG.currency}${e.item.price} × ${e.qty} = ${CAFE_CONFIG.currency}${e.item.price * e.qty}</div>
        <div class="cart-line-controls">
          <button type="button" data-dec="${e.item.id}" aria-label="Decrease quantity of ${escapeHTML(e.item.name)}">−</button>
          <span>${e.qty}</span>
          <button type="button" data-inc="${e.item.id}" aria-label="Increase quantity of ${escapeHTML(e.item.name)}">+</button>
        </div>
        <button type="button" class="cart-line-remove" data-remove="${e.item.id}">Remove</button>
      </div>
    </div>
  `).join("");

  const subtotal = cartSubtotal();
  const delivery = cartDeliveryCharge();
  document.getElementById("cartSubtotal").textContent = `${CAFE_CONFIG.currency}${subtotal}`;
  document.getElementById("cartDelivery").textContent = delivery === 0 ? "Free" : `${CAFE_CONFIG.currency}${delivery}`;
  document.getElementById("cartGrandTotal").textContent = `${CAFE_CONFIG.currency}${subtotal + delivery}`;
}

/* ---------------------------------------------------------
   15. CART: drawer open/close + delegated click handling
   --------------------------------------------------------- */
function setupCartUI(){
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  const openBtn = document.getElementById("cartToggle");
  const closeBtn = document.getElementById("cartCloseBtn");

  function openCart(){
    overlay.hidden = false; drawer.hidden = false;
    requestAnimationFrame(() => { overlay.classList.add("show"); drawer.classList.add("open"); });
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeCart(){
    overlay.classList.remove("show"); drawer.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => { overlay.hidden = true; drawer.hidden = true; }, 250);
  }

  openBtn.addEventListener("click", openCart);
  closeBtn.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeCart();
  });

  document.getElementById("clearCartBtn").addEventListener("click", clearCart);

  // delegated add/inc/dec/remove across the whole document
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const remove = e.target.closest("[data-remove]");
    if (add) addToCart(add.dataset.add);
    else if (inc) increaseInCart(inc.dataset.inc);
    else if (dec) decreaseFromCart(dec.dataset.dec);
    else if (remove) removeFromCart(remove.dataset.remove);
  });
}

/* ---------------------------------------------------------
   16. ORDER TYPE TOGGLE (delivery / takeaway)
   --------------------------------------------------------- */
function setupOrderTypeToggle(){
  const btns = document.querySelectorAll(".order-type-btn");
  const addressRow = document.querySelector('[data-field="address"]');
  const timeLabel = document.getElementById("custTimeLabel");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeOrderType = btn.dataset.orderType;
      btns.forEach(b => b.classList.toggle("active", b === btn));

      const isDelivery = activeOrderType === "delivery";
      addressRow.style.display = isDelivery ? "flex" : "none";
      document.getElementById("custAddress").required = isDelivery;
      timeLabel.textContent = isDelivery ? "Preferred Delivery Time" : "Preferred Pickup Time";

      updateCartUI();
    });
  });
}

/* ---------------------------------------------------------
   17. VALIDATION HELPERS
   --------------------------------------------------------- */
function setError(fieldId, message){
  const el = document.getElementById(`err-${fieldId}`);
  if (el) el.textContent = message || "";
  const input = document.getElementById(fieldId);
  if (input) input.setAttribute("data-touched", "true");
}

function isValidPhone(value){
  return /^[6-9]\d{9}$/.test(value.trim());
}

function validateRequired(id, label){
  const el = document.getElementById(id);
  if (!el.value || !el.value.trim()){
    setError(id, `${label} is required.`);
    return false;
  }
  setError(id, "");
  return true;
}

/* ---------------------------------------------------------
   18. CHECKOUT FORM -> WhatsApp order message
   --------------------------------------------------------- */
function setupCheckoutForm(){
  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const entries = cartEntries();
    if (!entries.length){
      showToast("Your cart is empty. Add items before ordering.");
      return;
    }

    let valid = true;
    valid = validateRequired("custName", "Full name") && valid;

    const phone = document.getElementById("custPhone").value;
    if (!isValidPhone(phone)){
      setError("custPhone", "Enter a valid 10-digit Indian mobile number.");
      valid = false;
    } else setError("custPhone", "");

    if (activeOrderType === "delivery"){
      valid = validateRequired("custAddress", "Delivery address") && valid;
    }
    valid = validateRequired("custTime", activeOrderType === "delivery" ? "Preferred delivery time" : "Preferred pickup time") && valid;

    if (!valid) return;

    const name = document.getElementById("custName").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const time = document.getElementById("custTime").value;
    const notes = document.getElementById("custNotes").value.trim();

    const subtotal = cartSubtotal();
    const delivery = cartDeliveryCharge();
    const grandTotal = subtotal + delivery;

    const lines = [];
    lines.push(`*${CAFE_CONFIG.name}* — New Order`);
    lines.push("");
    lines.push(`Name: ${name}`);
    lines.push(`Mobile: ${phone}`);
    lines.push(`Order Type: ${activeOrderType === "delivery" ? "Delivery" : "Takeaway"}`);
    lines.push("");
    lines.push("Items:");
    entries.forEach(e => {
      lines.push(`- ${e.item.name} × ${e.qty} = ${CAFE_CONFIG.currency}${e.item.price * e.qty}`);
    });
    lines.push("");
    lines.push(`Subtotal: ${CAFE_CONFIG.currency}${subtotal}`);
    lines.push(`Delivery Charge: ${delivery === 0 ? "Free" : CAFE_CONFIG.currency + delivery}`);
    lines.push(`Grand Total: ${CAFE_CONFIG.currency}${grandTotal}`);
    lines.push("");
    if (activeOrderType === "delivery"){
      lines.push(`Delivery Address: ${address}`);
      lines.push(`Preferred Delivery Time: ${time}`);
    } else {
      lines.push(`Preferred Pickup Time: ${time}`);
    }
    if (notes) lines.push(`Special Instructions: ${notes}`);
    lines.push("");
    lines.push("Payment: Cash on Delivery");

    openWhatsAppWithMessage(lines.join("\n"));
  });

  // live-clear errors as user types
  ["custName", "custPhone", "custAddress", "custTime"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => setError(id, ""));
  });
}

/* ---------------------------------------------------------
   19. RESERVATION FORM -> WhatsApp message
   --------------------------------------------------------- */
function setupReservationForm(){
  const form = document.getElementById("reservationForm");
  const dateInput = document.getElementById("resDate");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    valid = validateRequired("resName", "Full name") && valid;

    const phone = document.getElementById("resPhone").value;
    if (!isValidPhone(phone)){
      setError("resPhone", "Enter a valid 10-digit Indian mobile number.");
      valid = false;
    } else setError("resPhone", "");

    const dateVal = document.getElementById("resDate").value;
    if (!dateVal){
      setError("resDate", "Please choose a date.");
      valid = false;
    } else if (dateVal < dateInput.min){
      setError("resDate", "Date cannot be in the past.");
      valid = false;
    } else setError("resDate", "");

    valid = validateRequired("resTime", "Preferred time") && valid;

    const guests = Number(document.getElementById("resGuests").value);
    if (!guests || guests < 1 || guests > 20){
      setError("resGuests", "Enter a guest count between 1 and 20.");
      valid = false;
    } else setError("resGuests", "");

    if (!valid) return;

    const name = document.getElementById("resName").value.trim();
    const date = dateVal;
    const time = document.getElementById("resTime").value;
    const seating = document.getElementById("resSeating").value;
    const notes = document.getElementById("resNotes").value.trim();

    const lines = [];
    lines.push(`*${CAFE_CONFIG.name}* — Table Reservation Request`);
    lines.push("");
    lines.push(`Name: ${name}`);
    lines.push(`Mobile: ${phone}`);
    lines.push(`Date: ${date}`);
    lines.push(`Time: ${time}`);
    lines.push(`Guests: ${guests}`);
    lines.push(`Seating Preference: ${seating}`);
    if (notes) lines.push(`Special Request: ${notes}`);

    openWhatsAppWithMessage(lines.join("\n"));
  });

  ["resName", "resPhone", "resDate", "resTime", "resGuests"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => setError(id, ""));
  });
}

/* ---------------------------------------------------------
   20. WHATSAPP LINK BUILDER
   --------------------------------------------------------- */
function openWhatsAppWithMessage(message){
  const url = `https://wa.me/${CAFE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/* ---------------------------------------------------------
   21. UTILITIES
   --------------------------------------------------------- */
function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

let toastTimer = null;
function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}


