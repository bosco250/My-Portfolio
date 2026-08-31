import { ArrowRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

export default function Highlights() {
  const { ref, visible } = useReveal()

  const tiles = [
    ...projects.slice(0, 3).map((p) => ({
      eyebrow: p.category,
      title: p.shortTitle,
      meta: p.status === 'live' ? 'Live' : 'In progress',
      href: '#projects',
      accent: false,
    })),
    {
      eyebrow: '1st Place',
      title: 'Hanga Pitch',
      meta: 'Hackathon 2024',
      href: '#experience',
      accent: true,
    },
    {
      eyebrow: 'Shipped',
      title: `${projects.length} Platforms`,
      meta: 'Five industries',
      href: '#projects',
      accent: false,
    },
    {
      eyebrow: 'Availability',
      title: 'Open to Work',
      meta: 'Remote or Kigali',
      href: '#contact',
      accent: true,
    },
  ]

  return (
    <section id="highlights" className="section section-band">
      <div className="section-inner">
        <div
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 'var(--space-5)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div>
            <div className="section-label">Highlights</div>
            <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>
              Top of the pile
            </h2>
          </div>

          <a href="#projects" className="card-cta" style={{ marginTop: 0, paddingTop: 0 }}>
            All projects
            <ArrowRight size={13} />
          </a>
        </div>

        <div className="tile-grid">
          {tiles.map((t, i) => (
            <a
              key={t.title}
              href={t.href}
              className={`tile ${t.accent ? 'tile-accent' : ''}`}
              style={{ animation: `fadeUp 0.5s var(--ease-out-expo) ${i * 50}ms both` }}
            >
              <span className="tile-eyebrow">{t.eyebrow}</span>
              <span className="tile-title">{t.title}</span>
              <span className="tile-meta">{t.meta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
