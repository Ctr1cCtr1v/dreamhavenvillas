# Dream Haven Villas website

Marketing + direct-booking site for a luxury private 8-bedroom vacation rental at 8875 Qin Loop, Kissimmee, FL 34747 (Windsor at Westside gated resort community). Domain: dreamhavenvillas.com. Hosted on GitHub Pages via GitHub Actions.

**Start every session by reading `PLAN.md`.** It holds the site map, design direction, folder structure, git workflow, phase list, status checklist, and open items. Update the status and open items as things change.

## Conventions
- Hugo 0.168 with the new template layout (`layouts/home.html`, `layouts/page.html`, `layouts/_partials/`). Use `hugo.Data` (not `site.Data`). Deployed by `.github/workflows/deploy.yml`; keep its HUGO_VERSION in sync with local.
- Responsive images: always use `partial "img.html" (dict "src" "<folder>/<file>.jpg" "alt" …)`. Paths are relative to `assets/images/`.
- Hugo `cond` evaluates both branches. Never put image processing (`.Resize`, etc.) inside `cond`; use if/else.
- Reusable partials: `photo-grid.html` (lightbox-ready, `data-lightbox` groups), `book-band.html` (text from data/home.yaml), `page-hero.html`, `sparkle.html`.
- Explore map: Leaflet 1.9.4 is self-hosted in `assets/vendor/leaflet/` (SRI-verified), loaded only on the explore layout. Tiles are from OpenStreetMap (attribution required). Map data is passed as JSON in `#map-data`.
- Gallery auto-loads every image in the folders listed in `data/gallery.yaml`, sorted by filename; a folder's `placeholder-*` files are skipped once it has a real photo.
- Lightbox (`assets/js/lightbox.js`, bundled with main.js): any `a[data-lightbox="group"]` opens in the viewer; items inside `[hidden]` are skipped.
- `hugo server` ignores static files starting with `_`, and its watcher can go stale. Restart it if new files 404.
- Content lives in `data/*.yaml` and `content/*.md`. Templates in `layouts/` must not hard-code copy.
- Booking URL and contact info are defined once in `hugo.yaml`. Never duplicate them.
- Unknown facts are marked `TODO:`; placeholder images are clearly labeled.
- Colors/fonts are CSS variables in `assets/css/theme.css`; components live in `assets/css/site.css` (bundled together in head.html). Reuse existing components (.section, .section-head, .split, .grid--N, .card, .tile, .stats, .checklist, .quote, .book-band, .page-hero, .btn variants, sparkle partial) before adding new ones. Brand is gold on midnight navy (see `assets/images/brand/`) over a coastal palette.
- Images go through Hugo image processing (responsive sizes + WebP, lazy-loaded).
- Owner is not a developer: keep data files simple, commented, and documented in `EDITING.md`.
- Mobile-first.
- Git: work on a branch per phase, commit locally, merge to `main`. **Owner approved (2026-10-27): push `main` at the end of each finished phase.** Pushing `main` publishes the live site, so push nothing else mid-phase without asking. Verify the deploy run succeeds after pushing.
- Internal links in templates: never hard-code a leading-slash URL. Use `site.Home.RelPermalink`, menu `.URL`, or `strings.TrimPrefix "/" $url | relURL` for data-file URLs, so links work on both the github.io subpath and the custom domain.
- Scroll fade-in uses `.reveal` (pure CSS `animation-timeline: view()`, in `@supports`). Don't add JS-gated hiding; content must never depend on JS to become visible.
- Visual check: headless Chrome can't go below 500px wide, so check phones by putting the page in a 390px iframe and screenshotting that.
