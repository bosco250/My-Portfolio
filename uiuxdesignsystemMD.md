# 04 — UI/UX Design System

## 4.1 Design Direction: "Refined Dark Editorial"

**Concept:** A developer from Kigali with global ambitions. The design should feel like a high-end tech magazine layout — dark, typographically confident, with precise spacing and sharp contrast. Not trendy. Not template-y. Intentional.

**Aesthetic pillars:**
- **Dark-first** — #0A0A0F base. Not pure black (harsh), not gray (boring)
- **Editorial typography** — A display font with character + a clean mono/sans for body
- **Purposeful color** — One accent color used sparingly (not everywhere)
- **Generous whitespace** — Breathing room signals confidence
- **Subtle motion** — Animations that reveal, not distract
- **Africa-as-strength** — Small cultural touches (color accent inspired by Rwandan landscape greens, flag colors used tastefully in data visualization)

---

## 4.2 Color System

```css
:root {
  /* Background scale */
  --color-bg-base:      #0A0A0F;   /* Main background */
  --color-bg-elevated:  #111118;   /* Cards, panels */
  --color-bg-overlay:   #1A1A24;   /* Modals, tooltips */
  --color-border:       #2A2A38;   /* Subtle borders */
  --color-border-focus: #4A4A60;   /* Focus/active borders */

  /* Text scale */
  --color-text-primary:   #F0F0F8;  /* Headlines */
  --color-text-secondary: #A0A0B8;  /* Body text, descriptions */
  --color-text-muted:     #606078;  /* Timestamps, labels */
  --color-text-inverse:   #0A0A0F;  /* Text on light/accent bg */

  /* Accent — Kigali Green (inspired by Rwandan hills) */
  --color-accent:         #00C896;  /* Primary CTA, highlights */
  --color-accent-muted:   #00C89620; /* Accent backgrounds */
  --color-accent-hover:   #00E5A8;  /* Hover states */

  /* Semantic */
  --color-success:  #22C55E;
  --color-warning:  #F59E0B;
  --color-error:    #EF4444;
  --color-info:     #3B82F6;

  /* Gradients */
  --gradient-hero:    linear-gradient(135deg, #0A0A0F 0%, #0F0F1E 50%, #0A1A14 100%);
  --gradient-card:    linear-gradient(180deg, #111118 0%, #0A0A0F 100%);
  --gradient-accent:  linear-gradient(90deg, #00C896, #00A8FF);
}

/* Light mode overrides */
[data-theme="light"] {
  --color-bg-base:       #FAFAF8;
  --color-bg-elevated:   #FFFFFF;
  --color-bg-overlay:    #F0F0EC;
  --color-border:        #E0E0D8;
  --color-border-focus:  #B0B0A0;
  --color-text-primary:  #0A0A0F;
  --color-text-secondary:#404050;
  --color-text-muted:    #808090;
  --color-accent:        #009E78;  /* Slightly darker for contrast on light */
}
```

---

## 4.3 Typography System

### Font Stack

```css
/* Display / Hero headlines */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

/* UI / Body */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

/* Code blocks / terminal */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}
```

**Why these fonts:**
- `Playfair Display` at 900 weight is dramatic and editorial. Sets apart the name and headlines.
- `DM Sans` is clean, modern, and highly readable at small sizes. Pairs beautifully with Playfair.
- `JetBrains Mono` is what you likely use in your IDE — authentic, respected by engineers.

### Type Scale

```css
:root {
  /* Fluid type scale using clamp() */
  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12–14px */
  --text-sm:   clamp(0.875rem, 0.8rem + 0.375vw, 1rem);      /* 14–16px */
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);        /* 16–18px */
  --text-lg:   clamp(1.125rem, 1rem + 0.625vw, 1.25rem);     /* 18–20px */
  --text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);      /* 20–24px */
  --text-2xl:  clamp(1.5rem, 1.3rem + 1vw, 2rem);            /* 24–32px */
  --text-3xl:  clamp(2rem, 1.5rem + 2.5vw, 3rem);            /* 32–48px */
  --text-4xl:  clamp(2.5rem, 1.8rem + 3.5vw, 4.5rem);        /* 40–72px */
  --text-hero: clamp(3rem, 2rem + 5vw, 6rem);                /* 48–96px */
}
```

### Type Usage Rules
- Headlines (h1–h2): `var(--font-display)`, heavy weight
- Subheadings (h3–h4): `var(--font-body)`, semibold (600)
- Body: `var(--font-body)`, regular (400), line-height 1.6–1.7
- Code: `var(--font-mono)`, always in styled code blocks
- Labels, tags, meta: `var(--font-body)`, 500 weight, slightly tracked (letter-spacing: 0.05em), UPPERCASE for UI labels

---

## 4.4 Spacing & Layout System

