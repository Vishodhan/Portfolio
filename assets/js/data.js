/* =========================================================================
   Data loader.
   Every piece of content on this site comes from /data/*.json.
   Add a key here and it becomes available to the renderer.
   ========================================================================= */
(function (global) {
  'use strict';

  var SOURCES = {
    profile: 'data/profile.json',
    experience: 'data/experience.json',
    projects: 'data/projects.json',
    skills: 'data/skills.json',
    navigation: 'data/navigation.json'
  };

  function loadOne(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (res) {
      if (!res.ok) throw new Error(url + ' returned ' + res.status);
      return res.json();
    });
  }

  function load() {
    /* The single-file preview build inlines the same JSON here. */
    if (global.__PORTFOLIO_DATA__) {
      return Promise.resolve(global.__PORTFOLIO_DATA__);
    }

    var keys = Object.keys(SOURCES);
    return Promise.all(keys.map(function (k) { return loadOne(SOURCES[k]); }))
      .then(function (results) {
        var data = {};
        keys.forEach(function (k, i) { data[k] = results[i]; });
        return data;
      });
  }

  global.PFData = { load: load, sources: SOURCES };
})(window);
