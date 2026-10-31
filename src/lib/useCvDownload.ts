import { createElement, useCallback, useState } from 'react'
import { cvFileName } from '../data/cv'
import { useNotices } from '../app/noticeContext'

export type CvStatus = 'idle' | 'working'

/**
 * Builds the CV in the browser on demand. The PDF renderer and template are
 * loaded only when asked for, so visitors who never download it never pay for it.
 */
export function useCvDownload() {
  const [status, setStatus] = useState<CvStatus>('idle')
  const notify = useNotices()

  const download = useCallback(async () => {
    if (status === 'working') return
    setStatus('working')
    try {
      const [{ pdf }, { default: ResumeDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../cv/ResumeDocument'),
      ])
      const blob = await pdf(createElement(ResumeDocument) as Parameters<typeof pdf>[0]).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = cvFileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      // Revoking straight away can cancel the download in some browsers.
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
      notify('CV downloaded.', 'success')
    } catch {
      notify('The CV could not be prepared. Try again in a moment.', 'error')
    } finally {
      setStatus('idle')
    }
  }, [status, notify])

  return { status, download }
}
