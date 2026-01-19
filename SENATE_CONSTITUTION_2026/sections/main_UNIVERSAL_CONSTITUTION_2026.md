# الدستور العالمي 2026

# UNIVERSAL_CONSTITUTION_2026 — الدستور العالمي التنفيذي (دمج playbook 1 + playbook 2)

## 0) Purpose / الهدف
هذا الملف هو **مرجع واحد نهائي** يدمج أفضل ما في:
- `playbook/` (الدستور الواقعي + الـAccelerator التنفيذي + Minimal/Enterprise)
- `‏‏playbook 2/` (Supreme/Cyborg/Century/Duality)

النتيجة: **خريطة تنفيذ حرفية** + **قواعد تشغيل** + **طبقات توسعة** لبناء أي موقع/منصة عام 2026 بجودة عالية وقابلية تكرار.

## 1) Prime Directive / المبدأ الأعلى
- **AR:** لا تبنِ صفحات… ابنِ نظامًا/أصلًا حيًا (Business Asset) يقاس ويُدار ويستمر.
- **AR:** احمِ وقت المستخدم قبل أي شيء. أي UI/Animation/Copy لا يحمي وقت المستخدم أو يخدم قرارًا تجاريًا = ضجيج.
- **EN (technical):** Build repeatable systems with measurable quality gates, not one-off pages.

## 2) The Non‑Negotiables / غير قابل للتفاوض
### 2.1 Tech Stack (2026 Default)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **UI Primitives:** Radix (Shadcn style)
- **DB:** Postgres + Drizzle ORM
- **Auth:** Clerk
- **Payments:** Stripe
- **Analytics:** PostHog (or Vercel Analytics عند الحاجة)
- **Email:** Resend
- **Errors/Tracing:** Sentry (Enterprise baseline)
- **Rate limiting:** Upstash Redis

> ملاحظة توحيد: ملفات `playbook 2` تذكر Next.js 16 وTailwind v4 وReact 19. ملفات `playbook` أكثر عمومية. **هذا الدستور يعتبر Next.js 16 هدفًا** إن كان مشروع جديد 2026.

### 2.2 Hard Rules (Always)
- **Server Components first:** أي صفحة عامة server-first، و`'use client'` فقط حيث يوجد hooks.
- **RTL:** العربية/RTL متطلب أساسي ويُدار في `globals.css`.
- **Validation:** Zod على حدود الـAPI/Forms.
- **Security:** deny-by-default على المسارات الحساسة + ownership checks.
- **Stripe:** حالة الاشتراك/الدفع مصدرها webhook فقط.
- **No secrets in git:** `.env*` لا تُرفع.

## 3) Project Modes / أوضاع المشاريع (Choose One)
### 3.1 Marketing Website (MVP site)
- **Template:** `playbook/accelerator/templates/marketing/TEMPLATE.md`
- **Goal:** Leads / Booking / Contact
- **Output:** صفحات عامة + SEO + CTA + Proof

### 3.2 SaaS / Dashboard Platform
- **Template:** `playbook/accelerator/templates/saas-dashboard/TEMPLATE.md`
- **Goal:** Auth + Domains + Payments + API
- **Output:** (auth) + (dashboard) + api routes + DB schema

### 3.3 Enterprise Hardening (Layer)
- **Add-on pack:** `playbook/enterprise/*`
- **Goal:** observability + incident readiness + contracts + scaling

## 4) Canonical File Structure / شجرة الملفات المرجعية
> دمج template trees من `playbook` + “Golden File Structure” من `playbook 2`.

```text
src/
  app/
    layout.tsx
    globals.css
    (auth)/
    (dashboard)/
    api/
    manifest.ts                # (Optional) PWA
    privacy/page.tsx           # (Required if tracking)
    terms/page.tsx
  components/
    ui/
    layout/
    home/                      # marketing sections
    business/                  # domain components
  lib/
    db/
    utils.ts
    auth.ts
    stripe.ts
  hooks/
  db/
    schema.ts
    index.ts
cypress/ (optional) OR playwright/ (optional)

# docs (recommended)
docs/
  playbook/
  accelerator/
```

## 5) Execution Map (The Unified Pipeline) / خريطة التنفيذ
> هذا هو “التسلسل التنفيذي” الذي يدمج: 16 Phase (Core) + Phase 17-18 (Supreme) + Century layers.

### Phase 0: Mandate & DNA / تحديد DNA
- **Input:** وصف المشروع + ICP + الهدف التجاري + اللغة (RTL) + الخدمات الخارجية.
- **Use:** `‏‏playbook 2/play/+` (prompts) لتوليد ICP/Sitemap/Hero/CTA/FAQ.
- **Output:** Project DNA one-pager + KPIs.

