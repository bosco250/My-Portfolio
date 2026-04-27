import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'

const navLinks = [
  { label: 'Work',       href: '#projects' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]       = useState(false)
  const [activeSection, setActiveSection]  = useState('')
  const [hoveredLink,   setHoveredLink]    = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'background 0.35s ease, border-color 0.35s ease',
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          aria-label="Main navigation"
        >
          {/* ── Logo: name + role ─────────────────────────── */}
          <a
            href="#"
            aria-label="Jean Bosco Dusengimana — home"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Jean Bosco
              <span style={{ color: 'var(--color-accent)' }}>.</span>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Full-Stack Developer
            </span>
          </a>

          {/* ── Desktop nav ───────────────────────────────── */}
          <div
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}
          >
            {navLinks.map(({ label, href }) => {
              const isActive  = activeSection === href.slice(1)
              const isHovered = hoveredLink === href

              return (
                <a
                  key={href}
                  href={href}
                  onMouseEnter={() => setHoveredLink(href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: isActive || isHovered
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '3px',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                  {(isActive || isHovered) && (
                    <span
                      className="nav-link-underline"
                      style={{
                        background: isActive
                          ? 'var(--color-accent)'
                          : 'rgba(240,240,248,0.35)',
                      }}
                    />
                  )}
                </a>
              )
            })}

            {/* Availability */}
            {personal.isAvailable && (
              <span
                title={personal.availabilityText}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--color-accent-muted)',
                  border: '1px solid rgba(0,200,150,0.2)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px 10px 3px 7px',
                  cursor: 'default',
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    background: 'var(--color-accent)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}>
                  Open to work
                </span>
              </span>
            )}

            {/* CTA */}
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}
            >
              Hire me
            </a>
          </div>

          {/* ── Mobile menu button ────────────────────────── */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-overlay)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(10,10,15,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease both',
          }}
        >
          {/* Mobile logo */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'var(--text-2xl)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}>
              Jean Bosco<span style={{ color: 'var(--color-accent)' }}>.</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              marginTop: '4px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Full-Stack Developer · Kigali
            </div>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {navLinks.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'color 0.2s, padding-left 0.25s var(--ease-out-expo)',
                  animation: `fadeUp 0.35s var(--ease-out-expo) ${i * 45}ms both`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                  e.currentTarget.style.paddingLeft = '0.75rem'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                  e.currentTarget.style.paddingLeft = '0'
                }}
              >
                {label}
                <span style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>→</span>
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeUp 0.35s var(--ease-out-expo) 225ms both',
          }}>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '14px 28px', fontSize: 'var(--text-base)' }}
            >
              Hire me
            </a>
            {personal.isAvailable && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
              }}>
                <span
                  className="animate-pulse-dot"
                  style={{ width: '6px', height: '6px', background: 'var(--color-accent)', display: 'inline-block' }}
                />
                Currently open to opportunities
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
