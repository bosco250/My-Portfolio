import { useState, useEffect } from 'react'
import { Mail, MapPin, Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'
import DownloadCv, { DownloadCvLink } from './DownloadCv'

const navLinks = [
  { label: 'Work',       href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]       = useState(false)
  const [activeSection, setActiveSection]  = useState('')

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
        className={scrolled ? 'navbar-scrolled' : ''}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'background 0.35s ease',
          background: scrolled ? 'rgba(250,250,248,0.88)' : 'var(--color-bg-base)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        }}
      >
        {/* Tier 1: dark utility strip */}
        <div
          className="topbar"
          style={{
            maxHeight: scrolled ? 0 : '34px',
            overflow: 'hidden',
            transition: 'max-height 0.35s var(--ease-out-expo)',
          }}
        >
          <div className="topbar-inner">
            <div className="topbar-group">
              {personal.isAvailable && (
                <span className="topbar-link-active">
                  <span
                    className="animate-pulse-dot"
                    style={{
                      width: '5px',
                      height: '5px',
                      background: 'var(--color-accent-on-dark)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  {personal.availabilityText}
                </span>
              )}
              <span className="topbar-hide-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.7)' }}>
                <MapPin size={10} />
                {personal.location}
              </span>
              <span className="topbar-hide-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {personal.timezone}
              </span>
            </div>

            <div className="topbar-group">
              <a href={`mailto:${personal.email}`} className="topbar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={10} />
                <span className="topbar-hide-sm">{personal.email}</span>
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="topbar-link topbar-hide-sm">
                GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="topbar-link topbar-hide-sm">
                LinkedIn
              </a>
              <DownloadCvLink className="topbar-link" compact />
            </div>
          </div>
        </div>

        {/* Tier 2: floating accent nav bar */}
        <div className="navbar-shell">
          <nav className="navbar-bar" aria-label="Main navigation">
            <a href="#" className="logo-pill" aria-label="Jean Bosco Dusengimana, home">
              {personal.initials}
            </a>

            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {navLinks.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1)
                return (
                  <a
                    key={href}
                    href={href}
                    className={`navbar-link ${isActive ? 'navbar-link-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                )
              })}
            </div>

            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginLeft: 'auto' }}>
              {personal.isAvailable && (
                <span className="navbar-pill navbar-hide-md" title={personal.availabilityText}>
                  <span
                    className="animate-pulse-dot"
                    style={{ width: '6px', height: '6px', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }}
                  />
                  Open to work
                </span>
              )}

              <a href="#contact" className="navbar-cta">Hire me</a>
            </div>

            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="navbar-burger mobile-menu-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(250,250,248,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(5rem, 14vw, 6rem) var(--card-pad-lg) var(--card-pad-lg)',
            /* Six links plus the CTA can exceed a short phone viewport, so the
               panel scrolls rather than clipping its ends. */
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease both',
          }}
        >
          {/* Mobile logo */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
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
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  padding: '0.75rem 0',
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
            marginTop: 'var(--space-5)',
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
            <DownloadCv
              className="btn btn-ghost"
              style={{ justifyContent: 'center', padding: '13px 28px', fontSize: 'var(--text-base)' }}
            />
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
