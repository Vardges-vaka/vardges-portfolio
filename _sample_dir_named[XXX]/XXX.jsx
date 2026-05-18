// ============================================================================
// FILE: XXX.jsx
// ROLE: Main Parent Component (page entry point)
// ============================================================================
//
// NAMING RULES:
//   File name  → PascalCase, matches the directory name: XXX.jsx
//   Function   → PascalCase, matches the file name:      const XXX = () => {}
//   Root class → lowerCamelCase of the page name:         className="xXX"
//
// HOW TO READ THE PLACEHOLDERS:
//   XXX = parent page name      (e.g. Contact)
//   YYY = a component name      (e.g. ContactForm)
//   ZZZ = a child component     (e.g. SubmitButton)
//
// WHAT THIS FILE DOES:
//   1. Calls the main hook (useXXX) to get all states, handlers, translations,
//      and the pre-built compProps object.
//   2. Renders the page layout.
//   3. Spreads compProps onto each component — never passes loose props.
//
// IMPORT RULES:
//   - Main hook        → from the hooks barrel:      03_XXX_hooks/_XXX_hooks.index.js
//   - Components       → from the components barrel: 01_XXX_comps/_XXX_comps.index.js
//   - CSS (own styles) → from _styles/:              _styles/xXX.css
//   - NEVER import directly from a component/hook file. Always go through barrels.
//
// SEE: .cursor/Directory_Architecture.md → Section 8 (compProps), Section 15 (full example)
// ============================================================================

import { useXXX } from "./03_XXX_hooks/_XXX_hooks.index.js";
import { XXX_YYY } from "./01_XXX_comps/_XXX_comps.index.js";
import "./_styles/xXX.css";

const XXX = () => {
  // The main hook returns everything the page and its components need.
  // - t, tCommon, etc. → translation functions (extracted in the hook, never in components)
  // - states           → page-level states (only if the parent JSX itself needs them)
  // - handlers         → page-level handlers (only if the parent JSX itself needs them)
  // - compProps        → an object with one named entry per component: XXX_YYY_props
  const { t, states, handlers, compProps } = useXXX();

  return (
    // Root element must be a <div> with the page name in lowerCamelCase.
    // All child classNames in this file follow: xXX_[elementName]
    <div className="xXX">

      {/* ---------- Component: XXX_YYY ----------
          - Spread the pre-built props object from compProps.
          - The key is always: XXX_YYY_props (matching the component name + "_props").
          - This keeps the parent JSX clean — no manual prop wiring here.
          - Inside compProps.XXX_YYY_props you will find:
              { states, handlers, t, childProps: { XXX_YYY_ZZZ_props } }
      */}
      <XXX_YYY {...compProps.XXX_YYY_props} />

      {/* If the page had a second component (e.g. XXX_AAA), it would look like:
          <XXX_AAA {...compProps.XXX_AAA_props} />
      */}
    </div>
  );
};

export default XXX;
