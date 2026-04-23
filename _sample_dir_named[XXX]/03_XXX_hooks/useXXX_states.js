// ============================================================================
// FILE: useXXX_states.js
// ROLE: State declarations for this page
// ============================================================================
//
// PURPOSE:
//   Declare ALL useState (and optionally useReducer) calls for the page.
//   This file is the single place where state lives — no other hook file
//   should call useState.
//
// RETURN CONTRACT:
//   Must return exactly TWO objects:
//     { states: { ... }, setters: { ... } }
//
//   - states  → the current state values (read-only from the consumer's perspective)
//   - setters → the setter functions (setState, dispatch, etc.)
//
// RULES:
//   - No side effects. Only state declarations.
//   - No parameters. This hook is self-contained.
//   - State variable names should be descriptive of the data they hold.
//
// NAMING RULE:
//   File:   useXXX_states.js  (use + PascalCase page name + _states)
//   Export: useXXX_states      (named export, same as file name)
//
// SEE: .cursor/Directory_Architecture.md → Section 7.2 (File 1)
// ============================================================================

import { useState } from "react";

export const useXXX_states = () => {
  // Declare all states for this page here.
  // Each useState call should have a descriptive name.
  const [sampleState, setSampleState] = useState(null);
  const [otherState, setOtherState] = useState(null);

  return {
    states: { sampleState, otherState },
    setters: { setSampleState, setOtherState },
  };
};
