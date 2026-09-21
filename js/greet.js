/* Personalised invitation: index.html?n=ali  →  "Confirma que véns, Ali"
   The name is inserted as text (never HTML) and limited to plain letters. */
(function () {
  var name = new URLSearchParams(location.search).get('n');
  if (!name) return;
  name = name.trim().slice(0, 30);
  if (!/^[\p{L}\p{M}' \-]+$/u.test(name)) return;
  // Capitalise each word: "ali" → "Ali", "maria josé" → "Maria José"
  name = name.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, function (m, sep, ch) {
    return sep + ch.toUpperCase();
  });
  document.addEventListener('DOMContentLoaded', function () {
    var cta = document.querySelector('.hero .cta');
    if (cta) cta.textContent = 'Confirma que véns, ' + name;
  });
})();
