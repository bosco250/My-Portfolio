import { useSyncExternalStore } from 'react'

// One page, one addressable record: an open case study lives in the address
// (#/work/zahabucore) so refresh and sharing work on any static host.

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

/** The id of the open case study, or null. */
export function useCaseStudyId(): string | null {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  const match = hash.match(/^#\/work\/([^/]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export const caseStudyHref = (id: string) => `#/work/${encodeURIComponent(id)}`

export function openCaseStudy(id: string) {
  window.location.hash = caseStudyHref(id)
}

/** Close without adding a history entry or jumping the page. */
export function closeCaseStudy() {
  history.replaceState(null, '', window.location.pathname + window.location.search)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export const sectionIds = ['work', 'experience', 'skills', 'about', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]

export function scrollToSection(id: SectionId | 'top') {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (id === 'top') return window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  // Move focus for keyboard and screen reader users without a second scroll.
  el.focus({ preventScroll: true })
}
