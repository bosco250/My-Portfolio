import { useState, type ChangeEvent, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import SendOutlined from '@mui/icons-material/SendOutlined'
import { useNotices } from '../../app/noticeContext'
import { personal } from '../../data/portfolio'
import { sendMessage, subjects, type Message } from '../../lib/sendMessage'
import { navy, neutral, status } from '../../theme/tokens'

type Errors = Partial<Record<keyof Message, string>>

const empty: Message = { names: '', email: '', subject: subjects[0], message: '' }

function validate(m: Message): Errors {
  const e: Errors = {}
  if (!m.names.trim()) e.names = 'Enter your name.'
  if (!m.email.trim()) e.email = 'Enter your email so I can reply.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) e.email = 'Enter an email such as name@company.com.'
  if (m.message.trim().length < 10) e.message = 'Write a few words about what you need.'
  return e
}

/** Validates on submit, keeps errors on their fields, keeps service errors in the form. */
export default function ContactForm({ prefill }: { prefill: Partial<Message> | null }) {
  const notify = useNotices()
  const [form, setForm] = useState<Message>(() => ({ ...empty, ...prefill }))
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [serviceDown, setServiceDown] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const set = (key: keyof Message) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (trap) return setSentTo(form.email)
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = (['names', 'email', 'message'] as const).find((k) => found[k])
      if (first) document.getElementById(`contact-${first}`)?.focus()
      return
    }
    setSending(true)
    setServiceDown(false)
    try {
      const email = form.email.trim()
      await sendMessage({ ...form, names: form.names.trim(), email })
      setSentTo(email)
      notify('Message sent.', 'success')
    } catch {
      setServiceDown(true)
    } finally {
      setSending(false)
    }
  }

  if (sentTo) {
    return (
      <Box role="status" sx={{ textAlign: 'center', py: 10, px: 4, display: 'grid', justifyItems: 'center', gap: 3 }}>
        <CheckCircleOutlined sx={{ fontSize: 44, color: status.success.fill }} aria-hidden />
        <Typography variant="h3" component="p">
          Message sent
        </Typography>
        <Typography variant="body2" sx={{ color: neutral.inkSoft, maxWidth: 340 }}>
          Thanks. I will reply to {sentTo} as soon as I can.
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            setForm(empty)
            setSentTo(null)
          }}
          sx={{ mt: 2 }}
        >
          Send another message
        </Button>
      </Box>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <Box component="form" noValidate onSubmit={submit} aria-labelledby="contact-form-title">
      <Typography id="contact-form-title" variant="h3" component="h3">
        Send a message
      </Typography>
      <Typography variant="body2" sx={{ color: neutral.inkSoft, mt: 1, mb: 6 }}>
        It goes straight to my inbox.
      </Typography>

      {serviceDown && (
        <Alert severity="error" sx={{ mb: 6 }}>
          The message service is temporarily unavailable. Try again in a moment, or email {personal.email}.
        </Alert>
      )}

      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' } }}>
        <TextField id="contact-names" label="Your name" value={form.names} onChange={set('names')} error={Boolean(errors.names)} helperText={errors.names} autoComplete="name" required />
        <TextField id="contact-email" label="Email" type="email" value={form.email} onChange={set('email')} error={Boolean(errors.email)} helperText={errors.email} autoComplete="email" required />
        <TextField select label="What is it about?" value={form.subject} onChange={set('subject')} sx={{ gridColumn: '1 / -1' }}>
          {subjects.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="contact-message"
          label="Message"
          value={form.message}
          onChange={set('message')}
          error={Boolean(errors.message)}
          helperText={errors.message ?? 'What you are building, and where I fit in.'}
          multiline
          minRows={5}
          required
          sx={{ gridColumn: '1 / -1' }}
        />
      </Box>

      {/* Spam trap: hidden from people and assistive technology */}
      <Box
        component="input"
        type="text"
        name="company_website"
        value={trap}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTrap(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        sx={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, mt: 6 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={sending}
          endIcon={sending ? <CircularProgress size={16} color="inherit" /> : <SendOutlined />}
        >
          {sending ? 'Sending' : 'Send message'}
        </Button>
        <Typography role="alert" variant="body2" sx={{ color: status.error.text, fontWeight: 500 }}>
          {errorCount === 1 ? 'Fix 1 field to send.' : errorCount > 1 ? `Fix ${errorCount} fields to send.` : ''}
        </Typography>
        {!errorCount && (
          <Typography variant="caption" sx={{ color: neutral.inkMuted }}>
            Or email <Box component="span" sx={{ color: navy.primary, fontWeight: 500 }}>{personal.email}</Box>
          </Typography>
        )}
      </Box>
    </Box>
  )
}
