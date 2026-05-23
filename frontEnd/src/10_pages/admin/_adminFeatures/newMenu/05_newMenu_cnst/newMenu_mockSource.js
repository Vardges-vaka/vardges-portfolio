/* ============================================================================
   newMenu_mockSource — re-exports the user's existing temp mock data.

   The source of truth for the demo data is the existing folder:
     03_cloudKitchens/menus copy/05_menus_cnst/.temp_MOCK_DATA/

   The NewMenu feature does NOT duplicate that data; it imports the same
   exports through this single namespace barrel. When real APIs come online,
   replace this file with calls to useNewMenu_apiHelpers — every other file
   in NewMenu/ goes through this module, so the swap is a single-file edit.
============================================================================ */

export {
  MENUS,
  MOCK_MENU_ITEMS,
  MODIFIERS,
  OPTIONS,
  CATEGORIES,
} from "../../03_cloudKitchens/menus copy/05_menus_cnst/.temp_MOCK_DATA/_MOCK_DATA.index.js";
