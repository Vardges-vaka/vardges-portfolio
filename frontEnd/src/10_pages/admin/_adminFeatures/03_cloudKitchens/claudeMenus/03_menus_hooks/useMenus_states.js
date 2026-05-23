import { useState } from "react";

// temporary just to see quickly how it works
const OPERATION_TYPES = ["viewing", "adding", "updating", "deleting"];
const SESSIONS_TYPES = ["menus", "categories", "items", "modifiers", "options"];
const VALID_VIEWING_SESSIONS = ["menus", "items", "modifiers", "options"];
const VALID_VIEWING_TYPES = ["all", "single"];

const OWNER_TYPES = ["brand", "competitor", "both"];

export const useMenus_states = () => {
  const [session, setSession] = useState("menus");
  const [operation, setOperation] = useState("viewing");
  const [viewingType, setViewingType] = useState("all");
  const [ownerType, setOwnerType] = useState("brand");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingField, setUpdatingField] = useState(null);
  const [updatingFieldModal, setUpdatingFieldModal] = useState(null);
  // v3: hold the diff payload for the double-confirm modal.
  const [updatingFieldPrev, setUpdatingFieldPrev] = useState(null);
  const [updatingFieldNext, setUpdatingFieldNext] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);

  const [modifiers, setModifiers] = useState([]);
  const [selectedModifier, setSelectedModifier] = useState(null);
  const [selectedModifierId, setSelectedModifierId] = useState(null);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  return {
    states: {
      session,
      operation,
      viewingType,
      menus,
      selectedMenu,
      selectedId,
      ownerType,
      isUpdating,
      updatingField,
      updatingFieldModal,
      updatingFieldPrev,
      updatingFieldNext,
      editingCategoryId,
      //
      menuItems,
      selectedMenuItem,
      selectedMenuItemId,
      modifiers,
      selectedModifier,
      selectedModifierId,
      options,
      selectedOption,
      selectedOptionId,
    },
    setters: {
      setSession,
      setOperation,
      setViewingType,
      setMenus,
      setSelectedMenu,
      setSelectedId,
      setOwnerType,
      setIsUpdating,
      setUpdatingField,
      setUpdatingFieldModal,
      setUpdatingFieldPrev,
      setUpdatingFieldNext,
      setEditingCategoryId,
      //
      setMenuItems,
      setSelectedMenuItem,
      setSelectedMenuItemId,
      setModifiers,
      setSelectedModifier,
      setSelectedModifierId,
      setOptions,
      setSelectedOption,
      setSelectedOptionId,
    },
  };
};
