import { useState } from 'react'
import { Download, MapPin, GraduationCap, Award } from 'lucide-react'
import { personal, achievement } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const { ref, visible }   = useReveal()
  const { ref: ref2, visible: visible2 } = useReveal()

  return (
    <section
      id="about"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>About</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              The person<br />
              <span className="gradient-text">behind the code</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {personal.bio.map((para, i) => (
                <p key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
              {[
                { icon: <MapPin size={15} />, text: `${personal.location} · UTC+2 · Comfortable with remote teams across Europe & Africa` },
                { icon: <GraduationCap size={15} />, text: personal.education },
                { icon: <Award size={15} />, text: achievement.title },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Resume */}
            <a
              href="/resume/jean-bosco-resume-2026.pdf"
              download
              className="btn btn-ghost"
              style={{ marginTop: '2rem', padding: '12px 24px', fontSize: 'var(--text-sm)' }}
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>

          {/* Right */}
          <div ref={ref2} className={`reveal ${visible2 ? 'visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <InfoCard title="How I work">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {personal.workingStyle.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title="Languages">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {personal.languages.map((lang) => (
                  <div key={lang.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{lang.name}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard title="Currently learning" accent>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {personal.currentlyLearning}
              </p>
            </InfoCard>

            <InfoCard title="Certifications">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {personal.certifications.map((cert) => (
                  <li key={cert} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ title, children, accent = false }: { title: string; children: React.ReactNode; accent?: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="glow-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: accent ? 'var(--color-accent-muted)' : 'var(--color-bg-base)',
        border: `1px solid ${hovered ? (accent ? 'rgba(0,200,150,0.35)' : 'var(--color-border-focus)') : (accent ? 'rgba(0,200,150,0.2)' : 'var(--color-border)')}`,
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 24px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      <div className="section-label" style={{ marginBottom: '1rem', fontSize: '0.6rem' }}>{title}</div>
      {children}
    </div>
  )
}
