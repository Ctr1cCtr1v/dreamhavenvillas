# Dream Haven Villas website

Marketing + direct-booking site for a luxury private 8-bedroom vacation rental at 8875 Qin Loop, Kissimmee, FL 34747 (Windsor at Westside gated resort community). Domain: dreamhavenvillas.com. Hosted on GitHub Pages via GitHub Actions.

**Start every session by reading `PLAN.md`.** It holds the site map, design direction, folder structure, git workflow, phase list, status checklist, and open items. Update the status and open items as things change.

## Conventions
- Hugo (pending owner confirmation), deployed by a GitHub Actions workflow.
- Content lives in `data/*.yaml` and `content/*.md`. Templates in `layouts/` must not hard-code copy.
- Booking URL and contact info are defined once in `hugo.yaml`. Never duplicate them.
- Unknown facts are marked `TODO:`; placeholder images are clearly labeled.
- Colors/fonts are CSS variables in `assets/css/theme.css`. Brand is gold on midnight navy (see `assets/images/brand/`) over a coastal palette.
- Images go through Hugo image processing (responsive sizes + WebP, lazy-loaded).
- Owner is not a developer: keep data files simple, commented, and documented in `EDITING.md`.
- Mobile-first.
- Git: work on a branch per phase. Commit locally. **Never push without the owner's explicit OK** (pushing `main` publishes the live site).
