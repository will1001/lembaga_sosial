(function () {
  var header = document.querySelector('[data-site-header]');
  var toggle = document.querySelector('[data-menu-toggle]');

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  }

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var active = header.classList.toggle('menu-active');
      document.body.classList.toggle('menu-open', active);
      toggle.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
  }
})();
