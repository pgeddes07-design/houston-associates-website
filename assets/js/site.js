// Houston & Associates: small enhancements. The page works without this file.
(function () {
  'use strict';

  // Open / closed badge, worked out in Johannesburg time (Mon to Fri, 08:00 to 17:00)
  function updateStatus() {
    var open = false;
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Johannesburg', weekday: 'short', hour: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var get = function (type) {
        for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
        return '';
      };
      var day = get('weekday');
      var hour = parseInt(get('hour'), 10);
      open = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) !== -1 && hour >= 8 && hour < 17;
    } catch (e) { open = false; }
    document.querySelectorAll('[data-when]').forEach(function (el) {
      el.style.display = el.getAttribute('data-when') === (open ? 'open' : 'closed') ? 'inline-flex' : 'none';
    });
  }

  // Years in business and copyright year stay current on their own
  function updateYears() {
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
    document.querySelectorAll('[data-years]').forEach(function (el) { el.textContent = year - 1998; });
  }

  // Mobile menu
  function setupMenu() {
    var header = document.querySelector('.hna-header');
    var btn = document.querySelector('.hna-menubtn');
    var menu = document.getElementById('hna-menu');
    if (!header || !btn || !menu) return;
    function close() {
      header.classList.remove('hna-nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      var isOpen = header.classList.toggle('hna-nav-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // Header gets a shadow once the page scrolls
  function setupHeader() {
    var header = document.querySelector('.hna-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Contact form: no server needed. It opens the visitor's email app with the message filled in.
  // To collect messages on a form service instead (e.g. Formspree), change the form's action and remove this.
  function setupForm() {
    var form = document.getElementById('hna-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (name) { return (form.elements[name] && form.elements[name].value || '').trim(); };
      var subject = 'Website enquiry from ' + v('name');
      var lines = [v('message'), '', 'Name: ' + v('name'), 'Email: ' + v('email')];
      if (v('phone')) lines.push('Phone: ' + v('phone'));
      window.location.href = 'mailto:accounts@houstoncc.co.za?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  function init() {
    updateStatus();
    updateYears();
    setupMenu();
    setupHeader();
    setupForm();
    setInterval(updateStatus, 60 * 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
