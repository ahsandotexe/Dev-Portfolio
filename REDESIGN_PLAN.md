# Redesign plan: Ahsan Iftikhar portfolio (Phase 1)

Status: awaiting feedback. Where the brief and the code differ, the code is treated as the truth.
Tokens are persisted in `design-system/ahsan-portfolio/MASTER.md`.

---

## 0. Research inputs and where they were overridden

**ui-ux-pro-max `--design-system`** returned: pattern "Enterprise Gateway" (a B2B sales landing with
path selection, mega menu, client logos and a Contact Sales CTA), style "Dark Mode (OLED)" on `#020617`
with a `#22C55E` green CTA, and type Playfair Display / Source Serif 4 with JetBrains Mono labels.
All three collide with frontend-design's calibration list (near-black with an acid-green accent, a
high-contrast serif display, a monospace face for small labels), and the pattern is for a company,
not a person. Discarded.

Kept from ui-ux-pro-max (verified against the dataset rows):
- Landing: "Portfolio Grid" and "Hero-Centric" rows: one primary CTA, neutral background so the work
  reads, visuals first, fast load, static hero under reduced motion.
- Chips: `flex flex-wrap gap-2` for collections; never a fixed-height clipped row; `whitespace-nowrap`
  only on a single compact label with `min-w-0`.
- Focus: visible ring on every control including inside overlays; `scroll-padding-top` equal to the
  header height so the sticky header never covers keyboard focus (WCAG 2.2 Focus Not Obscured).
- Motion: honour `prefers-reduced-motion`; animate at most 1–2 elements per view; shared duration
  tokens rather than one value everywhere.
- Contrast: check light and dark independently; 4.5:1 for all normal text, 3:1 for input borders and
  focus indicators.
- Dialogs: focus trap, Escape, return focus; `role="status"` for form outcome messages.
- Headings: `text-wrap: balance` with a bounded measure; never forced line breaks.
- URLs: `overflow-wrap: anywhere` so long links reflow.

Typography rows returned were Inter-only, Poppins/Open Sans, Space Grotesk/DM Sans (the current site)
and Archivo/Space Grotesk. They are what the dataset hands every tech site, so they were rejected on
frontend-design's "default rather than choice" test.

---

## 1. Audit of the current build

Baseline `npm run build` (one chunk): **1,376.9 kB raw / 402.8 kB gzip JS**, 25.9 kB CSS, 95.6 kB JPEG.
Attribution from a per-package chunk build:

| Dependency                                  | gzip    | raw      | Decision | Why |
|---------------------------------------------|---------|----------|----------|-----|
| three                                       | 180.4 kB| 703.9 kB | **Drop** | One 20%-opacity sphere behind the hero |
| react-reconciler (pulled in by R3F)         | 36.0 kB | 115.5 kB | **Drop** | Only needed by @react-three/fiber |
| @react-three/fiber                          | 12.8 kB | 33.3 kB  | **Drop** | " |
| three-stdlib, drei, react-use-measure, its-fine, zustand, use-gesture, tunnel-rat | ~9.7 kB | ~27 kB | **Drop** | drei transitive deps |
| **3D subtotal**                             | **~239 kB** | **~878 kB** | | **64% of all JS** |
| framer-motion + motion-dom + motion-utils   | 42.3 kB | 123.5 kB | **Drop** (recommendation, see §5) | The one page-load moment and all state transitions are cheaper in CSS |
| react-icons (6 brand logos)                 | 12.3 kB | 27.4 kB  | **Drop** | The tech-logo row is template chrome; stacks become text |
| react-hot-toast + goober                    | 5.0 kB  | 12.0 kB  | **Drop** | Only used for a fake form success and "PDF coming soon" |
| react-intersection-observer                 | 1.1 kB  | 2.1 kB   | **Drop** | Native IntersectionObserver for nav scroll-spy |
| react + react-dom + scheduler               | 61.6 kB | 198.4 kB | Keep | |
| react-router / react-router-dom v7          | 11.9 kB | 31.9 kB  | Keep | Case-study and resume routes |
| react-hook-form                             | 8.7 kB  | 22.9 kB  | Keep | Validation retained per brief |
| lucide-react (tree-shaken, ~10 icons)       | 3.5 kB  | 13.0 kB  | Keep | UI icons only |
| babel-plugin-react-compiler (dev)           | —       | —        | Keep | Build-time only |

Projected after redesign: **~95–105 kB gzip JS** (from 402.8 kB), plus two self-hosted variable
woff2 files (actual sizes reported in Phase 2) and ~6–8 kB gzip CSS.

Source files:

