import type { MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Reveal from '../components/Reveal'
import TypedRole from '../components/TypedRole'
import { CodeTag, Mark, Tagline } from '../components/Section'
import { personal, projects } from '../data/portfolio'
import { scrollToSection } from '../lib/router'
import { blob, dashedRing, dotCluster, heroWave } from '../theme/backdrops'
import { alpha, gold, navy, neutral } from '../theme/tokens'

// Typed in turn inside the tagline: "As a ___, I design the system..."
const roles = ['full-stack engineer,', 'systems architect,', 'technical consultant,']

const stats = [
  { value: String(projects.length), label: 'Platforms shipped' },
  { value: String(projects.filter((p) => p.liveUrl).length), label: 'Live public sites' },
  { value: '5', label: 'Industries served' },
]

const heroDots = dotCluster(alpha(navy.primary, 0.18), 6, 4)
const deskDots = dotCluster(alpha(gold.active, 0.55), 5, 3, 16)

export default function Hero() {
  const go = (id: 'work' | 'contact') => (e: MouseEvent) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <Box
      id="top"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        backgroundColor: neutral.canvas,
        pt: { xs: 30, md: 40 },
        pb: { xs: 24, md: 32 },
        // A block of dots beside the introduction.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage: heroDots.url,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left 3% top 132px',
          backgroundSize: `${heroDots.w}px ${heroDots.h}px`,
          display: { xs: 'none', md: 'block' },
        },
        // Soft wave along the bottom edge.
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 90, md: 160 },
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage: heroWave,
          backgroundSize: '100% 100%',
        },
        '@media print, (forced-colors: active)': { '&::before, &::after': { display: 'none' } },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 5, sm: 8 } }}>
        <Box sx={{ display: 'grid', gap: { xs: 14, md: 10 }, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' }, alignItems: 'center' }}>
          {/* Introduction */}
          <Box>
            <Reveal onLoad>
              <CodeTag>hello world</CodeTag>
            </Reveal>
            <Reveal onLoad delay={60}>
              <Typography variant="h1">
                Hi, I'm <Mark>Jean Bosco</Mark>
              </Typography>
            </Reveal>
            <Reveal onLoad delay={140}>
              <Tagline sx={{ mt: 4, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                {/* Screen readers get the whole sentence once */}
                <Box component="span" className="visually-hidden">
                  As a full-stack engineer, systems architect and technical consultant, I design the system, build every layer, and keep it running.
                </Box>
                <Box component="span" aria-hidden sx={{ display: 'block' }}>
                  As a <TypedRole roles={roles} />
                </Box>
                <Box component="span" aria-hidden sx={{ display: 'block' }}>
                  I design the system, build every layer, and keep it running.
                </Box>
              </Tagline>
            </Reveal>
            <Reveal onLoad delay={190}>
              <Typography variant="body1" sx={{ mt: 4, maxWidth: 540, color: neutral.inkSoft, fontSize: { md: '1.0625rem' } }}>
                I'm {personal.name}, a software engineer based in {personal.location}, working across the full stack: system architecture, backend and frontend development, database engineering, DevOps and hosting. I also advise teams as a technical consultant, and my work runs in production for companies in insurance, fintech, e-mobility and commerce.
              </Typography>
            </Reveal>
            <Reveal onLoad delay={270}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 7 }}>
                <Button size="large" variant="contained" href="#work" onClick={go('work')} endIcon={<ArrowForward />} sx={{ boxShadow: `0 10px 24px ${alpha(gold.active, 0.35)}` }}>
                  See what I've built
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  href="#contact"
                  onClick={go('contact')}
                  sx={{ color: navy.primary, backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${neutral.border}`, '&:hover': { backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${navy.primary}` } }}
                >
                  Let's talk
                </Button>
              </Box>
            </Reveal>
            <Reveal onLoad delay={320}>
              <Box component="dl" sx={{ m: 0, mt: 9, display: 'flex', flexWrap: 'wrap', columnGap: 10, rowGap: 4 }}>
                {stats.map((s) => (
                  <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component="dt" sx={{ order: 2, fontSize: '0.8125rem', color: neutral.inkMuted }}>
                      {s.label}
                    </Typography>
                    <Typography component="dd" sx={{ order: 1, m: 0, fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, color: navy.primary }}>
                      {s.value}
                      <Box component="span" sx={{ color: gold.active }}>
                        +
                      </Box>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>

          {/* Illustration: a developer saying hello */}
          <Reveal onLoad delay={160}>
            <Box
              sx={{
                position: 'relative',
                isolation: 'isolate',
                maxWidth: 600,
                mx: 'auto',
                px: { xs: 2, sm: 6 },
                py: { xs: 6, sm: 10 },
                // Soft pale-navy shape behind the scene.
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: { xs: '0 0 4% 0', sm: '0 2% 6% 4%' },
                  zIndex: -1,
                  backgroundImage: blob(navy.tint),
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                },
                // Thin dashed ring, slightly off-centre, like a pencil guide.
                '&::after': { ...dashedRing(false, 200), top: -12, right: { xs: -20, sm: 8 } },
              }}
            >
              <Box
                component="img"
                src="/illustrations/hero.svg"
                alt=""
                aria-hidden
                sx={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '880 / 523' }}
              />
              {/* Dots tucked under the desk, bottom-left */}
              <Box aria-hidden sx={{ position: 'absolute', zIndex: -1, left: { xs: 0, sm: 8 }, bottom: 0, width: deskDots.w, height: deskDots.h, backgroundImage: deskDots.url }} />
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  )
}
