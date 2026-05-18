// ============================================================================
// FILE: useXXX.js
// ROLE: Main Hook — the single orchestrator for this page
// ============================================================================
//
// PURPOSE:
//   This is the ONLY hook that the parent component (XXX.jsx) calls.
//   It assembles everything by calling the 3 sub-hooks:
//     1. useXXX_states     → { states, setters }
//     2. useXXX_apiHelpers  → { apiHelpers }
//     3. useXXX_handlers    → { handlers }
//
//   Then it:
//     - Extracts translation functions (t, tCommon, etc.)
//     - Runs any useEffect logic the page needs
//     - Builds the compProps object (one named entry per component)
//     - Returns the final shape: { t, [tCommon...], states, handlers, compProps }
//
// NAMING RULE:
//   File: useXXX.js  (use + PascalCase page name)
//   Export: useXXX   (named export, same as file name)
//
// COMPPROPS PATTERN:
//   - Each component gets a props object named: XXX_YYY_props
//   - Each child component gets:                XXX_YYY_ZZZ_props
//   - Child props are nested inside their parent's "childProps" key.
//   - Only pass the EXACT states/handlers each component needs — not everything.
//
// TRANSLATION RULE:
//   - ALL useTranslation() calls happen HERE, in the main hook.
//   - Components NEVER call useTranslation() themselves.
//   - Pass t, tCommon, etc. down through compProps.
//
// SEE: .cursor/Directory_Architecture.md → Section 7.2 (File 4), Section 8, Section 9
// ============================================================================

import { useTranslation } from "react-i18next";
import { useXXX_states } from "./useXXX_states.js";
import { useXXX_handlers } from "./useXXX_handlers.js";
import { useXXX_apiHelpers } from "./useXXX_apiHelpers.js";

export const useXXX = () => {
  // --- Translations ---
  // Extract all translation namespaces this page needs.
  // If you need more than one namespace, add them here:
  //   const { t: tCommon } = useTranslation("common");
  //   const { t: tValidation } = useTranslation("validation");
  const { t } = useTranslation("xXX");

  // --- Sub-hooks ---
  // Call order matters: states first, then apiHelpers (may need states/setters),
  // then handlers (may need all of the above).
  const { states, setters } = useXXX_states();
  const { apiHelpers } = useXXX_apiHelpers();
  const { handlers } = useXXX_handlers(states, setters, apiHelpers);

  // --- useEffect logic (if needed) ---
  // Place any useEffect calls here (data fetching on mount, subscriptions, etc.)
  // Example:
  //   useEffect(() => { apiHelpers.fetchInitialData(); }, []);

  // --- Build compProps ---
  // One named props object per child component (leaf level first)...
  const XXX_YYY_ZZZ_props = {
    states: { sampleState: states.sampleState },
    handlers: { handleSample: handlers.handleSample },
    t,
  };

  // ...then one named props object per component, including its childProps.
  const XXX_YYY_props = {
    states: { sampleState: states.sampleState, otherState: states.otherState },
    handlers: { handleSample: handlers.handleSample },
    t,
    childProps: {
      XXX_YYY_ZZZ_props,
    },
  };

  // If there were a second component, build its props here too:
  // const XXX_AAA_props = { states: {...}, handlers: {...}, t };

  // --- Return ---
  // The parent component (XXX.jsx) destructures this.
  // - t (and tCommon, etc.)     → only if the parent JSX itself uses translations
  // - states, handlers          → only if the parent JSX itself needs them directly
  // - compProps                 → ALWAYS — the per-component props distribution object
  return {
    t,
    states,
    handlers,
    compProps: {
      XXX_YYY_props,
      // XXX_AAA_props,  ← add more component props here as needed
    },
  };
};
