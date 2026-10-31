import Box from '@mui/material/Box'
import { font, gold, navy } from '../theme/tokens'

/** Small mono pill, the house style for technologies. Render inside a <ul>. */
export default function TechPill({ label, tone = 'navy' }: { label: string; tone?: 'navy' | 'gold' }) {
  return (
    <Box
      component="li"
      sx={{
        px: 2.5,
        py: 0.75,
        borderRadius: 999,
        fontFamily: font.mono,
        fontSize: '0.75rem',
        lineHeight: 1.6,
        color: tone === 'gold' ? gold.text : navy.primary,
        backgroundColor: tone === 'gold' ? gold.soft : navy.tint,
        border: `1px solid ${tone === 'gold' ? gold.light : navy.soft}`,
      }}
    >
      {label}
    </Box>
  )
}
