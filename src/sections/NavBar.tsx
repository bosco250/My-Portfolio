import { useEffect, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ProductMark from '../components/ProductMark'
import { personal } from '../data/portfolio'
import { scrollToSection, sectionIds, type SectionId } from '../lib/router'
import { useActiveSection } from '../lib/useActiveSection'
import { useCvDownload } from '../lib/useCvDownload'
import { alpha, focusRing, font, gold, motion, navy, neutral } from '../theme/tokens'

const links: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/** Floating header card: identity, sections, one clear action. */
export default function NavBar() {
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cv = useCvDownload()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: SectionId | 'top') => (e: MouseEvent) => {
    e.preventDefault()
    const wasOpen = menuOpen
    setMenuOpen(false)
    setTimeout(() => scrollToSection(id), wasOpen ? 220 : 0)
  }

  return (
    <Box component="header" sx={{ position: 'fixed', top: { xs: 8, md: 16 }, left: 0, right: 0, zIndex: 1100, px: { xs: 3, sm: 5 }, pointerEvents: 'none' }}>
      <Paper
        component="nav"
        aria-label="Main"
        sx={{
          pointerEvents: 'auto',
          maxWidth: 1040,
          mx: 'auto',
          height: { xs: 60, md: 72 },
          px: { xs: 3, md: 5 },
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          borderRadius: '18px',
          backgroundColor: alpha(neutral.white, scrolled ? 0.94 : 0.86),
          backdropFilter: 'saturate(1.4) blur(14px)',
          border: `1px solid ${alpha(navy.primary, 0.08)}`,
          boxShadow: scrolled ? `0 12px 32px ${alpha(navy.deep, 0.12)}` : `0 6px 20px ${alpha(navy.deep, 0.06)}`,
          transition: `box-shadow ${motion.slow}ms, background-color ${motion.slow}ms`,
        }}
      >
        {/* Identity */}
        <ButtonBase component="a" href="#top" onClick={go('top')} aria-label={`${personal.name}, back to top`} sx={{ gap: 2.5, borderRadius: 2, mr: 'auto', pr: 1, '&.Mui-focusVisible': focusRing.light }}>
          <ProductMark size={38} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontFamily: font.mono, fontSize: { xs: '0.9375rem', md: '1rem' }, fontWeight: 500, lineHeight: 1.2, color: navy.primary, letterSpacing: '-0.01em' }}>
              <Box component="span" sx={{ color: gold.text }}>{'<'}</Box>
              jean
              <Box component="span" sx={{ fontWeight: 700 }}>bosco</Box>
              <Box component="span" sx={{ color: gold.text }}>{' />'}</Box>
            </Typography>
          </Box>
        </ButtonBase>

        {/* Section links */}
        <Box component="ul" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, listStyle: 'none', m: 0, p: 0 }}>
          {links.map((l) => {
            const current = active === l.id
            return (
              <li key={l.id}>
                <ButtonBase
                  component="a"
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={current ? 'location' : undefined}
                  sx={{
                    position: 'relative',
                    height: 40,
                    px: 3.5,
                    borderRadius: 999,
                    fontSize: '0.9375rem',
                    fontWeight: current ? 600 : 500,
                    color: current ? navy.primary : neutral.inkSoft,
                    backgroundColor: current ? navy.tint : 'transparent',
                    transition: `color ${motion.fast}ms, background-color ${motion.fast}ms`,
                    '&:hover': { color: navy.primary, backgroundColor: navy.tint },
                    '&.Mui-focusVisible': focusRing.light,
                    // Gold dot under the current section.
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      bottom: 3,
                      width: 4,
                      height: 4,
                      ml: '-2px',
                      borderRadius: '50%',
                      backgroundColor: gold.active,
                      opacity: current ? 1 : 0,
                      transition: `opacity ${motion.base}ms`,
                    },
                  }}
                >
                  {l.label}
                </ButtonBase>
              </li>
            )
          })}
        </Box>

        <Button
          variant="contained"
          href="#contact"
          onClick={go('contact')}
          endIcon={<ArrowForward sx={{ fontSize: '16px !important' }} />}
          sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: { md: 2 }, boxShadow: `0 6px 16px ${alpha(gold.active, 0.35)}` }}
        >
          Let's talk
        </Button>

        <IconButton aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} sx={{ display: { xs: 'inline-flex', md: 'none' }, color: navy.primary, borderRadius: 3 }}>
          <MenuIcon />
        </IconButton>
      </Paper>

      {/* Phone and tablet menu */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(320px, 88vw)', display: 'flex', flexDirection: 'column', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pl: 5, pr: 2, height: 72 }}>
          <ProductMark size={34} />
          <Typography sx={{ flex: 1, fontWeight: 700, color: navy.primary }}>{personal.nameShort}</Typography>
          <IconButton aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box component="nav" aria-label="Main" sx={{ p: 3, flex: 1, display: 'grid', alignContent: 'start', gap: 1 }}>
          {links.map((l) => {
            const current = active === l.id
            return (
              <ButtonBase
                key={l.id}
                component="a"
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={current ? 'location' : undefined}
                sx={{
                  justifyContent: 'flex-start',
                  height: 48,
                  px: 4,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: current ? 600 : 500,
                  color: navy.primary,
                  backgroundColor: current ? navy.tint : 'transparent',
                  '&:hover': { backgroundColor: navy.tint },
                  '&.Mui-focusVisible': focusRing.light,
                }}
              >
                {l.label}
              </ButtonBase>
            )
          })}
        </Box>
        <Box sx={{ p: 5, display: 'grid', gap: 2 }}>
          <Button variant="outlined" onClick={cv.download} disabled={cv.status === 'working'} startIcon={<FileDownloadOutlined />} sx={{ color: navy.primary, boxShadow: `inset 0 0 0 1px ${neutral.borderStrong}` }}>
            {cv.status === 'working' ? 'Preparing CV' : 'Download CV'}
          </Button>
          <Button variant="contained" href="#contact" onClick={go('contact')}>
            Let's talk
          </Button>
        </Box>
      </Drawer>
    </Box>
  )
}
