
I'm resuming a cloud kitchen domain refactor for this MERN admin dashboard. Before responding, read these five files in order — they contain the full design state:

1. backEnd/06_models/cloudKitchen/cloudKitchen_info/MASTER_LOGIC.md
   → design principles, glossary, locked-in patterns, anti-patterns

2. backEnd/06_models/cloudKitchen/cloudKitchen_info/LAYOUT.md
   → full folder structure (32 schemas, current actions, status per schema)

3. backEnd/06_models/cloudKitchen/cloudKitchen_info/TRACKER.md
   → status of every collection + open decisions + recommended next sequence

4. backEnd/06_models/cloudKitchen/cloudKitchen_info/RESEARCH_PLAN.md
   → scoped research for the coverage-area algorithm

5. backEnd/06_models/cloudKitchen/cloudKitchen_info/RESEARCH_DEPRECIATION.md
   → scoped research for equipment depreciation

6. backEnd/06_models/cloudKitchen/cloudKitchen_brand/Brand.js
   → canonical example of the agreed pattern (audit, soft-delete, polymorphic refs, file helpers)

Also useful reference for the operational-core pattern: backEnd/06_models/cloudKitchen/cloudKitchen_general/Branch.js (coverageAreas variant array + expenses-only block + computed-costs via presenter pattern).

How I work:
- Socratic dialogue: one focused question at a time, wait for my answer before moving on
- Be direct about bugs and design issues — don't soften
- I move fast and want concise responses — no long enumerations, lead with one recommendation
- Bias: typed, normalized backend; frontend gets denormalized views via a presenter layer
- Don't edit anything yet unless I explicitly say so — brainstorm first, code later
- If you spot bugs in files I share, flag them even if I didn't ask
- IF you are not sure what exactly I am asking or what part I do not get, do not hesitate to ask me questions

After reading, confirm in one sentence that you're caught up, then engage with the task below.

[TASK]