| Keep (rebuilt)                          | Delete                                                      | Replace with |
|-----------------------------------------|-------------------------------------------------------------|--------------|
| `ThemeContext.jsx` (→ `data-theme`, inline script) | `AnimatedSphere.jsx`, `ScrollIndicator.jsx`, `StatsCounter.jsx`, `SkillProgressBar.jsx`, `SkillBadge.jsx`, `FeaturedProject.jsx`, `ProjectModal.jsx`, `ProjectFilter.jsx` (unused), `ScrollToTop.jsx` | — |
| `ContactForm.jsx` (→ Netlify Forms, same RHF rules) | `App.css` (Vite boilerplate, never imported), `src/assets/react.svg`, `public/vite.svg` | — |
| `Navbar.jsx`, `Footer.jsx` (rewritten)  | `pages/About.jsx`, `pages/Contact.jsx`                       | Home sections |
| `pages/Resume.jsx` (rewritten)          | `.glass`, `.glass-light`, `.text-adaptive-*`, every `html.light` override, ripple CSS, Google Fonts `@import` | CSS tokens |
| `HeroSection.jsx` (rewritten)           | `ExperienceTimeline.jsx`                                     | `ExperienceList.jsx` |
| `ProjectCard.jsx` (rewritten as `<a>`)  | —                                                            | `ProjectCover.jsx` |
| data in `Resume.jsx` / `Projects.jsx`   | —                                                            | `src/data/{profile,experience,projects,skills,education}.js` shared by site and PDF script |

Other findings: `index.html` lacks a theme pre-paint script, favicon is `vite.svg`, no `og:image`,
no `og:url`, no canonical; no `_redirects` or `netlify.toml`; `README` claims React Router v6 (it is v7);
the mobile menu uses animated `height: auto` and has no focus handling; `Navbar` imports `useCallback`
and `memo` it never uses; the current site has no `<main>` landmark and uses no `<h1>` on Home other
than the greeting.

---

## 2. Design direction: "Ledger"

### Concept

The subject's world is banking back office, digital account opening and investment analysis. Its
artifacts are ledger paper (pale green stock, ruled lines), bank statements (aligned columns, tabular
figures) and the accountant's double rule under a total. The site borrows exactly that: dark mode is
green ink, light mode is ledger paper, facts are set in ruled rows with aligned figures, and the one
flourish is the double rule that closes a total.

### Tokens (verified for WCAG AA with a script; see MASTER.md for the full table)

| Token       | Dark      | Light     | Role |
|-------------|-----------|-----------|------|
| `--bg`      | `#0E1F1B` | `#F2F5F1` | page (ink / paper) |
| `--surface` | `#16302A` | `#FFFFFF` | nav, inputs, cover base |
| `--text`    | `#EEF2EF` | `#0E1F1B` | primary text (15.1:1 / 15.5:1) |
| `--muted`   | `#9DB3AB` | `#4F6660` | secondary text (7.7:1 / 5.6:1) |
| `--accent`  | `#8FD4BB` | `#1B6B52` | links, primary button, focus (10.0:1 / 5.8:1) |
| `--rule`    | `#2A4A41` | `#CFDAD3` | ledger rules and dividers |

Derived: `--outline` `#4C7A6C` / `#6A8A7F` for input borders (3.5:1 / 3.4:1).
Domain tints for project covers: Banking blue `#1F3D5C` / `#D6E2EE`, Fintech green `#1F4D3A` /
`#D4E9DD`, AI/SaaS amber `#5C4716` / `#EEE4CB` (text on each verified ≥ 7.8:1).

### Type

