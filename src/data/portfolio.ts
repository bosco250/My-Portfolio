export const personal = {
  name: 'Dusengimana Jean Bosco',
  nameShort: 'Jean Bosco',
  initials: 'JB',
  role: 'Full-Stack Software Developer',
  roleExtended: 'Full-Stack Software Developer',
  location: 'Kigali, Rwanda',
  timezone: 'UTC+2',
  email: 'dusengimana06@gmail.com',
  phone: '+250 786 946 188',
  github: 'https://github.com/bosco250',
  linkedin: 'https://www.linkedin.com/in/jean-bosco-dusengimana-b67b6a401',
  isAvailable: true,
  availabilityText: 'Open to opportunities',
  heroTagline: "Full-stack developer building real-world web, mobile, and cloud platforms in Kigali. I take features from database design straight to production.",
  bio: [
    "I'm a full-stack software developer based in Kigali, Rwanda. I build high-performing web, mobile, and cloud applications using React, Next.js, Node.js, NestJS, and React Native.",
    "My work spans fintech telemetry, B2B marketplaces, insurance platforms, and enterprise ERPs. Whether it's implementing biometric Passkeys authentication, building compliance tools, or scaling real-time risk scoring, I focus on security, clean architecture, and reliable performance.",
    "Completing my BSE in Computer Science at the University of Rwanda in 2026, I love solving complex technical challenges and turning ambitious ideas into production-ready software.",
  ],
  currentRole: 'Software Developer at Uruti Hub Limited',
  education: 'BSE (Honours) Computer Science, University of Rwanda, 2022 to 2026',
  certifications: [
    'JavaScript Algorithms and Data Structures, freeCodeCamp',
    'Responsive Web Design, freeCodeCamp',
    'React.js Development, Energy Power Tech Solution Ltd',
  ],
  languages: [
    { name: 'English',      level: 'Fluent' },
    { name: 'Kinyarwanda',  level: 'Native' },
    { name: 'French',       level: 'Basic' },
  ],
  workingStyle: [
    'Understand the core problem before writing code',
    'Take complete ownership from database schema to UI',
    'Write clean, readable code that scales effortlessly',
    'Bake security and authentication in from day one',
    'Stress-test systems before launch, not after',
  ],
  currentlyLearning: 'Exploring distributed system architecture and practical machine learning for predictive risk scoring.',
  funFacts: [
    'I do my best debugging after 11pm with lo-fi music',
    'Built and launched a winning product in 48 hours at a national hackathon',
    'Believer that simple, well-structured code beats over-engineering every time',
  ],
}

export const achievement = {
  title: '1st Place, Hanga Pitch Hackathon 2024',
  subtitle: 'Organised with RISA and the ICT Chamber, Rwanda',
  description: 'Pitched and built a high-impact tech solution under competition conditions, taking first place at the national Hanga Pitch Hackathon.',
}

