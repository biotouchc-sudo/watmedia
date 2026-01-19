# ترتيب التنفيذ

# 00-EXECUTION_ORDER.md — The A→Z Execution Blueprint (AR + EN)

> **AR:** اتبع هذه الخطوات بالترتيب. لا تقفز.
> **EN:** Follow these steps in order. Do not skip.

---

## 🚀 Phase 1: Project Setup (Day 0)

### 1.1 Choose Your Template
```bash
# Marketing Website (5 pages)
cp docs/accelerator/templates/marketing/TEMPLATE.md docs/accelerator/ACTIVE_TEMPLATE.md

# SaaS / Dashboard (with auth + subscriptions)
cp docs/accelerator/templates/saas-dashboard/TEMPLATE.md docs/accelerator/ACTIVE_TEMPLATE.md
```

### 1.2 Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Install dependencies
npm install

# Run health check
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 health
```

---

## 🎯 Phase 2: Content Generation (Day 1)

### 2.1 Select Vertical Pack
```bash
# Available packs: clinic, salon, phone-shop, agency
powershell -ExecutionPolicy Bypass -File tools/accelerator/acc.ps1 generate-content clinic output/clinic
```

## Council’s Secret Sauce
- Every time you hit a new issue, add it to:
  - `docs/playbook/KNOWN_BREAKPOINTS.md`
  - and update a workflow/command so it never repeats.