### Phase 1: Repo & Runtime Baseline
- **Deliverables:** Next.js + TS strict + lint + scripts + env template.
- **Core checks:** `lint`, `type-check`, `tests`, `build`.
- **Known breakpoints:** Windows commands / missing globals.css.

### Phase 2: Design System Contract
- **Deliverables:** UI primitives (Button/Card/Input/Badge/Table/…)
- **Rule:** لا import لأيقونة غير موجودة.

### Phase 3: Routing & Layouts + RTL Guarantee
- **Deliverables:** `layout.tsx`, `globals.css`, route groups.
- **RTL:** في globals (not per-component hacks).

### Phase 4: Auth Boundary
- **Deliverables:** Clerk provider + protected dashboard layout.
- **Rule:** guard at layout boundary.

### Phase 5: Data Model & Schema Authority
- **Deliverables:** Drizzle schema + migrations.
- **Rule:** fix type mismatches at boundary (money string vs number).

### Phase 6: Domain Modules
- **Deliverables:** Projects / Invoices / Tickets / Notifications.
- **Rule:** server-first pages; client widgets only.

### Phase 7: API Layer Protocol
- **Deliverables:** CRUD routes with Zod + auth + ownership + codes.
- **Rule:** no TODO in security paths.

### Phase 8: Payments & Subscription Spine
- **Deliverables:** Stripe checkout + webhook verification.
- **Rule:** subscription state comes from webhook.

### Phase 9: Messaging & Email Discipline
- **Deliverables:** notifications + email templates (Resend).
- **Rule:** email HTML/CSS must be client-safe.

### Phase 10: Analytics & Observability (Minimum)
- **Deliverables:** PostHog provider + key events.
- **Rule:** verify export names (PostHogProvider).

### Phase 11: Automated Testing Stack
- **Option A (playbook):** Jest + Cypress
- **Option B (playbook 2):** Vitest + Playwright
- **Unified rule:** tests must exist for critical boundaries (auth, webhook, core flows).

### Phase 12: CI/CD & Release Governance
- **Deliverables:** pipeline runs lint/type-check/test/build.

### Phase 13: Security Patch Protocol
- **Deliverables:** audit triage policy.

### Phase 14: Performance Budget & Runtime Hardening
- **Budgets:** LCP/TTFB/JS client.

### Phase 15: Deployment & Rollback
- **Deliverables:** env check + deploy + smoke tests + rollback path.

### Phase 16: Proof & Delivery
- **Deliverables:** proof pack + demo narrative + offer.

### Phase 17: Operation Eclipse (Strategic Superiority)
- **Goal:** psychological triggers + scarcity/lead capture.
- **Key components:** StatusPulse, CrystalConcierge, Ecosystem narrative.

### Phase 18: Cyborg Arsenal (Zero‑Cost Power Features)
- **Goal:** premium feel without heavy infra.
- **Key features:** PWA manifest, CMD+K, confetti, reading time, back-to-top, shortcuts.

### Phase 19+ (Optional): Century / Duality / Mythical
- **Rule:** لا تنفذ أكثر من 3 مستويات في الجلسة.
- **Verify:** `npm run build` بعد كل مستوى.
- **Risk tiers:** SAFE مباشرة، MODERATE feature flag، ADVANCED branch lab.

## 6) Accelerator Kit (Execution Hardware) / عدة التسريع
### 6.1 Templates
- `playbook/accelerator/templates/marketing/TEMPLATE.md`
- `playbook/accelerator/templates/saas-dashboard/TEMPLATE.md`

### 6.2 Vertical Packs + Generator
- Packs: `clinic`, `salon`, `phone-shop`, `agency` (`playbook/accelerator/vertical-packs/*.json`)
- Generator: `playbook/generate-content.ps1`
- Output shape (as designed): `seo.json`, `checklist.md`, `pages/*.md`

### 6.3 Proof System
- Spec: `playbook/accelerator/PROOF_PACK.md`
- Concept: performance + security + reliability proofs (reproducible).

### 6.4 Business Delivery
- Offers: `playbook/accelerator/PRODUCTIZED_OFFERS.md`
- Narrative: `playbook/accelerator/DEMO_NARRATIVE.md`
- Offer PDF generator: `playbook/generate-offer-pdf.ps1`

### 6.5 Automation/Health
- Command hub: `playbook/acc.ps1`
- Docs audit: `playbook/audit-docs.ps1`

## 7) Quality Gates / بوابات الجودة
### 7.1 Definition of Done (Unified)
- `npm run lint` passes
- `npm run type-check` passes
- Critical tests exist (auth, dashboard access, payments/webhooks)
- RTL verified
- Loading/error states exist
- No new critical vulnerabilities
- Key events tracked

