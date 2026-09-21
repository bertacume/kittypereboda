/* Password gate for the whole site.
   Client-side only (static hosting): it keeps casual visitors out, nothing more.
   Only the SHA-256 of the password is stored here. To change the password run
   `printf 'newpassword' | shasum -a 256` and paste the result into HASH. */
(function () {
  var HASH = '35f2f3e73f3bc30eeee3d963ff61250984a0373c9988455fd9f623618c2bc1c5';
  var KEY = 'cp-unlocked';
  var root = document.documentElement;

  function remembered() {
    try { return localStorage.getItem(KEY) === HASH; } catch (e) { return false; }
  }
  function remember() {
    try { localStorage.setItem(KEY, HASH); } catch (e) {}
  }

  if (remembered()) return;
  root.classList.add('locked');          // hides the page until unlocked (see css)

  function sha256(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var gate = document.createElement('div');
    gate.className = 'gate';
    gate.innerHTML =
      '<form class="gate-box" autocomplete="off">' +
      '  <img class="gate-logo" src="media/cptitle.png" alt="Cristina i Pere">' +
      '  <p class="gate-text">Aquesta pàgina és només per als convidats.<br>Escriu la contrasenya de la invitació.</p>' +
      '  <input class="gate-input" type="password" inputmode="numeric" aria-label="Contrasenya" autofocus>' +
      '  <button class="gate-btn" type="submit">Entra</button>' +
      '  <p class="gate-error" role="alert" hidden>Contrasenya incorrecta.</p>' +
      '</form>';
    document.body.appendChild(gate);

    var form = gate.querySelector('form');
    var input = gate.querySelector('.gate-input');
    var error = gate.querySelector('.gate-error');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      sha256(input.value.trim()).then(function (hex) {
        if (hex === HASH) {
          remember();
          gate.classList.add('is-open');
          root.classList.remove('locked');
          setTimeout(function () { gate.remove(); }, 450);
        } else {
          error.hidden = false;
          input.value = '';
          input.focus();
          form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
        }
      });
    });
    input.focus();
  });
})();
