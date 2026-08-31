import { useState } from 'react'
import { experience, achievement } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section id="experience" className="section section-band">
      <div className="section-inner">
        <div ref={ref} className={`reveal section-head ${visible ? 'visible' : ''}`}>
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I've worked</h2>
          <p className="section-lede">
            Four years of shipping production software, from freelance client work to
            multi-platform systems used by real businesses.
          </p>
        </div>

        <div className="grid-2up">
          {experience.map((job, i) => (
            <ExperienceCard key={i} job={job} index={i} />
          ))}
        </div>

        <AchievementBand />
      </div>
    </section>
  )
}

function ExperienceCard({ job, index }: { job: typeof experience[0]; index: number }) {
  const { ref, visible } = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`reveal glow-card ${visible ? 'visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-bg-base)',
        border: `1px solid ${hovered ? 'var(--color-border-focus)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--card-pad)',
        transitionDelay: `${index * 80}ms`,
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      {/* Animated accent line */}
      <div
        className="exp-accent"
        style={{ height: hovered ? '100%' : '0%' }}
        aria-hidden="true"
      />

      <div style={{ paddingLeft: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {job.role}
          </h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
            {job.period}
          </span>
        </div>

        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 500, marginBottom: '0.75rem' }}>
          {job.company}
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> · {job.location}</span>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
          {job.description}
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {job.highlights.map((h) => (
            <li
              key={h}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)'
                e.currentTarget.style.transform = 'translateX(3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>▸</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AchievementBand() {
  const { ref, visible } = useReveal()

  const highlights = [
    'Competed against 200+ teams nationwide',
    'Built and shipped a working civic tech product in 48 hours',
    'Invited to present at Rwanda ICT Week 2024',
  ]

  return (
    <div
      ref={ref}
      className={`reveal feature-band ${visible ? 'visible' : ''}`}
      style={{ marginTop: 'var(--space-5)', transitionDelay: '120ms' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '3px',
          background: 'var(--color-accent-gold)',
        }}
      />

      <div className="feature-band-inner" style={{ paddingLeft: 'var(--space-3)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🏆</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent-gold)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              1st Place · 2024
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            marginBottom: 'var(--space-2)',
          }}>
            Hanga Pitch Hackathon
          </h3>

          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 500, marginBottom: 'var(--space-3)' }}>
            RISA &amp; ICT Chamber Rwanda
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> · National competition</span>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            {achievement.description}
          </p>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {highlights.map((h) => (
            <li
              key={h}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: 'var(--color-accent-gold)', flexShrink: 0, marginTop: '2px' }}>▸</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
