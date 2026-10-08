import { useLocation } from 'react-router-dom'
import { AnimatePresence, m, useScroll } from 'framer-motion'
import { nav } from '../data/portfolio.js'
import { EASE } from '../lib/motion.js'

/** Desktop-only rail on the right: page ordinal that masks in, scroll progress, page label. */
export default function PageRail() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const segment = '/' + pathname.split('/')[1]
  const index = Math.max(0, nav.findIndex((n) => n.to === segment))
  const ordinal = String(index + 1).padStart(2, '0')

  return (
    <div
      aria-hidden="true"
      className="blend-difference pointer-events-none fixed right-10 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 text-white md:flex"
    >
      <span className="inline-block overflow-hidden font-display text-[28px] font-medium leading-none tracking-[-0.04em]">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={ordinal}
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '-110%', transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {ordinal}
          </m.span>
        </AnimatePresence>
      </span>
      <div className="h-[140px] w-px bg-white/30">
        <m.div className="h-full w-full origin-top bg-white" style={{ scaleY: scrollYProgress }} />
      </div>
      <span className="font-mono text-[10px] opacity-70 [writing-mode:vertical-rl]">
        {nav[index].label} / {String(nav.length).padStart(2, '0')}
      </span>
    </div>
  )
}
