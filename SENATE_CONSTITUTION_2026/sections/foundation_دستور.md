# الدستور العربي الأساسي

# GUIDE.md
# The Universal Development Constitution (Council Edition)
## 16-Phase Execution Protocol (Based on WATMEDIA DNA)

> هذا الدستور مستخرج من “DNA” مشروعنا الفعلي: Next.js (App Router) + TypeScript strict + Tailwind + Radix UI + Clerk + Stripe + Drizzle/Postgres + PostHog + Email + اختبارات + CI/CD + إصلاحات أمنية عملية.  
> **قاعدة المجلس:** لا نكتب “إرشادات عامة”. كل بند هنا مرتبط بقرارات/إصلاحات قمنا بها فعليًا أثناء البناء.

---

## Phase 1: Mandate & Non‑Negotiables (دستور المتطلبات والقيود)
### Core Objective
تثبيت “قواعد اللعبة” قبل كتابة أي كود: ما الذي نعد به المنتج؟ وما الذي نرفضه؟

### Checklist (What)
- تحديد نطاق المنتج (MVP مقابل Enterprise).
- تحديد اللغات/الاتجاه (RTL عربي) كمتطلب أساسي.
- تحديد خدمات الطرف الثالث: Auth (Clerk)، Payments (Stripe)، Analytics (PostHog)، Email (Resend).
- تحديد “ممنوعات” المشروع:  
  - ممنوع Icons غير موجودة (lucide-react).  
  - ممنوع CSS/HTML غير صالح (مثل خصائص غير مدعومة في email templates).  
  - ممنوع مزج Server/Client بدون `use client` عند الحاجة.

### Technical Directives (How)
- Next.js App Router كنقطة مرجعية للهيكلة.
- TypeScript strict + ESLint كحاجز أولي ضد الانحدار.
- تحديد متغيرات البيئة في `.env.example` منذ البداية.

### The Council’s Secret Sauce
- **قائمة “قواعد إصلاح سريعة”** تُكتب مبكرًا وتُحدّث مع كل خطأ نصلحه (مثل: “Inter لا يدعم subset arabic”، “PostHogProvider ليس Analytics”، “Drizzle invoice amount نوعه string”). هذه القائمة تمنع تكرار نفس الأعطال.

---

## Phase 2: Repo & Runtime Baseline (تهيئة المستودع وخط الأساس التشغيلي)
### Core Objective
توحيد بيئة التطوير والإنتاج ومنع اختلافات “يشتغل عندي فقط”.

