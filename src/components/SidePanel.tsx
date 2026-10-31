import { useId, type FormEvent, type ReactNode } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import { layout, navy, neutral, shadow } from '../theme/tokens'

type Size = keyof typeof layout.panel

interface Props {
  open: boolean
  onClose: () => void
  size?: Size
  /** Width of the panel beneath, when this one opens on top of it. */
  nestedOver?: Size
  title: ReactNode
  subtitle?: ReactNode
  /** Sits under the title: badges, metadata. */
  meta?: ReactNode
  footer?: ReactNode
  children: ReactNode
  /** Rendered as a form so Enter submits and the footer holds the actions. */
  onSubmit?: () => void
}

/**
 * Right-hand panel for a record or a form (§12.1). The list stays visible:
 * at most 80% of the window, and 160px of the list remains from tablet up.
 * A nested panel is 72px narrower than the one beneath it.
 */
export default function SidePanel({ open, onClose, size = 'md', nestedOver, title, subtitle, meta, footer, children, onSubmit }: Props) {
  const titleId = useId()
  const base = layout.panel[size]
  const width = nestedOver ? Math.min(base, layout.panel[nestedOver] - layout.nestedStep) : base

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 250, exit: 200 }}
      slotProps={{
        paper: {
          role: 'dialog',
          'aria-labelledby': titleId,
          sx: {
            width: { xs: '100vw', sm: `min(${width}px, ${layout.panelMax}, calc(100vw - ${layout.listVisible}px))` },
            backgroundColor: neutral.white,
            boxShadow: shadow.dialog,
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <Box
        component={onSubmit ? 'form' : 'div'}
        noValidate
        onSubmit={
          onSubmit
            ? (e: FormEvent) => {
                e.preventDefault()
                onSubmit()
              }
            : undefined
        }
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 3,
            px: { xs: 4, sm: 5 },
            py: 3,
            borderBottom: `1px solid ${neutral.border}`,
            flexShrink: 0,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
            <Typography id={titleId} variant="h2" component="h2" sx={{ color: navy.primary }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" component="p" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
            {meta && <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>{meta}</Box>}
          </Box>
          <Tooltip title="Close panel">
            <IconButton aria-label="Close panel" onClick={onClose} sx={{ mr: -1.5 }}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 4, sm: 5 }, py: 4 }}>{children}</Box>

        {/* Footer: actions and validation, never off-screen */}
        {footer && (
          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: { xs: 4, sm: 5 },
              py: 3,
              borderTop: `1px solid ${neutral.border}`,
              backgroundColor: neutral.white,
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

/** A labelled block inside a panel body. */
export function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ '& + &': { mt: 5 } }}>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
