# Direction exploration (Steps 1 and 2)

Scope: five genuinely different directions for the same job (a recruiter or engineering lead knows who
Ahsan is, sees proof, and finds resume or contact within 30 seconds). Content is the brief's: the real
name, the eight projects, the four roles, the real skills. Nothing in `src/` is touched.

## Step 1a. What the research returned

`--design-system` seeds (markdown output saved in the session scratchpad):

| Seed | Pattern | Style | Palette it proposed | Verdict |
|---|---|---|---|---|
| developer portfolio | FAQ/Documentation Landing | Dark Mode (OLED) | slate `#0F172A` + `#1E293B` | the current site; default |
| fintech banking trust | Trust & Authority + Conversion | Minimalism & Swiss | `#0F172A` + amber `#F59E0B` | the rejected Tape palette |
| AI platform product | Product Demo + Features | AI-Native UI | violet `#7C3AED` on `#FAF5FF` | purple-for-AI cliché |
| editorial magazine | Scroll-Triggered Storytelling | Swiss Modernism 2.0 | zinc `#18181B` on `#FAFAFA` | usable structure, dead palette |
| developer tool IDE | FAQ/Documentation Landing | Dark Mode (OLED) | slate | same as portfolio |
| data analytics dashboard | Enterprise Gateway | Data-Dense Dashboard | blue `#1E40AF` on `#F8FAFC` | B2B template |
| swiss minimal agency | Hero + Features + CTA | Minimalism & Swiss | `#171717` on white | default minimal |

`--domain style` (12 queries): Brutalism (primary red/blue/yellow, 0 radius, instant transitions);
Bento Box Grid (Apple tiles, 16–24 px radius, hover scale); Editorial Grid / Magazine (asymmetric grid,
pull quotes, drop caps); Exaggerated Minimalism (oversized type, one accent); Minimalism & Swiss (grid,
sans, no shadows); Neumorphism (soft shadows, pastel, dark "conditional"); E-Ink / Paper (matte, no
motion, monochrome); Kinetic Typography (split text, variable fonts, text as the visual); Cyberpunk /
terminal (neon on `#0D0D0D`, glitch); Bauhaus (primary colours, hard shadows); Dimensional Layering
(elevation levels); Material 3 Expressive; Claymorphism; Y2K; Gen Z Chaos.

`--domain typography` (9 moods): Playfair/Inter and Playfair/Source Serif 4 (editorial); Space Mono
(brutalist); Space Grotesk kinetic uppercase; Nunito/DM Sans and Varela Round (rounded); JetBrains Mono
single-stack (terminal); Fira Code/Fira Sans (dashboard); Inter single-stack (Swiss); Cormorant/Montserrat
(luxury); Abril Fatface/Merriweather (retro); Barlow Condensed/Barlow (poster); Outfit (Bauhaus).

Read against frontend-design: every seed converged on slate-900 dark mode or zinc-on-white, Inter or
Space Grotesk, and a card grid. The style rows are more useful as a list of layout systems and motion
vocabularies than as palettes. The typography rows are the dataset's defaults for each mood, so they
were treated as the thing to move away from, not toward.

## Step 1b. Fourteen concepts, one line each

Format: name. Memorable element. Layout system. Type personality. Palette family. Domain cue.

1. **Status page.** A live "all systems in production" board listing his real systems with status and a
   ticking "checked n s ago". Single-column panels. Legibility-first sans plus mono stamps. Neutral grey
   with semantic green and amber. Engineering ops: production reliability.
2. **Magazine profile.** A feature article about him, with metrics and stacks as marginalia and a drop
   cap. Asymmetric editorial grid with a margin column. Soft display serif plus a text serif. Cool paper
   and burgundy. Journalism: the profile piece.
3. **Blueprint.** His real system architectures drawn as a schematic that draws itself; nodes are the
   projects. Full-bleed drafting grid, title block. DIN-like semi-condensed sans plus a mono for
   annotations. Blueprint cobalt and white. Engineering craft: the drawing.
