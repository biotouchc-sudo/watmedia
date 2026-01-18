# 👁️ BEAUTY TRACK: PHASE 4 - SPATIAL (Levels 31-40)
> **الحالة:** ❌ ~0% مكتمل (نقطة التحول الكبرى)

---

## Level 31: WebGL Canvas ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (Next.js 16).

المطلوب: إعداد بيئة React Three Fiber.

1. تثبيت: npm install three @types/three @react-three/fiber @react-three/drei

2. أنشئ src/components/canvas/Scene.tsx:

"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function Scene({ children }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

3. أضفه في layout.tsx خلف المحتوى.
```

---

## Level 32: 3D Hero Scene ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: إنشاء مشهد Hero ثلاثي الأبعاد (Cyber Core).

أنشئ src/components/canvas/CyberCore.tsx:
- استخدم SphereGeometry
- استخدم MeshDistortMaterial من @react-three/drei
- لون ذهبي/سماوي متحرك
- يدور ببطء

استخدمه داخل Scene في الصفحة الرئيسية.
```

---

## Level 33: Particle Systems ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: إضافة جزيئات محيطة (Stars/Sparkles).

استخدم مكون <Sparkles> من @react-three/drei:
- count: 500
- scale: 10
- size: 2
- speed: 0.5
- color: "gold"

أضفها كخلفية كونية في الـ Scene.
```

---

## Level 34: Post-Processing ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: إضافة تأثيرات بصرية سينمائية.

1. تثبيت: npm install @react-three/postprocessing

2. أضف <EffectComposer>:
   - <Bloom luminanceThreshold={1} intensity={1.5} /> (للتوهج)
   - <Noise opacity={0.02} /> (للملمس الفيلمي)
   - <Vignette /> (للتركيز على المنتصف)
```

---

## Level 35: Camera Controls ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: تحريك الكاميرا مع الماوس لتعطي عمقاً (Parallax Camera).

استخدم مكون <PresentationControls> من @react-three/drei:
- global={false}
- cursor={true}
- snap={true}
- speed={1}
- zoom={1}
- polar={[-0.1, 0.1]}
- azimuth={[-0.1, 0.1]}

لف الـ CyberCore بهذا المكون ليتحرك مع الماوس.
```

---

## Level 36: Environment Maps ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: إضاءة واقعية (HDR).

استخدم مكون <Environment> من @react-three/drei:
- preset="city" أو "night"
- background={false} (إضاءة فقط)

هذا سيجعل المواد المعدنية والزجاجية تعكس الضوء بوعي.
```

---

## Level 37: 3D Text ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: استبدال عنوان Hero بنص 3D.

استخدم مكون <Text3D> من @react-three/drei:
- حمل ملف خط (json format)
- اكتب "WATMEDIA"
- مادة metallic لامعة
- أضف Center لتوسط النص

ملاحظة: تحتاج لتحويل الخط لـ JSON باستخدام facetype.js.
```

---

## Level 38: Scroll-driven 3D ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: تحريك العناصر 3D عند التمرير.

استخدم <ScrollControls> من @react-three/drei:
- pages={3}
- damping={0.2}

داخل <Scroll>:
- حرك الـ CyberCore لليسار في الصفحة الثانية.
- أظهر مكعبات أو أشكال أخرى في الصفحة الثالثة.
```

---

## Level 39: Model Loading ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: تحميل نموذج 3D مخصص (Logo).

1. حول شعار WATMEDIA إلى ملف .glb.
2. ضعه في /public/models/.
3. استخدم npx gltfjsx لتحويله لمكون React.
4. استخدم المكون الناتج في الـ Scene.
```

---

## Level 40: Physics Engine ❌
### 🎯 Prompt للتنفيذ:

```
أنا أعمل على مشروع WATMEDIA (R3F).

المطلوب: إضافة فيزياء للأجسام (تصادم، جاذبية).

1. تثبيت: npm install @react-three/rapier

2. لف المشهد بـ <Physics>.

3. اجعل الأجسام <RigidBody>:
   - colliders="hull"
   - restitution={2} (ارتداد)

4. اجعل النص يسقط ويتصادم مع الأرضية عند التحميل.
```

---

## ✅ ملخص المرحلة 4
| المكتمل | المتبقي |
|:---:|:---:|
| 0/10 | 10/10 |
