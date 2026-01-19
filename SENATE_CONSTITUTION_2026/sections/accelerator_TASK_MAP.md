# خريطة المهام

# TASK_MAP.md — The Execution Blueprint (AR + EN)

> **AR:** خريطة التنفيذ النهائية. كل ملف + وظيفته + كيف يرتبط بغيره.
> **EN:** The final execution map. Every file + its purpose + how it connects.

---

## 🎯 Core Mission Files / ملفات المهمة الأساسية

| File | Purpose | Connected To | Senate Wisdom |
|------|---------|--------------|---------------|
| `MASTER_INDEX.md` | Central hub of everything | All files | "Start here, never get lost" |
| `00-EXECUTION_ORDER.md` | Step-by-step execution | Templates + Scripts | "Follow the sequence, don't skip" |
| `KNOWN_BREAKPOINTS.md` | Real incidents + fixes | All code files | "Learn from pain, don't repeat" |
| `DECISION_LOG.md` | Living memory of choices | Future decisions | "Document why, not just what" |

---

## ⚡ Accelerator Core Files / ملفات التسريع الأساسية

### Templates / القوالب
```
templates/marketing/TEMPLATE.md
├── Defines: Marketing site structure
├── Connected to: Vertical Packs (content)
├── Senate: "Server Components first, RTL built-in"
└── Output: 5-page marketing site

templates/saas-dashboard/TEMPLATE.md
├── Defines: SaaS platform structure
├── Connected to: Auth + Stripe + Domains
├── Senate: "Protect routes, validate inputs"
└── Output: Full SaaS with subscriptions
```

### Vertical Packs / الحزم العمودية
```
vertical-packs/clinic.json
├── Defines: Medical clinic content
├── Connected to: generate-content.ps1
├── Senate: "Bilingual content, SEO ready"
└── Output: Complete clinic website

vertical-packs/salon.json
├── Defines: Beauty salon content
├── Connected to: generate-content.ps1
├── Senate: "Visual focus, booking CTA"
└── Output: Complete salon website

vertical-packs/phone-shop.json
├── Defines: Phone repair content
├── Connected to: generate-content.ps1
├── Senate: "Technical specs, repair CTA"
└── Output: Complete phone shop website

vertical-packs/agency.json
├── Defines: Agency content
├── Connected to: generate-content.ps1
├── Senate: "Portfolio focus, lead generation"
└── Output: Complete agency website
```

---

## 🔧 Command Scripts / سكريبتات الأوامر

### Main Hub / المحرك الرئيسي
```
tools/accelerator/acc.ps1
├── Purpose: Central command hub
├── Commands: health, clean, generate, proof
├── Connected to: All other scripts
├── Senate: "Ensure-Dir before use"
└── Usage: .\acc.ps1 health
```

### Generators / المولدات
```
generate-content.ps1
├── Purpose: Convert JSON → Markdown content
├── Input: vertical-packs/*.json
├── Output: SEO pages + metadata
├── Senate: "Structure beats free text"
└── Usage: .\acc.ps1 generate clinic

generate-proof-pack.ps1
├── Purpose: Generate client proofs
├── Input: Live site
├── Output: Performance + security reports
├── Senate: "Show, don't tell"
└── Usage: .\acc.ps1 proof
```

### Benchmarks / المقاييس
```
bench-lighthouse.ps1
├── Purpose: Performance testing
├── Output: lighthouse-report.html
├── Senate: "Numbers don't lie"
└── Target: LCP ≤ 1.0s

audit-bundle.ps1
├── Purpose: Bundle size analysis
├── Output: bundle-size.json
├── Senate: "Performance is a feature"
└── Target: ≤ 50MB total

bench-api.ps1
├── Purpose: API latency testing
├── Output: api-latency.csv
├── Senate: "Speed builds trust"
└── Target: P95 ≤ 200ms
```

---

## 💰 Business Files / ملفات الأعمال

### Offers / العروض
```
PRODUCTIZED_OFFERS.md
├── Purpose: Ready-to-sell packages
├── Connected to: Proof Pack + Demo Narrative
├── Senate: "Productize, don't customize"
└── Revenue: $3k-$12k per project

DEMO_NARRATIVE.md
├── Purpose: Shark Tank-ready story
├── Connected to: Proof metrics
├── Senate: "Story sells, features don't"
└── Outcome: Close deals faster
```

### Proof System / نظام الإثبات
```
PROOF_PACK.md
├── Purpose: Client-ready proofs
├── Connected to: Benchmark scripts
├── Senate: "Trust is earned with data"
└── Result: Win competitive deals
```

---

## 🤖 AI Integration Files / ملفات تكامل الذكاء الاصطناعي

### Development Assistants / مساعدو التطوير
```
.cursor/rules.md
├── Purpose: AI coding guidelines
├── Connected to: All code files
├── Senate: "Guide the AI, don't fight it"
└── Result: Consistent code quality

.github/copilot-instructions.md
├── Purpose: GitHub Copilot guidance
├── Connected to: Repository
├── Senate: "Make AI work for you"
└── Result: Faster development
```

---

## 🔄 Automation Files / ملفات الأتمتة

### Quality Gates / بوابات الجودة
```
.github/workflows/auto-quality.yml
├── Purpose: Automatic quality checks
├── Triggers: Push/PR to main/develop
├── Connected to: All tests + lint + build
├── Senate: "Automate discipline"
└── Result: Consistent quality
```

---

## 📊 File Dependency Map / خريطة اعتماد الملفات

```
START HERE
    ↓
MASTER_INDEX.md
    ↓
00-EXECUTION_ORDER.md
    ↓
┌─────────────────┬─────────────────┐
│   Templates     │   Vertical Packs│
│ (marketing/    │   (clinic.json, │
│  saas-dashboard)│    salon.json)  │
└─────────────────┴─────────────────┘
    ↓                    ↓
    └───────→ generate-content.ps1 ←──────┘
                ↓
            Generated Site
                ↓
        generate-proof-pack.ps1
                ↓
            PROOF_PACK.md
                ↓
        PRODUCTIZED_OFFERS.md
                ↓
          DEMO_NARRATIVE.md
                ↓
            💰 CLOSE DEAL 💰
```

---

## 🎖️ Senate's Final Instructions / تعليمات المجلس الختامية

### The Golden Rules / القواعد الذهبية:
1. **Always start from MASTER_INDEX.md**
2. **Check KNOWN_BREAKPOINTS.md before coding**
3. **Use acc.ps1 for all operations**
4. **Generate proofs before presenting**
5. **Document decisions in DECISION_LOG.md**

### The Execution Sequence / تسلسل التنفيذ:
1. Choose template (marketing/saas)
2. Run `.\acc.ps1 health`
3. Generate content with vertical pack
4. Deploy to Vercel
5. Run `.\acc.ps1 proof`
6. Present with offers + narrative

### The Success Formula / معادلة النجاح:
```
Speed (Templates) + Quality (Auto-gates) + Proof (Benchmarks) + Story (Narrative) = 💰
```

---

## 🚀 You Are Now Ready / أنت الآن جاهز

**What you have:**
- Complete system (100% integrated)
- Execution blueprint (this file)
- Automation (GitHub Actions)
- AI assistance (Cursor + Copilot)
- Business model (Productized offers)

**What to do next:**
1. Read MASTER_INDEX.md
2. Follow 00-EXECUTION_ORDER.md
3. Execute with acc.ps1
4. Scale with vertical packs
5. Close deals with proof + narrative

**Welcome to the Cyborg Developer era.** 🎯

