# دليل التنفيذ الكامل

# The Universal Development Constitution (Council Edition) — 2026

> **AR:** هذا الدستور مبني على قرارات وإصلاحات واقعية حصلت أثناء بناء WATMEDIA (Next.js App Router + TypeScript strict + Tailwind/Radix + Clerk + Stripe + Drizzle/Postgres + PostHog + Email + Tests + CI/CD). لا يوجد حشو نظري.
>
> **EN:** This constitution is based on real decisions and fixes made while building WATMEDIA (Next.js App Router + TypeScript strict + Tailwind/Radix + Clerk + Stripe + Drizzle/Postgres + PostHog + Email + Tests + CI/CD). No theory fluff.

---

## Phase 1: Mandate & Non‑Negotiables
### Core Objective
- **AR:** تثبيت المتطلبات والقيود التي لا يمكن التنازل عنها.
- **EN:** Lock non‑negotiable product, technical and security constraints.

### Checklist (What)
- **AR:**
  - تعريف نطاق المنتج (MVP/Platform/Enterprise).
  - تثبيت دعم العربية و RTL كمتطلب.
  - تحديد الخدمات الخارجية: Clerk/Stripe/PostHog/Resend.
  - تعريف “ممنوعات”: Icons غير موجودة، HTML/CSS غير صالح (email)، استيرادات خاطئة.
- **EN:**
  - Define scope (MVP/platform/enterprise).
  - Make Arabic RTL a first‑class requirement.
  - Commit to external services: Clerk/Stripe/PostHog/Resend.
  - Define “forbidden moves”: non-existent icons, invalid email HTML/CSS, wrong exports/imports.

### Technical Directives (How)
- **AR:** Next.js App Router + TypeScript strict + ESLint.
- **EN:** Next.js App Router + TypeScript strict + ESLint.

### Council’s Secret Sauce
- **AR/EN:** ملف “Known Incidents & Fixes” داخل playbook (نقاط مثل: `Inter` لا يدعم `arabic` subset، `PostHogProvider` ليس `Analytics`، وAI SDK import تغير).

---

## Phase 2: Repo & Runtime Baseline
### Core Objective
- **AR:** منع اختلافات البيئة (Dev/CI/Prod).
- **EN:** Eliminate environment drift across dev/CI/prod.

### Checklist (What)
- `package.json` scripts: `dev`, `build`, `start`, `lint`, `type-check`, `test`, `cy:run`, `audit`.
- توحيد Node version في CI.
- `.env.example` شامل.

### Technical Directives (How)
- **AR/EN:** Use App Router structure: `src/app`, `src/components`, `src/lib`, `src/db`.

### Council’s Secret Sauce
- **AR/EN:** Windows PowerShell parity: use `Remove-Item -Recurse -Force` instead of `rm -rf`.

---

## Phase 3: Design System Contract
### Core Objective
- **AR:** تأسيس UI primitives لتجنب كسر الميزات لاحقاً.
- **EN:** Establish UI primitives to prevent later feature breakage.

### Checklist (What)
- Components: `Badge`, `Button`, `Input`, `Card`, `Table`, `Select`, `DropdownMenu`, `Avatar`, `Progress`, `Label`, `Textarea`.
- Variants via `class-variance-authority`.

### Technical Directives (How)
- **AR/EN:** Radix UI primitives + Tailwind + `cn()` utility.

### Council’s Secret Sauce
- **AR/EN:** Never import non-existent `lucide-react` icons; replace with confirmed exports.

---

## Phase 4: Routing, Layouts & RTL Guarantee
### Core Objective
- **AR:** هيكلة routes + layouts مع ضمان RTL.
- **EN:** Solid route groups/layouts with guaranteed RTL.

### Checklist (What)
- Root `src/app/layout.tsx` + `src/app/globals.css`.
- Route groups: `(auth)`, `(dashboard)`, `(legal)`.

### Technical Directives (How)
- **AR/EN:**
  - Fonts: verify `next/font` subsets.
  - Metadata: ensure all string values are quoted properly.

### Council’s Secret Sauce
- **AR/EN:** RTL rules live in `globals.css` (avoid per-component hacks).

---

## Phase 5: Authentication Boundary
### Core Objective
- **AR:** حماية dashboard بطريقة صحيحة.
- **EN:** Secure protected routes correctly.

### Checklist (What)
- ClerkProvider at root.
- `(dashboard)/layout.tsx` enforces `auth()` and redirect.

### Technical Directives (How)
- **AR/EN:** Use server-side `auth()` guards. Use `'use client'` only where hooks are required.

### Council’s Secret Sauce
- **AR/EN:** Guard at layout boundary, not per-page.

---

## Phase 6: Data Model & Schema Authority
### Core Objective
- **AR:** الـ schema هو مصدر الحقيقة.
- **EN:** Schema is the single source of truth.

### Checklist (What)
- Drizzle schema tables for core domains.
- Strict typing and migrations.

### Technical Directives (How)
- **AR/EN:** Fix type mismatches at the boundary (e.g., `invoice.amount` string vs number).