4. **Account-opening form.** The home page is a filled-in bank form with comb fields and an approval
   stamp. Document sheet on a desk, numbered sections. Government-form sans plus typewriter values.
   Form paper, print black, ballpoint blue. Banking: his own product category.
5. **Swiss poster.** Headline and proof figures set as an expanded-grotesk poster locked to a modular
   grid; tiles invert on hover. 8-column poster grid, cropped type. One wide grotesk at two widths.
   White, black, crimson. Engineering precision as graphic design.
6. **Passbook.** A savings passbook whose entries print line by line (dot-matrix) as the career.
   Two-page book spread. Dot-matrix mono plus humanist sans. Bottle green cover, cool page.
   Banking: National Savings.
7. **State machine.** Navigation is a visible state chart; the current section is the active state and
   transitions animate along edges. Canvas plus side panel. Mono labels. Graph-paper neutrals. Engineering:
   XState in his stack.
8. **Two clocks.** Hero shows Karachi and New Jersey time with the overlap window; the site's palette
   shifts with Karachi's daylight. Centered stack. Humanist sans. Dawn and dusk tints. Remote work.
9. **Bilingual wordmark.** His name set in Nastaliq as the mark, with a bilingual hero. Monumental
   centered wordmark. Nastaliq plus grotesk. Sea teal and marigold. Karachi.
10. **Terminal REPL.** The page is a shell session typing out his resume. Single column. All mono.
    Dark plus one phosphor colour. Developer tools.
11. **Bento.** Mixed-size tiles: photo, map, stats, projects. Modular tile grid. Rounded sans. Neutral
    plus brand accent. None (generic product marketing).
12. **Datasheet.** The person as a component datasheet with a pinout of skills. Dense tables. Condensed
    plus mono. Grey. Electronics engineering.
13. **Index cards.** Projects as tabbed catalogue cards sliding out of a drawer by domain. Card catalogue.
    Typewriter mono plus grotesk. Manila and red tab. Archives.
14. **Phone frames.** Hero is a phone running an account-opening flow stepping through KYC to approved;
    project covers are device frames. Device-frame marketing layout. Product-UI sans. Neutral plus brand
    blue. His banking products.

## Step 1c. Genericness and tell filter

- Cut 10 (terminal): the single most common developer-portfolio conceit; the dataset's "Cyberpunk /
  terminal" row is neon-on-near-black, which is also a listed tell.
- Cut 11 (bento): would be produced for any product or person; identical-rounded-card kit is a tell.
- Cut 8 (two clocks): the palette shift is gradient-wash decoration; the clocks survive as a detail in
  other concepts (contact section).
- Cut 9 (bilingual): distinctive, but it brands a person by origin rather than by work, and the brief asks
  for technical and not gimmicky. Kept as a possible mark (Urdu initial) if the owner wants it later.
- Cut 12 (datasheet): witty, but "resume as man page" is a known developer joke; reads as a gimmick.
- Cut 13 (index cards): manila plus typewriter sits one step from the cream-plus-serif tell, and it
  duplicates the document idea of 4 with less specificity.
- Cut 14 (phone frames): device-frame marketing is a SaaS template; the screens would be invented UI.
- Merge 7 (state machine) into 3 (blueprint): same vernacular, the diagram carries it.
- Cut 6 (passbook): strongest of the paper ideas, but it is the same ruled-row document idea as 4, and
  the earlier "Ledger" mockup already showed the owner that a paper object reads as still.
- Banned by instruction and confirmed absent from the remaining five: the Tape concept (navy, one warm
  accent, ticker or chart) and the current cyan-to-emerald glassmorphism. Also absent: cream plus serif
  plus terracotta, near-black plus acid accent, identical rounded cards, all-caps eyebrows, middle-dot
  meta strings, arrows on buttons, fade-up on every section, gradient washes.

