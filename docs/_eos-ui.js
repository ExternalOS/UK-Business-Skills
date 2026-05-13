/*
  ExternalOS UI runtime. Theme toggle, drawer with focus trap,
  sticky-header hairline, magnetic-hover on primary CTAs.
  Respects prefers-reduced-motion. Vanilla, no dependencies.
*/
(function () {
  'use strict';

  var STORAGE_KEY = 'eos-theme';
  var root = document.documentElement;
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }
  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored === 'dark' || stored === 'light') return stored;
    return prefersDark.matches ? 'dark' : 'light';
  }
  applyTheme(currentTheme());
  prefersDark.addEventListener('change', function () {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!stored) applyTheme(currentTheme());
  });
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-eos-theme-toggle]');
    if (!btn) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    applyTheme(next);
  });

  var drawer = document.querySelector('[data-eos-drawer]');
  var openers = document.querySelectorAll('[data-eos-drawer-open]');
  var lastFocus = null;

  function focusableEls() {
    if (!drawer) return [];
    return Array.prototype.slice.call(
      drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')
    );
  }
  function openDrawer() {
    if (!drawer || drawer.getAttribute('data-open') === 'true') return;
    lastFocus = document.activeElement;
    drawer.setAttribute('data-open', 'true');
    openers.forEach(function (o) { o.setAttribute('aria-expanded', 'true'); });
    document.body.style.overflow = 'hidden';
    if (history && history.pushState) history.pushState({ eosDrawer: true }, '');
    var first = focusableEls()[0];
    if (first) first.focus();
  }
  function closeDrawer(skipHistory) {
    if (!drawer || drawer.getAttribute('data-open') !== 'true') return;
    drawer.setAttribute('data-open', 'false');
    openers.forEach(function (o) { o.setAttribute('aria-expanded', 'false'); });
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    if (!skipHistory && history.state && history.state.eosDrawer) history.back();
  }
  openers.forEach(function (o) { o.addEventListener('click', openDrawer); });
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-eos-drawer-close]')) closeDrawer();
    });
    drawer.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function () { closeDrawer(); });
    });
  }
  window.addEventListener('popstate', function () {
    if (drawer && drawer.getAttribute('data-open') === 'true') closeDrawer(true);
  });
  document.addEventListener('keydown', function (e) {
    if (!drawer || drawer.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
    if (e.key === 'Tab') {
      var f = focusableEls();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var header = document.querySelector('[data-eos-header]');
  if (header) {
    var setScrolled = function () {
      header.setAttribute('data-scrolled', window.scrollY > 40 ? 'true' : 'false');
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  if (!reduceMotion.matches) {
    var magnets = document.querySelectorAll('[data-magnetic]');
    magnets.forEach(function (el) {
      var maxTravel = 5;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = ((e.clientX - r.left) / r.width - 0.5) * 2 * maxTravel;
        var dy = ((e.clientY - r.top) / r.height - 0.5) * 2 * maxTravel;
        el.style.setProperty('--mx', dx.toFixed(1) + 'px');
        el.style.setProperty('--my', dy.toFixed(1) + 'px');
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }
})();
