import { useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import LockOutlined from '@mui/icons-material/LockOutlined'
import type { Project } from '../lib/records'
import { domain } from '../lib/records'
import { font, navy, neutral } from '../theme/tokens'

/**
 * A project's picture: the live site in a browser frame when there is one,
 * otherwise a branded cover. A screenshot that fails to load falls back to the cover.
 */
export default function ProjectVisual({ project, ratio = '16 / 10', eager = false }: { project: Project; ratio?: string; eager?: boolean }) {
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading')
  const hasShot = Boolean(project.screenshot) && state !== 'failed'

  return (
    <Box sx={{ borderRadius: 1, overflow: 'hidden', border: `1px solid ${neutral.border}`, backgroundColor: neutral.mist }}>
      {/* Browser chrome */}
      <Box aria-hidden sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 3, height: 32, backgroundColor: neutral.white, borderBottom: `1px solid ${neutral.border}` }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: neutral.disabledFill }} />
          ))}
        </Box>
        <Box sx={{ flex: 1, height: 20, borderRadius: 0.5, backgroundColor: neutral.mist, display: 'flex', alignItems: 'center', px: 2, gap: 1.5, minWidth: 0 }}>
          {!project.liveUrl && <LockOutlined sx={{ fontSize: 11, color: neutral.inkMuted }} />}
          <Typography noWrap sx={{ fontFamily: font.mono, fontSize: '0.6875rem', color: neutral.inkMuted }}>
            {project.liveUrl ? domain(project.liveUrl) : 'private client deployment'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', aspectRatio: ratio }}>
        {hasShot ? (
          <>
            {state === 'loading' && <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%', borderRadius: 0 }} />}
            <Box
              component="img"
              src={project.screenshot}
              alt={`${project.title} home page`}
              loading={eager ? 'eager' : 'lazy'}
              onLoad={() => setState('ready')}
              onError={() => setState('failed')}
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top',
                opacity: state === 'ready' ? 1 : 0,
                transition: 'opacity 300ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            />
          </>
        ) : (
          <Cover project={project} />
        )}
      </Box>
    </Box>
  )
}

/** Plain cover for work that has no public page. */
function Cover({ project }: { project: Project }) {
  return (
    <Box
      role="img"
      aria-label={`${project.title}, ${project.category}. Runs for a private client.`}
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: navy.tint,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
        p: 6,
      }}
    >
      <Box aria-hidden sx={{ width: 44, height: 44, borderRadius: 1, display: 'grid', placeItems: 'center', backgroundColor: neutral.white, color: navy.primary, border: `1px solid ${navy.soft}` }}>
        <LockOutlined sx={{ fontSize: 20 }} />
      </Box>
      <Typography aria-hidden sx={{ mt: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, letterSpacing: '-0.02em', color: navy.primary, lineHeight: 1.2 }}>
        {project.shortTitle}
      </Typography>
      <Typography aria-hidden variant="body2" sx={{ color: neutral.inkSoft }}>
        Private client · screenshots on request
      </Typography>
    </Box>
  )
}
