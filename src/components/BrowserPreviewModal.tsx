/**
 * BrowserPreviewModal
 *
 * Industry-standard approach for portfolio project previews:
 * X-Frame-Options cannot be bypassed client-side — it's a browser security
 * enforcement. The correct solution used by Framer, Linear, and similar
 * products is screenshot-based preview for sites you don't control.
 *
 * Strategy:
 *  1. If project has a staticScreenshot → use it (fastest, most reliable)
 *  2. Otherwise → fetch live screenshot via Microlink API (free, no key needed)
 *  3. "Open site" button always visible for the real thing
 */

import { useEffect, useState } from 'react'
import { X, ExternalLink, Monitor, Smartphone, RefreshCw } from 'lucide-react'

interface Props {
  url: string
  title: string
  /** Path to a local/CDN screenshot, e.g. /screenshots/breakthrough.jpg */
  staticScreenshot?: string
  onClose: () => void
}

type ViewMode   = 'desktop' | 'mobile'
type ImageState = 'loading' | 'loaded' | 'error'

// Microlink embed URL — returns the screenshot image directly (no JSON, no API key)
// ?embed=screenshot.url makes it return the image URL as a redirect
function getMicrolinkUrl(url: string, mobile: boolean) {
  const params = new URLSearchParams({
    url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    ...(mobile ? { viewport: JSON.stringify({ width: 375, height: 812 }) } : {}),
  })
  return `https://api.microlink.io/?${params.toString()}`
}

export default function BrowserPreviewModal({ url, title, staticScreenshot, onClose }: Props) {
  const [view,       setView]       = useState<ViewMode>('desktop')
  const [imgState,   setImgState]   = useState<ImageState>('loading')
  const [refreshKey, setRefreshKey] = useState(0)

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

  // Reset image state when view or refresh changes
  useEffect(() => { setImgState('loading') }, [view, refreshKey])

  const isMobile = view === 'mobile'

  // Prefer static screenshot, fall back to Microlink live screenshot
  const imgSrc = staticScreenshot || getMicrolinkUrl(url, isMobile)

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
        style={{ width: isMobile ? '480px' : 'min(1060px, 94vw)' }}
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

          {/* URL bar */}
          <div className="browser-urlbar">
            <svg
              width="11" height="11" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              aria-hidden="true"
              style={{ color: 'var(--color-accent)', flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="browser-urlbar-text">{url}</span>
          </div>

          {/* Controls */}
          <div className="browser-controls">
            <button
              className={`browser-view-btn ${!isMobile ? 'active' : ''}`}
              onClick={() => setView('desktop')}
              aria-label="Desktop view"
              title="Desktop"
            >
              <Monitor size={14} />
            </button>

            <button
              className={`browser-view-btn ${isMobile ? 'active' : ''}`}
              onClick={() => setView('mobile')}
              aria-label="Mobile view"
              title="Mobile"
            >
              <Smartphone size={14} />
            </button>

            {!staticScreenshot && (
              <button
                className="browser-ctrl-btn"
                onClick={() => setRefreshKey(k => k + 1)}
                aria-label="Refresh screenshot"
                title="Refresh screenshot"
              >
                <RefreshCw
                  size={13}
                  style={{
                    animation: imgState === 'loading' ? 'spin 0.8s linear infinite' : 'none',
                  }}
                />
              </button>
            )}

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
              <div className="mobile-iframe-wrap" style={{ background: '#fff' }}>
                <ScreenshotView
                  key={`${view}-${refreshKey}`}
                  src={imgSrc}
                  alt={title}
                  url={url}
                  imgState={imgState}
                  onLoad={() => setImgState('loaded')}
                  onError={() => setImgState('error')}
                />
              </div>
              <div className="mobile-home-bar" aria-hidden="true" />
            </div>
          ) : (
            /* Desktop full-width */
            <ScreenshotView
              key={`${view}-${refreshKey}`}
              src={imgSrc}
              alt={title}
              url={url}
              imgState={imgState}
              onLoad={() => setImgState('loaded')}
              onError={() => setImgState('error')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Screenshot view with shimmer + error state ────────────────
interface SVProps {
  src: string
  alt: string
  url: string
  imgState: ImageState
  onLoad: () => void
  onError: () => void
}

function ScreenshotView({ src, alt, url, imgState, onLoad, onError }: SVProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#f5f5f5' }}>
      {/* Shimmer skeleton while loading */}
      {imgState === 'loading' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'var(--color-bg-base)',
          padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {/* Fake browser nav bar */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
            <div className="shimmer" style={{ width: '60px', height: '8px', borderRadius: '4px' }} />
            <div className="shimmer" style={{ width: '80px', height: '8px', borderRadius: '4px' }} />
            <div className="shimmer" style={{ width: '50px', height: '8px', borderRadius: '4px' }} />
          </div>
          {/* Fake hero */}
          <div className="shimmer" style={{ height: '180px', width: '100%', borderRadius: '8px' }} />
          {/* Fake content rows */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="shimmer" style={{ height: '100px', flex: 1, borderRadius: '6px' }} />
            <div className="shimmer" style={{ height: '100px', flex: 1, borderRadius: '6px' }} />
            <div className="shimmer" style={{ height: '100px', flex: 1, borderRadius: '6px' }} />
          </div>
          {[85, 65, 75].map((w, i) => (
            <div key={i} className="shimmer" style={{ height: '10px', width: `${w}%`, borderRadius: '4px', animationDelay: `${i * 0.1}s` }} />
          ))}
          {/* Loading label */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)',
          }}>
            <RefreshCw size={11} style={{ animation: 'spin 0.8s linear infinite', color: 'var(--color-accent)' }} />
            Capturing screenshot…
          </div>
        </div>
      )}

      {/* Error state */}
      {imgState === 'error' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'var(--color-bg-base)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '320px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
            <h4 style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              color: 'var(--color-text-primary)', marginBottom: '0.5rem',
              fontSize: 'var(--text-base)',
            }}>
              Screenshot unavailable
            </h4>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
              lineHeight: 1.6, marginBottom: '1.25rem',
            }}>
              The screenshot service couldn't capture this page right now.
              Open it directly to see it live.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}
            >
              Open site <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* The screenshot image */}
      <img
        src={src}
        alt={`Screenshot of ${alt}`}
        onLoad={onLoad}
        onError={onError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
          opacity: imgState === 'loaded' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Bottom overlay — always visible once loaded */}
      {imgState === 'loaded' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)',
          padding: '2.5rem 1.5rem 1.25rem',
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '1rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--color-text-muted)', marginBottom: '3px', letterSpacing: '0.05em',
            }}>
              live screenshot
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              {url}
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Open site <ExternalLink size={12} />
          </a>
        </div>
      )}
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
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
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

        <div className="browser-viewport" style={{
          height: '280px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-bg-base)',
        }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '380px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
              fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem',
            }}>
              {title}
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
              lineHeight: 1.65, marginBottom: '1.5rem',
            }}>
              {reason}
            </p>
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
