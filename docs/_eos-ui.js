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
    // Default to the greyscale-light brand for every new visitor. The OS
    // dark preference only takes effect once the visitor toggles explicitly.
    return 'light';
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
    // Turn the flat group/link drawer into click-to-expand accordions so the
    // mobile menu stays short and nothing is cut off. Transforms in place, so
    // every page gets it from this shared script with no per-page markup edits.
    (function () {
      var nav = drawer.querySelector('.eos-drawer__nav');
      if (!nav || nav.getAttribute('data-accordion')) return;
      var sections = [], cur = null;
      [].slice.call(nav.children).forEach(function (el) {
        if (el.classList.contains('eos-drawer__group')) { cur = { label: el.textContent, items: [] }; sections.push(cur); }
        else if (cur) { cur.items.push(el); }
      });
      if (!sections.length) return;
      nav.setAttribute('data-accordion', '1');
      nav.innerHTML = '';
      sections.forEach(function (sec) {
        var wrap = document.createElement('div'); wrap.className = 'eos-drawer__acc';
        var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'eos-drawer__acc-trigger'; btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span>' + sec.label + '</span><svg class="eos-drawer__acc-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
        var panel = document.createElement('div'); panel.className = 'eos-drawer__acc-panel';
        sec.items.forEach(function (it) { panel.appendChild(it); });
        btn.addEventListener('click', function () {
          var open = wrap.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        wrap.appendChild(btn); wrap.appendChild(panel); nav.appendChild(wrap);
      });
    })();
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

  // ---------- TICKER (hero "what just changed" feed) ----------

  var ticker = document.querySelector('[data-eos-ticker]');
  if (ticker) {
    var items = ticker.querySelectorAll('.eos-ticker__item');
    if (items.length > 1) {
      var i = 0;
      items[0].setAttribute('data-active', 'true');
      setInterval(function () {
        items[i].setAttribute('data-active', 'false');
        i = (i + 1) % items.length;
        items[i].setAttribute('data-active', 'true');
      }, 6000);
    } else if (items.length === 1) {
      items[0].setAttribute('data-active', 'true');
    }
  }

  // ---------- HERO RAIL ALIGNMENT (lock cornermark tip to sigrule y) ----------
  // The polygons are pre-shifted so the inner chevron tip sits at viewBox
  // centre (y=20). This script anchors the cornermark's centre to the
  // sigrule's actual y position so the tip always lands on the green
  // animated line regardless of viewport.
  function alignRails() {
    var hero = document.querySelector('.eos-hero');
    // Rails anchor to the button row's vertical centre (the two side
    // sigrules sit on the button's centreline). Falls back to the
    // legacy sigrule-line if the button isn't found.
    var sig = document.querySelector('.eos-hero__primarybtn')
           || document.querySelector('.eos-hero__sigrule-line');
    var rails = document.querySelectorAll('.eos-hero__cornermark');
    if (!hero || !sig || !rails.length) return;
    var heroRect = hero.getBoundingClientRect();
    var sigRect = sig.getBoundingClientRect();
    var sigCentreFromHeroTop = (sigRect.top + sigRect.height / 2) - heroRect.top;
    var topPct = (sigCentreFromHeroTop / heroRect.height * 100).toFixed(2);
    rails.forEach(function (r) { r.style.top = topPct + '%'; });
  }
  // Run after next paint (defer means DOM is parsed, but layout needs a tick)
  requestAnimationFrame(alignRails);
  window.addEventListener('load', alignRails);
  window.addEventListener('resize', alignRails);
  // Also re-run after fonts settle (Fraunces load can shift the headline height)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(alignRails);
  }

  // ---------- STAT COUNTER (counts up on viewport entry) ----------

  var stats = document.querySelectorAll('[data-eos-stat]');
  if (stats.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        statObserver.unobserve(el);
        var idx = Array.prototype.indexOf.call(stats, el);
        var target = parseFloat(el.getAttribute('data-eos-stat'));
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 3400;
        var delay = idx * 280;
        var start = performance.now() + delay;
        function fmt(v) { return v >= 1000 ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : v; }
        function frame(now) {
          if (now < start) { requestAnimationFrame(frame); return; }
          var t = Math.min(1, (now - start) / duration);
          // Ease-out cubic, gentler than the previous quartic ramp.
          var eased = 1 - Math.pow(1 - t, 3);
          var value = target === 0 ? 0 : Math.round(target * eased);
          el.textContent = prefix + fmt(value) + suffix;
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    stats.forEach(function (s) { statObserver.observe(s); });
    // Also trigger on next frame if already in viewport at load
    requestAnimationFrame(function () {
      stats.forEach(function (s) {
        var rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          statObserver.unobserve(s);
          var idx = Array.prototype.indexOf.call(stats, s);
          var target = parseFloat(s.getAttribute('data-eos-stat'));
          var prefix = s.getAttribute('data-prefix') || '';
          var suffix = s.getAttribute('data-suffix') || '';
          var duration = 3400;
          var delay = idx * 280;
          var start = performance.now() + delay;
          function fmt(v) { return v >= 1000 ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : v; }
          function frame(now) {
            if (now < start) { requestAnimationFrame(frame); return; }
            var t = Math.min(1, (now - start) / duration);
            // Ease-out cubic, gentler than the previous quartic ramp.
            var eased = 1 - Math.pow(1 - t, 3);
            var value = target === 0 ? 0 : Math.round(target * eased);
            s.textContent = prefix + fmt(value) + suffix;
            if (t < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        }
      });
    });
  } else {
    stats.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-eos-stat'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + target + suffix;
    });
  }

  // ---------- REVEAL ON SCROLL (specimens rise, finale rule draws) ----------
  // Hooks: legacy .eos-reveal, the S242 .eos-rise specimens, and any
  // [data-eos-rise] block (the finale). All resolve to [data-visible].

  var revealEls = document.querySelectorAll('.eos-reveal, .eos-rise, [data-eos-rise]');
  if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-visible', 'true');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.setAttribute('data-visible', 'true'); });
  }

  // ---------- SPECIMEN ROW REVEAL (point 6, verbatim yesterday motion) ----------
  // The specimen row uses the exact AE rise + 72deg turn CSS copied from
  // James's Lottie export. The demo triggers it by adding `.in` to the
  // row when it scrolls into view at threshold .35. Reproduced here.
  // Reduced-motion users get it shown immediately (the CSS neutralises
  // the transforms for them anyway).
  var specimenRow = document.querySelector('[data-eos-specimen-row]');
  if (specimenRow) {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      specimenRow.classList.add('in');
    } else {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            specimenRow.classList.add('in');
            obs.unobserve(specimenRow);
          }
        });
        // Fire ~200px before the row enters the viewport, so the rise is
        // already a few frames in by the time it is on screen.
      }, { threshold: 0.01, rootMargin: '0px 0px 200px 0px' }).observe(specimenRow);
    }
    // Click a specimen to open the zoom viewer (scroll/pinch to zoom, drag to
    // pan), so the small print on a document is actually readable. Replaces the
    // old enlarge-in-place. Mouse and touch via the shared openZoom below.
    Array.prototype.slice.call(specimenRow.querySelectorAll('.eos-specimen')).forEach(function (fig) {
      var img = fig.querySelector('img');
      // data-zoom-src lets a specimen load a higher-resolution image in the
      // zoom viewer than the one shown on the card (e.g. the sole-trader sheet).
      fig.addEventListener('click', function () { if (img) openZoom(img.getAttribute('data-zoom-src') || img.currentSrc || img.src, img.alt || ''); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fig.click(); }
      });
    });
  }

  // ---------- SPECIMEN ZOOM VIEWER (scroll/pinch to zoom, drag to pan) ----------
  var zoom = null, zImg, zScale = 1, zTx = 0, zTy = 0;
  var zPointers = new Map(), zPinchDist = 0, zPinchScale = 1, zPanLast = null;
  var Z_MIN = 1, Z_MAX = 6;
  function zClamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function zApply() {
    zScale = zClamp(zScale, Z_MIN, Z_MAX);
    if (zScale <= 1) { zTx = 0; zTy = 0; }
    else {
      // keep the image covering the viewport so panning never loses it
      var maxX = Math.max(0, (zImg.offsetWidth * zScale - window.innerWidth) / 2 + 40);
      var maxY = Math.max(0, (zImg.offsetHeight * zScale - window.innerHeight) / 2 + 40);
      zTx = zClamp(zTx, -maxX, maxX);
      zTy = zClamp(zTy, -maxY, maxY);
    }
    zImg.style.transform = 'translate(' + zTx + 'px,' + zTy + 'px) scale(' + zScale + ')';
    zoom.classList.toggle('is-zoomed', zScale > 1);
  }
  function zBuild() {
    if (zoom) return;
    zoom = document.createElement('div');
    zoom.className = 'eos-zoom';
    zoom.hidden = true;
    zoom.innerHTML =
      '<button class="eos-zoom__close" type="button" aria-label="Close" data-zoom-close>&times;</button>' +
      '<img class="eos-zoom__img" alt="" draggable="false">' +
      '<span class="eos-zoom__hint">Scroll or pinch to zoom, drag to pan, double-tap to reset</span>';
    document.body.appendChild(zoom);
    zImg = zoom.querySelector('.eos-zoom__img');
    zoom.addEventListener('click', function (e) {
      if (e.target === zoom || e.target.hasAttribute('data-zoom-close')) closeZoom();
    });
    zoom.addEventListener('wheel', function (e) {
      e.preventDefault();
      zScale *= (e.deltaY < 0 ? 1.15 : 1 / 1.15);
      zApply();
    }, { passive: false });
    zImg.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { zImg.setPointerCapture(e.pointerId); } catch (err) {}
      zPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (zPointers.size === 2) {
        var p = Array.from(zPointers.values());
        zPinchDist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        zPinchScale = zScale;
      } else { zPanLast = { x: e.clientX, y: e.clientY }; }
    });
    zImg.addEventListener('pointermove', function (e) {
      if (!zPointers.has(e.pointerId)) return;
      zPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (zPointers.size === 2 && zPinchDist) {
        var p = Array.from(zPointers.values());
        var d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        zScale = zPinchScale * (d / zPinchDist);
        zApply();
      } else if (zPanLast && zScale > 1) {
        zTx += e.clientX - zPanLast.x; zTy += e.clientY - zPanLast.y;
        zPanLast = { x: e.clientX, y: e.clientY };
        zApply();
      }
    });
    function zEnd(e) { zPointers.delete(e.pointerId); if (zPointers.size < 2) zPinchDist = 0; if (!zPointers.size) zPanLast = null; }
    zImg.addEventListener('pointerup', zEnd);
    zImg.addEventListener('pointercancel', zEnd);
    zImg.addEventListener('dblclick', function (e) {
      e.preventDefault();
      zScale = zScale > 1.2 ? 1 : 2.5;
      if (zScale === 1) { zTx = 0; zTy = 0; }
      zApply();
    });
    document.addEventListener('keydown', function (e) { if (zoom && !zoom.hidden && e.key === 'Escape') closeZoom(); });
  }
  function openZoom(src, alt) {
    zBuild();
    zImg.src = src; zImg.alt = alt || '';
    zScale = 1; zTx = 0; zTy = 0; zApply();
    zoom.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  }
  function closeZoom() {
    if (!zoom) return;
    zoom.hidden = true;
    document.documentElement.style.overflow = '';
  }
  window.eosZoom = { open: openZoom };

  // ---------- PDP SPECIMEN: collapse behind a reveal button on mobile ----------
  // Desktop shows the specimen by default; on phones it would eat the screen, so
  // CSS collapses it behind this button which reveals it on tap. CSS decides
  // which is shown per breakpoint; this only inserts the button and toggles.
  (function () {
    var holder = document.querySelector('.eos-pdp__specimen');
    if (!holder || holder.querySelector('.eos-pdp__specimen-reveal')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'eos-pdp__specimen-reveal';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span>See a real page from the pack</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    holder.insertBefore(btn, holder.firstChild);
    btn.addEventListener('click', function () {
      var open = holder.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('span').textContent = open ? 'Hide the page' : 'See a real page from the pack';
    });
  })();

  // ---------- HERO RAILS: mirrored highlight + product links ----------
  // On the home the rails are a multi-colour picker: hovering a layer lights the
  // same layer on BOTH rails (mirror) and clicking it opens that pack. On a
  // cohort-themed page (body[data-page-cohort]) the rails are a single static
  // colour, so this wiring is skipped. The smallest layer never lights.
  (function () {
    if (document.body.hasAttribute('data-page-cohort')) return;
    var railEls = document.querySelectorAll('.eos-hero2__rail');
    if (railEls.length < 2) return;
    var sets = [railEls[0].querySelectorAll('polygon'), railEls[1].querySelectorAll('polygon')];
    var PACK_URLS = ['./uk-tax-calculator.html', './creative-contracts.html', './uk-employment-law.html', './uk-landlord-compliance.html', './aml-kyc-docs.html'];
    function light(idx, on) {
      sets.forEach(function (s) { if (s[idx]) s[idx].classList.toggle('is-lit', on); });
    }
    sets.forEach(function (s) {
      Array.prototype.forEach.call(s, function (poly, idx) {
        if (idx >= s.length - 1 || !PACK_URLS[idx]) return; // smallest layer, only the five pack layers
        poly.style.cursor = 'pointer';
        poly.addEventListener('mouseenter', function () { light(idx, true); });
        poly.addEventListener('mouseleave', function () { light(idx, false); });
        poly.addEventListener('click', function () { window.location.href = PACK_URLS[idx]; });
      });
    });
  })();

  // ---------- HERO SCROLL TRANSITION (point 4) ----------
  // The hero inner block lifts and fades as the hero scrolls away,
  // handing over to the catalogue. A 0..1 progress var is written to
  // the hero element; the CSS maps it to transform + opacity only.
  var hero = document.querySelector('[data-eos-hero]');
  if (hero && !reduceMotion.matches) {
    var heroTick = false;
    var updateHero = function () {
      heroTick = false;
      var h = hero.offsetHeight || 1;
      var p = Math.min(1, Math.max(0, window.scrollY / h));
      hero.style.setProperty('--hero-scroll', p.toFixed(3));
    };
    updateHero();
    window.addEventListener('scroll', function () {
      if (heroTick) return;
      heroTick = true;
      requestAnimationFrame(updateHero);
    }, { passive: true });
  }

  // ---------- HEADER DROPDOWN NAV (point 3) ----------
  // Hover opens via CSS. This adds click-toggle and keyboard support so
  // the menus are reachable without a pointer (Escape closes, focus-out
  // closes). Every menu link is a real anchor, so it works without JS.
  var dropdowns = document.querySelectorAll('[data-eos-dropdown]');
  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('.eos-nav-trigger');
    if (!trigger) return;
    var setOpen = function (open) {
      dd.setAttribute('data-open', open ? 'true' : 'false');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = dd.getAttribute('data-open') === 'true';
      dropdowns.forEach(function (other) {
        if (other !== dd) {
          other.setAttribute('data-open', 'false');
          var t = other.querySelector('.eos-nav-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      setOpen(!isOpen);
    });
    dd.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); trigger.focus(); }
    });
    dd.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!dd.contains(document.activeElement)) setOpen(false);
      }, 0);
    });
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-eos-dropdown]')) return;
    dropdowns.forEach(function (dd) {
      dd.setAttribute('data-open', 'false');
      var t = dd.querySelector('.eos-nav-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- CATALOGUE CABINET (point 2) ----------
  // Five blank cohort-coloured tabs. Hover peeks the top section (CSS).
  // Click eases the whole page out into the stage below. One open at a
  // time: opening another closes the previous. transform / opacity only.
  var cabinet = document.querySelector('[data-eos-cabinet]');
  if (cabinet) {
    var cabTabs = Array.prototype.slice.call(cabinet.querySelectorAll('[data-cab-tab]'));
    var cabPanels = Array.prototype.slice.call(cabinet.querySelectorAll('[data-cab-panel]'));
    // Panels stay in the DOM. Visibility is driven entirely by data-active, so
    // switching tabs cross-fades smoothly. The old code toggled the `hidden`
    // attribute, which jumped the panel between display:none and block and read
    // as a stutter; data-active alone lets the CSS transition run cleanly.
    var showPanel = function (tab) {
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      cabPanels.forEach(function (p) { p.setAttribute('data-active', p === panel ? 'true' : 'false'); });
      cabTabs.forEach(function (t) { t.setAttribute('aria-expanded', t === tab ? 'true' : 'false'); });
      cabinet.setAttribute('data-open', 'true');
    };
    var closeAllPanels = function () {
      cabPanels.forEach(function (p) { p.setAttribute('data-active', 'false'); });
      cabTabs.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      cabinet.removeAttribute('data-open');
    };
    cabTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (tab.getAttribute('aria-expanded') === 'true') closeAllPanels();
        else showPanel(tab);
      });
    });
    // Escape closes the open drawer.
    cabinet.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllPanels();
    });
    // Open the first pack by default so the stage is never an empty gap.
    if (cabTabs.length) showPanel(cabTabs[0]);
  }

  // ---------- CART (localStorage, ready for Payhip wiring later) ----------

  var CART_KEY = 'eos-cart';

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  }
  function cartCount() {
    return readCart().length;
  }
  function refreshCartBadge() {
    var nodes = document.querySelectorAll('[data-eos-cart]');
    nodes.forEach(function (n) {
      n.setAttribute('data-count', String(cartCount()));
      var badge = n.querySelector('.eos-header__cart-count');
      if (badge) badge.textContent = String(cartCount());
    });
  }
  function addToCart(sku, name, price) {
    var items = readCart();
    if (items.some(function (i) { return i.sku === sku; })) return false;
    items.push({ sku: sku, name: name, price: price, addedAt: Date.now() });
    writeCart(items);
    refreshCartBadge();
    return true;
  }
  function removeFromCart(sku) {
    var items = readCart().filter(function (i) { return i.sku !== sku; });
    writeCart(items);
    refreshCartBadge();
  }
  window.eosCart = { read: readCart, add: addToCart, remove: removeFromCart, count: cartCount, refresh: refreshCartBadge };
  refreshCartBadge();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-eos-add-to-cart]');
    if (!btn) return;
    e.preventDefault();
    var sku = btn.getAttribute('data-sku');
    var name = btn.getAttribute('data-name');
    var price = btn.getAttribute('data-price');
    if (!sku) return;
    var added = addToCart(sku, name, price);
    var label = btn.querySelector('.eos-button-label') || btn;
    var original = btn.getAttribute('data-original-label') || label.textContent.trim();
    btn.setAttribute('data-original-label', original);
    label.textContent = added ? 'Added to cart' : 'Already in cart';
    setTimeout(function () { label.textContent = original; }, 1800);
  });
})();
