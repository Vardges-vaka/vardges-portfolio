import { useState } from "react";

/* ============================================================================
   useNewMenu_states — every piece of local state the NewMenu feature owns.

   Sections:
   1. Navigation     — session, viewingType, selected* (id + entity)
   2. Entity caches  — menus, items, modifiers, options
   3. Owner filter   — "brand" | "competitor" | "both"
   4. Update flow    — isUpdating, updatingField, editingField, confirm payload
   5. Create wizard  — showForm, isCreating
   6. Toast          — single string, auto-dismissed by useNewMenu

   The returned shape is intentionally split into `states` + `setters` so the
   handlers module can use precise setter references in useCallback deps.
============================================================================ */
export const useNewMenu_states = () => {
  /* 1 — Navigation */
  const [session, setSession] = useState("menus");
  const [viewingType, setViewingType] = useState("all");

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedModifier, setSelectedModifier] = useState(null);
  const [selectedModifierId, setSelectedModifierId] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  /* 2 — Entity caches */
  const [menus, setMenus] = useState([]);
  const [items, setItems] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [options, setOptions] = useState([]);

  /* 3 — Owner filter */
  const [ownerType, setOwnerType] = useState("both");

  /* 4 — Update flow */
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingField, setUpdatingField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [confirm, setConfirm] = useState(null);

  /* 5 — Create wizard */
  const [showForm, setShowForm] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  /* 6 — Toast */
  const [toast, setToast] = useState(null);

  return {
    states: {
      session, viewingType,
      selectedMenu, selectedMenuId,
      selectedItem, selectedItemId,
      selectedModifier, selectedModifierId,
      selectedOption, selectedOptionId,
      menus, items, modifiers, options,
      ownerType,
      isUpdating, updatingField, editingField, confirm,
      showForm, isCreating,
      toast,
    },
    setters: {
      setSession, setViewingType,
      setSelectedMenu, setSelectedMenuId,
      setSelectedItem, setSelectedItemId,
      setSelectedModifier, setSelectedModifierId,
      setSelectedOption, setSelectedOptionId,
      setMenus, setItems, setModifiers, setOptions,
      setOwnerType,
      setIsUpdating, setUpdatingField, setEditingField, setConfirm,
      setShowForm, setIsCreating,
      setToast,
    },
  };
};
