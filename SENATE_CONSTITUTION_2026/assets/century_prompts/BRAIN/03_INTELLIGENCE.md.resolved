# 🧠 BRAIN TRACK: PHASE 3 - INTELLIGENCE (Levels 21-30)
> **الحالة:** ❌ ~20% مكتمل

---

## Level 21: Returning User Detection ✅
> **Status:** DONE - useWelcomeBack hook implemented.

---

## Level 22: Personalized Content ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript).

المطلوب: نظام Personalization بسيط يتتبع اهتمامات الزائر.

1. أنشئ src/lib/personalization/user-profile.ts:

interface UserProfile {
  interests: string[];
  visitCount: number;
  lastVisitedPages: string[];
  preferredLanguage: 'ar' | 'en';
}

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return defaultProfile;
  const stored = localStorage.getItem('wat_user_profile');
  return stored ? JSON.parse(stored) : defaultProfile;
}

export function trackPageVisit(page: string) {
  const profile = getUserProfile();
  profile.visitCount++;
  profile.lastVisitedPages = [page, ...profile.lastVisitedPages.slice(0, 4)];
  localStorage.setItem('wat_user_profile', JSON.stringify(profile));
}

2. أنشئ hook: src/hooks/usePersonalization.ts
   - يستخدم الـ profile
   - يعيد content variants بناءً على الاهتمامات

3. استخدمه في Hero Section لتغيير النص بناءً على الزيارات.
```

---

## Level 23: Intent Tracking ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript).

المطلوب: نظام Intent Detection يقيس نية المستخدم.

أنشئ src/hooks/useIntentMetrics.ts:

"use client";
import { useEffect, useRef, useState } from 'react';

interface IntentMetrics {
  scrollVelocity: number;      // سرعة التمرير
  mouseVelocity: number;       // سرعة الماوس
  dwellTime: number;           // وقت البقاء بالثواني
  engagementScore: 'low' | 'medium' | 'high';
}

export function useIntentMetrics(): IntentMetrics {
  // Track scroll velocity
  // Track mouse movement speed
  // Track time on page
  // Calculate engagement score

  // Low = Fast scrolling, low dwell
  // Medium = Normal behavior
  // High = Slow scrolling, long dwell, mouse hovering on CTAs
}

استخدم هذا لتغيير CTA dynamically:
- Low engagement: "استكشف المزيد" (Soft)
- High engagement: "ابدأ الآن" (Direct)
```

---

## Level 24: Predictive UI ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript).

المطلوب: نظام يتنبأ بالإجراء التالي للمستخدم.

أنشئ src/lib/intelligence/predictor.ts:

// Based on current page and user history, predict next action
export function predictNextAction(
  currentPage: string,
  userProfile: UserProfile
): { page: string; probability: number } {
  const patterns = {
    '/': { next: '/services', probability: 0.6 },
    '/services': { next: '/contact', probability: 0.4 },
    '/portfolio': { next: '/services', probability: 0.5 },
  };
  
  // Cross with user history to improve prediction
  return patterns[currentPage] || { page: '/contact', probability: 0.3 };
}

استخدم هذا لـ:
1. Prefetch الصفحة المتوقعة
2. إظهار "Suggested Next Step" subtle hint
```

---

## Level 25: AI Chat Assistant ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript).

المطلوب: دمج Vercel AI SDK لإنشاء مساعد ذكي.

الخطوات:
1. تثبيت: npm install ai openai

2. أنشئ src/app/api/chat/route.ts:

import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      { role: 'system', content: 'أنت مساعد WATMEDIA. ساعد العملاء في فهم خدماتنا.' },
      ...messages,
    ],
  });
  
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

3. أنشئ src/components/chat/ChatWidget.tsx:
   - زر عائم في الزاوية
   - نافذة chat مع streaming response
   - تصميم glassmorphism

ملاحظة: تحتاج OPENAI_API_KEY في .env.local
```

---

## Level 26: RAG Knowledge Base ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: نظام RAG (Retrieval-Augmented Generation) لقاعدة معرفية.

الخطوات:
1. أنشئ src/lib/knowledge/embeddings.ts:
   - دالة لتحويل النصوص إلى embeddings
   - استخدم OpenAI text-embedding-3-small

2. أنشئ src/lib/knowledge/vector-store.ts:
   - تخزين بسيط في Neon pgvector
   - أو استخدام @upstash/vector

3. أنشئ محتوى قاعدة المعرفة:
   - معلومات عن WATMEDIA
   - الخدمات والأسعار
   - الأسئلة الشائعة

4. عدل Chat API لتبحث في المعرفة قبل الرد.

هذا يجعل المساعد يجيب بدقة عن أسئلة خاصة بالشركة.
```

---

## Level 27: Smart Search ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: نظام بحث ذكي مع Fuzzy Matching.

1. تثبيت: npm install fuse.js

2. أنشئ src/lib/search/search-index.ts:
   - فهرسة كل المحتوى (الخدمات، المشاريع، الصفحات)

3. أنشئ src/components/search/SearchModal.tsx:
   - يفتح بـ CMD+K (موجود جزئياً)
   - نتائج فورية أثناء الكتابة
   - تصنيف النتائج (خدمات/مشاريع/صفحات)

4. دمج مع Command Palette الموجود.
```

---

## Level 28: User Journey Memory ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: تتبع رحلة المستخدم الكاملة.

أنشئ src/lib/analytics/journey-tracker.ts:

interface JourneyEvent {
  timestamp: number;
  type: 'page_view' | 'click' | 'scroll' | 'form_start' | 'form_submit';
  data: Record<string, unknown>;
}

class JourneyTracker {
  private events: JourneyEvent[] = [];
  
  track(type: JourneyEvent['type'], data: Record<string, unknown>) {
    this.events.push({ timestamp: Date.now(), type, data });
    this.persist();
  }
  
  getJourney() { return this.events; }
  
  private persist() {
    sessionStorage.setItem('wat_journey', JSON.stringify(this.events));
  }
}

استخدمه لفهم مسار المستخدم قبل التواصل.
```

---

## Level 29: A/B Testing ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Vercel).

المطلوب: نظام A/B Testing بسيط.

1. أنشئ src/lib/experiments/ab-test.ts:

export function getVariant(experimentId: string): 'A' | 'B' {
  const stored = localStorage.getItem(`exp_${experimentId}`);
  if (stored) return stored as 'A' | 'B';
  
  const variant = Math.random() > 0.5 ? 'A' : 'B';
  localStorage.setItem(`exp_${experimentId}`, variant);
  return variant;
}

2. أنشئ component: ABTest.tsx
   <ABTest experiment="hero_cta">
     <VariantA><Button>ابدأ الآن</Button></VariantA>
     <VariantB><Button>احصل على استشارة</Button></VariantB>
   </ABTest>

3. سجل النتائج في Analytics.
```

---

## Level 30: Analytics Dashboard ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Vercel Analytics).

المطلوب: لوحة تحكم Analytics مخصصة في Dashboard.

1. عدل src/app/(dashboard)/dashboard/analytics/page.tsx:
   - استخدم @vercel/analytics API
   - اعرض: Page Views, Unique Visitors, Top Pages
   - رسوم بيانية بـ recharts

2. أضف Custom Events tracking:
   - form_submission
   - cta_click
   - whatsapp_click

3. اعرض البيانات بتصميم Supreme مع glassmorphism.
```

---

## ✅ ملخص المرحلة 3
| المكتمل | المتبقي |
|:---:|:---:|
| 1/10 | 9/10 |
