import { Link, useLocation } from 'react-router-dom'
import { m } from 'framer-motion'
import DotGrid from '../components/DotGrid.jsx'
import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { currently, featured, hero, person } from '../data/portfolio.js'
import { useContact } from '../hooks/useContact.js'
import { EASE } from '../lib/motion.js'

const indent = ['', 'md:pl-[14vw]', '', 'md:pl-[7vw]']

export default function Home() {
  const { openContact } = useContact()
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/contact' ? (
        <Meta title="Contact" description="Write to Ahsan Iftikhar about senior and lead software engineering roles, remote on US hours." />
      ) : (
        <Meta />
      )}

      <section className="relative grid min-h-screen grid-rows-[1fr_auto] overflow-hidden px-6 pb-10 pt-[110px] md:px-10 md:pb-12 md:pt-[140px]">
        <DotGrid />
        <h1 className="relative m-0 self-end font-display text-[15vw] font-medium uppercase leading-[0.92] tracking-[-0.05em] md:text-[clamp(80px,11.5vw,190px)]">
          {hero.lines.map((line, i) => (
            <span key={line} className={`block overflow-hidden ${indent[i]}`}>
              <m.span
                className={`block ${i === hero.lines.length - 1 ? 'text-accent' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.11 }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>
        <m.div
          className="relative grid items-end gap-6 pt-10 md:grid-cols-[1fr_auto_auto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="m-0 max-w-[380px] text-[15px] leading-[1.55] text-ink/75">{hero.lede}</p>
          <div className="flex flex-wrap gap-7 text-[13px] font-medium">
            <Link to="/projects" className="flex items-center gap-2 border-b border-ink pb-1 transition-colors hover:border-accent hover:text-accent">
              Selected work <span aria-hidden="true">→</span>
            </Link>
            <Link to="/resume" className="border-b border-transparent pb-1 transition-colors hover:border-ink">
              Resume
            </Link>
          </div>
          <div className="flex gap-4 font-mono text-[11px] text-ink/65 md:justify-end">
            <a href={person.github} target="_blank" rel="noreferrer" className="hover:text-ink">
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={`mailto:${person.email}`} className="hover:text-ink">
              Email
            </a>
          </div>
        </m.div>
      </section>

      <section aria-labelledby="work-title" className="border-t border-ink/12 px-6 py-16 md:px-10 md:py-28">
        <div className="mb-12 grid gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>
            Selected work
            <br />
            2022 — 2026
          </SectionLabel>
          <h2 id="work-title" className="m-0 text-balance font-display text-[34px] font-medium leading-[1] tracking-[-0.04em] md:text-[clamp(36px,4.2vw,64px)]">
            Three products that run money, teams, or markets.
          </h2>
        </div>
        <ul className="m-0 grid list-none p-0">
          {featured.map((p) => (
            <m.li
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Link
                to={`/projects/${p.id}`}
                className="grid grid-cols-[96px_1fr] items-center gap-x-6 gap-y-2 border-t border-ink/12 py-8 transition-colors hover:text-accent focus-visible:text-accent md:grid-cols-[150px_1.6fr_1fr_220px] md:gap-6"
              >
                <span className="grid grid-cols-[auto_56px] items-center gap-3 md:grid-cols-[auto_72px]">
                  <span className="font-mono text-[11px] text-ink/65">{p.num}</span>
                  <img src={p.thumb} alt="" width="240" height="300" loading="lazy" decoding="async" className="aspect-[4/5] w-full bg-ink object-cover" />
                </span>
                <span className="font-display text-[28px] font-medium leading-[1] tracking-[-0.04em] md:text-[clamp(28px,3.4vw,52px)]">{p.name}</span>
                <span className="col-start-2 text-[14px] text-ink/65 md:col-auto">{p.kicker}</span>
                <span className="col-start-2 text-[13px] md:col-auto md:text-right">
                  {p.metric} <span className="text-ink/65">{p.metricLabel}</span>
                </span>
              </Link>
            </m.li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="currently-title" className="bg-ink px-6 py-16 text-paper md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <span className="font-mono text-[11px] opacity-60">Currently</span>
          <div className="grid gap-6">
            <h2 id="currently-title" className="m-0 font-display text-[34px] font-medium leading-[1] tracking-[-0.04em] md:text-[clamp(36px,4.2vw,64px)]">
              {currently.headline}
            </h2>
            <div className="flex flex-wrap gap-8 text-[14px] opacity-80">
              <span>{currently.previously}</span>
              <Link to="/experience" className="border-b border-current pb-px transition-opacity hover:opacity-100">
                Full history <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="talk-title" className="grid items-end gap-10 px-6 py-16 md:grid-cols-[220px_1fr] md:px-10 md:py-28">
        <SectionLabel>Contact</SectionLabel>
        <div className="grid gap-5">
          <h2 id="talk-title" className="m-0">
            <button
              type="button"
              onClick={openContact}
              className="text-left font-display text-[56px] font-medium leading-[0.95] tracking-[-0.05em] transition-colors hover:text-accent md:text-[clamp(64px,9vw,150px)]"
            >
              Let’s talk <span aria-hidden="true">→</span>
            </button>
          </h2>
          <span className="text-[14px] text-ink/65">
            {person.email} · {person.availability}
          </span>
        </div>
      </section>
    </>
  )
}
