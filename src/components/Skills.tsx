import { useState } from 'react'
import { skills } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

const categoryIcons: Record<string, string> = {
  Languages:            '{ }',
  Frontend:             '⬡',
  Backend:              '⬢',
  'Data & Storage':     '▤',
  Mobile:               '▢',
  'Security & Payments':'⚿',
  'Testing & Performance': '◈',
  'Tools & DevOps':     '⚙',
  'Currently Learning': '→',
}

export default function Skills() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <div ref={ref} className={`reveal section-head ${visible ? 'visible' : ''}`}>
          <div className="section-label">Technical Skills</div>
          <h2 className="section-title">What I reach for</h2>
          <p className="section-lede">
            Tools I've used in production, not just tutorials. The "Currently Learning" section is honest.
          </p>
        </div>

        {/* Three-up: nine groups fill 3x3 exactly, where four columns left an
            orphan on the last row. */}
        <div className="grid-3up">
          {skills.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
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
          ? (isLearning ? 'var(--color-accent-strong)' : 'var(--color-border-focus)')
          : (isLearning ? 'var(--color-accent-border)' : 'var(--color-border)')}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--card-pad)',
        transitionDelay: `${index * 60}ms`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
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