export const projects = [
  {
    id: 'zahabucore',
    title: 'ZahabuCore',
    shortTitle: 'ZahabuCore',
    tagline: 'BNR-compliant insurance brokerage platform with automated claims tracking and OCR document onboarding.',
    category: 'Insurance Platform',
    status: 'live' as const,
    liveUrl: 'https://zahabu.rw',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fzahabu.rw&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['NestJS 11', 'Prisma 7', 'PostgreSQL', 'MongoDB GridFS', 'Redis', 'Material UI', 'TOTP 2FA'],
    problem: 'Insurance brokers in Rwanda struggled with manual KYC data entry and strict 30-day regulatory deadlines for processing claims.',
    solution: 'Built a licensed brokerage platform (BNR License B01/2026) featuring a 30-day claims escalation tracker, multi-insurer quote comparison, and automated Tesseract.js OCR for client KYC parsing.',
    challenges: [
      {
        problem: 'Automating KYC document parsing',
        solution: 'Engineered an OCR pipeline using Tesseract.js to extract structured client data from uploaded identity documents, storing files in MongoDB GridFS and data in PostgreSQL via Prisma.',
      },
      {
        problem: 'Meeting strict regulatory deadlines',
        solution: 'Implemented an automated 30-day claims escalation tracker that alerts team members before regulatory deadlines are breached.',
      },
    ],
    metrics: [
      { label: 'BNR licence', value: 'B01/2026' },
      { label: 'Claims tracker', value: '30-day' },
      { label: 'KYC parsing', value: 'OCR' },
    ],
  },
  {
    id: 'locwise-sparkmonitoring',
    title: 'Locwise / SparkMonitoring',
    shortTitle: 'Locwise',
    tagline: 'Real-time telemetry and credit-risk monitoring dashboard for e-motorcycle loan financing.',
    category: 'Fintech / E-Mobility',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['React', 'TypeScript', 'MapLibre GL', 'Express', 'Vitest'],
    problem: 'Financing mobile assets required live telemetry to grade rider reliability and flag high-risk loans before defaults occurred.',
    solution: 'Engineered a Rider Reliability Score engine combining GPS telemetry, battery swap frequency, and KYC stability into a 0 to 100 risk score across four color-coded tiers.',
    challenges: [
      {
        problem: 'Scoring credit risk without traditional bureau data',
        solution: 'Fused three internal data streams—GPS location, battery swap rates, and KYC history—into a real-time risk score from 0 to 100.',
      },
      {
        problem: 'Rendering live movement analytics',
        solution: 'Calculated Haversine route analytics over incoming telemetry feeds, displaying live rider locations smoothly on a MapLibre GL map.',
      },
    ],
    metrics: [
      { label: 'Reliability score', value: '0 to 100' },
      { label: 'Risk tiers', value: '4' },
      { label: 'Telemetry', value: 'Real-time' },
    ],
  },
  {
    id: 'itracom-sigd',
    title: 'ITRACOM-SIGD',
    shortTitle: 'ITRACOM',
    tagline: 'Multi-country enterprise ERP with IAS 36 asset depreciation and statutory tax compliance engines.',
    category: 'Enterprise ERP',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['NestJS 11', 'TypeORM', 'PostgreSQL', 'React', 'Redux Toolkit', 'Ant Design', 'TanStack Table'],
    problem: 'Managing multi-country financial assets required supporting varied accounting conventions and localized tax rules.',
    solution: 'Designed modular depreciation engines (straight-line, declining balance, units of production) under IAS 36 alongside background statutory tax compliance and PDF reporting.',
    challenges: [
      {
        problem: 'Multi-convention asset depreciation',
        solution: 'Implemented interchangeable calculation strategies for IAS 36 depreciation so assets are accurately reported across four distinct accounting conventions.',
      },
      {
        problem: 'Multi-jurisdiction statutory tax rules',
        solution: 'Built a background job pipeline for tax compliance calculations and automated PDF generation, keeping the UI fast and responsive.',
      },
    ],
    metrics: [
      { label: 'Accounting conventions', value: '4' },
      { label: 'Depreciation methods', value: '3' },
      { label: 'Standard', value: 'IAS 36' },
    ],
  },
  {
    id: 'urutimall',
    title: 'UrutiMall / UrutiShop',
    shortTitle: 'UrutiMall',
    tagline: 'B2B marketplace featuring WebAuthn biometric login, RFQ approval workflows, and multi-currency wallets.',
    category: 'B2B E-Commerce',
    status: 'live' as const,
    liveUrl: 'https://urutimall.com',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Furutimall.com&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Prisma', 'Stripe API'],
    problem: 'B2B commerce requires multi-step RFQ approvals, multi-currency settlement, and account security stronger than traditional passwords.',
    solution: 'Developed a Next.js 16 B2B platform with passwordless Passkeys/WebAuthn authentication, corporate RFQ workflows, multi-currency wallets, and automated Stripe settlement.',
    challenges: [
      {
        problem: 'High-security authentication for corporate accounts',
        solution: 'Implemented WebAuthn biometric login alongside TOTP 2FA, eliminating phishing risks for high-value buyer accounts.',
      },
      {
        problem: 'Streamlining complex B2B purchasing',
        solution: 'Integrated custom quote request approvals, multi-currency wallet balances, and automated PDF invoicing directly into the purchasing pipeline.',
      },
    ],
    metrics: [
      { label: 'Auth', value: 'Passkeys' },
      { label: 'Wallets', value: 'Multi-currency' },
      { label: 'Payments', value: 'Stripe' },
    ],
  },
  {
    id: 'urutipay',
    title: 'UrutiPay',
    shortTitle: 'UrutiPay',
    tagline: 'Mobile ERP for HR, payroll, and budgeting powered by ML anomaly detection.',
    category: 'Mobile ERP',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['React Native', 'Expo SDK 51', 'NestJS', 'TypeORM', 'Redux Toolkit'],
    problem: 'Payroll management is traditionally desktop-bound, making it hard for managers to approve runs or detect payroll anomalies on the go.',
    solution: 'Created a cross-platform React Native app with ML-based payroll anomaly detection, on-device Expo SecureStore credential safety, barcode scanning, and budget forecasting.',
    challenges: [
      {
        problem: 'Catching payroll errors prior to disbursement',
        solution: 'Integrated an ML anomaly detection model that flags unusual payroll deviations before funds are released.',
      },
      {
        problem: 'Securing sensitive financial credentials on mobile',
        solution: 'Utilized Expo SecureStore for encrypted hardware-backed storage of session keys and credentials.',
      },
    ],
    metrics: [
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'ML modules', value: '2' },
      { label: 'Expo SDK', value: '51' },
    ],
  },
  {
    id: 'classpoint',
    title: 'ClassPoint',
    shortTitle: 'ClassPoint',
    tagline: 'Corporate web platform for an engineering and civil construction firm, covering procurement and renewable energy services.',
    category: 'Corporate Web',
    status: 'live' as const,
    liveUrl: 'https://classpointco.com',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fclasspointco.com&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['React', 'TypeScript', 'Framer Motion'],
    problem: 'An engineering firm offering procurement and renewable energy needed a modern web presence to present their comprehensive portfolio.',
    solution: 'Built a responsive web platform using React, TypeScript, and Framer Motion to showcase civil construction, procurement, and renewable energy service lines.',
    challenges: [
      {
        problem: 'Showcasing multiple service lines cohesively',
        solution: 'Structured the site architecture to unify engineering, procurement, and solar services under one clear visual hierarchy.',
      },
    ],
    metrics: [
      { label: 'Service lines covered', value: '4' },
      { label: 'Motion library', value: 'Framer Motion' },
    ],
  },
  {
    id: 'hyppopeace',
    title: 'Hyppopeace',
    shortTitle: 'Hyppopeace',
    tagline: 'Booking and content platform for an executive coaching and mental health practice.',
    category: 'Booking Platform',
    status: 'live' as const,
    liveUrl: 'https://hyppopeace.com',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fhyppopeace.com&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['React', 'Express', 'Prisma', 'PostgreSQL'],
    problem: 'A coaching practice running 1-on-1 sessions, group workshops, and recovery modules needed a single integrated platform for bookings and content.',
    solution: 'Developed a unified booking and content platform supporting individual sessions, workshops, and multi-part recovery courses backed by PostgreSQL and Prisma.',
    challenges: [
      {
        problem: 'Unifying multiple booking models',
        solution: 'Designed a unified schema supporting 1-on-1 appointments, team workshops, and structured recovery modules seamlessly.',
      },
    ],
    metrics: [
      { label: 'Booking formats', value: '3' },
      { label: 'Data layer', value: 'Prisma + PostgreSQL' },
    ],
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React 18/19', 'Next.js', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'React Hook Form', 'Zod', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'Swagger/OpenAPI', 'Prisma', 'TypeORM', 'BullMQ', 'Microservices'],
  },
  {
    category: 'Data & Storage',
    items: ['PostgreSQL', 'MongoDB', 'Mongoose', 'GridFS', 'SQLite', 'Redis'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Expo SDK 51', 'React Navigation', 'Expo SecureStore', 'Barcode Scanning', 'Push Notifications'],
  },
  {
    category: 'Security & Payments',
    items: ['WebAuthn/Passkeys', 'TOTP 2FA', 'Stripe API', 'Airtel Money API', 'EBM Tax Invoicing', 'BNR Compliance'],
  },
  {
    category: 'Testing & Performance',
    items: ['k6', 'Apache JMeter', 'Load & Stress Testing', 'Vitest', 'Jest', 'Postman'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Docker', 'Docker Compose', 'Nginx', 'Git/GitHub', 'Vite', 'PWA'],
  },
  {
    category: 'Currently Learning',
    items: ['Applied ML', 'Distributed Systems', 'System Design'],
  },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'Uruti Hub Limited',
    location: 'Kigali, Rwanda',
    period: 'June 2025 to Present',
    description: 'Building and shipping production platforms across insurance, fintech, e-mobility, B2B commerce, and enterprise resource planning. I own systems end to end, from API design and database schema through to deployment.',
    highlights: [
      'Architected and shipped ZahabuCore, a live BNR-compliant insurance brokerage platform with a 30-day claims tracker, multi-insurer quote engine, and Tesseract.js OCR for KYC parsing',
      'Built the Locwise Rider Reliability Score engine, fusing GPS telemetry, battery swap frequency, and KYC stability into a 0 to 100 credit-risk score across four tiers',
      'Delivered ITRACOM-SIGD asset depreciation under IAS 36 across four accounting conventions, plus a multi-country statutory tax compliance engine',
      'Implemented passwordless WebAuthn and Passkeys login with TOTP 2FA, RFQ workflows, and multi-currency wallets on the UrutiMall B2B marketplace',
      'Shipped UrutiPay, a React Native HR, payroll, and budgeting app with ML-based payroll anomaly detection and budget forecasting',
    ],
  },
  {
    role: 'Full-Stack Developer Trainee',
    company: 'Hanga',
    location: 'Kigali, Rwanda',
    period: 'August 2024',
    description: 'Completed an intensive full-stack programme covering React, Node.js, Express, and MongoDB, working in Agile sprints with daily stand-ups and code review.',
    highlights: [
      'Built and deployed a capstone application covering the full cycle from responsive UI to secure REST API integration',
      'Worked in Agile sprints with daily stand-ups, code reviews, and Git-based version control',
    ],
  },
  {
    role: 'React.js Developer',
    company: 'Energy Power Tech Solution',
    location: 'Kigali, Rwanda',
    period: 'August 2024',
    description: 'Delivered front-end features for client-facing web applications, working directly with UX designers on mobile-first interfaces.',
    highlights: [
      'Built client-facing features using React and Tailwind CSS',
      'Partnered with UX designers to build pixel-accurate, mobile-first interfaces',
      'Integrated REST APIs and managed application state with React hooks and context',
    ],
  },
]
