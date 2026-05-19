import { useMenus } from "./03_menus_hooks/_menus_hooks.index.js";
import {
  Menus_sessionToggle,
  Menus_session_menu,
  Menus_session_menuItem,
  Menus_session_modifier,
  Menus_session_option,
  Menus_confirmModal_fieldUpdate,
  Menus_form_menu,
  Menus_form_menuItem,
  Menus_form_modifier,
  Menus_form_option,
  Menus_form_category,
} from "./01_menus_comps/_menus_comps.index.js";
import "./_styles/menus.css";

/* ============================================================================
   Menus — top-level admin page for Cloud Kitchens > Menus.

   Renders:
     1. Sticky top bar (sessionToggle + breadcrumb)
     2. The active session (menus | items | modifiers | options)
     3. Global double-confirm modal for per-field saves
     4. Creation wizard (5 entity-specific wrappers; mounted by showForm)
     5. Auto-dismissing toast
============================================================================ */
const Menus = () => {
  const { states, handlers, childProps } = useMenus();
  const {
    sess_Toggle_props,
    sess_menu_props,
    sess_menuItem_props,
    sess_modifier_props,
    sess_option_props,
    confirmModal_fieldUpdate_props,
  } = childProps;

  // Map showForm value -> wrapper component. Each wrapper preconfigures the
  // copy (title, hint, etc.) and passes through isOpen / onClose / onCreate.
  const formWrappers = {
    menu: Menus_form_menu,
    menuItem: Menus_form_menuItem,
    modifier: Menus_form_modifier,
    option: Menus_form_option,
    category: Menus_form_category,
  };
  const ActiveForm = states.showForm ? formWrappers[states.showForm] : null;

  return (
    <div className="menus">
      <Menus_sessionToggle
        states={sess_Toggle_props.states}
        handlers={sess_Toggle_props.handlers}
        childProps={sess_Toggle_props.childProps}
        t={sess_Toggle_props.t}
      />

      {states.session === "menus" && (
        <Menus_session_menu
          states={sess_menu_props.states}
          handlers={sess_menu_props.handlers}
          childProps={sess_menu_props.childProps}
          t={sess_menu_props.t}
        />
      )}
      {states.session === "items" && (
        <Menus_session_menuItem
          states={sess_menuItem_props.states}
          handlers={sess_menuItem_props.handlers}
          childProps={sess_menuItem_props.childProps}
          t={sess_menuItem_props.t}
        />
      )}
      {states.session === "modifiers" && (
        <Menus_session_modifier
          states={sess_modifier_props.states}
          handlers={sess_modifier_props.handlers}
          childProps={sess_modifier_props.childProps}
          t={sess_modifier_props.t}
        />
      )}
      {states.session === "options" && (
        <Menus_session_option
          states={sess_option_props.states}
          handlers={sess_option_props.handlers}
          childProps={sess_option_props.childProps}
          t={sess_option_props.t}
        />
      )}

      <Menus_confirmModal_fieldUpdate
        states={confirmModal_fieldUpdate_props.states}
        handlers={confirmModal_fieldUpdate_props.handlers}
        t={confirmModal_fieldUpdate_props.t}
      />

      {ActiveForm && (
        <ActiveForm
          isOpen={!!states.showForm}
          isLoading={states.isCreating}
          onClose={handlers.closeCreate}
          onCreate={handlers.handleCreate}
        />
      )}

      {states.toast && (
        <div
          className="menus_toast"
          role="status"
          aria-live="polite"
          onClick={handlers.dismissToast}>
          {states.toast}
        </div>
      )}
    </div>
  );
};

export default Menus;
