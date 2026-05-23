import Menus_form from "./Menus_form.jsx";

/* ============================================================================
   Menus_form_menuItem — thin wrapper around the shared 3-step Menus_form.

   Wire from a host that owns a useMenuItem() hook:
       const { states, handlers } = useMenuItem();
       <Menus_form_menuItem
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
  entity: "menu item",
  title: "Create a menu item",
  input: "Item name",
  hint: "e.g. \"Strawberry Pavlova\"",
};

const Menus_form_menuItem = (props) => <Menus_form copy={COPY} {...props} />;

export default Menus_form_menuItem;
