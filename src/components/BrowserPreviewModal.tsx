/**
 * BrowserPreviewModal
 *
 * Now that hyppopeace.com's Nginx config uses X-Frame-Options: ALLOWALL,
 * we can embed it in a real interactive iframe — full scroll, click, hover.
 *
 * For projects without a liveUrl, we show the NoPreviewModal.
 */

import { useEffect, useRef, useState } from 'react'
import { X, RefreshCw, ExternalLink, Monitor, Smartphone, ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  url: string
  title: string
  onClose: () => void
}

type ViewMode  = 'desktop' | 'mobile'
type LoadState = 'loading' | 'loaded' | 'error'

export default function BrowserPreviewModal({ url, title, onClose }: Props) {
  const iframeRef  = useRef<HTMLIFrameElement>(null)
  const [view,      setView]      = useState<ViewMode>('desktop')
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [currentUrl, setCurrentUrl] = useState(url)

  // Lock scroll + Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Reset on reload/view change
  useEffect(() => {
    setLoadState('loading')
    setCurrentUrl(url)
  }, [reloadKey, url])

  const handleLoad = () => {
    // Try to read the current URL from the iframe (works if same-origin after nav)
    try {
      const loc = iframeRef.current?.contentWindow?.location?.href
      if (loc && loc !== 'about:blank') setCurrentUrl(loc)
    } catch {
      // cross-origin nav — keep showing original url
    }
    setLoadState('loaded')
  }

  const handleError = () => setLoadState('error')

  const reload = () => {
    setLoadState('loading')
    setReloadKey(k => k + 1)
  }

  const isMobile = view === 'mobile'

  // Viewport dimensions
  const desktopWidth  = 'min(1060px, 94vw)'
  const mobileWidth   = '420px'

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
        style={{ width: isMobile ? mobileWidth : desktopWidth }}
      >
        {/* ── macOS chrome ──────────────────────────────────── */}
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

          {/* Back / Forward / Reload */}
          <div style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
            <button
              className="browser-ctrl-btn"
              onClick={() => iframeRef.current?.contentWindow?.history.back()}
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft size={13} />
            </button>
            <button
              className="browser-ctrl-btn"
              onClick={() => iframeRef.current?.contentWindow?.history.forward()}
              aria-label="Forward"
              title="Forward"
            >
              <ArrowRight size={13} />
            </button>
            <button
              className="browser-ctrl-btn"
              onClick={reload}
              aria-label="Reload"
              title="Reload"
            >
              <RefreshCw
                size={13}
                style={{
                  animation: loadState === 'loading' ? 'spin 0.8s linear infinite' : 'none',
                  color: loadState === 'loading' ? 'var(--color-accent)' : undefined,
                }}
              />
            </button>
          </div>

          {/* URL bar */}
          <div className="browser-urlbar" style={{ flex: 1 }}>
            <svg
              width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              aria-hidden="true"
              style={{ color: loadState === 'loaded' ? 'var(--color-accent)' : 'var(--color-text-muted)', flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text">{currentUrl}</span>
            {loadState === 'loading' && (
              <div style={{
                marginLeft: 'auto',
                width: '60%',
                height: '3px',
                borderRadius: '2px',
                background: 'var(--color-border)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <div style={{
                  height: '100%',
                  background: 'var(--color-accent)',
                  borderRadius: '2px',
                  animation: 'browser-progress 1.5s ease-in-out infinite',
                }} />
              </div>
            )}
          </div>

          {/* View toggle + external link + close */}
          <div className="browser-controls">
            <button
              className={`browser-view-btn ${!isMobile ? 'active' : ''}`}
              onClick={() => { setView('desktop'); reload() }}
              aria-label="Desktop view"
              title="Desktop"
            >
              <Monitor size={14} />
            </button>
            <button
              className={`browser-view-btn ${isMobile ? 'active' : ''}`}
              onClick={() => { setView('mobile'); reload() }}
              aria-label="Mobile view"
              title="Mobile"
            >
              <Smartphone size={14} />
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

        {/* ── Viewport ──────────────────────────────────────── */}
        <div className="browser-viewport">
          {isMobile ? (
            /* iPhone frame */
            <div className="mobile-frame-outer">
              <div className="mobile-notch" aria-hidden="true" />
              <div className="mobile-iframe-wrap">
                {loadState === 'loading' && <BrowserShimmer />}
                {loadState === 'error'   && <ErrorState url={url} />}
                <iframe
                  key={`${reloadKey}-mobile`}
                  ref={iframeRef}
                  src={url}
                  title={`Preview of ${title}`}
                  onLoad={handleLoad}
                  onError={handleError}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: loadState === 'error' ? 'none' : 'block',
                    opacity: loadState === 'loaded' ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>
              <div className="mobile-home-bar" aria-hidden="true" />
            </div>
          ) : (
            /* Desktop full-width */
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {loadState === 'loading' && <BrowserShimmer />}
              {loadState === 'error'   && <ErrorState url={url} />}
              <iframe
                key={`${reloadKey}-desktop`}
                ref={iframeRef}
                src={url}
                title={`Preview of ${title}`}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: loadState === 'error' ? 'none' : 'block',
                  opacity: loadState === 'loaded' ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Shimmer skeleton ──────────────────────────────────────────
function BrowserShimmer() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      background: '#f8f8f8',
      padding: '0',
      overflow: 'hidden',
    }}>
      {/* Fake page nav */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '12px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '20px', background: '#e8e8e8', borderRadius: '4px' }} />
        <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
          {[60, 50, 55, 45].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '12px', background: '#e8e8e8', borderRadius: '3px' }} />
          ))}
        </div>
      </div>
      {/* Fake hero */}
      <div className="shimmer" style={{ height: '220px', width: '100%', borderRadius: 0 }} />
      {/* Fake content */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="shimmer" style={{ height: '14px', width: '55%', borderRadius: '4px' }} />
        <div className="shimmer" style={{ height: '10px', width: '80%', borderRadius: '4px' }} />
        <div className="shimmer" style={{ height: '10px', width: '70%', borderRadius: '4px' }} />
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="shimmer" style={{ height: '80px', flex: 1, borderRadius: '6px' }} />
          ))}
        </div>
      </div>
      {/* Loading bar at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#e5e5e5', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: 'var(--color-accent)',
          animation: 'browser-progress 1.5s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}

// ── Error state ───────────────────────────────────────────────
function ErrorState({ url }: { url: string }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2,
      background: 'var(--color-bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '320px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
        <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: 'var(--text-base)' }}>
          Couldn't load the page
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          The site may be temporarily unavailable. Try opening it directly.
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}>
          Open site <ExternalLink size={13} />
        </a>
      </div>
    </div>
  )
}

// ── No live URL modal ─────────────────────────────────────────
export function NoPreviewModal({ title, reason, onClose }: {
  title: string
  reason: string
  onClose: () => void
}) {
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
      <div className="browser-modal-window" style={{ width: 'min(620px, 92vw)' }}>
        <div className="browser-chrome">
          <div className="browser-traffic-lights">
            <button className="traffic-light tl-red" onClick={onClose} aria-label="Close" />
            <span className="traffic-light tl-yellow" aria-hidden="true" />
            <span className="traffic-light tl-green"  aria-hidden="true" />
          </div>
          <div className="browser-urlbar">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text" style={{ color: 'rgba(255,255,255,0.25)' }}>
              private · not publicly deployed
            </span>
          </div>
          <div className="browser-controls">
            <button className="browser-ctrl-btn browser-close-btn" onClick={onClose} aria-label="Close">
              <X size={13} />
            </button>
          </div>
        </div>
        <div className="browser-viewport" style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-base)' }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '380px' }}>
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
