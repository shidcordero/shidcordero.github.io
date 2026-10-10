# Rashid Cordero — Portfolio

Personal portfolio for Rashid Cordero, Principal Lead Software Developer in Davao City, Philippines.

Published at https://shidcordero.github.io/ through GitHub Pages from the root of the `master` branch.

## Local preview

This is a static site. No dependency installation or build step is required.

```sh
python -m http.server 4173
```

Open http://localhost:4173.

## Active files

- `index.html`: portfolio content and metadata.
- `css/portfolio.css`: responsive layout and visual design.
- `js/portfolio.js`: navigation, scroll reveals, hover lighting and a subtle animated background.
- `img/profile.png`: original portrait.
- `assets/Rashid-Cordero-CV.pdf`: current downloadable CV.

Animations respect the system's reduced-motion preference. Background animation pauses when the hero is offscreen or the browser tab is hidden. The page remains readable with JavaScript disabled. Typography uses Google Fonts with system fallbacks.

Legacy Bootstrap template resources remain in the repository for reference, but the redesigned page does not load them or require the old Gulp build.

## Updating content

Edit `index.html` and replace the PDF in `assets/` when updating the CV. Mars Group is a client engagement through GistLens / Plainstep, not a separate employer. The Plainstep start date represents continuous company tenure, while the title is the current role.

## Checks performed

Verified layout widths of 320, 390, 768, 1024, 1440 and 1920 pixels; mobile menu open/close; section anchors; CV download; reduced-motion behavior; and absence of browser script errors or failed local assets. Desktop and mobile screenshots were reviewed before publication.