- **Bricolage Grotesque** (variable, opsz + wght) for the headline and headings. Its ink-trap,
  slightly printed character carries the "typeset statement" idea; at opsz 96 and weight 500 it is
  confident without shouting. Fallback: `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- **IBM Plex Sans** (variable) for body, UI and every figure. Plex was drawn for IBM, whose machines
  still run bank back offices; it is neutral enough to let Bricolage be the personality, and it has
  true tabular figures, which the ledger needs. Fallback: `"Segoe UI", Roboto, "Helvetica Neue",
  Arial, sans-serif`.
- Self-hosted through `@fontsource-variable/bricolage-grotesque` and
  `@fontsource-variable/ibm-plex-sans` (woff2, latin subset, `font-display: swap`), replacing the
  render-blocking Google Fonts `@import`.
- Scale: 13 / 15 / 17 / 21 / 26 / 33 / 41 px, H1 `clamp(2.5rem, 1.5rem + 3.5vw, 4rem)`. Body 17/1.6.
  Prose measure ≤ 68ch (cap 80ch). Sentence case throughout. No monospace face.

### Spacing, radius, surfaces

- Spacing: 4-px scale (4 8 12 16 24 32 48 64 96 128); sections 64 px mobile / 96 px desktop.
- Container max 72rem; gutters 16 / 24 / 32 px.
- Radius encodes meaning: 0 on ruled rows and rules; 4 px on buttons, inputs, tags; 8 px on project
  covers and the mobile menu; full only on the avatar and theme toggle.
- No shadows in dark mode; 1-px rule borders in light. Text never sits inside a card.

### The single memorable element

The **account summary**: five ruled rows in the hero, labels left, values right in tabular figures,
closed by a double rule. On load the rows print in sequence (35 ms stagger, settles at 280 ms); under
reduced motion they are simply there. The double rule appears in exactly two other places: the logo
mark (an "A" sitting on a double rule, also the favicon) and under the last experience entry.

Rows (values computed from `src/data` at runtime where dated):

```
Now                  Senior Software Engineer, Lumida Wealth (remote, US)
In production since  Apr 2022 (4 yr 6 mo)
Domains              Banking, fintech, AI products
Shipped for          National Bank of Pakistan, National Savings (300+ branches),
                     Bank Al-Habib, Lumida Wealth, Qlu.ai
Based in             Karachi, Pakistan (UTC+5). Open to remote roles.
═══════════════════════════════════════════════════════════════════════
```

### Why this fits, and why it is not the default

A senior engineer who ships for banks should present like a statement, not a launch page: facts in
rows, figures aligned, nothing performing. The ledger is the literal artifact of the work (300+
branches, account opening, core banking), so the structure carries information instead of decorating.

The default developer portfolio in 2026 is slate-900 with one bright accent, glass or gradient cards,
three animated stat tiles, a logo marquee and a staggered fade-up on every section. That is the current
site, and it is also what the ui-ux-pro-max generator produced. Ledger differs in kind: the surfaces
carry a hue (green ink, green paper) instead of tinted black; structure is ruled rows, not cards;
figures are the visual signature; there are no stat tiles, no gradients, no logo rows, no scroll
reveals; and the typographic personality comes from one deliberately chosen display face.

### Second-pass review (frontend-design) and what changed

- Closest risk is "dark + green accent". Mitigation: the background itself is a visible green
  (`#0E1F1B`, not `#0B0B0B`), the accent is a soft mint at 10:1 rather than a neon, and light mode
  carries the same identity with a deep jade accent. If you would rather move off green entirely, the
  fallback is ink navy `#101C2E` / paper `#F3F4F0` with the same structure (one-line token change).
- Dropped during review: a monospace face for ledger figures (replaced by Plex's tabular figures to
  avoid the "mono data labels" tell); a violet tint for AI/SaaS covers (purple-for-AI is a cliché,
  replaced with amber); the floating scroll-to-top button and the tech-logo row (template chrome); any
  numbered 01/02 markers (dates are the real sequence); page transitions.
- Confirmed absent: cream + serif + terracotta; all-caps eyebrows; middle-dot meta strings; "→" on
  buttons; identical rounded cards; fade-up sections; big-number stat hero.

### Wireframes

