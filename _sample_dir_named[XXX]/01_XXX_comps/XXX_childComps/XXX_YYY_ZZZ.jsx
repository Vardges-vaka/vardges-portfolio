// ============================================================================
// FILE: XXX_YYY_ZZZ.jsx
// ROLE: A child component used by XXX_YYY.jsx
// ============================================================================
//
// NAMING RULES:
//   File name      → XXX_YYY_ZZZ.jsx  (PageName_ParentComp_ChildComp — all PascalCase)
//   Function name  → XXX_YYY_ZZZ      (matches the file name exactly)
//   Root className → xXX_YYY_ZZZ      (full lineage, page name part in lowerCamelCase)
//   CSS file       → xXX_YYY_ZZZ.css  (in _styles/)
//
// WHAT THIS FILE RECEIVES VIA PROPS:
//   This child component receives its props via spread in XXX_YYY.jsx:
//     <XXX_YYY_ZZZ {...childProps.XXX_YYY_ZZZ_props} />
//
//   The props object (XXX_YYY_ZZZ_props) was built in useXXX.js and contains:
//     {
//       states:   { ... },   ← only the states this child needs
//       handlers: { ... },   ← only the handlers this child needs
//       t:        function,  ← translation (if this child renders text)
//     }
//
//   If this child itself has deeper children, it would also receive:
//     childProps: { XXX_YYY_ZZZ_QQQ_props: { ... } }
//   But typically child components are leaf-level and don't nest further.
//
// IMPORT RULES:
//   - Own CSS → from ../../_styles/xXX_YYY_ZZZ.css  (two levels up to reach _styles/)
//
// SEE: .cursor/Directory_Architecture.md → Section 5.3, Section 6.5
// ============================================================================

import "../../_styles/xXX_YYY_ZZZ.css";

const XXX_YYY_ZZZ = ({ states, handlers, t }) => {
  return (
    // Root element: <div> with the full 3-level lineage as className.
    // Internal classNames: xXX_YYY_ZZZ_[elementName]
    <div className="xXX_YYY_ZZZ">

      {/* Example internal element */}
      <span className="xXX_YYY_ZZZ_label">{t("sampleChildLabel")}</span>

    </div>
  );
};

export default XXX_YYY_ZZZ;
