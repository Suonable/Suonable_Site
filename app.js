(function () {
  "use strict";

  /* ---------- mobile hamburger menu ---------- */
  function setupMenu() {
    var nav = document.querySelector(".site-nav");
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    if (!nav || !toggle || !menu) return;

    function close() {
      nav.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      nav.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (nav.classList.contains("menu-open")) close(); else open();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("menu-open") && !nav.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 759) close();
    });
  }

  /* ---------- Mac download dropdown ---------- */
  function setupMacDropdown() {
    var wrap = document.querySelector(".mac-dropdown");
    var toggle = document.getElementById("macToggle");
    var options = document.getElementById("macOptions");
    if (!wrap || !toggle || !options) return;

    function close() {
      options.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      options.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (options.classList.contains("open")) close(); else open();
    });
    document.addEventListener("click", function (e) {
      if (options.classList.contains("open") && !wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- language switch ---------- */
  function setupLang() {
    var buttons = document.querySelectorAll(".lang-btn");
    if (!buttons.length) return;

    function paint(lang) {
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
      });
    }

    function apply(lang) {
      paint(lang);
      var boot = function () {
        var m = window.SuonableI18n;
        if (!m) { setTimeout(boot, 60); return; }
        m.applyLang(lang);
      };
      boot();
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });

    var boot0 = function () {
      var m = window.SuonableI18n;
      if (!m) { setTimeout(boot0, 60); return; }
      apply(m.readLang());
    };
    boot0();
  }

  /* ---------- player theme toggle ---------- */
  function setupPlayer() {
    var player = document.getElementById("player");
    if (!player) return;
    var lightBtn = player.querySelector('[data-mode="light"]');
    var darkBtn = player.querySelector('[data-mode="dark"]');
    var canvas = player.querySelector(".wave-canvas");

    function drawWave() {
      if (!canvas) return;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      var ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var dark = player.getAttribute("data-theme") === "dark";
      var rnd = function (x) { var s = Math.sin(x * 12.9898) * 43758.5453; return s - Math.floor(s); };
      var step = 4, barW = 2, mid = h / 2, maxAmp = h * 0.46;
      var n = Math.floor(w / step);
      ctx.fillStyle = dark ? "#5E6C7D" : "#C3D3E8";
      for (var i = 0; i < n; i++) {
        var t = i / n;
        var env = 0.5 + 0.2 * Math.sin(t * 7.4 + 0.6) + 0.1 * Math.sin(t * 19.3);
        env *= 1 - 0.42 * Math.exp(-Math.pow((t - 0.79) / 0.028, 2));
        env *= 1 - 0.3 * Math.exp(-Math.pow((t - 0.36) / 0.05, 2));
        if (t > 0.88) env *= 1 - (t - 0.88) / 0.12 * 0.6;
        if (t < 0.012) env = 1;
        var amp = Math.max(0.06, Math.min(1, env)) * (0.6 + 0.4 * rnd(i * 1.7)) * maxAmp;
        ctx.fillRect(i * step, mid - amp, barW, amp * 2);
      }
      ctx.fillStyle = dark ? "rgba(94,108,125,0.5)" : "rgba(150,175,205,0.55)";
      ctx.fillRect(0, mid - 0.5, w, 1);
    }

    function setMode(mode) {
      player.setAttribute("data-theme", mode);
      if (lightBtn) lightBtn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
      if (darkBtn) darkBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
      drawWave();
    }

    if (lightBtn) lightBtn.addEventListener("click", function () { setMode("light"); });
    if (darkBtn) darkBtn.addEventListener("click", function () { setMode("dark"); });

    window.addEventListener("resize", drawWave);
    drawWave();
  }

  /* ---------- scroll reveal ---------- */
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.animation = "reveal 0.75s cubic-bezier(0.2,0.7,0.2,1) both";
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) return;
      el.style.opacity = "0";
      io.observe(el);
    });
  }

  /* ---------- hash scroll (accounts for sticky nav) ---------- */
  function jumpToHash() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    var tries = 0;
    var tick = function () {
      var el = document.getElementById(hash.slice(1));
      if (el) {
        var top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: top, behavior: "auto" });
        return;
      }
      if (tries++ < 40) setTimeout(tick, 60);
    };
    setTimeout(tick, 60);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    setupMacDropdown();
    setupLang();
    setupPlayer();
    setupReveal();
    jumpToHash();
  });
})();
