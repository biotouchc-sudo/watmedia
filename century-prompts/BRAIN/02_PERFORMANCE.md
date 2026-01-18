# 🧠 BRAIN TRACK: PHASE 2 - PERFORMANCE (Levels 11-20)
> **الحالة:** ⚠️ ~60% مكتمل

---

## Level 11: Image Optimization ✅
> **Status:** DONE - next/image used.

---

## Level 12: Font Optimization ✅
> **Status:** DONE - next/font configured.

---

## Level 13: Code Splitting ✅
> **Status:** DONE - Dynamic imports used.

---

## Level 14: Skeleton Loading ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript, Tailwind CSS v4).

المطلوب: إنشاء نظام Skeleton Loading متكامل.

الملفات المطلوبة:
1. src/components/ui/skeleton.tsx

المكون:
- Skeleton component مع Props: width, height, className, variant (text/circle/rect)
- استخدم Tailwind: animate-pulse, bg-gray-800/50, rounded

2. أنشئ SkeletonCard في src/components/skeletons/SkeletonCard.tsx
   - يحاكي شكل الـ Card الموجود
   - 3 أسطر skeleton للنص
   - دائرة للـ Avatar
   - مستطيل للصورة

3. استخدمه في src/app/(dashboard)/loading.tsx

لا تكسر الكود الموجود. استخدم CSS Variables من globals.css.
```

---

## Level 15: ISR/SSG Strategy ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, App Router).

المطلوب: تطبيق استراتيجية ISR (Incremental Static Regeneration).

التغييرات:
1. في src/app/portfolio/page.tsx:
   - أضف: export const revalidate = 3600 // كل ساعة

2. في src/app/services/page.tsx:
   - أضف: export const revalidate = 86400 // كل يوم

3. في src/app/about/page.tsx:
   - أضف: export const dynamic = 'force-static'

4. في src/app/(dashboard)/dashboard/page.tsx:
   - أضف: export const dynamic = 'force-dynamic' // بيانات حية

هذا يحسن الأداء دون كسر الوظائف.
```

---

## Level 16: Bundle Analysis ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: إعداد Bundle Analyzer.

الخطوات:
1. أضف للـ package.json في scripts:
   "analyze": "ANALYZE=true next build"

2. أنشئ/عدل next.config.ts:

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);

ملاحظة: المكتبة @next/bundle-analyzer يجب تثبيتها أولاً.
الأمر: npm install @next/bundle-analyzer --save-dev
```

---

## Level 17: Caching Headers ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: إعداد Cache Headers للـ Static Assets.

في next.config.ts، أضف:

async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}

لا تحذف الإعدادات الموجودة، أضف هذا بجانبها.
```

---

## Level 18: Service Worker ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: إعداد PWA مع Service Worker.

الخطوات:
1. تثبيت: npm install next-pwa

2. عدل next.config.ts:

import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);

3. أنشئ public/manifest.json:
{
  "name": "WATMEDIA",
  "short_name": "WAT",
  "theme_color": "#D4AF37",
  "background_color": "#0A0A0A",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

4. أضف في layout.tsx metadata:
manifest: '/manifest.json',
```

---

## Level 19: Prefetching ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: تحسين استراتيجية Prefetching.

1. في Header.tsx، تأكد أن جميع الـ Links تستخدم:
   <Link href="/path" prefetch={true}>

2. للروابط الأقل أهمية (Footer):
   <Link href="/path" prefetch={false}>

3. أنشئ hook للـ Hover Prefetch:
   src/hooks/useHoverPrefetch.ts

   "use client";
   import { useRouter } from 'next/navigation';
   import { useCallback } from 'react';

   export function useHoverPrefetch(href: string) {
     const router = useRouter();
     const prefetch = useCallback(() => {
       router.prefetch(href);
     }, [href, router]);
     return { onMouseEnter: prefetch };
   }
```

---

## Level 20: Core Web Vitals ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: الوصول لـ Lighthouse 100/100.

الخطوات:
1. راجع كل الصور وتأكد من:
   - استخدام next/image
   - وجود width و height
   - priority للصور فوق الـ Fold

2. تأكد من عدم وجود Layout Shift:
   - كل العناصر لها أبعاد ثابتة
   - Fonts لها fallback

3. أضف في layout.tsx:
   <link rel="preconnect" href="https://fonts.googleapis.com" />

4. اختبر بـ:
   npx lighthouse http://localhost:3000 --view

أعطني تقرير بالمشاكل وحلولها.
```

---

## ✅ ملخص المرحلة 2
| المكتمل | المتبقي |
|:---:|:---:|
| 4/10 | 6/10 |
