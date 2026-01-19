# دليل النشر

# DEPLOYMENT_GUIDE.md — دليل النشر الشامل (AR + EN)

## الهدف / Purpose
- **AR:** دليل خطوة بخطوة لنشر المشروع على منصات مختلفة
- **EN:** Step-by-step deployment guide for various platforms

---

## 1. Vercel Deployment / النشر على Vercel

### Prerequisites / المتطلبات
- حساب GitHub
- حساب Vercel
- المشروع مرفوع على GitHub

### خطوات النشر / Deployment Steps
1. **ربط المستودع:**
   - اذهب إلى vercel.com
   - اختر "Import Git Repository"
   - اختر مستودع المشروع

2. **إعداد المتغيرات:**
   - أضف جميع متغيرات البيئة من `.env.local`
   - تأكد من `NEXT_PUBLIC_APP_URL` يشير للدومين الجديد

3. **إعداد قاعدة البيانات:**
   ```bash
   npm run db:push
   ```

4. **النشر:**
   - Vercel سينشر تلقائياً عند push للـ main branch

---

## 2. Railway Deployment / النشر على Railway

### خطوات النشر
1. **إنشاء مشروع:**
   - اذهب إلى railway.app
   - اختر "Deploy from GitHub repo"

2. **إعداد المتغيرات:**
   - أضف متغيرات البيئة في Railway dashboard
   - أضف `PORT=3000`

3. **إعداد قاعدة البيانات:**
   - أضف PostgreSQL service
   - ربط DATABASE_URL

---

## 3. Docker Deployment / النشر باستخدام Docker

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

---

## 4. Environment Variables Checklist / قائمة متغيرات البيئة

### Production Ready / جاهز للإنتاج
- [ ] `DATABASE_URL` (production database)
- [ ] `NEXT_PUBLIC_APP_URL` (production domain)
- [ ] `CLERK_SECRET_KEY` (production keys)
- [ ] `STRIPE_SECRET_KEY` (production keys)
- [ ] `STRIPE_WEBHOOK_SECRET` (production webhook)
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_POSTHOG_KEY`

---

## 5. Post-Deployment Checklist / قائمة ما بعد النشر

### Smoke Tests / اختبارات سريعة
- [ ] الصفحة الرئيسية تحمل
- [ ] تسجيل الدخول يعمل
- [ ] Dashboard محمي بشكل صحيح
- [ ] Stripe checkout يعمل
- [ ] Webhooks تصل بنجاح

### Monitoring / المراقبة
- [ ] إعداد alerts للأخطاء
- [ ] مراقبة performance metrics
- [ ] تتبع user analytics

---

## 6. Rollback Plan / خطة التراجع

### في حالة فشل النشر
1. **Vercel:** استخدم "Rollback" في dashboard
2. **Railway:** اختر deployment سابق
3. **Docker:** استخدم image tag سابق

### Database Migrations
- احتفظ بنسخة احتياطية قبل migration
- اختبر migrations في staging أولاً

