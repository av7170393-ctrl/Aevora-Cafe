/**
 * server.js
 * ---------
 * Minimal Node/Express server added ONLY to support the Gemini-powered
 * chatbot securely. It does two things:
 *
 *   1. Serves the existing static Aevora Cafe site exactly as-is
 *      (index.html, style.css, script.js, assets/, etc.) — nothing about
 *      the site's design, menu, cart, WhatsApp ordering, or reservation
 *      flow is touched by this file.
 *
 *   2. Exposes POST /api/chat, which is the ONLY place the Gemini API key
 *      is ever read or used. The key lives in the environment variable
 *      GEMINI_API_KEY and is never sent to the browser, logged, or
 *      embedded in any client-side file.
 *
 * This file is required because a plain static site (GitHub Pages, or
 * just opening index.html) has no way to call a paid API without
 * exposing the key in client-side JS. Running `node server.js` (on any
 * Node-capable host) is what makes the chatbot work; the rest of the
 * site works with or without this server.
 */

require("dotenv").config();

const express = require("express");
const path = require("path");
const { CAFE_FACTS, MENU_SUMMARY_TEXT } = require("./cafe-knowledge");

const app = express();
app.use(express.json({ limit: "10kb" }));

// Serve the existing static site unchanged.
app.use(express.static(path.join(__dirname), { extensions: ["html"] }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// System instruction: gives Gemini the real facts about Aevora Cafe and a
// hard rule against inventing anything not listed here.
const SYSTEM_INSTRUCTION = `You are the official website assistant for ${CAFE_FACTS.name}, a ${CAFE_FACTS.dietary} cafe in ${CAFE_FACTS.city}.

Tagline: "${CAFE_FACTS.tagline}". Founded by ${CAFE_FACTS.founder}.

Hours: Open ${CAFE_FACTS.openingDays}, ${CAFE_FACTS.openingTime} – ${CAFE_FACTS.closingTime}.
Services: ${CAFE_FACTS.services.join(", ")}.
Delivery: ${CAFE_FACTS.deliveryNote} Flat delivery charge is ${CAFE_FACTS.currency}${CAFE_FACTS.deliveryCharge}, free above ${CAFE_FACTS.currency}${CAFE_FACTS.freeDeliveryAbove} of items (delivery orders only).
Payment: ${CAFE_FACTS.paymentMethod}.
Ordering on the website: ${CAFE_FACTS.orderingFlow}
Reservations: ${CAFE_FACTS.reservationFlow}
Contact: Phone/WhatsApp ${CAFE_FACTS.phoneDisplay}.
${CAFE_FACTS.addressNote}
${CAFE_FACTS.reviewsNote}
${CAFE_FACTS.offersNote}
${CAFE_FACTS.socialMedia}

Full menu (all items are vegetarian):
${MENU_SUMMARY_TEXT}

Rules you must always follow:
1. Only use the facts given above. Never invent menu items, prices, offers, reviews, awards, the exact street address, or anything else not stated here.
2. If someone asks something you don't have information for (e.g. the exact address, allergen/nutrition details, real customer ratings, live order status, live table availability), say plainly that you don't have that information and point them to WhatsApp/phone (${CAFE_FACTS.phoneDisplay}) or the Contact section of the site instead of guessing.
3. Keep replies short and friendly — 1 to 4 sentences, plain text, no markdown headers or long lists unless the person asks for the full menu.
4. When someone wants to order or book a table, briefly explain the on-site flow above rather than trying to place an order yourself.
5. Stay warm, modern, and helpful, matching a premium neighbourhood cafe's voice — never robotic or overly formal.`;

/**
 * POST /api/chat
 * Body: { message: string, history?: Array<{ role: "user"|"model", text: string }> }
 * Response: { reply: string } on success, or { error: string } on failure.
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Please type a message first." });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: "That message is a bit too long — please shorten it." });
    }
    if (!GEMINI_API_KEY) {
      // Server misconfiguration — never happens if GEMINI_API_KEY is set correctly.
      console.error("GEMINI_API_KEY is not set in the environment.");
      return res.status(500).json({ error: "Chat isn't set up on the server yet. Please try WhatsApp or phone instead." });
    }

    // Keep only the last few turns to stay fast and cheap; each turn is
    // { role: "user" | "model", text: "..." } as sent by chatbot.js.
    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-8).forEach((turn) => {
        if (
          turn &&
          (turn.role === "user" || turn.role === "model") &&
          typeof turn.text === "string" &&
          turn.text.trim()
        ) {
          contents.push({ role: turn.role, parts: [{ text: turn.text.trim().slice(0, 1000) }] });
        }
      });
    }
    contents.push({ role: "user", parts: [{ text: message.trim() }] });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let geminiResponse;
    try {
      geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { role: "system", parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 300 }
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!geminiResponse.ok) {
      // Log status only — never log the API key or full request/response body.
      console.error("Gemini API request failed with status", geminiResponse.status);
      return res.status(502).json({
        error: "The chat assistant is temporarily unavailable. Please try again in a moment, or reach us on WhatsApp."
      });
    }

    const data = await geminiResponse.json();
    const reply = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || "")
      .join("")
      .trim();

    if (!reply) {
      return res.status(502).json({ error: "I couldn't come up with a reply — please try asking again." });
    }

    res.json({ reply });
  } catch (err) {
    if (err && err.name === "AbortError") {
console.error("Gemini request timed out after 25s");
      return res.status(504).json({ error: "That took too long to answer. Please try again." });
    }
    console.error("Unexpected /api/chat error:", err.message);
    res.status(500).json({ error: "Something went wrong on our end. Please try again shortly." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aevora Cafe server running at http://localhost:${PORT}`);
  if (!GEMINI_API_KEY) {
    console.warn("Warning: GEMINI_API_KEY is not set — the chatbot will return a friendly error until it is.");
  }
});
