/*
  Review switcher: a small floating bar that links Website A, Website B and the
  logo options page. It's only for the review stage.
  Before launch, delete the <script src="...review-bar.js"> line from index.html.
*/
(function () {
  var me = document.currentScript;
  if (!me || document.querySelector('.rv-bar')) return;
  var base = me.src.replace(/assets\/review-bar\.js(\?.*)?$/, '');
  var path = location.pathname;
  var here = /\/logos(\/|\/index\.html)?$/.test(path) ? 'logos'
           : /\/version-b(\/|\/index\.html)?$/.test(path) ? 'b' : 'a';
  var pages = [
    ['a', 'Website A', base],
    ['b', 'Website B', base + 'version-b/'],
    ['logos', 'Logos', base + 'logos/']
  ];

  var css = document.createElement('style');
  css.textContent =
    '.rv-bar{position:fixed;left:50%;bottom:16px;z-index:9000;transform:translateX(-50%);display:flex;align-items:center;gap:4px;' +
    'padding:5px;border-radius:999px;background:rgba(18,36,30,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);' +
    'box-shadow:0 16px 36px -14px rgba(0,0,0,.55),0 0 0 1px rgba(246,242,234,.08);' +
    "font:600 13px/1 'Funnel Sans',ui-sans-serif,system-ui,sans-serif;white-space:nowrap}" +
    '.rv-bar .rv-l{padding:0 8px 0 12px;color:#8E9A94;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase}' +
    '.rv-bar a{display:inline-flex;align-items:center;gap:.3em;min-height:38px;padding:0 15px;border-radius:999px;color:#F6F2EA;text-decoration:none;transition:background-color .2s}' +
    '.rv-bar a:hover{background:rgba(246,242,234,.12)}' +
    '.rv-bar a[aria-current="page"]{background:#F2C4D2;color:#12241E}' +
    '.rv-bar a:focus-visible{outline:2px solid #F2C4D2;outline-offset:2px}' +
    '.rv-bar .rv-s{display:none}' +
    '@media (max-width:600px){' +
      '.rv-bar{left:auto;right:10px;bottom:10px;transform:none;gap:2px;padding:4px;transition:transform .35s cubic-bezier(.2,.9,.25,1),opacity .35s}' +
      '.rv-bar .rv-l,.rv-bar .rv-w{display:none}.rv-bar .rv-s{display:inline}' +
      '.rv-bar a{min-height:34px;padding:0 12px;font-size:12.5px}' +
      '.rv-bar.rv-hide{transform:translateY(calc(100% + 24px));opacity:0;pointer-events:none}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){.rv-bar{transition:none}}' +
    '@media print{.rv-bar{display:none}}';
  document.head.appendChild(css);

  var nav = document.createElement('nav');
  nav.className = 'rv-bar';
  nav.setAttribute('aria-label', 'Review pages');
  var label = document.createElement('span');
  label.className = 'rv-l';
  label.textContent = 'Review';
  nav.appendChild(label);
  pages.forEach(function (p) {
    var a = document.createElement('a');
    a.href = p[2];
    if (p[0] === 'logos') {
      a.textContent = p[1];
    } else {
      a.innerHTML = '<span class="rv-w">Website</span><span class="rv-s">Site</span> ' + p[1].slice(-1);
    }
    if (p[0] === here) a.setAttribute('aria-current', 'page');
    nav.appendChild(a);
  });
  document.body.appendChild(nav);

  // On phones, slide the bar away while scrolling down and bring it back on the way up.
  var lastY = window.pageYOffset, ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.pageYOffset;
    var nearEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 60;
    if (window.innerWidth > 600 || y < 80 || nearEnd || y < lastY - 4) nav.classList.remove('rv-hide');
    else if (y > lastY + 4) nav.classList.add('rv-hide');
    if (Math.abs(y - lastY) > 4) lastY = y;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  // Give the footer extra room so the bar never covers its last line.
  var footers = document.querySelectorAll('footer');
  var foot = footers[footers.length - 1];
  if (foot) {
    var pb = parseFloat(getComputedStyle(foot).paddingBottom) || 0;
    foot.style.paddingBottom = (pb + 72) + 'px';
  }
})();
