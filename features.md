# 03 — Features (Prioritized)

## 3.1 Must-Have Features (MVP — Ship These First)

### F1: Dynamic Project System via CMS
**Why:** Projects are your core product. Hardcoding them means every update requires a deploy. A CMS lets you add, edit, and publish projects from a UI.
**Implementation:** Sanity Studio → Sanity CDN → Next.js ISR (Incremental Static Regeneration)
**Key data:** title, slug, description, cover image, gallery, tech stack, live URL, GitHub URL, case study body (rich text), featured flag, status, date

### F2: Live Project Preview
**Why:** Showing a recruiter a running app is 10× more convincing than screenshots.
**Implementation:**
- If project has a `liveUrl` in CMS → render in sandboxed `<iframe>` with `sandbox="allow-scripts allow-same-origin"`
- Fallback: screenshot carousel with Swiper.js
- "Open full screen" button always visible
- Handle `X-Frame-Options: DENY` by detecting load failure and showing fallback

### F3: Contact Form with Email Delivery
**Why:** Email is still the highest-intent conversion channel.
**Implementation:** React Hook Form → `/api/contact` → Resend (email API) → sends to dusengimana06@gmail.com
**Fields:** name, email, inquiry type (select), message, honeypot (spam protection)
**Validation:** Zod schema on both client and server

### F4: Blog / Writing System
**Why:** Writing is one of the highest-leverage things a developer can do for career growth. Recruiters and senior engineers read good developer blogs.
**Implementation:** Sanity CMS → MDX or Portable Text → Next.js dynamic routes
**Features:** Estimated read time, tags, published date, related posts

### F5: Availability Status Badge
**Why:** A real-time "Open to work" signal removes friction for recruiters.
**Implementation:** Single CMS field (boolean `isAvailable`) → renders a green pulsing dot in navbar and hero
**Copy when true:** "✅ Available for opportunities"
**Copy when false:** "🔴 Currently booked — reach out for future projects"

### F6: Dark Mode (System-Aware Default)
**Why:** The developer audience overwhelmingly uses dark mode. System-aware means it just works.
**Implementation:** `next-themes` + CSS custom properties. Never use inline style overrides for theme.
**Behavior:** Respects `prefers-color-scheme`, persists user preference in localStorage, toggleable via icon in navbar

### F7: Responsive Design (Mobile-First)
**Why:** Recruiters look at portfolios on phones. If it breaks on mobile, you lose the opportunity.
**Breakpoints:** 320px / 640px / 768px / 1024px / 1280px / 1536px
**Test on:** Chrome DevTools, real iPhone Safari, real Android Chrome

### F8: Resume Download
**Why:** Many recruiters still need a PDF.
**Implementation:** PDF stored in `/public/resume/jean-bosco-resume-2026.pdf` — direct `<a href>` download link, NOT a Google Drive redirect
**Also:** Linked in About page, Contact page, and meta tags

---

## 3.2 Advanced Features (Phase 2 — Build After MVP is Live)

### F9: Project Filtering & Search
- Client-side filter by tech tag, category, status
- Fuzzy search using Fuse.js on project titles and descriptions
- URL reflects filter state (`/projects?tag=nextjs&category=fullstack`) — shareable filtered views

### F10: Blog Reading Progress Bar
- Thin colored bar at top of viewport showing read progress through article
- Sticky "Back to top" button appears after scrolling 50%
- Estimated read time shown in article header

### F11: Command Palette (Cmd+K)
- Keyboard-driven navigation: type "about", "projects", "contact" → instant navigation
- Search projects by name from anywhere in the portfolio
- Implementation: `kbar` or custom implementation with `cmdk`
- This feature signals senior frontend engineering taste

### F12: Analytics Dashboard (Private)
- Self-hosted Umami or Plausible (privacy-respecting, GDPR-compliant, no cookies)
- Track: page views, contact form submissions, resume downloads, project view counts
- Public page view count on blog posts (social proof)

### F13: Project "Impact Metrics" Display
- Per project: show a small stats row ("Used by X people", "Launched in Y days", "X GitHub stars")
- If real metrics unavailable, show development metrics ("Built in 3 weeks", "4 API integrations")

### F14: Testimonials / Endorsements Section
- Dynamic from CMS: name, role, company, quote, avatar, date
- If no testimonials yet, substitute with GitHub commit history activity graph (shows you're active)
- LinkedIn recommendations can be quoted here (with permission)

---

## 3.3 "Wow" Features (Differentiators — Phase 3)

### F15: Interactive Terminal Easter Egg
- Hidden: typing `bosco` anywhere on the page opens a fake terminal
- Terminal accepts commands: `help`, `skills`, `projects`, `contact`, `joke`, `exit`
- Implementation: custom hook listening to `keydown` globally, renders a styled terminal overlay
- Why: This is the single most memorable feature. Senior engineers love this. It shows you can build complex stateful UI and have a sense of humor.

### F16: Animated Code Background / Hero Visual
- Hero section features a canvas animation of syntax-highlighted code lines flowing upward (Matrix-style but with real code snippets from your actual projects)
- Or: animated SVG of Kigali city skyline silhouette
- Respects `prefers-reduced-motion` — falls back to static gradient

### F17: "Build in Public" Timeline
- A visual timeline showing: first commit → first job → hackathon win → current role → where you want to go
- Not a static image — built with Framer Motion or CSS animations
- Shows growth trajectory visually. Recruiter-friendly.

### F18: AI Chat Assistant (Portfolio-Specific)
- "Ask about Jean Bosco" chat widget in corner
- Powered by Claude API with a system prompt containing your full CV/portfolio data
- Can answer: "What projects has he built?", "What's his availability?", "What's his strongest skill?"
- This is genuinely rare. Almost no developer does this. It will be remembered.

### F19: Project Live Preview with Device Mockup
- Project previews shown inside a rendered MacBook/iPhone frame (CSS device mockups)
- Desktop projects → MacBook frame, Mobile-first projects → iPhone frame
- Implementation: CSS-only device frames (no images needed) + iframe inside

### F20: "Open to Work" Micro-Animation
- When availability is true, a subtle pulsing green ring animation around the status badge
- On hover: expands to show "Last updated: [date]" (pulled from CMS)

---

## 3.4 Admin / CMS Features

### Sanity Studio (Recommended CMS)
**Why Sanity over others:**
- Real-time collaboration
- Powerful schema with custom validation
- Image transformation CDN built-in
- Free tier is more than enough for a portfolio
- Can be embedded at `/studio` route within Next.js project

**Content types to manage from CMS:**
- Projects (full CRUD)
- Blog posts (full CRUD with rich text editor)
- About page "currently learning" field
- Availability status toggle
- Testimonials
- Uses page items
- Site-wide settings (title, meta description, social links)

**Admin workflow:**
1. Log into Sanity Studio (bosco.sanity.studio or embedded /studio)
2. Create or edit project
3. Publish → webhook fires → Next.js ISR revalidates that page
4. Live on site within seconds, no redeploy needed

**No authentication needed on public portfolio** — Sanity Studio login uses Sanity's own auth (Google/GitHub).