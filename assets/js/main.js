/* =========================================================================
   Bootstrap.
   ========================================================================= */
(function (global) {
  'use strict';

  function mount(id, html) {
    var node = document.getElementById(id);
    if (node) node.innerHTML = html;
  }

  function showLoadError(err) {
    var notice = document.getElementById('load-error');
    if (!notice) return;

    var onFile = global.location.protocol === 'file:';
    notice.hidden = false;
    notice.innerHTML = onFile
      ? '<h2 class="md-title-medium">Content needs a local server</h2>' +
        '<p class="md-body-medium" style="margin-top:8px">Browsers block <code>fetch</code> on ' +
        '<code>file://</code>, so the JSON in <code>/data</code> cannot load. From the project ' +
        'folder run <code>python3 -m http.server 8000</code> and open ' +
        '<code>http://localhost:8000</code>. Or open <code>preview.html</code>, which has the ' +
        'same content inlined.</p>'
      : '<h2 class="md-title-medium">Content did not load</h2>' +
        '<p class="md-body-medium" style="margin-top:8px">The JSON files in <code>/data</code> ' +
        'could not be read. Check that the folder shipped with the site and that each file is ' +
        'valid JSON.</p>';

    if (global.console && console.error) console.error(err);
  }

  function start() {
    if (global.PFTheme) global.PFTheme.init();

    global.PFData.load().then(function (data) {
      var R = global.PFRender;

      /* Navigation */
      var nav = R.navigation(data.navigation.destinations);
      mount('nav-rail', nav.rail);
      mount('nav-bar', nav.bar);

      /* Sections */
      mount('home-content', R.hero(data.profile));
      mount('work-content', R.experience(data.experience));
      mount('projects-content', R.projects(data.projects));
      mount('skills-content', R.skills(data.skills));
      mount('contact-content', R.contact(data.profile));
      mount('site-footer', R.footer(data.profile));

      /* Document metadata straight from profile.json */
      document.title = data.profile.name + ' — ' + data.profile.role;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && data.profile.meta) desc.setAttribute('content', data.profile.meta.description);

      /* Reveal-on-scroll targets */
      var sections = document.querySelectorAll('.pf-section');
      for (var i = 0; i < sections.length; i++) sections[i].classList.add('pf-reveal');

      global.PFNav.init(data.navigation.destinations.map(function (d) { return d.id; }));
    }).catch(showLoadError);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})(window);
