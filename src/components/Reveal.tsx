import { useEffect, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { keyframes, type SxProps, type Theme } from '@mui/material/styles'

const rise = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
`

/**
 * Fades content up as it enters the viewport, once. With reduced motion the
 * content is simply there. Meaning never depends on the motion.
 */
export default function Reveal({ children, delay = 0, sx, onLoad = false }: { children: ReactNode; delay?: number; sx?: SxProps<Theme>; /** Animate on page load instead of on scroll, for content above the fold. */ onLoad?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(
    () => onLoad || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (shown || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Box
      ref={ref}
      sx={[
        onLoad
          ? { animation: `${rise} 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms both` }
          : {
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(14px)',
              transition: `opacity 500ms ease-out ${delay}ms, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
              '@media print': { opacity: 1, transform: 'none' },
            },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
