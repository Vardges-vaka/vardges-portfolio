// ============================================================================
// FILE: _XXX_hooks.index.js
// ROLE: Barrel file for 03_XXX_hooks/
// ============================================================================
//
// PURPOSE:
//   Re-export every hook from this directory so that consumers only need
//   one import path. All external code must import from THIS file,
//   never directly from the individual hook files.
//
// NAMING RULE:
//   _XXX_hooks.index.js
//   - Starts with _ (sorts to the top of the directory listing)
//   - XXX = page name
//   - "hooks" = the bucket name
//   - Ends with .index.js
//
// USAGE (from XXX.jsx):
//   import { useXXX } from "./03_XXX_hooks/_XXX_hooks.index.js";
//
// SEE: .cursor/Directory_Architecture.md → Section 4
// ============================================================================

export { useXXX_states } from "./useXXX_states.js";
export { useXXX_handlers } from "./useXXX_handlers.js";
export { useXXX_apiHelpers } from "./useXXX_apiHelpers.js";
export { useXXX } from "./useXXX.js";
