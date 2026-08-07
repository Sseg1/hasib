/* shared behaviour: menu, search filter, formatting helpers */

// --- dropdown menu ---------------------------------------
(function () {
  var btn = document.querySelector('[data-menu-btn]');
  var menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;

  function close() {
    menu.setAttribute('data-open', 'false');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

// --- search filter on the home page ----------------------
(function () {
  var input = document.querySelector('[data-search]');
  if (!input) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.cat'));

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    cards.forEach(function (c) {
      c.hidden = q !== '' && c.textContent.toLowerCase().indexOf(q) === -1;
    });
    groups.forEach(function (g) {
      var any = g.querySelectorAll('.card:not([hidden])').length > 0;
      g.style.display = any ? '' : 'none';
    });
  });
})();

// --- formatting helpers ----------------------------------
function money(n, cur) {
  return (cur || '') + n.toLocaleString('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });
}
function num(n, dp) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: dp === undefined ? 0 : dp,
    maximumFractionDigits: dp === undefined ? 2 : dp
  });
}

/* Renders rows into a .tape element.
   rows: [ [label, value, isTotal?] ...]  */
function printTape(el, rows, note) {
  var html = '';
  rows.forEach(function (r) {
    html += '<div class="tape-row' + (r[2] ? ' tape-total' : '') + '">' +
            '<span>' + r[0] + '</span><span>' + r[1] + '</span></div>';
  });
  if (note) html += '<div class="tape-note">' + note + '</div>';
  el.querySelector('.tape-body').innerHTML = html;
  el.setAttribute('data-printed', 'false');
  void el.offsetWidth;           // restart the feed animation
  el.setAttribute('data-printed', 'true');
}

function showError(el, msg) {
  el.textContent = msg;
  el.setAttribute('data-show', msg ? 'true' : 'false');
}
