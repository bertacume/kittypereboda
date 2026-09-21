/* Personalised invitation from the URL:
     index.html?n=ali        →  "Hola, Ali"          + "Confirma que véns"
     index.html?n=ali,joan   →  "Hola, Ali i Joan"   + "Confirmeu que veniu"
   Names are comma-separated, inserted as text (never HTML) and limited to letters. */
(function () {
  var raw = new URLSearchParams(location.search).get('n');
  if (!raw) return;

  function capitalise(s) {
    return s.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, function (m, sep, ch) {
      return sep + ch.toUpperCase();
    });
  }
  var names = raw.split(',').map(function (s) { return s.trim().slice(0, 30); })
    .filter(function (s) { return /^[\p{L}\p{M}' \-]+$/u.test(s); })
    .map(capitalise)
    .slice(0, 4);
  if (!names.length) return;

  var list = names.length === 1 ? names[0]
           : names.slice(0, -1).join(', ') + ' i ' + names[names.length - 1];
  var plural = names.length > 1;

  document.addEventListener('DOMContentLoaded', function () {
    var label = document.querySelector('.hero-label--place');
    var cta = document.querySelector('.hero .cta');
    if (label) {
      label.textContent = 'Hola, ' + list;
      label.classList.add('hero-label--greeting');
    }
    if (cta) cta.textContent = plural ? 'Confirmeu que veniu' : 'Confirma que véns';
  });
})();
