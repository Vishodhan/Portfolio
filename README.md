# Vishodhan Krishnan — portfolio

A static portfolio in three files, with no build step, no framework, and no
package manager.

```
index.html   section shells and document metadata
style.css    Material Design 3 tokens and components
app.js       content, renderer, theme, navigation
assets/img/  the portrait
```

## Run it

Open `index.html`. That's it — the content lives inside `app.js`, so there is
nothing to fetch and no server to start.

## Edit the content

Everything the page says is in the `CONTENT` object at the top of `app.js`:
`nav`, `profile`, `experience`, `projects`, `skills`. Change a string, reload
the page.

Two conveniences inside bullet and description strings:

- `**text**` renders bold — used for metrics like `**22%**`
- `` `text` `` renders as inline code

Strings are escaped before that conversion, so pasted text cannot inject markup.

**Adding a job** — append to `experience.roles`. Array order is page order, and
`current: true` adds the "Current" chip.

**Adding a nav destination** — add an entry to `nav`, then a matching
`<section id="x">` with a `<div class="shell" id="x-body">` in `index.html`, and
mount it in `boot()`. Keep it to five or fewer; Material 3 caps a navigation bar
at five destinations.

## Design system

Material Design 3, written as CSS custom properties rather than pulled from a
component library.

- **Colour** — one scheme per theme, generated from seed `#0FA3B1` (teal-cyan).
  Dark is the default. Changing the accent means editing `--primary` in the two
  scheme blocks; nothing else references a raw colour.
- **Type** — Roboto Flex for headings and body, JetBrains Mono as the utility
  face for dates, metrics, and eyebrows.
- **Components** — navigation rail (≥900px), navigation bar (<900px), top app
  bar with scroll elevation, filled and outlined buttons, icon buttons, outlined
  cards, chips.

## Accessibility

Targeting WCAG 2.2 AA.

- **Contrast** — dark theme runs 7.3:1 to 15.4:1, light theme 5.9:1 to 15.6:1.
- **Keyboard** — skip link, 3px focus ring on everything focusable. Clicking a
  nav destination moves focus to that section's heading, so keyboard and screen
  reader users land where sighted users land.
- **Structure** — one `h1`, ordered headings, `header`/`nav`/`main`/`footer`
  landmarks, labelled navs, `<ol>` for the chronological timeline.
- **Targets** — 48×48px minimum on buttons, 64px on nav destinations.
- **Motion** — `prefers-reduced-motion: reduce` disables reveals, smooth
  scrolling, and the status pulse.
- **Theme** — the toggle reports state via `aria-pressed` and announces the
  change through a polite live region.
- Also handles `forced-colors` (Windows high contrast) and prints without the
  navigation chrome.

## Deploy

It's static, so anything works: GitHub Pages (Settings → Pages → deploy from
branch root), or drag the folder into Netlify, Vercel, or Cloudflare Pages with
no build command and the root as the publish directory.

## Licence

Content © Vishodhan Krishnan. Code is yours to modify freely.
