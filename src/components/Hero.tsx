import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { experience, projects } from '../data/portfolio'
import { useMousePosition } from '../hooks/useMousePosition'

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
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
  const p2 = getParallax(16)
  const p3 = getParallax(10)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const size = 64
      ctx.strokeStyle = 'rgba(20,22,28,0.045)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width + size; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height + size; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      draw()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Stats derived from real data
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg-base)',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Parallax blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {([
          { style: { top: '18%', left: '8%' },    size: 340, ...p1, color: 'rgba(0,122,92,0.10)', blur: 90 },
          { style: { top: '48%', right: '6%' },   size: 300, ...p2, color: 'rgba(0,122,92,0.08)', blur: 100 },
          { style: { bottom: '12%', left: '38%' }, size: 220, ...p3, color: 'rgba(0,122,92,0.06)', blur: 70 },
        ] as const).map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...b.style,
              width: `${b.size}px`, height: `${b.size}px`,
              borderRadius: '50%',
              background: b.color,
              transform: `translate(${b.x}px, ${b.y}px)`,
              transition: `transform ${0.8 + i * 0.2}s cubic-bezier(0.25,0.46,0.45,0.94)`,
              filter: `blur(${b.blur}px)`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: 'clamp(5.5rem, 9.5vw, 7rem) var(--gutter) clamp(2rem, 4.5vw, 3rem)',
          width: '100%',
        }}
      >
        {/* Name */}
        <h1
          className="animate-fade-up"
          style={{
            animationDelay: '0ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.02,
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
