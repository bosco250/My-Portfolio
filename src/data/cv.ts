/**
 * CV content, kept separate from the portfolio data because a CV has a different
 * shape and a different audience: applicant tracking systems and recruiters
 * skimming for a few seconds.
 *
 * Section order follows current ATS guidance rather than the order of the source
 * document: summary, then technical skills, then experience. Parsers weight
 * early content for keyword matching, so skills sit above experience.
 */

export const cvHeader = {
  name: 'DUSENGIMANA JEAN BOSCO',
  title: 'Full-Stack Software Developer',
  /*
   * Kept as plain body text, never a PDF header or footer, since parsers skip
   * those. Split across two lines because five items on one line overflow the
   * A4 text column at this size.
   */
  contactLines: [
    ['Kigali, Rwanda', '+250 786 946 188', 'dusengimana06@gmail.com'],
    ['github.com/bosco250', 'jeanbooscodusengimana.vercel.app'],
  ],
}

export const cvSummary =
  'Full-stack software developer with a BSc in Computer Science from the University of Rwanda and professional experience since 2024, shipping production web, mobile, and cloud applications. Has delivered live platforms across insurance, fintech, e-mobility, B2B e-commerce, and enterprise resource planning, owning each end to end from API design through deployment. Works across the JavaScript and TypeScript ecosystem (React, Next.js, Node.js, NestJS, React Native) with a focus on secure, well-structured systems: passwordless authentication (Passkeys/WebAuthn, TOTP), Rwandan financial and tax compliance, applied machine learning for risk scoring, and load and stress testing with k6 and Apache JMeter.'

export const cvSkills = [
  {
    label: 'Languages',
    value: 'JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL',
  },
  {
    label: 'Frontend',
    value:
      'React (v18/v19), Next.js (App Router & Server Actions), Redux Toolkit, Zustand, TanStack Query, React Hook Form, Zod, Tailwind CSS, Material UI, Ant Design, Framer Motion',
  },
  {
    label: 'Backend',
    value:
      'Node.js, Express, NestJS, REST APIs, GraphQL, Swagger/OpenAPI, Prisma, TypeORM, BullMQ, Microservices',
  },
  {
    label: 'Data & Storage',
    value: 'PostgreSQL, MongoDB (Mongoose & GridFS), SQLite, Redis',
  },
  {
    label: 'Mobile',
    value:
      'React Native (Expo SDK 51), React Navigation, Expo SecureStore, Camera & Barcode Scanning, Push Notifications',
  },
  {
    label: 'Security & Payments',
    value:
      'WebAuthn/Passkeys, TOTP 2FA, Stripe API, Airtel Money API, EBM Tax Invoicing, BNR Regulatory Compliance',
  },
  {
    label: 'Testing & Performance',
    value:
      'k6, Apache JMeter, load & stress testing, Vitest, Jest, Postman',
  },
  {
    label: 'Tools & DevOps',
    value: 'Docker, Docker Compose, Nginx, Git/GitHub, Vite, PWA',
  },
]

