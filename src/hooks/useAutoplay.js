import { useEffect, useRef } from 'react'

/**
 * Countdown that calls `onAdvance` once every `intervalMs` while `active`.
 *
 * - Pausing (`active` false) holds the elapsed time; resuming continues from where it stopped.
 * - A change of `resetKey` (the current slide) restarts the countdown from zero.
 * - If `fillRef` points at an element, it is driven as a progress bar: a CSS transition on
 *   `transform` from the held fraction to `scaleX(1)` over the remaining time, frozen while paused.
 *
 * One effect owns the timer; `onAdvance` is read through a ref so a new callback identity
 * (for example a fresh `navigate` after a route change) never restarts the countdown by itself.
 */
export function useAutoplay({ active, intervalMs, resetKey, onAdvance, fillRef }) {
  const elapsedRef = useRef(0)
  const onAdvanceRef = useRef(onAdvance)

  useEffect(() => {
    onAdvanceRef.current = onAdvance
  })

  // Declared before the timer effect so it runs first when the slide changes.
  useEffect(() => {
    elapsedRef.current = 0
  }, [resetKey])

  useEffect(() => {
    if (!active) return undefined
    const fill = fillRef?.current
    const startedAt = performance.now()
    const remaining = Math.max(0, intervalMs - elapsedRef.current)

    if (fill) {
      // Pin the held value without a transition, flush styles, then transition to full over the rest of the interval.
      fill.style.transition = 'none'
      fill.style.transform = `scaleX(${elapsedRef.current / intervalMs})`
      fill.getBoundingClientRect()
      fill.style.transition = `transform ${remaining}ms linear`
      fill.style.transform = 'scaleX(1)'
    }

    const timer = setTimeout(() => onAdvanceRef.current(), remaining)

    return () => {
      clearTimeout(timer)
      elapsedRef.current = Math.min(intervalMs, elapsedRef.current + performance.now() - startedAt)
      if (fill) {
        fill.style.transition = 'none'
        fill.style.transform = `scaleX(${elapsedRef.current / intervalMs})`
      }
    }
  }, [active, intervalMs, resetKey, fillRef])
}