Home, desktop (≥ 1024):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ A̲ Ahsan Iftikhar           Work   Experience   Skills   Contact   Resume   ◐ │  nav: wordmark + mark, anchors, Resume route, theme toggle
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  I build the software banks                              ┌────────────┐      │  H1 Bricolage, ≤ 20ch, balanced
│  and investors actually use.                             │   photo    │      │  photo 4:5, ink-toned, visible at all widths
│                                                          │   4:5      │      │
│  I'm Ahsan Iftikhar, a senior full-stack engineer        │            │      │  lead ≤ 68ch
│  (React, Node.js, Flask, OpenAI). In four years I've     └────────────┘      │
│  shipped digital account opening for a national bank,                        │
│  branch systems used by 300+ offices, and LLM-driven                         │
│  market analysis for US investors.                                           │
│                                                                              │
│  [ Download resume ]    Get in touch                                         │  one solid primary, one text link
│                                                                              │
│  Now                  Senior Software Engineer, Lumida Wealth (remote, US)   │ ┐
│  ──────────────────────────────────────────────────────────────────────────  │ │ account summary
│  In production since  Apr 2022 (4 yr 6 mo)                                   │ │ label col 14rem
│  ──────────────────────────────────────────────────────────────────────────  │ │ tabular figures
│  Domains              Banking, fintech, AI products                          │ │ prints in ≤ 280 ms
│  ──────────────────────────────────────────────────────────────────────────  │ │
│  Shipped for          National Bank of Pakistan, National Savings (300+      │ │
│                       branches), Bank Al-Habib, Lumida Wealth, Qlu.ai        │ │
│  ──────────────────────────────────────────────────────────────────────────  │ │
│  Based in             Karachi, Pakistan (UTC+5). Open to remote roles.       │ │
│  ══════════════════════════════════════════════════════════════════════════  │ ┘ double rule
│                                                                              │
│  Selected work                                           All 8 projects      │
│  ┌───────────────────────────┐  ┌───────────────────────────┐                │  2 × 2; each card is one <a>
│  │ cover: fintech tint,      │  │ cover: banking tint,      │                │  cover = tinted panel + one
│  │ figure "US equities"      │  │ figure "300+"             │                │  figure/initials; `image`
│  ├───────────────────────────┤  ├───────────────────────────┤                │  prop swaps in a screenshot
│  │ Fintech, AI               │  │ Banking                   │                │
│  │ AI Investment Analysis    │  │ NBP Digital Account       │                │  tag / title / role+impact /
│  │ Platform                  │  │ Opening                   │                │  stack (wrapping chips)
│  │ LLM research workflows    │  │ Led front end from day    │                │
│  │ for US-equity investors   │  │ one; live for NBP         │                │
│  │ React  Flask  OpenAI      │  │ React  Node.js  Oracle    │                │
│  └───────────────────────────┘  └───────────────────────────┘                │
│  ┌ Bank Al-Habib Core Banking ┐  ┌ Qlu.ai ──────────────────┐                │
│  └───────────────────────────┘  └───────────────────────────┘                │
│                                                                              │
│  Experience                                                                  │
│  Dec 2024 to now     Senior Software Engineer, Lumida Wealth                 │  date column tabular
│                      25% better performance and engagement from new          │  metric leads the line
│                      React modules                                           │
│                      ▸ 4 more points                                         │  <details>, CSS only
│  ──────────────────────────────────────────────────────────────────────────  │
│  Oct to Dec 2024     Full Stack Engineer, Qlu.ai                             │
│                      30% faster loads, 20% faster APIs, 40% fewer bugs       │
│                      ▸ 4 more points                                         │
│  ──────────────────────────────────────────────────────────────────────────  │
│  Nov 2022 to Oct 2024  Software Engineer I, Paysys Labs …                    │
│  Apr to Oct 2022       Software Engineer, Teresol …                          │
│  ══════════════════════════════════════════════════════════════════════════  │
│                                                                              │
│  Skills                                                                      │
│  Languages     TypeScript, JavaScript, Python, Java, C#, C/C++, SQL          │  rows; plain wrapping text
│  Front end     React, Next.js, React Native, Vue.js, React Query, XState,    │
│                Material UI, Tailwind CSS                                     │
│  Back end      Node.js, Express, NestJS, Flask, Spring Boot, Quarkus, .NET,  │
│                REST, JWT, Socket.IO                                          │
│  Data          PostgreSQL, Oracle SQL, PL/SQL, Firestore, Redis,             │
│                Elasticsearch, ETL jobs, Jasper Reports                       │
│  AI            OpenAI LLMs, agentic workflows                                │
│  Cloud, tools  Google Cloud, Docker, Git, JMeter, Snyk                       │
│                                                                              │
│  Contact                                                                     │
│  ┌ Name ───────────┐ ┌ Email ──────────┐      ahsaniftikhar2016@gmail.com    │  form left (RHF + Netlify)
│  ┌ Subject (optional) ───────────────┐        GitHub                         │  direct links right
│  ┌ Message ──────────────────────────┐        LinkedIn                       │
│  [ Send message ]   status line                Karachi, Pakistan (UTC+5)     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Ahsan Iftikhar    Email    GitHub    LinkedIn    Resume (PDF)      © 2026    │  one-row footer
└──────────────────────────────────────────────────────────────────────────────┘
```

Home, mobile (375):

```
┌────────────────────────────┐
│ A̲ Ahsan Iftikhar     ◐   ≡ │  menu: full-height panel, focus trapped,
├────────────────────────────┤  Escape closes, focus returns to ≡
│ ┌────────┐                 │
│ │ photo  │                 │  4:5, 112 px wide, ink-toned
│ └────────┘                 │
│ I build the software       │  H1 41 px
│ banks and investors        │
│ actually use.              │
│                            │
│ I'm Ahsan Iftikhar, a      │
│ senior full-stack …        │
│                            │
│ [   Download resume    ]   │  full-width primary
│ Get in touch               │
│                            │
│ Now                        │  ledger rows stack:
│ Senior Software Engineer,  │  label above value
│ Lumida Wealth (remote, US) │
│ ────────────────────────── │
│ In production since        │
│ Apr 2022 (4 yr 6 mo)       │
│ ────────────────────────── │
│ …                          │
│ ══════════════════════════ │
│                            │
│ Selected work              │
│ All 8 projects             │
│ ┌────────────────────────┐ │  one column
│ │ cover                  │ │
│ │ Fintech, AI            │ │
│ │ AI Investment Analysis │ │
│ │ Platform               │ │
│ │ LLM research …         │ │
│ │ React  Flask  OpenAI   │ │  chips wrap, never clip
│ └────────────────────────┘ │
│ …                          │
│                            │
│ Experience                 │
│ Dec 2024 to now            │
│ Senior Software Engineer,  │
│ Lumida Wealth              │
│ 25% better performance …   │
│ ▸ 4 more points            │
│ …                          │
│                            │
│ Skills (label above list)  │
│ Contact (form full-width,  │
│  links below)              │
├────────────────────────────┤
│ footer links stacked       │
└────────────────────────────┘
```

Case study (`/projects/nbp-digital-account-opening`):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ A̲ Ahsan Iftikhar           Work   Experience   Skills   Contact   Resume   ◐ │  "Work" is current
├──────────────────────────────────────────────────────────────────────────────┤
│  All projects                                                                │  plain back link
│                                                                              │
│  Banking                                                                     │  domain tag (tinted)
│  NBP Digital Account Opening                                                 │  H1
│  National Bank of Pakistan, with Paysys Labs                                 │  client line
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────┐            │
│  │ cover (tint + figure), or screenshot when `image` is set     │            │  16:9
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                              │
│  Role            Project lead and front-end lead from inception              │ ┐
│  ──────────────────────────────────────────────────────────────────────────  │ │ same ledger layout
│  Problem         Opening an account at NBP meant a branch visit.             │ │ label 10rem + prose
│  ──────────────────────────────────────────────────────────────────────────  │ │ ≤ 68ch
│  What I built    React front end with MUI 5 and React Query caching;         │ │
│                  Node.js services; Snyk-driven security fixes;               │ │
│                  cross-device compatibility.                                 │ │
│  ──────────────────────────────────────────────────────────────────────────  │ │
│  Impact          Live for NBP customers.                                     │ │
│  ──────────────────────────────────────────────────────────────────────────  │ │
│  Stack           React  React Query  Material UI  Node.js  Oracle SQL  Snyk  │ │ chips
│  ══════════════════════════════════════════════════════════════════════════  │ ┘
│                                                                              │
│  [ Open live site ]                                                          │  only when a link exists; new tab, announced
│                                                                              │
│  Next   National Savings Digital Account Opening                             │  prev / next
├──────────────────────────────────────────────────────────────────────────────┤
│ footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Sitemap and section order

```
/                      Home: hero + account summary → Selected work (4) → Experience (4 roles)
                       → Skills → Contact
