# 👁️ BEAUTY TRACK: PHASE 2 - MOTION (Levels 11-20)
> **الحالة:** ⚠️ ~50% مكتمل

---

## Level 11: Smooth Scroll ✅
> **Status:** DONE - Lenis integrated.

---

## Level 12: Fade Animations ✅
> **Status:** DONE - .animate-fade-in CSS classes.

---

## Level 13: Hover Effects ✅
> **Status:** DONE - Tailwind hover states.

---

## Level 14: Page Transitions ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: انتقالات سلسة بين الصفحات (Page Transitions).

1. أنشئ src/components/layout/PageTransition.tsx:

"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

2. استخدمه في layout.tsx (لف الـ children).
```

---

## Level 15: Stagger Animations ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Framer Motion).

المطلوب: تحسين القوائم بـ Stagger Effects.

1. أنشئ مكون عام src/components/ui/StaggerContainer.tsx:

"use client";
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const StaggerContainer = ({ children }) => (
  <motion.div variants={container} initial="hidden" whileInView="show">
    {children}
  </motion.div>
);

export const StaggerItem = ({ children }) => (
  <motion.div variants={item}>{children}</motion.div>
);

2. استخدمه في grid الخدمات والمشاريع بدلاً من الـ CSS delay اليدوي.
```

---

## Level 16: Scroll Reveal ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Framer Motion).

المطلوب: ظهور العناصر عند التمرير (Scroll Reveal).

أنشئ src/components/ui/Reveal.tsx:

"use client";
import { motion } from 'framer-motion';

export function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

استخدمه للف العناوين والصور الكبيرة في صفحة Home.
```

---

## Level 17: Parallax Depth ⚠️
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Framer Motion).

المطلوب: تأثير Parallax حقيقي عند التمرير.

أنشئ src/components/ui/Parallax.tsx:

"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Parallax({ children, offset = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

استخدمه للخلفيات والصور في صفحة About و Services.
```

---

## Level 18: Magnetic Buttons ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16, Framer Motion).

المطلوب: أزرار مغناطيسية تنجذب للماوس.

أنشئ src/components/ui/MagneticButton.tsx:

"use client";
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export function MagneticButton({ children, className }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}

استبدل الأزرار الرئيسية في Hero Section بهذا المكون.
```

---

## Level 19: Cursor Effects ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: مؤشر ماوس مخصص (Custom Cursor).

أنشئ src/components/ui/CustomCursor.tsx:

"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-[var(--wat-primary)] rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}

أضفه في layout.tsx وأخفِ المؤشر الأصلي بـ CSS إذا لزم الأمر.
```

---

## Level 20: View Transitions ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: استخدام View Transitions API للعمليات المعقدة.

في next.config.ts:
experimental: {
  viewTransition: true
}

في global.css:
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
}

استخدم document.startViewTransition عند تغيير الـ Theme أو التبديل بين Tabs في Dashboard.
```

---

## ✅ ملخص المرحلة 2
| المكتمل | المتبقي |
|:---:|:---:|
| 3/10 | 7/10 |
