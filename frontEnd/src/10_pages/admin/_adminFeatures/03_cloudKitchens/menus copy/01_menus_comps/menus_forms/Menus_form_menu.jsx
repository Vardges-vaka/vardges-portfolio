import Menus_form from "./Menus_form.jsx";

/* ============================================================================
   Menus_form_menu — thin wrapper around the shared 3-step Menus_form.

   Wire from a host that owns a useMenu() hook:
       const { states, handlers } = useMenu();
       <Menus_form_menu
         isOpen={states.creating}
         isLoading={states.isLoading}
         onClose={handlers.closeCreate}
         onCreate={async (payload) => {
           // payload = { ownerType, label }
           const res = await handlers.submitCreate(payload);
           return res;
         }}
       />
============================================================================ */

const COPY = {
  entity: "menu",
  title: "Create a menu",
  input: "Menu label",
  hint: "e.g. \"Main Dining Menu\"",
};

const Menus_form_menu = (props) => <Menus_form copy={COPY} {...props} />;

export default Menus_form_menu;
