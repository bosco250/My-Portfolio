import { useState } from 'react'
import { experience, achievement } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="experience"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Experience</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Where I've worked
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {experience.map((job, i) => (
            <ExperienceCard key={i} job={job} index={i} />
          ))}
          <AchievementCard />
        </div>
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
        padding: '1.75rem',
        transitionDelay: `${index * 80}ms`,
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 10px 36px rgba(0,0,0,0.25)' : 'none',
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

function AchievementCard() {
  const { ref, visible } = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`reveal glow-card ${visible ? 'visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,200,150,0.06)' : 'var(--color-accent-muted)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'rgba(0,200,150,0.25)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        transitionDelay: '160ms',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 10px 36px rgba(0,200,150,0.12)' : 'none',
      }}
    >
      {/* Accent line */}
      <div
        className="exp-accent"
        style={{ height: hovered ? '100%' : '0%', background: 'linear-gradient(to bottom, #FFD700, transparent)' }}
        aria-hidden="true"
      />

      <div style={{ paddingLeft: '0.75rem' }}>
        {/* Trophy + date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🏆</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: '#FFD700',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              1st Place
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
            2024
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
          Hanga Pitch Hackathon
        </h3>

        {/* Org */}
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 500, marginBottom: '0.75rem' }}>
          RISA & ICT Chamber Rwanda
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> · National competition</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
          {achievement.description}
        </p>

        {/* Highlights */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'Competed against 200+ teams nationwide',
            'Built and shipped a working civic tech product in 48 hours',
            'Invited to present at Rwanda ICT Week 2024',
          ].map((h) => (
            <li
              key={h}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
                lineHeight: 1.5, transition: 'color 0.2s, transform 0.2s',
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
