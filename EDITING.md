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
| Bedrooms, baths, sleeps, room-by-room details | `data/villa.yaml` |
| Amenity checklist | `data/amenities.yaml` |
| Windsor at Westside resort perks | `data/resort.yaml` |
| Attractions, drive times, map pins | `data/attractions.yaml` |
| Guest reviews | `data/reviews.yaml` |
| FAQ | `data/faq.yaml` |
| Gallery tabs, captions, videos | `data/gallery.yaml` |
| Seasonal banner at top of site | `data/announcement.yaml` |
| Longer text on Book Direct page | `content/book.md` |
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
- If a value contains a colon `:`, wrap it in quotes: `"Check-in: 4 PM"`.

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

### Replacing a placeholder
Placeholder photos are named `placeholder-….jpg`. Either point the data file
at your new photo, or delete the placeholder and give your photo the same
name. When a real photo is in place, delete the matching placeholder so it
doesn't appear in the gallery.

You never need to make phone or desktop sizes. The site does that automatically.

---

## Seasonal updates

- **Banner:** in `data/announcement.yaml`, set `show: true` and edit `message`.
- **Hero photo:** change `hero.image` in `data/home.yaml`.
- **Headline:** change `hero.headline` / `subheadline` in `data/home.yaml`.

---

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
