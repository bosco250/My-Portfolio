import { useState, useEffect, useCallback, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'

const SECRET = 'bosco'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [keyBuffer, setKeyBuffer] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current
      if (!el) return
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      el.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mouse glow on glow-cards
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.glow-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Terminal easter egg
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      const next = (keyBuffer + e.key).slice(-SECRET.length)
      setKeyBuffer(next)
      if (next === SECRET) {
        setTerminalOpen(true)
        setKeyBuffer('')
      }
    },
    [keyBuffer]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Scroll progress */}
      <div ref={progressRef} id="scroll-progress" style={{ width: '0%' }} />

      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />

      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}

      <div
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--color-text-muted)',
          opacity: 0.35,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '0.05em',
        }}
        aria-hidden="true"
      >
        try typing "bosco"
      </div>
    </>
  )
}
