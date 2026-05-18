// ============================================================================
// FILE: _XXX_childComps.index.js
// ROLE: Barrel file for XXX_childComps/
// ============================================================================
//
// PURPOSE:
//   Re-export every child component in this directory.
//   Components in 01_XXX_comps/ import their children from this barrel.
//
// NAMING RULE:
//   _XXX_childComps.index.js
//   - Starts with _ (sorts to the top)
//   - XXX = page name
//   - "childComps" = the bucket name
//   - Ends with .index.js
//
// SEE: .cursor/Directory_Architecture.md → Section 4
// ============================================================================

export { default as XXX_YYY_ZZZ } from "./XXX_YYY_ZZZ.jsx";
// Add more child components as they are created:
// export { default as XXX_YYY_QQQ } from "./XXX_YYY_QQQ.jsx";
// export { default as XXX_AAA_BBB } from "./XXX_AAA_BBB.jsx";
