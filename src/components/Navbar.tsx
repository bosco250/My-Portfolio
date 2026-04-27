import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'

const navLinks = [
  { label: 'Projects',   href: '#projects' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]        = useState(false)
  const [activeSection,  setActiveSection]   = useState('')
  const [hoveredLink,    setHoveredLink]     = useState<string | null>(null)

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
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
          background: scrolled ? 'rgba(10,10,15,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(1.4)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            aria-label="Jean Bosco — home"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.3rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              transition: 'color 0.2s, transform 0.2s var(--ease-spring)',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
          >
            {personal.initials}
            <span style={{ color: 'var(--color-accent)' }}>.</span>
          </a>

          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}
          >
            {navLinks.map(({ label, href }) => {
              const isActive  = activeSection === href.slice(1)
              const isHovered = hoveredLink === href
              const showLine  = isActive || isHovered

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
                    color: isActive
                      ? 'var(--color-text-primary)'
                      : isHovered
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '3px',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                  {showLine && (
                    <span
                      className="nav-link-underline"
                      style={{
                        background: isActive
                          ? 'var(--color-accent)'
                          : 'rgba(240,240,248,0.4)',
                      }}
                    />
                  )}
                </a>
              )
            })}

            {/* Availability badge */}
            {personal.isAvailable && (
              <span
                title="Open to opportunities"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'default',
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: '7px',
                    height: '7px',
                    background: 'var(--color-accent)',
                    display: 'inline-block',
                  }}
                />
                Available
              </span>
            )}

            <a
              href="#contact"
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: 'var(--text-sm)' }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile menu button */}
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
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-overlay)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(10,10,15,0.97)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '5rem 2rem 2rem',
            gap: '0',
            animation: 'fadeIn 0.2s ease both',
          }}
        >
          {navLinks.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--color-border)',
                transition: 'color 0.2s, padding-left 0.2s',
                animation: `fadeUp 0.4s var(--ease-out-expo) ${i * 50}ms both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)'
                e.currentTarget.style.paddingLeft = '0.5rem'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)'
                e.currentTarget.style.paddingLeft = '0'
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary"
            style={{
              marginTop: '2rem',
              justifyContent: 'center',
              padding: '14px 28px',
              fontSize: 'var(--text-base)',
              animation: 'fadeUp 0.4s var(--ease-out-expo) 250ms both',
            }}
          >
            Let's Talk
          </a>
        </div>
      )}
    </>
  )
}
