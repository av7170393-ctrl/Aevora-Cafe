/**
 * cafe-knowledge.js
 * -----------------
 * Server-side only knowledge base used to build the Gemini chatbot's
 * system instruction. This is a deliberate, hand-synced snapshot of the
 * business facts and menu that already live in script.js (CAFE_CONFIG,
 * MENU_ITEMS, CATEGORY_LABELS) — kept separate because script.js is
 * browser code (it touches `document`/`window`) and can't be safely
 * required into this Node server as-is.
 *
 * IMPORTANT: if you edit the menu, prices, hours, or contact details in
 * script.js, update the matching facts below too so the chatbot never
 * tells customers something the website itself doesn't say.
 */

const CAFE_FACTS = {
  name: "Aevora Cafe",
  tagline: "Good Food. Great Coffee. Better Moments.",
  founder: "Aryan Verma",
  city: "Lucknow, Uttar Pradesh, India",
  phoneDisplay: "+91 90266 38445",
  whatsapp: "919026638445",
  openingTime: "10:00 AM",
  closingTime: "11:00 PM",
  openingDays: "Monday to Sunday (open every day)",
  dietary: "100% vegetarian — no meat, fish, or egg items anywhere on the menu",
  services: ["Dine-in", "Takeaway", "Home delivery (selected areas of Lucknow only)"],
  deliveryNote: "Delivery available across selected areas of Lucknow. Delivery availability and charges are confirmed on WhatsApp, not guaranteed city-wide.",
  deliveryCharge: 40,
  freeDeliveryAbove: 499,
  currency: "₹",
  paymentMethod: "Cash on Delivery for delivery orders",
  orderingFlow: "Customers add items to the cart on the website, choose Delivery or Takeaway, fill in their details, then tap 'Place Order on WhatsApp' — this opens WhatsApp with the order pre-filled to send to the cafe.",
  reservationFlow: "Customers fill in the Table Reservation form on the website (name, phone, date, time, guests, seating preference) and tap 'Reserve via WhatsApp' — this sends the request to the cafe on WhatsApp for confirmation.",
  reviewsNote: "The website currently shows sample/demo reviews only, clearly labelled as such — there are no verified real customer reviews, ratings, or awards yet.",
  offersNote: "Offers shown on the website (Student Special, Coffee Combo, Family Combo, Weekend Special, Happy Hours) are demo/sample promotions, not confirmed active discounts.",
  socialMedia: "Aevora Cafe does not currently have official social media accounts.",
  addressNote: "Only the city (Lucknow, Uttar Pradesh, India) is published — the exact street address is not listed on the website yet."
};

// Menu grouped by category, formatted as plain text for the system prompt.
const MENU_SUMMARY_TEXT = `
Coffee:
- Espresso — ₹110 [Signature]
- Americano — ₹130
- Signature Cappuccino — ₹160 [Signature, Popular]
- Classic Latte — ₹170 [Popular]
- Mocha — ₹180
- Cold Coffee — ₹170 [Popular]
- Caramel Coffee — ₹190 [Signature]
- Iced Latte — ₹180 [New]

Tea:
- Masala Tea — ₹70 [Popular]
- Ginger Tea — ₹70
- Green Tea — ₹90
- Lemon Tea — ₹80
- Iced Tea — ₹120 [New]

Cold Drinks:
- Fresh Lime Soda — ₹90
- Lemon Mint Cooler — ₹120 [Popular]
- Virgin Mojito — ₹140 [Signature]
- Mixed Fruit Cooler — ₹150
- Chocolate Milkshake — ₹180 [Popular]
- Oreo Milkshake — ₹190 [Popular]

Pizza:
- Margherita Pizza — ₹250 [Popular]
- Farmhouse Pizza — ₹290 [Popular]
- Paneer Tikka Pizza — ₹320 [Signature]
- Cheese Burst Pizza — ₹340 [New]

Burgers:
- Classic Veg Burger — ₹130 [Popular]
- Paneer Tikka Burger — ₹170 [Signature]
- Cheese Loaded Burger — ₹180 [Popular]
- Crispy Corn Burger — ₹160

Pasta:
- Arrabbiata Pasta — ₹220 [Popular]
- White Sauce Alfredo — ₹240 [Popular]
- Pink Sauce Pasta — ₹250 [Signature]
- Pesto Pasta — ₹260 [New]

Sandwiches:
- Veg Club Sandwich — ₹150 [Popular]
- Grilled Cheese Sandwich — ₹130 [Popular]
- Paneer Tikka Sandwich — ₹160 [Signature]
- Corn & Cheese Sandwich — ₹140

Snacks:
- French Fries — ₹120 [Popular]
- Garlic Bread — ₹130
- Cheese Garlic Bread — ₹160 [Popular]
- Veg Nuggets — ₹150
- Paneer Popcorn — ₹180 [Signature]
- Masala Maggi — ₹90 [Popular]
- Paneer Tikka — ₹220 [Signature]
- Samosa (2 pcs) — ₹60
- Chilli Paneer — ₹210 [Popular]
- Aloo Tikki Chaat — ₹100

Desserts:
- Chocolate Cake — ₹140 [Popular]
- Fudge Brownie — ₹150 [Popular]
- Baked Cheesecake — ₹190 [Signature]
- Assorted Pastry — ₹110
- Vanilla Ice Cream — ₹100
- Molten Chocolate Dessert — ₹170 [New]
`;

module.exports = { CAFE_FACTS, MENU_SUMMARY_TEXT };