Survivors: 1, 2, 3, 4, 5. No two share a layout system (panel list; editorial columns with margin;
drafting canvas; document sheet; poster grid), a type personality (legibility sans plus mono; soft serif
pair; DIN-like sans plus mono; form sans plus typewriter; one wide grotesk), or a palette family (neutral
plus semantic; cool paper plus burgundy; cobalt monochrome; paper, print black and ballpoint blue; white,
black and crimson). Risk spread: 1 quiet, 2 restrained, 3 and 5 middle, 4 the real risk.

## Step 2. Five design plans

Shared copy across all five, so the comparison is about design: headline "I build the software banks
and investors actually use."; lead "Senior full-stack engineer (React, Node.js, Flask, OpenAI). Since
2022 I've shipped digital account opening for a national bank, branch systems used by 300+ offices, and
LLM-driven market analysis for US investors."; the eight projects with domain tags (Banking, Fintech,
AI/SaaS), role, one-line impact and stack; the four roles with the brief's dates and metrics; grouped
skills with TypeScript and Tailwind CSS added; contact with the real email, GitHub and LinkedIn.

### 01 Status page ("In production")

- Tokens, dark: bg `#17191C`, surface `#1F2226`, text `#E9EBEE`, muted `#9AA1AB`, rule `#2C3137`,
  live `#3DBB7E`, delivered `#E0A33A`.
- Tokens, light: bg `#F4F5F7`, surface `#FFFFFF`, text `#17191C`, muted `#5A6370`, rule `#DCE0E5`,
  live `#15754B`, delivered `#8A5A05`.
- Type: Atkinson Hyperlegible (all text; designed for legibility, which is what a status page values),
  fallback `"Atkinson Hyperlegible", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`; IBM Plex Mono for
  timestamps and ids, fallback `"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`.
- Layout: one column, max 64rem, left-aligned. Panels have a 1px rule and 8px radius; rows inside are
  separated by rules; nothing else is boxed.
- Memorable element: the production board. Eight real systems, each with a status (live and public, live
  and internal, delivered), the role in one line, and a disclosure that opens the case study in place.
  The board header ticks "checked n s ago".
- Motion: on load each row reads "checking" with a pulsing dot, then flips to its status with a small
  pop, 50 ms apart (done in about 600 ms). After that only actions move: rows expand with a height
  transition, the tick updates, hover highlights. Framer Motion: `staggerChildren` on the board,
  `AnimatePresence` + `layout` for the expansion.
- Why it fits: a senior engineer whose proof is "it is in production at a bank" presents like an ops
  page, not a landing page. The quietest of the five; it trusts the facts.
- Made less generic by: replacing the hero-plus-cards structure with a board the recruiter can scan in
  one pass; using Atkinson rather than Inter; semantic colour only (no brand accent at all).

```
Desktop                                                Mobile
┌──────────────────────────────────────────────┐       ┌──────────────────┐
│ ● Ahsan Iftikhar   Work Experience Skills … ◐ │       │ ● Ahsan Iftikhar ≡│
├──────────────────────────────────────────────┤       ├──────────────────┤
│ I build the software banks and investors     │       │ I build the …    │
│ actually use.                        [photo] │       │ [photo]          │
│ lead …                                       │       │ lead …           │
│ [Download resume]  Email                     │       │ [Download resume]│
│ ┌ Production systems · checked 4 s ago ─────┐│       │ ┌ Production ──┐ │
│ │ ● NBP Digital Account Opening  Banking    ││       │ │● NBP DAO     │ │
│ │   Front-end lead from inception  Live ▸   ││       │ │  Live, public│ │
│ │ ● National Savings DAO …                  ││       │ │● NS DAO      │ │
│ │ … 8 rows                                  ││       │ │ …            │ │
│ └───────────────────────────────────────────┘│       │ └──────────────┘ │
│ History   Dec 2024  Senior SE, Lumida …      │       │ History          │
│ Components  Languages: …                     │       │ Components       │
│ Send a message  [form]       email, GitHub   │       │ Send a message   │
└──────────────────────────────────────────────┘       └──────────────────┘
```

