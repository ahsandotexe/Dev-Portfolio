import { Link, NavLink } from 'react-router-dom'
import { nav, person } from '../data/portfolio.js'
import { useContact } from '../hooks/useContact.js'
import { useTheme } from '../hooks/useTheme.js'

const itemClass =
  'pointer-events-auto flex flex-col items-start gap-1 text-[13px] font-medium transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100'

function ThemeGlyph() {
  return (
    <span aria-hidden="true" className="flex h-[13px] items-center">
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 .6a4.4 4.4 0 0 1 0 8.8z" fill="currentColor" />
      </svg>
    </span>
  )
}

/** Fixed header in difference blend: name top-left, numbered nav top-right, Menu on mobile. */
export default function CornerNav({ menuOpen, onToggleMenu }) {
  const { openContact } = useContact()
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <header className="blend-difference pointer-events-none fixed inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex max-w-frame items-start justify-between px-6 py-5 md:px-10 md:py-8">
        <Link to="/" className="pointer-events-auto font-display text-[14px] font-medium leading-[1.3] tracking-[0.02em]">
          {person.name}
          <br />
          <span className="font-sans text-[11px] font-normal opacity-70">{person.shortTitle}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-start gap-7 md:flex">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `${itemClass} ${isActive ? 'opacity-100' : 'opacity-60'}`}
            >
              {({ isActive }) => (
                <>
                  <span className="font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`h-px w-full origin-left bg-current transition-transform duration-[400ms] ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <button type="button" onClick={openContact} className={`${itemClass} opacity-60`}>
            <span className="font-mono text-[10px]">06</span>
            Contact
            <span aria-hidden="true" className="h-px w-full" />
          </button>
          <button type="button" onClick={toggle} aria-label={`Switch to ${nextTheme} theme`} className={`${itemClass} opacity-60`}>
            <ThemeGlyph />
            {nextTheme === 'dark' ? 'Dark' : 'Light'}
            <span aria-hidden="true" className="h-px w-full" />
          </button>
        </nav>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="pointer-events-auto h-11 text-[13px] font-medium tracking-[0.04em] md:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
