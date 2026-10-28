# How to Edit the Dream Haven Villas Website

You never need to touch code to update the site. Words live in text files in
`data/` and `content/`, and photos live in `assets/images/`.

---

## Quick reference: "I want to change…"

| I want to change… | Edit this file |
|---|---|
| Booking link, email, phone, management company, social links | `hugo.yaml` (under `params`) |
| Menu items | `hugo.yaml` (under `menus`) |
| Home page headline, paragraphs, photos | `data/home.yaml` |
| Bedrooms, baths, sleeps, room-by-room details, house info & rules | `data/villa.yaml` (the sleeping-arrangements table builds itself from the bedrooms list) |
| Amenity checklist | `data/amenities.yaml` |
| Windsor at Westside resort perks | `data/resort.yaml` |
| Attractions, drive times, map pins, pin colors, category photos | `data/attractions.yaml` (lat/lng from Google Maps: right-click a spot → copy the numbers) |
| Guest reviews | `data/reviews.yaml` |
| FAQ | `data/faq.yaml` (the "Booking" group also shows on the Book Direct page). Links like `[map](/explore/)` work. |
| Gallery tabs, captions, videos | `data/gallery.yaml` |
| Seasonal banner at top of site | `data/announcement.yaml` |
| Book Direct page (comparison table, steps, reasons, trust) | `data/book.yaml` |
| Deal Alerts page wording, checkbox choices | `data/deals.yaml` (the Google Form connection: `hugo.yaml` → `dealAlerts`) |
| Resort clubhouse hours | `data/resort.yaml` → `hours` |
| Colors or fonts | `assets/css/theme.css` (top of file) |

**Still to fill in:** search the project for `TODO`. In VS Code, use ⌘⇧F (Cmd+Shift+F) and type `TODO`.

---

## Editing text

The `.yaml` files are simple `label: value` lists. A few rules:

- **Keep the indentation (spaces) exactly as it is.** YAML uses spaces to group things.
- Lines starting with `#` are notes to you and don't appear on the site.
- Long paragraphs go after `>-` on the next lines, indented:
  ```yaml
  text: >-
    This is a long paragraph that can
    wrap across several lines.
  ```
- Lines written as `{ title: …, text: … }` treat **commas as separators**. If your text has a comma, use the one-field-per-line style instead, or wrap the text in quotes.
- If a value contains a colon `:`, wrap it in quotes: `"Check-in: 4 PM"`. (Otherwise the site shows odd text like `map[...]`.)

---

## Adding or changing photos

### The easy way (recommended)
1. Put photos in `photo-inbox/`, inside a folder named for where they go:
   `photo-inbox/pool/`, `photo-inbox/bedrooms/`, etc. iPhone HEIC photos work.
2. In Terminal, from the project folder, run:
   ```
   tools/prep-photos.sh
   ```
   This resizes the photos, rotates them upright, removes GPS location data,
   gives them web-safe names, and moves them into `assets/images/<folder>/`.
3. Reference the new filename in the right data file, e.g. in `data/home.yaml`:
   ```yaml
   image: pool/pool-sunset.jpg
   ```

Photo paths are always relative to `assets/images/`.

### Gallery
**Every photo in the gallery folders shows up automatically.** Photos are
sorted by filename, so add numbers to control the order:
`01-front.jpg`, `02-pool.jpg`, …

Tap any photo, on the Gallery page or in a room's photo grid, to open the
full-screen viewer. Swipe or use the arrow keys to move through the set.

**Captions:** add them in `data/gallery.yaml` under `captions`, keyed by
path, e.g. `pool/01-pool-sunset.jpg: Sunset over the pool`.
**Videos:** paste YouTube or Vimeo links under `videos` in the same file.

### Replacing a placeholder
Placeholder photos are named `placeholder-….jpg`.
- **Gallery:** as soon as a folder has one real photo, that folder's placeholders
  disappear from the gallery automatically.
- **Other pages** (home, villa rooms, resort…) name their photos in the data
  files, so point those lines at your new filenames.
Once a folder's placeholders aren't used anywhere, you can delete them.

You never need to make phone or desktop sizes. The site does that automatically.

