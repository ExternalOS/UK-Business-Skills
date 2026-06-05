/* ============================================================
   ExternalOS theme manager
   Dark/light mode toggle. Respects prefers-color-scheme.
   Persists user override in localStorage.
   Injects toggle button next to the masthead CTA.
   ============================================================ */

(function () {
  if (window.__eosThemeLoaded) return;
  window.__eosThemeLoaded = true;

  var STORAGE_KEY = 'eos-theme';
  var html = document.documentElement;

  function getSystem() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setStored(val) {
    try { localStorage.setItem(STORAGE_KEY, val); } catch (e) {}
  }
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    var btns = document.querySelectorAll('.eos-theme-toggle');
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      b.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      b.querySelector('.eos-theme-icon').innerHTML = theme === 'dark'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  function detect() {
    var stored = getStored();
    return stored === 'dark' || stored === 'light' ? stored : getSystem();
  }

  // Apply early (before paint where possible)
  applyTheme(detect());

  // Inject styles (theme variables + toggle button)
  var style = document.createElement('style');
  style.id = 'eos-theme-styles';
  style.textContent = [
    /* DARK THEME TOKEN OVERRIDES - skeleton, palette finalises when Jordan votes */
    'html[data-theme="dark"] {',
    '  --warm-white: #0F0F0F;',
    '  --warm-off: #1A1A1A;',
    '  --warm-cream: #2A2A2A;',
    '  --warm-sand: #3D3830;',
    '  --warm-mid: #8C8378;',
    '  --warm-dark: #E5DDCB;',
    '  --ink: #F4EDE0;',
    '  --body: #C8C0AE;',
    '  --purple-hero: #E29A6B;',
    '  --purple-deep: #F2C9A8;',
    '  --purple-rich: #D17638;',
    '  --purple-mid: #E29A6B;',
    '  --purple-light: #F2C9A8;',
    '  --purple-pale: #5C2A0C;',
    '  --purple-ghost: #2A1A0E;',
    '  --purple-tint: #1F1812;',
    '  --accent: #E29A6B;',
    '  --accent-deep: #F2C9A8;',
    '  --accent-pale: #2A1A0E;',
    '  --shadow-sm: 0 1px 3px rgba(0,0,0,0.4);',
    '  --shadow-md: 0 4px 16px rgba(0,0,0,0.5);',
    '  --shadow-lg: 0 12px 40px rgba(0,0,0,0.6);',
    '}',
    'html[data-theme="dark"] body { background: var(--warm-white); color: var(--ink); }',
    'html[data-theme="dark"] img { opacity: 0.92; }',
    /* Reset elements that hardcoded ink-black */
    'html[data-theme="dark"] .banner { background: #000; border-bottom: 1px solid #2A2A2A; }',
    'html[data-theme="dark"] .anti-monthly-banner { background: #000; color: #F4EDE0 !important; border-bottom: 1px solid #2A2A2A; }',
    'html[data-theme="dark"] h1, html[data-theme="dark"] h2, html[data-theme="dark"] h3, html[data-theme="dark"] h4 { color: var(--ink); }',
    /* Dark sections that were already dark should now be slightly lighter for contrast */
    'html[data-theme="dark"] .wedge, html[data-theme="dark"] .cta-strip, html[data-theme="dark"] .wedge-quote, html[data-theme="dark"] .bundle-strip { background: #1A1A1A; }',
    /* Toggle button */
    '.eos-theme-toggle { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 100px; background: transparent; border: 1px solid currentColor; opacity: 0.55; color: inherit; cursor: pointer; padding: 0; transition: opacity 0.15s ease, transform 0.2s ease; flex-shrink: 0; }',
    '.eos-theme-toggle:hover { opacity: 1; transform: rotate(15deg); }',
    '.eos-theme-toggle .eos-theme-icon { display: inline-flex; }',
    '@media (max-width: 640px) { .eos-theme-toggle { width: 34px; height: 34px; } }',
    /* Smooth transitions on theme switch */
    'html, body, .banner, .anti-monthly-banner, .nav, .subnav, .masthead, .product-card, .featured-card, .tool, .card, .footer, section, h1, h2, h3, h4, p, a { transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }'
  ].join('\n');
  document.head.appendChild(style);

  // Inject button next to first CTA in nav, or fixed top-right if no nav match
  function injectButton() {
    if (document.querySelector('.eos-theme-toggle')) return;

    var btn = document.createElement('button');
    btn.className = 'eos-theme-toggle';
    btn.type = 'button';
    btn.innerHTML = '<span class="eos-theme-icon"></span>';
    btn.addEventListener('click', function () {
      var next = (html.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      setStored(next);
      applyTheme(next);
    });

    // Preferred home: masthead-nav (homepage)
    var nav = document.querySelector('.masthead-nav');
    if (nav) {
      nav.insertBefore(btn, nav.firstChild);
      applyTheme(detect());
      return;
    }
    // Next: any .nav
    var navBar = document.querySelector('.nav, nav');
    if (navBar) {
      navBar.appendChild(btn);
      applyTheme(detect());
      return;
    }
    // Fallback: fixed top-right
    btn.style.position = 'fixed';
    btn.style.top = '14px';
    btn.style.right = '14px';
    btn.style.zIndex = '99998';
    btn.style.background = 'rgba(26,26,26,0.85)';
    btn.style.color = '#F4EDE0';
    btn.style.border = '1px solid rgba(244,237,224,0.2)';
    document.body.appendChild(btn);
    applyTheme(detect());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }

  // Live-sync with system changes IF user has no manual override
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStored()) applyTheme(e.matches ? 'dark' : 'light');
    });
  }
})();
