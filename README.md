# Jean Bosco Dusengimana — Portfolio

Personal portfolio built with React, TypeScript, and Tailwind CSS. Showcases production projects, experience, and technical skills.

**Live:** [bosco250.github.io/My-Portfolio](https://bosco250.github.io/My-Portfolio) · **Repo:** [github.com/bosco250/My-Portfolio](https://github.com/bosco250/My-Portfolio)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Build | Vite 8 |
| Icons | Lucide React |
| Fonts | Playfair Display · DM Sans · JetBrains Mono |
| Deploy | Vercel / any static host |

---

## Features

- **Scroll progress bar** — thin green gradient bar at the top of the viewport
- **Mouse parallax** — hero glow blobs follow the cursor at different depths
- **Glow cards** — radial gradient follows the mouse inside each card
- **Scroll reveal** — elements fade up as they enter the viewport, staggered per section
- **Code rain** — animated canvas in project image areas, intensifies on hover
- **Metric count-up** — numbers animate from 0 when scrolled into view
- **Terminal easter egg** — type `bosco` anywhere on the page to open an interactive terminal
- **Responsive navbar** — active section tracking, animated underline, mobile overlay
- **Contact form** — honeypot spam protection, loading spinner, success state
- **Accessible** — skip link, visible focus rings, `prefers-reduced-motion` support, semantic HTML

---

## Projects

### Uruti Saluni
Multi-platform salon management system built for Rwanda's beauty industry.
- **Backend:** NestJS REST API — 15+ modules (auth, POS, inventory, accounting, micro-lending, wallets, Airtel mobile money)
- **Web:** Next.js admin panel
- **Mobile:** React Native app for salon owners and employees
- **Stack:** NestJS · Next.js · React Native · TypeScript · PostgreSQL · TypeORM · JWT · Airtel Open API

### IntelliProcure
Multi-tenant procurement and tender management SaaS for East African enterprises.
- AI-driven vendor-tender matching engine
- 9-phase RBAC system with 5 permission models and tenant-scoped isolation
- Full tender lifecycle: creation → evaluation → contract award
- **Stack:** Next.js 14 · NestJS · TypeScript · PostgreSQL · Prisma · Docker · AWS

### Break Through International
Marketing website and admin CMS for a global executive coaching firm (7 countries).
- React SPA with custom media management admin panel
- Containerized with Docker, served behind Nginx on a bare VPS
- Sub-200KB bundle, zero downtime since deployment
- **Live:** [hyppopeace.com](https://hyppopeace.com)
- **Stack:** React · Vite · React Router · Docker · Nginx

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       # Sticky nav with active section tracking
│   ├── Hero.tsx         # Mouse parallax, canvas grid, animated CTAs
│   ├── Projects.tsx     # Case study cards with code rain + count-up metrics
│   ├── About.tsx        # Bio, working style, certifications
│   ├── Skills.tsx       # Skill groups with glow hover
│   ├── Experience.tsx   # Timeline cards with animated accent line
│   ├── Contact.tsx      # Form with honeypot + social links
│   ├── Footer.tsx
│   └── Terminal.tsx     # Easter egg terminal (type "bosco")
├── data/
│   └── portfolio.ts     # All content lives here — edit this to update the site
├── hooks/
│   ├── useReveal.ts     # IntersectionObserver scroll reveal
│   ├── useMousePosition.ts
│   └── useCountUp.ts    # Animated number count-up
├── index.css            # Design tokens, animations, component classes
└── App.tsx              # Scroll progress bar, mouse glow wiring, terminal trigger
```

> **To update content:** edit `src/data/portfolio.ts` — personal info, projects, skills, and experience are all in one place.

---

## Deployment

### Vercel (recommended)
1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### Manual / VPS
```bash
npm run build
# Serve the dist/ folder with Nginx or any static file server
```

---

## Contact

**Jean Bosco Dusengimana**
Full-Stack Software Developer · Kigali, Rwanda (UTC+2)

- Email: [dusengimana06@gmail.com](mailto:dusengimana06@gmail.com)
- GitHub: [github.com/bosco250](https://github.com/bosco250)
- LinkedIn: [linkedin.com/in/jean-bosco-dusengimana](https://linkedin.com/in/jean-bosco-dusengimana)
- Phone: +250 786 946 188
