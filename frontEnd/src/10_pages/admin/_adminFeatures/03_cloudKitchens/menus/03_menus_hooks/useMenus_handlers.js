import { useCallback } from "react";

// import {} from "../02_menus_helpers/_menus_helpers.index.js";
import {
  VALID_VIEWING_SESSIONS,
  MENUS,
  MOCK_MENU_ITEMS,
  MODIFIERS,
  OPTIONS,
  CATEGORIES,
} from "../05_menus_cnst/_menus_cnst.index.js";
// import {} from "../04_menus_vld/_menus_vld.index.js";

export const useMenus_handlers = ({ states, setters, apiHelpers, isDebug }) => {
  const handleInitialFetch_menus = useCallback(() => {
    setters.setMenus(MENUS);
  }, [setters.setMenus]);

  const handleInitialFetch_items = useCallback(() => {
    setters.setMenuItems(MOCK_MENU_ITEMS);
  }, [setters.setMenuItems]);

  const handleInitialFetch_modifiers = useCallback(() => {
    setters.setModifiers(MODIFIERS);
  }, [setters.setModifiers]);

  const handleInitialFetch_options = useCallback(() => {
    setters.setOptions(OPTIONS);
  }, [setters.setOptions]);

  // done
  const handleViewAll = useCallback(
    (id) => {
      setters.setViewingType("single");
      setters.setSelectedMenu(states.menus.find((menu) => menu._id === id));
      setters.setSelectedId(id);
    },
    [
      setters.setViewingType,
      setters.setSelectedMenu,
      setters.setSelectedId,
      states.menus,
    ],
  );
  // TODO
  const handleUpdateAll = useCallback(() => {
    setters.setMenuItems(MOCK_MENU_ITEMS);
  }, [setters.setMenuItems]);
  //TODO
  const handleDropdown = useCallback(() => {
    setters.setMenuItems(MOCK_MENU_ITEMS);
  }, [setters.setMenuItems]);

  const handleView_MenuItem = useCallback(
    (e) => {
      const { id } = e.currentTarget.dataset;
      if (!id) return;
      setters.setSelectedMenuItemId(id);
      let MenuItems = [];
      if (states.viewingType === "all") {
        MenuItems = states.menuItems.find((menuItem) => menuItem._id === id);
      } else {
        states.selectedMenu.categories?.forEach((category) => {
          category.menuItems.forEach((menuItem) => {
            MenuItems.push(menuItem.item);
          });
        });
        MenuItems = MenuItems.find((menuItem) => menuItem._id === id);
      }
      setters.setViewingType("single");
      setters.setSession("items");
      setters.setSelectedMenuItem(MenuItems);
    },
    [
      setters.setViewingType,
      setters.setSelectedMenuItem,
      setters.setSelectedMenuItemId,
      states.menuItems,
      states.viewingType,
      states.selectedMenu,
      setters.setSession,
    ],
  );

  const handleUpdate_MenuItem = useCallback((e) => {}, []);
  const handleDropdown_MenuItem = useCallback((e) => {}, []);

  const handleInitialFetch = useCallback(() => {
    switch (states.session) {
      case "menus":
        handleInitialFetch_menus();
        break;
      case "items":
        handleInitialFetch_items();
        break;
      case "modifiers":
        handleInitialFetch_modifiers();
        break;
      case "options":
        handleInitialFetch_options();
        break;
      default:
        break;
    }
  }, [
    states.session,
    handleInitialFetch_menus,
    handleInitialFetch_items,
    handleInitialFetch_modifiers,
    handleInitialFetch_options,
  ]);

  const handleViewingSession = useCallback(
    (e) => {
      const session = e.currentTarget.dataset.value;
      if (VALID_VIEWING_SESSIONS.includes(session)) {
        setters.setSession(session);
      }
    },
    [setters],
  );

  const handleBackToMenus = useCallback(() => {
    setters.setViewingType("all");
    setters.setSession("menus");
  }, [setters.setSession, setters.setViewingType]);

  const initiateFieldUpdate = useCallback(() => {
    setters.setIsUpdating(true);
    setters.setUpdatingField(states.session);
  }, [setters.setIsUpdating, setters.setUpdatingField, states.session]);

  const handleCancelFieldUpdate = useCallback(() => {
    if (!states.updatingFieldModal) {
      setters.setUpdatingFieldModal(true);
    } else {
      setters.setIsUpdating(false);
      setters.setUpdatingField(null);
      setters.setUpdatingFieldModal(false);
    }
  }, [
    states.updatingFieldModal,
    setters.setIsUpdating,
    setters.setUpdatingField,
    setters.setUpdatingFieldModal,
  ]);
  const handleConfirmFieldUpdate = useCallback(
    (e) => {
      if (!states.updatingFieldModal) {
        setters.setUpdatingFieldModal(true);
      } else {
        // TODO: implement the logic to update the field
        console.log("handleConfirmFieldUpdate Clicked");
      }
    },
    [setters.setUpdatingFieldModal, states.updatingFieldModal],
  );
  const handleOwnerType = useCallback(
    (e) => {
      const clicked = e.currentTarget.dataset.value;
      if (clicked !== "brand" && clicked !== "competitor") return;

      const { ownerType } = states;
      if (ownerType === clicked) return;
      if (ownerType === "both") {
        setters.setOwnerType(clicked === "brand" ? "competitor" : "brand");
        return;
      }
      setters.setOwnerType("both");
    },
    [states.ownerType, setters.setOwnerType],
  );
  return {
    handlers: {
      handleViewingSession,
      handleOwnerType,
      handleBackToMenus,
      //
      initiateFieldUpdate,
      handleCancelFieldUpdate,
      handleConfirmFieldUpdate,
      handleInitialFetch,
      //
      handleUpdateAll,
      handleViewAll,
      handleDropdown,

      //
      handleUpdate_MenuItem,
      handleView_MenuItem,
      handleDropdown_MenuItem,
    },
  };
};