```css
:root {
  /* 8px base grid */
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Container widths */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;

  /* Max content width */
  --content-max: 1200px;

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
}
```

**Grid system:**
- 12-column grid at desktop (1280px+)
- 8-column at tablet (768px–1279px)
- 4-column at mobile (< 768px)
- Gutters: 24px (desktop), 16px (tablet), 12px (mobile)

---

## 4.5 Component Library

### Navbar
```
[Logo: "JB"] ←————————————————————————→ [Projects] [About] [Blog] [Uses] [Contact ←CTA]
                                                                              ↑
                                                              Green accent button, no border-radius
```
- Sticky on scroll, with blur backdrop (`backdrop-filter: blur(20px)`)
- Background becomes slightly more opaque after scrolling 100px
- Active page link has accent underline (not bold weight — too heavy)
- Mobile: slide-in overlay from right, full screen
- Availability dot: small pulsing green circle left of CTA when `isAvailable = true`

### Hero Section
```
[Eyebrow tag: "Full-Stack Software Developer"]
[Headline: "Jean Bosco
Dusengimana"]
[Subheadline: "I build full-stack applications that solve real problems —
from civic tech in Kigali to scalable SaaS tools for global teams."]
[CTA: [View My Work ↓] [Let's Talk →]]
[Scroll indicator: animated arrow]
```
- Headline uses `--font-display` at `--text-hero`
- Background: subtle animated grid or particle effect (canvas/CSS)
- On load: staggered fade-up animation (name → subhead → CTAs)
- Does NOT use a profile photo in hero (saves it for /about for a personal moment)

### Project Card
```
┌─────────────────────────────────┐
│  [Project Screenshot — animated │
│   on hover to show interaction] │
├─────────────────────────────────┤
│  CIVIC TECH            [LIVE]   │
│  Online Justice Platform        │
│  Connecting Rwandan citizens    │
│  with legal resources online    │
│                                 │
│  [React] [Node.js] [MongoDB]    │
│                                 │
│  [Case Study →]  [Live Demo ↗]  │
└─────────────────────────────────┘
```
- Card background: `--color-bg-elevated`
- Border: 1px solid `--color-border`, transitions to `--color-accent` on hover
- Image: 16:9 ratio, object-fit cover, slight scale on hover (transform: scale(1.02))
- Status badge: green "LIVE", yellow "IN PROGRESS", gray "ARCHIVED"
- Tech badges: small pill badges in `--color-bg-overlay` with mono font

### Tech Badge
```css
.tech-badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
  letter-spacing: 0.05em;
}
```

### Section Headers
```
[SECTION LABEL — uppercase, mono, accent color, small]
[Big Headline — display font]
[Optional subtext — body font, secondary color]
```

### Achievement Callout (Hackathon Win)
```
┌──────────────────────────────────────────────────────┐
│  🏆  1st Place — Hanga Pitch Hackathon 2024           │
│      In partnership with RISA & ICT Chamber, Rwanda   │
└──────────────────────────────────────────────────────┘
```
- Distinct background: `--color-accent-muted`
- Left border: 4px solid `--color-accent`
- Icon: gold trophy emoji or SVG icon
- This should appear on Home, About, and be referenced in the relevant project case study

### CTA Button Variants
```css
/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: background 0.2s, transform 0.1s;
}
.btn-primary:hover { background: var(--color-accent-hover); transform: translateY(-1px); }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}
.btn-ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
```

---

## 4.6 Animation Principles

**Rules:**
1. Motion has purpose — reveals content, guides attention, provides feedback
2. All animations respect `prefers-reduced-motion` media query
3. Default durations: micro (100ms), standard (200ms), deliberate (350ms), cinematic (600ms+)
4. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals (snappy ease-out)

**Core animations:**
- **Page load:** Staggered fade-up with 60ms delays between elements (hero only)
- **Scroll reveals:** Elements fade-up as they enter viewport (Intersection Observer)
- **Card hover:** Scale up image (1.02), border color transition, shadow deepen
- **Navbar scroll:** Background opacity transition
- **CTA hover:** Slight translateY(-1px) + shadow
- **Pulsing availability dot:** CSS `@keyframes pulse` with opacity 1→0.4→1

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4.7 Accessibility Requirements

- **Color contrast:** All text meets WCAG AA minimum (4.5:1 body, 3:1 large text). Accent on dark background checked.
- **Focus indicators:** Visible focus rings on all interactive elements. Use `outline: 2px solid var(--color-accent); outline-offset: 4px;`
- **Keyboard navigation:** Tab order logical, no keyboard traps
- **ARIA labels:** All icon-only buttons have `aria-label`
- **Alt text:** All images have meaningful alt text (from CMS field)
- **Skip link:** `<a href="#main-content" class="skip-link">Skip to main content</a>` at top of body
- **Semantic HTML:** Use `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` correctly
- **Reduced motion:** See animation rules above