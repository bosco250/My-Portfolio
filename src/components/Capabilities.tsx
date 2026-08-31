import { ArrowRight, Boxes, ShieldCheck, Ship } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const capabilities = [
  {
    icon: Boxes,
    title: 'Full-stack product delivery',
    body:
      'From database schema to deployed interface, across web, mobile, and cloud. I have owned platforms end to end in insurance, fintech, e-mobility, B2B commerce, and enterprise resource planning.',
    cta: 'See the case studies',
    href: '#projects',
  },
  {
    icon: ShieldCheck,
    title: 'Secure auth and regulatory compliance',
    body:
      'Passwordless login with WebAuthn and Passkeys, TOTP two-factor, and systems built to Rwandan financial and tax rules, including BNR regulation and EBM tax invoicing.',
    cta: 'Read the breakdown',
    href: '#projects',
  },
  {
    icon: Ship,
    title: 'Applied ML and performance',
    body:
      'Credit-risk scoring from live telemetry, payroll anomaly detection, and budget forecasting. Plus load and stress testing with k6 and JMeter, so I know a system\u2019s ceiling before its users find it.',
    cta: 'View the stack',
    href: '#skills',
  },
]

export default function Capabilities() {
  const { ref, visible } = useReveal()

  return (
    <section id="capabilities" className="section">
      <div className="section-inner">
        <div ref={ref} className={`reveal section-head ${visible ? 'visible' : ''}`}>
          <div className="section-label">What I do</div>
          <h2 className="section-title">Get building with me</h2>
          <p className="section-lede">
            Three things I am genuinely good at, each backed by something running in production.
          </p>
        </div>

        <div className="grid-3up">
          {capabilities.map(({ icon: Icon, title, body, cta, href }, i) => (
            <CapabilityCard
              key={title}
              icon={<Icon size={20} />}
              title={title}
              body={body}
              cta={cta}
              href={href}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({
  icon,
  title,
  body,
  cta,
  href,
  index,
}: {
  icon: React.ReactNode
  title: string
  body: string
  cta: string
  href: string
  index: number
}) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal cap-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <span className="cap-icon" aria-hidden="true">{icon}</span>

      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
        }}
      >
        {body}
      </p>

      <a href={href} className="card-cta">
        {cta}
        <ArrowRight size={13} />
      </a>
    </div>
  )
}