### 02 Magazine profile ("Marginalia")

- Tokens, light: paper `#F5F6F8`, surface `#FFFFFF`, ink `#1C1D21`, muted `#5E616A`, rule `#D9DBE0`,
  burgundy `#7D1E2E`.
- Tokens, dark: bg `#1E1B20`, surface `#272329`, text `#ECE8E1`, muted `#A69F98`, rule `#37323A`,
  rose `#E3A3AC`.
- Type: Fraunces (display, drop cap, pull quote; soft optical sizes), fallback `Fraunces, Georgia,
  "Times New Roman", serif`; Newsreader (text, captions, UI), fallback `Newsreader, Georgia, serif`.
- Layout: editorial grid. Main column 60–68ch with a margin column on the right for notes; the margin
  collapses under each item on mobile. Masthead with a double rule. No cards.
- Memorable element: marginalia. Role, stack, impact and dates live in the margin beside each item like
  footnotes, so the main column reads as prose and the proof reads at a glance.
- Motion: one moment, the headline sets itself (each word settles from a slight blur and offset over
  600 ms). Then only actions: a burgundy rule slides in beside the item under the cursor; details expand.
  Framer Motion: word-level `variants` with `staggerChildren`; `whileHover` on items.
- Why it fits: a profile written about a senior engineer reads as authority; marginalia is how serious
  publications carry numbers without charts.
- Made less generic by: cool paper and burgundy instead of cream and terracotta; Fraunces and Newsreader
  instead of Playfair and Inter; margin notes instead of tag chips; no cards.

```
Desktop                                                Mobile
┌──────────────────────────────────────────────┐       ┌──────────────────┐
│ Ahsan Iftikhar        Work Experience … ◐    │       │ Ahsan Iftikhar  ≡│
│══════════════════════════════════════════════│       │══════════════════│
│ Karachi, remote for New Jersey               │       │ I build the      │
│ I build the software banks and    │ margin   │       │ software banks … │
│ investors actually use.           │          │       │ standfirst …     │
│ standfirst …                      │          │       │ [photo] Resume   │
│ [photo] Senior … · Resume Contact │          │       │ Selected work    │
│ ─────────────────────────────────────────────│       │ NBP Digital …    │
│ S elected work                    │ Role     │       │ deck …           │
│ NBP Digital Account Opening       │ Stack    │       │ Role: …          │
│ deck …                            │ Live     │       │ Stack: …         │
│ …                                 │          │       │ …                │
│ Experience …                      │ dates    │       │ Experience …     │
│ Skills …                          │          │       │ Skills …         │
│ Write to me [form]                │ links    │       │ Write to me      │
└──────────────────────────────────────────────┘       └──────────────────┘
```

### 03 Blueprint ("Sheet 1")

- Tokens, dark: bg `#163F73`, surface `#1E4C86`, text `#EAF2FF`, muted `#B7CCE8`, line `#8FB4E6`,
  grid `rgba(255,255,255,.10)`.
- Tokens, light: bg `#F3F6FB`, surface `#FFFFFF`, text `#0F2A4F`, muted `#4A617F`, line `#2457A6`,
  grid `rgba(31,78,154,.12)`.
