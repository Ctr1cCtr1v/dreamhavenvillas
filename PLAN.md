# Dream Haven Villas — Website Plan

**Domain:** dreamhavenvillas.com
**Property:** 8875 Qin Loop, Kissimmee, FL 34747 — Windsor at Westside (gated resort community). Luxury private 8-bedroom villa.
**Hosting:** GitHub Pages (free, HTTPS, custom domain), built by GitHub Actions
**Stack:** Hugo 0.168 (confirmed)
**Last updated:** 2026-10-26

---

## 1. Goals

1. **Sell the vacation** — let visitors picture themselves at the pool, at the parks, at the beach, in a private gated resort.
2. **Inform in detail** — a Zillow-style property page with room-by-room breakdown, amenities, house info.
3. **Drive direct bookings** — every page funnels to "Book Direct & Save" (links to the management company's booking site). Clear explanation of why booking direct is cheaper than Airbnb/VRBO.
4. **Be shareable** — the link guests text to friends. It must look great on a phone and produce a rich preview card (photo + title) when pasted into iMessage, WhatsApp, Facebook.
5. **Be easy to edit** — text and photos live in simple, clearly named files, separate from the code. Seasonal updates should be a one-file change.

## 2. Tech Stack

### Static site generator comparison

| | Jekyll | **Hugo** | Astro |
|---|---|---|---|
| GitHub Pages | Native build, zero config — but only whitelisted plugins | Via GitHub Actions (one small workflow file, set once) | Via GitHub Actions (official action) |
| Photo handling | **No built-in image resizing** on Pages → needs a separate manual script | **Built-in image processing**: one full-size photo in → multiple sizes + WebP out, automatically | Built-in image optimization (excellent) |
| Local setup | Ruby + Bundler (system Ruby 2.6 too old → Homebrew Ruby + gems) | **One `brew install hugo`**, single binary, no dependencies | Node + npm + `node_modules` |
| Long-term maintenance | Low, but aging ecosystem; gem updates | **Lowest** — no packages to update, no security alerts | Highest — npm dependencies, frequent major versions |
| Content editing | YAML/Markdown | YAML/Markdown (same) | Markdown/YAML + component files |
| Build speed | Slow-ish | Extremely fast | Fast |
| Templating | Liquid (simple) | Go templates (clunkier, but I handle it) | Components (most modern) |
| Best for | Simple text sites | **Photo-heavy content sites that should run for years untouched** | App-like sites with interactive components |

**Recommendation: Hugo.** The deciding factor is photos. With Hugo, swapping a photo means dropping the file in a folder and changing its filename in a text file. Hugo creates the phone/tablet/desktop sizes and WebP versions on every build. Nothing else is needed. It is a single binary with no packages that go stale, so the site keeps building years from now. The only cost compared with Jekyll is a one-time GitHub Actions workflow file, which I write.

### Rest of the stack
| Choice | Why |
|---|---|
| **YAML data files + Markdown** for content | Plain text, editable in any editor *or directly on github.com*. |
| **Hand-written CSS** (no framework) | Fast, full control of the look, nothing to upgrade. |
| **Small vanilla JS** | Lightbox gallery, mobile menu, map. No frameworks. |
| **Leaflet + OpenStreetMap** | Free interactive map, no API key, custom pins. |
| **YouTube/Vimeo (unlisted)** for long videos | Short muted hero loop (<8 MB MP4) can live in the repo. |
| **`tools/prep-photos.sh`** | One-liner that caps originals at ~2800px before committing (pro photos can be 10–20 MB each; this keeps the repo small). Hugo does the rest. |

## 3. Site Map

| Page | URL | Purpose |
|---|---|---|
| **Home** | `/` | Full-bleed hero photo/video, tagline, "Book Direct" button. Story sections: The Home → The Pool → The Resort → The Parks → Beaches & Golf → Guest Reviews → Book Direct CTA. Photo-heavy, minimal text. Image tiles link through to the detail pages. |
| **The Villa** | `/the-villa/` | The "listing" page. Stats bar (8 bedrooms, baths, sleeps, sq ft, pool). Room-by-room sections (photo grid + bed config + short description + amenity bullets per room). Full amenity checklist by category. House rules, check-in/out, parking, Wi-Fi. |
| **Gallery** | `/gallery/` | All photos, filterable by category. Tap for a full-screen lightbox with swipe. Video section. |
| **The Resort** | `/windsor-at-westside/` | Windsor at Westside perks (gated security, clubhouse, resort pool, lazy river, etc. — *to be verified*). |
| **Explore** | `/explore/` | Interactive map, drive-time table, attraction cards: Theme Parks, Beaches, Golf, Dining & Shopping, Nature & Water. |
| **Book Direct** | `/book/` | Why booking direct saves money, big booking button → management company site. Calendar embed later if available. |
| **FAQ** | `/faq/` | Accordion: booking, payment, cancellation, check-in, pool heat, parking, pets, resort access. |

Global: sticky header (logo, nav, **Book Direct** button, also in mobile menu), footer (address, contact, management company, social, repeated nav), optional seasonal announcement banner.

## 4. Design Direction — "Starlit Coastal"

The logo (gold script on deep navy, with a sparkle arc) sets the tone: **a touch of evening magic over a clean beach palette.**

- **Palette** (one CSS file, easy to tune):
  - Midnight navy `#0B1127` — exact logo background, header/footer, dark feature sections
  - Gold `#C9A04E` (gradient to `#E8C878`) — accents, dividers, sparkle details, highlight buttons
  - Ocean blue `#1F5F7A` — primary buttons, links
  - Pool blue `#8CC4D6` — light accents
  - Sand `#D9C4A3` — warm dividers
  - Cream `#F7F2EA` — alternating section backgrounds
  - White `#FFFFFF` — main background
  - Ink `#1F2A33` — body text
- **Type:** elegant serif for headings (*Cormorant Garamond* or *Playfair Display*), clean sans for body (*Nunito Sans* or *Inter*). Small spaced uppercase labels (like "VILLAS" in the logo) for section eyebrows. Avoid Disney-style lettering on the site. The sticker's tagline font is fine on print, but not for a website that mentions the parks.
- **Logo use:** the logo sits on a navy header/footer, where it fits as-is. A transparent-background PNG or SVG from the designer would allow use on light backgrounds too.
- **Layout principles:** big full-width photos, generous white space, short evocative paragraphs, one idea per section. Alternate white/cream sections, with navy "night" sections for emphasis. Text below image tiles, not crammed over them.
- **Mobile-first.**

### Reference notes
- **cambriavacationrentals.com:** big hero imagery, simple nav, clear booking CTA.
- **thevillamilan.com:** calm, poetic, lifestyle-led copy. Clickable image tiles with a caps heading and one-line blurb. Book button repeated in header, mobile menu, and footer. → Use for the home page tone and tiles.
- **thewillowcatskill.com/stay:** each unit gets title → photo grid → short paragraph → amenity bullets. → Use this pattern per room on The Villa page, plus the hard facts (beds, sleeps) it leaves out.
- **myluxuryvacay.com:** "Book Early and Save" savings banner pattern. → Adapt as a "Book Direct & Save" band. *Avoid* its all-caps shouting, exclamation-heavy copy, and typos.
- **Zillow listing:** facts and structure for the details page.

## 5. Project Structure (content separate from code)

```
dhvwebsite/
├── hugo.yaml                 ← site title, BOOKING URL, contact, social (edit once)
├── data/                     ← ★ MOST EDITS HAPPEN HERE ★
│   ├── home.yaml             ← hero text, section headlines & paragraphs
│   ├── villa.yaml            ← key stats + room-by-room list (name, beds, features, photos)
│   ├── amenities.yaml        ← amenity checklist by category
│   ├── resort.yaml           ← Windsor at Westside perks
│   ├── attractions.yaml      ← name, category, drive time, miles, lat/lng, blurb, photo, link
│   ├── reviews.yaml          ← guest testimonials
│   ├── faq.yaml              ← questions & answers
│   ├── gallery.yaml          ← gallery tabs, captions, videos (photos auto-load from folders)
│   └── announcement.yaml     ← seasonal banner: on/off, message, link
├── content/                  ← one Markdown file per page (long-form prose)
├── layouts/                  ← templates; layouts/_partials/ = components (rarely touched)
├── assets/
│   ├── css/theme.css         ← colors & fonts as variables (owner-editable)
│   ├── css/site.css          ← layout & component styles
│   ├── js/
│   └── images/               ← full-size photos; Hugo auto-generates web sizes
│       ├── brand/            ← logos (source/ holds print files)
│       ├── hero/ exterior/ pool/ living/ kitchen/ bedrooms/ game-room/
│       ├── resort/ area/      (placeholders are placeholder-*.jpg inside each folder)
├── photo-inbox/              ← drop raw photos here (git-ignored); prep script moves them in
├── tools/prep-photos.sh
├── .github/workflows/        ← auto-deploy to GitHub Pages on push to main
├── EDITING.md                ← plain-English "how to change X" guide
├── CLAUDE.md                 ← context for Claude Code sessions
└── PLAN.md                   ← this file
```

**Editing model:** change words in `data/*.yaml` or `content/*.md`. To change a photo, replace the file in `assets/images/...` with the same name, or point the YAML at a new filename. Push to `main` (or edit on github.com) and it is live in about a minute.

**Placeholders:** every unknown fact is marked `TODO:` and placeholder images are clearly labeled. Search `TODO` to see what's left.

## 6. Git & Workflow

- **Local repo (here):** Claude makes commits on this machine as work progresses (git is already configured with your GitHub identity).
- **GitHub repo:** create an empty repo `dreamhavenvillas` on github.com (no README), or install the GitHub CLI (`brew install gh`, then run `! gh auth login`) so Claude can create it and push for you.
- **Branching:** each phase is built on its own branch (`phase-2-home`, etc.). You preview it locally with `hugo server` at http://localhost:1313. When you're happy, it gets merged to `main` and pushed. **Pushing `main` = publishing the live site.**
- **Claude pushes `main` at the end of each finished phase** (owner-approved), and checks that the deploy succeeds.
- Small text/photo edits later can go straight to `main`, including via github.com's web editor.

## 7. Build Phases (one or two Claude Code sessions each)

Each session: read `CLAUDE.md` + this plan → do the phase → update the status checklist.

### Phase 0 — Foundation
- `brew install hugo` (+ optionally `gh`), Hugo skeleton, folder structure, `.gitignore`.
- GitHub repo + Actions deploy workflow (deploy can stay unpublished until launch).
- Placeholder image set, `prep-photos.sh`, `EDITING.md`.

### Phase 1 — Design system & shell
- Mobile hamburger menu (header currently wraps on phones). Verify with real device emulation; headless Chrome can't go below ~500px.
- Colors, fonts, spacing, buttons, cards, section styles. Header with logo/nav/Book button, mobile menu, footer, announcement banner.

### Phase 2 — Home page
- Hero, story sections, image tiles, review carousel, Book Direct band. First-draft copy.

### Phase 3 — The Villa (details)
- Stats bar, room-by-room sections, amenity checklist, house info. Pre-fill known facts; `TODO:` the rest.

### Phase 4 — Gallery
- Category filter, responsive grid, swipeable lightbox, video embeds.

### Phase 5 — The Resort & Explore
- Resort perks page. Leaflet map, drive-time table, attraction cards.

### Phase 6 — Book Direct & FAQ
- Savings explainer, booking buttons (placeholder URL until provided), FAQ accordion.

### Phase 7 — Polish
- SEO titles/descriptions, sitemap, `VacationRental` structured data.
- Share preview cards (Open Graph image + text). Critical for word of mouth.
- Favicon (from logo sparkle), 404 page, accessibility and performance pass. Optional privacy-friendly analytics.

### Phase 8 — Launch
- Enable Pages, custom domain, DNS records at registrar, enforce HTTPS, verify domain.

### Phase 9 — Real content
- Personal photos as interim replacements → professional photos (shoot scheduled ~week of 2026-11-02).
- Replace every `TODO:`; refine copy.

### Ongoing — Seasonal updates (documented in `EDITING.md`)

## 8. Status

- [x] Phase 0 — Foundation (live at https://ctr1cctr1v.github.io/dreamhavenvillas/)
- [x] Phase 1 — Design system & shell
- [x] Phase 2 — Home
- [x] Phase 3 — The Villa
- [x] Phase 4 — Gallery
- [x] Phase 5 — Resort & Explore
- [x] Phase 6 — Book Direct & FAQ
- [ ] Phase 7 — Polish
- [ ] Phase 8 — Launch
- [ ] Phase 9 — Real content

## 9. Open Items

| Item | Status |
|---|---|
| Booking URL | Placeholder for now; link only (no widget expected) |
| Management company name | TODO |
| Public contact info | TODO |
| Logo | ✅ Received (wide + square sticker). Ask designer for transparent PNG/SVG if available |
| Photos | Placeholders now → personal photos → professional shoot next week |
| Home facts (baths, sleeps, sq ft, bed config, pool/spa, game room…) | TODO |
| Guest reviews to feature | TODO |
| "Save" claim (specific % or general) | TODO |
| GitHub repo | ✅ github.com/Ctr1cCtr1v/dreamhavenvillas (public), Pages via Actions |
| Stack confirmed (Hugo) | ✅ |
| Map pin | ✅ 28.30885, -81.64318 (US Census geocoder) |

## 10. Notes & Cautions

- **Theme-park imagery:** no official Disney/Universal photos or logos without a license. Use your own or licensed stock (Unsplash/Pexels).
- **Facts to verify:** drive times and resort amenities are drafted from public info and flagged for confirmation.
- **Pricing claims:** keep "book direct and save" accurate.
- **Repo size:** raw photos stay in `photo-inbox/` (ignored); only prepped images are committed.
