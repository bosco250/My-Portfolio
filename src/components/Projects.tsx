import { useState, useRef, useEffect } from 'react'
import { ExternalLink, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const statusConfig = {
  live:          { label: 'Live',        color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  'in-progress': { label: 'In Progress', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  archived:      { label: 'Archived',    color: '#606078', bg: 'rgba(96,96,120,0.1)' },
}

// Animated code rain canvas for project image area
function CodeCanvas({ hovered }: { hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const snippets = ['const', '=>', 'async', 'await', 'return', '{}', '[]', 'fn()', '.map', '.then', 'type', 'interface']
    const cols = Math.floor(canvas.width / 48)
    const drops = Array.from({ length: cols }, () => Math.random() * -20)

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,15,0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '11px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        const text = snippets[Math.floor(Math.random() * snippets.length)]
        const alpha = hovered ? 0.18 : 0.07
        ctx.fillStyle = `rgba(0,200,150,${alpha})`
        ctx.fillText(text, i * 48, y * 14)
        drops[i] = y > canvas.height / 14 + 5 ? 0 : y + 0.4
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovered])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.4s' }}
    />
  )
}

// Animated metric value
function MetricValue({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/[\d]/g, '')
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  const { ref, visible } = useReveal()

  useEffect(() => {
    if (!visible || started.current || isNaN(num)) return
    started.current = true
    const duration = 1000
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * num))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, num])

  return (
    <div
      ref={ref}
      style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-accent)' }}
    >
      {isNaN(num) ? value : `${display}${suffix}`}
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const { ref, visible } = useReveal()
  const status = statusConfig[project.status]

  return (
    <article
      ref={ref}
      className={`reveal glow-card project-card ${visible ? 'visible' : ''}`}
      style={{
        background: 'var(--color-bg-elevated)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transitionDelay: `${index * 80}ms`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 48px rgba(0,200,150,0.1)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area with code rain */}
      <div
        className="project-img-area"
        style={{ height: '200px', position: 'relative', overflow: 'hidden' }}
      >
        <CodeCanvas hovered={hovered} />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: '2.5rem',
            color: 'var(--color-accent)',
            opacity: hovered ? 0.3 : 0.12,
            userSelect: 'none',
            transition: 'opacity 0.3s',
          }}
          aria-hidden="true"
        >
          {'{ }'}
        </div>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span className="section-label" style={{ fontSize: '0.6rem' }}>{project.category}</span>
          <span style={{
            fontSize: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            color: status.color,
            background: status.bg,
            padding: '2px 9px',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {status.label}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
          transition: 'color 0.2s',
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          {project.tagline}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge" style={{ color: 'var(--color-text-muted)' }}>+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '2px 0',
            marginBottom: expanded ? '1rem' : 0,
            transition: 'opacity 0.2s, gap 0.2s',
          }}
          aria-expanded={expanded}
          onMouseEnter={(e) => { e.currentTarget.style.gap = '10px' }}
          onMouseLeave={(e) => { e.currentTarget.style.gap = '6px' }}
        >
          {expanded ? 'Hide details' : 'View case study'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expandable case study */}
        {expanded && (
          <div className="expand-enter" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '6px', fontSize: '0.6rem' }}>Problem</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{project.problem}</p>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: '6px', fontSize: '0.6rem' }}>Solution</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{project.solution}</p>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: '6px', fontSize: '0.6rem' }}>Key Challenge</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>{project.challenges[0].problem}:</strong>{' '}
                {project.challenges[0].solution}
              </p>
            </div>

            {/* Metrics with count-up */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.metrics.map((m) => (
                <div key={m.label} className="metric-card">
                  <MetricValue value={m.value} />
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>{m.label}</div>
                </div>
              ))}
            </div>

            <blockquote style={{
              borderLeft: '2px solid var(--color-border)',
              paddingLeft: '12px',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              lineHeight: 1.65,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            >
              "{project.reflection}"
            </blockquote>
          </div>
        )}

        {/* Action links */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 'var(--text-sm)' }}>
              Live Demo <ExternalLink size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 'var(--text-sm)' }}>
              <GithubIcon size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { ref: headRef, visible: headVisible } = useReveal()

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div ref={headRef} className={`reveal ${headVisible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Selected Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Things I've built
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
          Each project is a case study — click to see the problem, decisions, and what I'd do differently.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
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
    </section>
  )
}
