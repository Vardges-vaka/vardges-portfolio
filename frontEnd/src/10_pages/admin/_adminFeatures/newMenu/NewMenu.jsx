import { useNewMenu } from "./03_newMenu_hooks/_newMenu_hooks.index.js";
import {
  NewMenu_sessionToggle,
  NewMenu_confirmModal,
  NewMenu_form,
  NewMenu_toast,
  NewMenu_session_menus,
  NewMenu_session_items,
  NewMenu_session_modifiers,
  NewMenu_session_options,
} from "./01_newMenu_comps/_newMenu_comps.index.js";
import "./_styles/newMenu.css";

/* ============================================================================
   NewMenu — parent page component for the Cloud-Kitchens "menus" workspace.

   This page is a strict implementation of the architecture doc skeleton:
     • Page directory:           newMenu/
     • Page parent component:    NewMenu.jsx
     • CSS file:                 _styles/newMenu.css
     • Root className:           "NewMenu"
     • Internal classNames:      "NewMenu_<part>" — single underscore only
     • State machinery:          03_newMenu_hooks/* (states + apiHelpers +
                                 handlers + orchestrator)
     • Prop bundling:            02_newMenu_helpers/getCompProps.js builds a
                                 flat-props bundle per component — spread
                                 directly with {...compProps.X_props}

   The page renders five layers, top to bottom:
     1. SessionToggle (sticky top bar + breadcrumb)
     2. The active session (menus | items | modifiers | options)
     3. Global confirm modal for per-field saves
     4. Creation wizard mounted when handlers.openCreate() is called
     5. Auto-dismissing toast
============================================================================ */
const NewMenu = () => {
  const { states, compProps } = useNewMenu();

  return (
    <div className="NewMenu">
      <NewMenu_sessionToggle {...compProps.NewMenu_sessionToggle_props} />

      {states.session === "menus" && (
        <NewMenu_session_menus {...compProps.NewMenu_session_menus_props} />
      )}
      {states.session === "items" && (
        <NewMenu_session_items {...compProps.NewMenu_session_items_props} />
      )}
      {states.session === "modifiers" && (
        <NewMenu_session_modifiers {...compProps.NewMenu_session_modifiers_props} />
      )}
      {states.session === "options" && (
        <NewMenu_session_options {...compProps.NewMenu_session_options_props} />
      )}

      <NewMenu_confirmModal {...compProps.NewMenu_confirmModal_props} />
      <NewMenu_form {...compProps.NewMenu_form_props} />
      <NewMenu_toast {...compProps.NewMenu_toast_props} />
    </div>
  );
};

export default NewMenu;
