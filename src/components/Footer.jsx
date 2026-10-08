import { person } from '../data/portfolio.js'

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-ink/12 px-6 py-6 text-[12px] text-ink/65 md:px-10">
      <span>
        © {new Date().getFullYear()} {person.name}
      </span>
      <span>Set in Space Grotesk &amp; Inter · Built with React, Framer Motion and Tailwind</span>
    </footer>
  )
}
