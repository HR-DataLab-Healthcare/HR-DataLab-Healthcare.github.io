// healthcare.js
(function () {
  const GEONOVUM_RESPEC =
    "https://tools.geostandaarden.nl/respec/vergelijk/logius/respec-geonovum.js";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.className = "remove";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function boot() {
    // must exist before loading respec
    window.respecConfig = window.respecConfig || {};
    await loadScript(GEONOVUM_RESPEC);
  }

  boot().catch(console.error);
})();
