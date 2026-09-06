# Aevora Cafe — Website (Concept / Demo)

A single-page, responsive website for **Aevora Cafe**, a modern 100% vegetarian cafe concept in Lucknow, Uttar Pradesh, now paired with an optional **Gemini-powered AI chatbot**.

- **Core site** (hero, menu, cart, WhatsApp ordering, reservations, gallery, etc.) is plain **HTML5, CSS3 and vanilla JavaScript** — no build step, no framework, works on GitHub Pages exactly as before.
- **AI chatbot** is a small, separate, optional add-on. It needs one lightweight **Node.js server** (`server.js`) so the Gemini API key is never exposed in the browser. Nothing about the core site's design, menu, cart, WhatsApp ordering, reservation flow, images, or responsiveness was changed to add it — see [Section 5](#5-ai-chatbot-gemini) for full details.

Tagline: *Good Food. Great Coffee. Better Moments.*

> This is currently a **concept/demo site**. Menu prices, offers, gallery photos, and reviews are sample content — see [Section 8](#8-what-to-replace-before-going-live) for what to replace before going live.

---

## 1. Project Structure

```
aevora-cafe/
│
├── index.html            Single-page site (all sections)
├── style.css             All styling (incl. chatbot widget styles)
├── script.js              Config, menu data, cart, WhatsApp ordering, form logic
│
├── chatbot.js             AI chatbot widget — front-end only, calls POST /api/chat
├── server.js              Node/Express server: serves the site + secure /api/chat (Gemini)
├── cafe-knowledge.js      Server-side facts/menu summary the chatbot is allowed to use
├── package.json           Server dependencies (express, dotenv) + `npm start` script
├── .env.example           Template showing GEMINI_API_KEY (copy to .env, never commit .env)
├── .gitignore             Keeps .env and node_modules/ out of git
│
├── robots.txt
├── sitemap.xml
├── README.md
│
└── assets/
    ├── images/
    │   ├── cafe/          Interior / storefront / ambience photos
    │   ├── food/          Food photos
    │   ├── coffee/        Coffee & drinks photos
    │   └── desserts/      Dessert photos
    └── icons/             Favicon / logo files (optional)
```

Until real photography is added, some image slots use a **styled placeholder tile** showing the exact file path expected, so you can see at a glance what to replace and where.

---

## 2. Run the Static Site Only (no chatbot)

No build step needed for the core site.

**Option A — just open it**
Double-click `index.html` (or right-click → Open with your browser).

**Option B — local static server (recommended, avoids browser file-restrictions)**
From inside the `aevora-cafe` folder:

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .
```

Then visit `http://localhost:8000`.

With either option, the menu, cart, WhatsApp ordering, and reservations all work fully. The chatbot bubble will still appear (it's loaded on every page), but it will show a friendly "currently unavailable" message instead of replying, because no backend is running — see Section 5.

---

## 3. Run the Full Site *With* the Chatbot (local)

This is the same site as Section 2, plus the chatbot working, via `server.js`.

1. Install [Node.js](https://nodejs.org/) 18 or later.
2. From inside the `aevora-cafe` folder, install dependencies:
   ```bash
   npm install
   ```
3. Copy the env template and add your key (see Section 5.2 for where to get a key):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` so it contains:
   ```
   GEMINI_API_KEY=your_real_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Visit `http://localhost:3000` — the whole site loads exactly as before, and the chat bubble (bottom-right) now replies.

---

## 4. Upload to GitHub

1. Create a new repository on GitHub, e.g. `aevora-cafe`.
2. From inside the `aevora-cafe` project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Aevora Cafe website with Gemini chatbot"
   git branch -M main
   git remote add origin https://github.com/<your-username>/aevora-cafe.git
   git push -u origin main
   ```

`.env` is excluded automatically by `.gitignore` — your real API key is never pushed to GitHub.

### Activate GitHub Pages (static site only, free)

1. On GitHub, open your repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, select **main** and folder **/(root)**, then **Save**.
4. Your site goes live at `https://<your-username>.github.io/aevora-cafe/`.
5. Update the placeholder URLs in `index.html` (`<link rel="canonical">`, Open Graph `og:url`), `robots.txt`, and `sitemap.xml` to this real URL once known.

> ⚠️ **Important: GitHub Pages cannot run the chatbot.** GitHub Pages only serves static files (HTML/CSS/JS/images) — it has no ability to run `server.js`, no Node.js runtime, and no secure place to store `GEMINI_API_KEY`. If you deploy only to GitHub Pages, the menu, cart, WhatsApp ordering, and reservations all work perfectly, but the chatbot will always show its "currently unavailable" message, because `/api/chat` doesn't exist there. To get a *live, working chatbot on the internet*, you must deploy `server.js` to a Node-capable host — see Section 5.4.

---

## 5. AI Chatbot (Gemini)

The site includes a floating chat widget (bottom-right, on every page) powered by Google's **Gemini API**. It answers questions about the menu, coffee, vegetarian food, opening hours, ordering, delivery, takeaway, and reservations — using only the real facts already on this site. It's instructed to say plainly when it doesn't know something (e.g. the exact street address, real reviews, live wait times) rather than inventing an answer.

### 5.1 Files added for this feature

Nothing about the existing site was changed to add these — they're new files, and `chatbot.js` is loaded as a separate `<script>` tag after `script.js` so the cart/menu/reservation code is completely untouched.

| File | Purpose |
|---|---|
| `server.js` | Node/Express server. Serves the existing static site unchanged, and adds one endpoint: `POST /api/chat`. This is the **only** file that ever reads the Gemini API key. |
| `chatbot.js` | Front-end widget only (chat bubble, panel, message list, loading/typing indicator, error states). Contains no API key and never calls Gemini directly — it only calls `/api/chat` on the same origin. |
| `cafe-knowledge.js` | A server-side, plain-JS summary of `CAFE_CONFIG` / `MENU_ITEMS` from `script.js` (name, hours, delivery policy, ordering/reservation flow, full menu with prices). This is what gets sent to Gemini as context, so it can only talk about what's actually on the site. If you update the menu or hours in `script.js`, update this file to match. |
| `package.json` | Declares the two server dependencies (`express`, `dotenv`) and the `npm start` script. |
| `.env.example` | Template showing which environment variables are needed. Copy to `.env` and fill in your real key — `.env` itself is never committed. |
| `.gitignore` | Excludes `.env` and `node_modules/` from git. |

### 5.2 How `GEMINI_API_KEY` is configured securely

- The key is read **only** in `server.js`, via `process.env.GEMINI_API_KEY` — it is never written into `index.html`, `chatbot.js`, `style.css`, or any other file the browser can see.
- Locally, it's loaded from a `.env` file (via the `dotenv` package) that is git-ignored and never leaves your machine.
- In production, you set `GEMINI_API_KEY` directly in your hosting provider's **environment variables / secrets** dashboard (Render, Railway, Fly.io, Vercel, etc.) — the key still never appears in any file in the repository.
- Get a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — this README will never ask you to paste it into chat; enter it only in your local `.env` file or your host's environment-variable settings.
- `server.js` never logs, prints, or echoes the key back in any response — errors from Gemini are logged by status code only.

### 5.3 How the frontend talks to the backend

`chatbot.js` never contacts Gemini directly. The flow is:

1. Visitor types a message and hits send.
2. `chatbot.js` sends `POST /api/chat` (same origin, relative URL) with a JSON body:
   ```json
   { "message": "Are you open right now?", "history": [ { "role": "user", "text": "..." }, { "role": "model", "text": "..." } ] }
   ```
3. `server.js` validates the input, attaches the `cafe-knowledge.js` facts as Gemini's system instruction, and calls the Gemini API **with the key attached server-side only**.
4. `server.js` responds to the browser with just:
   ```json
   { "reply": "Yes — we're open 10 AM to 11 PM every day!" }
   ```
   or, on any failure, a safe message like:
   ```json
   { "error": "The chat assistant is temporarily unavailable. Please try again in a moment." }
   ```
5. `chatbot.js` renders the reply, or shows the error text with a suggestion to use WhatsApp/phone instead. Loading is shown as an animated typing indicator while waiting; the input is disabled until the reply (or error) arrives.

The browser never sees Gemini's URL, request format, or API key — only this app's own `/api/chat` contract.

### 5.4 Deploying with the chatbot live on the internet

GitHub Pages **cannot** host `server.js` (see the warning in Section 4). To have the chatbot working in production, deploy this project to any **Node.js-compatible hosting service**, for example Render, Railway, Fly.io, or a Vercel/Netlify serverless function. Requirements on any of these:

- **Node.js 18+** runtime available.
- Run `npm install` then `npm start` (i.e. `node server.js`) as the start command.
- Set `GEMINI_API_KEY` as an environment variable in the host's dashboard (and optionally `GEMINI_MODEL` / `PORT` — see `.env.example`). Never put it in a file that gets committed.
- The host must serve outbound HTTPS requests to `generativelanguage.googleapis.com` (this is the default on all mainstream Node hosts).
- Point your domain / the host's provided URL at this deployment; `server.js` already serves the static site itself, so no separate static host is needed once this is deployed — one deployment serves both the website and `/api/chat`.

If you don't need the chatbot live yet, GitHub Pages alone remains a perfectly valid way to host the rest of the site — just expect the chat bubble to show its unavailable message there.

---

## 6. How Ordering & Reservations Work

- **Menu → Cart**: Adding items builds a cart stored in the browser (`localStorage`), so it survives a page refresh.
- **Checkout**: Customer picks Delivery or Takeaway, fills in their details, and taps **Place Order on WhatsApp**. This opens WhatsApp (web or app) with a pre-filled, formatted order message sent to the cafe's number — no server or payment gateway involved.
- **Reservation**: The reservation form works the same way — it opens WhatsApp with a formatted reservation request.
- **Payment**: Cash on Delivery, as stated in the checkout form. This is easy to change later in `script.js` / `index.html` if payment methods change.

These flows are entirely unaffected by the chatbot addition — they still work with zero server involvement, exactly as before.

---

## 7. Testing Checklist

**Navigation**
- [ ] All nav links scroll to the correct section
- [ ] Mobile hamburger menu opens/closes and closes after selecting a link
- [ ] Keyboard `Tab` reaches every nav item with a visible focus ring

**Menu**
- [ ] Category filters switch items instantly, no page reload
- [ ] Add to Cart / quantity +/− works on every card (specials, coffee, bestsellers, full menu)
- [ ] Cart badge count updates immediately

**Cart & Checkout**
- [ ] Cart drawer opens/closes (button, overlay click, and `Esc` key)
- [ ] Subtotal, delivery charge and grand total calculate correctly
- [ ] Switching Delivery ↔ Takeaway shows/hides the address field correctly
- [ ] Submitting with empty required fields shows inline errors
- [ ] Invalid phone number is rejected
- [ ] Valid submission opens WhatsApp with a correctly formatted, itemized message
- [ ] "Clear cart" empties the cart and updates the UI

**Reservation**
- [ ] Empty/invalid fields show inline errors (name, phone, date, time, guest count)
- [ ] Past dates are blocked
- [ ] Valid submission opens WhatsApp with a correctly formatted reservation message

**Chatbot** *(requires `npm start` running — see Section 3)*
- [ ] Chat bubble opens/closes (button, `Esc` key)
- [ ] Sending a message shows a typing indicator, then a reply
- [ ] Asking about menu/hours/delivery/reservations gets accurate, on-site answers
- [ ] Asking something not on the site (e.g. exact address) gets an honest "I don't have that" answer instead of a made-up one
- [ ] Stopping `server.js` and reloading shows the graceful "currently unavailable" message, without breaking the rest of the page
- [ ] Chat panel is usable and doesn't overlap important content on mobile widths

**Responsive**
- [ ] No horizontal scroll on mobile, tablet, or desktop widths
- [ ] All buttons are comfortably tappable on a phone
- [ ] Cart drawer, forms, and chat panel are all usable on small screens

**Accessibility**
- [ ] All interactive elements reachable and operable via keyboard
- [ ] Visible focus outlines throughout
- [ ] Form fields have associated labels
- [ ] `prefers-reduced-motion` disables non-essential animation

**Performance**
- [ ] No console errors
- [ ] No large/unused libraries loaded
- [ ] Gallery images use `loading="lazy"` once real `<img>` tags are added

---

## 8. What to Replace Before Going Live

| Item | Where | Notes |
|---|---|---|
| Logo | `index.html` (`.logo-mark` SVG, header + footer) | Currently a simple CSS/SVG coffee-cup mark. Swap for a real `<img>` logo when available. |
| Cafe photos | `assets/images/...` + placeholder tiles in About, Gallery, Contact, and menu item cards | Add real files, then replace the placeholder `<div>` with an `<img src="...">`. |
| Exact address | `index.html` Contact & Footer sections, and the JSON-LD schema block in `<head>` | Currently only city-level: "Lucknow, Uttar Pradesh, India". |
| Menu items & prices | `script.js` → `MENU_ITEMS` array | Each item has `id`, `name`, `category`, `price`, `description`, `veg`, `tags`. Add/edit/remove freely — then update `cafe-knowledge.js` to match (see Section 5.1). |
| Chef's Specials / Bestsellers / Coffee picks | `script.js` → `CHEF_SPECIAL_IDS`, `BESTSELLER_IDS`, `COFFEE_SECTION_IDS` | Reference item `id`s from `MENU_ITEMS`. |
| Delivery charge / free-delivery threshold | `script.js` → `CAFE_CONFIG.deliveryCharge`, `CAFE_CONFIG.freeDeliveryAbove` | Also update the matching values in `cafe-knowledge.js`. |
| WhatsApp number | `script.js` → `CAFE_CONFIG.whatsapp` and `index.html` `tel:` / `wa.me` links | Must stay in `91XXXXXXXXXX` format (country code + number, no `+` or spaces). |
| Offers | `script.js` → `OFFERS` array | Each demo offer card is labelled "Demo Offer" until real promotions are confirmed. |
| Reviews | `script.js` → `REVIEWS` array | All current reviews are labelled "Sample Review" — replace only with real, consented customer reviews. |
| Gallery images | `script.js` → `GALLERY_ITEMS` array | Update `path` values once real photos exist in `assets/images/`. |
| Domain / canonical URL | `index.html` `<link rel="canonical">`, `og:url`; `robots.txt`; `sitemap.xml` | Currently `https://example.com/aevora-cafe/` placeholders. |
| Social media links | Not included | Add only once official accounts exist. |
| Google Business / Maps | Not included | Add only once the exact address and listing are finalized. |
| `GEMINI_MODEL` | `.env` | The Gemini model landscape changes often — check [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models) periodically and update if the configured model is retired. |

---

## 9. Notes on Honesty & Placeholder Content

This project intentionally avoids inventing real-world claims:

- No fabricated customer reviews, ratings, or awards — reviews are clearly labelled **Sample Review**.
- No fabricated sales data — best sellers are labelled **Popular Picks**, not verified sales rankings.
- No fake social media links — Aevora Cafe currently has no official accounts.
- No Google Maps embed — the exact address isn't finalized yet.
- All offers are labelled **Demo Offer** until real promotions are confirmed.
- The chatbot is instructed to only use the facts in `cafe-knowledge.js` and to say plainly when it doesn't know something, instead of guessing.

Replace these only with verified, real information when it becomes available.

---

© 2026 Aevora Cafe. Website concept by Aryan Verma.
