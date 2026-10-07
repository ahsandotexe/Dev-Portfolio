# Portfolio Redesign Brief: Ahsan Iftikhar

This document describes my personal developer portfolio as it exists today: its purpose, structure, content, visual system, components and known problems. Please use it to **redesign the UI/UX**. You don't have access to the code, so everything you need is here.

- **Live site:** https://portfoliobyahsan.netlify.app/
- **Owner:** Ahsan Iftikhar, Senior Software Engineer (full-stack + AI integration), Karachi, Pakistan
- **Current role:** Senior Software Engineer at Lumida Wealth (New Jersey, USA; remote)

---

## 1. Goals of the site

**Primary audience:** recruiters, hiring managers and engineering leads (often international/US remote roles), plus potential freelance clients.

**What a visitor should come away with in about 30 seconds:**
1. Who I am: a Senior Full-Stack Engineer who builds AI-powered products (React / Next.js / Node / Flask / OpenAI).
2. Proof: real production work in fintech, banking and AI SaaS.
3. A clear way to act: view or download my resume, or contact me.

**Desired tone:** professional, modern, confident and technical without being gimmicky. It should feel like a senior engineer's site, not a template.

---

## 2. Tech stack (current)

| Area | Choice |
|---|---|
| Framework | React 19 + Vite 7 (SPA) |
| Routing | React Router v7 (`BrowserRouter`) |
| Styling | Tailwind CSS 3 (`darkMode: 'class'`) plus a few custom utility classes |
| Animation | Framer Motion 12 (page transitions, scroll reveals, hover effects) |
| 3D | React Three Fiber + Drei (one distorted sphere in the hero background) |
| Icons | `lucide-react` (UI icons), `react-icons/si` (tech brand logos) |
| Forms | `react-hook-form` |
| Toasts | `react-hot-toast` |
| Fonts | Inter (body), Space Grotesk (headings), loaded from Google Fonts |
| Hosting | Netlify (static) |

**Constraints for the redesign:** keep it a React + Tailwind static site that I can deploy to Netlify. You may add or remove libraries if there's a good reason (e.g. dropping Three.js if it isn't pulling its weight). The output should be implementable as React components.

---

## 3. Information architecture (current)

```
/            Home      → Hero only (everything is packed into one hero section)
/about       About     → Bio, Education, Tech Stack grid
/resume      Resume    → Experience timeline, skill bars, skill tag groups, certificates
/projects    Projects  → Grid of 8 project cards → click opens a detail modal
/contact     Contact   → Email + location cards, portfolio link, contact form
```

Global elements:
- **Navbar** (fixed, top). Logo is the gradient initials "AI". Links: Home, About, Resume, Projects, Contact. An animated underline marks the active link. On mobile there's a hamburger menu and a theme toggle.
- **Footer** (on every page). Four columns: Get in Touch (email, location, site URL), Quick Links (Resume, Projects, About), Contact (button to the contact form), Connect (GitHub and LinkedIn icons). Copyright line.
- **Scroll-to-top** floating button (bottom-right, appears after scrolling 300px).
- Page transitions fade/slide between routes.

---

## 4. Current visual design system

**Overall style:** dark theme with glassmorphism (translucent slate cards, backdrop blur, thin white/10 borders) and a cyan→emerald gradient used heavily for headings, buttons and accents.

### Colors
| Token | Value | Use |
|---|---|---|
| `primary` | `#00D9FF` (cyan) | Accents, links, icons, active states |
| `secondary` | `#10B981` (emerald) | Gradient end, secondary icons |
| `dark-100` | `#0F172A` | Page background |
| `dark-200` | `#1E293B` | Card/glass base (at 80% opacity) |
| `dark-300` | `#334155` | Progress bar tracks |
| `dark-400` | `#475569` | — |
| `light-100…400` | `#FFFFFF`, `#F8F9FA`, `#E9ECEF`, `#DEE2E6` | Light theme surfaces |
| Text | gray-100 / gray-300 / gray-400 (dark), gray-900 / 700 / 600 (light) | via `.text-adaptive-*` helper classes |

