export const personal = {
  name: 'Jean Bosco Dusengimana',
  nameShort: 'Jean Bosco',
  initials: 'JB',
  role: 'Full-Stack Developer',
  roleExtended: 'Full-Stack Software Developer',
  location: 'Kigali, Rwanda',
  timezone: 'UTC+2',
  email: 'dusengimana06@gmail.com',
  phone: '+250 786 946 188',
  github: 'https://github.com/bosco250',
  linkedin: 'https://linkedin.com/in/jean-bosco-dusengimana',
  twitter: 'https://twitter.com/bosco_dev',
  isAvailable: true,
  availabilityText: 'Open to opportunities',
  heroTagline: 'I build full-stack systems that work in the real world — from salon management platforms in Kigali to procurement SaaS for East African enterprises.',
  bio: [
    "I grew up in Kigali at a time when technology was visibly changing how people accessed services — mobile money, e-government, digital health. That environment shaped a simple belief I still hold: software is infrastructure, and infrastructure should work for everyone.",
    "Right now I'm a developer at Uruti Hub Limited, where I've shipped three production systems — a multi-platform salon management suite, an enterprise procurement platform, and a marketing site for an international coaching firm. Each one taught me something the previous one didn't.",
    "I'm finishing my BSE at the University of Rwanda in 2026 and looking for a remote role where the problems are hard, the team is strong, and the work actually matters.",
  ],
  currentRole: 'Software Developer at Uruti Hub Limited',
  education: 'BSE, University of Rwanda — graduating 2026',
  certifications: [
    'FreeCodeCamp — JavaScript Algorithms & Data Structures',
    'FreeCodeCamp — Responsive Web Design',
  ],
  languages: [
    { name: 'English',      level: 'Fluent' },
    { name: 'Kinyarwanda',  level: 'Native' },
    { name: 'French',       level: 'Basic' },
  ],
  workingStyle: [
    'Understand the problem before writing a single line',
    'Ship something real, then make it better',
    'Write code the next developer can actually read',
    'If you can\'t measure it, you\'re guessing',
  ],
  currentlyLearning: 'System design, distributed systems, and Rust — because understanding how things break at scale makes you a better engineer at any scale.',
  funFacts: [
    'I do my best debugging after 11pm with lo-fi playing',
    'I built a working product in 48 hours at a national hackathon — and won',
    'I think the best code is the code you never had to write',
  ],
}

export const achievement = {
  title: '1st Place — Hanga Pitch Hackathon 2024',
  subtitle: 'In partnership with RISA & ICT Chamber, Rwanda',
  description: 'Competed against 200+ teams nationwide. Built and pitched a full working product in 48 hours — a civic tech solution addressing real gaps in public service delivery. Recognized by Rwanda\'s national ICT authority.',
}

