// Single source of site content. Every page reads from here, so a fact changes in one place.
// Merged from the Claude Design prototype's portfolio-data.js (owner-authored), the October 2026
// resume, and the eight projects on the previous site (kept as instructed).

const imageModules = import.meta.glob('../assets/projects/*.webp', { eager: true, import: 'default' })
const image = (slug) => imageModules[`../assets/projects/${slug}.webp`]
const thumb = (slug) => imageModules[`../assets/projects/${slug}-thumb.webp`]

export const site = {
  url: 'https://portfoliobyahsan.netlify.app',
  titleSuffix: 'Ahsan Iftikhar',
}

export const person = {
  name: 'Ahsan Iftikhar',
  title: 'Senior Software Engineer',
  shortTitle: 'Software Engineer, Karachi',
  tagline: 'Full-stack · React · React Native · AI systems',
  location: 'Karachi, Pakistan',
  availability: 'Open to senior and lead roles, remote on US hours.',
  email: 'ahsaniftikhar2016@gmail.com',
  github: 'https://github.com/ahsandotexe',
  linkedin: 'https://www.linkedin.com/in/ahsaniftikhar99/',
  resume: { href: '/Ahsan_Iftikhar_Resume.pdf', pages: 2, size: '70 KB', updated: 'October 2026' },
  summary:
    'Five years shipping production fintech and AI systems. I draw a deliberate line between deterministic, auditable computation and where LLM judgment actually adds value.',
  education: { school: 'FAST – NUCES, Karachi', degree: 'BS Computer Science', dates: '2018 – 2022' },
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
]

export const hero = {
  lines: ['Software', 'engineer', 'of systems', 'that hold.'],
  lede: 'Ahsan Iftikhar — senior software engineer. Five years of fintech and AI systems: a trade-order service behind live Schwab execution, a React Native app with 1,000+ users, three national banking products.',
}

export const currently = {
  headline: 'Senior Software Engineer at Lumida Wealth, owning web, mobile and the AI layer.',
  previously: 'Previously Paysys Labs, Teresol, Medicon',
}

export const roles = [
  {
    id: 'lumida',
    company: 'Lumida Wealth',
    position: 'Senior Software Engineer',
    dates: 'Dec 2024 – Present',
    short: '2024 →',
    location: 'New Jersey, USA · Remote',
    description:
      'Own the React web platform, the React Native app (1,000+ active users), and the backend services, LLM pipelines and GCP infrastructure behind them at a 25-person wealth-management startup.',
    responsibilities: [
      'Front-end owner, Lumida AI research platform (8 modules)',
      'Lead mobile engineer, Lumida Invest (team of 3)',
      'LLM layer: summarisation, sentiment, ingestion pipelines',
      'CI/CD and GCP infrastructure across 5–7 projects',
    ],
    achievements: [
      'Trade-sheet prep cut from ~2 h to ~5 s',
      'TTI on charting views 1.8 s → 1.2 s',
      'Removed Android dropped frames via Worklets',
      'Sales suite now drives a ~$50M pipeline',
    ],
    tech: ['React', 'React Native', 'Flask', 'Firestore', 'GCP', 'OpenAI', 'WebSockets'],
  },
  {
    id: 'paysys',
    company: 'Paysys Labs',
    position: 'Software Engineer',
    dates: 'Jul 2022 – Nov 2024',
    short: '2022 – 24',
    location: 'Karachi, Pakistan',
    description:
      'Senior front-end engineer across three national banking products, owning each from inception, plus reporting and ETL work consumed by 300+ branches.',
    responsibilities: [
      'Led front-end for NBP digital account opening',
      'Built National Savings onboarding and its Node backend',
      'Jasper reports (SQL / PL-SQL) for 300+ branches',
      'Mentored 2 interns to production',
    ],
    achievements: [
      '3 banking products shipped from zero',
      'Rebuilt reporting UI, faster loads',
      'ETL pipelines for core-banking migration',
    ],
    tech: ['React', 'React Query', 'Node.js', 'NestJS', '.NET', 'Oracle SQL', 'JMeter'],
  },
  {
    id: 'teresol',
    company: 'Teresol',
    position: 'Software Engineer',
    dates: 'Jan 2022 – Jun 2022',
    short: '2022',
    location: 'Karachi, Pakistan',
    description:
      'Front-end features in Vue.js for a core-banking overhaul: accounts, transactions, loans, CRM, teller and KYC.',
    responsibilities: [
      'Vue.js feature development',
      'JWT authentication and authorisation',
      'XState middleware for complex app state',
    ],
    achievements: ['State machines for multi-step banking flows'],
    tech: ['Vue.js', 'XState', 'JWT', 'Quarkus'],
  },
  {
    id: 'medicon',
    company: 'Medicon',
    position: 'Associate Software Engineer',
    dates: 'Aug 2021 – Dec 2021',
    short: '2021',
    location: 'Karachi, Pakistan',
    description: 'Built React UI components for responsive web applications and optimised rendering performance.',
    responsibilities: ['React component development', 'Requirements into shipped features'],
    achievements: ['First production front-end work'],
    tech: ['React', 'CSS'],
  },
]

