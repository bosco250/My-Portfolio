import { createContext, useContext } from 'react'
import type { Message } from '../lib/sendMessage'

export interface ContactActions {
  /** Scroll to the contact form and fill in what is known. */
  compose: (prefill?: Partial<Message>) => void
}

export const ContactContext = createContext<ContactActions>({ compose: () => {} })

export const useContact = () => useContext(ContactContext)
