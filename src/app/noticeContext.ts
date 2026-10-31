import { createContext, useContext } from 'react'
import type { StatusIntent } from '../theme/tokens'

export type Notify = (message: string, intent?: StatusIntent) => void

export const NoticeContext = createContext<Notify>(() => {})

/** Show a notice: "Message sent.", "CV downloaded." */
export const useNotices = () => useContext(NoticeContext)
