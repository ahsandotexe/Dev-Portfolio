import { Link } from 'react-router-dom'

const labelClass = 'text-[11px] uppercase tracking-[0.08em] text-ink/65'

function Cell({ label, children }) {
  return (
    // content-start keeps label and value together when a neighbouring cell in the row is taller.
    <div className="grid content-start gap-1.5">
      <span className={labelClass}>{label}</span>
      <span className="text-[13px] leading-[1.55]">{children}</span>
    </div>
  )
}

/**
 * One featured project as a compact editorial spread on the home page: the Projects page's
 * vocabulary (eyebrow, title, description, Problem / Solution, Role / Impact / Stack / Domain,
 * links, 4:5 plate with the metric) sized to sit three in a list.
 */
export default function FeaturedProject({ project }) {
  const href = `/projects/${project.id}`

  return (
    <article className="grid gap-8 md:grid-cols-[1fr_clamp(280px,36vw,420px)] md:items-start md:gap-12 lg:gap-16">
      <div className="order-2 grid gap-7 md:order-1">
        <div className="grid gap-3">
          <span className="font-mono text-[11px] text-accent">
            {project.num} — {project.kicker}
          </span>
          <h3 className="m-0 text-balance font-display text-[28px] font-medium leading-[1] tracking-[-0.04em] md:text-[clamp(28px,3.4vw,52px)]">
            <Link to={href} className="transition-colors hover:text-accent">
              {project.name}
            </Link>
          </h3>
        </div>
        <p className="m-0 max-w-[480px] text-[16px] leading-[1.55] text-ink/80">{project.description}</p>
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
          <Link to={href} className="border-b border-current pb-px transition-colors hover:text-accent">
            Open case study <span aria-hidden="true">→</span>
          </Link>
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

      {/* 4:5 plate: the illustration is 1200×1500, so it fits exactly at any width. Plate first on phones. */}
      <div className="relative order-1 aspect-[4/5] overflow-hidden bg-[#0A162D] md:order-2">
        <img
          src={project.img}
          alt={`${project.name}: ${project.kicker}`}
          width="1200"
          height="1500"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-[rgba(10,22,45,0)] to-[rgba(10,22,45,0.92)]"
        />
        <span className="absolute bottom-5 left-5 font-display text-[56px] font-medium leading-none tracking-[-0.04em] text-[#F9F9F9]">
          {project.metric}
        </span>
        <span className="absolute bottom-6 right-5 text-[12px] text-[#F9F9F9]/85">{project.metricLabel}</span>
      </div>
    </article>
  )
}