- Type: Barlow Semi Condensed (headings; a DIN-like face, which is the lettering standard of engineering
  drawings), fallback `"Barlow Semi Condensed", "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;
  Barlow (body); Martian Mono (annotations, dimensions), fallback `"Martian Mono", ui-monospace, Menlo,
  monospace`.
- Layout: full-bleed drafting grid (minor lines every 8 px, major every 64 px). Content left-aligned on
  the grid; a title block in the footer corner. The hero is the drawing.
- Memorable element: a schematic of three of his real architectures (NBP account opening, the Lumida
  platform, Qlu.ai) drawn as boxes and connectors with mono annotations; hovering a box highlights its
  connections and names the project.
- Motion: one moment, the schematic draws itself (stroke-dashoffset, 1.2 s) and the annotations appear as
  each box completes. Then only actions: hover highlights edges; details expand. Framer Motion:
  `motion.path` with `pathLength`, `whileHover` on groups.
- Why it fits: it shows the thing a senior full-stack engineer is actually hired for, the shape of the
  system, before any copy.
- Made less generic by: cobalt-on-cobalt instead of navy-plus-accent; DIN-like type instead of a geometric
  tech sans; a drawing instead of a hero illustration; no accent colour at all (white is the action colour).

```
Desktop                                                Mobile
┌┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┐       ┌┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┐
│ Ahsan Iftikhar       Work Experience … ◐    │       │ Ahsan Iftikhar ≡│
│ I build the software banks and investors    │       │ I build the …   │
│ actually use.                               │       │ lead …          │
│ lead …  [Download resume] Get in touch      │       │ [Download resume]│
│ ┌React┐──┌Node API┐──┌Oracle┐   NBP DAO     │       │ ┌React┐         │
│ ┌React┐──┌Flask┐──┌Firestore┐──┌OpenAI┐     │       │   │             │
│ ┌Next.js┐──┌Node┐──┌Postgres┐ ┌Elastic┐     │       │ ┌Node API┐      │
│ (annotations in mono beside each edge)      │       │   │  (stacked)  │
│ Selected work   [cards with mono dimension  │       │ ┌Oracle┐        │
│                  labels and a tiny schematic]│       │ Selected work   │
│ Experience (table with rev column)          │       │ …               │
│ Skills (grouped)   Contact (form)           │       │ Contact         │
│                       ┌ title block ───────┐│       │ ┌ title block ┐ │
└───────────────────────┴────────────────────┴┘       └─────────────────┘
```

### 04 Account-opening form ("Application")

- Tokens, light: desk `#E6E8EC`, sheet `#FFFFFF`, ink `#1E2126`, muted `#5C626B`, field `#7C838D`,
  pen `#1A4BB5`.
- Tokens, dark: desk `#15181D`, sheet `#22262C`, ink `#E8EAEE`, muted `#A0A7B1`, field `#6B7380`,
  pen `#8FB4FF`.
- Type: Public Sans (labels, headings; the US government forms face), fallback `"Public Sans",
  "Segoe UI", Helvetica, Arial, sans-serif`; Courier Prime (the typed-in values), fallback `"Courier
  Prime", "Courier New", Courier, monospace`.
- Layout: a document sheet (max 52rem) on a desk, numbered sections (forms are a real sequence),
  labels above boxed fields, comb fields for the name, a table for employment, a checkbox grid for skills,
  a signature line for contact. Mobile: the sheet goes edge to edge.
- Memorable element: the comb field. His name typed letter by letter into character boxes, then the
  stamp. The whole page is the artifact his banking products produce.
- Motion: one moment, the fields type in (60 ms per character on the comb field, instant for long
  values) and the stamp lands with a short scale-and-rotate settle. Then only actions: checkbox and field
  focus states; sections expand. Framer Motion: `useAnimate` sequence for typing and stamp; `layout` for
  sections.
- Why it fits: he built digital account opening for a national bank; presenting as the form is the most
  specific proof of domain fluency available, and the form grammar (sections, declarations, signature)
  maps exactly onto a resume.
- Made less generic by: it is the one direction nobody else's portfolio uses; ballpoint blue instead of a
  brand accent; a stamp instead of a hero image; sentence case everywhere except the stamp face.