### Checklist (What)
- تهيئة [package.json](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/package.json:0:0-0:0) scripts: dev/build/start/lint/type-check.
- توحيد Node version في CI.
- تثبيت الحزم الأساسية المتفق عليها.
- تعريف هيكل مجلدات: [src/app](cci:9://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app:0:0-0:0), `src/components`, `src/lib`, `src/db`.

### Technical Directives (How)
- Next.js + TypeScript + Tailwind.
- اعتماد مسارات alias: `@/*`.
- إعداد [globals.css](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/globals.css:0:0-0:0) داخل [src/app](cci:9://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app:0:0-0:0) وربطه في [layout.tsx](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/layout.tsx:0:0-0:0).

### The Council’s Secret Sauce
- **Windows-first commands:** لا تستخدم `rm -rf` في PowerShell. استخدم `Remove-Item -Recurse -Force`.
- أي تحذير dependency لا يعالج “عشوائيًا”. يتم عبر قرار: تحديث مضبوط أو قبول مخاطر dev-only.

---

## Phase 3: Design System Contract (عقد نظام التصميم)
### Core Objective
تأمين UI متسق وقابل للتوسع بدون إعادة كتابة كل شيء لاحقًا.

### Checklist (What)
- إنشاء مكونات UI الأساسية: Badge, Button, Input, Card, Table, Select, DropdownMenu, Avatar, Progress, Label, Textarea.
- تحديد Variants عبر `class-variance-authority`.
- ضمان الوصولية (Radix UI).

### Technical Directives (How)
- Radix UI primitives + Tailwind + `cn()` utility.
- منع استيراد Icons غير موجودة من lucide-react (استبدالها ببدائل مؤكدة مثل `Filter`, `TrendingUp`).

### The Council’s Secret Sauce
- **قاعدة “UI primitives أولاً”:** قبل بناء dashboard/features، أنجز الـ primitives لتجنب أخطاء “module not found” التي واجهناها فعليًا.

---

## Phase 4: Routing, Layouts & RTL Guarantee (المسارات والتخطيطات وضمان RTL)
### Core Objective
بناء هيكل صفحات متين (عام + auth + dashboard) مع RTL عربي بدون انكسار.

### Checklist (What)
- Root [src/app/layout.tsx](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/layout.tsx:0:0-0:0) مضبوط.
- Route groups: `(auth)`, `(dashboard)`, `(legal)`.
- صفحات أساسية: `/`, [/about](cci:9://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/about:0:0-0:0), [/contact](cci:9://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/contact:0:0-0:0), `/services/*`, [/pricing](cci:9://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/pricing:0:0-0:0).
- توحيد `lang="ar" dir="rtl"`.

### Technical Directives (How)
- استخدم `metadata` بترميز صحيح (اقتباسات strings صحيحة).
- `next/font`: التحقق من subsets المدعومة للخط.  
  - **قرار فعلي:** Inter لا يدعم `arabic` subset → استخدم `latin` فقط، ودع العربية عبر system font/خط آخر لاحقًا.
- [globals.css](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/globals.css:0:0-0:0) يحتوي Tailwind directives.

### The Council’s Secret Sauce
- **مبدأ “لا تكتب RTL hacks في كل Component”:** ضع قواعد RTL الأساسية في [globals.css](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/app/globals.css:0:0-0:0) لتقليل تلوث الكود.

---

## Phase 5: Authentication Boundary (حدود المصادقة)
### Core Objective
إغلاق كل شيء حساس خلف Auth guard بصورة صحيحة (بدون تسريب).

### Checklist (What)
- ClerkProvider في Root Layout.
- صفحات sign-in/sign-up ضمن `(auth)`.
- حماية `(dashboard)` عبر [auth()](cci:1://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/jest.setup.js:47:2-50:4) + `redirect('/sign-in')`.

### Technical Directives (How)
- Server components لصفحات الحماية: استخدم [auth()](cci:1://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/jest.setup.js:47:2-50:4) في الـ page/layout server-side.
- أي component تفاعلي: `use client`.

### The Council’s Secret Sauce
- **قاعدة “Auth at layout boundary”:** حماية dashboard في `(dashboard)/layout.tsx` أفضل من حماية كل صفحة منفصلة.

---

## Phase 6: Data Model & Schema Authority (سلطة مخطط البيانات)
### Core Objective
إنشاء مصدر واحد للحقيقة للبيانات (Drizzle schema) لمنع drift.

### Checklist (What)
- تعريف جداول: users, subscriptions, projects, invoices, notifications, tickets (حسب احتياج المنتج).
- تحديد enums والمجالات.
- توحيد types مع TypeScript.

### Technical Directives (How)
- Drizzle ORM + Postgres.
- عند mismatch للأنواع: إصلاح منبع الخطأ (مثل `invoice.amount` كان مطلوب string → تحويل `amount.toString()` قبل insert).

### The Council’s Secret Sauce
- **قاعدة “الأنواع تُفرض من قاعدة البيانات”:** لا تحاول إجبار Drizzle على قبول نوع خاطئ. غيّر إدخال البيانات أو schema بشكل صريح.

---

## Phase 7: Domain Modules (وحدات المجال الأساسية)
### Core Objective
تجزئة النظام حسب المجال: Dashboard, Projects, Invoices, Tickets, Notifications.

### Checklist (What)
- Dashboard: overview + charts + widgets.
- Projects: list + filters + search.
- Invoices: list + filters + status + actions.
- Tickets: list + status/priority.
- Notifications: read/unread.

### Technical Directives (How)
- Components منظمة: `src/components/dashboard`, `projects`, `invoices`, `tickets`.
- استخدام Framer Motion للـ transitions فقط حيث تضيف قيمة.

### The Council’s Secret Sauce
- **“Interactive widgets = client components”**: حصر `useState` و`useEffect` داخل widgets، وترك الصفحات كـ server قدر الإمكان.

---

## Phase 8: API Layer Protocol (بروتوكول طبقة الـ API)
### Core Objective
بناء API Routes قوية: تحقق (validation) + أخطاء واضحة + صلاحيات.

### Checklist (What)
- Routes: `/api/projects`, `/api/invoices`, `/api/tickets`, `/api/notifications`.
- CRUD أساسي + filtering لاحقًا.
- سياسة أخطاء موحدة: 400/401/404/500.

### Technical Directives (How)
- Zod validation للـ payloads.
- [auth()](cci:1://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/jest.setup.js:47:2-50:4) للتحقق من المستخدم.
- لا تُرجع بيانات حساسة دون تحقق ملكية (ownership checks).

### The Council’s Secret Sauce
- **“No TODO in security paths”:** إذا تركت “TODO: admin check” يجب وضع Guard افتراضي (deny-by-default) في الإنتاج.

---

## Phase 9: Payments & Subscription Spine (عمود المدفوعات والاشتراكات)
### Core Objective
الاشتراكات ليست “ميزة”. هي “نظام مالي” يجب أن يكون مُحكمًا.

### Checklist (What)
- Stripe checkout session route.
- Stripe webhook route لتحديث subscription status.
- ربط userId في metadata.
- صفحة Pricing + CTA.

### Technical Directives (How)
- Webhooks: تحقق signature بـ `STRIPE_WEBHOOK_SECRET`.
- لا تعتمد على تواريخ ثابتة 30 يوم إلا كمؤقت؛ الأفضل الاعتماد على قيم Stripe `period_start/end`.
- منع hardcoding مفاتيح Stripe.

### The Council’s Secret Sauce
- **قاعدة “الاشتراك مصدره webhook وليس الواجهة”:** نجاح checkout لا يعني اشتراك فعّال حتى تصل webhook ويتم تحديث DB.

---

## Phase 10: Messaging & Email Discipline (انضباط البريد والإشعارات)
### Core Objective
نقل الرسائل (Email/Notifications) بأسلوب منضبط وقابل للتتبع.

### Checklist (What)
- Notifications API + mark-as-read + mark-all-read.
- Email templates بصياغة صحيحة.
- إصلاح CSS/email validity.

### Technical Directives (How)
- تجنب خصائص CSS غير مدعومة في البريد (قمنا فعليًا بتعديل `textSizeAdjust` وإزالة `height` غير صالح).
- Notifications: read/unread state + UI widget.

### The Council’s Secret Sauce
- **“Email rendering is hostile environment”:** كل تغيير في email template يجب أن يمر بفحص “HTML validity + CSS support list” قبل الدمج.

---

## Phase 11: Analytics & Observability (التحليلات والرصد)
### Core Objective
أي منصة بدون رصد = منصة عمياء. نريد قياس الأداء والأخطاء.

### Checklist (What)
- PostHog Provider يعمل كغلاف للتطبيق.
- Events: pageview + key actions (signup, subscribe, create project/invoice).

### Technical Directives (How)
- الالتزام باسم التصدير الصحيح: [PostHogProvider](cci:1://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/components/analytics/posthog-provider.tsx:14:0-16:1) (وليس `Analytics`).
- تهيئة PostHog من env vars.

### The Council’s Secret Sauce
- **قاعدة “Provider naming accuracy”:** خطأ اسم export كسر build فعليًا. أي provider يجب أن يراجع exports/imports فورًا.

---

## Phase 12: Automated Testing Stack (مكدس الاختبارات)
### Core Objective
تقليل الانحدار إلى “تكلفة ثابتة” عبر Jest + Cypress.

### Checklist (What)
- Jest config + setup.
- Cypress config + support files.
- إصلاح TypeScript في Cypress (تعريف types لـ `Cypress`, `cy`, `beforeEach`).

### Technical Directives (How)
- إضافة `cypress/**/*.ts` إلى `tsconfig.include`.
- إضافة type declarations في [cypress/types/index.d.ts](cci:7://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/cypress/types/index.d.ts:0:0-0:0).
- فصل E2E عن unit tests.

### The Council’s Secret Sauce
- **“Types first in test infra”:** أخطاء `Cannot find name 'cy'` تعطّل البناء/الـ IDE؛ حلّها مبكرًا يوفر ساعات.

---

## Phase 13: CI/CD & Release Governance (حوكمة النشر و CI/CD)
### Core Objective
أي تغيير يمر عبر بوابة جودة: lint + type-check + tests + build.

### Checklist (What)
- GitHub Actions pipeline: lint, test, build.
- Artifacts + optional E2E.
- Secrets management.

### Technical Directives (How)
- لا تنشر أسرار في المستودع.
- اجعل build يفشل عند type-check failure.
- تحديد Node version ثابت.

### The Council’s Secret Sauce
- **“CI is not decoration”:** أي إضافة dependency كبيرة (مثل AI SDK) تستلزم تحديث CI مباشرة، وإلا ستظهر أعطال متأخرة.

---

## Phase 14: Security Patch Protocol (بروتوكول الترقيعات الأمنية)
### Core Objective
إدارة الثغرات بقرارات واعية، وليس panic upgrades.

### Checklist (What)
- تشغيل `npm audit` دوريًا.
- معالجة الثغرات الحرجة فورًا (مثل Next.js critical).
- تمييز dev-only vulnerabilities (مثل esbuild dev server).

### Technical Directives (How)
- تحديثات محسوبة:
  - Next.js إلى إصدار آمن (قمنا بتحديثه).
  - تحديث حزم تسبب XSS (ai/jsondiffpatch/prismjs عبر @react-email).
- لا تستخدم `npm audit fix --force` تلقائيًا بدون مراجعة breaking changes.

### The Council’s Secret Sauce
- **“Severity-driven upgrades”:** Critical تُعالج فورًا. Moderate dev-only تُوثّق وتؤجل بقرار واضح إن لزم.

---

## Phase 15: Performance Budget & Runtime Hardening (ميزانية الأداء وتحصين التشغيل)
### Core Objective
تحقيق أداء فعلي: Core Web Vitals + زمن API + استقرار.

### Checklist (What)
- تحديد budgets: LCP/TTFB/JS bundle.
- caching strategy: CDN + Redis لاحقًا.
- تقليل client JS باستغلال RSC.

### Technical Directives (How)
- استخدام Server Components قدر الإمكان.
- تجنب تحميل مكتبات ثقيلة في صفحات عامة.
- فصل widgets التفاعلية كـ client فقط.

### The Council’s Secret Sauce
- **قاعدة “Fix build-breakers first”:** أخطاء مثل globals.css missing أو font subset أو import mismatch تقتل الأداء قبل أن تبدأ—تعالج أولًا.

---

## Phase 16: Evolution Path (مسار التطور من MVP إلى Enterprise)
### Core Objective
المشروع يجب أن “ينمو” بدون إعادة كتابة كاملة.

### Checklist (What)
- توثيق boundaries لاستخراج الخدمات لاحقًا (إن احتجنا).
- خطة ترحيل تدريجي: caching, queues, background jobs, search.
- تشغيل Incident Response مبكرًا (حتى لو مبسط).

### Technical Directives (How)
- الحفاظ على monolith modular: domains واضحة + API contracts واضحة.
- عند الحاجة: استخراج payment/notifications كخدمات منفصلة (بعد إثبات الحاجة بالأرقام).

### The Council’s Secret Sauce
- **“Hybrid by design”:** نبني monolith سريع لكن بمفاصل نظيفة تسمح بالانقسام لاحقًا بدون نزيف.

---

# Appendix: Non‑Negotiable Rules We Proven in Practice
- لا تستخدم Icons غير موجودة من `lucide-react` (استبدل فورًا ببديل موجود).
- أي مكون يستعمل hooks يجب أن يبدأ بـ `'use client'`.
- لا تفترض subsets للخطوط في `next/font` بدون تحقق.
- [PostHogProvider](cci:1://file:///c:/Users/acer/Downloads/watmedia-website%200/watmedia-platform/src/components/analytics/posthog-provider.tsx:14:0-16:1) هو export الصحيح (ليس `Analytics`) — راجع exports دائمًا.
- Drizzle types ليست “اقتراحًا” — أصلح data/types بدل تجاوزها.
- Cypress/TS: عرّف types لـ `Cypress`, `cy`, `beforeEach` لتجنب lint قاتل.
- Windows shell: أوامر Linux مثل `rm -rf` ستفشل — استخدم PowerShell equivalents.
- الثغرات: Critical تُعالج الآن؛ Moderate dev-only تُوثّق وتُدار بقرار.

---
