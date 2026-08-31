import { Mail, MapPin, Phone } from 'lucide-react'
import { personal } from '../data/portfolio'
import { DownloadCvLink } from './DownloadCv'

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: personal.github },
  { label: 'LinkedIn', href: personal.linkedin },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-elevated)',
        padding: 'var(--space-10) var(--gutter) var(--space-6)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Identity */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              {personal.nameShort}
              <span style={{ color: 'var(--color-accent)' }}>.</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '6px',
            }}>
              {personal.role}
            </div>

            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: '34ch',
              marginTop: 'var(--space-4)',
            }}>
              Building production systems from Kigali for teams that need the full
              stack owned end to end.
            </p>

            {personal.isAvailable && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--color-accent-muted)',
                border: '1px solid var(--color-accent-border)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                marginTop: 'var(--space-5)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
              }}>
                <span
                  className="animate-pulse-dot"
                  style={{ width: '6px', height: '6px', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
                />
                {personal.availabilityText}
              </span>
            )}
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <div className="footer-col-title">Navigate</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="footer-link">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a href={`mailto:${personal.email}`} className="footer-link">{personal.email}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="footer-link">{personal.phone}</a>
              </li>
              <li style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
              }}>
                <MapPin size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                {personal.location} · {personal.timezone}
              </li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <div className="footer-col-title">Elsewhere</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <DownloadCvLink className="footer-link" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--color-border)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>© {year} {personal.name}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <kbd style={{ padding: '2px 6px', background: 'var(--color-bg-overlay)', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.65rem' }}>⌘K</kbd>
            Dev Terminal
          </span>
          <span>Designed &amp; built in Kigali</span>
        </div>
      </div>
    </footer>
  )
}
