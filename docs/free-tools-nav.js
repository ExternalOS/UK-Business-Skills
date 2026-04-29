/* =============================================================
   ExternalOS free tools navigation
   Single source of truth for the Free-tools masthead dropdown.
   To add a new free tool: add an entry to TOOLS below and the
   dropdown updates on every page automatically.
   Pairs with skills-nav.js. Same trigger pattern, single column.
   ============================================================= */

(function () {
  var TOOLS = [
    {
      name: 'IR35 Status Checker',
      href: './ir35-checker.html',
      blurb: '7 CEST-style questions, instant verdict.'
    },
    {
      name: 'UK Ltd Compliance Calendar',
      href: './compliance-calendar.html',
      blurb: 'Year-end in, every HMRC and Companies House deadline out.'
    },
    {
      name: 'Employer Costs Calculator',
      href: './employer-costs.html',
      blurb: 'Salary in, full cost of hire out (NI, pension, holiday).'
    },
    {
      name: 'Landlord Compliance Check',
      href: './landlord-compliance-check.html',
      blurb: '12 questions, Renters\u2019 Rights Act 2026 + 31 May Info Sheet.'
    }
  ];

  function buildMenu() {
    var menu = document.createElement('div');
    menu.className = 'free-tools-menu';
    menu.setAttribute('role', 'menu');

    var list = document.createElement('ul');
    list.className = 'free-tools-menu-list';
    TOOLS.forEach(function (it) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = it.href;
      a.setAttribute('role', 'menuitem');
      a.className = 'free-tools-menu-item';
      var name = document.createElement('span');
      name.className = 'free-tools-menu-name';
      name.textContent = it.name;
      var blurb = document.createElement('span');
      blurb.className = 'free-tools-menu-blurb';
      blurb.textContent = it.blurb;
      a.appendChild(name);
      a.appendChild(blurb);
      li.appendChild(a);
      list.appendChild(li);
    });
    menu.appendChild(list);

    var foot = document.createElement('div');
    foot.className = 'free-tools-menu-foot';
    foot.innerHTML = 'All free, no signup, no email gate.';
    menu.appendChild(foot);

    return menu;
  }

  function mount() {
    var triggers = document.querySelectorAll('[data-free-tools-nav]');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      if (trigger.dataset.freeToolsNavMounted === '1') return;
      trigger.dataset.freeToolsNavMounted = '1';

      var wrap = document.createElement('div');
      wrap.className = 'free-tools-dropdown';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'free-tools-dropdown-trigger';
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = 'Free tools <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';

      var menu = buildMenu();
      wrap.appendChild(btn);
      wrap.appendChild(menu);

      trigger.replaceWith(wrap);

      function setOpen(open) {
        wrap.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!wrap.classList.contains('is-open'));
      });

      document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) setOpen(false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