### 7.2 Performance Budgets (Unified)
- LCP: <= 1.5s (MVP), <= 1.0s (Enterprise)
- API p95: <= 200ms (MVP), <= 100ms (Enterprise)
- Client JS minimal; prefer RSC

## 8) Security Protocol / بروتوكول الأمان
### 8.1 Threat Model (Minimal)
- ATO (auth)
- Webhook spoofing (Stripe)
- XSS/SQL injection
- Abuse (rate limiting)
- Data leakage (IDOR)

### 8.2 Non‑Negotiables
- Secrets never committed
- deny-by-default
- webhook signature verification
- ownership checks

### 8.3 Rate Limiting
- Upstash recommended for public API routes.

### 8.4 Privacy
- If tracking: cookie consent + privacy policy.

## 9) Observability / الرصد
- MVP: structured logs + PostHog + (optional) Sentry
- Enterprise: request_id + latency_ms + traces + alerts
- Alerts required for: webhook failures, auth redirect loops, budget breaches.

## 10) Incident Response / الاستجابة للحوادث
- SEV0..SEV3 triage
- rollback path
- postmortem template

## 11) Scaling Strategy / خطة التوسع
- Cache (Redis) for hot data
- Pooling (PgBouncer) when needed
- Background jobs for email/notifications/webhook follow-ups
- Split services only when metrics justify.

## 12) Supreme Layer / طبقة Supreme
> مأخوذة من `‏‏playbook 2/GUIDE.md.resolved` وملفات Cyborg/Eclipse.

### 12.1 Operation Eclipse
- StatusPulse: scarcity indicator
- CrystalConcierge: premium contact FAB
- Ecosystem narrative section

### 12.2 Cyborg Arsenal (baseline set)
- PWA manifest
- Scroll progress
- Back to top
- CMD+K
- Keyboard shortcuts
- Confetti
- Reading time
- Konami easter egg

## 13) Century Execution (Duality) / تنفيذ المئة مستوى
> مأخوذ من: `‏‏playbook 2/play/CONSTITUTION_V5_CENTURY.md.resolved` + مكتبات الأوامر:
> - `playbook/century-prompts/*`
> - `‏‏playbook 2/play/century-prompts/*`

### 13.1 Execution Rules
- Execute in batches of 3.
- Alternate Brain/Beauty where possible.
- Verify build after each.
- SAFE: direct inject
- MODERATE: feature flag
- ADVANCED: branch lab

### 13.2 Semester 1 (Recommended start)
- Level 51 Lenis
- Level 21 Zen Mode
- Level 46 Returning user
- Level 81 Rage click
- Level 38 Confetti on success
- Level 45 Auto dark mode

### 13.3 Prompt Sources
- Brain prompts:
  - `playbook/century-prompts/BRAIN/*`
  - `‏‏playbook 2/play/century-prompts/BRAIN/*`
- Beauty prompts:
  - `playbook/century-prompts/BEAUTY/*`
  - `‏‏playbook 2/play/century-prompts/BEAUTY/*`

## 14) Copy & Landing System / نظام كتابة الموقع
> مأخوذ من `‏‏playbook 2/play/+`.

### 14.1 The Landing Blueprint
- Project summary + ICP + journey
- Sitemap (hierarchical)
- Hero: Promise + Proof + CTA
- Sections: Pain → Benefits → How it works → Use cases → Proof → Pricing → FAQ → Final CTA
- Support pages: About / Contact / Thank you
- Checklists: hero QA + page UX QA + microcopy guide

## 15) Known Breakpoints (Unified) / نقاط الكسر المعروفة
### 15.1 From playbook/KNOWN_BREAKPOINTS.md
- Font subsets: Inter no `arabic`
- Provider export mismatch: PostHogProvider
- AI SDK major import path changes
- Drizzle money types mismatch
- Windows PowerShell cleanup
- Missing globals.css
- Cypress TS globals types

### 15.2 From Supreme Constitution V3 (battle-tested)
- Double export trap
- Ghost route phenomenon
- Silent provider error
- Dead UI syndrome (needs Supreme overrides)

### 15.3 Quick Fix Checklist
- Verify globals.css exists and imported
- Verify font subsets
- Verify exports/imports
- Verify dependency versions
- Verify PowerShell commands
- Verify test tooling types

## 16) Tooling Reality Check (This Repo) / ملاحظات تنفيذية على هذه النسخة
تم تحويل الحزمة إلى **نظام تشغيل فعلي** داخل هذا المجلد عبر:
- إصلاح `playbook/acc.ps1` (arguments + أوامر إضافية).
- إصلاح `playbook/generate-proof-pack.ps1` ليعمل حتى لو سكربتات الـbench غير موجودة (ينتج placeholders).
- ملء ملفات الحوكمة:
  - `playbook/accelerator/MASTER_INDEX.md`
  - `playbook/accelerator/DECISION_LOG.md`
  - `playbook/rules.md`
  - `playbook/copilot-instructions.md`
  - `playbook/auto-quality.yml` (كقالب workflow)
