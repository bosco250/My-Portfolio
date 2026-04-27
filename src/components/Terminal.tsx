import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import { personal, skills } from '../data/portfolio'

interface Line {
  type: 'prompt' | 'output' | 'error'
  content: string
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '  help       — show this list',
    '  whoami     — about Jean Bosco',
    '  skills     — technical skills',
    '  projects   — list projects',
    '  contact    — contact info',
    '  joke       — developer humor',
    '  clear      — clear terminal',
    '  exit       — close terminal',
  ],
  whoami: () => [
    'Jean Bosco Dusengimana',
    'Full-Stack Software Developer · Kigali, Rwanda',
    '',
    'I build production systems — multi-platform SaaS, enterprise procurement',
    'tools, and client-facing web apps. Currently at Uruti Hub Limited.',
    '',
    `Status: ${personal.isAvailable ? '✅ Open to opportunities' : '🔴 Currently booked'}`,
    `GitHub:   ${personal.github}`,
    `Email:    ${personal.email}`,
    '',
    'Fun fact: I won a national hackathon by building a working product in 48h.',
  ],
  skills: () => [
    'Technical skills:',
    ...skills.flatMap((g) => [`  ${g.category}:`, `    ${g.items.join(', ')}`]),
  ],
  projects: () => [
    'Production projects:',
    '',
    '  → Uruti Saluni [in-progress]',
    '     NestJS · Next.js · React Native · PostgreSQL · Airtel API',
    '     Multi-platform salon management: POS, micro-lending, mobile money',
    '',
    '  → IntelliProcure [in-progress]',
    '     Next.js 14 · NestJS · Prisma · PostgreSQL · Docker',
    '     Multi-tenant procurement SaaS with AI vendor matching & RBAC',
    '',
    '  → Break Through International [live → hyppopeace.com]',
    '     React · Vite · Docker · Nginx',
    '     Marketing site + admin CMS for a global coaching firm',
  ],
  contact: () => [
    `Email:    ${personal.email}`,
    `Phone:    ${personal.phone}`,
    `GitHub:   ${personal.github}`,
    `LinkedIn: ${personal.linkedin}`,
    '',
    'Based in Kigali (UTC+2). Available for remote work.',
    'Response time: within 24h on weekdays.',
  ],
  joke: () => [
    'Why do programmers prefer dark mode?',
    '...',
    'Because light attracts bugs. 🐛',
    '',
    '(Also, I genuinely cannot work in light mode. It\'s a medical condition.)',
  ],
}

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', content: 'Jean Bosco\'s portfolio terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines: Line[] = [{ type: 'prompt', content: `$ ${cmd}` }]

    if (!trimmed) {
      setLines((prev) => [...prev, ...newLines])
      return
    }

    if (trimmed === 'clear') {
      setLines([])
      return
    }

    if (trimmed === 'exit') {
      onClose()
      return
    }

    const handler = COMMANDS[trimmed]
    if (handler) {
      handler().forEach((line) => newLines.push({ type: 'output', content: line }))
    } else {
      newLines.push({ type: 'error', content: `command not found: ${trimmed}. Try "help".` })
    }

    newLines.push({ type: 'output', content: '' })
    setLines((prev) => [...prev, ...newLines])
    setHistory((prev) => [cmd, ...prev])
    setHistoryIdx(-1)
  }, [onClose])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(idx)
      setInput(history[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(idx)
      setInput(idx === -1 ? '' : history[idx])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className="terminal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <div className="terminal-window">
        {/* Header */}
        <div className="terminal-header">
          <button
            onClick={onClose}
            aria-label="Close terminal"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
          >
            <span className="terminal-dot" style={{ background: '#FF5F57' }} />
          </button>
          <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <span className="terminal-dot" style={{ background: '#28C840' }} />
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}
          >
            bosco@portfolio ~ zsh
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '2px',
              display: 'flex',
              marginLeft: '8px',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                color:
                  line.type === 'prompt'
                    ? 'var(--color-accent)'
                    : line.type === 'error'
                    ? '#EF4444'
                    : 'var(--color-text-secondary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="terminal-input-line">
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
