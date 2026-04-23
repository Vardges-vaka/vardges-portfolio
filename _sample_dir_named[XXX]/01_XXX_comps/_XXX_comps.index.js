// ============================================================================
// FILE: _XXX_comps.index.js
// ROLE: Barrel file for 01_XXX_comps/
// ============================================================================
//
// PURPOSE:
//   Re-export every component in this directory.
//   All imports from outside this folder MUST go through this barrel file.
//
// NAMING RULE:
//   _XXX_comps.index.js
//   - Starts with _ (sorts to the top)
//   - XXX = page name
//   - "comps" = the bucket name
//   - Ends with .index.js
//
// SEE: .cursor/Directory_Architecture.md → Section 4
// ============================================================================

export { default as XXX_YYY } from "./XXX_YYY.jsx";
// Add more components as they are created:
// export { default as XXX_AAA } from "./XXX_AAA.jsx";
