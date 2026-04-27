import { useState } from 'react'
import { skills } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

const categoryIcons: Record<string, string> = {
  Frontend:            '⬡',
  Backend:             '⬢',
  'Tools & Infra':     '⚙',
  'Currently Learning':'→',
}

export default function Skills() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
        <div className="section-label" style={{ marginBottom: '0.75rem' }}>Technical Skills</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          What I reach for
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: 1.6 }}>
          Tools I've used in production, not just tutorials. The "Currently Learning" section is honest.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {skills.map((group, i) => (
          <SkillGroup key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}

function SkillGroup({ group, index }: { group: typeof skills[0]; index: number }) {
  const { ref, visible } = useReveal()
  const [hovered, setHovered] = useState(false)
  const isLearning = group.category === 'Currently Learning'

  return (
    <div
      ref={ref}
      className={`reveal glow-card ${visible ? 'visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isLearning ? 'var(--color-accent-muted)' : 'var(--color-bg-elevated)',
        border: `1px solid ${hovered
          ? (isLearning ? 'rgba(0,200,150,0.4)' : 'var(--color-border-focus)')
          : (isLearning ? 'rgba(0,200,150,0.2)' : 'var(--color-border)')}`,
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        transitionDelay: `${index * 60}ms`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--color-accent)', fontSize: '1rem', fontFamily: 'var(--font-mono)' }} aria-hidden="true">
          {categoryIcons[group.category] ?? '·'}
        </span>
        <span className="section-label" style={{ fontSize: '0.6rem' }}>{group.category}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {group.items.map((item) => (
          <span key={item} className="tech-badge" style={{ color: isLearning ? 'var(--color-accent)' : undefined }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
