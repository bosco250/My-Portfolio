import Box from '@mui/material/Box'
import { navy, neutral } from '../theme/tokens'

/**
 * Square mark with a geometric letter. Navy with a white letter on light
 * surfaces; inverse (white with a navy letter) on navy chrome.
 */
export default function ProductMark({ size = 32, inverse = false }: { size?: number; inverse?: boolean }) {
  const field = inverse ? neutral.white : navy.primary
  const letter = inverse ? navy.primary : neutral.white

  return (
    <Box component="svg" viewBox="0 0 32 32" aria-hidden sx={{ width: size, height: size, flexShrink: 0, display: 'block', borderRadius: 0.5 }}>
      <rect width="32" height="32" fill={field} />
      <path d="M11 9H21M18 9V19A4 4 0 0 1 10 19" stroke={letter} strokeWidth="3" strokeLinecap="square" fill="none" />
    </Box>
  )
}