export const cvExperience = [
  {
    role: 'Software Developer',
    company: 'Uruti Hub Limited',
    period: 'June 2025 - Present',
    location: 'Kigali, Rwanda',
    projects: [
      {
        name: 'ZahabuCore: Insurance Brokerage Platform (zahabu.rw)',
        bullets: [
          'Architected and shipped a live insurance brokerage platform compliant with BNR regulations (License B01/2026), including a 30-day claims processing tracker with automated escalation alerts that cut manual follow-up.',
          'Built a multi-insurer quote comparison engine, a server-side PDF proposal generator, and an OCR pipeline (Tesseract.js) that automated client KYC document parsing, removing hours of manual data entry per client.',
        ],
        stack:
          'NestJS 11, Prisma 7, PostgreSQL, MongoDB GridFS, Redis, Material UI, TOTP 2FA.',
      },
      {
        name: 'Locwise / SparkMonitoring: Fleet Credit Risk Engine',
        bullets: [
          'Built a real-time telemetry and credit-risk monitoring dashboard used to manage an active e-motorcycle loan financing portfolio.',
          'Designed a Rider Reliability Score engine (0-100, with Green/Yellow/Orange/Red risk tiers) fusing GPS telemetry, battery swap frequency, and KYC stability data to flag high-risk loans early.',
        ],
        stack:
          'React, TypeScript, MapLibre GL, Haversine-based analytics, Express proxy, Vitest.',
      },
      {
        name: 'ITRACOM-SIGD: Multi-Country ERP',
        bullets: [
          'Built asset depreciation modules (straight-line, declining balance, units of production) under IAS 36 across four accounting conventions.',
          'Built a multi-country tax compliance engine covering Burkina Faso statutory rules, with background job processing and automated PDF reporting.',
        ],
        stack:
          'NestJS 11, TypeORM, PostgreSQL, React, Redux Toolkit, Ant Design, TanStack Table.',
      },
      {
        name: 'UrutiMall / UrutiShop: B2B E-Commerce Marketplace (urutimall.com)',
        bullets: [
          'Full-stack developer on a Next.js 16 B2B marketplace built with the App Router and Server Actions.',
          'Implemented passwordless biometric login (WebAuthn/Passkeys) alongside TOTP 2FA, RFQ approval workflows, multi-currency wallets, Stripe payments, and PDF invoicing.',
        ],
        stack:
          'Next.js 16, React 19, TypeScript, Tailwind CSS v4, Prisma, Stripe API.',
      },
      {
        name: 'UrutiPay: Mobile ERP for HR, Payroll & Budgeting',
        bullets: [
          'Built a cross-platform React Native app and NestJS API for HR, payroll, and budget management.',
          'Integrated ML-based payroll anomaly detection and budget forecasting, plus barcode scanning, push notifications, and secure on-device key storage.',
        ],
        stack: 'NestJS, TypeORM, React Native (Expo SDK 51), Redux Toolkit.',
      },
    ],
  },
  {
    role: 'Full-Stack Developer Trainee',
    company: 'Hanga',
    period: 'August 2024',
    location: 'Kigali, Rwanda',
    projects: [
      {
        name: '',
        bullets: [
          'Completed an intensive full-stack program covering React, Node.js, Express, and MongoDB.',
          'Built and deployed a capstone application covering the full cycle from responsive UI to secure REST API integration.',
          'Worked in Agile sprints with daily stand-ups, code reviews, and Git-based version control.',
        ],
        stack: '',
      },
    ],
  },
  {
    role: 'React.js Developer',
    company: 'Energy Power Tech Solution',
    period: 'August 2024',
    location: 'Kigali, Rwanda',
    projects: [
      {
        name: '',
        bullets: [
          'Delivered front-end features for client-facing web applications using React and Tailwind CSS.',
          'Partnered with UX designers to build pixel-accurate, mobile-first interfaces.',
          'Integrated REST APIs and managed application state with React hooks and context.',
        ],
        stack: '',
      },
    ],
  },
]

export const cvProjects = [
  {
    name: 'ClassPoint: Engineering & Construction Web Platform (classpointco.com)',
    description:
      'Corporate web platform for an engineering and civil construction firm, covering procurement and renewable energy services, built with React, TypeScript, and Framer Motion animations.',
  },
  {
    name: 'Hyppopeace: Executive Coaching & Mental Health Platform (hyppopeace.com)',
    description:
      'Booking and content platform for a coaching practice, supporting 1-on-1 sessions, team workshops, and stress-recovery modules. Built with React, Express, Prisma, and PostgreSQL.',
  },
]

export const cvEducation = {
  degree: 'Bachelor of Science in Engineering (Honours), Computer Science',
  period: '2022 - 2026',
  institution:
    'University of Rwanda, Nyarugenge Campus, College of Science and Technology',
  coursework:
    'Relevant coursework: Software Engineering Principles, Data Structures & Algorithms, Front-End & Back-End Web Development, UX/UI Research & Design, Database Systems, Software Project Management.',
}

export const cvCertifications = [
  'JavaScript Algorithms and Data Structures, freeCodeCamp',
  'Responsive Web Design, freeCodeCamp',
  'React.js Development, Energy Power Tech Solution Ltd',
]

export const cvAchievements = [
  '1st Place, Hanga Pitch Hackathon 2024, organized with RISA and the ICT Chamber, for pitching and building a high-impact technology solution under competition conditions.',
]

export const cvLanguages =
  'English (Fluent), Kinyarwanda (Native), French (Basic)'

/** Recruiter-friendly filename convention: FirstName-LastName-Role.pdf */
export const cvFileName = 'Dusengimana-Jean-Bosco-Full-Stack-Developer.pdf'