### Typography
- Headings: **Space Grotesk** (600–700). Page titles are 5xl–6xl with a gradient text fill.
- Body: **Inter** (300–700).

### Surfaces
- `.glass`: `bg-dark-200/80`, `backdrop-blur-xl`, `border-white/10`, 1rem radius
- `.glass-light`: `bg-dark-200/40`, `backdrop-blur-md`, `border-white/5`, 0.75rem radius
- Pills/tags: `glass-light rounded-full text-primary border-primary/30`

### Motion
- Every section fades or slides up on load (staggered delays from 0.2 to 0.8s).
- Hover effects: scale 1.02–1.2 and y −5 lift on cards, badges and icons.
- Ripple effect on hero CTA buttons.
- Animated number counters for hero stats.
- Animated progress bars for skills.
- Bouncing "Scroll to explore" chevron in the hero.
- The 3D sphere auto-rotates at 20% opacity behind the hero.
- `prefers-reduced-motion` is respected globally.

### Theming
- Dark is the default. Light mode exists, but it's built from CSS overrides (`html.light .glass {…}` and so on), not proper tokens. **The desktop theme toggle is currently commented out**; only the mobile toggle exists. The choice is saved in localStorage.

---

## 5. Page-by-page content and layout

### 5.1 Home (`/`)
Full-height hero, two columns on desktop (content left, photo right; **the photo is hidden below the `lg` breakpoint**).

Left column, top to bottom:
1. Pill: **"Senior Software Engineer"**
2. H1: **"Hi, I'm Ahsan Iftikhar"** (name in gradient)
3. H2: **"Building Scalable, AI-Driven Software Solutions"**
4. Paragraph: "Full-Stack Engineer specializing in React, Node.js, Flask, and AI integration."
5. Stats row with animated counters: **5+ Years Experience · 20+ Projects · 10+ Technologies**
6. CTAs: **View Resume** (gradient, links to /resume) and **Get in Touch** (outlined, `mailto:`)
7. "Tech Stack:" row of 6 brand icons: React, Next.js, Flask, Node.js, PostgreSQL, OpenAI
8. "Featured Project" card: *AI Investment Analysis Platform*, "AI-powered platform leveraging OpenAI LLMs for intelligent financial insights." Tags: React, Flask, OpenAI, GCP. Links to /projects.

Right column: circular profile photo (224px) inside a glass card.

Bottom: "Scroll to explore" bouncing indicator. **There is nothing below the hero**; it scrolls straight to the footer.

### 5.2 About (`/about`)
Centered gradient title "About Me" with the subtitle "Get to know more about my background, education, and expertise". Then three stacked glass cards:

1. **Professional Bio** (code icon): "I'm a Senior Software Engineer with experience building scalable, AI-powered applications using modern web technologies. I focus on creating high-performance interfaces, secure APIs, and data-driven solutions that solve real-world problems and deliver exceptional user experiences."
2. **Education** (graduation cap icon): **BS Computer Science**, NUCES – FAST, Karachi, Aug 2018 – June 2022
3. **Tech Stack**: grid of 9 icon badges: React, Next.js, Node.js, Flask, PostgreSQL, Docker, Python, OpenAI, Redis

### 5.3 Resume (`/resume`)
Header: "Resume" / "My professional journey and expertise" / pill "N+ Years of Experience" (computed from April 2022). A **"Download PDF"** button sits top-right; it currently just shows a toast and calls `window.print()`.

**Experience** (vertical timeline: a gradient line, dots, a glass card per role with a briefcase icon and bullet list):

1. **Senior Software Engineer, Lumida Wealth**, New Jersey, USA · Dec 2024 – Present
   - Spearheaded the development of new React modules and components, improving performance and user engagement by 25%
   - Managed UI/UX design and development for key components, enhancing usability and visual consistency
   - Refactored legacy code, increasing maintainability and reducing technical debt by 15%
   - Managed frontend codebase architecture, improving readability and development efficiency
   - Developed and optimized backend APIs using Flask and Firestore, streamlining data flow and system integration
   - Integrated OpenAI's LLMs into workflows, automating processes and enhancing decision-making
   - Conducted code reviews, ensuring high-quality, scalable, and efficient code standards
