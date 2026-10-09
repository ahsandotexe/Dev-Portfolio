# Ahsan Portfolio — Design System (MASTER)

Source of truth for the build. Locked on 2026-10-09 from the owner's own Claude Design project
"Lumida palette three concepts", file `Concept 2 - Interactive Editorial.dc.html` (a local copy of the
imported project lives in `design-import/`). Where this file and the imported prototype differ, this
file wins; the differences are listed at the end. Supersedes the earlier "Ledger" direction.

## Direction: "Interactive Editorial"

A digital magazine about one engineer. Type is the imagery; whitespace is the layout; motion is masking
and sliding, never bouncing. The page reads as expensive, art-directed and calm, while the content stays
unmistakably technical: metrics, stacks, problems and solutions.

Boldness is spent in one place: the hero's four masked lines of uppercase Space Grotesk at up to 190px,
the last line in red, over a dot grid that displaces around the cursor. Everything else is rules, columns
and restraint. Red appears once per screen.

## Color tokens

Tokens are RGB triplets on `:root` (light, the default) and `[data-theme="dark"]`, consumed as
`rgb(var(--x) / <alpha>)`. Light is the canonical theme because the design is paper-first; dark inverts
paper and ink so the inverted "Currently" band and the mobile menu invert with it.

| Token      | Light (`:root`) | Dark (`[data-theme="dark"]`) | Role                                                     |
|------------|-----------------|------------------------------|----------------------------------------------------------|
| `--paper`  | `#F9F9F9`       | `#0A162D`                    | page ground                                              |
| `--ink`    | `#0A162D`       | `#F9F9F9`                    | text, rules (at alpha), inverted band ground             |
| `--accent` | `#CC3A48`       | `#E8606D`                    | one red word per screen, hover colour, active menu item  |
| `--plate`  | `#E5E7EB`       | `#16233D`                    | portrait plate, image fallback, input fill on focus      |
| `--doc`    | `#FFFFFF`       | `#FFFFFF`                    | resume paper preview (always white; text uses `--doc-ink`)|
| `--doc-ink`| `#0A162D`       | `#0A162D`                    | text on the paper preview                                |

Derived usage (no extra tokens): secondary text `ink/65`, small mono labels `ink/65`, rules `ink/12`
and `ink/15`, dot grid `ink/55`, scrim on image plates `ink` 0 → 92%.

Verified contrast (programmatic, Phase 5 re-checks):
- ink on paper 16.5:1 both themes.
- ink/65 on paper ≈ 5.9:1 light, ≈ 6.3:1 dark (passes AA for 11px mono labels).
- accent on paper: light `#CC3A48` 4.7:1, dark `#E8606D` 5.5:1 (passes AA at any size). The prototype's
  `#DC4453` was 3.9:1 on paper, which fails for the 13–14px hover and label uses, so the light accent is
  darkened by one step; display sizes keep the same hue.
- paper on ink (inverted band, buttons) 16.5:1.

## Typography

- Display: **Space Grotesk** 500 (variable, self-hosted via `@fontsource-variable/space-grotesk`).
  - Hero: `clamp(80px, 11.5vw, 190px)` desktop, `15vw` mobile; uppercase; tracking −0.05em; line-height 0.92.
  - H1: `clamp(56px, 7vw, 112px)` / 44px mobile; tracking −0.05em; line-height 0.95.
  - H2: `clamp(36px, 4.2vw, 64px)` / 34px mobile; tracking −0.04em; line-height 1.
  - Project titles: `clamp(48px, 5.6vw, 88px)` / 44px; list titles `clamp(28px, 3.4vw, 52px)` / 28px.
  - Company names: `clamp(44px, 6vw, 96px)` / 40px; tracking −0.045em.
  - Lead paragraphs: `clamp(22px, 2.2vw, 32px)` / 22px; line-height 1.25; tracking −0.02em.
  - Skills running text: 22px / 18px.
- Body and UI: **Inter** 400/500 (variable). 15–16px / 1.55; 13–14px for meta; 12px footer.
- Labels, indices, dates: **JetBrains Mono** 400/500 (variable). 10–11px. Uppercase only where the
  prototype uses it (Responsibilities / Achievements / Technologies, Problem / Solution / Role / Impact /
  Stack, resume blocks).
- Fallbacks: `"Space Grotesk Variable", "Helvetica Neue", Arial, sans-serif`;
  `"Inter Variable", system-ui, "Segoe UI", Roboto, sans-serif`;
  `"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, monospace`.
