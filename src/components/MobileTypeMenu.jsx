import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../data/portfolio.js'
import { useContact } from '../hooks/useContact.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useTheme } from '../hooks/useTheme.js'
import { EASE } from '../lib/motion.js'

/** Full-screen ink panel with masked 52px type. Focus is trapped; Escape closes. */
export default function MobileTypeMenu({ open, onClose }) {
  const ref = useRef(null)
  const { openContact } = useContact()
  const { theme, toggle } = useTheme()
  useFocusTrap(ref, open, { onEscape: onClose })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[35] flex flex-col bg-ink px-6 pb-8 pt-24 text-paper md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav aria-label="Primary" className="flex flex-col">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className="flex items-baseline gap-4 overflow-hidden py-1.5"
              >
                {({ isActive }) => (
                  <>
                    <span className="font-mono text-[11px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
                    <motion.span
                      className={`inline-block font-display text-[52px] font-medium leading-[1.05] tracking-[-0.04em] ${isActive ? 'text-accent' : ''}`}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                    >
                      {item.label}
                    </motion.span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto grid gap-5 border-t border-paper/20 pt-5">
            <button
              type="button"
              onClick={() => {
                onClose()
                openContact()
              }}
              className="flex items-center justify-between text-left text-[16px]"
            >
              Get in touch <span aria-hidden="true">→</span>
            </button>
            <div className="flex justify-between text-[13px] opacity-80">
              <button type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
                {theme === 'dark' ? 'Light theme' : 'Dark theme'}
              </button>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
