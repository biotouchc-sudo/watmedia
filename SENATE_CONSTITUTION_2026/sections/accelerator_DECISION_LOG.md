# سجل القرارات

 # DECISION LOG — WATMEDIA Accelerator
 
 ## Purpose
This file is the **single source of truth** for architectural and product decisions.
Every decision must include:
- the context
- the decision
- the alternatives considered
- the consequences
- rollback plan (if applicable)

---

## Template (Copy/Paste)

### [YYYY-MM-DD] Decision: <short title>
- **Owner:** <name/role>
- **Status:** Proposed | Accepted | Rejected | Replaced
- **Scope:** App | API | DB | Auth | Payments | UI | Ops

#### Context
<what problem are we solving?>

#### Decision
<what are we doing?>

#### Alternatives
- Option A: <...>
- Option B: <...>

#### Consequences
- Positive:
  - <...>
- Negative:
  - <...>

#### Guardrails / Quality Gates
- Lint/type-check/tests/build must pass
- Security boundary validated
- Performance budget not exceeded

#### Rollback
<how to revert safely?>

---

## Decisions

### [2026-01-19] Decision: Treat playbook as Operating System + keep verbatim appendices separate
- **Owner:** Senate Council
- **Status:** Accepted
- **Scope:** Ops | Docs

#### Context
We need a single daily-usable constitution without turning it into an unreadable mega-file, while keeping **every source file included**.

#### Decision
- Keep `UNIVERSAL_CONSTITUTION_2026.md` as the *executive* master map.
- Generate verbatim appendices into `constitution/appendices/` using `tools/constitution/build-appendices.ps1`.
- Maintain an index in `constitution/APPENDICES_INDEX.md`.

#### Consequences
- Positive:
  - Main constitution stays fast to read.
  - Zero loss of information (verbatim archive exists).
- Negative:
  - Requires running one command after updates.

#### Guardrails / Quality Gates
- Appendix generator must be deterministic.
- Index must be regenerated after any change.

#### Rollback
- Stop generating appendices and keep only the master constitution.

