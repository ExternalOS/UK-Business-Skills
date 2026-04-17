/* =============================================================
   ExternalOS skills navigation
   Single source of truth for the All-skills masthead dropdown.
   To add a new skill: add an entry to the matching category below
   and the dropdown on every page updates automatically.
   ============================================================= */

(function () {
  var SKILLS = [
    {
      title: 'Freelancer & Contractor',
      items: [
        { name: 'UK Tax Calculator', href: './uk-tax-calculator.html' },
        { name: 'Invoice & Expense Categoriser', href: './invoice-expense-categoriser.html' },
        { name: 'Proposal Generator', href: './proposal-generator.html' },
        { name: 'Client Comms Drafter', href: './client-comms-drafter.html' },
        { name: 'IR35 Assessment', href: './ir35-assessment.html' },
        { name: 'Contract Review', href: './contract-review.html' },
        { name: 'Creative Contracts', href: './creative-contracts.html' }
      ]
    },
    {
      title: 'Landlord & Property',
      items: [
        { name: '31 May Landlord Kit', href: './landlord-31-may-kit.html', badge: 'Deadline' },
        { name: 'Landlord Compliance', href: './uk-landlord-compliance.html' },
        { name: 'Property Rental Yield', href: './property-rental-yield.html' }
      ]
    },
    {
      title: 'Employer & HR',
      items: [
        { name: 'UK Employment Law', href: './uk-employment-law.html' },
        { name: 'Employee Handbook Generator', href: './employee-handbook-generator.html' },
        { name: 'Meeting Notes & Actions', href: './meeting-notes-actions.html' }
      ]
    },
    {
      title: 'Industry & Compliance',
      items: [
        { name: 'GDPR Compliance', href: './gdpr-compliance.html' },
        { name: 'AML/KYC Documentation', href: './aml-kyc-docs.html' },
        { name: 'Health & Safety Risk Assessment', href: './health-safety-risk-assessment.html' },
        { name: 'Food Hygiene & HACCP', href: './food-hygiene-haccp.html' },
        { name: 'Construction Quote', href: './construction-quote.html' },
        { name: 'Grant Application Writer', href: './grant-application-writer.html' },
        { name: 'Teacher Lesson Plans', href: './teacher-lesson-plans.html' }
      ]
    }
  ];

  function buildMenu() {
    var menu = document.createElement('div');
    menu.className = 'skills-menu';
    menu.setAttribute('role', 'menu');

    SKILLS.forEach(function (cat) {
      var col = document.createElement('div');
      col.className = 'skills-menu-col';

      var title = document.createElement('div');
      title.className = 'skills-menu-title';
      title.textContent = cat.title;
      col.appendChild(title);

      var list = document.createElement('ul');
      list.className = 'skills-menu-list';
      cat.items.forEach(function (it) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = it.href;
        a.setAttribute('role', 'menuitem');
        a.textContent = it.name;
        if (it.badge) {
          var b = document.createElement('span');
          b.className = 'skills-menu-badge';
          b.textContent = it.badge;
          a.appendChild(b);
        }
        li.appendChild(a);
        list.appendChild(li);
      });
      col.appendChild(list);
      menu.appendChild(col);
    });

    return menu;
  }

  function mount() {
    var triggers = document.querySelectorAll('[data-skills-nav]');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      if (trigger.dataset.skillsNavMounted === '1') return;
      trigger.dataset.skillsNavMounted = '1';

      var wrap = document.createElement('div');
      wrap.className = 'skills-dropdown';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'skills-dropdown-trigger';
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = 'All skills <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';

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