---

## Seasonal updates

- **Banner:** in `data/announcement.yaml`, set `show: true` and edit `message`.
- **Hero slideshow:** every photo in `assets/images/hero/` (or `photo-inbox/hero/` before running the prep script) rotates at the top of the home page with a slow fade. To add a photo, drop it in that folder. To remove one, delete it. Filename order sets the sequence, so name them `01-pool.jpg`, `02-front.jpg`… to choose. `hero.image` in `data/home.yaml` is always shown first and is the photo used in link previews. `slide_seconds` sets how long each stays up, and `slideshow: false` shows just the one photo. Visitors who've turned on "reduce motion" on their phone see only the first photo.
- **Hero video (optional):** put a short muted `.mp4` (under ~8 MB) in `static/video/` and set `hero.video: video/yourfile.mp4` in `data/home.yaml`. Set it back to `""` to return to the photo.
- **Quick-glance numbers** under the hero: `highlights` in `data/home.yaml`.
- **Headline:** change `hero.headline` / `subheadline` in `data/home.yaml`.

---

## Link previews (when someone texts or posts the link)

Each page's preview uses that page's banner photo with your logo band along
the bottom, made automatically. To pick a different photo for a page, add
`share_image: pool/your-photo.jpg` to the top section of that page's file in
`content/`. The home page uses the hero photo.

After changing a preview photo, Facebook and iMessage may show the old one for
a while. Facebook's "Sharing Debugger" can refresh it.

## Search engines & visitor stats (hugo.yaml)

- `noindex: true` keeps the site out of Google while it has placeholders.
  **Set it to `false` at launch.**
- `analytics:` add a GoatCounter code or Cloudflare Web Analytics token to see
  visitor counts. Both are free and privacy-friendly. Leave them `""` for off.

## Deal Alerts signups

The **Deal Alerts** page (`/deals/`, linked from the footer, the FAQ and the Book Direct page) collects first name, email, the kinds of deals someone wants, and roughly when they're thinking of visiting. Everyone must tick the consent box. The page keeps the website's own design. Behind the scenes it sends each signup to a **Google Form**, which saves them into a **Google Sheet** you own (free, no limit).

**Setting up the Google Form** (one time). The questions must match the website exactly:

| Question | Type | Options (type them exactly) |
|---|---|---|
| First name | Short answer | — |
| Email | Short answer | — |
| Which deals interest you? | Checkboxes | Last-minute openings · Seasonal specials · Holidays & special events · Returning-guest offers |
| When are you thinking of visiting? | Dropdown | Not sure yet · In the next 3 months · 3–6 months from now · 6–12 months from now · More than a year out |
| Consent | Checkboxes | Yes |

In the form's **Settings → Responses**, set "Collect email addresses" to **Do not collect**, and turn **off** "Restrict to users in your organization" / "Require sign-in". Then open **Responses → Link to Sheets** so signups land in a spreadsheet.

Then Claude (or you) fills in `hugo.yaml` → `dealAlerts`:
- `action`: the form's address, with `viewform` changed to `formResponse`.
- `fields`: each question's `entry.…` number. Find them with ⋮ → **Get pre-filled link**: fill in every answer, click **Get link**, and the link shows `entry.123456=…` for each question.

If you change the checkbox or dropdown choices in `data/deals.yaml`, make the same change in the Google Form, or those answers won't be saved.

**Marketing to the list:** in the Google Sheet, choose File → Download → CSV, and import that into an email tool (MailerLite, Mailchimp, Brevo…). Marketing emails must include an unsubscribe link, which those tools add automatically.

Until `action` is set, the form shows "signups open very soon" instead of sending.

## Previewing changes on your computer

```
hugo server
```
Then open http://localhost:1313. The page refreshes automatically as you save
files. Press Ctrl+C in Terminal to stop.

## Publishing

Changes go live when they're pushed to the `main` branch on GitHub, usually
about a minute later. You can also edit any text file directly on github.com
(open the file → pencil icon → "Commit changes"), which publishes immediately.

If something looks broken after an edit, the most common cause is YAML
indentation or a missing quote. Check the file you just changed.
