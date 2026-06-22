# CLAUDE.md

Project orientation lives in **[AGENTS.md](AGENTS.md)** — read it first.

Key reminders:
- Content is data, not code: edit/extend collections under `src/content/`
  (validated by `src/content.config.ts`), don't hardcode content into components.
- Brand tokens live in `src/styles/theme.css`.
- `assets/` = original images; `public/` = web-ready files the build serves.
  `sips` can't write/crop `.webp` — convert to PNG first (see `docs/ARCHITECTURE.md`).
- Run `npm run verify` before wrapping up. Keep `npm run check` at 0 errors.
- Editor-facing guide: `docs/CONTENT.md`. Architecture: `docs/ARCHITECTURE.md`.
