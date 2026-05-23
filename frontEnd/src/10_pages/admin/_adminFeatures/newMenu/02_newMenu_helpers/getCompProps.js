import { buildBreadcrumb, getSelectedLabel } from "./buildBreadcrumb.js";
import { filterByOwner } from "./dataAdapter.js";

/* ============================================================================
   getCompProps — builds the flat-prop bundle for every component NewMenu.jsx
   renders, in the order they appear on screen.

   Architecture doc compliance: each entry is named `<Component>_props` and
   is spread directly into its component (`<X {...props.X_props} />`). No
   {states,handlers,childProps,t} envelope — props are flat.
============================================================================ */
export const getCompProps = ({ states, handlers, t }) => {
  const visibleMenus = filterByOwner(states.menus, states.ownerType);
  const visibleItems = filterByOwner(states.items, states.ownerType);
  const visibleModifiers = filterByOwner(states.modifiers, states.ownerType);
  const visibleOptions = filterByOwner(states.options, states.ownerType);

  /* ---- Sticky top bar ---- */
  const NewMenu_sessionToggle_props = {
    session: states.session,
    viewingType: states.viewingType,
    ownerType: states.ownerType,
    isUpdating: states.isUpdating,
    trail: buildBreadcrumb({ states, handlers, t }),
    onSessionClick: handlers.handleSessionClick,
    onOwnerToggle: handlers.handleOwnerToggle,
    onInitiateUpdate: handlers.initiateFieldUpdate,
    onCancelUpdate: handlers.handleCancelFieldUpdate,
    onConfirmUpdate: handlers.handleConfirmFieldUpdate,
    onOpenCreate: handlers.openCreate,
    t,
  };

  /* ---- Per-session bundles ---- */
  const NewMenu_session_menus_props = {
    session: states.session,
    viewingType: states.viewingType,
    ownerType: states.ownerType,
    isUpdating: states.isUpdating,
    editingField: states.editingField,
    menus: visibleMenus,
    selectedMenu: states.selectedMenu,
    handlers,
    t,
  };
  const NewMenu_session_items_props = {
    session: states.session,
    viewingType: states.viewingType,
    ownerType: states.ownerType,
    isUpdating: states.isUpdating,
    editingField: states.editingField,
    items: visibleItems,
    selectedItem: states.selectedItem,
    handlers,
    t,
  };
  const NewMenu_session_modifiers_props = {
    session: states.session,
    viewingType: states.viewingType,
    ownerType: states.ownerType,
    isUpdating: states.isUpdating,
    editingField: states.editingField,
    modifiers: visibleModifiers,
    selectedModifier: states.selectedModifier,
    handlers,
    t,
  };
  const NewMenu_session_options_props = {
    session: states.session,
    viewingType: states.viewingType,
    ownerType: states.ownerType,
    isUpdating: states.isUpdating,
    editingField: states.editingField,
    options: visibleOptions,
    selectedOption: states.selectedOption,
    handlers,
    t,
  };

  /* ---- Confirm modal ---- */
  const NewMenu_confirmModal_props = {
    isOpen: !!states.confirm,
    title: states.confirm?.title,
    subtitle: states.confirm?.subtitle,
    fieldLabel: states.confirm?.fieldLabel,
    prevValue: states.confirm?.prev,
    nextValue: states.confirm?.next,
    danger: !!states.confirm?.danger,
    onCancel: handlers.handleCancelFieldUpdate,
    onConfirm: handlers.handleConfirmFieldUpdate,
    t,
  };

  /* ---- Creation wizard ---- */
  const NewMenu_form_props = {
    kind: states.showForm,
    isOpen: !!states.showForm,
    isCreating: states.isCreating,
    onClose: handlers.closeCreate,
    onCreate: handlers.handleCreate,
    t,
  };

  /* ---- Toast ---- */
  const NewMenu_toast_props = {
    message: states.toast,
    onDismiss: handlers.dismissToast,
    t,
  };

  return {
    NewMenu_sessionToggle_props,
    NewMenu_session_menus_props,
    NewMenu_session_items_props,
    NewMenu_session_modifiers_props,
    NewMenu_session_options_props,
    NewMenu_confirmModal_props,
    NewMenu_form_props,
    NewMenu_toast_props,
    selectedLabel: getSelectedLabel(states),
  };
};
