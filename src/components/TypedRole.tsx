import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { keyframes } from '@mui/material/styles'
import { gold } from '../theme/tokens'

const blink = keyframes`
  0%, 45% { opacity: 1; }
  50%, 95% { opacity: 0; }
  100% { opacity: 1; }
`

const TYPE_MS = 70
const ERASE_MS = 35
const HOLD_MS = 1900
const GAP_MS = 350

/**
 * Types each role, holds it, erases it, then moves to the next one, like
 * someone writing live. A thin gold pen line sits under the word (::before) and
 * a blinking gold caret follows it (::after).
 *
 * Decorative only: callers give screen readers the full sentence separately.
 * With reduced motion the first role is shown, still.
 */
export default function TypedRole({ roles }: { roles: string[] }) {
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduced ? roles[0] : '')
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    if (reduced) return
    const full = roles[index]
    let delay: number
    let next: () => void
    if (!erasing && text.length < full.length) {
      delay = text.length === 0 ? GAP_MS : TYPE_MS
      next = () => setText(full.slice(0, text.length + 1))
    } else if (!erasing) {
      delay = HOLD_MS
      next = () => setErasing(true)
    } else if (text.length > 0) {
      delay = ERASE_MS
      next = () => setText(full.slice(0, text.length - 1))
    } else {
      delay = 0
      next = () => {
        setErasing(false)
        setIndex((i) => (i + 1) % roles.length)
      }
    }
    const t = window.setTimeout(next, delay)
    return () => window.clearTimeout(t)
  }, [text, erasing, index, roles, reduced])

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        position: 'relative',
        zIndex: 0,
        display: 'inline-block',
        minWidth: '0.5ch',
        fontWeight: 600,
        fontStyle: 'italic',
        whiteSpace: 'nowrap',
        // Thin pen underline under the word, slightly tilted like a hand stroke.
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '0.02em',
          right: '0.3em',
          bottom: '-0.02em',
          height: '0.07em',
          minHeight: '2px',
          borderRadius: '999px',
          backgroundColor: gold.active,
          transform: 'rotate(-0.6deg)',
          opacity: text ? 0.9 : 0,
          zIndex: -1,
          transition: 'opacity 200ms',
        },
        // Caret.
        '&::after': {
          content: '""',
          display: reduced ? 'none' : 'inline-block',
          width: '2px',
          height: '0.95em',
          ml: '0.08em',
          verticalAlign: '-0.1em',
          backgroundColor: gold.active,
          animation: `${blink} 1s steps(1) infinite`,
        },
      }}
    >
      {text}
    </Box>
  )
}
