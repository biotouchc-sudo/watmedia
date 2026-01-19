# دليل حل المشاكل

# TROUBLESHOOTING.md — دليل حل المشاكل (AR + EN)

## الهدف / Purpose
- **AR:** حلول سريعة للمشاكل الشائعة التي قد تواجهها أثناء التطوير والنشر
- **EN:** Quick solutions for common issues during development and deployment

---

## 1. Build Errors / أخطاء البناء

### Error: Cannot resolve './globals.css'
**الحل:**
```bash
# تأكد من وجود الملف
ls src/app/globals.css

# إذا لم يكن موجود، أنشئه
touch src/app/globals.css
```

### Error: Unknown subset 'arabic' for font 'Inter'
**الحل:**
```typescript
// في src/app/layout.tsx
const inter = Inter({ subsets: ['latin'] }); // أزل 'arabic'
```

### Error: Module has no exported member 'Analytics'
**الحل:**
```typescript
// غيّر من
import { Analytics } from '@/components/analytics/posthog-provider';

// إلى
import { PostHogProvider } from '@/components/analytics/posthog-provider';
```

---

## 2. Development Server Issues / مشاكل خادم التطوير

### Error: Port 3000 already in use
**الحل:**
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# أو استخدم port مختلف
npm run dev -- -p 3001
```

### Error: ENOENT .next directory
**الحل:**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

---

## 3. Database Issues / مشاكل قاعدة البيانات

### Error: Connection refused
**تحقق من:**
- DATABASE_URL صحيح
- قاعدة البيانات تعمل
- Network connectivity

**الحل:**
```bash
# اختبر الاتصال
npm run db:studio

# أعد push للـ schema
npm run db:push
```

### Error: Type mismatch in Drizzle
**الحل:**
```typescript
// تأكد من تطابق الأنواع
const invoice = await db.insert(invoices).values({
  ...validatedData,
  amount: validatedData.amount.toString(), // تحويل number إلى string
  userId,
});
```

---

## 4. Authentication Issues / مشاكل المصادقة

### Clerk redirect loops
**تحقق من:**
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- Redirect URLs في Clerk dashboard

### Protected routes not working
**الحل:**
```typescript
// في (dashboard)/layout.tsx
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
```

---

## 5. Payment Issues / مشاكل المدفوعات

### Stripe webhook not receiving events
**تحقق من:**
- STRIPE_WEBHOOK_SECRET صحيح
- Webhook URL في Stripe dashboard
- Signature verification في الكود

**الحل:**
```typescript
// في api/stripe/webhook/route.ts
const sig = headers().get('stripe-signature');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

try {
  const event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  // معالجة الحدث
} catch (err) {
  console.error('Webhook signature verification failed:', err);
  return new Response('Webhook Error', { status: 400 });
}
```

---

## 6. TypeScript Errors / أخطاء TypeScript

### Cannot find name 'cy' (Cypress)
**الحل:**
```json
// في tsconfig.json
{
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "cypress/**/*.ts"
  ]
}
```

```typescript
// أنشئ cypress/types/index.d.ts
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>
    // أضف custom commands هنا
  }
}
```

---

## 7. Performance Issues / مشاكل الأداء

### Slow page loads
**تحقق من:**
- Bundle size: `npm run build`
- Server Components vs Client Components
- Database query optimization

### High memory usage
**الحل:**
- استخدم React.memo للمكونات الثقيلة
- تحسين database queries
- إضافة caching layer

---

## 8. Deployment Issues / مشاكل النشر

### Vercel build fails
**تحقق من:**
- Environment variables مضبوطة
- Build commands صحيحة
- Dependencies مثبتة

### Database migrations fail
**الحل:**
```bash
# تشغيل migrations يدوياً
npm run db:migrate

# أو إعادة push للـ schema
npm run db:push
```

---

## Quick Debug Commands / أوامر تشخيص سريعة

```bash
# فحص صحة المشروع
npm run lint
npm run type-check
npm run build

# فحص قاعدة البيانات
npm run db:studio

# فحص الأمان
npm audit

# تنظيف الكاش
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
```

