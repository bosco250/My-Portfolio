import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import OpenInNew from '@mui/icons-material/OpenInNew'
import SidePanel, { PanelSection } from '../../components/SidePanel'
import StatusBadge from '../../components/StatusBadge'
import ProjectVisual from '../../components/ProjectVisual'
import { useContact } from '../../app/contactContext'
import { findProject, type Project } from '../../lib/records'
import { closeCaseStudy, useCaseStudyId } from '../../lib/router'
import { font, navy, neutral } from '../../theme/tokens'

/** Case study panel. Opens over the page so the visitor keeps their place. */
export default function CaseStudy() {
  const id = useCaseStudyId()
  const project = findProject(id)
  const { compose } = useContact()

  // Keep the last project on screen while the panel slides out.
  const [shown, setShown] = useState(project)
  if (project && project !== shown) setShown(project)
  const p = project ?? shown
  if (!p) return null

  const ask = () => {
    closeCaseStudy()
    compose({ subject: 'Other', message: `I'd like to hear more about ${p.title}. ` })
  }

  return (
    <SidePanel
      open={Boolean(project)}
      onClose={closeCaseStudy}
      size="lg"
      title={p.title}
      subtitle={p.category}
      meta={<StatusBadge intent="success" label={p.liveUrl ? 'Live' : 'Live, private client'} />}
      footer={
        <>
          <Button variant="text" onClick={ask} sx={{ ml: 'auto' }}>
            Ask about this project
          </Button>
          {p.liveUrl && (
            <Button variant="contained" href={p.liveUrl} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew />}>
              Visit site
            </Button>
          )}
        </>
      }
    >
      <Body key={p.id} project={p} />
    </SidePanel>
  )
}

function Body({ project: p }: { project: Project }) {
  const [tab, setTab] = useState(0)

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label={`${p.title} details`}
        sx={{ mt: -4, mx: { xs: -4, sm: -5 }, px: { xs: 2, sm: 3 }, mb: 6, borderBottom: `1px solid ${neutral.border}` }}
      >
        <Tab label="Case study" id="cs-tab-0" aria-controls="cs-panel" />
        <Tab label={`Stack (${p.tech.length})`} id="cs-tab-1" aria-controls="cs-panel" />
      </Tabs>

      <Box role="tabpanel" id="cs-panel" aria-labelledby={`cs-tab-${tab}`}>
        {tab === 0 ? (
          <>
            <ProjectVisual project={p} />
            <Typography variant="body1" sx={{ mt: 6, color: neutral.ink }}>
              {p.tagline}
            </Typography>

            <Box component="dl" sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: `repeat(${p.metrics.length}, minmax(0, 1fr))` }, gap: 2, m: 0, my: 8 }}>
              {p.metrics.map((m) => (
                <Box key={m.label} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: neutral.mist, borderRadius: 1, px: 4, py: 3 }}>
                  <Typography component="dt" variant="caption" sx={{ order: 2 }}>
                    {m.label}
                  </Typography>
                  <Typography component="dd" sx={{ order: 1, m: 0, fontSize: '1.0625rem', fontWeight: 700, color: navy.primary }}>
                    {m.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <PanelSection title="The problem">
              <Typography variant="body2">{p.problem}</Typography>
            </PanelSection>
            <PanelSection title="What I built">
              <Typography variant="body2">{p.solution}</Typography>
            </PanelSection>
            <PanelSection title="Hard parts, and how I solved them">
              <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 5 }}>
                {p.challenges.map((c, i) => (
                  <Box
                    component="li"
                    key={c.problem}
                    sx={{
                      position: 'relative',
                      pl: 11,
                      // Step number drawn with ::before so the list reads as plain text.
                      '&::before': {
                        content: `"${String(i + 1).padStart(2, '0')}"`,
                        position: 'absolute',
                        left: 0,
                        top: 2,
                        fontFamily: font.mono,
                        fontSize: '0.8125rem',
                        color: neutral.inkMuted,
                      },
                    }}
                  >
                    <Typography variant="subtitle2" component="h4" sx={{ color: navy.primary }}>
                      {c.problem}
                    </Typography>
                    <Typography variant="body2" sx={{ color: neutral.inkSoft, mt: 1 }}>
                      {c.solution}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </PanelSection>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {p.tech.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
