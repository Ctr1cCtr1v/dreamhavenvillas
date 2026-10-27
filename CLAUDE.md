# Dream Haven Villas website

Marketing + direct-booking site for a luxury private 8-bedroom vacation rental at 8875 Qin Loop, Kissimmee, FL 34747 (Windsor at Westside gated resort community). Domain: dreamhavenvillas.com. Hosted on GitHub Pages via GitHub Actions.

**Start every session by reading `PLAN.md`.** It holds the site map, design direction, folder structure, git workflow, phase list, status checklist, and open items. Update the status and open items as things change.

## Conventions
- Hugo 0.168 with the new template layout (`layouts/home.html`, `layouts/page.html`, `layouts/_partials/`). Use `hugo.Data` (not `site.Data`). Deployed by `.github/workflows/deploy.yml`; keep its HUGO_VERSION in sync with local.
- Responsive images: always use `partial "img.html" (dict "src" "<folder>/<file>.jpg" "alt" …)`. Paths are relative to `assets/images/`.
- Gallery auto-loads every image in the folders listed in `data/gallery.yaml`.
- Content lives in `data/*.yaml` and `content/*.md`. Templates in `layouts/` must not hard-code copy.
- Booking URL and contact info are defined once in `hugo.yaml`. Never duplicate them.
- Unknown facts are marked `TODO:`; placeholder images are clearly labeled.
- Colors/fonts are CSS variables in `assets/css/theme.css`; components live in `assets/css/site.css` (bundled together in head.html). Reuse existing components (.section, .section-head, .split, .grid--N, .card, .tile, .stats, .checklist, .quote, .book-band, .page-hero, .btn variants, sparkle partial) before adding new ones. Brand is gold on midnight navy (see `assets/images/brand/`) over a coastal palette.
- Images go through Hugo image processing (responsive sizes + WebP, lazy-loaded).
- Owner is not a developer: keep data files simple, commented, and documented in `EDITING.md`.
- Mobile-first.
- Git: work on a branch per phase. Commit locally. **Never push without the owner's explicit OK** (pushing `main` publishes the live site).
- Internal links in templates: never hard-code a leading-slash URL. Use `site.Home.RelPermalink`, menu `.URL`, or `strings.TrimPrefix "/" $url | relURL` for data-file URLs, so links work on both the github.io subpath and the custom domain.
- Visual check: headless Chrome can't go below 500px wide, so check phones by putting the page in a 390px iframe and screenshotting that.
