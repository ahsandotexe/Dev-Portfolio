import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps keyboard focus inside `ref` while `active`, locks body scroll, closes on Escape,
 * and returns focus to the previously focused element when it deactivates.
 * Pass stable callbacks (useCallback) so the trap does not re-initialise on every render.
 */
export function useFocusTrap(ref, active, { onEscape, initialFocus } = {}) {
  useEffect(() => {
    if (!active) return undefined
    const node = ref.current
    if (!node) return undefined
    const previous = document.activeElement
    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null)

    const raf = requestAnimationFrame(() => {
      const target = initialFocus?.current || focusables()[0] || node
      target.focus({ preventScroll: true })
    })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onEscape?.()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || !node.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !node.contains(document.activeElement))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true })
    }
  }, [ref, active, onEscape, initialFocus])
}
