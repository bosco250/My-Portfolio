import { useEffect, useRef } from 'react'
import { ExternalLink, Monitor, X } from 'lucide-react'

import type { projects } from '../data/portfolio'

type Project = typeof projects[0]

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function CaseStudyModal({
  project,
  onOpenPreview,
  onClose,
}: {
  project: Project
  onOpenPreview: () => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Escape to close, and the page behind must not scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div
      className="case-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="case-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-title-${project.id}`}
      >
        <header className="case-head">
          <div style={{ minWidth: 0 }}>
            <div className="section-label" style={{ fontSize: '0.6rem' }}>
              {project.category}
            </div>
            <h2
              id={`case-title-${project.id}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginTop: '5px',
              }}
            >
              {project.title}
            </h2>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pcard-domain"
              >
                {project.liveUrl.replace(/^https?:\/\//, '')}
                <ExternalLink size={11} />
              </a>
            ) : (
              <div className="pcard-domain-static">Private deployment</div>
            )}
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            className="icon-btn"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>
        </header>

        <div className="case-body">
          <section>
            <div className="case-block-title">The problem</div>
            <p className="case-block-body">{project.problem}</p>
          </section>

          <section>
            <div className="case-block-title">What I built</div>
            <p className="case-block-body">{project.solution}</p>
          </section>

          <section>
            <div className="case-block-title">
              {project.challenges.length > 1
                ? 'Hardest parts'
                : 'Hardest part'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {project.challenges.map((c) => (
                <p key={c.problem} className="case-block-body">
                  <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    {c.problem}.
                  </strong>{' '}
                  {c.solution}
                </p>
              ))}
            </div>
          </section>

          {/* "At a glance" rather than "By the numbers": these facts are a mix
              of counts, standards and capabilities, and labelling them as
              numbers made non-numeric entries read as filler. */}
          <section>
            <div className="case-block-title">At a glance</div>
            <dl className="case-metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="metric-card">
                  <dt
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.4,
                      marginBottom: '3px',
                    }}
                  >
                    {m.label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      lineHeight: 1.25,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <div className="case-block-title">Built with</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </section>
        </div>

        <footer className="case-foot">
          <button
            onClick={onOpenPreview}
            className="btn btn-primary"
            style={{ padding: '10px 20px', fontSize: 'var(--text-sm)' }}
          >
            <Monitor size={14} />
            Preview
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ padding: '10px 20px', fontSize: 'var(--text-sm)' }}
            >
              Open site
              <ExternalLink size={14} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ padding: '10px 20px', fontSize: 'var(--text-sm)' }}
            >
              Source
              <GithubIcon size={14} />
            </a>
          )}
        </footer>
      </div>
    </div>
  )
}
