import { useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Monitor } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import BrowserPreviewModal, { NoPreviewModal } from './BrowserPreviewModal'
import CaseStudyModal from './CaseStudyModal'

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const statusConfig = {
  live:          { label: 'Live',        color: 'var(--color-status-live)' },
  'in-progress': { label: 'In progress', color: 'var(--color-status-wip)' },
  archived:      { label: 'Archived',    color: 'var(--color-text-muted)' },
}

type ModalKind = null | 'case' | 'preview'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [modal, setModal] = useState<ModalKind>(null)
  const { ref, visible } = useReveal()
  const caseTriggerRef = useRef<HTMLButtonElement>(null)
  const status = statusConfig[project.status]

  // Returning focus to the button that opened the dialog keeps keyboard users
  // where they were in the grid.
  const closeModal = () => {
    setModal(null)
    caseTriggerRef.current?.focus()
  }

  return (
    <>
      <article
        ref={ref}
        className={`reveal pcard ${visible ? 'visible' : ''}`}
        style={{ transitionDelay: `${index * 70}ms` }}
        aria-labelledby={`pcard-title-${project.id}`}
      >
        <div className="pcard-meta">
          <span className="section-label" style={{ fontSize: '0.58rem' }}>
            {project.category}
          </span>
          {/* Status is carried by the text, not only the dot colour. */}
          <span className="pcard-status" style={{ color: status.color }}>
            <span
              className="pcard-status-dot"
              style={{ background: status.color }}
              aria-hidden="true"
            />
            {status.label}
          </span>
        </div>

        <h3 id={`pcard-title-${project.id}`} className="pcard-title line-clamp-2">
          {project.title}
        </h3>

        <div className="pcard-domain-row">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pcard-domain"
              aria-label={`Open ${project.title} at ${project.liveUrl.replace(/^https?:\/\//, '')} in a new tab`}
            >
              {project.liveUrl.replace(/^https?:\/\//, '')}
              <ExternalLink size={10} aria-hidden="true" />
            </a>
          ) : (
            <span className="pcard-domain-static">Private deployment</span>
          )}
        </div>

        <p className="pcard-tagline line-clamp-3">{project.tagline}</p>

        {/* Two chips plus a counter always fits one row, even at the narrowest
            card width. The full stack is listed in the case study. */}
        <div className="pcard-tech">
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
          {project.tech.length > 2 && (
            <span
              className="tech-badge"
              style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
              title={project.tech.slice(2).join(', ')}
            >
              +{project.tech.length - 2} more
            </span>
          )}
        </div>

        <div className="pcard-foot">
          <button
            ref={caseTriggerRef}
            onClick={() => setModal('case')}
            className="card-cta"
            aria-label={`Read the ${project.title} case study`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 0, paddingTop: 0 }}
          >
            Read case study
            <ArrowRight size={13} aria-hidden="true" />
          </button>

          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={() => setModal('preview')}
              className="icon-btn"
              aria-label={`Preview ${project.title}`}
              title="Preview"
            >
              <Monitor size={14} aria-hidden="true" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`View ${project.title} source code on GitHub`}
                title="View source"
              >
                <GithubIcon size={14} />
              </a>
            )}
          </div>
        </div>
      </article>

      {modal === 'case' && (
        <CaseStudyModal
          project={project}
          onOpenPreview={() => setModal('preview')}
          onClose={closeModal}
        />
      )}

      {modal === 'preview' && (
        project.liveUrl
          ? <BrowserPreviewModal
              url={project.liveUrl}
              title={project.title}
              staticScreenshot={project.screenshot}
              onClose={closeModal}
            />
          : <NoPreviewModal
              title={project.title}
              reason="This project runs in a private environment and isn't publicly accessible. The case study covers the architecture, the decisions, and what came out of it."
              onClose={closeModal}
            />
      )}
    </>
  )
}

export default function Projects() {
  const { ref: headRef, visible: headVisible } = useReveal()

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div ref={headRef} className={`reveal section-head ${headVisible ? 'visible' : ''}`}>
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-lede">
            Seven platforms running in production. Open any case study for the
            problem it solved, the hardest part of building it, and what shipped.
          </p>
        </div>

        <div className="grid-3up">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 'var(--head-gap)', textAlign: 'center' }}>
          <a
            href="https://github.com/bosco250"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', textDecoration: 'none', transition: 'color 0.2s, gap 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.gap = '12px' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.gap = '8px' }}
          >
            More on GitHub <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
