import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import NorthEast from '@mui/icons-material/NorthEast'
import OpenInNew from '@mui/icons-material/OpenInNew'
import LockOutlined from '@mui/icons-material/LockOutlined'
import PhotoLibraryOutlined from '@mui/icons-material/PhotoLibraryOutlined'
import { domain, type Project } from '../../lib/records'
import { caseStudyHref } from '../../lib/router'
import { blob, dotCluster } from '../../theme/backdrops'
import { alpha, focusRing, font, gold, motion, navy, neutral, shadow, status } from '../../theme/tokens'

const coverDots = dotCluster(alpha(neutral.white, 0.2), 5, 4, 16)

const overlayPill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1.5,
  height: 26,
  px: 2.5,
  borderRadius: 6,
  fontFamily: font.mono,
  fontSize: '0.6875rem',
  color: neutral.white,
  backgroundColor: alpha(navy.deep, 0.72),
  backdropFilter: 'blur(6px)',
} as const

/** Left half: the screenshot, or a branded panel for private work. */
function Visual({ project: p, index }: { project: Project; index: number }) {
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading')
  const shot = Boolean(p.screenshot) && state !== 'failed'

  return (
    <Box sx={{ position: 'relative', minHeight: { xs: 220, sm: '100%' }, backgroundColor: navy.primary, overflow: 'hidden', isolation: 'isolate' }}>
      {shot ? (
        <>
          {state === 'loading' && <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%', borderRadius: 0 }} />}
          <Box
            component="img"
            src={p.screenshot}
            alt={`${p.title} home page`}
            loading="lazy"
            onLoad={() => setState('ready')}
            onError={() => setState('failed')}
            className="shot"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', opacity: state === 'ready' ? 1 : 0, transition: `opacity 300ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)` }}
          />
        </>
      ) : (
        <Box
          role="img"
          aria-label={`${p.title}. Runs for a private client.`}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            p: 6,
            // Raised-navy blob and a block of dots behind the title.
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              backgroundImage: `${coverDots.url}, ${blob(navy.raised)}`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 18px top 52px, -70px 120%',
              backgroundSize: `${coverDots.w}px ${coverDots.h}px, 300px auto`,
            },
          }}
        >
          <Box>
            <Box aria-hidden sx={{ width: 44, height: 44, mx: 'auto', borderRadius: '8px', display: 'grid', placeItems: 'center', color: gold.onNavy, backgroundColor: navy.raised, border: `1px solid ${navy.line}` }}>
              <LockOutlined sx={{ fontSize: 20 }} />
            </Box>
            <Typography aria-hidden sx={{ mt: 3, fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', color: neutral.white }}>
              {p.shortTitle}
            </Typography>
            <Typography aria-hidden sx={{ fontSize: '0.8125rem', color: neutral.sidebarMuted }}>
              Private client
            </Typography>
          </Box>
        </Box>
      )}

      {/* Overlays: address pill, footer bar */}
      <Box aria-hidden sx={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={overlayPill}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: p.liveUrl ? status.success.fill : neutral.sidebarMuted }} />
          {p.liveUrl ? domain(p.liveUrl) : 'private'}
        </Box>
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 48,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: alpha(navy.deep, 0.88),
        }}
      >
        <Box sx={{ ...overlayPill, backgroundColor: 'transparent', boxShadow: `inset 0 0 0 1px ${navy.line}` }}>
          {p.liveUrl ? 'Live site' : (
            <>
              <PhotoLibraryOutlined sx={{ fontSize: 12 }} />
              Demo on request
            </>
          )}
        </Box>
        <Typography sx={{ fontFamily: font.mono, fontSize: '0.75rem', color: neutral.sidebarMuted }}>{String(index + 1).padStart(2, '0')}</Typography>
      </Box>
    </Box>
  )
}

/**
 * Project card: screenshot left, story right. The title link stretches over
 * the whole card with ::after, so the card opens the case study; the live
 * site link sits above that layer and stays its own target.
 */
export default function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Card
      component="article"
      sx={{
        position: 'relative',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'minmax(0, 9fr) minmax(0, 11fr)' },
        overflow: 'hidden',
        transition: `transform ${motion.base}ms, box-shadow ${motion.base}ms, border-color ${motion.base}ms`,
        '&:hover, &:focus-within': { transform: 'translateY(-3px)', boxShadow: shadow.dialog, borderColor: navy.soft },
        '&:hover .shot': { transform: 'scale(1.04)' },
        '&:hover .open-icon': { color: navy.primary, transform: 'translate(2px, -2px)' },
        '@media (prefers-reduced-motion: reduce)': { '&:hover, &:focus-within': { transform: 'none' } },
      }}
    >
      <Visual project={p} index={index} />

      <Box sx={{ display: 'flex', flexDirection: 'column', p: { xs: 5, sm: 6 }, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Typography variant="h3" component="h3" sx={{ flex: 1 }}>
            <Link
              href={caseStudyHref(p.id)}
              underline="none"
              sx={{
                color: 'inherit',
                fontWeight: 'inherit',
                '&:focus-visible': { outline: 'none' },
                '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 1, borderRadius: '10px' },
                '&:focus-visible::after': focusRing.light,
              }}
            >
              {p.title}
            </Link>
          </Typography>
          <NorthEast aria-hidden className="open-icon" sx={{ fontSize: 18, mt: 0.5, color: neutral.inkMuted, transition: `transform ${motion.base}ms, color ${motion.base}ms` }} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box component="span" sx={{ display: 'inline-block', px: 2.5, py: 0.5, borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: navy.primary, backgroundColor: navy.tint }}>
            {p.category}
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 3, color: neutral.inkSoft, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {p.tagline}
        </Typography>

        <Box component="dl" sx={{ m: 0, mt: 4, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
          {p.metrics.slice(0, 2).map((m) => (
            <Box key={m.label} sx={{ display: 'flex', flexDirection: 'column', px: 3, py: 2, borderRadius: '6px', backgroundColor: navy.tint, border: `1px solid ${navy.soft}`, minWidth: 0 }}>
              <Typography component="dt" sx={{ order: 2, fontSize: '0.75rem', lineHeight: 1.35, color: neutral.inkMuted }}>
                {m.label}
              </Typography>
              <Typography component="dd" sx={{ order: 1, m: 0, fontSize: '0.9375rem', lineHeight: 1.3, fontWeight: 700, color: navy.primary, overflowWrap: 'anywhere' }}>
                {m.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 'auto', pt: 4, borderTop: `1px solid ${neutral.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, marginTop: 'auto' }}>
          {p.liveUrl ? (
            <Link
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${domain(p.liveUrl)} (opens in a new tab)`}
              sx={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 1.5, fontSize: '0.875rem', fontWeight: 600, color: navy.primary, '&:hover': { color: gold.text } }}
            >
              <OpenInNew sx={{ fontSize: 15 }} />
              {domain(p.liveUrl)}
            </Link>
          ) : (
            <Typography sx={{ fontSize: '0.875rem', color: neutral.inkMuted }}>Private client</Typography>
          )}
          <Typography aria-hidden sx={{ fontSize: '0.8125rem', fontWeight: 600, color: gold.text }}>
            Case study
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
