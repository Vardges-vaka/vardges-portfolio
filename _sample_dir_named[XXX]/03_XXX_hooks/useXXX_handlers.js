// ============================================================================
// FILE: useXXX_handlers.js
// ROLE: Event handlers & action functions for the page UI
// ============================================================================
//
// PURPOSE:
//   Define all event handlers and action functions that UI components will call
//   (onClick, onSubmit, onChange, onBlur, etc.).
//
// PARAMETERS:
//   This hook RECEIVES its dependencies as positional arguments.
//   Typical signature: (states, setters, apiHelpers)
//   But it is flexible — pass whatever this hook needs. Examples:
//     - (states, setters)                    ← no API calls needed
//     - (states, setters, apiHelpers)        ← common case
//     - (states, setters, apiHelpers, t)     ← if handlers need translations
//
//   IMPORTANT: The parameters are positional (not destructured from an object).
//   So the call in useXXX.js looks like:
//     const { handlers } = useXXX_handlers(states, setters, apiHelpers);
//
// RETURN CONTRACT:
//   { handlers: { handlerName1, handlerName2, ... } }
//
// RULES:
//   - Wrap all handlers with useCallback for performance.
//   - Handler names should start with "handle" (e.g. handleSubmit, handleFieldUpdate).
//   - Keep handlers focused — each one does one thing.
//
// NAMING RULE:
//   File:   useXXX_handlers.js  (use + PascalCase page name + _handlers)
//   Export: useXXX_handlers      (named export, same as file name)
//
// SEE: .cursor/Directory_Architecture.md → Section 7.2 (File 3)
// ============================================================================

import { useCallback } from "react";

export const useXXX_handlers = (states, setters, apiHelpers) => {
  // Each handler should be wrapped in useCallback with proper dependencies.
  const handleSample = useCallback(() => {
    setters.setSampleState("new value");
  }, [setters]);

  // Example: a handler that uses apiHelpers
  // const handleFetchData = useCallback(async () => {
  //   const result = await apiHelpers.fetchSomething();
  //   if (result.success) setters.setSampleState(result.data);
  // }, [apiHelpers, setters]);

  return { handlers: { handleSample } };
};
