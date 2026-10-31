import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Reveal from '../../components/Reveal'
import Section, { CodeTag, Mark } from '../../components/Section'
import StatusBadge from '../../components/StatusBadge'
import { useNotices } from '../../app/noticeContext'
import { personal } from '../../data/portfolio'
import type { Message } from '../../lib/sendMessage'
import { blob, dashedRing, dotCluster } from '../../theme/backdrops'
import { alpha, focusRing, font, gold, navy, neutral, shadow } from '../../theme/tokens'
import ContactForm from './ContactForm'

const panelDots = dotCluster(alpha(neutral.white, 0.18), 7, 5)

function Channel({ icon, label, children, action }: { icon: ReactNode; label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 3, '& + &': { borderTop: `1px solid ${navy.line}` } }}>
      <Box aria-hidden sx={{ width: 38, height: 38, flexShrink: 0, borderRadius: 1, display: 'grid', placeItems: 'center', backgroundColor: navy.raised, color: gold.onNavy, boxShadow: `inset 0 0 0 1px ${navy.line}`, '& svg': { fontSize: 18 } }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontSize: '0.75rem', color: neutral.sidebarMuted }}>{label}</Typography>
        <Box sx={{ color: neutral.white, fontSize: '0.9375rem', fontWeight: 500, overflowWrap: 'anywhere' }}>{children}</Box>
      </Box>
      {action}
    </Box>
  )
}

const linkOnNavy = { color: neutral.white, fontWeight: 500, '&:hover': { color: gold.onNavy } }

export default function Contact({ prefill, formKey }: { prefill: Partial<Message> | null; formKey: number }) {
  const notify = useNotices()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      notify('Email address copied.', 'success')
    } catch {
      notify(`Copy did not work here. The address is ${personal.email}.`, 'info')
    }
  }

  return (
    <Section id="contact" tone="white" labelledBy="contact-title">
      <Box
        sx={{
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          borderRadius: { xs: '20px', md: '28px' },
          backgroundColor: navy.primary,
          color: neutral.sidebarText,
          px: { xs: 5, sm: 8, md: 12 },
          py: { xs: 10, md: 14 },
          boxShadow: `0 30px 60px ${alpha(navy.deep, 0.25)}`,
          '& :focus-visible': focusRing.navy,
          // Raised-navy blob behind the form, and a block of dots bottom-left.
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            backgroundImage: `${panelDots.url}, ${blob(navy.raised)}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 48px bottom 40px, right -120px top -80px',
            backgroundSize: `${panelDots.w}px ${panelDots.h}px, 720px auto`,
          },
          // Gold light in the corner, plus a dashed ring.
          '&::after': { ...dashedRing(true, 320), top: -120, right: -100, boxShadow: `0 0 120px 40px ${alpha(gold.active, 0.12)}` },
        }}
      >
      <Box sx={{ display: 'grid', gap: { xs: 10, md: 14 }, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, alignItems: 'start' }}>
        <Reveal>
          <CodeTag onNavy>contact</CodeTag>
          <Typography variant="h2" id="contact-title" sx={{ color: neutral.white, '& span::after': { backgroundColor: gold.active, opacity: 0.6 } }}>
            Let's build something <Mark>together</Mark>
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, color: neutral.sidebarText }}>
            Hiring for a full-time role, need help on a project, or want to compare notes? Send me a message. I read every one and reply by email.
          </Typography>
          {personal.isAvailable && (
            <Box sx={{ mt: 5 }}>
              <StatusBadge intent="success" label="Available, remote or in Kigali" />
            </Box>
          )}

          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 8 }}>
            <Channel
              icon={<MailOutlineOutlined />}
              label="Email"
              action={
                <Tooltip title="Copy email address">
                  <IconButton aria-label="Copy email address" onClick={copyEmail} sx={{ color: neutral.sidebarText, '&:hover': { backgroundColor: navy.raised, color: neutral.white } }}>
                    <ContentCopyOutlined sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              }
            >
              <Link href={`mailto:${personal.email}`} sx={{ ...linkOnNavy, fontFamily: font.mono, fontSize: '0.875rem' }}>
                {personal.email}
              </Link>
            </Channel>
            <Channel icon={<PhoneOutlined />} label="Phone">
              <Link href={`tel:${personal.phone.replace(/\s/g, '')}`} sx={{ ...linkOnNavy, fontFamily: font.mono, fontSize: '0.875rem' }}>
                {personal.phone}
              </Link>
            </Channel>
            <Channel icon={<LinkedIn />} label="LinkedIn">
              <Link href={personal.linkedin} target="_blank" rel="noopener noreferrer" sx={linkOnNavy}>
                Jean Bosco Dusengimana
              </Link>
            </Channel>
            <Channel icon={<GitHub />} label="GitHub">
              <Link href={personal.github} target="_blank" rel="noopener noreferrer" sx={linkOnNavy}>
                {personal.github.replace('https://github.com/', '@')}
              </Link>
            </Channel>
            <Channel icon={<PlaceOutlined />} label="Location">
              {personal.location} · {personal.timezone}
            </Channel>
          </Box>
        </Reveal>

        <Reveal delay={80}>
          <Card sx={{ p: { xs: 5, sm: 8 }, border: 0, borderRadius: '20px', boxShadow: shadow.dialog, '& :focus-visible': focusRing.light }}>
            <ContactForm key={formKey} prefill={prefill} />
          </Card>
        </Reveal>
      </Box>
      </Box>
    </Section>
  )
}