const projectList = [
  {
    id: 'trade-sheet',
    name: 'Trade Sheet',
    kicker: 'Automated trade-order preparation',
    domain: 'Fintech',
    year: '2025',
    description: 'Turns analyst portfolio allocations into executable per-account orders for Charles Schwab.',
    problem:
      'The desk spent ~2 hours per rebalance hand-building spreadsheets; stale prices and restricted tickers slipped through.',
    solution:
      'A Flask service converts percentage allocations into exact share quantities across four order types, validates against a live WebSocket price feed (rejecting >7% deviation) and a Firestore constraint engine. No LLM anywhere in the path.',
    tech: ['Python', 'Flask', 'Firestore', 'WebSockets', 'pandas', 'Google Sheets API'],
    role: 'Sole engineer · architecture, backend, ops',
    impact: '~2 h → ~5 s per trade sheet',
    metric: '1440×',
    metricLabel: 'faster preparation',
    live: null,
    repo: null,
  },
  {
    id: 'sales-intel',
    name: 'Sales Intelligence Platform',
    kicker: 'HubSpot CRM & AI automation suite',
    domain: 'AI · Revenue ops',
    year: '2025',
    description:
      'Seven sales-ops modules pairing deterministic analytics with an LLM layer for deal scoring and call coaching.',
    problem:
      'A revenue team running a ~$50M pipeline in spreadsheets with no consistent way to prioritise deals or review losses.',
    solution:
      'Two-agent scoring: one extracts intent and blockers, a fully deterministic second agent merges signals with rule-based scores into a 5-tier stack. Hard overrides and JSON-schema validation keep high-stakes verdicts out of the model. 3 of 7 modules are LLM-free by design.',
    tech: ['Python', 'Flask', 'OpenAI', 'HubSpot API', 'Gong', 'GCP'],
    role: 'Architect and lead engineer',
    impact: 'Daily surface for a ~$50M pipeline',
    metric: '7',
    metricLabel: 'modules · 16 stages',
    live: null,
    repo: null,
  },
  {
    id: 'lumida-invest',
    name: 'Lumida Invest',
    kicker: 'React Native fintech app · iOS & Android',
    domain: 'Fintech · Mobile',
    year: '2025',
    description:
      'Stocks and crypto app in beta with 1,000+ active users: brokerage linking, portfolio, live prices, AI assistant.',
    problem:
      'Live price updates dropped frames on mid-tier Android; brokerage linking, deep links and notifications had no architecture.',
    solution:
      'Moved API calls, store dispatches and heavy compute off the JS thread with Worklets. Integrated SnapTrade, designed the deep-link gateway and a 6-type notification system, shipped an SSE-streamed voice assistant.',
    tech: ['React Native 0.81', 'Redux Toolkit', 'WebSockets', 'SSE', 'Firebase', 'SnapTrade'],
    role: 'Lead mobile engineer · team of 3',
    impact: '1,000+ active users, 60 fps on mid-tier devices',
    metric: '1,000+',
    metricLabel: 'active users',
    live: null,
    repo: null,
  },
  {
    id: 'lumida-ai',
    name: 'Lumida AI',
    kicker: 'Equities research platform for the CIO team',
    domain: 'Fintech · AI',
    year: '2024 – now',
    description:
      'In-house research platform the CIO team uses to drive live US-market decisions. Eight modules, one React front end, LLMs in every one of them.',
    problem:
      'Factor analysis, news, earnings transcripts, charting and backtesting lived in separate tools, and the summaries the team needed were written by hand.',
    solution:
      'A React front end over Flask and Firestore with OpenAI pipelines wired into every module: auto-summarised news and earnings transcripts, structured market-sentiment extraction, and ingestion of ~1,000 posts a day from ~300 curated market accounts.',
    tech: ['React', 'Flask', 'Firestore', 'GCP', 'OpenAI', 'WebSockets'],
    role: 'Front-end owner · LLM layer',
    impact: 'Daily research surface for live investment decisions',
    metric: '8',
    metricLabel: 'modules, LLMs in each',
    live: null,
    repo: null,
  },
  {
    id: 'second-opinion',
    name: 'Lumida Second Opinion',
    kicker: 'Financial diagnostic & lead-gen platform',
    domain: 'Fintech',
    year: '2025',
    description:
      'Server-authoritative React 19 + Vite SPA replacing a single-file prototype, serving advisors and the public from one engine.',
    problem:
      'Scoring logic lived in a throwaway HTML file; two audiences (gated advisors, anonymous public) needed one trustworthy engine.',
    solution:
      'All rules stay in Flask with zero client-side duplication; a channel-aware evaluation contract serves both flows. Live findings rail with debounced, abort-superseded requests, CI/CD to GCP and a feature-flagged Stripe paywall.',
    tech: ['React 19', 'Vite', 'Flask', 'GCP', 'Stripe', 'GitHub Actions'],
    role: 'Full-stack engineer',
    impact: 'One engine, two channels, zero duplicated logic',
    metric: '0',
    metricLabel: 'duplicated business rules',
    live: 'https://secondopinion.lumida.com',
    repo: null,
  },
  {
    id: 'resumegrade',
    name: 'ResumeGrade',
    kicker: 'AI resume feedback · personal project',
    domain: 'AI · Personal',
    year: '2025',
    description: 'Free web app returning structured, actionable resume feedback. Shipped solo.',
    problem: 'Resume feedback tools were paywalled, slow, or leaked personal data to model providers.',
    solution:
      'Next.js front end, FastAPI backend, a multi-provider LLM waterfall (Groq → Cerebras → OpenRouter) for reliability and cost, spaCy PII redaction before any model call.',
    tech: ['Next.js', 'FastAPI', 'Groq', 'Cerebras', 'spaCy', 'Vercel'],
    role: 'Solo · design, build, SEO',
    impact: 'Free, private, resilient',
    metric: '3',
    metricLabel: 'provider fallback chain',
    live: 'https://resumegrade.vercel.app',
    repo: 'https://github.com/ahsandotexe',
  },
  {
    id: 'nbp',
    name: 'NBP Digital Account Opening',
    kicker: 'National banking onboarding portal',
    domain: 'Banking',
    year: '2023',
    description: 'Front-end lead from inception on the National Bank of Pakistan digital account-opening portal.',
    problem: 'Nationwide KYC onboarding with legacy infrastructure and strict security review.',
    solution:
      'React with MUI 5 and React Query caching, Snyk-driven security hardening, a Node.js backend, and cross-device compatibility from day one.',
    tech: ['React', 'React Query', 'Material UI', 'Node.js', 'Oracle SQL', 'Snyk'],
    role: 'Project lead and front-end lead',
    impact: 'Live for national banking customers',
    metric: '1',
    metricLabel: 'national bank, from inception',
    live: 'https://newaccount.nbp.com.pk/landing-page',
    repo: null,
  },
  {
    id: 'national-savings',
    name: 'National Savings Suite',
    kicker: 'Digital onboarding, back office and call-centre portals',
    domain: 'Banking',
    year: '2022 – 24',
    description:
      'Four products for Pakistan’s National Savings: a digital account-opening web app, a back-office console for processing requests, a call-centre portal for KYC lookups, and the Android app.',
    problem:
      'Opening a savings account meant a branch visit, and 300+ branches had no shared view of customer requests, KYC status or reports.',
    solution:
      'React front ends and a Node.js and Express backend for onboarding; .NET services with device-blocking controls for the back office; a React portal for call-centre agents; Jasper reports on complex SQL and PL/SQL for every branch.',
    tech: ['React', 'React Native', 'Node.js', 'Express', '.NET', 'Oracle SQL', 'Jasper Reports'],
    role: 'Front-end lead · Node.js backend · reporting',
    impact: 'Reports and tooling used by 300+ branches',
    metric: '300+',
    metricLabel: 'branches on reports',
    live: 'https://account.nationalsavings.digital/',
    repo: null,
  },
  {
    id: 'bank-al-habib',
    name: 'Bank Al-Habib Core Banking',
    kicker: 'Core banking overhaul · Vue.js',
    domain: 'Banking',
    year: '2022',
    description:
      'Front-end features for a core-banking overhaul covering accounts, transactions, loans, CRM, teller and cash management, and KYC.',
    problem: 'An ageing core-banking application with multi-step flows whose state lived in scattered component logic.',
    solution:
      'Vue.js front end with JWT authentication and authorisation, and XState state machines as middleware so every multi-step banking flow is explicit and testable, on a Quarkus and SQL backend.',
    tech: ['Vue.js', 'XState', 'JWT', 'Java', 'Quarkus', 'SQL'],
    role: 'Front-end engineer, at Teresol',
    impact: 'Explicit state machines for every multi-step flow',
    metric: '6',
    metricLabel: 'banking domains, one app',
    live: null,
    repo: null,
  },
  {
    id: 'qlu-ai',
    name: 'Qlu.ai',
    kicker: 'AI prospect research for recruiters',
    domain: 'AI · SaaS',
    year: '2024',
    description:
      'Platform that reads a hiring brief and returns a precise candidate list from large databases in minutes.',
    problem: 'Executive and tech recruiters built prospect lists by hand from several databases.',
    solution:
      'Next.js front end with React Query and middleware; Node.js and PostgreSQL services with JWT and Elasticsearch; Socket.IO for real-time messaging; NLP that turns hiring requirements into search.',
    tech: ['Next.js', 'React Query', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Socket.IO'],
    role: 'Full-stack engineer',
    impact: 'Candidate lists in minutes instead of hours',
    metric: '30%',
    metricLabel: 'faster page loads',
    live: null,
    repo: null,
  },
]

export const projects = projectList.map((p, i) => ({
  ...p,
  num: String(i + 1).padStart(2, '0'),
  img: image(p.id),
  thumb: thumb(p.id),
  techLine: p.tech.join(', '),
}))

export const featured = projects.slice(0, 3)

export const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'C#', 'SQL / PL-SQL'],
  Frontend: ['React', 'Next.js', 'Vite', 'React Query', 'XState', 'Framer Motion'],
  Mobile: ['React Native', 'Reanimated / Worklets', 'Deep linking', 'Push notifications'],
  Backend: ['Node.js', 'NestJS', 'Flask', 'FastAPI', '.NET', 'WebSockets'],
  'AI & Automation': ['LLM pipelines', 'Multi-agent', 'RAG', 'Schema validation'],
  'Cloud & Data': ['GCP', 'GitHub Actions', 'Nginx', 'Firestore', 'Oracle', 'pandas'],
}

