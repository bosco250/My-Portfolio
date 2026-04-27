import { useEffect, useRef, useState } from 'react'
import { X, RefreshCw, ExternalLink, Monitor, Smartphone, Image } from 'lucide-react'

interface Props {
  url: string
  title: string
  screenshot?: string
  onClose: () => void
}

type ViewMode  = 'desktop' | 'mobile'
type LoadState = 'loading' | 'loaded' | 'screenshot'

// How long to wait before giving up on the iframe and showing screenshot
const IFRAME_TIMEOUT_MS = 4000

export default function BrowserPreviewModal({ url, title, screenshot, onClose }: Props) {
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [view,       setView]      = useState<ViewMode>('desktop')
  const [loadState,  setLoadState] = useState<LoadState>('loading')
  const [reloadKey,  setReloadKey] = useState(0)

  // Lock body scroll + Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Start timeout — if iframe hasn't loaded in time, fall back to screenshot
  useEffect(() => {
    setLoadState('loading')
    timerRef.current = setTimeout(() => {
      // iframe likely blocked — switch to screenshot fallback
      setLoadState('screenshot')
    }, IFRAME_TIMEOUT_MS)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [reloadKey])

  const handleIframeLoad = () => {
    // iframe loaded successfully — cancel the timeout
    if (timerRef.current) clearTimeout(timerRef.current)
    try {
      // If we can access contentDocument it loaded our page (same-origin)
      // If it's cross-origin but not blocked, this throws — that's fine, still loaded
      const doc = iframeRef.current?.contentDocument
      if (doc && doc.title === '') {
        // Empty doc = browser showed its own error page (blocked)
        setLoadState('screenshot')
        return
      }
    } catch {
      // Cross-origin but loaded — that's fine
    }
    setLoadState('loaded')
  }

  const reload = () => {
    setLoadState('loading')
    setReloadKey(k => k + 1)
  }

  const isMobile = view === 'mobile'
  const showScreenshot = loadState === 'screenshot'

  return (
    <div
      className="browser-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
    >
      <div
        className="browser-modal-window"
        style={{ width: isMobile ? '460px' : 'min(1080px, 94vw)' }}
      >
        {/* ── macOS chrome ──────────────────────────────────── */}
        <div className="browser-chrome">
          <div className="browser-traffic-lights">
            <button className="traffic-light tl-red" onClick={onClose} aria-label="Close preview" title="Close" />
            <span className="traffic-light tl-yellow" aria-hidden="true" />
            <span className="traffic-light tl-green"  aria-hidden="true" />
          </div>

          <div className="browser-urlbar">
            {showScreenshot ? (
              <Image size={11} style={{ color: '#F59E0B', flexShrink: 0 }} aria-hidden="true" />
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            <span className="browser-urlbar-text" style={{ color: showScreenshot ? 'rgba(255,255,255,0.35)' : undefined }}>
              {showScreenshot ? `screenshot · ${url}` : url}
            </span>
          </div>

          <div className="browser-controls">
            <button
              className={`browser-view-btn ${view === 'desktop' ? 'active' : ''}`}
              onClick={() => setView('desktop')}
              aria-label="Desktop view" title="Desktop"
            ><Monitor size={14} /></button>

            <button
              className={`browser-view-btn ${view === 'mobile' ? 'active' : ''}`}
              onClick={() => setView('mobile')}
              aria-label="Mobile view" title="Mobile"
            ><Smartphone size={14} /></button>

            {!showScreenshot && (
              <button className="browser-ctrl-btn" onClick={reload} aria-label="Reload" title="Reload">
                <RefreshCw size={13} style={{ animation: loadState === 'loading' ? 'spin 0.8s linear infinite' : 'none' }} />
              </button>
            )}

            <a href={url} target="_blank" rel="noopener noreferrer" className="browser-ctrl-btn" aria-label="Open in new tab" title="Open in new tab">
              <ExternalLink size={13} />
            </a>

            <button className="browser-ctrl-btn browser-close-btn" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* ── Viewport ──────────────────────────────────────── */}
        <div className="browser-viewport">
          {isMobile ? (
            <div className="mobile-frame-outer">
              <div className="mobile-notch" aria-hidden="true" />
              <div className="mobile-iframe-wrap">
                {loadState === 'loading' && <LoadingShimmer />}
                <ViewContent
                  url={url}
                  title={title}
                  screenshot={screenshot}
                  showScreenshot={showScreenshot}
                  loadState={loadState}
                  reloadKey={reloadKey}
                  iframeRef={iframeRef}
                  onLoad={handleIframeLoad}
                />
              </div>
              <div className="mobile-home-bar" aria-hidden="true" />
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {loadState === 'loading' && <LoadingShimmer />}
              <ViewContent
                url={url}
                title={title}
                screenshot={screenshot}
                showScreenshot={showScreenshot}
                loadState={loadState}
                reloadKey={reloadKey}
                iframeRef={iframeRef}
                onLoad={handleIframeLoad}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Shared iframe / screenshot renderer ──────────────────────
interface ViewContentProps {
  url: string
  title: string
  screenshot?: string
  showScreenshot: boolean
  loadState: LoadState
  reloadKey: number
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  onLoad: () => void
}

function ViewContent({ url, title, screenshot, showScreenshot, loadState, reloadKey, iframeRef, onLoad }: Omit<ViewContentProps, 'showIframe'>) {
  if (showScreenshot) {
    return screenshot ? (
      // Real screenshot from microlink / stored image
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={screenshot}
          alt={`Screenshot of ${title}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 100%)',
          padding: '1.5rem 1.25rem 1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>
              Live screenshot
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              This site blocks iframe embedding — showing a live screenshot instead.
            </div>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Open site <ExternalLink size={12} />
          </a>
        </div>
      </div>
    ) : (
      // No screenshot available — clean fallback
      <BlockedFallback url={url} />
    )
  }

  return (
    <iframe
      key={reloadKey}
      ref={iframeRef}
      src={url}
      title={`Preview of ${title}`}
      onLoad={onLoad}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        opacity: loadState === 'loaded' ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    />
  )
}

// ── No live URL modal ─────────────────────────────────────────
export function NoPreviewModal({ title, reason, onClose }: { title: string; reason: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="browser-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog" aria-modal="true" aria-label={`Preview: ${title}`}
    >
      <div className="browser-modal-window" style={{ width: 'min(680px, 92vw)' }}>
        <div className="browser-chrome">
          <div className="browser-traffic-lights">
            <button className="traffic-light tl-red" onClick={onClose} aria-label="Close" />
            <span className="traffic-light tl-yellow" aria-hidden="true" />
            <span className="traffic-light tl-green"  aria-hidden="true" />
          </div>
          <div className="browser-urlbar">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text" style={{ color: 'rgba(255,255,255,0.25)' }}>
              private environment · not publicly deployed
            </span>
          </div>
          <div className="browser-controls">
            <button className="browser-ctrl-btn browser-close-btn" onClick={onClose} aria-label="Close"><X size={13} /></button>
          </div>
        </div>

        <div className="browser-viewport" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-base)' }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              {title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {reason}
            </p>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Blocked fallback (no screenshot) ─────────────────────────
function BlockedFallback({ url }: { url: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '360px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
        <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: 'var(--text-base)' }}>
          Can't embed this site
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          The site blocks iframe embedding for security reasons. Open it directly to see it live.
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}>
          Open site <ExternalLink size={13} />
        </a>
      </div>
    </div>
  )
}

// ── Loading shimmer ───────────────────────────────────────────
function LoadingShimmer() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'var(--color-bg-base)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="shimmer" style={{ height: '40px', width: '100%', borderRadius: '6px' }} />
      <div style={{ display: 'flex', gap: '12px' }}>
        <div className="shimmer" style={{ height: '160px', flex: 2, borderRadius: '6px' }} />
        <div className="shimmer" style={{ height: '160px', flex: 1, borderRadius: '6px' }} />
      </div>
      {[90, 70, 80, 55].map((w, i) => (
        <div key={i} className="shimmer" style={{ height: '12px', width: `${w}%`, borderRadius: '4px', animationDelay: `${i * 0.08}s` }} />
      ))}
    </div>
  )
}
