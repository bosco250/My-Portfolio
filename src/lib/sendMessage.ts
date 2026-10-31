import emailjs from '@emailjs/browser'
import { personal } from '../data/portfolio'

// EmailJS template fields: {{names}}, {{email}}, {{subject}}, {{message}}
const SERVICE_ID = 'service_5zfor6f'
const TEMPLATE_ID = 'template_zzd3fj9'
const PUBLIC_KEY = 'M1YHkKU2BakhwIx94'

export interface Message {
  names: string
  email: string
  subject: string
  message: string
}

export const subjects = ['Job offer', 'Freelance', 'Collaboration', 'Other'] as const

export function sendMessage(m: Message) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...m, to_email: personal.email }, PUBLIC_KEY)
}
