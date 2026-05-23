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

  const handleViewAll = useCallback(
    (id) => {
      setters.setViewingType("single");
      setters.setSelectedMenu(states.menus.find((menu) => menu._id === id));
      setters.setSelectedId(id);
    },
    [setters.setViewingType, setters.setSelectedMenu, setters.setSelectedId, states.menus],
  );

  const handleUpdateAll = useCallback(() => {
    setters.setIsUpdating(true);
  }, [setters.setIsUpdating]);

  const handleDropdown = useCallback(() => {}, []);

  const handleView_MenuItem = useCallback(
    (e) => {
      const { id } = e.currentTarget.dataset;
      if (!id) return;
      setters.setSelectedMenuItemId(id);
      let MenuItems = [];
      if (states.viewingType === "all") {
        MenuItems = states.menuItems.find((menuItem) => menuItem._id === id);
      } else {
        states.selectedMenu?.categories?.forEach((category) => {
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
      setters.setViewingType, setters.setSelectedMenuItem,
      setters.setSelectedMenuItemId, states.menuItems,
      states.viewingType, states.selectedMenu, setters.setSession,
    ],
  );

  const handleUpdate_MenuItem = useCallback((e) => {
    const { id } = e?.currentTarget?.dataset || {};
    if (id) setters.setSelectedMenuItemId?.(id);
    setters.setIsUpdating?.(true);
  }, [setters.setIsUpdating, setters.setSelectedMenuItemId]);

  const handleDropdown_MenuItem = useCallback((e) => {}, []);

  /* ============================================================================
     v3 — per-field update flow, image replace, options modal, files, category,
     view navigation for modifier/option, master-update toggles.
  ============================================================================ */

  const startFieldUpdate = useCallback(
    (fieldKey, currentValueOrDoc) => {
      if (states.isUpdating) return;
      setters.setUpdatingField?.(fieldKey);
      setters.setUpdatingFieldPrev?.(currentValueOrDoc);
      setters.setUpdatingFieldModal?.(false);
      if (isDebug) console.log("[useMenus] startFieldUpdate", fieldKey);
    },
    [
      states.isUpdating, setters.setUpdatingField,
      setters.setUpdatingFieldPrev, setters.setUpdatingFieldModal, isDebug,
    ],
  );

  const toggleActive = useCallback(
    (id, nextActive) => {
      setters.setUpdatingField?.("isActive");
      setters.setUpdatingFieldPrev?.(!nextActive);
      setters.setUpdatingFieldNext?.(nextActive);
      setters.setUpdatingFieldModal?.(true);
      if (isDebug) console.log("[useMenus] toggleActive", id, nextActive);
    },
    [
      setters.setUpdatingField, setters.setUpdatingFieldPrev,
      setters.setUpdatingFieldNext, setters.setUpdatingFieldModal, isDebug,
    ],
  );

  const handleReplaceImage = useCallback(
    (id, meta) => {
      if (apiHelpers?.replaceImage) apiHelpers.replaceImage({ id, meta });
      if (isDebug) console.log("[useMenus] handleReplaceImage", id, meta?.name);
    },
    [apiHelpers, isDebug],
  );

  const handleUpdateModifierOptions = useCallback(
    (modifierId, optionIds) => {
      if (apiHelpers?.updateModifierOptions) apiHelpers.updateModifierOptions({ modifierId, optionIds });
      if (isDebug) console.log("[useMenus] handleUpdateModifierOptions", modifierId, optionIds);
    },
    [apiHelpers, isDebug],
  );

  const handleAddFile = useCallback(
    (file) => {
      if (apiHelpers?.uploadFile) apiHelpers.uploadFile({ file });
      if (isDebug) console.log("[useMenus] handleAddFile", file?.name);
    },
    [apiHelpers, isDebug],
  );

  const handleEditCategory = useCallback(
    (categoryId) => {
      setters.setEditingCategoryId?.(categoryId);
    },
    [setters.setEditingCategoryId],
  );

  const handleView_Modifier = useCallback(
    (modifier) => {
      if (!modifier?._id) return;
      setters.setSession?.("modifiers");
      setters.setViewingType?.("single");
      setters.setSelectedModifier?.(modifier);
      setters.setSelectedModifierId?.(modifier._id);
    },
    [
      setters.setSession, setters.setViewingType,
      setters.setSelectedModifier, setters.setSelectedModifierId,
    ],
  );

  const handleView_Option = useCallback(
    (option) => {
      if (!option?._id) return;
      setters.setSession?.("options");
      setters.setViewingType?.("single");
      setters.setSelectedOption?.(option);
      setters.setSelectedOptionId?.(option._id);
    },
    [
      setters.setSession, setters.setViewingType,
      setters.setSelectedOption, setters.setSelectedOptionId,
    ],
  );

  const handleUpdate_Modifier = useCallback((modifier) => {
    handleView_Modifier(modifier);
    setters.setIsUpdating?.(true);
  }, [handleView_Modifier, setters.setIsUpdating]);

  const handleUpdate_Option = useCallback((option) => {
    handleView_Option(option);
    setters.setIsUpdating?.(true);
  }, [handleView_Option, setters.setIsUpdating]);

  const handleInitialFetch = useCallback(() => {
    switch (states.session) {
      case "menus":     handleInitialFetch_menus(); break;
      case "items":     handleInitialFetch_items(); break;
      case "modifiers": handleInitialFetch_modifiers(); break;
      case "options":   handleInitialFetch_options(); break;
      default: break;
    }
  }, [
    states.session,
    handleInitialFetch_menus, handleInitialFetch_items,
    handleInitialFetch_modifiers, handleInitialFetch_options,
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
    setters.setIsUpdating, setters.setUpdatingField, setters.setUpdatingFieldModal,
  ]);

  const handleConfirmFieldUpdate = useCallback(
    (e) => {
      if (!states.updatingFieldModal) {
        setters.setUpdatingFieldModal(true);
      } else {
        // TODO: implement the logic to update the field via apiHelpers
        if (isDebug) console.log("[useMenus] handleConfirmFieldUpdate");
      }
    },
    [setters.setUpdatingFieldModal, states.updatingFieldModal, isDebug],
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
      // v3
      startFieldUpdate,
      toggleActive,
      handleReplaceImage,
      handleUpdateModifierOptions,
      handleAddFile,
      handleEditCategory,
      handleView_Modifier,
      handleView_Option,
      handleUpdate_Modifier,
      handleUpdate_Option,
    },
  };
};
