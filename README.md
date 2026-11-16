# Houston & Associates website

The homepage for [Houston & Associates](https://www.houstoncc.co.za/), accountants in Boskruin, Johannesburg.

One fast static page. No build step, no framework, no tracking scripts.

## What's in here

| Path | What it is |
| --- | --- |
| `index.html` | The homepage |
| `404.html` | Page-not-found page |
| `assets/css/site.css` | All the styles |
| `assets/js/site.js` | Small extras: open/closed badge, mobile menu, contact form, years that update themselves |
| `assets/fonts/` | Funnel Display and Funnel Sans, self-hosted (SIL Open Font License, see `OFL.txt`) |
| `assets/img/` | Photos (WebP), the H monogram, icons and the social share image |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest` | Browser and phone icons |
| `robots.txt`, `sitemap.xml` | For search engines |
| `version-b/` | Version B: an alternative homepage design to compare against. Hidden from search engines. Delete the folder once a version is picked. |

## Comparing the two versions

With GitHub Pages switched on (Settings, then Pages, then deploy from the `main` branch, root folder):

- Version A: https://pgeddes07-design.github.io/houston-associates-website/
- Version B: https://pgeddes07-design.github.io/houston-associates-website/version-b/
- Logo options: https://pgeddes07-design.github.io/houston-associates-website/logos/

## Logo options page

`logos/` holds 124 logo ideas for review. Options 1 to 6 are full concepts built in HTML with self-hosted fonts (`logos/fonts/`, SIL Open Font License). Options 7 to 124 are quick sketches stored as WebP in `logos/img/` (`NNN.webp` thumbnails, `NNN-lg.webp` for the big view, `manifest.json` for groups and sizes). Visitors browse by group, open any sketch large, and email the numbers they like. The page is `noindex` and is not in the sitemap.

## Review switcher (remove before launch)

`assets/review-bar.js` adds a small floating bar that links Website A, Website B and the logo options page. Version A, Version B and the logo page each load it with one script tag. Before Version A goes live as the real site, delete this line from `index.html`:

```html
<script src="assets/review-bar.js" defer></script>
```

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` straight from the folder also works.

## Putting it live

Any static host works: GitHub Pages, Netlify, Cloudflare Pages, or upload the folder to the current host by FTP.

The page expects to live at the root of `https://www.houstoncc.co.za/`. The canonical link, social share image and sitemap all point there. If the address changes, update it in `index.html`, `robots.txt` and `sitemap.xml`.

## Before launch

- **Testimonials.** The three quotes are real, but the names still read `[Client name, business]`. Add names (with each client's OK) or remove that line.
- **Announcements.** The newest post is from February 2020. Add one or two current ones.
- **Contact form.** "Send message" opens the visitor's email app with the message filled in, addressed to accounts@houstoncc.co.za. To receive messages straight into an inbox instead, connect a form service (Formspree, Web3Forms or similar) and change the form's `action` in `index.html`.
- **Privacy policy.** The footer link needs a real POPIA privacy notice page.

## What's built in

- **Search:** title and description, canonical URL, Open Graph tags with a share image, and `AccountingService` structured data with the address, hours, phone and email.
- **Accessibility:** skip-to-content link, visible keyboard focus, labelled form fields, alt text on every photo. All animation switches off for visitors who have "reduce motion" turned on.
- **Speed:** self-hosted fonts, WebP images, lazy loading for everything below the hero.

## Photos

The team, office, award and cycling photos belong to Houston & Associates. The accounting desk, paperwork and jacaranda street images were generated with AI for this redesign.
