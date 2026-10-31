import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import CodeOutlined from '@mui/icons-material/CodeOutlined'
import WebOutlined from '@mui/icons-material/WebOutlined'
import DnsOutlined from '@mui/icons-material/DnsOutlined'
import StorageOutlined from '@mui/icons-material/StorageOutlined'
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import CloudOutlined from '@mui/icons-material/CloudOutlined'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import IconCircle from '../components/IconCircle'
import Reveal from '../components/Reveal'
import Section, { Mark } from '../components/Section'
import TechPill from '../components/TechPill'
import { skillGroups } from '../lib/records'
import { font, gold, motion, navy, neutral, shadow } from '../theme/tokens'

const icons: Record<string, SvgIconComponent> = {
  languages: CodeOutlined,
  frontend: WebOutlined,
  backend: DnsOutlined,
  'data-and-storage': StorageOutlined,
  mobile: PhoneIphoneOutlined,
  'security-and-payments': LockOutlined,
  'testing-and-performance': SpeedOutlined,
  'tools-and-devops': CloudOutlined,
  'currently-learning': AutoAwesomeOutlined,
}

export default function Skills() {
  return (
    <Section
      id="skills"
      tone="tint"
      art={{ src: '/illustrations/skills.svg', ratio: 960 / 417.5, width: 420, at: { left: -30, top: 70 }, opacity: 0.16 }}
      center
      tag="skills"
      title={
        <>
          The toolkit behind <Mark>the work</Mark>
        </>
      }
      lede="Everything here has been used in shipped products. I reach for proven tools first and add new ones when the problem needs them."
    >
      <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
        {skillGroups.map((g, i) => {
          const Icon = icons[g.id] ?? CodeOutlined
          const learning = g.id === 'currently-learning'
          return (
            <Reveal key={g.id} delay={(i % 3) * 60} sx={{ height: '100%' }}>
              <Card
                sx={{
                  position: 'relative',
                  height: '100%',
                  p: 6,
                  overflow: 'hidden',
                  transition: `transform ${motion.base}ms, box-shadow ${motion.base}ms, border-color ${motion.base}ms`,
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: shadow.dialog, borderColor: navy.soft },
                  // Tool count in the corner.
                  '&::after': {
                    content: `"${String(g.items.length).padStart(2, '0')}"`,
                    position: 'absolute',
                    top: 18,
                    right: 22,
                    fontFamily: font.mono,
                    fontSize: '0.8125rem',
                    color: neutral.borderStrong,
                  },
                  ...(learning && { backgroundColor: gold.soft, borderColor: gold.light }),
                }}
              >
                <IconCircle>
                  <Icon />
                </IconCircle>
                <Typography variant="h3" component="h3" sx={{ mt: 5 }}>
                  {learning ? 'Learning now' : g.category}
                </Typography>
                <Box component="ul" aria-label={`${g.category} tools`} sx={{ listStyle: 'none', p: 0, m: 0, mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {g.items.map((item) => (
                    <TechPill key={item} label={item} tone={learning ? 'gold' : 'navy'} />
                  ))}
                </Box>
              </Card>
            </Reveal>
          )
        })}
      </Box>
    </Section>
  )
}
