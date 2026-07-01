# Architecture & Content Pattern

Developer-facing notes. For the editor's guide, see [CONTENT.md](CONTENT.md).

## Goals

1. **Static, cheap, simple.** No server, no database. Builds to plain
   HTML/CSS/JS, hosted free on Netlify, deployed on push.
2. **Content is data, not code.** Anything that changes semi-regularly
   (sponsors, contacts, page copy, the Register link) lives in versioned content
   files that non-technical people can edit. The build turns those files into
   HTML/CSS automatically.
3. **Upgrade path.** Content is shaped so a Git-based visual CMS (Sveltia) can be
   layered on later with no rework.

## The content-generation pattern

This is the "add a text/image asset → build generates the HTML/CSS" pattern from
the project brief. It's implemented with **Astro content collections** — no
bespoke build script to maintain.

```
src/content/                     defined & validated in src/content.config.ts
  settings/site.yaml   →  global config (1 file)         → data collection
  sponsors/*.yaml      →  one file per sponsor            → data collection
  documents/*.yaml     →  one file per club document      → data collection
  pages/*.md           →  free-form page copy            → markdown collection
```

Flow:

1. An editor changes a file (or uploads an image to `public/`).
2. `astro build` reads every collection, **validates it against the Zod schema**
   in `content.config.ts`, and fails loudly on bad data (missing field, bad URL)
   — so a broken edit never reaches production.
3. Components query the collections (`getCollection`, `getEntry`) and render the
   HTML. Example: `SponsorGrid.astro` reads all `sponsors/*.yaml`, sorts by
   `order`, and emits the logo grid used on both the home and sponsorship pages.

Because validation and rendering are build-time, the deployed site is fully
static and the content is type-safe.

### Why schemas matter

The schema is the contract between editors and the site. It documents what
fields exist, gives clear build errors, and is *the exact same definition* a CMS
will use to generate its edit forms. Keep schemas in `src/content.config.ts` as
the single source of truth.

> Note: empty optional fields are coerced from `""` → `undefined`
> (`blankToUndefined` in `content.config.ts`) so editors can leave a field blank
> instead of deleting the key.

## Styling / theming

- `src/styles/theme.css` — **all brand tokens** (colors, fonts, spacing) as CSS
  custom properties. Re-skinning the site = editing this one file.
- `src/styles/global.css` — base/reset, layout helpers, button classes.
- Component-specific styles live in scoped `<style>` blocks inside each `.astro`
  component.

## Images

The build references web-ready images from `public/` by path
(`/sponsors/foo.webp`, `/hero.jpg`). No build-time optimization step yet.

- **`assets/`** holds the *original* source files (full-res logo, sponsor logos,
  hero photo). These are the masters — keep them so images can be re-cropped or
  re-exported later. They are **not** used by the build.
- **`public/`** holds the *processed, web-ready* derivatives that the site
  actually serves.

Originals were processed with macOS `sips` (no extra tooling). Reproducible
recipes:

```sh
# Favicon / icons from the logo
sips -s format png -z 64 64   assets/logo.webp --out public/favicon.png
sips -s format png -z 180 180 assets/logo.webp --out public/apple-touch-icon.png

# Hero: crop 4:3 photo to a 2:1 banner, downsize, export JPEG (~380 KB)
sips -s format png assets/kids_playing.webp --out /tmp/kids.png
sips -c 1280 2560 /tmp/kids.png --out /tmp/hero-crop.png        # centered 2:1 crop
sips --resampleWidth 1600 /tmp/hero-crop.png --out /tmp/h.png
sips -s format jpeg -s formatOptions 60 /tmp/h.png --out public/hero.jpg
```

**Gotchas (learned the hard way):**
- `sips` **cannot write `.webp`** and **cannot crop a `.webp` directly** —
  convert to PNG first, then crop/resize, then export (JPEG for photos, PNG if
  transparency is needed). That's why `womans-club-of-ouray-county` is a `.png`
  (it was a wide logo with huge side margins; cropped tight to a square so it
  reads at grid size — see git history / this file's recipes).
- For photos, prefer **JPEG**; PNG balloons file size.

**Future enhancement:** move images into `src/assets/` and use Astro's `image()`
schema helper + `<Image>` component for automatic resizing/format conversion
(incl. WebP/AVIF). Clean upgrade when image weight matters.

## Documents (PDFs & forms)

The `documents` collection's `url` accepts **either** a full external URL **or**
a site-relative path (validated by `linkOrPath` in `content.config.ts`). This
lets club documents be **self-hosted** instead of depending on an external host:

- Put the served file in `public/documents/` → reference it as
  `/documents/foo.pdf` in the document's YAML `url`.
- Keep the master/original in `assets/documents/` (not used by the build), same
  `assets/` = originals, `public/` = served split as images.

The file-type badge on the documents page is derived from the URL extension, so
`/documents/foo.pdf` renders a `PDF` badge automatically. Legacy entries still
point at external `img1.wsimg.com` links; migrate them to self-hosted as the raw
files become available.

## Adding the Sveltia CMS later

Sveltia (a modern, drop-in replacement for Decap/Netlify CMS) reads Decap's
config format. To enable it:

1. Add `public/admin/index.html` loading the Sveltia CMS script.
2. Add `public/admin/config.yml` describing collections that mirror
   `content.config.ts` (a `file` collection for `settings/site.yaml`; `folder`
   collections for `sponsors/`, `documents/`, `pages/`).
3. Set up GitHub OAuth (a small auth handler — Netlify's git-gateway or a hosted
   OAuth proxy) so editors log in with GitHub.

No content migration is required — the CMS edits the existing files in place.

## Future roadmap (from the brief)

- Team schedules / results / standings (likely a new content collection or a
  pull from PlayMetrics / an external feed).
- More informational pages (programs, age groups, handbook, volunteer).
- Real hero photography, gallery, brand assets.
- Promote to the production domain, retire the old site.