2. **Full Stack Engineer, Qlu.ai**, Remote · Oct 2024 – Dec 2024
   - Collaborated on the development of Qlu.ai, an AI-driven platform for automating prospect research and outreach
   - Developed front-end using Next.js with React Query and middleware, reducing load times by 30%
   - Designed and implemented back-end services using Node.js and PostgreSQL with JWT authentication, improving API response times by 20%
   - Integrated real-time communication features using Socket.IO, boosting user engagement through instant messaging
   - Collaborated with cross-functional teams, maintaining a 95% project success rate and ensuring timely delivery
   - Conducted code reviews and debugging, maintaining high code quality and minimizing production issues
   - Executed rigorous testing, leading to a 40% reduction in reported bugs post-launch
3. **Software Engineer I, Paysys Labs**, Karachi, Pakistan · Nov 2022 – Oct 2024
   - Developed and maintained user interfaces using React, improving web app efficiency by up to 25%
   - Collaborated with development, product, and UX/UI teams to implement features, achieving faster page reloading by up to 30%
   - Designed reports on Jasper Soft Studio with complex queries and PL/SQL procedures for 300+ NS Branches nationwide
   - Developed ETL Jobs for bulk data migration, enhancing database performance by up to 40%
   - Performed stress testing on JMeter, optimizing resource allocation and ensuring consistent service response times up to 30%
   - Resolved crucial bugs in core business applications and modified ETL Jobs
   - Developed backend services using Node.js, Express.js, NestJS, .NET and mobile applications using React Native
4. **Software Engineer, Teresol**, Karachi, Pakistan · Apr 2022 – Oct 2022
   - Contributed to front-end development using Vue.js, improving interface responsiveness and usability by 15%
   - Integrated JWT (JSON Web Tokens) for secure user authentication and authorization
   - Implemented XState middleware for efficient management of complex application states
   - Collaborated closely with back-end developers to ensure seamless communication and integration
   - Participated in code reviews, offering constructive feedback to maintain code quality

**Skills:**
- "Core Proficiencies" progress bars (self-rated %): JavaScript 70, TypeScript 50, Python 70, React 80, Next.js 60, Node.js 65, PostgreSQL 70, Docker 70, Git 80
- Tag groups in a 2×2 grid of cards:
  - **Languages:** C, C++, HTML, CSS, JavaScript, Python, Java, C#
  - **Frameworks:** React, React Native, Next.js, Vue.js, Node.js, Express.js, NestJS, Flask, Spring Boot, Quarkus, .NET
  - **Databases:** Oracle SQL, PostgreSQL, Firestore, Redis
  - **Tools:** Docker, Socket.io, XState, Material UI, Jasper Reports, JMeter, ETL Jobs, JWT, RESTful Services, Agentic AI, OpenAI LLMs, Git, Google Cloud Platform, React Query

**Certificates** (2-column cards):
- SQL (Intermediate), HackerRank, June 2023: complex joins, unions, and sub-queries
- JavaScript, HackerRank, June 2023: functions, currying, hoisting, scope, inheritance, events and error handling
- Python, HackerRank, Feb 2023: scalar types, operators, control flow, strings, collections, modularity, objects, types and classes
- Front-End Web Development with React, Coursera, Feb 2022: React, ReactDOM, class/functional components, hooks, lifecycle, conditional rendering

### 5.4 Projects (`/projects`)
Header: rocket icon + "Projects" / "A showcase of my recent work and technical projects".
3-column grid of text-only glass cards (title, short description, tech tags, optional live-link icon, and a "Featured" badge on the first). **There are no images or screenshots.** Clicking a card opens a modal with title, description, "Details" (long description), Tech Stack tags, optional metrics, and a "Live Demo" button when a link exists.

Projects (short description → long description → stack → link):

