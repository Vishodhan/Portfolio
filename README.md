# Vishodhan Krishnan — portfolio

A static, dependency-free portfolio. Every word on the page comes from JSON in
`/data`, so updating the site means editing a text file, not touching markup.

Built with HTML5, Tailwind (utilities), hand-written Material Design 3 tokens,
and vanilla JavaScript. No build step, no framework, no package manager.

---

## Run it

The site fetches its content from `/data/*.json`, and browsers block `fetch`
on `file://`. So serve the folder:

```bash
cd vishodhan-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works — `npx serve`, `php -S localhost:8000`, VS Code Live
Server. If you just want a quick look with no server, open **`preview.html`**,
which is the same page with everything inlined.

---

## Edit the content

| File | What lives there |
|---|---|
| `data/profile.json` | Name, role, photo, headline, summary, social links, contact copy, footer, hero diagram |
| `data/experience.json` | Every job, its bullets and tags, plus education |
| `data/projects.json` | Project cards, stacks, and links |
| `data/skills.json` | Skill groups and their chips |
| `data/navigation.json` | The five nav destinations |

Reload the page and the change is live. Two conveniences inside bullet and
description strings:

- `**text**` renders bold — used for metrics like `**22%**`
- `` `text` `` renders as inline code

Both are escaped before conversion, so pasted text can't inject markup.

**Adding a job:** append an object to `experience.json → roles`. Order in the
array is the order on the page. Set `"current": true` to get the "Current" chip.

**Adding a nav destination:** add an entry to `navigation.json`, then add a
matching `<section id="...">` with a `...-content` div in `index.html`. Keep it
to five or fewer — Material 3 caps a navigation bar at five destinations.

After editing JSON, regenerate the offline preview:

```bash
python3 tools/build_preview.py
```

---

## Fill these in before publishing

`data/profile.json → links` has three placeholders I couldn't get from the
résumés:

- `linkedin.com/in/REPLACE-ME`
- `you@example.com` (appears twice — the `href` and the `handle`)
- `meta.url` is blank; set it to your live domain for social previews

`location` is set to `Boston, MA`. Change it if that's wrong.

---

## Structure

```
vishodhan-portfolio/
├── index.html                  the site — fetches /data at runtime
├── preview.html                generated single file, opens with no server
├── README.md
├── assets/
│   ├── css/
│   │   ├── tokens.css          M3 colour schemes, type scale, shape, motion
│   │   └── styles.css          M3 components + page layout
│   ├── js/
│   │   ├── theme.js            dark/light, storage-safe
│   │   ├── data.js             JSON loader
│   │   ├── render.js           JSON → markup
│   │   ├── nav.js              scroll spy, focus handoff, reveal
│   │   └── main.js             bootstrap
│   └── img/
│       └── vishodhan-krishnan.jpg
├── data/                       all content
└── tools/
    └── build_preview.py        regenerates preview.html
```

---

## Design system

Material Design 3, implemented as CSS custom properties rather than pulled from
a component library, so nothing is locked behind a framework.

- **Colour** — a full M3 scheme generated from seed `#0FA3B1` (teal-cyan), with
  the tertiary palette shifted to indigo. Roles are stored as RGB triplets
  (`--md-ref-*`) so Tailwind can apply alpha, with resolved `--md-sys-color-*`
  aliases for hand-written CSS. Dark is the default: surface `#0E1415`,
  on-surface `#DEE3E5`.
- **Type** — Roboto Flex on the M3 brand and plain roles; JetBrains Mono as the
  utility face for dates, metrics, eyebrows, and diagram labels.
- **Shape, elevation, state layers, motion** — M3 scales, including the 8% / 10%
  / 10% hover-focus-pressed state layer opacities and the emphasized-decelerate
  easing curve.
- **Components** — navigation rail (≥900px), navigation bar (<900px), top app
  bar with scroll elevation, filled/outlined buttons, icon buttons, outlined
  cards, chips, dividers.

Changing the accent means editing the `--md-ref-primary` triplets in
`tokens.css`. Nothing else references a raw colour.

---

## Accessibility

Targeting WCAG 2.2 AA.

- **Contrast** — every text pair was measured. Dark theme runs 7.3:1 to 14.4:1
  (body text 14.4:1); light theme 5.9:1 to 16.2:1. All clear AA, most clear AAA.
- **Keyboard** — skip link, visible 3px focus ring on everything focusable,
  logical tab order. Clicking a nav destination moves focus to that section's
  heading, so keyboard and screen reader users land where sighted users land.
- **Structure** — one `h1`, ordered headings, `header`/`nav`/`main`/`footer`
  landmarks, labelled navs, `<ol>` for the chronological timeline.
- **Icons and images** — decorative icons are `aria-hidden`; the portrait has a
  descriptive alt; the agent diagram is `role="img"` with a text description of
  what it shows.
- **Targets** — 48×48px minimum on buttons, 64px on nav destinations.
- **Motion** — `prefers-reduced-motion: reduce` disables the diagram animation,
  smooth scrolling, reveals, and transitions.
- **Theme** — the toggle reports state via `aria-pressed` and announces the
  change through a polite live region.
- Also handles `forced-colors` (Windows high contrast) and has a print
  stylesheet that strips the chrome.

---

## Deploy

It's static, so anything works:

- **GitHub Pages** — push, then Settings → Pages → deploy from branch root
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in; no build command,
  publish directory is the root

---

## Licence

Content © Vishodhan Krishnan. Code is yours to modify freely.
