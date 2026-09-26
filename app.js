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

  /* ---------- mobile accordions (long text sections) ---------- */
  function setupAccordions() {
    var groups = document.querySelectorAll(".accordion");
    groups.forEach(function (group) {
      var trigger = group.querySelector(".accordion-trigger");
      var panel = group.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      function toggle() {
        if (window.innerWidth > 759) return;
        var isOpen = group.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
  }

  /* ---------- download dropdowns (Mac / Windows) ---------- */
  function setupDownloadDropdowns() {
    var wraps = document.querySelectorAll(".dl-dropdown");
    if (!wraps.length) return;

    function closeAll(except) {
      wraps.forEach(function (w) {
        if (w === except) return;
        var o = w.querySelector(".dl-options");
        var t = w.querySelector("button");
        if (o) o.classList.remove("open");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }

    wraps.forEach(function (wrap) {
      var toggle = wrap.querySelector("button");
      var options = wrap.querySelector(".dl-options");
      if (!toggle || !options) return;

      function close() {
        options.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
      function open() {
        closeAll(wrap);
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
    });
  }

  /* ---------- language links ---------- */
  // Each language is its own URL and nothing redirects (that would break indexing).
  // The visitor's last pick is remembered only to point it out on another language's page.
  function setupLang() {
    var KEY = "suonable.lang";
    var links = document.querySelectorAll(".lang-btn[data-lang]");
    if (!links.length) return;
    var current = (document.documentElement.getAttribute("lang") || "en").toUpperCase();

    links.forEach(function (a) {
      a.addEventListener("click", function () {
        try { localStorage.setItem(KEY, a.getAttribute("data-lang")); } catch (e) {}
      });
    });

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (!saved || saved === current) return;
    links.forEach(function (a) {
      if (a.getAttribute("data-lang") === saved) a.classList.add("is-saved");
    });
  }

  /* ---------- hero device mockup ---------- */
  function setupDevices() {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // phones, tablets and small windows show the still renders: just alternate light and dark
    if (!document.documentElement.classList.contains("live-mockup")) {
      var still = document.getElementById("devicesStill");
      if (still && !reduceMotion) {
        var stillDark = false;
        setInterval(function () { stillDark = !stillDark; still.classList.toggle("is-dark", stillDark); }, 4500);
      }
      return;
    }

    var stage = document.getElementById("devicesStage");
    var scaleEl = document.getElementById("devicesScale");
    var ovLaptop = document.getElementById("ovLaptop");
    var shellScale = document.getElementById("shellScale");
    var player = document.getElementById("player");
    if (!stage || !scaleEl || !ovLaptop || !shellScale || !player) return;

    // the live rig's pictures are only fetched on the screens that show it
    Array.prototype.forEach.call(stage.querySelectorAll("img[data-src]"), function (img) {
      img.src = img.getAttribute("data-src");
    });
    var sidebar = document.getElementById("sidebar");
    var appShell = document.getElementById("appShell");
    var phone = document.getElementById("ovPhone");
    var canvas = player.querySelector(".wave-canvas");

    // the photo is 2400px wide and the app UI inside the laptop is laid out at 1500px;
    // both are scaled, so the laptop screen always shows the desktop layout
    function fit() {
      scaleEl.style.transform = "scale(" + Math.min(1, stage.clientWidth / 2400) + ")";
      shellScale.style.transform = "scale(" + ovLaptop.clientWidth / 1500 + ")";
    }

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

    // one controller flips laptop and phone together, so the two screens never drift apart
    function applyTheme(isDark) {
      var mode = isDark ? "dark" : "light";
      player.setAttribute("data-theme", mode);
      if (sidebar) sidebar.setAttribute("data-theme", mode);
      if (appShell) appShell.setAttribute("data-theme", mode);
      ovLaptop.setAttribute("data-theme", mode);
      if (phone) phone.classList.toggle("is-dark", isDark);
      drawWave();
    }

    fit();
    drawWave();
    window.addEventListener("resize", fit);

    if (!reduceMotion) {
      var dark = false;
      setInterval(function () { dark = !dark; applyTheme(dark); }, 4500);
    }
  }

  /* ---------- piano / guitar switch on the chord shapes ---------- */
  function setupChordShapes() {
    var panel = document.querySelector(".shapes-panel");
    if (!panel) return;
    var pills = Array.prototype.slice.call(panel.querySelectorAll("[data-shape-instrument]"));

    function show(pill) {
      // both instruments keep animating, so the one you switch to is already on the right chord
      panel.setAttribute("data-instrument", pill.getAttribute("data-shape-instrument"));
      pills.forEach(function (other) {
        var on = other === pill;
        other.classList.toggle("shape-pill-on", on);
        other.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    var rotate = null;
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        clearInterval(rotate);          // you picked one: stop changing it under you
        show(pill);
      });
    });

    // like the hero mockup flipping themes, the panel alternates instruments on its own
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && pills.length > 1) {
      var at = 0;
      rotate = setInterval(function () {
        at = (at + 1) % pills.length;
        show(pills[at]);
      }, 5500);
    }
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
    setupAccordions();
    setupDownloadDropdowns();
    setupLang();
    setupDevices();
    setupChordShapes();
    setupReveal();
    jumpToHash();
  });
})();
