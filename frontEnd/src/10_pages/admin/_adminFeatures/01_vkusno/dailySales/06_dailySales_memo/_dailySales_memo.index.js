// ============================================================================
// FILE: _XXX_memo.index.js
// ROLE: Barrel file for 06_XXX_memo/
// ============================================================================
//
// PURPOSE:
//   Re-export all React.memo comparison functions and memo helpers.
//   These are the "areEqual" functions passed as the second argument to React.memo:
//     export default React.memo(XXX_YYY, XXX_YYY_areEqual);
//
// THIS DIRECTORY MUST ALWAYS EXIST (even if empty).
//   Keep this barrel file present even when there are no memo functions yet.
//   When you add a comparison function, export it from here.
//
// EXAMPLE (when memo functions exist):
//   export { XXX_YYY_areEqual } from "./XXX_YYY_areEqual.js";
//
// DEBUG FLAG:
//   Memo comparison functions can import XXX_Memo_debug from XXX.config.js
//   to log when React.memo prevents or allows a re-render:
//     import { XXX_Memo_debug } from "../XXX.config.js";
//     if (XXX_Memo_debug) console.log("XXX_YYY areEqual:", prevProps, nextProps);
//
// SEE: .cursor/Directory_Architecture.md → Section 4, Section 11, Section 12
// ============================================================================
