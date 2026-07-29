/* =========================================================================
   Theme controller — dark by default, light on request.
   Storage is wrapped so the page still works where localStorage is blocked
   (sandboxed iframes, Safari private mode, file:// in some browsers).
   ========================================================================= */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'vk-portfolio-theme';
  var DEFAULT_THEME = 'dark';
  var fallback = Object.create(null);

  var store = {
    get: function (key) {
      try {
        return global.localStorage.getItem(key);
      } catch (err) {
        return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : null;
      }
    },
    set: function (key, value) {
      try {
        global.localStorage.setItem(key, value);
      } catch (err) {
        fallback[key] = value;
      }
    }
  };

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme) {
    var next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', next === 'light' ? '#F5FAFB' : '#0E1415');
    }
    syncToggle(next);
    return next;
  }

  function syncToggle(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    var goingTo = theme === 'light' ? 'dark' : 'light';
    var icon = button.querySelector('.material-symbols-rounded');

    if (icon) icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    button.setAttribute('aria-pressed', String(theme === 'light'));
    button.setAttribute('aria-label', 'Switch to ' + goingTo + ' theme');
    button.setAttribute('title', 'Switch to ' + goingTo + ' theme');
  }

  function toggle() {
    var next = current() === 'light' ? 'dark' : 'light';
    store.set(STORAGE_KEY, next);
    apply(next);

    var live = document.getElementById('live-region');
    if (live) live.textContent = next === 'light' ? 'Light theme on' : 'Dark theme on';
  }

  function init() {
    apply(store.get(STORAGE_KEY) || DEFAULT_THEME);

    var button = document.getElementById('theme-toggle');
    if (button) button.addEventListener('click', toggle);
  }

  /* Run before first paint when loaded in <head>; the rest waits for DOM. */
  apply(store.get(STORAGE_KEY) || DEFAULT_THEME);

  global.PFTheme = { init: init, toggle: toggle, apply: apply, current: current };
})(window);