### Council’s Secret Sauce
- **AR/EN:** Never “force” types around Drizzle; align payloads/schema intentionally.

---

## Phase 7: Domain Modules
### Core Objective
- **AR:** بناء domains كحزم واضحة.
- **EN:** Build clear domain modules.

### Checklist (What)
- Dashboard, Projects, Invoices, Tickets, Notifications.

### Technical Directives (How)
- **AR/EN:** Keep pages server-first; keep widgets client-only.

### Council’s Secret Sauce
- **AR/EN:** Use Framer Motion selectively for perceived quality, not everywhere.

---

## Phase 8: API Layer Protocol
### Core Objective
- **AR:** API موحد وسهل الاختبار.
- **EN:** Consistent, testable API.

### Checklist (What)
- API routes with:
  - Validation (Zod)
  - Auth (Clerk)
  - Ownership checks
  - Error codes 400/401/404/500

### Technical Directives (How)
- **AR/EN:** Zod schemas at route boundary.

### Council’s Secret Sauce
- **AR/EN:** Default to deny-by-default; avoid “TODO admin check” in production paths.

---

## Phase 9: Payments & Subscription Spine
### Core Objective
- **AR:** Stripe كعمود مالي مضبوط.
- **EN:** Stripe as a hardened financial spine.

### Checklist (What)
- Checkout session route.
- Webhook signature verification.
- Subscription DB updates based on webhooks.

### Technical Directives (How)
- **AR/EN:** Subscription activation comes from webhook, not UI success.

### Council’s Secret Sauce
- **AR/EN:** Store `userId` + `planId` in Stripe metadata; reconcile in webhook.

---

## Phase 10: Messaging & Email Discipline
### Core Objective
- **AR:** بريد وإشعارات صحيحة وقابلة للتتبع.
- **EN:** Reliable, traceable email & notifications.

### Checklist (What)
- Notifications API (mark read / mark all read).
- Email templates validity.

### Technical Directives (How)
- **AR/EN:** Email HTML/CSS must be “email-client-safe” (avoid invalid properties/attrs).

### Council’s Secret Sauce
- **AR/EN:** Treat email rendering as hostile; validate HTML/CSS.

---

## Phase 11: Analytics & Observability
### Core Objective
- **AR:** عدم العمل “أعمى”.
- **EN:** Don’t operate blind.

### Checklist (What)
- PostHog provider installed correctly.
- Track pageviews + key business events.

### Technical Directives (How)
- **AR/EN:** Import the correct export name (`PostHogProvider`).

### Council’s Secret Sauce
- **AR/EN:** Provider export names are a frequent break point—verify them.

---

## Phase 12: Automated Testing Stack
### Core Objective
- **AR:** منع الانحدار.
- **EN:** Prevent regressions.

### Checklist (What)
- Jest config + setup.
- Cypress config + support + TS types.

### Technical Directives (How)
- **AR/EN:** Ensure TS sees Cypress globals via `tsconfig.include` and `cypress/types`.

### Council’s Secret Sauce
- **AR/EN:** Fix `cy/Cypress/beforeEach` typing early to avoid IDE/build blockers.

---

## Phase 13: CI/CD & Release Governance
### Core Objective
- **AR:** كل Merge يمر عبر بوابة جودة.
- **EN:** Every merge passes quality gates.

### Checklist (What)
- Lint + type-check + unit tests + build.
- Secrets in CI.

### Technical Directives (How)
- **AR/EN:** Fail fast on type-check.

### Council’s Secret Sauce
- **AR/EN:** Any major dependency upgrade requires CI verification immediately.

---

## Phase 14: Security Patch Protocol
### Core Objective
- **AR:** ترقيعات أمنية بقرارات واعية.
- **EN:** Deliberate security patching.

### Checklist (What)
- `npm audit` triage.
- Critical fixed immediately.
- Dev-only moderate documented.

### Technical Directives (How)
- **AR/EN:** Avoid blind `npm audit fix --force` unless reviewed.

### Council’s Secret Sauce
- **AR/EN:** Severity-driven upgrades (we fixed critical Next.js, documented esbuild dev risk).

---

## Phase 15: Performance Budget & Runtime Hardening
### Core Objective
- **AR:** أداء قابل للقياس.
- **EN:** Measurable performance.

### Checklist (What)
- Performance budgets (LCP/TTFB/JS bundle).
- Caching plan (CDN + Redis when needed).

### Technical Directives (How)
- **AR/EN:** Server-first by default; client JS only where needed.

### Council’s Secret Sauce
- **AR/EN:** Fix build-breakers first (fonts/exports/globals.css/imports) before micro-optimizations.

---

## Phase 16: Evolution Path (MVP → Enterprise)
### Core Objective
- **AR:** قابلية نمو بدون إعادة كتابة.
- **EN:** Scale without rewrites.

### Checklist (What)
- Maintain modular boundaries.
- Introduce eventing/queues/caching as data proves need.

### Technical Directives (How)
- **AR/EN:** Build monolith-modular now; extract services later by metrics.

### Council’s Secret Sauce
- **AR/EN:** “Hybrid by design”: monolith speed + clean seams for future decomposition.

