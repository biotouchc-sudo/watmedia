# نقاط الكسر المعروفة

# KNOWN_BREAKPOINTS.md — نقاط الكسر المعروفة (من تجربة واقعية)

## الهدف / Purpose
- **AR:** قائمة بالأخطاء التي واجهناها فعلياً أثناء بناء WATMEDIA لمنع تكرارها
- **EN:** Real incidents we encountered while building WATMEDIA to prevent recurrence

---

## 1. Font & Typography Issues / مشاكل الخطوط
### Inter Font Subset Error
- **المشكلة:** `next/font` error: Unknown subset 'arabic' for font 'Inter'
- **الحل:** استخدم `subsets: ['latin']` فقط مع Inter
- **الوقاية:** تحقق من subsets المدعومة قبل الاستخدام

---

## 2. Provider Export Mismatches / أخطاء تصدير المزودين
### PostHog Provider
- **المشكلة:** `Module has no exported member 'Analytics'`
- **الحل:** استخدم `PostHogProvider` وليس `Analytics`
- **الوقاية:** تحقق من أسماء exports الفعلية في الملف

---

## 3. AI SDK Breaking Changes / تغييرات AI SDK
### Import Path Change
- **المشكلة:** `Module not found: Package path ./react is not exported`
- **الحل:** 
  - تثبيت: `npm install @ai-sdk/react`
  - تغيير: `import { useChat } from '@ai-sdk/react'`
- **الوقاية:** راجع changelog عند ترقية major versions

---

## 4. Database Type Mismatches / عدم تطابق أنواع قاعدة البيانات
### Drizzle Amount Field
- **المشكلة:** `Type 'number' is not assignable to type 'string'`
- **الحل:** تحويل `amount.toString()` قبل insert
- **الوقاية:** راجع schema types مع payload types

---

## 5. Windows PowerShell Commands / أوامر PowerShell
### Cache Cleanup
- **المشكلة:** `rm -rf .next` لا يعمل في PowerShell
- **الحل:** `Remove-Item -Recurse -Force .next`
- **الوقاية:** استخدم أوامر متوافقة مع PowerShell

---

## 6. Missing Files / ملفات ناقصة
### globals.css Missing
- **المشكلة:** `Module not found: Can't resolve './globals.css'`
- **الحل:** إنشاء `src/app/globals.css` مع Tailwind directives
- **الوقاية:** تأكد من وجود جميع الملفات المطلوبة

---

## 7. Cypress TypeScript Issues / مشاكل TypeScript في Cypress
### Missing Type Declarations
- **المشكلة:** `Cannot find name 'cy'`, `Cannot find name 'Cypress'`
- **الحل:** 
  - إضافة `cypress/**/*.ts` إلى `tsconfig.json`
  - إنشاء `cypress/types/index.d.ts`
- **الوقاية:** إعداد types للأدوات الخارجية مبكراً

---

## Quick Fix Checklist / قائمة إصلاح سريعة
عند مواجهة build errors:
1. ✅ تحقق من `globals.css` موجود ومستورد
2. ✅ تحقق من font subsets صحيحة
3. ✅ تحقق من أسماء exports/imports
4. ✅ تحقق من dependency versions متوافقة
5. ✅ تحقق من PowerShell commands صحيحة
6. ✅ تحقق من TypeScript types للأدوات الخارجية

