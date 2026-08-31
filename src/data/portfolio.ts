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
  linkedin: 'https://linkedin.com/in/jean-bosco-dusengimana',
  isAvailable: true,
  availabilityText: 'Open to opportunities',
  heroTagline: "I'm a full-stack developer who ships clean, production-ready code and owns a feature completely, from database schema to deployment.",
  bio: [
    "I'm a full-stack developer in Kigali, working across the JavaScript and TypeScript ecosystem: React, Next.js, Node.js, NestJS, and React Native. Since 2024 I've shipped production web, mobile, and cloud applications, owning each system end to end from API design through deployment.",
    "The platforms I've delivered span insurance brokerage, fintech, e-mobility credit risk, B2B e-commerce, and multi-country ERP. That range has pushed me toward secure, well-structured systems: passwordless authentication with Passkeys and WebAuthn, TOTP two-factor, regulatory compliance for Rwandan financial and tax rules, and applied machine learning for risk scoring and forecasting.",
    "I'm finishing my BSE in Computer Science at the University of Rwanda in 2026. What I care about is shipping clean, production-ready code quickly and owning a feature completely, from database schema to deployment.",
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
    'Understand the problem before writing a single line',
    'Own the feature end to end, schema through deployment',
    'Write code the next developer can actually read',
    'Build security in from the start, not as a later pass',
    'Find the breaking point with a load test, not a launch',
  ],
  currentlyLearning: 'Deepening applied machine learning for risk scoring and forecasting, plus distributed system design, because the platforms I work on keep growing past what a single service handles well.',
  funFacts: [
    'I do my best debugging after 11pm with lo-fi playing',
    'I built a working product in 48 hours at a national hackathon, and won',
    'I think the best code is the code you never had to write',
  ],
}

export const achievement = {
  title: '1st Place, Hanga Pitch Hackathon 2024',
  subtitle: 'Organised with RISA and the ICT Chamber, Rwanda',
  description: 'Pitched and built a high-impact technology solution under competition conditions, taking first place at the national Hanga Pitch Hackathon in partnership with RISA and the ICT Chamber.',
}

