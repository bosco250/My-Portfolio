import Chip from '@mui/material/Chip'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined'
import HighlightOff from '@mui/icons-material/HighlightOff'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { status, type StatusIntent } from '../theme/tokens'

const icons = {
  success: CheckCircleOutlined,
  warning: ScheduleOutlined,
  error: ErrorOutlineOutlined,
  failed: HighlightOff,
  info: InfoOutlined,
} as const

export function StatusIcon({ intent, size = 16 }: { intent: StatusIntent; size?: number }) {
  const Icon = icons[intent]
  return <Icon aria-hidden sx={{ fontSize: size, color: status[intent].fill, flexShrink: 0 }} />
}

/** Status is never colour alone: wash + text colour + icon + label (§5.4). */
export default function StatusBadge({ intent, label }: { intent: StatusIntent; label: string }) {
  const Icon = icons[intent]
  return (
    <Chip
      size="small"
      label={label}
      icon={<Icon aria-hidden />}
      sx={{
        backgroundColor: status[intent].wash,
        color: status[intent].text,
        '& .MuiChip-icon': { color: status[intent].text },
      }}
    />
  )
}
