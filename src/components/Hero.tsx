import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { personal, achievement } from '../data/portfolio'
import { useMousePosition } from '../hooks/useMousePosition'

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mouse      = useMousePosition()

  // Parallax offset relative to section center
  const getParallax = (strength: number) => {
    const el = sectionRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    return {
      x: ((mouse.x - cx) / rect.width)  * strength,
      y: ((mouse.y - cy) / rect.height) * strength,
    }
  }

  const p1 = getParallax(28)
  const p2 = getParallax(18)
  const p3 = getParallax(12)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid
      const size = 64
      ctx.strokeStyle = 'rgba(0, 200, 150, 0.035)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width + size; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height + size; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Animated glow orbs
      const orbs = [
        { fx: 0.15, fy: 0.3,  r: 140, speed: 0.0007, color: 'rgba(0,200,150,0.07)' },
        { fx: 0.82, fy: 0.55, r: 200, speed: 0.0004, color: 'rgba(0,168,255,0.05)' },
        { fx: 0.5,  fy: 0.88, r: 110, speed: 0.0011, color: 'rgba(0,200,150,0.05)' },
      ]
      orbs.forEach((o) => {
        const cx = canvas.width  * o.fx + Math.sin(frame * o.speed) * 35
        const cy = canvas.height * o.fy + Math.cos(frame * o.speed) * 22
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r)
        g.addColorStop(0, o.color)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2)
        ctx.fill()
      })

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

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
        background: 'linear-gradient(135deg, #0A0A0F 0%, #0F0F1E 50%, #0A1A14 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Parallax glow blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '320px', height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,150,0.06) 0%, transparent 70%)',
          transform: `translate(${p1.x}px, ${p1.y}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '8%',
          width: '280px', height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,168,255,0.05) 0%, transparent 70%)',
          transform: `translate(${p2.x}px, ${p2.y}px)`,
          transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '40%',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,150,0.04) 0%, transparent 70%)',
          transform: `translate(${p3.x}px, ${p3.y}px)`,
          transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'blur(30px)',
        }} />
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '8rem 1.5rem 4rem',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: '0ms', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}
        >
          <span className="section-label">{personal.roleExtended}</span>
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
                transition: 'background 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,200,150,0.18)'
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,200,150,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent-muted)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', background: 'var(--color-accent)', display: 'inline-block' }} />
              {personal.availabilityText}
            </span>
          )}
        </div>

        {/* Name */}
        <h1
          className="animate-fade-up"
          style={{
            animationDelay: '80ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}
        >
          {personal.nameShort.split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1 ? <span className="gradient-text">{word}</span> : word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-up"
          style={{
            animationDelay: '160ms',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-secondary)',
            maxWidth: '580px',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          {personal.heroTagline}
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: '240ms', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <a href="#projects" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 'var(--text-base)' }}>
            View My Work
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: 'var(--text-base)' }}>
            Let's Talk
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Achievement callout */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: '320ms',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--color-accent-muted)',
            borderLeft: '3px solid var(--color-accent)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            padding: '12px 20px',
            maxWidth: '520px',
            transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s var(--ease-spring)',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,200,150,0.18)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,200,150,0.12)'
            e.currentTarget.style.transform = 'translateX(4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-accent-muted)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🏆</span>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>
              {achievement.title}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {achievement.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-float"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
        }}
        aria-hidden="true"
      >
        <span>scroll</span>
        <ArrowDown size={13} />
      </div>
    </section>
  )
}