export const coreSkillsLine = 'React · React Native · TypeScript · Python · Flask · Node.js · LLM pipelines · GCP'

export const philosophy = [
  {
    title: 'Deterministic where it matters',
    body: 'The trade-order service behind live Schwab execution has no model in it. Every number is reproducible and auditable.',
  },
  {
    title: 'LLMs as a layer, not a core',
    body: 'Models extract, summarise and suggest. Rules decide. Hard overrides keep high-stakes verdicts out of the model.',
  },
  {
    title: 'Performance is a feature',
    body: 'Worklets off the JS thread, virtualised tables, memoised charts. Users on mid-tier devices deserve 60 fps.',
  },
  {
    title: 'Own the whole path',
    body: 'From React components to Nginx config and CI/CD. Shipping means the deploy works too.',
  },
]

export const about = {
  headline: ['Profile:', 'an engineer who', 'draws the line.'],
  lead: 'Between deterministic, auditable computation and where a language model actually adds value. The trade-order service behind live Schwab execution has no model in it anywhere.',
  body: 'At a 25-person US wealth-management startup I own the React web platform and the React Native app (1,000+ active users), plus the backend services, LLM pipelines and GCP infrastructure behind them. Before that: three national banking products shipped from inception.',
  offTheClock:
    'Enjoys building real-time data surfaces, mobile apps that stay at 60 fps on cheap phones, and AI pipelines with auditable rules around them. Mentors through release ownership; prefers removing a step over documenting it. Karachi-based, US-timezone fluent.',
}

export const certificates = [
  { name: 'SQL (Intermediate)', issuer: 'HackerRank', date: 'June 2023' },
  { name: 'JavaScript', issuer: 'HackerRank', date: 'June 2023' },
  { name: 'Python', issuer: 'HackerRank', date: 'February 2023' },
  { name: 'Front-End Web Development with React', issuer: 'Coursera', date: 'February 2022' },
]
