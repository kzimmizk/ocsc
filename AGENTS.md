# AGENTS.md — orientation for whoever picks this up

Short brief for a human or AI assistant continuing this project. Read this, then
`docs/ARCHITECTURE.md` for depth.

## What this is

The **Ouray County Soccer Club** website — a static **Astro 5** site, deployed on
**Netlify**, meant to eventually replace ouraysoccerclub.com. Currently a POC
gathering user feedback.

## Core principle: content is data, not code

Everything that changes semi-regularly lives in editable files under
`src/content/`, validated at build time by Zod schemas in
`src/content.config.ts`. Non-technical board members edit these via GitHub; the
build regenerates the HTML/CSS. **Do not hardcode content into components** — add
or extend a content collection instead, and keep the schema as the source of
truth. See `docs/CONTENT.md` (the editor guide) and `docs/ARCHITECTURE.md`.

Collections: `settings` (1 file), `board`, `sponsors`, `documents`, `pages`.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/  (fails on any schema/content error)
npm run verify   # build + smoke test (scripts/smoke-test.mjs) — run before handoff/commit
npm run check    # astro check (types) — keep at 0 errors
```

## Conventions

- **Theming:** all brand tokens (colors/fonts/spacing) are CSS custom properties
  in `src/styles/theme.css`. Re-skin there, not in components. Colors were sampled
  from the club crest (navy `#0a2a52`, sky blue `#20a8e0`).
- **Component styles:** scoped `<style>` blocks inside each `.astro` file.
- **Optional fields:** empty strings (`""`) are coerced to `undefined` in the
  schema (`blankToUndefined` in `content.config.ts`) so editors can leave a field
  blank rather than delete the key.
- **Responsive:** header nav collapses to a hamburger at ≤960px; sponsor grid goes
  2-up at ≤600px. Mobile matters — verify changes at ~375px.
- Keep edits minimal and matched to the surrounding style. Update the smoke test
  when adding a page or a must-have element.

## Images — read before touching them

- `assets/` = **originals** (masters). `public/` = **web-ready** derivatives the
  site serves. The build only uses `public/`.
- Processed with macOS `sips`. **`sips` cannot write or crop `.webp`** — convert
  to PNG first, then crop/resize, then export (JPEG for photos). Recipes are in
  `docs/ARCHITECTURE.md` → Images.

## State of play (June 2026)

- Done: all pages (Home/About/Contacts/Sponsorship/Documents), 8 sponsors w/ links,
  hero photo, socials (header + footer), Zeffy donate link, brand logo + colors,
  responsive nav.
- **Outstanding:** board member emails (blank in `src/content/board/*.md`); deploy
  to Netlify; hero headline copy is the plain club name (intentional — earlier
  placeholder marketing copy was removed). See `tasks/todo.md`.
- **Not yet a git repo.** Owner plans to move it into one and connect Netlify.
  When that happens: `git init`, ensure `.gitignore` is respected, push, import in
  Netlify (it auto-reads `netlify.toml`).

## Roadmap (post-POC)

Team schedules/results; more info pages; visual CMS (Sveltia — see
`docs/ARCHITECTURE.md`); image optimization via `src/assets/` + `<Image>`.