export const projects = [
  {
    id: 'uruti-saluni',
    slug: 'uruti-saluni',
    title: 'Uruti Saluni',
    tagline: 'Full-stack salon management platform with POS, micro-lending, mobile money, and a React Native app — built for Rwanda\'s beauty industry.',
    category: 'Full-Stack SaaS',
    status: 'in-progress' as const,
    featured: true,
    liveUrl: '',
    githubUrl: '',
    tech: ['NestJS', 'Next.js', 'React Native', 'TypeScript', 'PostgreSQL', 'TypeORM', 'JWT', 'Airtel API'],
    thumbnail: '/projects/uruti-saluni.png',
    problem: "Rwanda's salon industry — hundreds of small businesses — had no digital infrastructure. Owners tracked appointments in notebooks, payroll in WhatsApp, and had zero access to formal credit. The national salon association had no way to manage memberships, verify compliance, or offer financial services to members at scale.",
    solution: "A three-platform system: a NestJS REST API backend, a Next.js admin web panel, and a React Native mobile app for salon owners and employees. The platform covers the full business lifecycle — appointment booking, POS with multi-payment support, inventory, employee attendance and commissions, double-entry accounting, micro-lending with credit scoring, digital wallets, and Airtel mobile money integration.",
    techDecisions: [
      { choice: 'NestJS over Express', reason: 'The scope demanded a structured, modular architecture from day one. NestJS modules (auth, salons, loans, wallets, airtel, accounting) kept 15+ domains cleanly separated. Express would have become a monolith.' },
      { choice: 'React Native alongside Next.js', reason: 'Salon employees clock in/out and view schedules on mobile. A PWA would have been slower and lacked push notification reliability. Native was the right call for the daily-use mobile flows.' },
      { choice: 'SQLite in dev, PostgreSQL in prod', reason: 'Zero-config local development for a team spread across machines. TypeORM\'s dialect abstraction made the switch to PostgreSQL in production seamless — no query rewrites.' },
      { choice: 'Double-entry accounting engine', reason: 'Evaluated off-the-shelf accounting packages. None integrated cleanly with the loan and wallet modules. Built a lightweight chart-of-accounts + journal entry system that feeds directly into the loan credit scoring model.' },
    ],
    challenges: [
      { problem: 'Airtel mobile money integration in a sandboxed environment', solution: 'Airtel\'s Open API had sparse documentation and an unreliable sandbox. Built an abstraction layer that mocked the API locally and swapped to live credentials via environment config. This let the team build and test wallet flows without waiting on Airtel uptime.' },
      { problem: 'RBAC across 5 user roles with 100+ granular permissions', solution: 'Implemented a three-layer permission system: admin auto-grant, direct user overrides (allow/deny), and role-based defaults. Direct deny always wins. Permissions are stored in the database per tenant, not hardcoded — so the association can customize access per salon without a deploy.' },
      { problem: 'Micro-lending credit scoring with no credit bureau data', solution: 'Built a scoring model using internal signals: membership tenure, appointment volume, POS transaction history, and repayment behavior on previous loans. Not perfect, but far better than manual review — and it improves as data accumulates.' },
    ],
    impact: 'Production-ready platform covering 15+ business modules. Designed to serve the national salon association\'s full membership. Micro-lending module enables formal credit access for businesses that previously had none.',
    reflection: "The scope kept expanding because every module touched another. Loans needed wallets, wallets needed Airtel, Airtel needed auth, auth needed RBAC. I learned to draw hard module boundaries early and resist the urge to couple things that should stay separate. The architecture docs I wrote mid-project saved us weeks when onboarding a second developer.",
    metrics: [
      { label: 'Backend modules', value: '15+' },
      { label: 'API endpoints', value: '80+' },
      { label: 'Platforms shipped', value: '3' },
    ],
  },
  {
    id: 'intelliprocure',
    slug: 'intelliprocure',
    title: 'IntelliProcure',
    tagline: 'Multi-tenant procurement and tender management platform with AI-driven vendor matching and a full RBAC permission engine.',
    category: 'Enterprise SaaS',
    status: 'in-progress' as const,
    featured: true,
    liveUrl: '',
    githubUrl: '',
    tech: ['Next.js 14', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'Docker', 'AWS'],
    thumbnail: '/projects/intelliprocure.png',
    problem: "Public and private sector procurement in East Africa is opaque, slow, and prone to bias. Organizations publish tenders through disconnected channels, vendors miss opportunities they qualify for, and evaluation processes lack auditability. There was no platform connecting the two sides with structured workflows and transparent scoring.",
    solution: "A multi-tenant SaaS platform where organizations create and publish tenders, vendors register and build profiles, and an AI matching engine surfaces the best vendor-tender pairs. Evaluation workflows are customizable per tender. Every action is logged for compliance. Dashboards give procurement teams real-time analytics on spend, vendor performance, and pipeline.",
    techDecisions: [
      { choice: 'Multi-tenant architecture with tenant isolation', reason: 'Each organization (tenant) needed fully isolated data — separate roles, permissions, users, and procurement data. Built tenant context into every database query via Prisma middleware rather than separate schemas, keeping the deployment footprint manageable.' },
      { choice: 'NestJS + Prisma over a simpler stack', reason: 'The permission system alone had 5 models (Permission, Role, RolePermission, UserRole, UserPermission) with complex resolution logic. NestJS\'s dependency injection made the PermissionsService cleanly injectable into any guard or controller without prop-drilling.' },
      { choice: 'Prisma over raw SQL or TypeORM', reason: 'The schema evolved rapidly during early development. Prisma\'s migration system and type-safe client meant schema changes propagated to the TypeScript layer automatically — no manual DTO updates.' },
      { choice: 'Docker for all environments', reason: 'The platform runs PostgreSQL, the NestJS API, and the Next.js frontend. Docker Compose gave every developer an identical environment and made the production deployment a near-identical replica of local dev.' },
    ],
    challenges: [
      { problem: 'Permission resolution with direct overrides, role permissions, and admin bypass', solution: 'Implemented a strict priority chain: admin role → direct deny → direct allow → role permissions. The PermissionsService resolves effective permissions by combining all three layers per user per tenant. Admins get all permissions automatically without any database rows — just a role check.' },
      { problem: 'Bid access control — vendors should only see their own bids', solution: 'Built a BidAccessControl guard that checks both the user\'s role and their relationship to the specific bid record. A vendor can view their own bid but not competitors\'. Procurement officers see all bids for tenders they manage. The guard is composable and reusable across any bid-related endpoint.' },
      { problem: 'AI vendor-tender matching without a data science team', solution: 'Built a rule-based scoring engine that weights vendor profile completeness, past performance, category match, and geographic proximity. Designed the scoring interface so it can be swapped for an ML model later without changing the API contract.' },
    ],
    impact: 'Production-ready multi-tenant platform. Full RBAC system with 9 implementation phases completed. Designed for AWS deployment with Docker. Procurement workflows cover the full tender lifecycle from creation to contract award.',
    reflection: "I spent too long perfecting the RBAC system before building the core procurement flows. The permission engine is genuinely good — but I should have shipped a simpler version first and hardened it after validating the product. Perfect infrastructure for a product nobody has used yet is just expensive tech debt.",
    metrics: [
      { label: 'RBAC phases', value: '9 complete' },
      { label: 'Permission models', value: '5 layered' },
      { label: 'Tenant isolation', value: 'Full' },
    ],
  },
  {
    id: 'breakthrough-international',
    slug: 'breakthrough-international',
    title: 'Break Through International',
    tagline: 'Marketing website and admin CMS for a global executive coaching and leadership consultancy — containerized and deployed with Docker + Nginx.',
    category: 'Frontend',
    status: 'live' as const,
    featured: true,
    liveUrl: 'https://hyppopeace.com',
    githubUrl: '',
    tech: ['React', 'Vite', 'React Router', 'Lucide React', 'Docker', 'Nginx'],
    thumbnail: '/projects/breakthrough.png',
    problem: "Break Through International — a coaching firm operating across 7 countries — had no web presence that matched the caliber of their work. Their services (executive coaching, corporate training, government consulting, military leadership) were being pitched through PDFs and referrals. They needed a site that could convert high-value clients and give the internal team control over media content without touching code.",
    solution: "A single-page React application with a full marketing site (hero, services grid, team profiles, testimonials, media gallery, contact) and a password-protected admin dashboard for media management. The admin panel lets the team upload images and videos, manage the media library, and view analytics — all without a CMS subscription. Deployed as a Docker container behind Nginx with health checks and automatic restarts.",
    techDecisions: [
      { choice: 'React SPA over a CMS like WordPress', reason: 'The client wanted full design control and zero ongoing CMS licensing costs. A React SPA gave pixel-perfect implementation of their brand and a custom admin panel that fit exactly their workflow — upload media, preview, publish.' },
      { choice: 'Docker + Nginx for deployment', reason: 'The client\'s server was a bare VPS. Docker Compose gave a reproducible deployment with Nginx handling static file serving, gzip compression, and health checks. One command to deploy, one command to update.' },
      { choice: 'React Router for multi-section navigation', reason: 'The site has distinct sections (Home, Services, About, Contact) that needed URL-addressable routes for direct linking in email campaigns and social media. Hash-based routing would have broken analytics tracking.' },
      { choice: 'No backend', reason: 'The contact form routes to a mailto link and the admin panel uses localStorage for the session. For a marketing site with a small internal team, adding a backend would have been over-engineering. The constraint forced simplicity.' },
    ],
    challenges: [
      { problem: 'Admin media management without a database', solution: 'Used React state + localStorage to persist the media library across sessions. File previews are generated with URL.createObjectURL() client-side. For a single-admin use case, this was the right tradeoff — zero infrastructure, zero cost, works offline.' },
      { problem: 'Nginx configuration for SPA routing inside Docker', solution: 'React Router\'s client-side routing breaks on hard refresh when served by Nginx — the server looks for a file at /services and returns 404. Fixed with a try_files directive that falls back to index.html for all routes. Parameterized the Nginx port via environment variable so the same image works in dev and prod.' },
      { problem: 'Performance on the client\'s shared VPS', solution: 'Vite\'s production build with tree-shaking and code splitting kept the bundle under 200KB. Nginx gzip compression halved transfer sizes. The Docker health check restarts the container automatically if it goes down — no manual intervention needed.' },
    ],
    impact: 'Live at hyppopeace.com. Serving a coaching firm with clients across 7 countries. Admin team manages media independently. Zero downtime since deployment.',
    reflection: "The localStorage-based admin was the right call for this client, but I'd add a lightweight backend (even a simple JSON file server) if the team grows. The bigger lesson: understanding the client's actual workflow before designing the admin panel saved us two rounds of redesign.",
    metrics: [
      { label: 'Countries served', value: '7' },
      { label: 'Bundle size', value: '<200KB' },
      { label: 'Deployment', value: 'Docker' },
    ],
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Backend',
    items: ['NestJS', 'Node.js', 'REST APIs', 'JWT / RBAC', 'PostgreSQL', 'TypeORM', 'Prisma'],
  },
  {
    category: 'Tools & Infra',
    items: ['Docker', 'Nginx', 'Git', 'Linux', 'Vercel', 'AWS'],
  },
  {
    category: 'Currently Learning',
    items: ['System Design', 'Distributed Systems', 'Rust'],
  },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'Uruti Hub Limited',
    location: 'Kigali, Rwanda',
    period: '2024 — Present',
    description: 'Building production systems for clients across Rwanda. I own the full stack — from database schema to deployed UI — and work closely with the team on architecture decisions.',
    highlights: [
      'Led development of Uruti Saluni: a three-platform system (NestJS API, Next.js web, React Native mobile) covering POS, micro-lending, and Airtel mobile money integration',
      'Built IntelliProcure: a multi-tenant procurement SaaS with a 9-phase RBAC system and AI-driven vendor matching',
      'Introduced TypeScript, Docker-based local dev, and structured code review — reducing integration bugs significantly',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Independent',
    location: 'Remote',
    period: '2022 — 2024',
    description: 'Designed and shipped web applications for clients in Rwanda and East Africa. Worked directly with founders and small teams — which meant owning the full product, not just the code.',
    highlights: [
      'Delivered the Break Through International website: a React SPA with a custom admin CMS, containerized with Docker and deployed to a VPS behind Nginx',
      'Built and shipped 8+ client projects on time, managing requirements, design, and deployment independently',
      'Won 1st place at the Hanga Pitch Hackathon 2024 — built a working civic tech product in 48 hours',
    ],
  },
]
