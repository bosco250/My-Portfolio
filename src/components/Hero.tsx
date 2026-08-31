import { useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { experience, projects } from '../data/portfolio'
import { useMousePosition } from '../hooks/useMousePosition'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouse      = useMousePosition()

  const getParallax = (strength: number) => {
    if (typeof window === 'undefined') return { x: 0, y: 0 }
    const w = window.innerWidth || 1000
    const h = window.innerHeight || 800
    return {
      x: ((mouse.x - w / 2) / w) * strength,
      y: ((mouse.y - h / 2) / h) * strength,
    }
  }

  const p1 = getParallax(28)
  const p2 = getParallax(14)

  const stats = [
    { value: `${new Date().getFullYear() - 2024}+`, label: 'years building' },
    { value: `${projects.length}`, label: 'production platforms' },
    { value: '5', label: 'industries shipped' },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-base)',
      }}
    >
      {/* Soft ambient blobs — no grid, no hard gradients */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,122,92,0.09) 0%, transparent 70%)',
            transform: `translate(${p1.x}px, ${p1.y}px)`,
            transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-8%',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,122,92,0.07) 0%, transparent 70%)',
            transform: `translate(${p2.x}px, ${p2.y}px)`,
            transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      </div>

      {/* Content — padding-top ensures clearance below fixed header on all screens */}
      <div
        className="hero-content-inner"
        style={{
          position: 'relative',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(9rem, 18vw, 10.5rem) var(--gutter) clamp(3rem, 6vw, 4rem)',
          boxSizing: 'border-box',
        }}
      >
        {/* Name */}
        <h1
          className="animate-fade-up"
          style={{
            animationDelay: '0ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-4)',
          }}
        >
          <span style={{ display: 'block' }}>Jean Bosco</span>
          <span style={{ display: 'block' }} className="accent-text">Dusengimana</span>
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-up"
          style={{
            animationDelay: '80ms',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: '52ch',
            lineHeight: 1.6,
            marginBottom: 'var(--space-6)',
          }}
        >
          I'm a full-stack developer who ships clean, production-ready code and
          owns a feature completely, from database schema to deployment.
          Currently at{' '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
            {experience[0].company}
          </span>
          .
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '150ms',
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-8)',
          }}
        >
          <a
            href="#projects"
            className="btn btn-primary"
            style={{ padding: '11px 24px', fontSize: 'var(--text-sm)' }}
          >
            See my work
            <ArrowDown size={15} />
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
            style={{ padding: '11px 24px', fontSize: 'var(--text-sm)' }}
          >
            Get in touch
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '220ms',
            display: 'flex',
            gap: 'clamp(1.25rem, 3vw, 2rem)',
            flexWrap: 'wrap',
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 900,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginTop: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
