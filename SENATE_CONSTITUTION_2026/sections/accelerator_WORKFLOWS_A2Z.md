# مكتبة سير العمل

# WORKFLOWS_A2Z.md (AR + EN)

## الهدف / Purpose
- **AR:** مكتبة أوامر متسلسلة قابلة للتنفيذ، تمنع الارتجال وتضمن الجودة.
- **EN:** A sequential executable command library that prevents improvisation and enforces quality.

---

## A) Health gate / بوابة الجودة
```powershell
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 health
```

## B) Clean cache / تنظيف الكاش
```powershell
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 clean
```

## C) Generate vertical pack content / توليد محتوى حزمة قطاع
```powershell
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 generate-content clinic docs/accelerator/out/clinic
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 generate-content salon docs/accelerator/out/salon
```

---

## D) IDE Workflows (optional) / Workflows داخل IDE (اختياري)
- `.windsurf/workflows/accelerator-health.md`
- `.windsurf/workflows/accelerator-generate-vertical-pack.md`

---

## Council’s Secret Sauce
- Make every repeated manual step a command.
- Make every new incident a new command or workflow.

