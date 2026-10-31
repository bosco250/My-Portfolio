import { useCallback, useState, type ReactNode } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { status, type StatusIntent, shadow, neutral } from '../theme/tokens'
import { StatusIcon } from '../components/StatusBadge'

import { NoticeContext, type Notify } from './noticeContext'

interface Notice {
  key: number
  message: string
  intent: StatusIntent
}

/** Notices: top centre, white, coloured left edge, four seconds, dismissible (§12.4). */
export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [open, setOpen] = useState(false)

  const notify = useCallback<Notify>((message, intent = 'success') => {
    setNotice({ key: Date.now(), message, intent })
    setOpen(true)
  }, [])

  const close = (_: unknown, reason?: string) => {
    if (reason !== 'clickaway') setOpen(false)
  }

  return (
    <NoticeContext.Provider value={notify}>
      {children}
      <Snackbar
        key={notice?.key}
        open={open}
        onClose={close}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 8, sm: 12 } }}
      >
        <Paper
          role="status"
          sx={{
            position: 'relative',
            minWidth: { sm: 320 },
            maxWidth: 480,
            pl: 4,
            pr: 1,
            py: 1,
            boxShadow: shadow.dialog,
            border: `1px solid ${neutral.border}`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '0 auto 0 0',
              width: 4,
              backgroundColor: status[notice?.intent ?? 'success'].fill,
            },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {notice && <StatusIcon intent={notice.intent} />}
            <Typography variant="body2" sx={{ flex: 1, color: neutral.ink, fontWeight: 500 }}>
              {notice?.message}
            </Typography>
            <IconButton size="small" aria-label="Dismiss notice" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Paper>
      </Snackbar>
    </NoticeContext.Provider>
  )
}
