import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Reveal from '../../components/Reveal'
import Section, { Mark } from '../../components/Section'
import { projects } from '../../data/portfolio'
import { font, navy, neutral } from '../../theme/tokens'
import ProjectCard from './ProjectCard'

const PAGE = 4

export default function Work() {
  const [shown, setShown] = useState(PAGE)
  const rest = projects.length - shown

  return (
    <Section
      id="work"
      tone="tint"
      art={{ src: '/illustrations/projects.svg', ratio: 702.5 / 680.4, width: 300, at: { right: 20, top: 40 }, opacity: 0.16 }}
      center
      tag="projects"
      title={
        <>
          Selected <Mark>work</Mark>
        </>
      }
      lede={`${projects.length} platforms running for real users, across insurance, fintech, e-mobility, B2B commerce and ERP. Open any of them for the full story.`}
    >
      <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' } }}>
        {projects.slice(0, shown).map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 80} sx={{ height: '100%' }}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </Box>

      <Box sx={{ mt: 10, display: 'grid', justifyItems: 'center', gap: 3 }}>
        <Typography role="status" sx={{ fontFamily: font.mono, fontSize: '0.8125rem', color: neutral.inkMuted }}>
          Showing {Math.min(shown, projects.length)} of {projects.length}
        </Typography>
        {rest > 0 && (
          <Button
            variant="outlined"
            onClick={() => setShown(projects.length)}
            endIcon={<ExpandMore />}
            sx={{ color: navy.primary, backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${neutral.border}`, '&:hover': { backgroundColor: neutral.white, boxShadow: `inset 0 0 0 1px ${navy.primary}` } }}
          >
            Load {rest} more
          </Button>
        )}
      </Box>
    </Section>
  )
}
