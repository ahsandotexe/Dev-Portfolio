import { Link } from 'react-router-dom'
import Meta from '../components/Meta.jsx'
import SectionLabel from '../components/SectionLabel.jsx'

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found" description="That page does not exist." />
      <section className="grid min-h-[70vh] content-start gap-10 px-6 pb-16 pt-[110px] md:grid-cols-[220px_1fr] md:px-10 md:pb-24 md:pt-40">
        <SectionLabel>Error 404</SectionLabel>
        <div className="grid gap-6">
          <h1 className="m-0 font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:text-[clamp(56px,7vw,112px)]">
            No such page.
          </h1>
          <p className="m-0 max-w-[480px] text-[16px] leading-[1.55] text-ink/75">
            The address may be mistyped, or the page moved when the site was redesigned.
          </p>
          <Link
            to="/"
            className="justify-self-start border-b border-ink pb-1 text-[13px] font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Back to the start <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
