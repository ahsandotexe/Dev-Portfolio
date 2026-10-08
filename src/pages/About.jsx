import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import portrait from '../assets/portrait.webp'
import { about, person, philosophy, skills } from '../data/portfolio.js'

export default function About() {
  return (
    <>
      <Meta
        title="About"
        description="Profile of Ahsan Iftikhar: an engineer who draws the line between deterministic computation and LLM judgment. Philosophy, skills and technologies."
      />
      <section className="grid gap-[72px] px-6 pb-16 pt-[110px] md:px-10 md:pb-24 md:pt-40">
        <div className="grid items-stretch gap-12 md:grid-cols-[1.3fr_1fr]">
          <div className="grid min-w-0 grid-rows-[1fr_auto] gap-10">
            <h1 className="m-0 text-balance font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[clamp(56px,7vw,112px)]">
              {about.headline[0]}
              <br />
              {about.headline[1]}
              <br />
              <span className="text-accent">{about.headline[2]}</span>
            </h1>
            <div className="grid max-w-[640px] gap-5 border-t border-ink/15 pt-6">
              <SectionLabel>Introduction</SectionLabel>
              <p className="m-0 font-display text-[22px] leading-[1.25] tracking-[-0.02em] md:text-[clamp(22px,2.2vw,32px)]">{about.lead}</p>
              <p className="m-0 text-[16px] leading-[1.6] text-ink/75">{about.body}</p>
            </div>
          </div>
          {/* Fixed 3:4 plate below 820px; on desktop the grid row stretches it to the text column's height. */}
          <div className="relative aspect-[3/4] bg-plate md:aspect-auto md:min-h-[560px]">
            <img
              src={portrait}
              alt={`${person.name}, portrait`}
              width="900"
              height="1200"
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
              style={{ objectPosition: '50% 40%' }}
            />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>Philosophy</SectionLabel>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-10 p-0">
            {philosophy.map((item) => (
              <li key={item.title} className="grid gap-2.5 border-t border-ink pt-4">
                <h2 className="m-0 font-display text-[22px] font-medium tracking-[-0.02em]">{item.title}</h2>
                <p className="m-0 text-[14px] leading-[1.6] text-ink/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>Skills &amp; technologies</SectionLabel>
          <dl className="m-0 grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="grid items-baseline gap-4 border-t border-ink/12 py-[18px] md:grid-cols-[180px_1fr]">
                <dt className="text-[13px] font-medium">{category}</dt>
                <dd className="m-0 font-display text-[18px] leading-[1.3] tracking-[-0.02em] text-ink/85 md:text-[22px]">{items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>Off the clock</SectionLabel>
          <p className="m-0 max-w-[640px] text-[16px] leading-[1.6] text-ink/75">{about.offTheClock}</p>
        </div>
      </section>
    </>
  )
}
