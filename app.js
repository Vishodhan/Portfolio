/* =========================================================================
   Vishodhan Krishnan — portfolio

   To change what the site says, edit CONTENT. To change how it looks, edit
   style.css. Nothing else needs touching.

   Loaded from <head> without `defer` on purpose: the saved theme has to land
   before first paint, so there is no flash. Rendering waits for the DOM.
   ========================================================================= */
(() => {
  'use strict';

  /* =======================================================================
     CONTENT — every word on the page.

     Inside bullets and descriptions, **text** renders bold and `text` renders
     as inline code. Strings are escaped before that conversion, so pasted
     text cannot inject markup.

     Adding a job: append to experience.roles — array order is page order, and
     `current: true` adds the "Current" chip. Adding a nav destination: add to
     `nav`, then add a matching <section> to index.html. Keep it to five or
     fewer; Material 3 caps a navigation bar at five.
     ======================================================================= */
  const CONTENT = {
    nav: [
      { id: 'home',     label: 'Home',     icon: 'home' },
      { id: 'work',     label: 'Work',     icon: 'work' },
      { id: 'projects', label: 'Projects', icon: 'deployed_code' },
      { id: 'skills',   label: 'Skills',   icon: 'category' },
      { id: 'contact',  label: 'Contact',  icon: 'alternate_email' }
    ],

    profile: {
      name: 'Vishodhan Krishnan',
      headline: 'I build multi-agent LLM systems that survive contact with production.',
      summary: 'AI Engineer with 3 years of engineering experience, including production-grade LLM and multi-agent systems across healthcare, finance, and enterprise data',
      availability: 'Open to Applied AI and software engineering roles',
      photo: {
        src: 'assets/img/vishodhan-krishnan-cropped.jpg',
        alt: 'Vishodhan Krishnan, smiling, in a dark blue shirt'
      },
      actions: [
        {
          label: 'View Resume',
          href: 'https://drive.google.com/file/d/17CBvlom_Lo7E0J2vn913ZmQEHHMyPslz/view?usp=sharing',
          variant: 'filled',
          icon: 'arrow_downward'
        },
        { label: 'Get in touch', href: 'mailto:vishodhan10@gmail.com', variant: 'outlined', icon: 'mail' }
      ],
      /* `label` also selects the brand mark in MARKS, falling back to a generic icon. */
      links: [
        { label: 'GitHub', handle: 'github.com/Vishodhan', href: 'https://github.com/Vishodhan' },
        { label: 'LinkedIn', handle: 'linkedin.com/in/vishodhankrishnan', href: 'https://www.linkedin.com/in/vishodhankrishnan' }
      ],
      contact: {
        heading: "Let's talk",
        body: "I'm looking for AI engineering work on agentic systems, retrieval, and applied LLMs. If that's what you're hiring for, send a note — I'll respond at the earliest."
      },
      footer: {
        credit: '© 2026 Vishodhan Krishnan'      }
    },

    experience: {
      eyebrow: 'Professional Experience',
      roles: [
        {
          title: 'AI Engineer',
          company: 'Rebecca Everlene Trust',
          location: 'Chicago, IL',
          start: 'Feb 2026',
          end: 'Present',
          current: true,
          tags: ['Multi-agent', 'MCP', 'Fine-tuning', 'PyTorch'],
          bullets: [
            'Cut onboarding effort by building a **multi-agent system with MCP** that validates onboarding submissions and maps OCR-parsed skills for team matching.',
            'Ran **supervised fine-tuning (SFT)** on LLaMA 3 via HuggingFace across emotion datasets of **100,000+ samples**, lifting macro F1 by **22%** over the base pre-trained model.',
            'Built a **multi-class emotion classifier in PyTorch**, pushing raw text through a bidirectional LSTM to reach **92% accuracy** across 6 emotion categories on a 50,000-sample dataset.'
          ]
        },
        {
          title: 'Data AI Engineer, Co-op',
          company: 'Institute for Experiential AI',
          location: 'Portland, ME',
          start: 'Jan 2025',
          end: 'Jun 2025',
          tags: ['RAG', 'AWS Bedrock', 'FAISS', 'Gemini', 'CI/CD'],
          bullets: [
            'Architected an LLM pipeline on **Google Gemini 2.0 Flash** that extracts key fields from 7 EHR PDF report types into JSON and Excel at **95% accuracy**, feeding clinical decision support.',
            'Deployed a semantic search service exposing REST APIs at **sub-100ms latency** for 1,000+ users with **99.9% uptime**, built on FAISS and monitored through **AWS CloudWatch**.',
            'Built an **ETL ingestion pipeline** for a RAG Q&A system on **AWS Lambda, OpenSearch, S3 and Bedrock**, with automated retrieval-quality checks that enabled self-service and cut developer support time by **70%**.',
            'Configured **GitHub Actions CI/CD** workflows to automate model deployments and remove manual codebase integration.'
          ]
        },
        {
          title: 'Senior Software Engineer',
          company: 'Capgemini Technology Services',
          location: 'Mumbai, India',
          start: 'Sep 2021',
          end: 'Jul 2023',
          tags: ['SAP HANA', 'SQL', 'Data warehousing', 'BI'],
          bullets: [
            'Reduced **production incidents by 25%** by rearchitecting the SAP/HANA warehouse to remove recurring bottlenecks across critical reporting pipelines.',
            'Cut user-reported data discrepancies by **20%** by working directly with business users and translating what they described into pipeline fixes.',
            'Maintained and tuned SAP data pipelines behind **50+ BI dashboards** spanning finance, logistics, and customer service, holding data integrity and SLA compliance.',
            'Designed **HANA SQL** data models supporting executive reporting and root-cause analysis across 4 business workflows.'
          ]
        },
        {
          title: 'Machine Learning Intern',
          company: 'Grroom Inc',
          location: 'Mumbai, India',
          start: 'Apr 2021',
          end: 'Jun 2021',
          tags: ['YOLOv4', 'TensorFlow', 'Computer vision'],
          bullets: [
            'Curated a 1,000-image training set with bounding-box annotations and balanced classes for outfit generation.',
            "Trained and evaluated a **YOLOv4** detector in TensorFlow for the company's outfit generator, iterating across 5+ cycles to reach **66% mAP@0.5** over 6 classes."
          ]
        }
      ]
    },

    education: {
      eyebrow: 'Education',
      items: [
        {
          degree: 'M.S. Information Systems',
          school: 'Northeastern University',
          location: 'Boston, MA',
          start: 'Sep 2023',
          end: 'Dec 2025'
        },
        {
          degree: 'B.E. Information Technology',
          school: 'Mumbai University',
          location: 'Mumbai, India',
          start: 'Aug 2017',
          end: 'Jun 2021'
        }
      ]
    },

    projects: {
      eyebrow: 'Projects',
      items: [
        {
          name: 'Multi-Agent Trading Analysis System',
          kicker: '11 agents, one verdict',
          description: 'An 11-agent modular system with a multi-API pipeline on FastAPI and React that runs a full stock analysis and investment decision in under 3 minutes. Benchmarked 7 LLMs across 35,000+ workflow outputs to see which held up under different market regimes.',
          stack: ['FastAPI', 'React', 'Multi-agent', 'LLM benchmarking'],
          links: [
            { label: 'Live demo', href: 'https://www.tradearena.site/' },
            { label: 'Source code', href: 'https://github.com/Vishodhan/gtrade-arena' }
          ]
        },
        {
          name: 'Multi-Agent AI Research Tool with RAG',
          kicker: 'Web, Arxiv, and your own documents',
          description: 'A LangGraph-powered multi-agent system that searches the web, Arxiv, and a private document corpus. Apache Airflow automates parsing through Docling, Pinecone holds the embeddings, S3 stores source files, and Pydantic validates every agent output. Containerised with Docker behind a Streamlit UI.',
          stack: ['LangGraph', 'Pinecone', 'Airflow', 'Docling', 'Pydantic', 'Docker', 'Streamlit'],
          links: [{ label: 'Source code', href: 'https://github.com/Vishodhan/Multi-agent-AI-Research-Tool' }]
        },
        {
          name: 'XtractPDF — AI PDF text extractor',
          kicker: 'Document intelligence, end to end',
          description: 'A pipeline that pairs Google DocumentAI with PyMuPDF to extract structure from GAIA dataset PDFs, grades the results with an LLM-based evaluation through the OpenAI API, and lands processed output in AWS RDS for downstream access.',
          stack: ['Google DocumentAI', 'PyMuPDF', 'OpenAI API', 'AWS RDS'],
          links: [{ label: 'Source code', href: 'https://github.com/Vishodhan/AI-PDF-text-extractor' }]
        }
      ]
    },

    skills: {
      eyebrow: 'Skills',
      groups: [
        { name: 'Languages', icon: 'terminal', items: ['Python', 'SQL', 'JavaScript', 'React'] },
        {
          name: 'AI & ML',
          icon: 'neurology',
          items: ['LangGraph', 'LangChain', 'RAG', 'LLMs', 'Generative AI', 'MCP', 'PyTorch', 'TensorFlow', 'HuggingFace', 'Pydantic', 'FastAPI']
        },
        {
          name: 'Cloud & DevOps',
          icon: 'cloud',
          items: ['AWS S3', 'AWS EC2', 'AWS RDS', 'AWS Lambda', 'OpenSearch', 'CloudWatch', 'AWS Bedrock', 'Terraform', 'Docker', 'GitHub Actions', 'Apache Airflow']
        },
        {
          name: 'Databases',
          icon: 'database',
          items: ['MySQL', 'PostgreSQL', 'Snowflake', 'Pinecone', 'FAISS', 'OpenSearch', 'NoSQL']
        },
        { name: 'Data & Analytics', icon: 'insights', items: ['Pandas', 'NumPy', 'Streamlit', 'Tableau'] }
      ]
    }
  };

  /* =======================================================================
     Markup helpers
     ======================================================================= */
  const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const rich = (value) => esc(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  const sym = (name) => `<span class="material-symbols-rounded" aria-hidden="true">${esc(name)}</span>`;

  const external = (href) => /^https?:\/\//i.test(href);
  const target = (href) => (external(href) ? ' target="_blank" rel="noopener noreferrer"' : '');

  /* Links with visible text announce the new tab; icon-only links say it in
     their aria-label instead, since aria-label overrides inner text. */
  const newTab = (href) => (external(href) ? '<span class="sr-only"> (opens in a new tab)</span>' : '');

  const chips = (items) => items.map((item) => `<li class="chip">${esc(item)}</li>`).join('');

  /* Render every item and concatenate — the map().join('') each list needs. */
  const each = (items, render) => items.map(render).join('');

  /* Material Symbols ships no brand logos, so the official marks are inlined
     as 24x24 paths and tinted with currentColor like any other icon. */
  const MARKS = {
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'
  };

  const brand = ({ label }) => {
    const path = MARKS[label.toLowerCase()];
    return path
      ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="${path}"></path></svg>`
      : sym('link');
  };

  /* The eyebrow is the section heading; the rule fills the rest of its line. */
  const sectionHead = (eyebrow, id) => `
    <div class="section__head">
      <h2 id="${id}-heading" tabindex="-1">${esc(eyebrow)}</h2>
      <span class="rule" aria-hidden="true"></span>
    </div>`;

  /* =======================================================================
     Sections
     ======================================================================= */
  const navItem = (d) => `
    <a class="nav-item js-nav" href="#${d.id}" data-target="${d.id}">
      <span class="nav-item__icon">${sym(d.icon)}</span>
      <span class="nav-item__label">${esc(d.label)}</span>
    </a>`;

  const hero = (p) => `
    <div class="hero">
      <div>
        <h1 id="home-heading" tabindex="-1">${esc(p.name)}</h1>
        <p class="hero__headline">${esc(p.headline)}</p>
        <ul class="tags">
          <li class="chip chip--status"><span class="pulse" aria-hidden="true"></span>${esc(p.availability)}</li>
        </ul>
        <p class="hero__summary">${esc(p.summary)}</p>
        <div class="hero__actions">${each(p.actions, (a) => `
          <a class="btn btn--${a.variant} state" href="${esc(a.href)}"${target(a.href)}>
            ${sym(a.icon)}<span>${esc(a.label)}</span>${newTab(a.href)}
          </a>`)}
        </div>
        <div class="hero__social">${each(p.links, (l) => `
          <a class="icon-btn icon-btn--tonal state" href="${esc(l.href)}"${target(l.href)}
             aria-label="${esc(l.label)} — ${esc(l.handle)} (opens in a new tab)">${brand(l)}</a>`)}
        </div>
      </div>
      <div class="hero__art">
        <img src="${esc(p.photo.src)}" alt="${esc(p.photo.alt)}" decoding="async" fetchpriority="high">
      </div>
    </div>`;

  const experience = (e) => sectionHead(e.eyebrow, 'work') + `
    <ol class="timeline">${each(e.roles, (r) => `
      <li>
        <article class="card card--outlined card--hover role">
          <div class="role__meta">
            <span class="mono role__dates">${esc(r.start)} — ${esc(r.end)}</span>
            ${r.current ? '<span class="chip chip--accent">Current</span>' : ''}
          </div>
          <h3>${esc(r.title)}</h3>
          <p class="role__org">${esc(r.company)} · ${esc(r.location)}</p>
          <ul class="bullets">${each(r.bullets, (b) => `<li>${rich(b)}</li>`)}</ul>
          <ul class="tags">${chips(r.tags)}</ul>
        </article>
      </li>`)}
    </ol>`;

  const education = (e) => sectionHead(e.eyebrow, 'education') + `
    <ul class="edu">${each(e.items, (i) => `
      <li class="card card--outlined edu__item">
        <div>
          <h3>${esc(i.degree)}</h3>
          <p>${esc(i.school)} · ${esc(i.location)}</p>
        </div>
        <span class="mono edu__dates">${esc(i.start)} — ${esc(i.end)}</span>
      </li>`)}
    </ul>`;

  const projects = (d) => sectionHead(d.eyebrow, 'projects') + `
    <ul class="projects">${each(d.items, (p) => `
      <li>
        <article class="card card--outlined card--hover project">
          <p class="mono project__kicker">${esc(p.kicker)}</p>
          <h3>${esc(p.name)}</h3>
          <p class="project__body">${esc(p.description)}</p>
          <ul class="tags">${chips(p.stack)}</ul>
          <div class="project__links">${each(p.links, (l) => `
            <a class="btn btn--outlined state" href="${esc(l.href)}"${target(l.href)}>
              <span>${esc(l.label)}</span>${sym('open_in_new')}${newTab(l.href)}
            </a>`)}
          </div>
        </article>
      </li>`)}
    </ul>`;

  const skills = (d) => sectionHead(d.eyebrow, 'skills') + `
    <ul class="skills">${each(d.groups, (g) => `
      <li class="card card--outlined skill">
        <div class="skill__head">
          <span class="skill__icon">${sym(g.icon)}</span>
          <h3>${esc(g.name)}</h3>
        </div>
        <ul class="tags">${chips(g.items)}</ul>
      </li>`)}
    </ul>`;

  const contact = (p) => sectionHead(p.contact.heading, 'contact') + `
    <div class="card contact">
      <p class="contact__body">${esc(p.contact.body)}</p>
      <div class="contact__links">${each(p.links, (l) => `
        <a class="contact__link state" href="${esc(l.href)}"${target(l.href)}>
          <span class="icon-btn icon-btn--tonal contact__icon" aria-hidden="true">${brand(l)}</span>
          <span>
            <span class="contact__label">${esc(l.label)}</span>
            <span class="mono contact__handle">${esc(l.handle)}</span>
          </span>
          <span class="contact__arrow" aria-hidden="true">${sym('north_east')}</span>
          ${newTab(l.href)}
        </a>`)}
      </div>
    </div>`;

  const footer = (f) => `
    <div class="footer__inner">
      <span>${esc(f.credit)}</span>
    </div>`;

  /* =======================================================================
     Theme — dark by default, light on request. Storage is wrapped so the page
     still works where localStorage is blocked (sandboxed iframes, private
     mode, file:// in some browsers).
     ======================================================================= */
  const KEY = 'vk-portfolio-theme';
  const BAR_COLOUR = { dark: '#0E1415', light: '#F5FAFB' };
  const fallback = new Map();

  const readTheme = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return fallback.get(KEY) ?? null;
    }
  };

  const writeTheme = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      fallback.set(KEY, value);
    }
  };

  function applyTheme(theme) {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', BAR_COLOUR[next]);

    /* Absent while this runs from <head>; boot() calls back to sync it. */
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const label = `Switch to ${next === 'light' ? 'dark' : 'light'} theme`;
    button.querySelector('.material-symbols-rounded').textContent =
      next === 'light' ? 'dark_mode' : 'light_mode';
    button.setAttribute('aria-pressed', String(next === 'light'));
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    writeTheme(next);
    applyTheme(next);
    document.getElementById('live').textContent = `${next === 'light' ? 'Light' : 'Dark'} theme on`;
  }

  /* =======================================================================
     Navigation — scroll spy, focus handoff, app bar elevation, reveal
     ======================================================================= */
  function initNav(ids) {
    const sections = ids.map((id) => document.getElementById(id));
    let active = null;

    const setActive = (id) => {
      if (id === active) return;
      active = id;
      document.querySelectorAll('.js-nav').forEach((link) => {
        /* Set the value explicitly: aria-current="" resolves to false, not true. */
        if (link.dataset.target === id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const visible = new Set();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(({ target: section, isIntersecting }) => {
        if (isIntersecting) visible.add(section.id);
        else visible.delete(section.id);
      });
      /* The bottom of the page always belongs to the last destination. */
      const atBottom = innerHeight + scrollY >= document.body.scrollHeight - 4;
      setActive(atBottom ? ids.at(-1) : (ids.find((id) => visible.has(id)) ?? active));
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => spy.observe(section));
    setActive(ids[0]);

    /* Move focus to the destination heading so keyboard and screen reader
       users land where sighted users land, once the scroll has settled. */
    document.addEventListener('click', (event) => {
      const link = event.target.closest('.js-nav');
      if (!link) return;
      const heading = document.getElementById(`${link.dataset.target}-heading`);
      setTimeout(() => heading.focus({ preventScroll: true }), 420);
    });

    const bar = document.getElementById('app-bar');
    let queued = false;
    const elevate = () => {
      bar.dataset.scrolled = String(scrollY > 8);
      queued = false;
    };
    addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(elevate);
    }, { passive: true });
    elevate();

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(({ target: section, isIntersecting }) => {
        if (!isIntersecting) return;
        section.classList.add('visible');
        reveal.unobserve(section);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    /* Every section, not just the nav destinations — Education has no nav entry. */
    document.querySelectorAll('.section').forEach((section) => {
      section.classList.add('reveal');
      reveal.observe(section);
    });
  }

  /* =======================================================================
     Boot
     ======================================================================= */
  const mount = (id, html) => { document.getElementById(id).innerHTML = html; };

  function boot() {
    const { nav, profile } = CONTENT;

    mount('nav-rail', `<ul>${each(nav, (d) => `<li>${navItem(d)}</li>`)}</ul>`);
    mount('nav-bar', each(nav, navItem));

    mount('home-body', hero(profile));
    mount('work-body', experience(CONTENT.experience));
    mount('education-body', education(CONTENT.education));
    mount('projects-body', projects(CONTENT.projects));
    mount('skills-body', skills(CONTENT.skills));
    mount('contact-body', contact(profile));
    mount('footer-body', footer(profile.footer));

    /* Re-run now that the toggle exists, to sync its icon and labels. */
    applyTheme(document.documentElement.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    initNav(nav.map((d) => d.id));
  }

  applyTheme(readTheme());

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
