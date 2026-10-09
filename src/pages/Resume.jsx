import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import page1 from '../assets/resume-page-1.webp'
import page2 from '../assets/resume-page-2.webp'
import { certificates, coreSkillsLine, person, roles, skills } from '../data/portfolio.js'

// Renders of the real PDF, regenerated whenever public/Ahsan_Iftikhar_Resume.pdf changes.
const pages = [page1, page2]

function Block({ title, children }) {
  return (
    <section className="grid gap-4 border-t border-ink pt-4">
      <h2 className="m-0 text-[12px] font-medium uppercase tracking-[0.08em]">{title}</h2>
      {children}
    </section>
  )
}

export default function Resume() {
  const techLine = Object.values(skills).flat().join(', ')
  return (
    <>
      <Meta
        title="Resume"
        description="Open Ahsan Iftikhar's two-page resume as a PDF, with an experience summary, education, core skills, technologies and certificates."
      />
      <section className="grid gap-16 px-6 pb-16 pt-[110px] md:px-10 md:pb-24 md:pt-40">
        <div className="grid items-end gap-10 md:grid-cols-[220px_1fr]">
          <SectionLabel>
            Resume
            <br />
            Updated {person.resume.updated}
          </SectionLabel>
          <div className="grid gap-6">
            <h1 className="m-0 font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[clamp(56px,7vw,112px)]">
              Everything above,
              <br />
              on two pages.
            </h1>
            <div className="flex flex-wrap items-center gap-7">
              <a
                href={person.resume.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-[52px] items-center gap-3 bg-ink px-6 text-[14px] font-medium text-paper transition-colors hover:bg-accent"
              >
                Open PDF <span aria-hidden="true">↗</span>
              </a>
              <a
                href={person.resume.href}
                download="Ahsan_Iftikhar_Resume.pdf"
                className="border-b border-ink pb-1 text-[13px] font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Download <span aria-hidden="true">↓</span>
              </a>
              <span className="text-[13px] text-ink/65">
                PDF · {person.resume.pages} pages · {person.resume.size}
              </span>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[1fr_400px]">
          <div className="grid gap-10">
            <Block title="Experience summary">
              {roles.map((role) => (
                <div key={role.id} className="grid grid-cols-[120px_1fr] gap-4 text-[14px] leading-[1.5]">
                  <span className="font-mono text-[11px] text-ink/65">{role.short}</span>
                  <span>
                    <span className="font-medium">{role.company}</span>
                    <br />
                    <span className="text-ink/65">{role.position}</span>
                  </span>
                </div>
              ))}
            </Block>
            <Block title="Education">
              <p className="m-0 text-[14px] leading-[1.5]">
                <span className="font-medium">{person.education.degree}</span>
                <br />
                <span className="text-ink/65">
                  {person.education.school} · {person.education.dates}
                </span>
              </p>
            </Block>
            <Block title="Core skills">
              <p className="m-0 font-display text-[18px] leading-[1.35] tracking-[-0.02em] md:text-[22px]">
                {coreSkillsLine}
              </p>
            </Block>
            <Block title="Technologies">
              <p className="m-0 text-[14px] leading-[1.7] text-ink/80">{techLine}</p>
            </Block>
            <Block title="Certificates">
              <ul className="m-0 grid list-none gap-2 p-0 text-[14px] leading-[1.5]">
                {certificates.map((c) => (
                  <li key={c.name} className="grid grid-cols-[120px_1fr] gap-4">
                    <span className="font-mono text-[11px] text-ink/65">{c.date}</span>
                    <span>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-ink/65"> · {c.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* The two real pages, each a link that opens the PDF in a new tab. */}
          <div className="grid gap-6">
            {pages.map((src, i) => (
              <a
                key={src}
                href={person.resume.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the resume PDF in a new tab (page ${i + 1} of ${pages.length})`}
                className="block transition-transform duration-[400ms] ease-out hover:-translate-y-1 focus-visible:-translate-y-1"
              >
                <img
                  src={src}
                  alt={`Resume page ${i + 1} of ${pages.length}`}
                  width="900"
                  height="1165"
                  loading="lazy"
                  decoding="async"
                  className="block w-full border border-ink/12 bg-doc shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