/projects              All 8 projects grouped by domain: Banking (6), Fintech (1), AI/SaaS (1)
/projects/:slug        Case study: role, problem, what I built, impact, stack, live link, prev/next
/resume                Web resume: summary, experience with full bullets, education, certificates,
                       skills; "Download PDF" button
/Ahsan_Iftikhar_Resume.pdf   static file in /public
/about                 removed; 301 to /            (Netlify _redirects)
/contact               removed; 301 to /#contact    (Netlify _redirects)
*                      404 page: one line and a link home
```

Nav: Work, Experience, Skills, Contact (anchors on Home; `/#section` from other routes), Resume
(route), theme toggle. Active state: route-based for `/projects*` (Work) and `/resume`; on Home an
IntersectionObserver scroll-spy sets `aria-current` on the section in view.

What happens to `/about`: its bio becomes the hero lead; education and certificates move to
`/resume` and the PDF; the icon grid is dropped (skills section covers it). The route redirects.

Selected work on Home (one per domain plus the largest banking engagement): AI Investment Analysis
Platform (Fintech, AI), NBP Digital Account Opening (Banking, live), Bank Al-Habib Core Banking
(Banking), Qlu.ai (AI/SaaS).

---

## 4. Content changes (old → new)

| Where | Old | New |
|-------|-----|-----|
| Logo | gradient initials "AI" | wordmark "Ahsan Iftikhar" (Bricolage 600) with a mark: "A" over a double rule; the mark alone is the favicon |
| Hero pill | "Senior Software Engineer" | removed; role is the first ledger row |
| H1 | "Hi, I'm Ahsan Iftikhar" | "I build the software banks and investors actually use." |
| H2 | "Building Scalable, AI-Driven Software Solutions" | removed |
| Lead | "Full-Stack Engineer specializing in React, Node.js, Flask, and AI integration." | "I'm Ahsan Iftikhar, a senior full-stack engineer (React, Node.js, Flask, OpenAI). In four years I've shipped digital account opening for a national bank, branch systems used by 300+ offices, and LLM-driven market analysis for US investors." |
| Stats | "5+ Years Experience, 20+ Projects, 10+ Technologies" | removed. Years computed from Apr 2022 at runtime and shown as "Apr 2022 (4 yr 6 mo)" in the ledger; the PDF says "4+ years". No project or technology counts anywhere. |
| CTAs | "View Resume" (route), "Get in Touch" (mailto) | "Download resume" (PDF, primary), "Get in touch" (to #contact) |
| Tech icon row | 6 brand logos | removed |
| Hero featured card | AI Investment Analysis Platform card | removed (Selected work section) |
| "Scroll to explore" | bouncing chevron | removed |
| About bio | "I'm a Senior Software Engineer with experience building scalable, AI-powered applications…" | folded into the lead above |
| Experience | 5–7 long bullets per role | one metric-led line per role, remaining points inside `<details>` (full rewrite in Appendix A) |
| Skills | 9 self-rated % bars + 4 tag cards | 6 grouped rows, no ratings; adds TypeScript and Tailwind CSS; drops "ETL Jobs"/"RESTful Services" phrasing in favour of "ETL jobs"/"REST" |
| Projects | title + paragraph + tags, modal | domain tag, role, problem, what I built, impact, stack, live link (Appendix B); titles normalised: "NBP Digital Account Opening", "National Savings Back Office", "National Savings Call Center Portal", "Bank Al-Habib Core Banking" |
| Domain tags | none | Banking · Fintech · AI/SaaS (rendered as separate chips, never joined with dots); Lumida gets Fintech plus an AI chip |
| Contact header | "Contact Me / Have a project in mind? Let's discuss…" | "Contact" / "For roles, contracts or a quick question. Email is fastest." |
| Contact | self-link to portfoliobyahsan.netlify.app | removed |
| Contact form | Name, Email, Subject, Message (all required), simulated send | Name, Email, Message required; Subject optional; real Netlify submission with inline success/error |
| Footer | 4 columns incl. site self-link and placeholder GitHub/LinkedIn | one row: name, email, GitHub, LinkedIn, Resume (PDF), © year; real links |
| Certificates | 2-column cards with descriptions | compact single lines on /resume and the PDF |
| Titles | one static `<title>` | per route: "Ahsan Iftikhar, senior full-stack engineer", "Work", "<Project> case study", "Resume" |
| README | claims React Router v6, 3D background | rewritten in Phase 5 |

---

## 5. Functionality plan

- **Theme**: `data-theme` on `<html>`; an inline script in `<head>` applies the stored choice before
  paint and defaults to dark when nothing is stored (your instruction; one line to prefer the OS
  setting instead). Tokens as CSS variables mapped into Tailwind with
  `darkMode: ['selector', '[data-theme="dark"]']`. Toggle is a 44-px button whose accessible name
  states the action ("Switch to light theme"); visible on desktop and mobile; `color-scheme` follows.
- **No modal anywhere**: project details are routes. The mobile menu is the only overlay; it traps
  focus, closes on Escape and on route change, and returns focus to the menu button.
- **Contact form**: Netlify Forms. A hidden static `<form name="contact" netlify netlify-honeypot="company">`
  in `index.html` lets Netlify's build-time parser register the form (an SPA form alone is invisible to
  it). The React form keeps react-hook-form validation and posts URL-encoded data to `/` with
  `form-name=contact`. Success: inline `role="status"` confirmation that names what was sent. Error:
  inline message with a retry button and a mailto fallback. Honeypot field hidden from assistive tech.
