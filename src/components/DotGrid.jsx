import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme.js'

/**
 * Dot grid that displaces around the cursor with a slow sine wobble (2D canvas, no WebGL).
 * One static frame under prefers-reduced-motion; pauses when the tab is hidden.
 */
export default function DotGrid() {
  const ref = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const [r, g, b] = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim().split(/\s+/)
    const fill = `rgba(${r}, ${g}, ${b}, 0.55)`

    let raf = 0
    let running = true
    let W = 0
    let H = 0
    let dpr = 1
    let step = 44
    let R = 260
    let t = 0
    const mouse = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

    const draw = (once) => {
      cur.x += (mouse.x - cur.x) * 0.08
      cur.y += (mouse.y - cur.y) * 0.08
      t += 0.01
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = fill
      for (let x = step; x < W; x += step) {
        for (let y = step; y < H; y += step) {
          const dx = x - cur.x
          const dy = y - cur.y
          const d = Math.hypot(dx, dy)
          const f = Math.max(0, 1 - d / R)
          const push = f * f * 36 * dpr
          const ox = d ? (dx / d) * push : 0
          const oy = d ? (dy / d) * push : 0
          const wob = reduced ? 0 : Math.sin(t + x * 0.002 + y * 0.003) * 1.5 * dpr
          const s = (1 + f * 2.2) * dpr
          ctx.beginPath()
          ctx.arc(x + ox + wob, y + oy, s, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!reduced && !once && running) raf = requestAnimationFrame(() => draw(false))
    }

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = canvas.width = Math.round(rect.width * dpr)
      H = canvas.height = Math.round(rect.height * dpr)
      step = (rect.width < 820 ? 34 : 44) * dpr
      R = 260 * dpr
      mouse.x = cur.x = W * 0.7
      mouse.y = cur.y = H * 0.35
      draw(true)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * dpr
      mouse.y = (e.clientY - rect.top) * dpr
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced && !running) {
        running = true
        raf = requestAnimationFrame(() => draw(false))
      }
    }

    const observer = new ResizeObserver(size)
    observer.observe(canvas)
    parent.addEventListener('pointermove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    size()
    if (!reduced) raf = requestAnimationFrame(() => draw(false))

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [theme])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block h-full w-full opacity-90" />
}
