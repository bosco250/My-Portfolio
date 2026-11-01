import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { ContactContext } from './app/contactContext'
import { findProject } from './lib/records'
import { scrollToSection, useCaseStudyId } from './lib/router'
import type { Message } from './lib/sendMessage'
import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import Work from './sections/work/Work'
import CaseStudy from './sections/work/CaseStudy'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import About from './sections/About'
import Contact from './sections/contact/Contact'
import Footer from './sections/Footer'
import { focusRing, gold, navy } from './theme/tokens'

const baseTitle = 'Dusengimana Jean Bosco | Software Engineer in Kigali, Rwanda'

export default function App() {
  const [contact, setContact] = useState<{ key: number; prefill: Partial<Message> | null }>({ key: 0, prefill: null })
  const caseId = useCaseStudyId()

  const actions = useMemo(
    () => ({
      compose: (prefill?: Partial<Message>) => {
        setContact((c) => ({ key: c.key + 1, prefill: prefill ?? null }))
        // Wait for the case study panel to slide away first.
        setTimeout(() => scrollToSection('contact'), 260)
      },
    }),
    [],
  )

  // Tab title follows the open case study.
  useEffect(() => {
    const p = findProject(caseId)
    document.title = p ? `${p.title} case study · Dusengimana Jean Bosco` : baseTitle
  }, [caseId])

  return (
    <ContactContext.Provider value={actions}>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 2000,
          px: 4,
          py: 2.5,
          borderRadius: 1,
          backgroundColor: gold.active,
          color: navy.primary,
          fontWeight: 600,
          textDecoration: 'none',
          transform: 'translateY(-200%)',
          '&:focus': { transform: 'none', ...focusRing.light },
        }}
      >
        Skip to content
      </Box>

      <NavBar />
      <Box component="main" id="main" tabIndex={-1} sx={{ outline: 'none' }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact prefill={contact.prefill} formKey={contact.key} />
      </Box>
      <Footer />

      <CaseStudy />
    </ContactContext.Provider>
  )
}