- **Resume PDF**: committed `public/Ahsan_Iftikhar_Resume.pdf`, generated by `scripts/build-resume.mjs`
  with `@react-pdf/renderer` as a devDependency, from the same `src/data` the site renders
  (`npm run resume:pdf` regenerates). Chosen over build-time generation because the renderer never
  enters the browser bundle, the Netlify build stays deterministic and fast, and the artifact is
  reviewable in git. "Download resume" is a plain `<a download>`; the `window.print()` path is deleted.
- **Favicon and social**: `favicon.svg` (mark, with a `prefers-color-scheme` rule inside the SVG),
  `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`;
  `og.png` 1200×630 with the name, headline and ledger motif. Meta per route via a small
  `useDocumentMeta` hook (title, description, canonical, `og:*`, `twitter:card`); no helmet dependency.
  PNGs are generated by a one-off script and committed.
- **Links**: GitHub `https://github.com/ahsandotexe`, LinkedIn
  `https://www.linkedin.com/in/ahsaniftikhar99/`, email `ahsaniftikhar2016@gmail.com`. External links
  get `rel="noopener noreferrer"` and a visually hidden "(opens in a new tab)".
- **Photo**: re-cropped to 4:5 around head and shoulders, exported at 480 w and 960 w as WebP with a
  JPEG fallback, `width`/`height` set to avoid layout shift, visible at every breakpoint. A monochrome
  ink treatment (CSS grayscale + the surface tint behind it) makes the low-light source read as
  deliberate. One-file swap when a better headshot arrives.
