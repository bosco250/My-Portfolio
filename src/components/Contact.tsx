import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Send, Clock, MapPin } from 'lucide-react'
import { personal } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

// ── EmailJS config ────────────────────────────────────────────
// Sign up free at emailjs.com → create a service → create a template
// Then replace these three values. The template should use:
//   {{from_name}}, {{from_email}}, {{inquiry_type}}, {{message}}
const EMAILJS_SERVICE_ID  = 'service_5zfor6f'
const EMAILJS_TEMPLATE_ID = 'template_zzd3fj9'
const EMAILJS_PUBLIC_KEY  = 'M1YHkKU2BakhwIx94'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { ref, visible } = useReveal()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg,  setErrorMsg]  = useState('')
  const [form, setForm] = useState({
    names: '', email: '', subject: 'Job Offer', message: '', honeypot: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return // spam trap

    setFormState('sending')
    setErrorMsg('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          names:    form.names,
          email:    form.email,
          subject:  form.subject,
          message:  form.message,
          to_email: personal.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setFormState('sent')
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrorMsg('Something went wrong. Please email me directly at ' + personal.email)
      setFormState('error')
    }
  }

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* ── Left: info ────────────────────────────────── */}
        <div>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Contact</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)',
            fontWeight: 900, color: 'var(--color-text-primary)',
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem',
          }}>
            Let's work<br />
            <span className="gradient-text">together</span>
          </h2>

          <p style={{
            fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)',
            lineHeight: 1.7, marginBottom: '2rem',
          }}>
            I'm open to full-time remote roles, freelance projects, and collaborations that are worth the time.
            If you're building something real and need someone who can own the full stack — let's talk.
          </p>

          {personal.isAvailable && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-accent-muted)',
              border: '1px solid rgba(0,200,150,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px', marginBottom: '2rem', cursor: 'default',
            }}>
              <span className="animate-pulse-dot" style={{ width: '7px', height: '7px', background: 'var(--color-accent)', display: 'inline-block' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                {personal.availabilityText}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { icon: <Mail size={15} />, content: <a href={`mailto:${personal.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.email}</a> },
              { icon: <Clock size={15} />, content: 'Responds within 24 hours on weekdays' },
              { icon: <MapPin size={15} />, content: 'Kigali, Rwanda (UTC+2)' },
            ].map(({ icon, content }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
                  transition: 'color 0.2s, transform 0.2s', cursor: 'default',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
                {content}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { href: personal.github,   icon: <GithubIcon />,   label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon />, label: 'LinkedIn' },
              { href: personal.twitter,  icon: <TwitterIcon />,  label: 'Twitter' },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: form ───────────────────────────────── */}
        <div
          className="glow-card"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-focus)'
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {formState === 'sent' ? (
            <div className="animate-scale-in" style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Message sent
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Name" htmlFor="names">
                    <input
                      id="names" name="names" type="text" required
                      value={form.names} onChange={handleChange}
                      placeholder="Your name" className="form-input"
                    />
                  </FormField>
                  <FormField label="Email" htmlFor="email">
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com" className="form-input"
                    />
                  </FormField>
                </div>

                <FormField label="Subject" htmlFor="subject">
                  <select
                    id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Job Offer">Job Offer</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>

                <FormField label="Message" htmlFor="message">
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about the project or opportunity..."
                    className="form-input"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </FormField>

                {/* Error message */}
                {formState === 'error' && (
                  <p style={{
                    fontSize: 'var(--text-xs)', color: '#EF4444',
                    fontFamily: 'var(--font-mono)', lineHeight: 1.5,
                    padding: '8px 12px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="btn btn-primary"
                  style={{
                    justifyContent: 'center',
                    padding: '13px 24px',
                    fontSize: 'var(--text-sm)',
                    width: '100%',
                    opacity: formState === 'sending' ? 0.7 : 1,
                    cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {formState === 'sending' ? (
                    <>
                      <span className="animate-spin" style={{ width: '14px', height: '14px', border: '2px solid rgba(10,10,15,0.3)', borderTopColor: 'var(--color-text-inverse)', borderRadius: '50%', display: 'inline-block' }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <Send size={14} /></>
                  )}
                </button>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                  or email directly →{' '}
                  <a href={`mailto:${personal.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
                    {personal.email}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FormField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '6px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
