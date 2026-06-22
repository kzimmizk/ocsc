# Ouray County Soccer Club — Website

Static website for the Ouray County Soccer Club, built with [Astro](https://astro.build)
and deployed on [Netlify](https://www.netlify.com/).

This is the proof-of-concept that will eventually replace **ouraysoccerclub.com**.

## What's here

- A small, fast static site (no server, no database).
- **Content lives in editable files**, not in code. Non-technical board members
  can update sponsors, contacts, and page copy without touching HTML/CSS — see
  **[docs/CONTENT.md](docs/CONTENT.md)**.
- Brand colors live in one file (`src/styles/theme.css`) for easy re-skinning.

## Pages

| Page                    | Route           | Source                             |
| ----------------------- | --------------- | ---------------------------------- |
| Home                    | `/`             | `src/pages/index.astro`            |
| About                   | `/about/`       | `src/content/pages/about.md`       |
| Contacts                | `/contacts/`    | `src/content/board/*.md`           |
| Sponsorship & Donations | `/sponsorship/` | `src/content/pages/sponsorship.md` |
| Documents               | `/documents/`   | `src/content/documents/*.yaml`     |
| Register                | external link   | `registerUrl` in `site.yaml`       |
| Donate                  | external link   | `donateUrl` in `site.yaml` (Zeffy) |

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
npm install        # one time
npm run dev        # local preview at http://localhost:4321
npm run build      # production build into dist/
npm run verify     # build + smoke test (what CI should run)
npm run check      # TypeScript / Astro diagnostics
```

## Deploying (Netlify + GitHub)

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import from GitHub**, pick the repo.
3. Netlify reads `netlify.toml` automatically — build command `npm run build`,
   publish directory `dist`. No manual config needed.
4. Every push to the default branch triggers a deploy.

## Project layout

```
src/
  content/          # ← editable content (see docs/CONTENT.md)
    settings/site.yaml
    board/*.md
    sponsors/*.yaml
    documents/*.yaml
    pages/*.md
  content.config.ts # content schemas (validated at build)
  components/        # reusable UI pieces
  layouts/           # page shell (head, header, footer)
  pages/             # one file per route
  styles/            # theme.css (brand tokens) + global.css
public/             # web-ready static files served as-is (logo, sponsor logos, hero.jpg)
assets/             # ORIGINAL source images (masters); not used by the build
docs/               # CONTENT.md (editors) + ARCHITECTURE.md (developers)
scripts/            # smoke-test.mjs
```

## For developers / the next assistant

- **[AGENTS.md](AGENTS.md)** — orientation + conventions + gotchas for anyone
  (human or AI) picking this up.
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — the content pattern, theming,
  image pipeline, and the path to a visual CMS.

## Status / TODO

See [`tasks/todo.md`](tasks/todo.md) for outstanding items (board emails,
deploy, future schedules/results, optional Sveltia CMS).
