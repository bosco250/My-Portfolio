import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import { personal, experience } from '../data/portfolio'
import { useMousePosition } from '../hooks/useMousePosition'

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mouse      = useMousePosition()

  const getParallax = (strength: number) => {
    const el = sectionRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    return {
      x: ((mouse.x - (rect.left + rect.width  / 2)) / rect.width)  * strength,
      y: ((mouse.y - (rect.top  + rect.height / 2)) / rect.height) * strength,
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

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle grid
      const size = 64
      ctx.strokeStyle = 'rgba(0,200,150,0.03)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width + size; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height + size; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Glow orbs
      const orbs = [
        { fx: 0.12, fy: 0.28, r: 160, speed: 0.0007, color: 'rgba(0,200,150,0.07)' },
        { fx: 0.85, fy: 0.52, r: 220, speed: 0.0004, color: 'rgba(0,168,255,0.05)' },
        { fx: 0.48, fy: 0.9,  r: 120, speed: 0.001,  color: 'rgba(0,200,150,0.04)' },
      ]
      orbs.forEach((o) => {
        const cx = canvas.width  * o.fx + Math.sin(frame * o.speed) * 30
        const cy = canvas.height * o.fy + Math.cos(frame * o.speed) * 20
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r)
        g.addColorStop(0, o.color)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(cx, cy, o.r, 0, Math.PI * 2); ctx.fill()
      })

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  // Stats derived from real data
  const stats = [
    { value: `${new Date().getFullYear() - 2022}+`, label: 'years building' },
    { value: '3',  label: 'production systems' },
    { value: '8+', label: 'clients shipped' },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A0F 0%, #0F0F1E 55%, #0A1A14 100%)',
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
          { style: { top: '18%', left: '8%' },    size: 340, ...p1, color: 'rgba(0,200,150,0.06)', blur: 45 },
          { style: { top: '48%', right: '6%' },   size: 300, ...p2, color: 'rgba(0,168,255,0.05)', blur: 55 },
          { style: { bottom: '12%', left: '38%' }, size: 220, ...p3, color: 'rgba(0,200,150,0.04)', blur: 35 },
        ] as const).map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...b.style,
              width: `${b.size}px`, height: `${b.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
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
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '9rem 1.5rem 5rem',
          width: '100%',
        }}
      >
        {/* ── Location + availability row ─────────────────── */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '0ms',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            <MapPin size={11} style={{ color: 'var(--color-accent)' }} />
            Kigali, Rwanda
          </span>

          <span style={{ color: 'var(--color-border)', fontSize: '0.75rem' }}>·</span>

          <span className="section-label" style={{ fontSize: '0.65rem' }}>
            {personal.roleExtended}
          </span>

          {personal.isAvailable && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-accent-muted)',
                border: '1px solid rgba(0,200,150,0.25)',
                borderRadius: 'var(--radius-full)',
                padding: '3px 12px',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-mono)',
                cursor: 'default',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,200,150,0.18)'
                e.currentTarget.style.boxShadow = '0 0 14px rgba(0,200,150,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-muted)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span
                className="animate-pulse-dot"
                style={{ width: '6px', height: '6px', background: 'var(--color-accent)', display: 'inline-block' }}
              />
              Open to work
            </span>
          )}
        </div>

        {/* ── Name ─────────────────────────────────────────── */}
        <h1
          className="animate-fade-up"
          style={{
            animationDelay: '80ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ display: 'block' }}>Jean Bosco</span>
          <span style={{ display: 'block' }} className="gradient-text">Dusengimana</span>
        </h1>

        {/* ── Tagline ───────────────────────────────────────── */}
        <p
          className="animate-fade-up"
          style={{
            animationDelay: '160ms',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-secondary)',
            maxWidth: '540px',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          I build full-stack systems that ship — currently at{' '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
            {experience[0].company}
          </span>
          , working on platforms used by real businesses across Rwanda.
        </p>

        {/* ── CTAs ─────────────────────────────────────────── */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '220ms',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
          }}
        >
          <a
            href="#projects"
            className="btn btn-primary"
            style={{ padding: '13px 28px', fontSize: 'var(--text-base)' }}
          >
            See my work
            <ArrowDown size={15} />
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
            style={{ padding: '13px 28px', fontSize: 'var(--text-base)' }}
          >
            Get in touch
            <ArrowRight size={15} />
          </a>
        </div>

        {/* ── Stats row ────────────────────────────────────── */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '300ms',
            display: 'flex',
            gap: '2rem',
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

      {/* Scroll indicator */}
      <div
        className="animate-float"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          color: 'var(--color-text-muted)',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
        }}
        aria-hidden="true"
      >
        <span>scroll</span>
        <ArrowDown size={12} />
      </div>
    </section>
  )
}
