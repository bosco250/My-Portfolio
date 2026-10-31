import Box from '@mui/material/Box'
import { gold, navy, neutral } from '../theme/tokens'

/**
 * The "jb" mark. Lowercase initials drawn as one rounded pen stroke; the dot
 * of the j is a gold building block set slightly off-square, as if placed by
 * hand: the next piece of the work.
 *
 * Navy tile with white letters on light surfaces; inverse (white tile, navy
 * letters) on navy surfaces. The gold block stays the same on both.
 */
export default function ProductMark({ size = 32, inverse = false }: { size?: number; inverse?: boolean }) {
  const tile = inverse ? neutral.white : navy.primary
  const ink = inverse ? navy.primary : neutral.white

  return (
    <Box component="svg" viewBox="0 0 64 64" aria-hidden sx={{ width: size, height: size, flexShrink: 0, display: 'block' }}>
      <rect width="64" height="64" rx="15" fill={tile} />
      <g fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 0)">
        {/* j: stem and hook */}
        <path d="M24 28V44a7 7 0 0 1-12 5" />
        {/* b: stem and bowl */}
        <path d="M33 14V44" />
        <path d="M33 37a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0-15 0" />
      </g>
      {/* The block: the dot of the j */}
      <rect x="21.5" y="15" width="9" height="9" rx="2.2" fill={gold.active} transform="rotate(-6 26 19.5)" />
    </Box>
  )
}
