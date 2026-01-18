# 🧠 BRAIN TRACK: PHASE 4 - INTEGRATION (Levels 31-40)
> **الحالة:** ❌ ~10% مكتمل

---

## Level 31: Smart Contact Form ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, TypeScript).

المطلوب: نموذج تواصل ذكي مع Validation متقدم.

1. تثبيت: npm install react-hook-form @hookform/resolvers zod

2. أنشئ src/lib/validations/contact.ts:

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'الاسم قصير جداً'),
  email: z.string().email('بريد إلكتروني غير صالح'),
  phone: z.string().regex(/^05\d{8}$/, 'رقم جوال سعودي غير صالح'),
  service: z.enum(['web', 'marketing', 'design', 'other']),
  budget: z.enum(['<5k', '5k-15k', '15k-50k', '>50k']),
  message: z.string().min(10, 'الرسالة قصيرة جداً'),
});

3. أنشئ src/components/forms/SmartContactForm.tsx:
   - استخدم react-hook-form + zodResolver
   - Inline validation مع رسائل خطأ عربية
   - Progress indicator (الخطوة 1/3)
   - Submit animation

4. أنشئ API Route: src/app/api/contact/route.ts
   - التحقق من البيانات server-side
   - إرسال email بـ Resend
   - حفظ في قاعدة البيانات

5. استبدل النموذج الحالي في /contact بهذا.
```

---

## Level 32: WhatsApp Integration ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: زر WhatsApp عائم مع رسالة تلقائية.

1. أنشئ src/components/layout/WhatsAppFloat.tsx:

"use client";
import { MessageCircle } from 'lucide-react';

const PHONE = '966500000000'; // رقم الواتساب
const DEFAULT_MESSAGE = 'مرحباً، أريد الاستفسار عن خدماتكم';

export function WhatsAppFloat() {
  const handleClick = () => {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, '_blank');
    // Track event
    if (window.gtag) gtag('event', 'whatsapp_click');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 
                 bg-green-500 hover:bg-green-600 
                 text-white p-4 rounded-full 
                 shadow-lg hover:shadow-xl 
                 transition-all duration-300 
                 hover:scale-110 animate-bounce"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}

2. أضفه في layout.tsx بجانب الـ floating elements الأخرى.

3. أضف Context-aware messaging:
   - في صفحة Services: "أريد الاستفسار عن خدمة [اسم الخدمة]"
   - في صفحة Portfolio: "أريد مشروع مشابه لـ [اسم المشروع]"
```

---

## Level 33: Calendar Booking ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: دمج نظام حجز مواعيد.

الخيار 1: Cal.com (مجاني)
1. أنشئ حساب على cal.com
2. أنشئ src/components/booking/CalEmbed.tsx:

"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#D4AF37" } },
      });
    })();
  }, []);

  return (
    <Cal
      calLink="your-username/consultation"
      style={{ width: "100%", height: "600px" }}
    />
  );
}

3. أضف صفحة /book مع هذا المكون.

الخيار 2: Calendly
- استخدم Calendly inline widget بنفس الطريقة.
```

---

## Level 34: Invoice Generator ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

الحالة: موجود جزئياً في src/components/invoice/

المطلوب: إكمال نظام الفواتير:

1. راجع InvoiceTemplate.tsx الموجود

2. أضف src/app/api/invoice/generate/route.ts:
   - يستقبل بيانات الفاتورة
   - يستخدم @react-pdf/renderer لإنشاء PDF
   - يعيد الملف للتحميل

3. أضف في Dashboard:
   - قائمة الفواتير
   - زر إنشاء فاتورة جديدة
   - تحميل PDF

4. أضف حقول:
   - رقم الفاتورة (تلقائي)
   - ضريبة القيمة المضافة 15%
   - QR Code للفاتورة الإلكترونية
```

---

## Level 35: Payment Gateway ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: دمج Stripe للدفع.

1. تثبيت: npm install stripe @stripe/stripe-js

2. أنشئ src/lib/stripe.ts:

import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

3. أنشئ src/app/api/checkout/route.ts:

export async function POST(req: Request) {
  const { amount, serviceName } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'sar',
        product_data: { name: serviceName },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });
  
  return Response.json({ url: session.url });
}

4. أنشئ زر Pay في صفحة الخدمات.

ملاحظة: تحتاج STRIPE_SECRET_KEY و STRIPE_PUBLISHABLE_KEY.
```

---

## Level 36: Email Automation ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: نظام إرسال بريد تلقائي.

1. تثبيت: npm install resend @react-email/components

2. أنشئ src/emails/WelcomeEmail.tsx:

import { Html, Body, Container, Heading, Text } from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Arial', direction: 'rtl' }}>
        <Container>
          <Heading>مرحباً {name}!</Heading>
          <Text>شكراً لتواصلك مع WATMEDIA. سنرد عليك خلال 24 ساعة.</Text>
        </Container>
      </Body>
    </Html>
  );
}

3. أنشئ src/lib/email.ts:

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'WATMEDIA <hello@watmedia.sa>',
    to,
    subject: 'شكراً لتواصلك معنا',
    react: WelcomeEmail({ name }),
  });
}

4. استخدمه بعد submit في Contact Form.

ملاحظة: تحتاج RESEND_API_KEY ودومين موثق.
```

---

## Level 37: CRM Connection ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: ربط مع HubSpot CRM.

أنشئ src/lib/crm/hubspot.ts:

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

export async function createContact(data: {
  email: string;
  name: string;
  phone: string;
  source: string;
}) {
  const response = await fetch(
    'https://api.hubapi.com/crm/v3/objects/contacts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.name,
          phone: data.phone,
          hs_lead_status: 'NEW',
          lead_source: data.source,
        },
      }),
    }
  );
  return response.json();
}

استخدمه بعد submit في Contact Form لإنشاء Lead تلقائياً.
```

---

## Level 38: Social Proof API ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Drizzle).

المطلوب: نظام لعرض شهادات العملاء من قاعدة البيانات.

1. أنشئ schema في src/db/schema.ts:

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  clientName: varchar('client_name', { length: 100 }),
  clientTitle: varchar('client_title', { length: 100 }),
  clientImage: varchar('client_image', { length: 255 }),
  content: text('content'),
  rating: integer('rating'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

2. أنشئ API: src/app/api/testimonials/route.ts
   - GET: جلب الشهادات المميزة

3. أنشئ component: TestimonialCarousel.tsx
   - يجلب من API
   - عرض carousel متحرك
```

---

## Level 39: Uptime Monitor ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: عرض حالة النظام.

1. سجل في BetterStack (betterstack.com)
2. أضف شارة Status في Footer

3. أنشئ صفحة /status:
   - عرض حالة الخدمات
   - API endpoint
   - Database
   - Third-party services

4. أو استخدم openstatus.dev كبديل مجاني.
```

---

## Level 40: Error Tracking ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

الحالة: Sentry موجود جزئياً.

المطلوب: إكمال الإعداد:

1. تأكد من وجود sentry.client.config.ts و sentry.server.config.ts

2. أضف Custom Error Boundary:
   src/components/errors/SentryErrorBoundary.tsx

3. أضف User Context:
   Sentry.setUser({ email: user.email });

4. أضف Custom Tags:
   Sentry.setTag('page', pathname);

5. اختبر بإرسال error تجريبي.
```

---

## ✅ ملخص المرحلة 4
| المكتمل | المتبقي |
|:---:|:---:|
| 0.5/10 | 9.5/10 |
