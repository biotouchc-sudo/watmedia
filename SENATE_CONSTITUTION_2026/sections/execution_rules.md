# قواعد التشغيل

 # WATMEDIA Playbook Rules (Operating System)
 
## 1) Non‑Negotiables
- Use TypeScript strict.
- Use App Router patterns (server-first, client only when necessary).
- Validate all inputs at API boundaries.
- Protect dashboard at layout boundary; enforce ownership checks.
- Payments state must come from webhooks (Stripe signature verified).
- No secrets committed.

## 2) Quality Gates (must pass before merge/deploy)
- Lint
- Type-check
- Tests
- Build

## 3) Execution Discipline
- Follow the defined phase order.
- After each phase, record the outcome in `accelerator/EXECUTION_DASHBOARD.md`.
- Any architectural deviation must be logged in `accelerator/DECISION_LOG.md`.

## 4) Known Breakpoints Policy
- Before changing fonts/providers/AI SDK, consult `KNOWN_BREAKPOINTS.md`.
- If a new breakpoint appears, append it with:
  - symptom
  - root cause
  - fix
  - prevention rule

## 5) Safety
- High-risk changes are developed in an isolated branch.
- Introduce feature flags for moderate risk.