```
Desktop                                                Mobile
┌──────────────────────────────────────────────┐       ┌──────────────────┐
│ Ahsan Iftikhar       Work Experience … ◐     │       │ Ahsan Iftikhar  ≡│
│   ┌────────────── sheet ───────────────┐     │       │┌──── sheet ─────┐│
│   │ Application for senior engineering │     │       ││ Application …  ││
│   │ 1 Applicant                        │     │       ││ 1 Applicant    ││
│   │ Name [A][H][S][A][N] [I][F][T]…    │     │       ││ [A][H][S][A][N]││
│   │ Title ______ Location ______ [photo]│    │       ││ Title ________ ││
│   │ Statement: I build the software …  │     │       ││ Statement …    ││
│   │ 2 Proof of work (attachments)      │     │       ││ 2 Proof of work││
│   │ ☑ NBP Digital Account Opening  live│     │       ││ ☑ NBP DAO      ││
│   │ … 8                                │     │       ││ …              ││
│   │ 3 Employment  [table]              │     │       ││ 3 Employment   ││
│   │ 4 Declared skills [☑ grid]         │     │       ││ 4 Skills       ││
│   │ 5 Contact  [fields]  Signature ____│     │       ││ 5 Contact      ││
│   │                       (Approved)   │     │       ││   (Approved)   ││
│   └────────────────────────────────────┘     │       │└────────────────┘│
└──────────────────────────────────────────────┘       └──────────────────┘
```

### 05 Swiss poster ("Grid")

- Tokens, light: paper `#FFFFFF`, ink `#000000`, muted `#6B6B6B`, rule `#DADADA`, crimson `#D7263D`.
- Tokens, dark: bg `#000000`, text `#FFFFFF`, muted `#9A9A9A`, rule `#333333`, crimson text `#FF6B78`,
  crimson block `#D7263D`.
- Type: Archivo, one family at two widths: expanded (wdth 115–125) for the poster type, normal for body.
  Fallback `Archivo, "Helvetica Neue", Helvetica, Arial, sans-serif`.
- Layout: an 8-column modular grid with visible gutters on desktop; type blocks and figure blocks are
  locked to cells; headlines may crop at a cell edge. Mobile: 2 columns, same rules.
- Memorable element: the poster hero. The headline in expanded Archivo filling six cells, the proof
  figures (300+, 8, 2022) as the largest objects on the page, and one crimson cell carrying the resume
  call to action.
- Motion: one moment, the grid cells reveal with a clip wipe from their own edges, 400 ms, in reading
  order. Then only actions: a tile inverts (black on white becomes white on black) on hover or focus.
  Framer Motion: `clipPath` variants with `staggerChildren`; `whileHover` colour inversion.
- Why it fits: precision, hierarchy and nothing decorative is what Swiss typography and good engineering
  share; the figures do the proving.
- Made less generic by: Archivo at two widths instead of Inter; figures as the hero instead of a photo;
  light-first; no cards; crimson used as a block, not a glow.

```
Desktop                                                Mobile
┌──────────────────────────────────────────────┐       ┌──────────────────┐
│ Ahsan Iftikhar   Work Experience Skills … ◐  │       │ Ahsan Iftikhar  ≡│
├────┬────┬────┬────┬────┬────┬────┬────┤      │       ├────────┬─────────┤
│ I BUILD THE SOFTWARE          │300+│ 8  │    │       │ I build the …    │
│ BANKS AND INVESTORS           │bra.│prod│    │       ├────────┬─────────┤
│ ACTUALLY USE.  (sentence case,│────┴────┤    │       │ 300+   │ 8       │
│  expanded, cropped)           │ [Resume]│    │       ├────────┴─────────┤
│ lead …           [photo]      │ crimson │    │       │ [Resume] crimson │
├────┴────┴────┴────┴────┴────┴────┴────┤      │       │ lead … [photo]   │
│ Selected work: 4 tiles, title as poster type │       │ tiles 1 col      │
│ Experience: grid table, dates as figures     │       │ Experience       │
│ Skills: dense type list                      │       │ Skills           │
│ Contact: form in cells                       │       │ Contact          │
└──────────────────────────────────────────────┘       └──────────────────┘
```

Status: plans written; Step 3 builds follow in `mockups/01-status.html` to `05-poster.html`, with
`mockups/index.html` as the gallery and `mockups/REVIEW.md` for the comparison.
