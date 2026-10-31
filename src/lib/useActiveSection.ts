import { useEffect, useState } from 'react'
import type { SectionId } from './router'

/** The section currently under the navigation bar, for the active nav link. */
export function useActiveSection(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
        setActive(best && best[1] > 0 ? (best[0] as SectionId) : null)
      },
      { rootMargin: '-72px 0px -45% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
