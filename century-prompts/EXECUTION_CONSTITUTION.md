# 📜 EXECUTION CONSTITUTION: The High-Level Pipeline
> **Standard of Engineering 2026**
> "We do not guess. We engineer."

This document establishes the non-negotiable engineering standards for implementing the **Mythical Protocol**.

## 1. 🏗️ High-Level Pipeline (The Factory)

### A. Spec Bundle (Definition)
Before code, every feature must have:
- **Description:** What is it?
- **UI Mockup:** Visual expectation.
- **KPIs:** How do we measure success?
- **Privacy:** Data requirements.
- **Priority:** P0 (Critical) to P3 (Nice to have).

### B. Design System First (The Law)
1. **Tokens:** Edit `tokens.json` (Color, Space, Motion) first.
2. **Contracts:** Define Component Props (TS Interfaces).
3. **Motion:** Define `Motion Tokens` (e.g., `ease-confident`, `duration-fast`).

### C. The Sandbox (Isolation)
- Develop components in isolation (Storybook style).
- Do not integrate into the main app until the component is "Perfect" in isolation.

### D. Feature Flags (Safety)
- **Naming:** `ff/<team>/<area>/<feature>-v<major>`
- **Rule:** Every new feature is wrapped in a flag. Default = OFF.
- **Rollout:** Canary (1%) → Beta (10%) → Stable (100%).

### E. The CI/QA Gate (Quality)
Every PR must pass:
1. `Lint` & `Type Check`.
2. `Unit Tests`.
3. `Accessibility Scan` (axe-core).
4. `Performance Budget` (Lighthouse CI).
5. `Visual Regression` (No accidental design breaks).

---

## 2. 🧪 Tech Stack Recommendations

| Domain | Tool / Strategy |
| :--- | :--- |
| **Frontend** | Next.js (App Router) + React Server Components (Islands) |
| **Motion** | Framer Motion (governed by Motion Tokens) |
| **Design System** | Tailwind v4 + CSS Variables (Runtime Tokens) |
| **Flags** | LaunchDarkly / Unleash / Local Environment Flags |
| **Observability** | Sentry + Web Vitals (RUM) |
| **Testing** | Playwright (E2E) + Vitest (Unit) |

---

## 3. 🛡️ Golden Rules (Non-Negotiables)

1.  **Zero-Break Policy:** No feature merges if it breaks the build or fails `lint`.
2.  **Privacy First:** Face/Voice features run **On-Device Only**. Strict Consent.
3.  **Motion Budget:** Respect `prefers-reduced-motion`. No motion sickness triggers.
4.  **GPU Priority:** Use `transform` and `opacity` only for animation.
5.  **Clean Revert:** If a feature fails metrics, it must be killable via Feature Flag instantly.

---

## 4. 🧩 Repo Structure (Proposed)

```
/repo
  /apps
    /web             # Next.js Application
  /packages
    /design-system   # Tokens, Components, Motion
    /lib
      /flags         # Feature Flag Logic
      /telemetry     # RUM & Analytics
      /prefetch      # Predictive Engine
  /.github           # CI Workflows
  /tests             # E2E & Visual Regression
```

---

## 5. 🚦 Rollout Strategy (Safe & Fast)

1.  **Dev:** Flag ON locally.
2.  **Canary:** Flag ON for internal team + 1% traffic.
3.  **Observation:** Monitor LCP, CLS, and Error Rates for 24h.
4.  **Expansion:** Expand to 10% -> 50% -> 100%.
5.  **Kill Switch:** Auto-rollback if Error Rate > 1%.

---

**Signed:** The Architect
**Date:** 2026-01-19
