# Direction review (Step 4)

Five working mockups, same content, same job. Open `mockups/index.html` for the gallery. Each file
starts with a comment block naming the concept, tokens, type, what makes it not a template, and how the
motion maps to Framer Motion. All five passed a programmatic WCAG AA check on every text and control
pair in both themes, and each was screenshotted at 1440 and 375 in both themes and corrected once.

## What was cut after the screenshot pass ("remove one accessory")

- 01 Status: the pulsing green dot in the header (the board rows already carry the status language).
- 02 Profile: the italic dateline above the headline (the byline and contact already say where he is).
- 03 Blueprint: the "01 of 08" part numbers on the cards (the projects are not a sequence).
- 04 Form: the second "Correspond" button under the applicant section (nav and section 5 cover it).
- 05 Poster: the "PDF, one page" line inside the crimson cell (the button text is enough).

Also fixed from the screenshots: a shared `clamp()` syntax error that silently shrank every headline;
the Status board squeezing its status column at 375; the Profile margin notes not aligning with their
items (now a subgrid row per item); the Blueprint schematic forcing horizontal page scroll at 375; the
Form comb field splitting a word across lines; the Poster's muted text failing contrast on inverted tiles.

## Matrix

Scores are 1 (weak) to 5 (strong). Cost is 1 (cheap) to 5 (expensive).

| Concept | 30-second recruiter test | Distinctiveness | Senior, professional read | Cost in React + Tailwind | Accessibility risk | Survives real screenshots |
|---|---|---|---|---|---|---|
| 01 Status page | 5. Name, headline, resume button and eight systems with status in the first screen. | 3. Specific as an idea, quiet as a look; could be mistaken for a docs site. | 5. Reads like someone who runs production. | 1. Rows, panels, `<details>`; a timer. | Low. Native disclosure, rules, no hover dependence. | 3. No image slot on the board; screenshots live inside the expanded case study only. |
| 02 Magazine profile | 4. Headline and standfirst are strong; the resume button sits in the byline, which is lower than the others. | 4. Serif marginalia is rare on engineering portfolios. | 5. Authority by association with a profile piece. | 3. Subgrid rows, two optical-size serifs, margin collapse at 900. | Low to medium. Italic links and a drop cap need care; contrast verified. | 4. Editorial layouts carry images well as figures with captions in the main column. |
| 03 Blueprint | 4. The drawing pulls the eye; the resume button is right above it. | 5. Nobody draws their systems as a schematic. | 4. Technical and confident, slightly themed. | 4. SVG schematic with draw-on and hover state, drafting grid, title block. | Medium. The diagram needs its text alternative (present) and keyboard focus (present); cobalt background limits palette for third-party embeds. | 2. Full-colour screenshots fight the cobalt sheet; they would need a duotone treatment or a framed "figure" convention. |
| 04 Account-opening form | 4. Name, position, statement and resume button inside section 1; proof is section 2. | 5. The only direction nobody else's portfolio uses, and the most specific to his domain. | 3. Restrained execution keeps it credible, but some readers will read a form as a conceit. | 3. Typing sequence, comb cells, stamp, tables, checkbox grid. | Medium. Decorative checkboxes and comb cells must stay out of the accessibility tree (they do); the employment table is dense at 375. | 4. Screenshots become labelled attachments, which the form grammar already expects. |
| 05 Swiss poster | 4. Headline, two figures and a crimson resume cell in one frame. | 4. Swiss poster is a known style but rare for engineers; the figures-as-hero is the specific part. | 4. Precision and nothing decorative. | 2. CSS grid, one variable font, clip-path wipes, colour inversion. | Low to medium. Large inverted hover states and a crimson at 4.96:1 (keep it for blocks, not body text). | 5. Poster grids are built for images; any tile becomes a photo tile without redesign. |

## Recommendation

**Pick: 05 Swiss poster.** It does the recruiter job in one frame (headline, proof figures, resume), it
is the direction most likely to feel modern and alive once Framer Motion drives the grid wipes and the
tile inversions, it is the cheapest of the five to build well in Tailwind, and it survives the arrival
of real screenshots better than any other: a tile is a tile. Its distinctiveness comes from the content
(the figures and the expanded type) rather than from a conceit, which is what keeps it senior. It is also
the least "fintech default" of the five, which is what the Tape rejection was about.

**Runner-up: 04 Account-opening form.** The most memorable and the most domain-specific, with the best
single motion moment (comb field, then stamp). It loses to the poster only on the professional-read
axis: a form is a conceit, and a minority of readers will see it as one. If being remembered matters more
than being safe, choose this one.

**Borrow into the pick:**
- From 01 Status: the status language on project tiles ("live, public", "live, internal", "delivered")
  and a verified link where one exists. It is cheap proof.
- From 02 Profile: marginalia on the case-study page. Role, stack and impact in a margin column beside
  the prose, which also solves "no screenshots yet" on those pages.
- From 03 Blueprint: a small self-drawing schematic as the hero of each case-study page. Real
  architecture per project is the most senior thing on the site and works as a tile cover too.
- From 04 Form: the "attachments" idea for the projects index: each project as an exhibit with a
  verification status.

**What changes if you choose 04 instead:** keep the poster's figure tiles as the hero of the projects
index, so the form stays the home page's voice without becoming the whole site.

## Open questions

1. **Default theme.** Both the pick and the runner-up are light-first by nature (white paper, white
   sheet). Your Phase 2 instruction says dark default. Keep dark as the default with the light version
   as the designed one, or let these two be light-first with a full dark mode? The build differs.
2. **Content source for the build.** This exploration used the brief's eight projects and four roles, as
   instructed. The updated resume adds five Lumida-era products (Trade Sheet, Sales Intelligence
   Platform, Lumida Invest, Lumida Second Opinion, ResumeGrade), names the AI platform "Lumida AI",
   adds a Medicon role from August 2021, and changes the Paysys and Teresol dates. Confirm the build
   merges those in and keeps the old eight. Also confirm whether Qlu.ai stays as a separate role in
   experience; the resume omits it and its dates overlap Paysys Labs.
3. **Photo.** The mockups use a tight crop of the existing photo. In the poster it is a full tile and in
   the form it is the ID photograph, so a proper headshot changes those two more than the others. If none
   is coming, I will replace the tile with a type cell in the poster and keep the form's photograph box.
