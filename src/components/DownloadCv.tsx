import { useCallback, useState } from 'react'
import { Check, Download, Loader2 } from 'lucide-react'

import { cvFileName } from '../data/cv'

type Status = 'idle' | 'working' | 'done' | 'error'

/**
 * Generates the CV in the browser on demand.
 *
 * The renderer and the template are imported dynamically so that neither ships
 * in the initial bundle: a visitor who never asks for the CV never pays for it.
 */
function useCvDownload() {
  const [status, setStatus] = useState<Status>('idle')

  const download = useCallback(async () => {
    if (status === 'working') return
    setStatus('working')

    try {
      const [{ pdf }, { default: ResumeDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../cv/ResumeDocument'),
      ])

      const blob = await pdf(<ResumeDocument />).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = cvFileName
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Revoked on the next tick; revoking immediately can cancel the download
      // in some browsers.
      setTimeout(() => URL.revokeObjectURL(url), 10_000)

      setStatus('done')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }, [status])

  return { status, download }
}

const labels: Record<Status, string> = {
  idle: 'Download CV',
  working: 'Preparing',
  done: 'Downloaded',
  error: 'Try again',
}

function StatusIcon({ status, size }: { status: Status; size: number }) {
  if (status === 'working') {
    return (
      <Loader2
        size={size}
        style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
      />
    )
  }
  if (status === 'done') return <Check size={size} />
  return <Download size={size} />
}

/**
 * Full button, for the CTA band and the mobile menu.
 */
export default function DownloadCv({
  className = 'btn btn-primary',
  style,
  iconSize = 15,
  label,
}: {
  className?: string
  style?: React.CSSProperties
  iconSize?: number
  label?: string
}) {
  const { status, download } = useCvDownload()

  return (
    <button
      type="button"
      onClick={download}
      disabled={status === 'working'}
      className={className}
      style={{ cursor: status === 'working' ? 'wait' : 'pointer', ...style }}
      aria-label={`${labels[status]}, PDF`}
    >
      {status === 'idle' && label ? label : labels[status]}
      <StatusIcon status={status} size={iconSize} />
    </button>
  )
}

/**
 * Text-only variant, for the header utility strip and the footer, where the
 * surrounding items are plain links.
 */
export function DownloadCvLink({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const { status, download } = useCvDownload()

  return (
    <button
      type="button"
      onClick={download}
      disabled={status === 'working'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        color: 'inherit',
        cursor: status === 'working' ? 'wait' : 'pointer',
      }}
      aria-label={`${labels[status]}, PDF`}
    >
      {compact && status === 'idle' ? 'CV' : labels[status]}
      <StatusIcon status={status} size={compact ? 10 : 13} />
    </button>
  )
}
