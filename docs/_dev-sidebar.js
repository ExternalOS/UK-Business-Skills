/* ============================================================
   ExternalOS DEV SIDEBAR
   Temporary master page index for staging-s206 review.
   REMOVE before deploy to live. Tagged with _ prefix so it
   stays excluded from production paths.
   ============================================================ */

(function () {
  // Only run if not already injected
  if (document.getElementById('eos-dev-sidebar')) return;

  var PAGES = {
    'Homepage': [
      { href: './index.html', label: 'index.html', note: 'Hero + bundles + comparison + founder + free tools' }
    ],
    'Tools-first IA': [
      { href: './tools.html', label: 'tools.html', note: 'All Tools page, banded by price tier' }
    ],
    'MTD sub-site': [
      { href: './mtd.html', label: 'mtd.html', note: 'Hub + anti-SaaS wedge' },
      { href: './mtd-jargon.html', label: 'mtd-jargon.html', note: '12-card Jargon Decoder, full build' },
      { href: './mtd-clock.html', label: 'mtd-clock.html', note: '£200 Penalty Clock, live interactive countdown + simulator' },
      { href: './mtd-spreadsheet.html', label: 'mtd-spreadsheet.html', note: 'PAID £29 product page, full build' },
      { href: './mtd-kit.html', label: 'mtd-kit.html', note: 'Existing MTD survival PDF page' }
    ],
    'Free tools (live)': [
      { href: './ir35-checker.html', label: 'ir35-checker.html', note: 'IR35 Status Checker' },
      { href: './compliance-calendar.html', label: 'compliance-calendar.html', note: 'Ltd Compliance Calendar' },
      { href: './employer-costs.html', label: 'employer-costs.html', note: 'Employer Costs Calculator' },
      { href: './landlord-compliance-check.html', label: 'landlord-compliance-check.html', note: 'Landlord 12-question' }
    ],
    'Product pages (18)': [
      { href: './uk-tax-calculator.html', label: 'uk-tax-calculator.html', note: '£9 single calc' },
      { href: './property-rental-yield.html', label: 'property-rental-yield.html', note: '£19 yield + SDLT' },
      { href: './invoice-expense-categoriser.html', label: 'invoice-expense-categoriser.html', note: '£19 sheet' },
      { href: './client-comms-drafter.html', label: 'client-comms-drafter.html', note: '£19 30-template pack' },
      { href: './proposal-generator.html', label: 'proposal-generator.html', note: '£29 template pack' },
      { href: './uk-landlord-compliance.html', label: 'uk-landlord-compliance.html', note: '£29 Landlord Legal Pack' },
      { href: './uk-employment-law.html', label: 'uk-employment-law.html', note: '£29 Employment Law Kit' },
      { href: './health-safety-risk-assessment.html', label: 'health-safety-risk-assessment.html', note: '£29 HSE Pack' },
      { href: './contract-review.html', label: 'contract-review.html', note: '£29 Contract Review' },
      { href: './food-hygiene-haccp.html', label: 'food-hygiene-haccp.html', note: '£29 HACCP' },
      { href: './construction-quote.html', label: 'construction-quote.html', note: '£29 Quote Builder' },
      { href: './ir35-assessment.html', label: 'ir35-assessment.html', note: '£29 IR35 Kit' },
      { href: './creative-contracts.html', label: 'creative-contracts.html', note: '£29 Creative Contracts' },
      { href: './teacher-lesson-plans.html', label: 'teacher-lesson-plans.html', note: '£29 Lesson Plans' },
      { href: './aml-kyc-docs.html', label: 'aml-kyc-docs.html', note: '£39 AML/KYC' },
      { href: './gdpr-compliance.html', label: 'gdpr-compliance.html', note: '£39 GDPR' },
      { href: './employee-handbook-generator.html', label: 'employee-handbook-generator.html', note: '£39 Handbook Generator' },
      { href: './grant-application-writer.html', label: 'grant-application-writer.html', note: '£49 Grant Writer' }
    ],
    'Urgency / standalone SKUs': [
      { href: './landlord-31-may-kit.html', label: 'landlord-31-may-kit.html', note: '£29 31 May urgency SKU' }
    ],
    'Legal / utility': [
      { href: './privacy.html', label: 'privacy.html', note: 'Privacy policy' },
      { href: './terms.html', label: 'terms.html', note: 'Terms of service' },
      { href: './refund-policy.html', label: 'refund-policy.html', note: '14-day refund' },
      { href: './unsubscribe.html', label: 'unsubscribe.html', note: 'Newsletter unsubscribe' }
    ],
    'Dev-only previews (will not deploy)': [
      { href: './_palette-preview.html', label: '_palette-preview.html', note: 'First 8-variant palette grid (full hero scale)' },
      { href: './_palette-grid.html', label: '_palette-grid.html', note: 'First grid image source' },
      { href: './_palette-grid-v2.html', label: '_palette-grid-v2.html', note: 'Second 10-variant grid (with type variation)' }
    ]
  };

  // Detect current page
  var currentPath = location.pathname.split('/').pop() || 'index.html';

  var savedOpen = (function() {
    try { return localStorage.getItem('eos-dev-sidebar-open'); } catch (e) { return null; }
  })();
  var startOpen = savedOpen !== 'closed';

  // Inject styles
  var style = document.createElement('style');
  style.id = 'eos-dev-sidebar-styles';
  style.textContent = [
    '#eos-dev-sidebar { position: fixed; top: 0; right: 0; bottom: 0; width: 320px; background: #0F0F0F; color: #F4EDE0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 13px; line-height: 1.4; z-index: 99999; overflow-y: auto; box-shadow: -8px 0 32px rgba(0,0,0,0.3); transform: translateX(0); transition: transform 0.22s ease; }',
    '#eos-dev-sidebar.closed { transform: translateX(calc(100% - 44px)); }',
    '#eos-dev-sidebar .eds-header { position: sticky; top: 0; background: #1A1A1A; padding: 10px 12px; border-bottom: 1px solid #2A2A2A; display: flex; align-items: center; gap: 12px; }',
    '#eos-dev-sidebar.closed .eds-header { background: #B8541F; }',
    '#eos-dev-sidebar.closed .eds-title, #eos-dev-sidebar.closed .eds-meta, #eos-dev-sidebar.closed .eds-section, #eos-dev-sidebar.closed .eds-footer { opacity: 0; pointer-events: none; transition: opacity 0.12s ease; }',
    '#eos-dev-sidebar .eds-title { font-weight: 700; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #B8541F; flex: 1; }',
    '#eos-dev-sidebar .eds-toggle { background: transparent; border: 1px solid #3A3A3A; color: #F4EDE0; width: 22px; height: 22px; border-radius: 4px; cursor: pointer; font-size: 14px; padding: 0; line-height: 1; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }',
    '#eos-dev-sidebar .eds-toggle:hover { background: #2A2A2A; }',
    '#eos-dev-sidebar.closed .eds-toggle { border-color: #fff; color: #fff; transform: scaleX(-1); }',
    '#eos-dev-sidebar .eds-meta { padding: 10px 16px; background: #1A1A1A; border-bottom: 1px solid #2A2A2A; font-size: 11px; color: rgba(244,237,224,0.5); line-height: 1.5; }',
    '#eos-dev-sidebar .eds-meta strong { color: #B8541F; }',
    '#eos-dev-sidebar .eds-section { padding: 14px 16px 6px; }',
    '#eos-dev-sidebar .eds-section h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F4EDE0; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }',
    '#eos-dev-sidebar .eds-section h4 .eds-count { background: #B8541F; color: #F4EDE0; padding: 1px 7px; border-radius: 100px; font-size: 10px; font-weight: 700; }',
    '#eos-dev-sidebar .eds-link { display: block; padding: 6px 8px; margin: 2px -8px; border-radius: 4px; color: rgba(244,237,224,0.8); text-decoration: none; line-height: 1.35; transition: background 0.1s ease; }',
    '#eos-dev-sidebar .eds-link:hover { background: #2A2A2A; color: #F4EDE0; }',
    '#eos-dev-sidebar .eds-link.eds-active { background: #B8541F; color: #fff; }',
    '#eos-dev-sidebar .eds-link.eds-active .eds-note { color: rgba(255,255,255,0.85); }',
    '#eos-dev-sidebar .eds-label { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-weight: 600; display: block; }',
    '#eos-dev-sidebar .eds-note { font-size: 11px; color: rgba(244,237,224,0.5); margin-top: 1px; display: block; }',
    '#eos-dev-sidebar .eds-footer { padding: 16px; border-top: 1px solid #2A2A2A; font-size: 11px; color: rgba(244,237,224,0.4); line-height: 1.5; }',
    '#eos-dev-sidebar .eds-footer strong { color: #FBEEDF; }',
    '@media (max-width: 920px) { #eos-dev-sidebar { width: 280px; font-size: 12px; } }'
  ].join('\n');
  document.head.appendChild(style);

  // Build sidebar
  var bar = document.createElement('div');
  bar.id = 'eos-dev-sidebar';
  if (!startOpen) bar.className = 'closed';

  var totalPages = 0;
  Object.keys(PAGES).forEach(function(k) { totalPages += PAGES[k].length; });

  var html = [
    '<div class="eds-header">',
      '<button class="eds-toggle" type="button" aria-label="Toggle sidebar" title="Toggle">&lsaquo;</button>',
      '<span class="eds-title">DEV INDEX</span>',
    '</div>',
    '<div class="eds-meta">',
      '<strong>staging-s206</strong> branch &middot; ' + totalPages + ' pages total. Temporary navigation for review.',
    '</div>'
  ];

  Object.keys(PAGES).forEach(function(section) {
    var pages = PAGES[section];
    html.push('<div class="eds-section"><h4>' + section + ' <span class="eds-count">' + pages.length + '</span></h4>');
    pages.forEach(function(p) {
      var isActive = p.label === currentPath ? ' eds-active' : '';
      html.push(
        '<a class="eds-link' + isActive + '" href="' + p.href + '">' +
          '<span class="eds-label">' + p.label + '</span>' +
          '<span class="eds-note">' + p.note + '</span>' +
        '</a>'
      );
    });
    html.push('</div>');
  });

  html.push('<div class="eds-footer"><strong>Remove _dev-sidebar.js from every page before deploy.</strong> Find via grep "_dev-sidebar" in docs/. This file lives at /docs/_dev-sidebar.js, prefixed with underscore so it stays excluded from production paths by convention.</div>');

  bar.innerHTML = html.join('');
  document.body.appendChild(bar);

  bar.querySelector('.eds-toggle').addEventListener('click', function() {
    var isClosed = bar.classList.toggle('closed');
    try { localStorage.setItem('eos-dev-sidebar-open', isClosed ? 'closed' : 'open'); } catch (e) {}
  });

  // Persist sidebar scroll position across navigations.
  // 1. Restore last scrollTop (or fall back to scrolling the active link into view)
  // 2. Save scrollTop on every scroll (throttled) + on link click + on beforeunload
  var SCROLL_KEY = 'eos-dev-sidebar-scroll';
  var stored = null;
  try { stored = sessionStorage.getItem(SCROLL_KEY); } catch (e) {}
  if (stored !== null) {
    bar.scrollTop = parseInt(stored, 10) || 0;
  } else {
    var activeLink = bar.querySelector('.eds-link.eds-active');
    if (activeLink) {
      var offset = activeLink.offsetTop - 120;
      bar.scrollTop = offset > 0 ? offset : 0;
    }
  }

  var saveTimer = null;
  function saveScroll() {
    try { sessionStorage.setItem(SCROLL_KEY, String(bar.scrollTop)); } catch (e) {}
  }
  bar.addEventListener('scroll', function() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveScroll, 60);
  });
  bar.addEventListener('click', function(e) {
    if (e.target.closest('.eds-link')) saveScroll();
  });
  window.addEventListener('beforeunload', saveScroll);
  window.addEventListener('pagehide', saveScroll);
})();
