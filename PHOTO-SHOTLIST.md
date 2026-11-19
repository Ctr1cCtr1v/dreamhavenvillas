# Photo shot list

> **Update 2026-11-19:** the professional shoot photos are in. Everything
> below is done except `area/` (your own trip photos) and three resort cards
> (Tu Casa, Fitness Center, Phase 3 pool). The real file names differ from
> the suggestions below; see `data/gallery.yaml` → `captions:` for the list.

Drop each photo into `photo-inbox/<folder>/` using the file names below
(the numbers set the order). Then tell Claude, who will run the prep script,
connect the photos to the right spots and check how they look.

**Tips:** landscape (horizontal) photos for everything except where noted.
Use photos you took yourself. Do not use official Disney, Universal or
SeaWorld photos or logos. Keep people's faces out of the shots, or ask first.

"Text to edit" = the file that holds the words shown next to that photo.

---

## `hero/` — the big slideshow at the top of the home page (3–6 photos)
Your very best, most "wow" shots. First one shows first and is also the photo
in link previews (texts, Facebook).

| File | What to shoot | Text to edit |
|---|---|---|
| `01-pool-golden-hour.jpg` | Pool and lanai at sunset or dusk (best choice for #1) | `data/home.yaml` → `hero:` (headline, subheadline) |
| `02-front-of-home.jpg` | The front of the house in good light | same |
| `03-living-room.jpg` | Main living room, bright and tidy | same |
| `04-pool-wide.jpg` | Wide shot of the pool, spa and lanai | same |

## `exterior/` — the house from outside
| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-front.jpg` | Front of the house, straight on | The Villa page banner; "The Villa" tile on home | `content/the-villa.md` (page intro); tile label in `data/home.yaml` → `tiles:` |
| `02-front-angle.jpg` | Front at an angle, with the palm trees | Gallery | Caption: `data/gallery.yaml` → `captions:` |
| `03-street-view.jpg` | Street and driveway, to show the setting | Gallery | same |

## `pool/` — pool, spa and lanai
| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-pool-wide.jpg` | Whole pool and lanai, wide | Home "Your own private pool" section; The Villa → Pool & Lanai (big photo) | `data/home.yaml` → `sections:` (The Pool); `data/villa.yaml` → `spaces:` (Pool & Lanai) |
| `02-pool-day.jpg` | Pool in bright daylight | Gallery banner and home "Gallery" tile; Pool & Lanai | `content/gallery.md`; `data/villa.yaml` |
| `03-spa.jpg` | The spa | Pool & Lanai; Book Direct band at the bottom of every page | `data/home.yaml` → `book_band:` |
| `04-outdoor-dining.jpg` | Outdoor table for 6 and outdoor sectional | Pool & Lanai | `data/villa.yaml` |
| `05-loungers.jpg` | Loungers and the poolside sectional | Gallery | `data/gallery.yaml` captions |
| `06-cornhole.jpg` | Cornhole set up on the lanai or yard | Gallery | same |

## `living/` — living rooms and the loft
| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-living-room.jpg` | Main-floor living room with the sectional and 85" TV | Home "Room for everyone" section; The Villa → Living Room | `data/home.yaml` → `sections:` (The Villa); `data/villa.yaml` → `spaces:` (Living Room) |
| `02-living-room-wide.jpg` | Living room looking toward the kitchen | The Villa → Living Room | `data/villa.yaml` |
| `03-living-room-tv.jpg` | The TV wall | The Villa → Living Room | same |
| `04-loft.jpg` | Upstairs living room with sectional and TV | The Villa → Upstairs Loft | `data/villa.yaml` → `spaces:` (Upstairs Loft) |
| `05-loft-games-table.jpg` | The games table and games closet | Upstairs Loft | same |
| `06-loft-posters.jpg` | The Disney movie posters on the wall | Upstairs Loft | same |

## `kitchen/` — kitchen and dining
| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-kitchen.jpg` | Whole kitchen | The Villa → Kitchen & Coffee Bar | `data/villa.yaml` → `spaces:` (Kitchen & Coffee Bar) |
| `02-island.jpg` | The island with its 4 seats | same | same |
| `03-dining-table.jpg` | The 12-seat dining table | same | same |
| `04-coffee-bar.jpg` | The coffee bar and waffle makers | Gallery | `data/gallery.yaml` captions |

## `game-room/` — game room
| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-game-room.jpg` | The whole room | The Villa → Game Room | `data/villa.yaml` → `spaces:` (Game Room) |
| `02-air-hockey.jpg` | The air hockey table | Game Room | same |

## `bedrooms/` — one main photo per room (the order matters)
| File | Room | Text to edit (all in `data/villa.yaml` → `bedrooms:`) |
|---|---|---|
| `01-primary-suite.jpg` | Primary Suite (King, main floor) | Primary Suite |
| `02-bedroom-2.jpg` | Bedroom 2 (Queen, main floor) | Bedroom 2 |
| `03-bedroom-3.jpg` | Bedroom 3 (King, upstairs) | Bedroom 3 |
| `04-bedroom-4.jpg` | Bedroom 4 (King, upstairs) | Bedroom 4 |
| `05-bedroom-5.jpg` | Bedroom 5 (King, upstairs) | Bedroom 5 |
| `06-bedroom-6.jpg` | Bedroom 6 (Queen, upstairs) | Bedroom 6 |
| `07-cars-room.jpg` | Cars Room (bunks) | Cars Room |
| `08-moana-room.jpg` | Moana Room (2 twins) | Moana Room |

Optional extras: bathroom photos (`01b-primary-bath.jpg`, `09-kids-bath.jpg`…).
They appear in the Gallery and can be added to a room card on request.

## `resort/` — Windsor at Westside clubhouse and community
Use your own photos only (the resort's brochure photos belong to the HOA).

| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-clubhouse.jpg` | Clubhouse exterior or entrance | The Resort page banner and intro; home "The Resort" tile | `data/resort.yaml` → `intro:`; `content/windsor-at-westside.md` |
| `02-resort-pool.jpg` | Zero-entry pool and hot tub | Zero-Entry Resort Pool card | `data/resort.yaml` → `perks:` |
| `03-lazy-river.jpg` | Lazy river | Lazy River card; home "Gated resort" section | `data/resort.yaml` → `perks:`; `data/home.yaml` → `sections:` (The Resort) |
| `04-slide-splash.jpg` | Waterslide and kids' splash pad | Waterslide & Splash Pad card | `data/resort.yaml` → `perks:` |
| `05-tu-casa.jpg` | Tu Casa Bar & Lounge | Tu Casa card | same |
| `06-fitness.jpg` | Fitness center | Fitness Center card | same |
| `07-courts.jpg` | Sports courts and playground | Sports Courts card | same |
| `08-kids-center.jpg` | Kids' activity center | Kids' Activity Center card | same |
| `09-phase3-pool.jpg` | The quiet Phase 3 pool | Quiet Phase 3 Pool card | same |

## `area/` — the Explore page and home page "Beyond the Parks" photos
Your own vacation photos are perfect. No official park photos.

| File | What to shoot | Shows on | Text to edit |
|---|---|---|---|
| `01-theme-parks.jpg` | Your own park trip photo, or the fireworks | Explore page banner; Theme Parks section; home "Minutes from the magic" | `content/explore.md`; `data/attractions.yaml` → `categories:`; `data/home.yaml` → `sections:` (The Parks) |
| `02-beach.jpg` | Siesta Key, Cocoa Beach or similar | Beaches section; home "Beyond the Parks" | `data/attractions.yaml` → `categories:` (Beaches); `data/home.yaml` |
| `03-golf.jpg` | A golf course nearby | Golf section; "Explore" tile on home | `data/attractions.yaml` → `categories:` (Golf) |
| `04-dining-shopping.jpg` | Disney Springs, Old Town or a favorite restaurant | Dining & Shopping section | `data/attractions.yaml` → `categories:` |
| `05-nature.jpg` | Gatorland, Apopka Wildlife Drive, Kennedy Space Center | Nature & Adventure section | `data/attractions.yaml` → `categories:` |

---

## What's still placeholder after the first photos
Anything you don't have a photo for keeps its clearly labeled placeholder, so
nothing breaks. Add photos later using the same names or just add more files to
a folder; the Gallery and the hero slideshow pick up every new photo on their own.

## Captions
Gallery captions live in `data/gallery.yaml` → `captions:` (one line per photo,
written as `folder/filename.jpg: Caption text`). Photos with no caption simply
show none.
