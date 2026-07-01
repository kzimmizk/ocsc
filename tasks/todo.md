# OCSC Website — TODO

POC is **feature-complete and ready for user feedback** (July 2026).
Build + smoke test + type check all green.

## Done
- Astro + Netlify config (`netlify.toml`, Node 22); content collections + schemas
- Pages: Home, About, Programs, Contacts, Sponsorship & Donations, Documents
- Register (PlayMetrics) + Donate (Zeffy) wired in header/footer/pages
- 8 sponsors with logos + website links (home + sponsorship grids)
- Contacts page = single club email (`contactEmail` in `site.yaml`)
- Club crest logo + favicon/icons; brand colors sampled from crest
- Hero photo (cropped from `kids_playing.webp`) with navy overlay
- Social icons (FB + Instagram) in header + footer
- Club documents → `/documents/` page (nav + footer linked); 4 self-hosted in
  `public/documents/` (Bylaws, Code of Conduct, Photo + Medical Release)
- Responsive: hamburger nav ≤960px, 2-up sponsor grid ≤600px
- Docs: README, AGENTS.md, CONTENT.md (editors), ARCHITECTURE.md (devs)

## Outstanding
- [ ] Add the new **Fee Disclosure** PDF to `public/documents/` when ready (old
      external one was removed) + a `documents/*.yaml` pointing at `/documents/…`
- [ ] Decide final hero headline copy (currently the plain club name)

## Deploy
- [ ] Create GitHub repo, push
- [ ] Connect Netlify to repo (auto-detects `netlify.toml`)
- [ ] Confirm deploy-on-push works

## Later (post-POC)
- [ ] Team schedules / results / standings
- [ ] More pages (age groups, handbook, volunteer)
- [ ] Sveltia CMS visual editor at `/admin` (see ARCHITECTURE.md)
- [ ] Image optimization via `src/assets/` + `<Image>`
- [ ] Promote to production domain, retire old site
