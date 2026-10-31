import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { navy } from '../theme/tokens'

/** Icon on a soft navy circle, used on cards. */
export default function IconCircle({ children, size = 44 }: { children: ReactNode; size?: number }) {
  return (
    <Box aria-hidden sx={{ width: size, height: size, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', backgroundColor: navy.tint, color: navy.primary, '& svg': { fontSize: size * 0.48 } }}>
      {children}
    </Box>
  )
}