- `font-display: swap`; Latin subset only; fonts preloaded by Vite's CSS import.

## Spacing, layout, rules

- Corner padding: 32px 40px desktop, 20px 24px mobile. Page top: 160px desktop, 110px mobile.
- Section padding: 112px 40px desktop, 64px 24px mobile. Footer 24px.
- Label column: 220px (desktop two-column grid `220px 1fr`); single column below 820px.
- Rules instead of boxes: 1px `ink/12` between rows, `ink/15` under section heads, solid `ink` above
  resume blocks. No cards, no shadows except the paper preview (`0 2px 20px rgba(0,0,0,.06)`).
- Radius: 0 everywhere. Buttons are text with a 1px underline, or a solid ink block 52px tall.
- Breakpoint: 820px switches desktop/mobile layout (matches the prototype). Verified at 375, 768, 1024, 1440.
- Max frame width 1680px, centred.

## Navigation

- Header fixed top, `mix-blend-mode: difference` in white so it survives the inverted band. Left: name
  and "Software Engineer, Karachi". Right: numbered items 01–06 with a 1px underline that scales in from
  the left on the active route; 06 is "Contact" and opens the sheet. A text theme toggle ("Dark"/"Light")
  sits after Contact in the same style.
- Desktop rail, fixed right: page ordinal (28px Space Grotesk) that masks in on route change, a 140px
  vertical scroll-progress line, and a vertical mono label "Home / 05".
- Mobile: "Menu" opens a full-screen ink panel with 52px masked type; active item in accent; "Get in
  touch" pinned at the bottom; focus trapped; Escape closes; theme toggle in the panel footer.
- Skip link to `#main` as the first focusable element.

## Motion (Framer Motion in production)

1. Route change: `main` cross-fades 500ms; the ordinal masks in (`y: 110% → 0`, 600ms, ease `[.22,1,.36,1]`).
2. Hero (the one orchestrated moment): four lines mask up over 900ms, staggered 110ms from 200ms; the
   lede and links fade at 900ms; the dot grid displaces around the cursor with a slow sine wobble.
3. Reveals: `whileInView` rise of 16px, 400ms, once, on the work list rows and the experience detail.
   Nothing else animates on scroll.
4. Micro: colour to accent on hover (the only hover colour), underline `scaleX` 400ms, spread image
   `scale(1.01)` 600ms, selected company row shifts 16px, spreads slide in 40px over 600ms, menu type masks in.
5. `prefers-reduced-motion`: all of the above become instant; the dot grid draws one static frame.

## Components

`AppShell` (SkipLink, CornerNav, PageRail, MobileTypeMenu, ContactSheet, Footer) ·
`Home` (TypeHero + DotGrid, WorkList, CurrentlyBand, ContactCloser) · `About` (Profile with Portrait,
Philosophy, SkillRows, OffTheClock) · `Experience` (NameList + RoleDetail) · `Projects` (Spread +
SpreadNav, routed as `/projects/:slug`) · `Resume` (Download, SummaryBlocks, DocumentPreview) ·
`NotFound` · shared `MaskedLines`, `Meta`, `useTheme`, `useFocusTrap`.

## Accessibility floor

Ink on paper 16.5:1; accent passes AA as text in both themes; difference-blend header checked over both
grounds; every interactive element is a real `<a>` or `<button>` with a visible 2px accent focus ring;
menu and sheet trap focus and close on Escape; images carry alt text; the canvas is `aria-hidden`.

## Deviations from the imported prototype (deliberate)

- Light accent darkened `#DC4453 → #CC3A48` for AA at small sizes; dark accent `#E8606D`.
- Dark theme added (the prototype is light-only) with a toggle; light stays the default.
- Dot grid is a 2D canvas (as in the prototype's script), not R3F; no three.js in the bundle. The footer
  credit drops "R3F".
- Ten project spreads instead of six: the owner's six plus Lumida AI, National Savings Suite, Bank
  Al-Habib and Qlu.ai, so every project on the current site survives (as instructed).
- Contact sheet posts to Netlify Forms with a honeypot and explicit success/error states.
- "Full case study" button on spreads removed: the spread is the case study.
- Spread columns share their top and bottom edges: the text column pins the title block to the top and
  the details to the bottom, and the image plate fills the row height (min 560px) instead of a fixed
  4:5. On desktop the whole illustration is shown (contain) over a blurred copy of itself, so edges are
  never cropped; phones get a 4:5 plate that fits the illustration exactly.
