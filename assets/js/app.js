/* ═══════════════════════════════════════════════
   app.js — Theme · Dropdown · Copy · Votes
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Theme Toggle ─────────────────────────── */

  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ── Dropdown ─────────────────────────────── */

  document.querySelectorAll("[data-dropdown]").forEach(function (dd) {
    var trigger = dd.querySelector("[data-dropdown-trigger]");

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      // Close all other dropdowns first
      document.querySelectorAll("[data-dropdown].is-open").forEach(function (el) {
        if (el !== dd) el.classList.remove("is-open");
      });
      dd.classList.toggle("is-open");
    });
  });

  // Click-outside closes any open dropdown
  document.addEventListener("click", function () {
    document.querySelectorAll("[data-dropdown].is-open").forEach(function (dd) {
      dd.classList.remove("is-open");
    });
  });

  // Escape key closes dropdowns
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll("[data-dropdown].is-open").forEach(function (dd) {
        dd.classList.remove("is-open");
      });
    }
  });

  /* ── Copy to Clipboard ────────────────────── */

  // Ensure a toast element exists
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  var toastTimer;

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(function () {
        showToast("kopyalandı!");
      }).catch(function () {
        // Fallback: select from a temporary textarea
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast("kopyalandı!");
      });
      // Close parent dropdown
      var dd = btn.closest("[data-dropdown]");
      if (dd) dd.classList.remove("is-open");
    });
  });

  /* ── Vote Buttons ─────────────────────────── */

  var VOTE_KEY = "votes";

  function getVotes() {
    try {
      return JSON.parse(localStorage.getItem(VOTE_KEY)) || {};
    } catch (_) {
      return {};
    }
  }

  function saveVotes(map) {
    localStorage.setItem(VOTE_KEY, JSON.stringify(map));
  }

  document.querySelectorAll("[data-vote-id]").forEach(function (group) {
    var id = group.getAttribute("data-vote-id");
    var votes = getVotes();
    var current = votes[id] || null; // "up" | "down" | null

    var upBtn   = group.querySelector('[data-vote="up"]');
    var downBtn = group.querySelector('[data-vote="down"]');

    function render() {
      upBtn.classList.toggle("active", current === "up");
      downBtn.classList.toggle("active", current === "down");
    }

    upBtn.addEventListener("click", function () {
      current = current === "up" ? null : "up";
      votes[id] = current;
      saveVotes(votes);
      render();
    });

    downBtn.addEventListener("click", function () {
      current = current === "down" ? null : "down";
      votes[id] = current;
      saveVotes(votes);
      render();
    });

    render(); // initial state from localStorage
  });
})();
