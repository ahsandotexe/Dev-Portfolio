# Redesign QA record (Phase 5)

Build verified on 2026-10-09 against the production bundle (`npm run build`, served locally with an
SPA fallback). Direction: Interactive Editorial, imported from the owner's Claude Design project; spec
in `design-system/ahsan-portfolio/MASTER.md`.

## Bundle, before and after

| | JavaScript (raw / gzip) | CSS (raw / gzip) | Notes |
|---|---|---|---|
| Before (v2 site) | 1,376.9 kB / 402.8 kB | — | three.js, react-three-fiber and drei were 64% of it |
| After | 432.2 kB / 157.7 kB | 29.9 kB / 8.4 kB | React 19, Router 7, Framer Motion (lazy `domAnimation` features), react-hook-form |

Fonts are self-hosted and split by unicode range, so a Latin page downloads about 110 kB of woff2 across
the three families. Project images are WebP, 36–58 kB each, and only the current spread's image is
requested eagerly.

Removed: `three`, `@react-three/fiber`, `@react-three/drei`, `react-icons`, `react-hot-toast`,
`react-intersection-observer`, `lucide-react`. Added: `@fontsource-variable/{inter,space-grotesk,jetbrains-mono}`.

## Responsive review

Screenshots were taken with headless Chrome at each width in the production build and reviewed by eye.

| Width | Pages reviewed | Result |
|---|---|---|
| 375 | Home, menu, About, Experience, Projects (two spreads), Resume, contact sheet | No horizontal overflow (scrollWidth 375 on every route); sheet is full width; spreads stack image first |
| 768 | About, Experience, Projects | Single-column layout below the 820px switch; portrait is a 4:3 plate |
| 1024 | Home, Projects | Two-column spread; hero at 11.5vw |
| 1440 | Every page, light and dark, plus the contact sheet, the /contact route and the 404 page | Matches the prototype |

## Colour contrast (programmatic, WCAG 2.1)

Computed from the tokens with the relative-luminance formula. Alpha text colours are blended over
their actual background first.

| Pair | Light | Dark | Use | AA |
|---|---|---|---|---|
| ink on paper | 17.1:1 | 17.1:1 | body text | pass |
| ink at 65% on paper | 5.6:1 | 7.7:1 | mono labels (11px), meta | pass |
| accent on paper | 4.7:1 | 5.4:1 | eyebrows, hover colour, errors | pass |
| paper on ink | 17.1:1 | 17.1:1 | inverted band, buttons | pass |
| paper at 60% on ink | 6.7:1 | 4.7:1 | muted text on the band | pass |
| ink on plate | 14.6:1 | 14.9:1 | portrait plate fallback | pass |
| accent on ink | 3.7:1 | 3.2:1 | mobile menu active item at 52px only | pass (large text); never used for small text |

The prototype's red `#DC4453` measured 4.0:1 on paper, which fails for 11–14px text, so the light
accent is `#CC3A48` (4.7:1) and the dark accent `#E8606D` (5.4:1). Ink at 55%, used in the prototype
for small labels, measured 4.0:1 in light mode and was raised to 65% everywhere.

## Keyboard walkthrough (scripted with puppeteer-core, production build)

- Tab order on the home page: skip link → name → 01 Home … 05 Resume → 06 Contact → theme toggle →
  Selected work → Resume → GitHub → LinkedIn → Email → work rows.
- Skip link: Enter moves focus to `main#main`.
- Contact sheet: Enter on "06 Contact" opens the dialog with focus on the Name field; Tab cycles
  Name → Email → Message → mailto → Send → Close → Name; body scroll is locked; Escape closes and
  returns focus to the Contact button. Submitting empty shows three `role="alert"` messages.
- Experience: Enter on a company row expands it (`aria-expanded`), one row open at a time.
- Projects: ArrowRight / ArrowLeft move between spreads and update the URL and title; an unknown slug
  redirects to `/projects`.
- Mobile menu (375px): Enter on "Menu" opens the dialog with focus on 01 Home; Tab cycles through the
  five links, Get in touch, the theme toggle and Close, then wraps; Escape closes and returns focus to
  the Menu button.
- Theme toggle persists in `localStorage`, survives reload, and updates `theme-color`.
- `/contact` opens the sheet directly; closing it navigates to `/`.
- Reduced motion: with `prefers-reduced-motion: reduce` the hero lines have no transform immediately
  after load (masks are skipped), and the dot grid draws one static frame.
- Document titles and descriptions are set per route (Home, About, Experience, each project, Resume,
  Contact, 404).

## Netlify

- `netlify.toml`: build command, publish dir, SPA redirect, immutable cache for `/assets/*`, basic
  security headers.
- `public/_redirects`: `/* /index.html 200` (belt and braces).
- `index.html` carries a hidden static `contact` form so Netlify registers the form at deploy time;
  the React sheet posts URL-encoded data to `/` with the `form-name` field and a honeypot.
- Resume PDF at `/Ahsan_Iftikhar_Resume.pdf`; favicon SVG with PNG fallbacks; `og.jpg` 1200×630.

## Known gaps and decisions to confirm

1. Light is the default theme, following the prototype; the original brief said dark. One string in
   `index.html` and `ThemeProvider.jsx` flips it.
2. Role dates and the Medicon role follow the prototype's data (which matches the 2 October resume).
   A newer resume PDF in Downloads (9 October) lists Paysys as Nov 2022 – Oct 2024, Teresol as
   Apr – Oct 2022, drops Medicon and says "4+ years". The site and the shipped PDF are consistent with
   each other; pick one version and the data file changes in one place.
3. GitHub links to `github.com/ahsandotexe` as instructed; the 9 October resume shows `ahsan-lumida`.
4. Qlu.ai is kept as a project (the old site had it) but not as a role, matching the prototype's data.
5. The About portrait is a tight crop of the existing mirror selfie, rendered in black and white. A
   proper headshot would replace `src/assets/portrait.webp`.
6. The four illustrations for Lumida AI, National Savings, Bank Al-Habib and Qlu.ai were drawn in the
   same idiom as the prototype's six; all ten are illustrations, not screenshots.

## Update, later on 2026-10-09: home spreads and the autoplay carousel

- Home "Selected work" now shows all three featured projects in full (`src/components/FeaturedProject.jsx`);
  the standalone preview is `mockups/home-selected-work.html`, published as a private artifact at
  https://claude.ai/artifact/27ewujR17wmn82R4AMu6mi. Reviewed at 375 and 1440 in both themes.
- Projects carousel (`src/pages/Projects.jsx`, `src/hooks/useAutoplay.js`): scripted with puppeteer-core
  against the production build, 31 checks passed: advances every 2 s; no history growth; hovering the spread (eyebrow,
  text and image, not the counter row or the bottom bar) pauses and leaving resumes from the held countdown; Pause holds until Play; arrow keys navigate and restart the
  countdown; a mouse click's leftover focus does not pin it but visible keyboard focus does; reduced
  motion starts paused with Play still working; autoplay never scrolls while manual paging scrolls the
  spread into view; the open contact sheet and a hidden tab pause it; focus stays put on automatic
  advances; the active dash fills while playing; the Pause / Play button is centred with no overflow at
  1440 and 375 (neighbour names truncate).
- Open decision: 2 s is a short reading time for a spread (the slide motion alone takes 0.8 s); 5 to 6 s is
  the usual carousel pace. One constant to change.
