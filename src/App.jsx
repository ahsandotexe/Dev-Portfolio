// Phase 2 checkpoint: foundation only (tokens, fonts, theme, data). Pages and components arrive in Phase 3.
import { useTheme } from './hooks/useTheme.js'
import { person, hero } from './data/portfolio.js'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <main id="main" className="mx-auto min-h-screen max-w-frame px-6 py-5 md:px-10 md:py-8">
      <header className="flex items-start justify-between text-sm font-medium">
        <span className="font-display leading-tight">
          {person.name}
          <br />
          <span className="font-sans text-[11px] font-normal text-ink/70">{person.shortTitle}</span>
        </span>
        <button type="button" onClick={toggle} className="border-b border-ink pb-1 hover:text-accent hover:border-accent">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>
      <h1 className="mt-24 font-display text-[15vw] font-medium uppercase leading-[0.92] tracking-[-0.05em] md:text-[clamp(80px,11.5vw,190px)]">
        {hero.lines.map((line, i) => (
          <span key={line} className={`block ${i === 3 ? 'text-accent' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-10 max-w-[380px] text-[15px] leading-[1.55] text-ink/75">{hero.lede}</p>
    </main>
  )
}
