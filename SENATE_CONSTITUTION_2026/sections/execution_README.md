# نظرة عامة على التنفيذ

# WATMEDIA Playbook (AR + EN) — 2026

هذا المجلد يحتوي **حزمة Playbook تنفيذية** مبنية على “DNA” مشروع WATMEDIA، ومصممة لتكون مرجعًا قابلاً للتطبيق **من A إلى Z** لبناء:
- مواقع صغيرة (MVP)
- منصات SaaS
- لوحات تحكم داخلية
- منتجات على مستوى الشركات (Enterprise)

This folder contains a **directly executable Playbook** based on the WATMEDIA project’s DNA, designed as an A→Z reference for building:
- Small websites (MVP)
- SaaS platforms
- Internal dashboards
- Enterprise-grade products

---

## How to use / طريقة الاستخدام

### 1) Start here / ابدأ من هنا
- **`GUIDE.md`**: الدستور الأساسي (16 مرحلة) / The 16-phase constitution.

### 2) Choose your pack / اختر الحزمة
- **Minimal Pack** (recommended for most teams):
  - `minimal/`
- **Enterprise Pack** (governance, observability, incident response, contracts):
  - `enterprise/`

---

## Execution entrypoints / نقاط تنفيذ مباشرة

### Local dev / تشغيل محلي
- `npm install`
- `npm run dev`

### Quality gates / بوابات الجودة
- `npm run lint`
- `npm run type-check`
- `npm test`
- `npm run cy:run`

### Security / أمان
- `npm audit`

---

## Compatibility notes (from real incidents) / ملاحظات توافق (من أخطاء فعلية)
- **Windows PowerShell:** لا تستخدم `rm -rf`؛ استخدم `Remove-Item -Recurse -Force`.
- **Next.js fonts:** لا تفترض subsets مثل `arabic` مع Inter.
- **Provider exports:** لا تفترض exports (مثل `PostHogProvider` وليس `Analytics`).
- **AI SDK:** تغييرات major قد تكسر imports (مثل `ai/react` → `@ai-sdk/react`).

---

## File map / خريطة الملفات

### Root
- `GUIDE.md`

### Minimal Pack
- `minimal/ops/RUNBOOK_DEV.md`
- `minimal/ops/RUNBOOK_RELEASE.md`
- `minimal/security/SECURITY_PLAYBOOK.md`
- `minimal/quality/DEFINITION_OF_DONE.md`
- `minimal/perf/PERFORMANCE_BUDGET.md`
- `minimal/decisions/ADR-0001-architecture.md`
- `minimal/prompts/PROMPT_LIBRARY.md`

### Enterprise Pack
- `enterprise/arch/REFERENCE_ARCHITECTURE.md`
- `enterprise/contracts/DATA_CONTRACTS.md`
- `enterprise/observability/OBSERVABILITY.md`
- `enterprise/ops/INCIDENT_RESPONSE.md`
- `enterprise/compliance/PRIVACY_CHECKLIST.md`
- `enterprise/scaling/SCALING_CACHING_EVENTING.md`
- `enterprise/prompts/PROMPT_LIBRARY_ENTERPRISE.md`

