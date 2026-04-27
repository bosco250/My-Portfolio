import { useEffect, useRef, useState } from 'react'
import { X, RefreshCw, ExternalLink, AlertTriangle, Monitor, Smartphone } from 'lucide-react'

interface Props {
  url: string
  title: string
  onClose: () => void
}

type ViewMode = 'desktop' | 'mobile'
type LoadState = 'loading' | 'loaded' | 'blocked'

export default function BrowserPreviewModal({ url, title, onClose }: Props) {
  const iframeRef   = useRef<HTMLIFrameElement>(null)
  const [view,      setView]      = useState<ViewMode>('desktop')
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleLoad = () => setLoadState('loaded')
  const handleError = () => setLoadState('blocked')
  const reload = () => { setLoadState('loading'); setReloadKey(k => k + 1) }

  const isMobile = view === 'mobile'

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
        style={{ width: isMobile ? '420px' : 'min(1100px, 92vw)' }}
      >
        {/* ── macOS window chrome ─────────────────────────────── */}
        <div className="browser-chrome">
          {/* Traffic lights */}
          <div className="browser-traffic-lights">
            <button
              className="traffic-light tl-red"
              onClick={onClose}
              aria-label="Close preview"
              title="Close"
            />
            <span className="traffic-light tl-yellow" aria-hidden="true" />
            <span className="traffic-light tl-green"  aria-hidden="true" />
          </div>

          {/* URL bar */}
          <div className="browser-urlbar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text">{url}</span>
          </div>

          {/* Controls */}
          <div className="browser-controls">
            <button
              className={`browser-view-btn ${view === 'desktop' ? 'active' : ''}`}
              onClick={() => setView('desktop')}
              aria-label="Desktop view"
              title="Desktop"
            >
              <Monitor size={14} />
            </button>
            <button
              className={`browser-view-btn ${view === 'mobile' ? 'active' : ''}`}
              onClick={() => setView('mobile')}
              aria-label="Mobile view"
              title="Mobile"
            >
              <Smartphone size={14} />
            </button>
            <button
              className="browser-ctrl-btn"
              onClick={reload}
              aria-label="Reload"
              title="Reload"
            >
              <RefreshCw size={13} className={loadState === 'loading' ? 'spin-once' : ''} />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="browser-ctrl-btn"
              aria-label="Open in new tab"
              title="Open in new tab"
            >
              <ExternalLink size={13} />
            </a>
            <button
              className="browser-ctrl-btn browser-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* ── Viewport ─────────────────────────────────────────── */}
        <div className="browser-viewport">
          {/* Mobile device frame */}
          {isMobile && (
            <div className="mobile-frame-outer">
              <div className="mobile-notch" aria-hidden="true" />
              <div className="mobile-iframe-wrap">
                {loadState === 'loading' && <LoadingShimmer />}
                {loadState === 'blocked' && <BlockedState url={url} />}
                <iframe
                  key={reloadKey}
                  ref={iframeRef}
                  src={url}
                  title={`Preview of ${title}`}
                  onLoad={handleLoad}
                  onError={handleError}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: loadState === 'blocked' ? 'none' : 'block',
                    opacity: loadState === 'loading' ? 0 : 1,
                    transition: 'opacity 0.3s',
                  }}
                />
              </div>
              <div className="mobile-home-bar" aria-hidden="true" />
            </div>
          )}

          {/* Desktop iframe */}
          {!isMobile && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {loadState === 'loading' && <LoadingShimmer />}
              {loadState === 'blocked'  && <BlockedState url={url} />}
              <iframe
                key={reloadKey}
                ref={iframeRef}
                src={url}
                title={`Preview of ${title}`}
                onLoad={handleLoad}
                onError={handleError}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: loadState === 'blocked' ? 'none' : 'block',
                  opacity: loadState === 'loading' ? 0 : 1,
                  transition: 'opacity 0.3s',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── No live URL state ─────────────────────────────────────────
export function NoPreviewModal({ title, reason, onClose }: { title: string; reason: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="browser-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
    >
      <div className="browser-modal-window" style={{ width: 'min(720px, 92vw)' }}>
        {/* Chrome */}
        <div className="browser-chrome">
          <div className="browser-traffic-lights">
            <button className="traffic-light tl-red" onClick={onClose} aria-label="Close" />
            <span className="traffic-light tl-yellow" aria-hidden="true" />
            <span className="traffic-light tl-green"  aria-hidden="true" />
          </div>
          <div className="browser-urlbar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text" style={{ color: 'var(--color-text-muted)' }}>
              localhost · not publicly deployed
            </span>
          </div>
          <div className="browser-controls">
            <button className="browser-ctrl-btn browser-close-btn" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="browser-viewport" style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '420px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              {title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {reason}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={onClose} className="btn btn-ghost" style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Loading shimmer ───────────────────────────────────────────
function LoadingShimmer() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'var(--color-bg-base)', display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      {[100, 60, 80, 40, 70, 55].map((w, i) => (
        <div key={i} className="shimmer" style={{ height: '14px', width: `${w}%`, borderRadius: '4px', animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  )
}

// ── Blocked / X-Frame-Options state ──────────────────────────
function BlockedState({ url }: { url: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'var(--color-bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '380px' }}>
        <AlertTriangle size={32} style={{ color: '#F59E0B', marginBottom: '1rem' }} />
        <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: 'var(--text-base)' }}>
          Preview blocked by the site
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          This site sets <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--color-bg-overlay)', padding: '1px 5px', borderRadius: '3px' }}>X-Frame-Options: DENY</code>, which prevents embedding in iframes.
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}>
          Open in new tab <ExternalLink size={13} />
        </a>
      </div>
    </div>
  )
}
