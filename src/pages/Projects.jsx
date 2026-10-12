import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import Meta from '../components/Meta.jsx'
import { projects } from '../data/portfolio.js'
import { useAutoplay } from '../hooks/useAutoplay.js'
import { useContact } from '../hooks/useContact.js'
import { EASE } from '../lib/motion.js'

/** Time each spread stays on screen before the carousel advances by itself. */
const AUTOPLAY_INTERVAL_MS = 2000

const labelClass = 'text-[11px] uppercase tracking-[0.08em] text-ink/65'
const navButtonClass = 'flex h-11 items-center gap-2.5 text-[14px] font-medium transition-colors hover:text-accent'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Keyboard focus as the browser shows it (:focus-visible); engines without the selector count any focus. */
function showsFocusRing(el) {
  try {
    return el.matches(':focus-visible')
  } catch {
    return true
  }
}

function Cell({ label, children }) {
  return (
    <div className="grid content-start gap-1.5">
      <span className={labelClass}>{label}</span>
      <span className="text-[13px] leading-[1.55]">{children}</span>
    </div>
  )
}

/** Pause (two bars) or play (triangle) glyph in the current colour; decorative, the button text is the name. */
function PlaybackGlyph({ paused }) {
  return (
    <span aria-hidden="true" className="flex h-[14px] items-center">
      <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
        {paused ? (
          <path d="M1 0.5 8.5 5 1 9.5z" />
        ) : (
          <>
            <rect x="1" y="0.5" width="2.5" height="9" />
            <rect x="5.5" y="0.5" width="2.5" height="9" />
          </>
        )}
      </svg>
    </span>
  )
}

