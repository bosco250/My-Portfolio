# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# 🚀 Jean Bosco Dusengimana — Portfolio Blueprint
### Global-Level Portfolio System · Implementation-Ready Specification

> **Author:** Dusengimana Jean Bosco  
> **Role:** Full-Stack Software Developer  
> **Location:** Kigali, Rwanda  
> **GitHub:** [github.com/bosco250](https://github.com/bosco250)  
> **Contact:** dusengimana06@gmail.com | +250 786 946 188

---

## 📁 Blueprint Document Index

| # | File | What It Covers |
|---|------|---------------|
| 01 | [`01-GOAL-AND-STRATEGY.md`](./01-GOAL-AND-STRATEGY.md) | Purpose, audience, positioning, what makes a portfolio exceptional |
| 02 | [`02-INFORMATION-ARCHITECTURE.md`](./02-INFORMATION-ARCHITECTURE.md) | Sitemap, routes, navigation flow, page content strategy |
| 03 | [`03-FEATURES.md`](./03-FEATURES.md) | Must-have, advanced, wow-factor, CMS/admin features |
| 04 | [`04-UI-UX-DESIGN-SYSTEM.md`](./04-UI-UX-DESIGN-SYSTEM.md) | Design principles, typography, colors, components, accessibility |
| 05 | [`05-TECHNICAL-ARCHITECTURE.md`](./05-TECHNICAL-ARCHITECTURE.md) | Next.js structure, state management, API, DB schema, deployment |
| 06 | [`06-PERFORMANCE-AND-SEO.md`](./06-PERFORMANCE-AND-SEO.md) | Lighthouse 100 strategy, SEO, Core Web Vitals, schema markup |
| 07 | [`07-PROJECT-SHOWCASE-STRATEGY.md`](./07-PROJECT-SHOWCASE-STRATEGY.md) | How to present projects at senior level, templates, case studies |
| 08 | [`08-PERSONAL-BRANDING.md`](./08-PERSONAL-BRANDING.md) | Positioning, tone, memorability, storytelling framework |
| 09 | [`09-SECURITY-AND-BEST-PRACTICES.md`](./09-SECURITY-AND-BEST-PRACTICES.md) | Secure coding, API protection, common pitfalls |
| 10 | [`10-IMPLEMENTATION-ROADMAP.md`](./10-IMPLEMENTATION-ROADMAP.md) | Step-by-step build plan, phases, time estimates |
| 11 | [`11-UNIQUE-AND-WOW-IDEAS.md`](./11-UNIQUE-AND-WOW-IDEAS.md) | Rare features that impress senior engineers |
| 12 | [`12-CONTENT-DATA.md`](./12-CONTENT-DATA.md) | Real content from CV, project writeups, bio copy |
| 13 | [`13-CMS-SCHEMA.md`](./13-CMS-SCHEMA.md) | Dynamic content schema for projects, blog, testimonials |

---

## ⚡ Quick Summary

**Stack Decision:** vite + TypeScript + Tailwind CSS + Sanity CMS + Vercel  
**Design Direction:** Dark, editorial, cinematic — Africa's tech story told with global craft  
**Unique Angle:** A developer from Rwanda who won a national hackathon and builds real civic tech  
**Target Outcome:** Hired at a global company / remote position within 90 days of launch  

---

## 🎯 The Core Positioning Statement

> *"I'm a Full-Stack Developer from Kigali building applications that solve real problems for real people — from public health to justice access. I write clean code, ship fast, and think in systems."*

This sentence should drive every design and content decision in the portfolio.

---

## 📋 How to Use These Documents

1. **Read in order** (01 → 13) for full context before writing any code
2. **Keep this README open** as a master navigation reference
3. **Documents 04 and 05** are the most critical for implementation
4. **Document 12** contains your real content — don't write placeholder text
5. **Document 13** is your CMS schema — implement this before building UI

---

*Last Updated: 2026 | Version 1.0*