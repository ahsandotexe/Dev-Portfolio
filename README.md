# Ahsan Iftikhar — portfolio

Personal site of a senior software engineer (fintech and AI systems), live at
https://portfoliobyahsan.netlify.app/.

The design is "Interactive Editorial": a digital magazine about one engineer. Type is the imagery,
whitespace is the layout, motion is masking and sliding. The full token and component spec lives in
[`design-system/ahsan-portfolio/MASTER.md`](design-system/ahsan-portfolio/MASTER.md); the prototype it
was built from is kept in [`design-import/`](design-import/).

## Stack

- React 19 + Vite 7, React Router v7
- Tailwind CSS 3 with CSS-variable tokens (`:root` light, `[data-theme="dark"]`)
- Framer Motion (lazy features), react-hook-form
- Self-hosted Inter, Space Grotesk and JetBrains Mono via `@fontsource-variable`
- Netlify (static hosting, Netlify Forms for the contact sheet)

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve dist/ locally
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `src/data/portfolio.js` | Every word of content: person, roles, projects, skills, philosophy, certificates. Edit here. |
| `src/pages/` | Home, About, Experience, Projects (`/projects/:slug`), Resume, NotFound |
| `src/components/` | CornerNav, PageRail, MobileTypeMenu, ContactSheet, DotGrid, Meta, SkipLink, Footer |
| `src/context/`, `src/hooks/` | Theme and contact-sheet state, focus trap |
| `src/assets/projects/` | Project illustrations (WebP, 1200×1500 plus thumbnails) |
| `public/` | Resume PDF, favicon (SVG + PNG), OG image, `_redirects` |
| `index.html` | Pre-paint theme script, meta tags, the static Netlify form registration |

## Updating content

- Projects, roles, skills and copy: edit `src/data/portfolio.js`. Projects appear in array order; the
  first three are featured on the home page.
- Resume PDF: replace `public/Ahsan_Iftikhar_Resume.pdf` and update `person.resume` (pages, size, date).
- Project images: drop `<id>.webp` (1200×1500) and `<id>-thumb.webp` (240×300) into
  `src/assets/projects/`; the data file picks them up by id.
- Portrait: replace `src/assets/portrait.webp` (3:4). It is rendered in black and white by CSS.

## Theme

Light is the default. The toggle in the header (or the mobile menu) switches `data-theme` on `<html>`
and stores the choice in `localStorage`; a small inline script in `index.html` applies it before first
paint so there is no flash.

## Contact form

The sheet posts to Netlify Forms (`form-name=contact`) with a honeypot field. Netlify discovers the form
from the hidden static copy in `index.html`. Submissions appear under Forms in the Netlify dashboard;
set up a notification there to get them by email.

## Deploy

Netlify builds with `npm run build` and publishes `dist/` (see `netlify.toml`). All routes fall back to
`index.html` via `public/_redirects`.
