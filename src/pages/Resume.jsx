import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { certificates, coreSkillsLine, person, projects, roles, skills } from '../data/portfolio.js'

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
        description="Download Ahsan Iftikhar's two-page resume as a PDF, with an experience summary, education, core skills, technologies and certificates."
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
                download="Ahsan_Iftikhar_Resume.pdf"
                className="flex h-[52px] items-center gap-3 bg-ink px-6 text-[14px] font-medium text-paper transition-colors hover:bg-accent"
              >
                Download PDF <span aria-hidden="true">↓</span>
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
              <p className="m-0 font-display text-[18px] leading-[1.35] tracking-[-0.02em] md:text-[22px]">{coreSkillsLine}</p>
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

          <a
            href={person.resume.href}
            aria-label="Open the resume PDF"
            className="grid aspect-[8.5/11] content-start gap-3.5 overflow-hidden border border-ink/12 bg-doc p-7 text-[10px] leading-[1.5] text-doc-ink shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-transform duration-[400ms] ease-out hover:-translate-y-1 md:p-9"
          >
            <span className="font-display text-[20px] font-medium tracking-[-0.03em]">{person.name}</span>
            <span className="text-doc-ink/65">
              {person.title} · {person.tagline}
            </span>
            <span className="h-px bg-doc-ink" />
            <span>
              <strong>Summary</strong>
              <br />
              {person.summary}
            </span>
            <span>
              <strong>Experience</strong>
            </span>
            {roles.map((role) => (
              <span key={role.id} className="flex justify-between gap-2">
                <span>
                  {role.position}, {role.company}
                </span>
                <span className="whitespace-nowrap text-doc-ink/60">{role.dates}</span>
              </span>
            ))}
            <span>
              <strong>Selected projects</strong>
            </span>
            {projects.slice(0, 6).map((p) => (
              <span key={p.id} className="flex justify-between gap-2">
                <span>{p.name}</span>
                <span className="whitespace-nowrap text-doc-ink/60">{p.kicker}</span>
              </span>
            ))}
          </a>
        </div>
      </section>
    </>
  )
}