1. **AI Investment Analysis Platform** *(featured; 2024; Lumida Wealth)*
   - Short: AI-powered investment analysis platform for the U.S. stock market, delivering data-driven insights through real-time financial news, AI-driven market sentiment, and portfolio analytics.
   - Long: Integrates historical and predictive analysis with AI-powered research to provide actionable market insights. Built with React and Flask, it leverages Firestore and GCP for scalability. I develop end-to-end modules, integrating OpenAI LLMs to enhance analysis, automate workflows, and extract forward-looking insights, transforming complex financial data into intuitive, high-impact summaries.
   - Stack: React, Flask, Firestore, Buckets, Google Cloud, OpenAI LLMs
2. **Qlu.ai**
   - Short: AI-driven platform designed to automate prospect research and outreach for executive and tech recruiters, generating precise candidate lists from extensive databases within minutes.
   - Long: Uses AI and NLP to interpret hiring requirements and generate precise candidate lists. Front end on Next.js; backend on Node.js with PostgreSQL and ElasticSearch.
   - Stack: Next.js, Node.js, PostgreSQL, ElasticSearch
3. **National Savings Suite**
   - Short: Robust web-based application that integrates front-end development and SQL database management to modernize national saving initiatives for 300+ branches nationwide.
   - Long: Interfaces for branches to access information, conduct transactions, invest in products, and monitor savings. React front end, Spring Boot + SQL backend, React Native mobile apps. I oversee the React front end and Android app, develop Jasper reports for 300+ branches, and troubleshoot core application bugs.
   - Stack: React, Java, Spring Boot, Redis, React Native, Oracle SQL, Jasper Reports
4. **NBP – Digital Account Opening** (National Bank of Pakistan)
   - Short: Facilitates digital account opening for National Bank of Pakistan, providing customers with convenient access to banking services through online channels.
   - Long: Managed the project and led front-end development from inception using React, MUI5 and React Query. Used Snyk to identify and fix security issues, worked on the Node.js backend, and ensured cross-device compatibility.
   - Stack: React, React Query, Node.js, Oracle SQL, Material UI, Snyk
   - Live: https://newaccount.nbp.com.pk/landing-page
5. **National Savings – Digital Account Opening**
   - Short: Brings customers onboard through its web application digitally, streamlining the user experience for a seamless and secure digital onboarding process.
   - Long: Designed and implemented the Node.js backend infrastructure, led React front-end development, and worked with cross-functional teams on advanced features.
   - Stack: React, Node.js, Express.js, SQL
   - Live: https://account.nationalsavings.digital/
6. **National Savings – BackOffice**
   - Short: Web-based application aimed at managing customer requests for National Savings Digital Account Opening with robust user account management and security features.
   - Long: Designed and developed the UI and business logic in React, built services on .NET with SQL, and implemented device-blocking security.
   - Stack: React, .NET, SQL
7. **National Savings Call Center App**
   - Short: Web portal for accessing the National Savings Mobile App, enabling viewing of customer KYC details and their status, including whether they are locked or unlocked.
   - Long: Led React front-end development and coordinated with other teams.
   - Stack: React, Node.js, SQL
8. **Bank Al-Habib App**
   - Short: Comprehensive core banking application handling customer accounts, transactions, loans, CRM, Teller and Cash Management, KYC, and Financial Analysis.
   - Long: Played a central role in overhauling the core banking app, improving UX and performance. Vue.js front end with JWT security and XState middleware; Quarkus + SQL backend.
   - Stack: Vue.js, Java, Quarkus, XState, JWT, SQL

> An unused `ProjectFilter` component (search box + tech-tag toggle filters) exists in the codebase but isn't wired in.

### 5.5 Contact (`/contact`)
Header: "Contact Me" / "Have a project in mind? Let's discuss how we can work together to bring your ideas to life."
- Two info cards: **Email** ahsaniftikhar2016@gmail.com · **Location** Karachi, Pakistan
- A small card linking to the portfolio's own URL (redundant)
- **Contact form** "Get in Touch": Name*, Email*, Subject*, Message* (min 10 chars), gradient "Send Message" button with a loading state. **The submission is simulated** (1.5s fake delay, then a success toast); it isn't connected to any email service yet.

