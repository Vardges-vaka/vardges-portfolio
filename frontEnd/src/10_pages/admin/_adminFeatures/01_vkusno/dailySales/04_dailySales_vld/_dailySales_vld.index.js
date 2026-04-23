// ============================================================================
// FILE: _XXX_vld.index.js
// ROLE: Barrel file for 04_XXX_vld/
// ============================================================================
//
// PURPOSE:
//   Re-export all validation and sanitization functions from this directory.
//   Examples: form validators, input sanitizers, schema checks.
//
// THIS DIRECTORY MUST ALWAYS EXIST (even if empty).
//   Keep this barrel file present even when there are no validators yet.
//   When you add a validation function, export it from here.
//
// EXAMPLE (when validators exist):
//   export { validateXXXForm } from "./validateXXXForm.js";
//   export { sanitizeXXXInput } from "./sanitizeXXXInput.js";
//
// DEBUG FLAG:
//   Validation functions can import XXX_VLD_debug from XXX.config.js
//   to gate console.log calls:
//     import { XXX_VLD_debug } from "../XXX.config.js";
//     if (XXX_VLD_debug) console.log("validation result:", result);
//
// SEE: .cursor/Directory_Architecture.md → Section 4, Section 11, Section 12
// ============================================================================