export const projects = [
  {
    id: 'zahabucore',
    title: 'ZahabuCore',
    shortTitle: 'ZahabuCore',
    tagline: 'Live insurance brokerage platform compliant with BNR regulations, with automated claims tracking and OCR-driven client onboarding.',
    category: 'Insurance Platform',
    status: 'live' as const,
    liveUrl: 'https://zahabu.rw',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fzahabu.rw&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['NestJS 11', 'Prisma 7', 'PostgreSQL', 'MongoDB GridFS', 'Redis', 'Material UI', 'TOTP 2FA'],
    problem: 'Insurance brokerage in Rwanda operates under strict BNR regulation, including mandated claims processing windows. Brokers were tracking claims and client KYC manually, which meant missed escalation deadlines and hours of data entry per client before a policy could even be quoted.',
    solution: 'A licensed brokerage platform (BNR License B01/2026) built around a 30-day claims processing tracker with automated escalation alerts. It also carries a multi-insurer quote comparison engine, a server-side PDF proposal generator, and an OCR pipeline built on Tesseract.js that parses client KYC documents automatically.',
    challenges: [
      {
        problem: 'Automating KYC document parsing',
        solution: 'Built an OCR pipeline on Tesseract.js that extracts structured client data from uploaded identity and registration documents, removing hours of manual data entry per client. Documents are stored in MongoDB GridFS while structured records live in PostgreSQL via Prisma.',
      },
      {
        problem: 'Meeting the regulatory claims window',
        solution: 'Implemented a 30-day processing tracker with automated escalation alerts, so a claim approaching its regulatory deadline surfaces before it breaches rather than after.',
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
    tagline: 'Real-time telemetry and credit-risk dashboard managing an active e-motorcycle loan financing portfolio.',
    category: 'Fintech / E-Mobility',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['React', 'TypeScript', 'MapLibre GL', 'Express', 'Vitest'],
    problem: 'Financing e-motorcycles means lending against assets that move. Without live telemetry there was no way to tell a reliable borrower from a high-risk one until repayments had already started slipping, by which point the loan was difficult to recover.',
    solution: 'A real-time telemetry and credit-risk monitoring dashboard for an active e-motorcycle loan portfolio, with a Rider Reliability Score engine that grades riders 0 to 100 across Green, Yellow, Orange, and Red risk tiers.',
    challenges: [
      {
        problem: 'Scoring credit risk with no credit bureau data',
        solution: 'Fused three internal signals instead: GPS telemetry, battery swap frequency, and KYC stability data. Combined into a single 0 to 100 Rider Reliability Score with four risk tiers, so high-risk loans get flagged early rather than at default.',
      },
      {
        problem: 'Deriving movement analytics from raw GPS',
        solution: 'Built Haversine-based distance and route analytics over the telemetry stream, surfaced on a MapLibre GL map, with an Express proxy layer sitting between the dashboard and the telemetry source.',
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
    tagline: 'Multi-country ERP with IAS 36 asset depreciation across four accounting conventions and a statutory tax compliance engine.',
    category: 'Enterprise ERP',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['NestJS 11', 'TypeORM', 'PostgreSQL', 'React', 'Redux Toolkit', 'Ant Design', 'TanStack Table'],
    problem: 'An ERP operating across multiple countries cannot assume one set of accounting rules. Asset depreciation and tax obligations differ by jurisdiction and by accounting convention, and getting either wrong has statutory consequences rather than just reporting ones.',
    solution: 'Asset depreciation modules covering straight-line, declining balance, and units of production methods under IAS 36, implemented across four accounting conventions, alongside a multi-country tax compliance engine with background job processing and automated PDF reporting.',
    challenges: [
      {
        problem: 'Depreciation under IAS 36 across four accounting conventions',
        solution: 'Implemented three depreciation methods (straight-line, declining balance, units of production) as interchangeable strategies, so the same asset can be reported correctly under any of the four supported conventions without duplicating the calculation logic.',
      },
      {
        problem: 'Statutory tax rules that vary by country',
        solution: 'Built a tax compliance engine covering Burkina Faso statutory rules with room for further jurisdictions, moving the heavy calculation and PDF report generation into background jobs so the interface stays responsive.',
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
    tagline: 'Next.js 16 B2B marketplace with passwordless biometric login, RFQ approval workflows, and multi-currency wallets.',
    category: 'B2B E-Commerce',
    status: 'live' as const,
    liveUrl: 'https://urutimall.com',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Furutimall.com&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Prisma', 'Stripe API'],
    problem: 'B2B purchasing does not work like consumer checkout. Buyers need quote requests, approval chains, and multi-currency settlement, and the accounts holding company money need authentication stronger than a password.',
    solution: 'A B2B marketplace built on the Next.js 16 App Router with Server Actions, carrying RFQ approval workflows, multi-currency wallets, Stripe payments, and PDF invoicing, secured by passwordless biometric login alongside TOTP two-factor.',
    challenges: [
      {
        problem: 'Authentication strong enough for accounts holding funds',
        solution: 'Implemented passwordless biometric login using WebAuthn and Passkeys, with TOTP two-factor available alongside it, so account access does not depend on a shared secret that can be phished.',
      },
      {
        problem: 'Modelling B2B purchasing rather than retail checkout',
        solution: 'Built RFQ approval workflows and multi-currency wallets into the core purchase flow, with Stripe handling settlement and server-side PDF invoicing closing the loop for buyer accounting.',
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
    tagline: 'Cross-platform mobile ERP for HR, payroll, and budgeting, with ML-based payroll anomaly detection and budget forecasting.',
    category: 'Mobile ERP',
    status: 'live' as const,
    liveUrl: '',
    githubUrl: '',
    screenshot: '',
    tech: ['React Native', 'Expo SDK 51', 'NestJS', 'TypeORM', 'Redux Toolkit'],
    problem: 'HR, payroll, and budgeting are usually desktop-bound, which does not suit managers approving payroll or checking budgets away from a desk. Payroll errors also tend to be caught after payment rather than before.',
    solution: 'A cross-platform React Native application backed by a NestJS API covering HR, payroll, and budget management, with machine-learning payroll anomaly detection and budget forecasting, plus barcode scanning, push notifications, and secure on-device key storage.',
    challenges: [
      {
        problem: 'Catching payroll errors before payment, not after',
        solution: 'Integrated ML-based anomaly detection over payroll runs, flagging entries that deviate from established patterns before the run is approved, alongside forecasting that projects budget positions forward.',
      },
      {
        problem: 'Holding credentials safely on a mobile device',
        solution: 'Used Expo SecureStore for on-device key storage so authentication material never sits in plain application storage, with push notifications handling approval prompts.',
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
    problem: 'An engineering and civil construction firm offering both procurement and renewable energy services had no web presence that communicated the breadth of what they do to prospective clients.',
    solution: 'A corporate web platform presenting the firm\'s engineering, civil construction, procurement, and renewable energy service lines, built with React and TypeScript with Framer Motion handling the motion design.',
    challenges: [
      {
        problem: 'Presenting distinct service lines without fragmenting the site',
        solution: 'Structured the platform so procurement and renewable energy read as parts of one engineering practice rather than separate businesses, using motion to guide attention between sections rather than decorate them.',
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
    tagline: 'Booking and content platform for an executive coaching and mental health practice, covering sessions, workshops, and recovery modules.',
    category: 'Booking Platform',
    status: 'live' as const,
    liveUrl: 'https://hyppopeace.com',
    githubUrl: '',
    screenshot: 'https://api.microlink.io/?url=https%3A%2F%2Fhyppopeace.com&screenshot=true&meta=false&embed=screenshot.url',
    tech: ['React', 'Express', 'Prisma', 'PostgreSQL'],
    problem: 'A coaching practice running one-on-one sessions, team workshops, and stress-recovery programmes needed all three booked and delivered through one platform, rather than coordinated over email.',
    solution: 'A booking and content platform supporting one-on-one sessions, team workshops, and stress-recovery modules, built on React with an Express and Prisma backend over PostgreSQL.',
    challenges: [
      {
        problem: 'Three booking models in one system',
        solution: 'Modelled individual sessions, team workshops, and multi-part recovery modules against a shared schema so scheduling, content delivery, and client history work the same way regardless of which format a client books.',
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
