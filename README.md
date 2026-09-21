# Cristina i Pere · 05.06.27

Static wedding site (plain HTML + CSS, no build step). Ready for GitHub Pages.

## Pages

| File | Section |
|---|---|
| `index.html` | Home (title, photobooth GIF, date, CTA) |
| `programa.html` | Schedule |
| `lloc.html` | Venue + map |
| `preguntes.html` | FAQ |
| `confirmacio.html` | RSVP explanation + button to the form |

Shared styles live in `css/style.css`. Drawings and the GIF live in `media/`.

## Things to fill in

- **Handwritten title and date** — `media/cptitle.png` and `media/cpdate.png`. If either file is missing,
  a handwriting web font is shown instead.
- **RSVP form link** — in `confirmacio.html`, replace `https://forms.gle/PLACEHOLDER` with the real form URL.
- **Venue** — in `lloc.html`, update the name/address, the Google Maps link and the `iframe` embed `src`
  (Google Maps → Share → Embed a map, copy the `src`).
- **Schedule, FAQ and contact email** — placeholder text in `programa.html`, `preguntes.html` (`hola@example.com`).

## Password

Every page loads `js/gate.js`, which shows a password screen until the guest enters the invitation code
(remembered in the browser afterwards). It's a client-side gate on a static site — it keeps casual visitors
out, but is not real security. Only the SHA-256 of the password is in the code; to change it:

```sh
printf 'newpassword' | shasum -a 256   # paste the hash into HASH in js/gate.js
```

## Link preview (WhatsApp, iMessage, Slack…)

`media/share.jpg` (1200×630) is the image chat apps show when the link is shared, set via the Open Graph
`<meta>` tags in each page's `<head>`. Replace the file to change it (keep the size and name, or update the
`og:image` tags). Chat apps cache previews, so a change can take a while to show up — WhatsApp in particular
may need the link re-sent with a `?v=2` suffix.

## Drawings

Each drawing is positioned in `css/style.css` under `/* Flora */` with a class `f-1` … `f-8` matching
`media/1d.jpg` … `media/8d.jpg`. To add another drawing, drop the file in `media/`, add an `<img class="f-9">`
inside the `.flora` block of the page, and give `.f-9` a position/width in the CSS.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. The site will be published at `https://<user>.github.io/<repo>/`. All links are relative, so it works in a sub-path.
