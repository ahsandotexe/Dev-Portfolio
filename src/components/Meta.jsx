import { useEffect } from 'react'
import { site } from '../data/portfolio.js'

const DEFAULT_TITLE = `${site.titleSuffix} — Senior Software Engineer`

/** Per-route document title, description and canonical/og URL. Renders nothing. */
export default function Meta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.titleSuffix}` : DEFAULT_TITLE
    document.title = fullTitle
    const set = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el && value) el.setAttribute(attr, value)
    }
    const url = site.url + window.location.pathname
    set('meta[property="og:title"]', 'content', fullTitle)
    set('meta[name="twitter:title"]', 'content', fullTitle)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:url"]', 'content', url)
    if (description) {
      set('meta[name="description"]', 'content', description)
      set('meta[property="og:description"]', 'content', description)
      set('meta[name="twitter:description"]', 'content', description)
    }
  }, [title, description])
  return null
}