- إضافة مجلد supplements لتجنب تضخيم ملف الدستور:
  - `constitution/OPERATIONS.md`
  - `constitution/APPENDICES_INDEX.md`
  - `tools/constitution/build-appendices.ps1`

## 17) Completeness Ledger / سجل الشمول
هذه الوثيقة **تدمج/تلخص** ما يلي (مع الإحالة إلى المصدر الأصلي داخل المجلد):

### 17.1 Root
- `دستور.txt` (Core 16-phase — مضمون داخل Sections 1..15)
- `بلي بوك 2.md.resolved` + `‏‏playbook 2/AI_AGENT_PROMPT.md.resolved` (AI bootstrap — Section 13/14)
- `‏‏امر تشغيل بلي بوك 1 - نسخة.txt` (طلب مخرجات خطة — مدمج كمنهج Output)

### 17.2 playbook/
- Core: `README.md`, `GUIDE.md`, `KNOWN_BREAKPOINTS.md`, `TROUBLESHOOTING.md`, `DEPLOYMENT_GUIDE.md`
- Tooling: `acc.ps1`, `audit-docs.ps1`, `generate-content.ps1`, `generate-proof-pack.ps1`, `generate-offer-pdf.ps1`, `daily-update.yml`
- Accelerator docs: `00-EXECUTION_ORDER.md`, `TASK_MAP.md`, `WORKFLOWS_A2Z.md`, `SENATE_WISDOM.md`, `EXECUTION_DASHBOARD.md`, `PLAYBOOK_PREVIEW_SITE.md`, `PROOF_PACK.md`, `PRODUCTIZED_OFFERS.md`, `DEMO_NARRATIVE.md`, `PROMPT_LIBRARY_2026.md`, `READY_ME_*`
- Minimal pack: `RUNBOOK_DEV.md`, `RUNBOOK_RELEASE.md`, `SECURITY_PLAYBOOK.md`, `DEFINITION_OF_DONE.md`, `PERFORMANCE_BUDGET.md`, `ENV_SETUP.md`, `ADR-0001-architecture.md`, `PROMPT_LIBRARY.md`
- Enterprise pack: `REFERENCE_ARCHITECTURE.md`, `DATA_CONTRACTS.md`, `OBSERVABILITY.md`, `INCIDENT_RESPONSE.md`, `PRIVACY_CHECKLIST.md`, `SCALING_CACHING_EVENTING.md`, `PROMPT_LIBRARY_ENTERPRISE.md`

### 17.3 playbook 2/
- Index/Guide/Packs/Task registry: `CONSTITUTION_INDEX.md.resolved`, `GUIDE.md.resolved`, `MINIMAL_PACK.md.resolved`, `ENTERPRISE_PACK.md.resolved`, `task.md.resolved`
- Supreme/Century core: `CONSTITUTION_V3_SUPREME.md.resolved`, `CONSTITUTION_V5_CENTURY.md.resolved`, `THE_CENTURY_CODEX.md.resolved`, `THE_DUALITY_CODEX.md.resolved`, `SAFE_IMPLEMENTATION_CATALOG.md.resolved`, `CENTURY_EXECUTION_ROADMAP.md.resolved`, `MYTHICAL_PROTOCOL.md`, `FINAL_SUPREME_REPORT_AR.md.resolved`
- Additional business/UX layer: `play/+`, `play/++`, `Untitled-1.ini`, `Untitled-1.txt`
- Execution prompts: `play/century-prompts/*` (Brain/Beauty + Elite/Singularity/Mythical + execution constitution)

---

## 18) What to do next / الخطوة التالية
- إذا هدفك “وثيقة فقط”: هذا الملف يكفي كمرجع.
- إذا هدفك “نظام تشغيل يعمل بالأوامر”: اطلب مني تحويل هذه الحزمة إلى **Repo جاهز للتشغيل** عبر:
  - إصلاح سكربتات PowerShell المذكورة
  - توحيد المسارات (docs/tools)
  - إضافة محتوى للملفات الفارغة (MASTER_INDEX/DECISION_LOG…)

---

## 19) Supplements (Keep the constitution small, keep everything included)
للحفاظ على هذا الملف **خفيف وقابل للاستخدام اليومي**، تمت إضافة مجلد مكمل:

- **Operations / تشغيل النظام:** `constitution/OPERATIONS.md`
- **Verbatim Appendices Index / فهرس الملاحق الحرفية:** `constitution/APPENDICES_INDEX.md`

### Generate / Update the verbatim appendices
من جذر المجلد:

```powershell
powershell -ExecutionPolicy Bypass -File tools/constitution/build-appendices.ps1
```

