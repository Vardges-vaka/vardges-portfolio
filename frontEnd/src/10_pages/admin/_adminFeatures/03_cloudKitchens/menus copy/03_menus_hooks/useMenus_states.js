import { useState } from "react";

/* ============================================================================
   useMenus_states — all state slices for the Menus feature.

   Sections:
   1. Navigation     — session, viewingType, selected*Id / selected* entity
   2. Entity caches  — menus, menuItems, modifiers, options (the lists)
   3. Owner filter   — brand | competitor | both
   4. Update lifecycle
        isUpdating        — top-level "Update all" mode for a single entity
        updatingField     — which field key is currently in edit mode
        editingField      — per-field inline edit key (alias of updatingField
                            kept separate so the design can drive both at once)
        confirm           — payload for the Menus_confirmModal_fieldUpdate when
                            a single field save is awaiting double-confirmation
                            shape: { fieldLabel, prev, next, onCommit, title,
                                     subtitle, danger } | null
        updatingFieldModal — internal "confirm modal is open" flag
   5. Create wizard
        showForm  — null | "menu" | "menuItem" | "modifier" | "option" | "category"
        isCreating — submit-in-flight flag for the wizard
   6. Toast (auto-dismissed by handlers.dismissToast / 2.4 s timer)
============================================================================ */

export const useMenus_states = () => {
  const [session, setSession] = useState("menus");
  const [operation, setOperation] = useState("viewing");
  const [viewingType, setViewingType] = useState("all");
  const [ownerType, setOwnerType] = useState("both");

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingField, setUpdatingField] = useState(null);
  const [updatingFieldModal, setUpdatingFieldModal] = useState(null);

  const [editingField, setEditingField] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [showForm, setShowForm] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [toast, setToast] = useState(null);

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
      ownerType,

      isUpdating,
      updatingField,
      updatingFieldModal,
      editingField,
      confirm,

      showForm,
      isCreating,
      toast,

      menus,
      selectedMenu,
      selectedId,

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
      setOwnerType,

      setIsUpdating,
      setUpdatingField,
      setUpdatingFieldModal,
      setEditingField,
      setConfirm,

      setShowForm,
      setIsCreating,
      setToast,

      setMenus,
      setSelectedMenu,
      setSelectedId,

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