/** One full-viewport spread per project, paged like a magazine. Routed as /projects/:slug. */
export default function Projects() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { open: contactOpen } = useContact()
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const total = projects.length
  const index = Math.max(
    0,
    projects.findIndex((p) => p.id === slug),
  )
  const project = projects[index]
  const prev = projects[(index - 1 + total) % total]
  const next = projects[(index + 1) % total]

  // Autoplay runs unless something asks for a pause. The user's own Pause wins over everything
  // and only their Play lifts it; hover, focus, the contact sheet and a hidden tab lift themselves.
  const [userPaused, setUserPaused] = useState(prefersReducedMotion)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const playing = !userPaused && !hovered && !focused && !hidden && !contactOpen

  // User-initiated paging: pushes history and brings the spread back into view if the reader had scrolled down.
  const go = useCallback(
    (id) => {
      if (id === project.id) return
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0
      if (top < 0) window.scrollTo({ top: window.scrollY + top, left: 0 })
      navigate(`/projects/${id}`)
    },
    [navigate, project.id],
  )

  // Automatic paging: replaces the entry (no history growth) and never scrolls.
  const advance = useCallback(() => navigate(`/projects/${next.id}`, { replace: true }), [navigate, next.id])

  useAutoplay({
    active: playing,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    resetKey: project.id,
    onAdvance: advance,
    fillRef,
  })

  useEffect(() => {
    if (slug && !projects.some((p) => p.id === slug)) navigate('/projects', { replace: true })
  }, [slug, navigate])

  useEffect(() => {
    const onKey = (e) => {
      // A keypress turns a mouse click's focus into keyboard focus (the ring appears) without any focus event, so re-check here.
      const active = document.activeElement
      if (sectionRef.current?.contains(active) && showsFocusRing(active)) setFocused(true)
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, [role="dialog"]')) return
      if (e.key === 'ArrowRight') go(next.id)
      if (e.key === 'ArrowLeft') go(prev.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, next.id, prev.id])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <>
      <Meta title={`${project.name} — Projects`} description={`${project.name}: ${project.description}`} />
      <section
        ref={sectionRef}
        aria-label="Projects"
        aria-roledescription="carousel"
        onFocus={(e) => {
          // Keyboard focus pauses like hover; the focus a mouse click leaves on a button (no ring) must not pin the carousel.
          if (showsFocusRing(e.target)) setFocused(true)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
        }}
        className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 px-6 pb-16 pt-[110px] md:px-10 md:pb-24 md:pt-40"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] text-ink/65" aria-live="polite">
            Projects — <span className="text-ink">{project.num}</span> / {String(total).padStart(2, '0')}
          </span>
          <ul className="m-0 flex list-none gap-1.5 p-0" aria-label="Go to project">
            {projects.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => go(p.id)}
                  aria-label={`${p.num} ${p.name}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group flex h-11 w-6 items-center md:w-7"
                >
                  {/* The active dash is a lighter track that fills with ink as the countdown runs; it is solid ink the moment before the advance. */}
                  <span
                    className={`relative h-[2px] w-full transition-colors ${i === index ? 'bg-ink/35' : 'bg-ink/20 group-hover:bg-ink/50'}`}
                  >
                    {i === index ? (
                      <span
                        ref={fillRef}
                        aria-hidden="true"
                        className="absolute inset-0 origin-left scale-x-0 bg-ink"
                      />
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hover pause zone: the spread itself (eyebrow, text and image), not the counter row above or the bar below.
            A stable wrapper so the zone survives the article remounting on every advance. */}
        <div className="grid" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <AnimatePresence mode="wait" initial={false}>
            <m.article
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-stretch md:gap-16 xl:grid-cols-[1.25fr_1fr]"
            >
              {/* Text column shares the image's top and bottom edges: title block pinned to the top, details to the bottom. */}
              <div className="order-2 flex flex-col gap-7 md:order-1 md:justify-between md:gap-12">
                <div className="grid gap-7">
                  <div className="grid gap-3">
                    <span className="font-mono text-[11px] text-accent">
                      {project.num} — {project.kicker}
                    </span>
                    <h1 className="m-0 text-balance font-display text-[44px] font-medium leading-[0.92] tracking-[-0.05em] md:text-[clamp(48px,5.6vw,88px)]">
                      {project.name}
                    </h1>
                  </div>
                  <p className="m-0 max-w-[480px] text-[16px] leading-[1.55] text-ink/80">{project.description}</p>
                </div>
                <div className="grid gap-7">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 border-t border-ink/15 pt-5">
                    <Cell label="Problem">{project.problem}</Cell>
                    <Cell label="Solution">{project.solution}</Cell>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
                    <Cell label="Role">{project.role}</Cell>
                    <Cell label="Impact">{project.impact}</Cell>
                    <Cell label="Stack">{project.techLine}</Cell>
                    <Cell label="Domain">
                      {project.domain} · {project.year}
                    </Cell>
                  </div>
                  <div className="flex flex-wrap gap-6 text-[13px] font-medium">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="border-b border-current pb-px transition-colors hover:text-accent"
                      >
                        {project.liveLabel || 'Live site'} ↗
                      </a>
                    ) : null}
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="border-b border-current pb-px transition-colors hover:text-accent"
                      >
                        GitHub ↗
                      </a>
                    ) : null}
                    {!project.live && !project.repo ? (
                      <span className="font-normal text-ink/65">Internal system, no public link</span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* 3:2 plate on phones (landscape render). On desktop it fills the row height so both columns share top and bottom edges; at 1440 the column is 576px wide with a 720px floor, i.e. 4:5 again. */}
              <div className="relative order-1 aspect-[3/2] overflow-hidden bg-[#0A162D] transition-transform duration-[600ms] ease-out hover:scale-[1.01] md:order-2 md:aspect-auto md:min-h-[560px] xl:min-h-[720px]">
                {/* Desktop: the whole illustration is shown (contain) over a blurred copy of itself, so no edge is ever cropped. */}
                <img
                  src={project.img}
                  alt=""
                  aria-hidden="true"
                  width="1200"
                  height="1500"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 hidden h-full w-full scale-125 object-cover blur-3xl saturate-[1.1] md:block"
                />
                {/* Phones get the landscape render in a 3:2 plate; from 820px the portrait art is shown whole over the blurred backdrop. */}
                <picture>
                  <source media="(min-width: 820px)" srcSet={project.img} width="1200" height="1500" />
                  <img
                    src={project.imgWide || project.img}
                    alt={`${project.name}: ${project.kicker}`}
                    width="1200"
                    height="800"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover md:object-contain"
                  />
                </picture>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-[rgba(10,22,45,0)] to-[rgba(10,22,45,0.92)]"
                />
                <span className="absolute bottom-4 left-4 font-display text-[40px] font-medium leading-none tracking-[-0.04em] text-[#F9F9F9] md:bottom-5 md:left-5 md:text-[56px]">
                  {project.metric}
                </span>
                <span className="absolute bottom-6 right-5 text-[12px] text-[#F9F9F9]/85">{project.metricLabel}</span>
              </div>
            </m.article>
          </AnimatePresence>
        </div>

        {/* Three columns so Pause/Play sits on the centre line whatever the neighbour names measure; long names truncate rather than wrap. */}
        <nav
          aria-label="Previous and next project"
          className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 border-t border-ink/15 pt-5"
        >
          <button
            type="button"
            onClick={() => go(prev.id)}
            className={`${navButtonClass} max-w-full justify-self-start`}
          >
            <span aria-hidden="true">←</span>
            <span className="truncate text-ink/65">{prev.name}</span>
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            className={`${navButtonClass} px-2`}
          >
            <PlaybackGlyph paused={userPaused} />
            {userPaused ? 'Play' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={() => go(next.id)}
            className={`${navButtonClass} max-w-full justify-self-end text-right`}
          >
            <span className="truncate text-ink/65">{next.name}</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </section>
    </>
  )
}
