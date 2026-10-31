import type { MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ProductMark from '../components/ProductMark'
import { personal } from '../data/portfolio'
import { scrollToSection } from '../lib/router'
import { focusRing, navy, neutral } from '../theme/tokens'

const socials = [
  { href: personal.github, label: 'GitHub', icon: GitHub },
  { href: personal.linkedin, label: 'LinkedIn', icon: LinkedIn },
  { href: `mailto:${personal.email}`, label: 'Email', icon: MailOutlineOutlined },
]

export default function Footer() {
  const toTop = (e: MouseEvent) => {
    e.preventDefault()
    scrollToSection('top')
  }

  return (
    <Box component="footer" sx={{ backgroundColor: navy.deep, color: neutral.sidebarMuted, borderTop: `1px solid ${navy.line}`, '& :focus-visible': focusRing.navy }}>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 5, sm: 8 }, py: 7, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <ProductMark size={28} inverse />
          <Typography sx={{ fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} {personal.name}. Built with React and MUI.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link href="#top" onClick={toTop} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontSize: '0.875rem', color: neutral.sidebarText, fontWeight: 500, '&:hover': { color: neutral.white } }}>
            <ArrowUpward sx={{ fontSize: 16 }} />
            Back to top
          </Link>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {socials.map(({ href, label, icon: Icon }) => (
              <Tooltip key={label} title={label}>
                <IconButton
                  component="a"
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  size="small"
                  sx={{ color: neutral.sidebarText, boxShadow: `inset 0 0 0 1px ${navy.line}`, '&:hover': { backgroundColor: navy.raised, color: neutral.white } }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
