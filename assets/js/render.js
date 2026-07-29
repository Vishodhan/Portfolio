/* =========================================================================
   Renderer — JSON in, Material 3 markup out.
   ========================================================================= */
(function (global) {
  'use strict';

  /* ---------- helpers ---------- */

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* Escape first, then allow **bold** and `code` from the JSON. */
  function rich(value) {
    return esc(value)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function icon(name) {
    return '<span class="material-symbols-rounded" aria-hidden="true">' + esc(name) + '</span>';
  }

  /* Material Symbols ships no brand logos, so the official marks are inlined
     as 24x24 paths and tinted with currentColor like any other icon. */
  var BRAND_MARKS = {
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'
  };

  function brandMark(name) {
    var d = BRAND_MARKS[String(name || '').toLowerCase()];
    if (typeof d !== 'string') return '';
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" ' +
      'aria-hidden="true" focusable="false"><path d="' + d + '"></path></svg>';
  }

  /* Brand mark where one exists, otherwise fall back to the JSON's Material icon. */
  function socialIcon(link) {
    return brandMark(link.label) || icon(link.icon);
  }

  function isExternal(href) {
    return /^https?:\/\//i.test(href || '');
  }

  function linkAttrs(href) {
    return isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
  }

  function sectionHead(eyebrow, heading, id) {
    return '' +
      '<div class="pf-section__head">' +
        '<p class="md-utility pf-eyebrow">' + esc(eyebrow) + '</p>' +
        '<span class="pf-section__rule" aria-hidden="true"></span>' +
      '</div>' +
      '<h2 class="md-headline-medium" id="' + esc(id) + '-heading" tabindex="-1">' + esc(heading) + '</h2>';
  }

  function chips(items, modifier) {
    if (!items || !items.length) return '';
    return items.map(function (item) {
      return '<li class="md-chip' + (modifier ? ' ' + modifier : '') + '">' + esc(item) + '</li>';
    }).join('');
  }

  /* ---------- navigation ---------- */

  function navigation(destinations) {
    var rail = destinations.map(function (d) {
      return '' +
        '<li>' +
          '<a class="md-nav-rail__item js-nav-link" href="#' + esc(d.id) + '" data-target="' + esc(d.id) + '">' +
            '<span class="md-nav-rail__icon">' + icon(d.icon) + '</span>' +
            '<span class="md-nav-rail__label">' + esc(d.label) + '</span>' +
          '</a>' +
        '</li>';
    }).join('');

    var bar = destinations.map(function (d) {
      return '' +
        '<a class="md-nav-bar__item js-nav-link" href="#' + esc(d.id) + '" data-target="' + esc(d.id) + '">' +
          '<span class="md-nav-bar__icon">' + icon(d.icon) + '</span>' +
          '<span class="md-nav-bar__label">' + esc(d.label) + '</span>' +
        '</a>';
    }).join('');

    return { rail: '<ul class="md-nav-rail__list">' + rail + '</ul>', bar: bar };
  }

  /* ---------- hero ---------- */

  function orchestrationGraph(graph) {
    if (!graph || !graph.nodes) return '';

    var W = 92, H = 28, R = 8;

    var edges = (graph.edges || []).map(function (e) {
      return '<path class="pf-graph__edge" d="' + esc(e.d) + '"></path>';
    }).join('');

    var pulses = (graph.edges || []).map(function (e) {
      return '<path class="pf-graph__pulse" d="' + esc(e.d) +
        '" style="animation-delay:' + (Number(e.delay) || 0) + 's"></path>';
    }).join('');

    var nodes = graph.nodes.map(function (n) {
      var w = n.id === 'supervisor' ? 86 : W;
      var x = Number(n.x), y = Number(n.y);
      var tone = n.tone === 'primary' ? '--primary' : (n.tone === 'tertiary' ? '--tertiary' : '');
      return '' +
        '<g>' +
          '<rect class="pf-graph__box' + (tone ? ' pf-graph__box' + tone : '') + '" ' +
            'x="' + x + '" y="' + y + '" width="' + w + '" height="' + H + '" rx="' + R + '"></rect>' +
          '<text class="pf-graph__text' + (tone ? ' pf-graph__text' + tone : '') + '" ' +
            'x="' + (x + w / 2) + '" y="' + (y + H / 2 + 0.5) + '">' + esc(n.label) + '</text>' +
        '</g>';
    }).join('');

    var alt = 'Diagram: a supervisor agent routes work to retrieval, research, and analysis agents, ' +
              'which all feed a validator before a response is returned.';

    return '' +
      '<figure class="pf-graph-wrap">' +
        '<svg class="pf-graph" viewBox="0 0 360 300" role="img" aria-label="' + esc(alt) + '">' +
          '<g>' + edges + '</g>' +
          '<g>' + pulses + '</g>' +
          '<g>' + nodes + '</g>' +
        '</svg>' +
        '<figcaption class="md-body-small pf-graph__caption">' + esc(graph.caption || '') + '</figcaption>' +
      '</figure>';
  }

  function hero(profile) {
    var actions = (profile.actions || []).map(function (a) {
      var variant = a.variant === 'filled' ? 'md-button--filled' :
                    a.variant === 'tonal'  ? 'md-button--tonal'  : 'md-button--outlined';
      return '<a class="md-button md-state ' + variant + '" href="' + esc(a.href) + '"' + linkAttrs(a.href) + '>' +
        (a.icon ? icon(a.icon) : '') + '<span>' + esc(a.label) + '</span></a>';
    }).join('');

    var social = (profile.links || []).filter(function (l) { return l.primary; }).map(function (l) {
      return '<a class="md-icon-button md-icon-button--tonal md-state" href="' + esc(l.href) + '"' +
        linkAttrs(l.href) + ' aria-label="' + esc(l.label) + ' — ' + esc(l.handle) + '">' +
        socialIcon(l) + '</a>';
    }).join('');

    var photo = profile.photo || {};

    var art = photo.src
      ? '<div class="pf-hero__art">' +
          '<img src="' + esc(photo.src) + '" alt="' + esc(photo.alt || profile.name) + '" ' +
            'width="2218" height="2218" decoding="async" fetchpriority="high">' +
        '</div>'
      : '';

    return '' +
      '<div class="pf-hero">' +
        '<div>' +
          '<h1 class="md-display-large pf-hero__name">' + esc(profile.name) + '</h1>' +
          '<p class="md-headline-small pf-hero__headline">' + esc(profile.headline) + '</p>' +
          '<ul class="pf-tags" style="margin-top:20px">' +
            '<li class="md-chip md-chip--status"><span class="pf-pulse" aria-hidden="true"></span>' +
              esc(profile.availability) + '</li>' +
          '</ul>' +
          '<p class="md-body-large pf-hero__summary">' + esc(profile.summary) + '</p>' +
          '<div class="pf-hero__actions">' + actions + '</div>' +
          '<div class="pf-hero__social" ' +
            'style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin-top:16px">' +
            social +
          '</div>' +
        '</div>' +
        art +
      '</div>';
  }

  /* ---------- experience ---------- */

  function role(r) {
    var bullets = (r.bullets || []).map(function (b) {
      return '<li class="md-body-medium">' + rich(b) + '</li>';
    }).join('');

    var dates = esc(r.start) + ' — ' + esc(r.end);

    return '' +
      '<li>' +
        '<article class="md-card md-card--outlined md-card--interactive pf-role">' +
          '<div class="pf-role__meta">' +
            '<span class="md-utility pf-role__dates">' + dates + '</span>' +
            (r.current ? '<span class="md-chip md-chip--accent">Current</span>' : '') +
          '</div>' +
          '<h3 class="md-title-large pf-role__title">' + esc(r.title) + '</h3>' +
          '<p class="md-body-medium pf-role__org">' + esc(r.company) + ' · ' + esc(r.location) + '</p>' +
          '<ul class="pf-bullets">' + bullets + '</ul>' +
          '<ul class="pf-tags">' + chips(r.tags) + '</ul>' +
        '</article>' +
      '</li>';
  }

  function education(edu) {
    if (!edu || !edu.items) return '';

    var items = edu.items.map(function (e) {
      return '' +
        '<li class="md-card md-card--outlined pf-edu__item">' +
          '<div>' +
            '<h4 class="md-title-medium">' + esc(e.degree) + '</h4>' +
            '<p class="md-body-small" style="color:var(--md-sys-color-on-surface-variant)">' +
              esc(e.school) + ' · ' + esc(e.location) + '</p>' +
          '</div>' +
          '<span class="md-utility pf-edu__dates">' + esc(e.start) + ' — ' + esc(e.end) + '</span>' +
        '</li>';
    }).join('');

    return '' +
      '<h3 class="md-title-large" style="margin-top:24px">' + esc(edu.heading) + '</h3>' +
      '<ul class="pf-edu">' + items + '</ul>';
  }

  function experience(data) {
    return sectionHead( data.heading, 'Professional') +
      '<ol class="pf-timeline" style="margin-top:32px">' +
        (data.roles || []).map(role).join('') +
      '</ol>' +
      education(data.education);
  }

  /* ---------- projects ---------- */

  function project(p) {
    var links = (p.links || []).map(function (l) {
      return '<a class="md-button md-button--outlined md-state" href="' + esc(l.href) + '"' +
        linkAttrs(l.href) + '>' + '<span>' + esc(l.label) + '</span>' + icon(l.icon || 'open_in_new') +
        (isExternal(l.href) ? '<span class="sr-only"> (opens in a new tab)</span>' : '') + '</a>';
    }).join('');

    return '' +
      '<li>' +
        '<article class="md-card md-card--outlined md-card--interactive pf-project">' +
          '<p class="md-utility pf-project__kicker">' + esc(p.kicker) + '</p>' +
          '<h3 class="md-title-large pf-project__name">' + esc(p.name) + '</h3>' +
          '<p class="md-body-medium pf-project__body">' + esc(p.description) + '</p>' +
          '' +
          '<div class="pf-project__links">' + links + '</div>' +
        '</article>' +
      '</li>';
  }

  function projects(data) {
    return sectionHead(data.eyebrow, data.heading, 'projects') +
      '<ul class="pf-projects" style="margin-top:16px">' +
        (data.items || []).map(project).join('') +
      '</ul>';
  }

  /* ---------- skills ---------- */

  function skills(data) {
    var groups = (data.groups || []).map(function (g) {
      return '' +
        '<li class="md-card md-card--outlined pf-skill-group">' +
          '<div class="pf-skill-group__head">' +
            '<span class="pf-skill-group__icon">' + icon(g.icon) + '</span>' +
            '<h3 class="md-title-medium">' + esc(g.name) + '</h3>' +
          '</div>' +
          '<ul class="pf-skill-group__items">' + chips(g.items) + '</ul>' +
        '</li>';
    }).join('');

    return sectionHead(data.eyebrow, data.heading, 'skills') +
      '<ul class="pf-skills" style="margin-top:16px">' + groups + '</ul>';
  }

  /* ---------- contact ---------- */

  function contact(profile) {
    var c = profile.contact || {};

    var links = (profile.links || []).map(function (l) {
      return '' +
        '<a class="pf-contact__link md-state" href="' + esc(l.href) + '"' + linkAttrs(l.href) + '>' +
          '<span class="md-icon-button md-icon-button--tonal" aria-hidden="true" ' +
            'style="width:40px;height:40px;pointer-events:none">' + icon(l.icon) + '</span>' +
          '<span>' +
            '<span class="md-title-small" style="display:block">' + esc(l.label) + '</span>' +
            '<span class="pf-contact__handle">' + esc(l.handle) + '</span>' +
          '</span>' +
          '<span class="pf-contact__arrow" aria-hidden="true">' + icon('north_east') + '</span>' +
          (isExternal(l.href) ? '<span class="sr-only">(opens in a new tab)</span>' : '') +
        '</a>';
    }).join('');

    return sectionHead(profile.availability, c.heading || 'Contact', 'contact') +
      '<div class="md-card pf-contact" style="margin-top:32px">' +
        '<p class="md-body-large pf-contact__body">' + esc(c.body) + '</p>' +
        '<div class="pf-contact__links">' + links + '</div>' +
      '</div>';
  }

  /* ---------- footer ---------- */

  function footer(profile) {
    var f = profile.footer || {};
    return '' +
      '<div class="pf-footer__inner md-body-small">' +
        '<span>' + esc(f.credit) + '</span>' +
        '<span>' + esc(f.note) + '</span>' +
      '</div>';
  }

  global.PFRender = {
    navigation: navigation,
    hero: hero,
    experience: experience,
    projects: projects,
    skills: skills,
    contact: contact,
    footer: footer,
    esc: esc
  };
})(window);
