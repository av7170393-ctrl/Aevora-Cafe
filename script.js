
   
  "cof-03": ">
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
