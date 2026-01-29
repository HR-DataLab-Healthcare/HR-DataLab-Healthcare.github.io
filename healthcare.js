/* healthcare.js
 * Local loader so index.html, JS, and CSS can live in ONE directory.
 * Loads ReSpec from CDN, then injects minimal config + runs ReSpec.
 */
(function () {
  // 1) Load ReSpec from CDN (single external dependency).
  // If you must be 100% offline, you can replace this with a local respec.js file.
  const RESPEC_CDN = "https://www.w3.org/Tools/respec/respec-w3c";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // 2) Ensure there is always a respecConfig object.
  // You can still define window.respecConfig in index.html; we merge safely.
  function ensureConfig() {
    const cfg = (window.respecConfig = window.respecConfig || {});

    // Minimal defaults; keep them conservative.
    // Titles/authors/thisVersion etc. can remain in index.html.
    cfg.specStatus = cfg.specStatus || "GN-WV";
    cfg.language = cfg.language || "nl";
    cfg.format = cfg.format || "markdown";

    // If you want ReSpec to auto-generate TOC, keep tocIntroductory true.
    // (You can still handcraft a TOC, but then set noToc=true.)
    cfg.tocIntroductory = cfg.tocIntroductory ?? true;

    // Optional: avoid odd layout constraints some themes apply
    cfg.preProcess = cfg.preProcess || [];
    return cfg;
  }

  async function boot() {
    ensureConfig();

    // Load ReSpec
    await loadScript(RESPEC_CDN);

    // Trigger ReSpec processing
    // ReSpec processes automatically on load, but calling respec.ready gives you a hook.
    if (window.respec) {
      // Wait for processing completion if available
      if (window.respec.ready) {
        await window.respec.ready;
      }
    }
  }

  boot().catch((e) => {
    console.error("healthcare.js failed to load ReSpec:", e);
  });
})();
