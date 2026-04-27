# 02 — Information Architecture

## 2.1 Full Sitemap

```
/ (Home)
├── /about
├── /projects
│   ├── /projects/[slug]          ← Dynamic project case study
│   └── /projects/[slug]/preview  ← Live preview embed (iframe sandbox)
├── /blog
│   └── /blog/[slug]              ← Dynamic blog post
├── /uses                          ← Tools & setup page (popular with devs)
├── /contact
├── /api
│   ├── /api/contact               ← Contact form handler
│   ├── /api/projects              ← Projects REST endpoint
│   └── /api/revalidate            ← Webhook for CMS revalidation
└── /admin                         ← Redirect to Sanity Studio (external)
```

**Total public pages:** 7 static + N dynamic (projects + blog posts)

---

## 2.2 Page-by-Page Content Strategy

### `/` — Home (The Decision Page)

**Purpose:** Make a visitor decide to stay within 5 seconds.  
**User mindset:** "Is this person worth my time?"

**Sections in order:**

1. **Hero** — Name, one-line identity, two CTA buttons (View Work / Contact Me), animated background element
2. **Featured Projects** — 3 curated project cards with live demo links (NOT a full grid — curated selection signals taste)
3. **About Teaser** — 3–4 lines, one photo, link to /about (don't dump everything here)
4. **Skills / Stack** — Shown as used-in-context, not logo soup. Example: "I reach for Next.js when..." 
5. **Hackathon Achievement** — Highlighted callout: "🏆 1st Place — Hanga Pitch Hackathon 2024"
6. **Latest Blog Post** — 1–2 recent articles (shows you think and write)
7. **CTA Strip** — "Open to opportunities" status indicator + contact link

**Why this order:** The hero captures attention, featured work converts that attention into interest, the about teaser builds trust, skills confirm fit, achievement adds credibility, blog shows depth, CTA closes.

---

### `/about` — About (The Human Page)

**Purpose:** Make the visitor trust and like you.  
**User mindset:** "Who is this person really?"

**Sections:**
1. **Portrait + headline** — Professional photo, name, role, location
2. **Story in 3 paragraphs:**
   - Where I come from and why I code (Kigali, Rwanda → solving real problems)
   - What I do and how I think (full-stack, systems thinking, clean code)
   - Where I'm going (goals, open to opportunities)
3. **Current work** — Uruti Hub Limited role with short description
4. **Education** — BSE at University of Rwanda (graduating 2026)
5. **Certifications** — FreeCodeCamp JS/React, Responsive Web Design
6. **Languages** — English (Fluent), Kinyarwanda (Native), French (Basic)
7. **Values / Working style** — 3–4 bullet principles (e.g., "Ship fast, refactor deliberately")
8. **What I'm currently learning** — Dynamic field updated from CMS
9. **Resume download button** — PDF version always current
10. **Fun facts** — 2–3 humanizing details (optional but memorable)

---

### `/projects` — Projects Index (The Proof Page)

**Purpose:** Show a curated body of work, not a dump.  
**User mindset:** "What has this person actually built?"

**Layout:**
- **Filter bar** — by category (Full-Stack, Frontend, Open Source, Civic Tech) and tech tag
- **Project cards** — each with: title, one-line description, tech stack badges, status (Live / In Progress / Archived), screenshot/mockup, "View Case Study" button, "Live Demo" button
- **Sort options** — Most Recent, Featured First, Alphabetical
- **Empty state** — Thoughtful message if filter returns no results

**Each card includes:**
- Project thumbnail (animated on hover to show interaction)
- Tech stack icons (3–5 max)
- Category tag
- "Live Preview" badge if available

---

### `/projects/[slug]` — Project Case Study (The Depth Page)

**Purpose:** Convince a senior engineer you think in systems.  
**User mindset:** "Does this person understand what they built?"

**Sections:**
1. **Hero** — Project name, one-line summary, live demo link, GitHub link, date
2. **Problem Statement** — What problem existed before this was built? (1–2 paragraphs)
3. **Solution Overview** — High-level: what was built and for whom
4. **Architecture Diagram** — Visual diagram of the system (even for frontend projects)
5. **Tech Stack Decisions** — "I chose X because Y, not Z because..." (this is gold for senior reviewers)
6. **Key Features** — 3–5 bullet points with screenshots per feature
7. **Challenges & How I Solved Them** — Most important section. Real problems, real solutions.
8. **Impact / Results** — Metrics if available, or qualitative ("used during public health emergency")
9. **What I'd Do Differently** — Self-reflection. Shows growth mindset.
10. **Live Preview** — Embedded iframe or screenshots carousel
11. **GitHub Repository** — Link with file structure overview
12. **Next Project** → navigation to next/previous case study

---

### `/projects/[slug]/preview` — Live Preview Page

**Purpose:** Show the project running without leaving the portfolio.

- Full-width iframe embedding the live project URL
- Fallback to screenshot carousel if the project isn't embeddable
- "Open in new tab" button always visible
- Warning if project URL is no longer active, with "View archived demo" option

---

### `/blog` — Blog Index (The Thinking Page)

**Purpose:** Signal intellectual depth and communication skills.  
**User mindset:** "Does this person understand things deeply enough to explain them?"

**Article categories:**
- Technical deep-dives ("How I built X")
- Career reflections ("What winning a hackathon taught me")
- Tech for Africa / civic tech perspective
- Short TILs (Today I Learned) — quick, digestible

**Content minimum:** 3 published posts at launch. Quality over quantity.

---

### `/uses` — Uses Page (The Credibility Page)

**Purpose:** Build authenticity. The developer community loves uses pages.  
**Content:**
- Daily development tools (VS Code, extensions, terminal setup)
- Hardware (laptop, monitors, peripherals)
- Services (hosting, email, design tools)
- Learning resources

> Note: This page costs almost nothing to build and creates disproportionate trust with technical visitors. Senior engineers often check /uses pages.

---

### `/contact` — Contact (The Conversion Page)

**Purpose:** Make it trivially easy to reach you.

**Sections:**
1. **Availability status** — "Open to opportunities" / "Currently booked" (toggle from CMS)
2. **Contact form** — Name, email, project type (Job Offer / Freelance / Collaboration / Other), message
3. **Response time promise** — "I respond within 24 hours on weekdays"
4. **Direct email** — Always show, never hide behind form only
5. **Social links** — GitHub, LinkedIn, Twitter/X
6. **Timezone** — "I'm in Kigali (UTC+2) — comfortable working with teams across Europe and Africa"

---

## 2.3 Navigation Flow

```
Entry Points:
  Job Application Link → /projects/[slug] → /about → /contact
  Google Search → / → /projects → /projects/[slug]
  GitHub Profile → / → /uses → /about
  Twitter/LinkedIn → / → /blog/[slug] → /contact

Primary Navigation (Desktop):
  Logo | Projects | About | Blog | Uses | Contact [CTA Button]

Mobile Navigation:
  Hamburger → Full-screen overlay menu
```

---

## 2.4 URL Strategy

- `/projects/online-justice-platform` — not `/projects/project-2`
- `/blog/how-i-won-hanga-hackathon-2024` — descriptive, SEO-friendly
- No trailing slashes (configure in next.config.js)
- All lowercase, hyphen-separated

---

## 2.5 404 Page

Not just an error — a branding opportunity:
- Creative message (e.g., "404: This page doesn't exist yet. But I'm always building.")
- Navigation back to Home and Projects
- Maybe a small easter egg or animation