import {
  MENUS,
  MOCK_MENU_ITEMS,
  MODIFIERS,
  OPTIONS,
} from "../05_newMenu_cnst/_newMenu_cnst.index.js";

/* ============================================================================
   useNewMenu_apiHelpers — thin "API client" wrapper.

   For now every helper returns mock data from .temp_MOCK_DATA wrapped in the
   project's standard `{ success, message, data }` envelope (per the arch doc's
   API helper return shape). When the real endpoints land:
     - replace each body with a fetch() call against an entry from
       03_config/apiEndpoints/adminEndpoints/ADMIN_endpoints.js
     - keep the same return envelope so handlers don't need to change.
============================================================================ */
const okEnvelope = (data) => ({
  success: true,
  message: "ok",
  data,
});

const mockAsync = (data, ms = 100) =>
  new Promise((resolve) => setTimeout(() => resolve(okEnvelope(data)), ms));

export const useNewMenu_apiHelpers = () => {
  const fetchMenus = () => mockAsync(MENUS);
  const fetchItems = () => mockAsync(MOCK_MENU_ITEMS);
  const fetchModifiers = () => mockAsync(MODIFIERS);
  const fetchOptions = () => mockAsync(OPTIONS);

  // Generic create — accepts { kind, ownerType, label }; pretends to persist.
  const createEntity = (payload) =>
    mockAsync({ _id: `tmp_${Date.now()}`, ...payload }, 250);

  return {
    apiHelpers: {
      fetchMenus,
      fetchItems,
      fetchModifiers,
      fetchOptions,
      createEntity,
    },
  };
};
