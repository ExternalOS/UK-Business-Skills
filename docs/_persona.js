/* ============================================================
   ExternalOS persona manager
   Reads localStorage 'eos-persona' (set by /quiz.html) and stamps
   data-persona on <html>, then injects per-persona CSS token
   overrides so the whole site reskins to the visitor's match.
   Stacks with _theme.js (data-theme="dark").
   ============================================================ */

(function () {
  if (window.__eosPersonaLoaded) return;
  window.__eosPersonaLoaded = true;

  var STORAGE_KEY = 'eos-persona';
  var html = document.documentElement;

  var VALID = ['sole-trader', 'landlord', 'employer', 'creative', 'medical'];

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setStored(val) {
    try { localStorage.setItem(STORAGE_KEY, val); } catch (e) {}
  }

  // URL param ?persona=X wins over localStorage, and is then synced into storage.
  function detect() {
    try {
      var params = new URLSearchParams(window.location.search);
      var fromUrl = params.get('persona');
      if (fromUrl && VALID.indexOf(fromUrl) !== -1) {
        setStored(fromUrl);
        return fromUrl;
      }
    } catch (e) {}
    var stored = getStored();
    if (stored && VALID.indexOf(stored) !== -1) return stored;
    return null; // No persona = no override = the editorial default
  }

  function applyPersona(p) {
    if (p) {
      html.setAttribute('data-persona', p);
    } else {
      html.removeAttribute('data-persona');
    }
  }

  // Inject the per-persona CSS token overrides ONCE.
  // Source of truth: your-toolkit.html inline definitions. Mirror here for global use.
  var style = document.createElement('style');
  style.id = 'eos-persona-styles';
  style.textContent = [
    'html[data-persona="sole-trader"] {',
    '  --accent: #B8541F; --accent-deep: #8F3F12; --accent-pale: #FBEEDF; --accent-mid: #D17638;',
    '}',
    'html[data-persona="landlord"] {',
    '  --accent: #8B6A2A; --accent-deep: #5C4519; --accent-pale: #F4EBD4; --accent-mid: #A88438;',
    '  --warm-white: #FAF4E5; --warm-off: #F1E7CE; --warm-cream: #E5D6B0;',
    '}',
    'html[data-persona="employer"] {',
    '  --accent: #B10E1E; --accent-deep: #7C0610; --accent-pale: #FCEAEC; --accent-mid: #D8202E;',
    '  --warm-white: #FFFFFF; --warm-off: #F4F6F7; --warm-cream: #E2E5E8;',
    '  --ink: #0B0C0C; --body: #2E3033; --muted: #505A5F;',
    '}',
    'html[data-persona="creative"] {',
    '  --accent: #C2185B; --accent-deep: #8E0E40; --accent-pale: #FFE0EE; --accent-mid: #DD4080;',
    '  --warm-white: #FFF6F0; --warm-off: #FCE6D6; --warm-cream: #F4CFB5;',
    '}',
    'html[data-persona="medical"] {',
    '  --accent: #0B5394; --accent-deep: #073566; --accent-pale: #E1ECF7; --accent-mid: #2F7AC9;',
    '  --warm-white: #FAFAF7; --warm-off: #ECEAE2; --warm-cream: #D8D4C5;',
    '  --ink: #1E1E1E; --body: #3D3D38; --muted: #6B6B62;',
    '}',
    /* Smooth transitions when persona switches mid-session */
    'html, body, .banner, .nav, .masthead, .product-card, .featured-card, .tool, .card, .footer, section, h1, h2, h3, h4, p, a { transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease; }'
  ].join('\n');
  document.head.appendChild(style);

  applyPersona(detect());
})();
