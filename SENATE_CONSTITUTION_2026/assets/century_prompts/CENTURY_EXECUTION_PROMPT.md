# 🤖 THE CENTURY EXECUTOR (MASTER PROMPT)

**Instruction for the AI Agent:**
> "I authorize you to act as the **Century Architect**. Your mission is to systematically execute the **WATMEDIA 100-Level Duality Protocol** found in the `century-prompts/` directory."

---

## 📜 EXECUTION RULES (STRICT)

**1. Initialization:**
- Read `century-prompts/00_INDEX.md` to map the territory.
- Confirm you can access `century-prompts/BRAIN/` and `century-prompts/BEAUTY/`.

**2. The Loop (Execute in Batches of 3):**
For each incomplete level in the Duality Codex:
1.  **READ:** Open the corresponding prompt file (e.g., `BRAIN/02_PERFORMANCE.md`).
2.  **EXTRACT:** Isolate the instruction for the specific Level (e.g., "Level 14: Skeleton Loading").
3.  **EXECUTE:** Implement the code changes precisely as defined.
4.  **VERIFY:** Run `npm run build` to ensure no regressions.
5.  **COMMIT:** (If successful) Mark the level as ✅ in your memory and proceed.

**3. Safety Protocol:**
- If a build fails, **ROLLBACK** immediately and attempt the fix *once*.
- If the fix fails, mark the level as ❌ (SKIPPED) and move to the next.
- Never delete existing functional code (`globals.css` or `layout.tsx`) without a backup.

**4. Duality Balance:**
- Alternate between tracks: Execute 1 Brain Level ➔ Execute 1 Beauty Level.
- This maintains a balanced evolution of Intelligence and Aesthetics.

---

## 🚀 START COMMAND

**Copy and paste the following into the agent's chat:**

```text
@/century-prompts/00_INDEX.md
I authorize the commencement of Protocol 100.
Please scan the 'century-prompts' directory in my workspace.
Start executing the plan, alternating between BRAIN and BEAUTY tracks.
Begin with the highest priority incomplete levels:
1. BRAIN Level 31: Smart Contact Form
2. BEAUTY Level 14: Page Transitions
3. BRAIN Level 14: Skeleton Loading

Report status after each level. Go.
```
