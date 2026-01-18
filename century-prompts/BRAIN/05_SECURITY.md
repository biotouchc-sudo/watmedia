# 🧠 BRAIN TRACK: PHASE 5 - SECURITY (Levels 41-50)
> **الحالة:** ❌ ~5% مكتمل

---

## Level 41: CSRF Protection ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: حماية CSRF للنماذج.

1. أنشئ src/lib/security/csrf.ts:

import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  cookies().set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return token;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const storedToken = cookies().get('csrf_token')?.value;
  return token === storedToken;
}

2. أضف CSRF token كـ hidden field في كل Form.

3. تحقق منه في API routes.
```

---

## Level 42: Rate Limiting ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: Rate Limiting للـ API.

1. تثبيت: npm install @upstash/ratelimit @upstash/redis

2. أنشئ src/lib/security/rate-limit.ts:

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per minute
  analytics: true,
});

3. استخدمه في API routes:

const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
const { success } = await ratelimit.limit(ip);
if (!success) {
  return new Response('Too Many Requests', { status: 429 });
}

ملاحظة: تحتاج Upstash Redis credentials.
```

---

## Level 43: GDPR Consent ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: بانر موافقة GDPR/ملفات تعريف الارتباط.

أنشئ src/components/layout/CookieConsent.tsx:

"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
    // Initialize analytics
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShow(false);
    // Disable analytics
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-black/90 backdrop-blur border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center md:text-right">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك.
          <a href="/privacy" className="text-[var(--wat-primary)] underline mr-2">
            سياسة الخصوصية
          </a>
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={decline}>رفض</Button>
          <Button variant="default" size="sm" onClick={accept}>موافق</Button>
        </div>
      </div>
    </div>
  );
}

أضفه في layout.tsx.
```

---

## Level 44: Privacy Policy ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: صفحة سياسة الخصوصية.

أنشئ src/app/privacy/page.tsx:

export const metadata = {
  title: 'سياسة الخصوصية',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8">سياسة الخصوصية</h1>
      
      <section className="prose prose-invert max-w-none">
        <h2>جمع البيانات</h2>
        <p>نجمع المعلومات التالية...</p>
        
        <h2>استخدام البيانات</h2>
        <p>نستخدم بياناتك لـ...</p>
        
        <h2>مشاركة البيانات</h2>
        <p>لا نشارك بياناتك مع أطراف ثالثة إلا...</p>
        
        <h2>حقوقك</h2>
        <p>يحق لك طلب حذف بياناتك...</p>
        
        <h2>التواصل</h2>
        <p>للاستفسارات: privacy@watmedia.sa</p>
      </section>
    </div>
  );
}

أضف رابط في Footer.
```

---

## Level 45: Terms of Service ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: صفحة شروط الاستخدام.

أنشئ src/app/terms/page.tsx بنفس بنية Privacy Page.

المحتوى:
- شروط استخدام الموقع
- حقوق الملكية الفكرية
- إخلاء المسؤولية
- القانون المعمول به (المملكة العربية السعودية)
- معلومات الاتصال

أضف رابط في Footer.
```

---

## Level 46: Security Headers ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: إضافة Security Headers.

عدل next.config.ts:

async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;",
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ];
}

اختبر بـ: https://securityheaders.com
```

---

## Level 47: Input Sanitization ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: تنظيف المدخلات من XSS.

1. تثبيت: npm install isomorphic-dompurify

2. أنشئ src/lib/security/sanitize.ts:

import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: [],
  });
}

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}

3. استخدمه في كل API route يستقبل input من المستخدم.
```

---

## Level 48: Audit Logging ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Drizzle).

المطلوب: نظام سجل للعمليات الحساسة.

1. أنشئ schema:

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 100 }),
  action: varchar('action', { length: 50 }),
  resource: varchar('resource', { length: 100 }),
  details: json('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

2. أنشئ src/lib/security/audit.ts:

export async function logAction(data: {
  userId: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  resource: string;
  details?: Record<string, unknown>;
  request: Request;
}) {
  await db.insert(auditLogs).values({
    ...data,
    ipAddress: data.request.headers.get('x-forwarded-for'),
    userAgent: data.request.headers.get('user-agent'),
  });
}

3. استخدمه في العمليات الحساسة (login, form submit, etc).
```

---

## Level 49: Backup Strategy ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Neon).

المطلوب: استراتيجية النسخ الاحتياطي.

Neon يوفر:
1. Point-in-Time Recovery (PITR) - تلقائي
2. Branching - للتجربة بدون تأثير على الإنتاج

الإجراءات:
1. تفعيل PITR في Neon Dashboard
2. توثيق إجراء الاستعادة
3. إنشاء branch للتجربة قبل أي migration

أنشئ src/docs/BACKUP_PROCEDURE.md يوثق:
- كيفية إنشاء backup
- كيفية الاستعادة
- جدول النسخ الاحتياطي
```

---

## Level 50: Penetration Test ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: اختبار اختراق أساسي.

1. استخدم OWASP ZAP (مجاني):
   - حمّل من https://www.zaproxy.org
   - اختبر الموقع

2. اختبر يدوياً:
   - SQL Injection في النماذج
   - XSS في حقول الإدخال
   - CSRF attacks
   - Authentication bypass

3. أنشئ تقرير بالنتائج والإصلاحات.

4. اختبر Security Headers:
   https://securityheaders.com

5. اختبر SSL:
   https://www.ssllabs.com/ssltest/
```

---

## ✅ ملخص المرحلة 5
| المكتمل | المتبقي |
|:---:|:---:|
| 0/10 | 10/10 |
