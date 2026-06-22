# assets/ — original source images (masters)

These are the **full-resolution originals** provided by the club. They are the
masters kept for re-cropping or re-exporting later.

**The website does not serve files from here.** The build uses the web-ready
copies in `public/`. When you change an image, update the derivative in `public/`
(see `docs/ARCHITECTURE.md` → Images for the `sips` recipes).

| Original (here)                       | Web-ready (public/)                              |
| ------------------------------------- | ------------------------------------------------ |
| `logo.webp`                           | `public/logo.webp`, `favicon.png`, `apple-touch-icon.png`, `logo.png` |
| `kids_playing.webp`                   | `public/hero.jpg` (cropped to a 2:1 banner)      |
| `sponsors/*.webp`                     | `public/sponsors/*` (renamed to clean slugs)     |

Note: `sponsors/woman's_club_of_ouray_county.webp` was cropped tight to its
emblem and exported as `public/sponsors/womans-club-of-ouray-county.png`
(`sips` can't write `.webp`).
