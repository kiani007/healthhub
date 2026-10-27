# Tasting Board

Ten website mockups for food businesses: three cafés, three restaurants and four bakeries. All of them are fictional and set in Pakistan. A dashboard, the **Tasting Board**, lets you browse them and preview each one on desktop, tablet and phone.

**Live:** https://healthhub-sable.vercel.app/

| No. | Mockup | Niche | Page |
|---|---|---|---|
| 01 | Ember & Bean Roasters, Islamabad | Specialty roastery café | `public/mockups/cafe-ember-bean.html` |
| 02 | Margin, Lahore | Study & work café | `public/mockups/cafe-margin-study.html` |
| 03 | Doodh Patti & Co., Karachi | Late-night chai café | `public/mockups/cafe-doodh-patti.html` |
| 04 | Aurelia, Islamabad | Tasting-menu fine dining | `public/mockups/rest-aurelia.html` |
| 05 | Koyla Karahi House, Lahore | Family BBQ & karahi | `public/mockups/rest-koyla-karahi.html` |
| 06 | Kumo Ramen Bar, Karachi | Ramen counter | `public/mockups/rest-kumo-ramen.html` |
| 07 | Levain & Co., Lahore | Sourdough bakery | `public/mockups/bakery-levain.html` |
| 08 | Layer & Lace, Islamabad | Custom cake studio | `public/mockups/bakery-layer-lace.html` |
| 09 | Qandeel Sweets & Bakers, Rawalpindi | Mithai & bakery | `public/mockups/bakery-qandeel-mithai.html` |
| 10 | Dough Joy, Karachi | Donut & cookie drops | `public/mockups/bakery-dough-joy.html` |

## How it's built

The site is static, with no build step and no `package.json`.

- `public/index.html`: the Tasting Board dashboard. Its mockup data (names, palettes, fonts, concepts) is the `MOCKUPS` array near the bottom of the file.
- `public/mockups/*.html`: one self-contained page per business. Each page has inline CSS and JS, plus these libraries:
  - fonts from Google Fonts
  - GSAP 3.13 with ScrollTrigger and SplitText, from cdnjs
  - Lenis smooth scrolling, from jsDelivr
  - Leaflet 1.9.4 maps, from unpkg, on CARTO / OpenStreetMap tiles

  Every page still reads and works if those libraries fail to load.
- `public/thumbs/`: hero screenshots used on the dashboard tickets.
- `public/404.html`: the not-found page.
- `vercel.json`: deploys `public/` as plain static files through an explicit `@vercel/static` build. The explicit build takes precedence over the project's old "Next.js" framework preset. The routes:
  - `/` and `/home` (the old homepage URL) show the board.
  - `/mockups/<slug>` works without `.html`.
  - `/food-mockups/...` and the old HealthHub page URLs redirect to the new paths.
  - Unknown paths get the 404 page.

## Photos and video

Aurelia's hero uses a HeyGen clip. Every other page has a `MEDIA` object near the bottom of its script, with a `<!-- HEYGEN: ... -->` comment describing each shot. Until a path is set, the illustrated art shows.

To add footage:
1. Put the file under `public/assets/<slug>/` (for example `public/assets/rest-koyla-karahi/hero.mp4`).
2. Set the matching `MEDIA` path to `'../assets/<slug>/hero.mp4'`.

## Run locally

Serve the `public/` folder with any static server, for example:

```bash
npx serve public
# or
python3 -m http.server --directory public 8080
```
