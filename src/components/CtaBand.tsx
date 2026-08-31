import { ArrowRight } from 'lucide-react'
import { personal } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import DownloadCv from './DownloadCv'

export default function CtaBand() {
  const { ref, visible } = useReveal()

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-inner">
        <div ref={ref} className={`reveal cta-band ${visible ? 'visible' : ''}`}>
          <div>
            {personal.isAvailable && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    background: 'var(--color-accent)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {personal.availabilityText}
              </span>
            )}

            <h2 className="cta-band-title">
              Looking for someone who can own the whole stack?
            </h2>

            <p className="cta-band-sub">
              I am open to full-time remote roles and freelance work. Typical reply
              within a day, from {personal.location} ({personal.timezone}).
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: '200px',
            }}
          >
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '13px 26px' }}
            >
              Start a conversation
              <ArrowRight size={15} />
            </a>

            <DownloadCv
              className="btn"
              style={{
                justifyContent: 'center',
                padding: '13px 26px',
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
