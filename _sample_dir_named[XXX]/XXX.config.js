// ============================================================================
// FILE: XXX.config.js
// ROLE: Debug flags & page-level configuration
// ============================================================================
//
// PURPOSE:
//   Every page has ONE config file that exports boolean debug flags.
//   Each layer (UI, hooks, validation, API, memo) imports its own flag
//   and wraps console.log calls behind it:
//
//     if (XXX_Hooks_debug) console.log("some debug info", data);
//
// NAMING RULE:
//   XXX_<Layer>_debug
//   where XXX = page name, <Layer> = UI | Hooks | VLD | API | Memo
//
// DEFAULTS:
//   All flags MUST be false in committed code.
//   Developers flip them to true locally while debugging, then reset before committing.
//
// SEE: .cursor/Directory_Architecture.md → Section 12
// ============================================================================

export const XXX_UI_debug = false;     // UI components (XXX.jsx, XXX_YYY.jsx, XXX_YYY_ZZZ.jsx)
export const XXX_Hooks_debug = false;  // Hooks (useXXX.js, useXXX_states.js, useXXX_handlers.js, useXXX_apiHelpers.js)
export const XXX_VLD_debug = false;    // Validation functions (04_XXX_vld/)
export const XXX_API_debug = false;    // API helper functions (useXXX_apiHelpers.js)
export const XXX_Memo_debug = false;   // Memo comparison functions (06_XXX_memo/)