---

## 6. Known UX/UI problems (please address these)

**Structure and content**
- The home page is just one overloaded hero (badge, title, subtitle, stats, two CTAs, tech icons and a featured-project card) with nothing below it. The "Scroll to explore" prompt leads straight to the footer.
- Content is split across five thin pages. A recruiter has to click around to get the full picture. Consider a stronger single-page home (hero → selected work → experience summary → skills → contact) with deeper pages kept where they add value.
- The stats contradict each other: the hero says "5+ Years" while the Resume computes about 4 years from April 2022; "20+ Projects" sits next to 8 listed projects.
- Project cards are text-only walls with no visuals, outcomes, or my role, and they look identical. They need hierarchy (role, impact, domain such as fintech, banking or AI) and some kind of visual (screenshots, abstract illustrations, or a domain icon system).
- Self-rated skill percentage bars ("TypeScript 50%") are a known portfolio anti-pattern and undersell me. TypeScript also appears in the bars but not in the skill lists.
- Experience bullets are long (5–7 per role) with no way to scan them. Consider highlighting key metrics and collapsing the rest.
- The About page is thin (one paragraph, one education entry, an icon grid) and repeats Resume content.
- The Contact page has a redundant "portfolio" link pointing to the site itself.

**Visual**
- Every page header is the same pattern: centered giant gradient title plus a gray subtitle. The cyan→emerald gradient is overused (titles, buttons, counters, progress bars, badges, the timeline).
- Everything is a glass card, so nothing stands out and there's no visual hierarchy.
- The 3D sphere at 20% opacity adds bundle weight (Three.js) for little visual payoff.
- The logo "AI" (my initials) reads as "Artificial Intelligence".
- The profile photo is hidden on mobile and tablet.
- The favicon is still the default Vite logo, and there's no OG image.

**Functionality and accessibility**
- The desktop theme toggle is commented out; light mode is held together with CSS overrides.
- The contact form doesn't actually send anything.
- "Download PDF" just triggers browser print. I'd like a real downloadable resume PDF.
- The GitHub and LinkedIn footer links point to `github.com` and `linkedin.com` (placeholders).
- Project cards are clickable `div`s (not keyboard accessible). The modal has no Escape-to-close and no focus trap.
- There's a lot of entrance animation with staggered delays up to 0.8s, so content feels slow to appear.

---

## 7. What I want from the redesign

1. A **fresh, distinctive visual direction** that's clean, senior and memorable. Don't simply restyle the current glassmorphism. Propose a palette, type pairing and layout system, and explain the reasoning.
2. A **better information architecture** optimized for recruiters scanning quickly, with a clear primary CTA (resume / contact).
3. A **richer project presentation**: case-study style with role, problem, what I built, impact, and stack. Group or tag projects by domain (AI/SaaS, Fintech, Banking).
4. A **better experience/skills presentation**: no percentage bars, scannable, with metrics highlighted.
5. **Dark and light themes** built on proper design tokens, with a visible toggle.
6. **Fully responsive** (mobile-first) and **accessible** (WCAG AA contrast, keyboard navigation, semantic HTML, reduced motion).
7. **Purposeful, subtle motion**: fewer and faster animations.
8. Fast: drop heavy dependencies unless they earn their place.

**Deliverables I'd like:**
- The design direction (palette, typography, spacing, component style) with rationale
- The new sitemap and section order
- Page layouts and key components, implemented as React + Tailwind code (or an interactive prototype/artifact I can then port)
- Notes on anything in the content you'd suggest rewriting (headline, bio, project copy)

---

## 8. Assets available

- Profile photo (`src/assets/profile.jpeg`, a headshot; currently cropped circular with focus at 50% / 65%)
- No project screenshots yet (I can provide some, or the design can use illustrations/placeholders)
- Contact: ahsaniftikhar2016@gmail.com · Karachi, Pakistan · open to remote roles
- GitHub / LinkedIn URLs: *to be filled in*
