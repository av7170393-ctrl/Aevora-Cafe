/* =========================================================
   AEVORA CAFE — CHATBOT WIDGET (chatbot.js)
   Vanilla JS, self-contained. Talks to POST /api/chat, which is served
   by server.js — the ONLY place the Gemini API key is ever used.
   This file does not touch or depend on script.js in any way, so the
   existing menu/cart/WhatsApp/reservation logic is unaffected even if
   this widget fails to load or the backend isn't running.
   ========================================================= */

(function () {
  const CHAT_ENDPOINT = "/api/chat";
  const WELCOME_MESSAGE =
    "Hi! I'm the Aevora Cafe assistant. Ask me about our menu, coffee, hours, ordering, delivery or reservations.";

  let history = []; // { role: "user" | "model", text: string }
  let isSending = false;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    injectMarkup();

    const toggleBtn = document.getElementById("chatbotToggle");
    const closeBtn = document.getElementById("chatbotCloseBtn");
    const panel = document.getElementById("chatbotPanel");
    const form = document.getElementById("chatbotForm");
    const input = document.getElementById("chatbotInput");

    toggleBtn.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.hidden = !isOpen;
      if (isOpen) {
        if (!history.length) addMessage("model", WELCOME_MESSAGE, { save: false });
        input.focus();
      }
    });

    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      setTimeout(() => { panel.hidden = true; }, 200);
      toggleBtn.focus();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        closeBtn.click();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text || isSending) return;
      input.value = "";
      sendMessage(text);
    });
  }

  function injectMarkup() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <button type="button" id="chatbotToggle" class="chatbot-toggle" aria-expanded="false" aria-controls="chatbotPanel" aria-label="Chat with Aevora Cafe assistant">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>

      <section id="chatbotPanel" class="chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="chatbotTitle" hidden>
        <header class="chatbot-header">
          <div class="chatbot-header-text">
            <p id="chatbotTitle">Aevora Cafe Assistant</p>
            <span>Usually replies in a few seconds</span>
          </div>
          <button type="button" id="chatbotCloseBtn" class="icon-btn" aria-label="Close chat">&times;</button>
        </header>

        <div class="chatbot-body" id="chatbotBody" role="log" aria-live="polite"></div>

        <form id="chatbotForm" class="chatbot-form">
          <label for="chatbotInput" class="sr-only">Type your message</label>
          <input type="text" id="chatbotInput" placeholder="Ask about menu, hours, delivery…" autocomplete="off" maxlength="500">
          <button type="submit" class="chatbot-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
          </button>
        </form>
      </section>
    `;
    document.body.appendChild(wrap);
  }

  function addMessage(role, text, opts) {
    const save = !opts || opts.save !== false;
    const body = document.getElementById("chatbotBody");
    const row = document.createElement("div");
    row.className = `chatbot-msg chatbot-msg-${role}`;
    row.textContent = text;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    if (save) history.push({ role, text });
    return row;
  }

  function addTypingIndicator() {
    const body = document.getElementById("chatbotBody");
    const row = document.createElement("div");
    row.className = "chatbot-msg chatbot-msg-model chatbot-typing";
    row.id = "chatbotTyping";
    row.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("chatbotTyping");
    if (el) el.remove();
  }

  async function sendMessage(text) {
    addMessage("user", text);
    isSending = true;
    setFormDisabled(true);
    addTypingIndicator();

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) })
      });

      let payload = null;
      try { payload = await response.json(); } catch (_) { /* non-JSON error page */ }

      removeTypingIndicator();

      if (!response.ok || !payload || !payload.reply) {
        const errText = (payload && payload.error) ||
          "Sorry, I'm having trouble replying right now. Please try again, or reach us on WhatsApp.";
        addMessage("model", errText, { save: false });
        return;
      }

      addMessage("model", payload.reply);
    } catch (err) {
      removeTypingIndicator();
      addMessage(
        "model",
        "I couldn't connect just now — please check your internet connection and try again, or message us on WhatsApp.",
        { save: false }
      );
    } finally {
      isSending = false;
      setFormDisabled(false);
      const input = document.getElementById("chatbotInput");
      if (input) input.focus();
    }
  }

  function setFormDisabled(disabled) {
    const input = document.getElementById("chatbotInput");
    const form = document.getElementById("chatbotForm");
    if (input) input.disabled = disabled;
    if (form) form.querySelector("button[type=submit]").disabled = disabled;
  }
})();

