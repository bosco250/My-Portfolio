import { useEffect, useId, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import NorthEast from '@mui/icons-material/NorthEast'
import LockOutlined from '@mui/icons-material/LockOutlined'
import ProjectVisual from '../../components/ProjectVisual'
import TechPill from '../../components/TechPill'
import { useContact } from '../../app/contactContext'
import { projects } from '../../data/portfolio'
import { domain, findProject } from '../../lib/records'
import { closeCaseStudy, openCaseStudy, useCaseStudyId } from '../../lib/router'
import { blob, dotCluster } from '../../theme/backdrops'
import { alpha, font, gold, navy, neutral, status } from '../../theme/tokens'

const sideDots = dotCluster(alpha(navy.primary, 0.16), 6, 4)

/** Scrolls normally, but without a visible scrollbar. */
const noScrollbar = { scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' } } as const

/** Strip of semi-transparent gold tape, for ::before / ::after. */
const tape = (side: 'left' | 'right') => ({
  content: '""',
  position: 'absolute',
  top: -10,
  [side]: 22,
  width: 64,
  height: 20,
  zIndex: 2,
  backgroundColor: alpha(gold.light, 0.85),
  boxShadow: `0 1px 2px ${alpha(navy.deep, 0.1)}`,
  transform: side === 'left' ? 'rotate(-6deg)' : 'rotate(5deg)',
})

/** Section label written like a margin note. */
function Note({ children }: { children: ReactNode }) {
  return (
    <Typography component="h3" sx={{ fontFamily: font.serif, fontStyle: 'italic', fontSize: '1.125rem', color: gold.text, lineHeight: 1.3, mb: 1.5 }}>
      {children}
    </Typography>
  )
}

/** Case study: a compact panel that slides in from the right, so the visitor keeps their place. */
export default function CaseStudy() {
  const id = useCaseStudyId()
  const project = findProject(id)
  const { compose } = useContact()
  const titleId = useId()

  // Keep the last project on screen while the panel slides out.
  const [shown, setShown] = useState(project)
  if (project && project !== shown) setShown(project)
  const p = project ?? shown

  const index = p ? projects.findIndex((x) => x.id === p.id) : -1
  const prev = index > 0 ? projects[index - 1] : null
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null

  // Arrow keys move between projects while the panel is open.
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      if (e.key === 'ArrowRight' && next) openCaseStudy(next.id)
      if (e.key === 'ArrowLeft' && prev) openCaseStudy(prev.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, prev, next])

  const ask = () => {
    if (!p) return
    closeCaseStudy()
    compose({ subject: 'Other', message: `I'd like to hear more about ${p.title}. ` })
  }

  return (
    <Drawer
      anchor="right"
      open={Boolean(project)}
      onClose={closeCaseStudy}
      transitionDuration={{ enter: 300, exit: 220 }}
      slotProps={{
        paper: {
          role: 'dialog',
          'aria-labelledby': titleId,
          sx: {
            width: { xs: '100vw', sm: 'min(1000px, 94vw)' },
            height: '100%',
            borderRadius: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: neutral.white,
            boxShadow: `-20px 0 50px ${alpha(navy.deep, 0.22)}`,
          },
        },
      }}
    >
      {p && (
        <>
          {/* Top bar */}
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 2, height: 56, px: { xs: 3, sm: 5 }, borderBottom: `1px solid ${neutral.border}` }}>
            <Box component="span" sx={{ px: 2, py: 0.5, borderRadius: 0, fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: navy.primary, backgroundColor: navy.tint }}>
              {p.category}
            </Box>
            <Typography sx={{ fontFamily: font.mono, fontSize: '0.8125rem', color: neutral.inkMuted, ml: 1, mr: 'auto' }}>
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </Typography>
            <Tooltip title={prev ? `Previous: ${prev.shortTitle} (←)` : 'First project'}>
              <span>
                <IconButton size="small" aria-label="Previous project" disabled={!prev} onClick={() => prev && openCaseStudy(prev.id)}>
                  <ChevronLeft />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={next ? `Next: ${next.shortTitle} (→)` : 'Last project'}>
              <span>
                <IconButton size="small" aria-label="Next project" disabled={!next} onClick={() => next && openCaseStudy(next.id)}>
                  <ChevronRight />
                </IconButton>
              </span>
            </Tooltip>
            <Box sx={{ width: '1px', height: 22, backgroundColor: neutral.border, mx: 1 }} />
            <Tooltip title="Close (Esc)">
              <IconButton size="small" aria-label="Close case study" onClick={closeCaseStudy}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Body: the work on the left, the story on the right */}
          <Box
            key={p.id}
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: { xs: 'auto', md: 'hidden' },
              ...noScrollbar,
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 6fr)' },
            }}
          >
            {/* Left: the work */}
            <Box
              sx={{
                position: 'relative',
                isolation: 'isolate',
                overflowX: 'hidden',
                overflowY: { md: 'auto' },
                ...noScrollbar,
                backgroundColor: neutral.canvas,
                borderRight: { md: `1px solid ${neutral.border}` },
                px: { xs: 4, sm: 6 },
                py: { xs: 7, sm: 8 },
                display: 'grid',
                alignContent: 'start',
                gap: 6,
                // Dots in the corner, a soft blob low behind the numbers.
                '&::before': { content: '""', position: 'absolute', top: 14, right: 16, width: sideDots.w, height: sideDots.h, backgroundImage: sideDots.url, zIndex: -1 },
                '&::after': { content: '""', position: 'absolute', left: -120, bottom: -120, width: 380, height: 330, backgroundImage: blob(navy.tint), backgroundRepeat: 'no-repeat', backgroundSize: 'contain', zIndex: -1 },
              }}
            >
              {/* Screenshot, taped to the page */}
              <Box
                sx={{
                  position: 'relative',
                  mt: 2,
                  p: 1.5,
                  backgroundColor: neutral.white,
                  borderRadius: 0,
                  boxShadow: `0 14px 30px ${alpha(navy.deep, 0.16)}`,
                  transform: 'rotate(-1.2deg)',
                  '&::before': tape('left'),
                  '&::after': tape('right'),
                  '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
                }}
              >
                <ProjectVisual project={p} />
              </Box>

              {/* Key numbers */}
              <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: `repeat(${Math.min(p.metrics.length, 3)}, minmax(0, 1fr))`, backgroundColor: neutral.white, border: `1px solid ${neutral.border}`, borderRadius: 0 }}>
                {p.metrics.slice(0, 3).map((m, i) => (
                  <Box key={m.label} sx={{ display: 'flex', flexDirection: 'column', px: 3, py: 3, minWidth: 0, borderLeft: i ? `1px dashed ${neutral.border}` : 0 }}>
                    <Typography component="dt" sx={{ order: 2, fontSize: '0.75rem', lineHeight: 1.35, color: neutral.inkMuted }}>
                      {m.label}
                    </Typography>
                    <Typography component="dd" sx={{ order: 1, m: 0, fontSize: '1rem', fontWeight: 800, lineHeight: 1.3, color: navy.primary, overflowWrap: 'anywhere' }}>
                      {m.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Stack */}
              <Box>
                <Typography sx={{ fontFamily: font.mono, fontSize: '0.75rem', color: gold.text, mb: 2 }}>{'<built with />'}</Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {p.tech.map((t) => (
                    <TechPill key={t} label={t} />
                  ))}
                </Box>
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {p.liveUrl && (
                  <Button variant="contained" href={p.liveUrl} target="_blank" rel="noopener noreferrer" endIcon={<NorthEast />}>
                    Visit {domain(p.liveUrl)}
                  </Button>
                )}
                <Button
                  onClick={ask}
                  sx={{ color: navy.primary, backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${neutral.borderStrong}`, '&:hover': { backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${navy.primary}` } }}
                >
                  Ask about this project
                </Button>
              </Box>
            </Box>

            {/* Right: the story */}
            <Box tabIndex={0} aria-label="Project story" sx={{ overflowY: { md: 'auto' }, ...noScrollbar, outline: 'none', px: { xs: 5, sm: 8 }, py: { xs: 7, sm: 8 } }}>
              <Typography id={titleId} variant="h2" component="h2" sx={{ fontSize: { xs: '1.625rem', sm: '2rem' } }}>
                {p.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: neutral.inkSoft }}>
                {p.tagline}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 5, rowGap: 1.5, mt: 3, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, fontWeight: 600, color: status.success.text }}>
                  <Box aria-hidden sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: status.success.fill, boxShadow: `0 0 0 3px ${status.success.wash}` }} />
                  Live in production
                </Box>
                {p.liveUrl ? (
                  <Link href={p.liveUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 600, color: navy.primary }}>
                    {domain(p.liveUrl)}
                    <NorthEast sx={{ fontSize: 14 }} />
                  </Link>
                ) : (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: neutral.inkMuted }}>
                    <LockOutlined sx={{ fontSize: 14 }} />
                    Private client
                  </Box>
                )}
              </Box>

              {/* Hand-drawn divider */}
              <Box aria-hidden sx={{ my: 6, height: 0, borderTop: `2px dashed ${navy.soft}` }} />

              <Box sx={{ display: 'grid', gap: 6 }}>
                <Box component="section">
                  <Note>The problem</Note>
                  <Typography variant="body2" sx={{ color: neutral.ink }}>
                    {p.problem}
                  </Typography>
                </Box>
                <Box component="section">
                  <Note>What I built</Note>
                  <Typography variant="body2" sx={{ color: neutral.ink }}>
                    {p.solution}
                  </Typography>
                </Box>
                <Box component="section">
                  <Note>The hard parts</Note>
                  <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3 }}>
                    {p.challenges.map((c, i) => (
                      <Box
                        component="li"
                        key={c.problem}
                        sx={{
                          position: 'relative',
                          pl: 5,
                          pt: 0.25,
                          // Rule down the left edge of each hard part.
                          '&::before': { content: '""', position: 'absolute', left: 0, top: 4, bottom: 4, width: 3, backgroundColor: i === 0 ? gold.active : navy.soft },
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: navy.primary }}>{c.problem}</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, color: neutral.inkSoft }}>
                          {c.solution}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Drawer>
  )
}
