/* =========================================================================
   Navigation behaviour.
   Keeps the rail / bar active indicator in sync with the scroll position,
   and moves keyboard focus to the destination heading after a jump.
   ========================================================================= */
(function (global) {
  'use strict';

  var activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;

    var links = document.querySelectorAll('.js-nav-link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var isActive = link.getAttribute('data-target') === id;
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  function initScrollSpy(ids) {
    var sections = ids
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!sections.length) return;

    if (!('IntersectionObserver' in global)) {
      setActive(ids[0]);
      return;
    }

    var visible = Object.create(null);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });

      /* Bottom of page always belongs to the last destination. */
      var atBottom = (global.innerHeight + global.scrollY) >= (document.body.scrollHeight - 4);
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      for (var i = 0; i < ids.length; i++) {
        if (visible[ids[i]]) { setActive(ids[i]); return; }
      }
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
    setActive(ids[0]);
  }

  /* Send focus to the heading so keyboard and screen reader users land
     where sighted users land. */
  function initFocusHandoff() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest ? event.target.closest('.js-nav-link') : null;
      if (!link) return;

      var id = link.getAttribute('data-target');
      var heading = document.getElementById(id + '-heading') || document.getElementById(id);
      if (!heading) return;

      global.setTimeout(function () {
        heading.focus({ preventScroll: true });
      }, 420);
    });
  }

  function initAppBar() {
    var bar = document.getElementById('app-bar');
    if (!bar) return;

    var ticking = false;
    function update() {
      bar.setAttribute('data-scrolled', String(global.scrollY > 8));
      ticking = false;
    }
    global.addEventListener('scroll', function () {
      if (!ticking) { global.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function initReveal() {
    var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll('.pf-reveal');

    if (reduced || !('IntersectionObserver' in global)) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-visible');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
  }

  global.PFNav = {
    init: function (ids) {
      initScrollSpy(ids);
      initFocusHandoff();
      initAppBar();
      initReveal();
    }
  };
})(window);