- **Motion**: CSS only. The hero ledger print-in is the single page-load moment (≤ 280 ms). Mobile
  menu, `<details>` and form status animate in response to actions. `prefers-reduced-motion` turns it
  all off. Recommendation: remove framer-motion entirely (42 kB gzip); nothing in the plan needs it.
- **Accessibility floor**: skip link, `<header>/<nav>/<main>/<footer>`, one `<h1>` per page, sequential
  headings, focus moved to `<main>` on route change, 2-px accent focus ring with 2-px offset on every
  control, `scroll-padding-top` equal to the header height, chips that wrap, 44-px targets.
- **Netlify**: `public/_redirects` (`/about / 301`, `/contact /#contact 301`, `/* /index.html 200`);
  `netlify.toml` with build command, publish dir, immutable cache headers for `/assets/*` and fonts,
  and basic security headers.
- **404**: catch-all route with a short line and a link home.

---

## 6. Open questions

1. **Photo.** The only asset is a dim mirror selfie with the phone in frame. I will crop it tight and
   apply the ink treatment so it looks deliberate, but a plain headshot (front camera, daylight,
   neutral wall is enough) would do more for this site than any design decision. Can you supply one?
   If yes, I will leave a one-file swap.
2. **Lumida and attribution.** May I name the Lumida product and link to it (is there a public URL or
   product name)? And please confirm the project-to-employer mapping I inferred from dates and stacks:
   Bank Al-Habib Core Banking at Teresol; NBP and the four National Savings products at Paysys Labs;
   the AI Investment Analysis Platform at Lumida Wealth. Case studies will show the client plus
   "with <employer>".
3. **Screenshots.** The NBP and National Savings account-opening pages are public. Do you want me to
   capture those two as case-study covers now, or wait for screenshots from you? Default: leave the
   cover system in place and capture nothing.
4. **Resume PDF contents.** Phone number: include or omit (none in the brief)? Keep the four
   certificates? Default: no phone, certificates kept as single lines, dates rather than a years
   claim.
5. **Canonical domain.** Stay on `https://portfoliobyahsan.netlify.app` for canonical and `og:url`,
   or is a custom domain planned? Default: the Netlify URL.

Everything else in this plan is a decision with its reasoning stated; push back on any of it.

---

## Appendix A: experience rewrite

**Lumida Wealth, Senior Software Engineer, Dec 2024 to now, New Jersey, USA (remote)**
Lead: 25% better performance and engagement from new React modules.
More: Flask and Firestore APIs that simplified data flow and integrations · OpenAI LLMs wired into
analysis workflows to automate research steps · 15% less technical debt from refactoring legacy code ·
Front-end architecture, UI/UX of key components, and code review.

**Qlu.ai, Full Stack Engineer, Oct to Dec 2024, remote**
Lead: 30% faster loads, 20% faster API responses, 40% fewer bugs reported after launch.
More: Next.js front end with React Query and middleware · Node.js and PostgreSQL services with JWT
authentication · Real-time messaging with Socket.IO · Code review, debugging and release testing on a
cross-functional team. (Cut: "95% project success rate", which reads as unverifiable.)

**Paysys Labs, Software Engineer I, Nov 2022 to Oct 2024, Karachi**
Lead: Reports and ETL for 300+ National Savings branches; 40% faster database performance.
More: React interfaces for NBP and National Savings products (up to 25% more efficient, 30% faster
page loads) · Jasper reports on complex SQL and PL/SQL procedures · JMeter stress tests keeping
response times consistent · Node.js, Express, NestJS and .NET services; React Native apps · Fixes in
core business applications.

**Teresol, Software Engineer, Apr to Oct 2022, Karachi**
Lead: 15% more responsive Vue.js interfaces on Bank Al-Habib's core banking app.
More: JWT authentication and authorization · XState state machines for complex UI state · Close
collaboration with back-end developers; code reviews.

