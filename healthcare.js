/* healthcare.js
 * Loader for Geonovum/Logius ReSpec build that supports specStatus "WV/CV/VV/DEF".
 * Keeps index.html + CSS in same directory.
 */
(function () {
  // Geonovum provides a ReSpec build that supports GN statuses.
  // Source: tools.geostandaarden.nl directory listing shows respec-geonovum.js. [web:42]
  const GEONOVUM_RESPEC =
    "https://tools.geostandaarden.nl/respec/vergelijk/logius/respec-geonovum.js";

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

  async function boot() {
    // respecConfig MUST exist before loading the respec script (per ReSpec docs). [attached_file:1]
    window.respecConfig = window.respecConfig || {};

    // Load Geonovum ReSpec build (supports WV/CV/VV/DEF). [web:9][web:42]
    await loadScript(GEONOVUM_RESPEC);
  }

  boot().catch((e) => console.error("Failed to load Geonovum ReSpec:", e));
})();
