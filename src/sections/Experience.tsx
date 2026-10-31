import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import CheckOutlined from '@mui/icons-material/CheckOutlined'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Reveal from '../components/Reveal'
import Section, { Mark } from '../components/Section'
import { roles, type Role } from '../lib/records'
import { font, gold, motion, navy, neutral, shadow, status } from '../theme/tokens'

const SHOWN = 2
const isCurrent = (r: Role) => /present/i.test(r.period)
const initials = (company: string) =>
  company
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export default function Experience() {
  return (
    <Section
      id="experience"
      tone="white"
      art={{ src: '/illustrations/experience.svg', ratio: 1301 / 521.5, width: 560, at: { right: 24, bottom: 64 }, opacity: 0.16 }}
      center
      decor
      tag="experience"
      title={
        <>
          Where I've <Mark>built and shipped</Mark>
        </>
      }
      lede="The teams I've worked with, and what we put in front of real users."
    >
      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          position: 'relative',
          // The spine: a centre line on desktop, a left line on phones.
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 8,
            bottom: 8,
            left: { xs: 22, md: '50%' },
            width: 2,
            ml: { md: '-1px' },
            backgroundColor: navy.soft,
          },
        }}
      >
        {roles.map((r, i) => (
          <TimelineItem key={r.id} role={r} side={i % 2 ? 'right' : 'left'} delay={i * 80} />
        ))}
      </Box>
    </Section>
  )
}

function TimelineItem({ role: r, side, delay }: { role: Role; side: 'left' | 'right'; delay: number }) {
  const [open, setOpen] = useState(false)
  const current = isCurrent(r)
  const extra = r.highlights.slice(SHOWN)
  const listId = `${r.id}-more`
  const left = side === 'left'

  const bullet = (h: string) => (
    <Box component="li" key={h} sx={{ display: 'flex', gap: 2.5, textAlign: 'left' }}>
      <CheckOutlined aria-hidden sx={{ fontSize: 16, mt: 0.5, color: gold.text, flexShrink: 0 }} />
      <Typography variant="body2" sx={{ color: neutral.inkSoft }}>
        {h}
      </Typography>
    </Box>
  )

  return (
    <Box
      component="li"
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '46px minmax(0, 1fr)', md: 'minmax(0, 1fr) 96px minmax(0, 1fr)' },
        alignItems: 'start',
        '& + &': { mt: { xs: 8, md: 6 } },
      }}
    >
      {/* Company badge on the spine */}
      <Box
        aria-hidden
        sx={{
          gridColumn: { xs: 1, md: 2 },
          gridRow: 1,
          justifySelf: 'center',
          position: 'relative',
          zIndex: 1,
          width: 46,
          height: 46,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: neutral.white,
          border: `2px solid ${current ? gold.active : navy.soft}`,
          boxShadow: shadow.raised,
          fontFamily: font.mono,
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: navy.primary,
        }}
      >
        {initials(r.company)}
      </Box>

      <Reveal
        delay={delay}
        sx={{
          gridColumn: { xs: 2, md: left ? 1 : 3 },
          gridRow: 1,
          pl: { xs: 4, md: 0 },
          textAlign: { xs: 'left', md: left ? 'right' : 'left' },
        }}
      >
        <Card
          sx={{
            p: { xs: 5, sm: 6 },
            transition: `box-shadow ${motion.base}ms, border-color ${motion.base}ms`,
            '&:hover': { boxShadow: shadow.dialog, borderColor: navy.soft },
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, justifyContent: { md: left ? 'flex-end' : 'flex-start' } }}>
            <Typography sx={{ fontFamily: font.mono, fontSize: '0.8125rem', color: gold.text, fontWeight: 500 }}>{r.period}</Typography>
            {current && (
              <Box component="span" sx={{ px: 2, py: 0.25, borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, color: status.success.text, backgroundColor: status.success.wash }}>
                Current
              </Box>
            )}
          </Box>
          <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
            {r.role}
          </Typography>
          <Typography variant="body2" sx={{ color: neutral.inkMuted, mt: 0.5 }}>
            {r.company} · {r.location}
          </Typography>
          <Typography variant="body2" sx={{ mt: 3, color: neutral.inkSoft }}>
            {r.description}
          </Typography>

          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 4, display: 'grid', gap: 2 }}>
            {r.highlights.slice(0, SHOWN).map(bullet)}
          </Box>
          {extra.length > 0 && (
            <>
              <Collapse in={open}>
                <Box component="ul" id={listId} sx={{ listStyle: 'none', p: 0, m: 0, mt: 2, display: 'grid', gap: 2 }}>
                  {extra.map(bullet)}
                </Box>
              </Collapse>
              <Button
                size="small"
                variant="text"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((v) => !v)}
                endIcon={<ExpandMore sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: `transform ${motion.base}ms` }} />}
                sx={{ mt: 3, mx: -2 }}
              >
                {open ? 'Show less' : `Show ${extra.length} more`}
              </Button>
            </>
          )}
        </Card>
      </Reveal>
    </Box>
  )
}