(Each "more" item becomes a list item inside `<details>`; separators above are for this document only.)

## Appendix B: project copy structure (facts from the brief only; no new metrics)

1. **AI Investment Analysis Platform**, Lumida Wealth, 2024 to now. Fintech, AI.
   Role: full-stack engineer, end-to-end modules. Problem: US-equity investors get news, sentiment and
   portfolio data in separate places; turning it into decisions takes analyst time. Built: React front
   end and Flask services on Firestore and Google Cloud; real-time news, AI sentiment and portfolio
   analytics modules; OpenAI LLM workflows combining historical and predictive analysis into research
   summaries. Impact: complex market data arrives as short, forward-looking summaries; 25% better
   performance and engagement from the new React modules (reused from the Lumida role). Stack: React,
   Flask, Firestore, Cloud Storage, Google Cloud, OpenAI. Live: none (question 2).
2. **Qlu.ai**, 2024. AI/SaaS. Role: full-stack engineer. Problem: recruiters build prospect lists by
   hand. Built: Next.js front end (React Query, middleware); Node.js, PostgreSQL and Elasticsearch
   services with JWT; Socket.IO messaging; NLP that reads hiring requirements into candidate lists.
   Impact: candidate lists from large databases in minutes; 30% faster loads, 20% faster APIs, 40%
   fewer post-launch bugs. Stack: Next.js, Node.js, PostgreSQL, Elasticsearch, Socket.IO.
3. **National Savings Suite**, National Savings with Paysys Labs. Banking. Role: front-end and
   Android lead; reporting. Problem: 300+ branches needed one system for information, transactions,
   products and savings tracking. Built: React front end; React Native Android app; Jasper reports on
   complex SQL and PL/SQL; core-app bug fixes; Spring Boot, Oracle SQL and Redis backend (team).
   Impact: in use across 300+ branches nationwide. Stack: React, React Native, Java, Spring Boot,
   Oracle SQL, Redis, Jasper Reports.
4. **NBP Digital Account Opening**, National Bank of Pakistan with Paysys Labs. Banking. Role: project
   lead and front-end lead from inception. Problem: opening an NBP account meant a branch visit.
   Built: React with MUI 5 and React Query caching; Node.js services; Snyk-driven security fixes;
   cross-device compatibility. Impact: live for NBP customers. Stack: React, React Query, Material UI,
   Node.js, Oracle SQL, Snyk. Live: newaccount.nbp.com.pk.
5. **National Savings Digital Account Opening**. Banking. Role: backend design and front-end lead.
   Problem: onboard customers without a branch visit, securely. Built: Node.js and Express backend;
   React front end; features with cross-functional teams. Impact: live. Stack: React, Node.js,
   Express, SQL. Live: account.nationalsavings.digital.
6. **National Savings Back Office**. Banking. Role: UI and business logic; .NET services. Problem:
   staff needed to process onboarding requests with strong account controls. Built: React UI and
   business logic; .NET and SQL services; device-blocking security. Impact: request management and
   account controls for the onboarding programme. Stack: React, .NET, SQL.
7. **National Savings Call Center Portal**. Banking. Role: front-end lead; cross-team coordination.
   Problem: agents needed a customer's KYC details and lock status without the mobile app. Built:
   React portal over Node.js services. Impact: agents resolve KYC and lock queries from one screen.
   Stack: React, Node.js, SQL.
8. **Bank Al-Habib Core Banking**, Bank Al-Habib with Teresol, 2022. Banking. Role: front-end engineer
   (Vue.js). Problem: an ageing core banking app spanning accounts, transactions, loans, CRM, teller
   and cash management, KYC and financial analysis. Built: Vue.js front end with JWT security and
   XState state machines; Quarkus and SQL backend (team). Impact: overhaul improved UX and
   performance; 15% more responsive interfaces. Stack: Vue.js, XState, JWT, Java, Quarkus, SQL.

## Appendix C: phase outline after approval

- Phase 2: tokens, Tailwind mapping, theme script and toggle, fonts, type scale, favicon/OG/meta,
  dead-code and dependency removal, data files, Netlify files. Commit.
- Phase 3: Nav (+ mobile menu), Ledger, ProjectCover/ProjectCard, ExperienceList, SkillsGroups,
  ContactForm (Netlify), ResumePage, PDF script and committed PDF. Commit.
- Phase 4: Home, Projects index, CaseStudy, Resume, 404; routing, per-route meta, focus on route
  change, scroll-spy; photo pipeline. Commit.
- Phase 5: responsive and keyboard QA, programmatic contrast check, bundle before/after, checklist and
  "remove one accessory" pass, README, final summary. Commit.
