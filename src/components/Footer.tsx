import { personal } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          © {year} {personal.name} · Designed & built in Kigali
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          {[
            { label: 'GitHub', href: personal.github },
            { label: 'LinkedIn', href: personal.linkedin },
            { label: 'Email', href: `mailto:${personal.email}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
