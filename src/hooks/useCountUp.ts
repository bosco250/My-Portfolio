import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, start])

  return value
}
