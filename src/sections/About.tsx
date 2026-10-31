import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import LayersOutlined from '@mui/icons-material/LayersOutlined'
import ShieldOutlined from '@mui/icons-material/ShieldOutlined'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import WorkspacePremiumOutlined from '@mui/icons-material/WorkspacePremiumOutlined'
import BusinessOutlined from '@mui/icons-material/BusinessOutlined'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import TranslateOutlined from '@mui/icons-material/TranslateOutlined'
import IconCircle from '../components/IconCircle'
import Reveal from '../components/Reveal'
import Section, { CodeTag, Mark } from '../components/Section'
import { personal } from '../data/portfolio'
import { dotField } from '../theme/backdrops'
import { gold, motion, navy, neutral, shadow } from '../theme/tokens'

const values = [
  { icon: LayersOutlined, title: 'Full-stack delivery', body: 'Schema, API, interface and deployment, owned end to end.' },
  { icon: ShieldOutlined, title: 'Security first', body: 'Passkeys, 2FA and compliance built in from day one.' },
  { icon: SpeedOutlined, title: 'Built to perform', body: 'Load tested before launch, not after users complain.' },
  { icon: SchoolOutlined, title: 'Always learning', body: 'Now exploring distributed systems and applied ML.' },
]

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', minWidth: 0 }}>
      <Box aria-hidden sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: '10px', display: 'grid', placeItems: 'center', backgroundColor: navy.tint, color: navy.primary, '& svg': { fontSize: 18 } }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="dt" sx={{ fontSize: '0.75rem', color: neutral.inkMuted }}>
          {label}
        </Typography>
        <Typography component="dd" sx={{ m: 0, fontSize: '0.875rem', lineHeight: 1.4, fontWeight: 600, color: neutral.ink }}>
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

export default function About() {
  return (
    <Section id="about" tone="white" labelledBy="about-title">
      <Box sx={{ display: 'grid', gap: { xs: 12, md: 16 }, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 5fr)' }, alignItems: 'end' }}>
        <Box>
          <Reveal>
            <CodeTag>about</CodeTag>
            <Typography variant="h2" id="about-title">
              Developer by trade.
              <br />
              <Mark>Problem-solver</Mark> at heart.
            </Typography>
            {personal.bio.map((p) => (
              <Typography key={p} variant="body1" sx={{ mt: 5, color: neutral.inkSoft }}>
                {p}
              </Typography>
            ))}
          </Reveal>

          <Box sx={{ display: 'grid', gap: 4, mt: 10, gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' } }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} sx={{ height: '100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    p: 5,
                    transition: `transform ${motion.base}ms, box-shadow ${motion.base}ms, border-color ${motion.base}ms`,
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: shadow.dialog, borderColor: navy.soft },
                    position: 'relative',
                    overflow: 'hidden',
                    // Short gold rule on the top edge, drawn by hand; it grows on hover.
                    '&::before': { content: '""', position: 'absolute', top: 0, left: 20, width: 28, height: 3, borderRadius: '0 0 2px 2px', backgroundColor: gold.active, transition: 'width 250ms' },
                    '&:hover::before': { width: 64 },
                  }}
                >
                  <IconCircle>
                    <v.icon />
                  </IconCircle>
                  <Typography variant="h4" component="h3" sx={{ mt: 4 }}>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: neutral.inkSoft }}>
                    {v.body}
                  </Typography>
                </Card>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* Profile card */}
        <Reveal delay={100}>
          <Box
            sx={{
              position: 'relative',
              isolation: 'isolate',
              maxWidth: 440,
              mx: 'auto',
              // A soft block of dots behind the illustration.
              '&::before': { ...dotField(), top: 8, right: 0 },
            }}
          >
            {/* Illustration: a developer at work, sitting above the card */}
            <Box
              component="img"
              src="/illustrations/about.svg"
              alt=""
              aria-hidden
              loading="lazy"
              sx={{ display: 'block', width: { xs: '62%', sm: '58%' }, mx: 'auto', position: 'relative', zIndex: 0 }}
            />
            <Card sx={{ position: 'relative', zIndex: 1, mt: { xs: -10, sm: -14 }, p: { xs: 6, sm: 7 }, border: `1px solid ${neutral.border}`, boxShadow: shadow.dialog }}>
              {/* Quick facts */}
              <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 4, rowGap: 5 }}>
                <Fact icon={<BusinessOutlined />} label="Working at">Uruti Hub Limited</Fact>
                <Fact icon={<PlaceOutlined />} label="Based in">{personal.location}</Fact>
                <Fact icon={<SchoolOutlined />} label="Studying">BSE, University of Rwanda</Fact>
                <Fact icon={<TranslateOutlined />} label="Speaks">English, Kinyarwanda, French</Fact>
              </Box>

              {/* Certificates */}
              <Box sx={{ mt: 6, pt: 6, borderTop: `1px solid ${neutral.border}` }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: neutral.inkMuted }}>Certificates</Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3, display: 'grid', gap: 2.5 }}>
                  {personal.certifications.map((c) => {
                    const [name, issuer] = c.split(', ')
                    return (
                      <Box component="li" key={c} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                        <WorkspacePremiumOutlined aria-hidden sx={{ fontSize: 18, color: gold.text, mt: 0.25 }} />
                        <Typography sx={{ fontSize: '0.8125rem', lineHeight: 1.45, color: neutral.ink }}>
                          {name}
                          {issuer && (
                            <Box component="span" sx={{ display: 'block', color: neutral.inkMuted }}>
                              {issuer}
                            </Box>
                          )}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Card>
          </Box>
        </Reveal>
      </Box>
    </Section>
  )
}
