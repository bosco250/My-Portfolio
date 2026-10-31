import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { dotField, dashedRing } from '../theme/backdrops'
import { focusRing, font, gold, navy, neutral } from '../theme/tokens'
import Reveal from './Reveal'

export type Tone = 'white' | 'tint' | 'navy'

/** A faded illustration painted behind the section with ::after. */
export interface SectionArt {
  src: string
  /** CSS position of the box, e.g. { right: -40, bottom: 0 }. */
  at: Record<string, number | string>
  width: number
  /** Aspect ratio of the artwork, width / height. */
  ratio: number
  opacity?: number
}

interface Props {
  id?: string
  tone?: Tone
  /** Code-style label: "skills" renders as <skills />. */
  tag?: string
  title?: ReactNode
  lede?: ReactNode
  center?: boolean
  /** Dot field (::before) and dashed ring (::after) in the corners. */
  decor?: boolean
  art?: SectionArt
  children: ReactNode
  sx?: SxProps<Theme>
  labelledBy?: string
}

const toneSx = {
  white: { backgroundColor: neutral.white },
  tint: { backgroundColor: neutral.canvas },
  navy: { backgroundColor: navy.primary, color: neutral.sidebarText, '& :focus-visible': focusRing.navy },
}

export default function Section({ id, tone = 'white', tag, title, lede, center = false, decor = false, art, children, sx, labelledBy }: Props) {
  const headingId = id ? `${id}-title` : undefined
  const onNavy = tone === 'navy'

  return (
    <Box
      component="section"
      id={id}
      tabIndex={id ? -1 : undefined}
      aria-labelledby={title || labelledBy ? (labelledBy ?? headingId) : undefined}
      sx={[
        { position: 'relative', isolation: 'isolate', overflow: 'hidden', outline: 'none', py: { xs: 16, md: 24 } },
        toneSx[tone],
        decor
          ? {
              '&::before': { ...dotField(onNavy), top: 32, right: { xs: -40, md: 40 } },
              ...(art ? {} : { '&::after': { ...dashedRing(onNavy), bottom: -60, left: -60 } }),
              '@media print, (forced-colors: active)': { '&::before, &::after': { display: 'none' } },
            }
          : {},
        art
          ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                pointerEvents: 'none',
                width: art.width,
                aspectRatio: String(art.ratio),
                ...art.at,
                backgroundImage: `url("${art.src}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                opacity: art.opacity ?? 0.14,
                display: { xs: 'none', md: 'block' },
              },
              '@media print, (forced-colors: active)': { '&::after': { display: 'none' } },
            }
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 5, sm: 8 } }}>
        {title && (
          <Reveal sx={{ maxWidth: center ? 720 : 640, mx: center ? 'auto' : 0, textAlign: center ? 'center' : 'left', mb: { xs: 10, md: 14 } }}>
            {tag && <CodeTag onNavy={onNavy}>{tag}</CodeTag>}
            <Typography variant="h2" id={headingId} sx={onNavy ? { color: neutral.white } : undefined}>
              {title}
            </Typography>
            {lede && (
              <Typography variant="body1" sx={{ mt: 4, color: onNavy ? neutral.sidebarText : neutral.inkSoft }}>
                {lede}
              </Typography>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </Box>
  )
}

/** Code-style label above a heading: <skills /> */
export function CodeTag({ children, onNavy = false }: { children: ReactNode; onNavy?: boolean }) {
  return (
    <Typography
      component="p"
      sx={{ fontFamily: font.mono, fontSize: '0.8125rem', fontWeight: 500, mb: 3, color: onNavy ? gold.onNavy : gold.text }}
    >
      {'<'}
      {children}
      {' />'}
    </Typography>
  )
}

/**
 * Highlighted words in a heading: a gold highlighter stroke drawn with ::after,
 * behind the text, so the words stay navy and fully readable.
 */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        zIndex: 0,
        display: 'inline-block',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '-0.06em',
          right: '-0.06em',
          bottom: '0.06em',
          height: '0.32em',
          backgroundColor: gold.active,
          opacity: 0.45,
          borderRadius: 999,
          zIndex: -1,
        },
      }}
    >
      {children}
    </Box>
  )
}

/** Italic serif line, for taglines. */
export function Tagline({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Typography
      component="p"
      sx={[{ fontFamily: font.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.15, color: navy.primary }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Typography>
  )
}
