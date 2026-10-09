import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { roles } from '../data/portfolio.js'
import { EASE } from '../lib/motion.js'

function Column({ title, children }) {
  return (
    <div className="grid content-start gap-2.5">
      <h3 className="m-0 text-[12px] font-medium uppercase tracking-[0.08em]">{title}</h3>
      {children}
    </div>
  )
}

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <Meta
        title="Experience"
        description="Four companies in order of weight: Lumida Wealth, Paysys Labs, Teresol and Medicon. Responsibilities, achievements and technologies for each role."
      />
      <section className="grid gap-14 px-6 pb-16 pt-[110px] md:px-10 md:pb-24 md:pt-40">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>
            Experience
            <br />
            2021 — present
          </SectionLabel>
          <h1 className="m-0 font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[clamp(56px,7vw,112px)]">
            Four companies,
            <br />
            in order of weight.
          </h1>
        </div>

        <ul className="m-0 list-none p-0">
          {roles.map((role, i) => {
            const isOpen = open === i
            return (
              <li key={role.id} className="border-t border-ink/15">
                <h2 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`role-${role.id}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`grid w-full items-baseline gap-2 py-7 text-left transition-[color,padding] duration-[400ms] ease-out md:grid-cols-[160px_1fr_260px] md:gap-6 ${isOpen ? 'text-accent md:pl-4' : ''}`}
                  >
                    <span className="font-mono text-[11px] text-ink/65">{role.dates}</span>
                    <span className="font-display text-[40px] font-medium leading-[0.95] tracking-[-0.045em] md:text-[clamp(44px,6vw,96px)]">
                      {role.company}
                    </span>
                    <span className="text-[14px] text-ink/70">{role.position}</span>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`role-${role.id}`}
                      key="detail"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="grid gap-6 pb-10 md:grid-cols-[220px_1fr] md:gap-10"
                    >
                      <span className="text-[13px] text-ink/65">{role.location}</span>
                      <div className="grid max-w-[860px] gap-8">
                        <p className="m-0 font-display text-[22px] leading-[1.25] tracking-[-0.02em] md:text-[clamp(22px,2.2vw,32px)]">
                          {role.description}
                        </p>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
                          <Column title="Responsibilities">
                            {role.responsibilities.map((item) => (
                              <p key={item} className="m-0 text-[14px] leading-[1.5] text-ink/80">
                                {item}
                              </p>
                            ))}
                          </Column>
                          <Column title="Achievements">
                            {role.achievements.map((item) => (
                              <p key={item} className="m-0 text-[14px] leading-[1.5] text-ink/80">
                                {item}
                              </p>
                            ))}
                          </Column>
                          <Column title="Technologies">
                            <p className="m-0 text-[14px] leading-[1.6] text-ink/80">{role.tech.join(', ')}</p>
                          </Column>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
