/* Mobile burger: toggles the full-screen menu (see the phone rules in css/style.css). */
(function () {
  var btn = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  // closing when the viewport grows past the phone breakpoint keeps state sane
  window.matchMedia('(min-width: 721px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
