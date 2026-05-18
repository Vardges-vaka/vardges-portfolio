// ============================================================================
// FILE: XXX_YYY.jsx
// ROLE: A component used by the parent page (XXX.jsx)
// ============================================================================
//
// NAMING RULES:
//   File name      → XXX_YYY.jsx  (PascalCase: PageName_ComponentName)
//   Function name  → XXX_YYY      (matches the file name exactly)
//   Root className → xXX_YYY      (page name lowerCamelCase + _ + ComponentName)
//   CSS file       → xXX_YYY.css  (in _styles/)
//
// WHAT THIS FILE RECEIVES VIA PROPS:
//   This component receives its props via the spread operator in XXX.jsx:
//     <XXX_YYY {...compProps.XXX_YYY_props} />
//
//   The props object (XXX_YYY_props) was built in useXXX.js and contains:
//     {
//       states:     { ... },   ← only the states this component needs
//       handlers:   { ... },   ← only the handlers this component needs
//       t:          function,  ← translation function (and tCommon, etc. if needed)
//       childProps: {          ← pre-built props for each child component
//         XXX_YYY_ZZZ_props: { states, handlers, t, ... }
//       }
//     }
//
// HOW TO PASS PROPS TO CHILD COMPONENTS:
//   Spread the matching entry from childProps:
//     <XXX_YYY_ZZZ {...childProps.XXX_YYY_ZZZ_props} />
//
// IMPORT RULES:
//   - Own CSS        → from ../_styles/xXX_YYY.css
//   - Child comps    → from ./XXX_childComps/_XXX_childComps.index.js (barrel only)
//
// SEE: .cursor/Directory_Architecture.md → Section 5, Section 6, Section 8.5
// ============================================================================

import { XXX_YYY_ZZZ } from "./XXX_childComps/_XXX_childComps.index.js";
import "../_styles/xXX_YYY.css";

const XXX_YYY = ({ states, handlers, t, childProps }) => {
  return (
    // Root element: <div> with the full component lineage as className.
    // Internal classNames: xXX_YYY_[elementName] (single underscore separator, never double)
    <div className="xXX_YYY">

      {/* Example internal element with a properly scoped className */}
      <div className="xXX_YYY_header">
        <h2 className="xXX_YYY_title">{t("sampleTitle")}</h2>
      </div>

      {/* ---------- Child Component: XXX_YYY_ZZZ ----------
          Spread the pre-built child props from childProps.
          The key is: XXX_YYY_ZZZ_props (full lineage + "_props")
      */}
      <XXX_YYY_ZZZ {...childProps.XXX_YYY_ZZZ_props} />
    </div>
  );
};

export default XXX_YYY;
